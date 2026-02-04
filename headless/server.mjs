import { createServer } from "http";
import { readFile, readdir, mkdir, writeFile } from "fs/promises";
import { existsSync } from "fs";
import { cpus, loadavg, totalmem } from "os";
import { join, dirname } from "path";
import { Worker } from "worker_threads";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const runsDir = join(__dirname, "runs");

if (!existsSync(runsDir)) {
  await mkdir(runsDir, { recursive: true });
}

const jobs = new Map();
let lastCpuSample = null;

const getCpuUtilization = () => {
  const cores = cpus();
  let idle = 0;
  let total = 0;
  for (const core of cores) {
    const times = core.times;
    idle += times.idle;
    total += times.user + times.nice + times.sys + times.idle + times.irq;
  }
  if (!lastCpuSample) {
    lastCpuSample = { idle, total };
    return 0;
  }
  const idleDiff = idle - lastCpuSample.idle;
  const totalDiff = total - lastCpuSample.total;
  lastCpuSample = { idle, total };
  if (totalDiff === 0) return 0;
  const usage = 1 - idleDiff / totalDiff;
  return Math.max(0, Math.min(1, usage));
};

const readJson = async (req) => {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }
  const body = Buffer.concat(chunks).toString("utf8");
  return body ? JSON.parse(body) : {};
};

const jsonResponse = (res, status, payload) => {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(payload));
};

const listRuns = async () => {
  const files = await readdir(runsDir);
  const results = [];
  for (const file of files) {
    if (!file.endsWith(".json")) continue;
    try {
      const raw = await readFile(join(runsDir, file), "utf8");
      const data = JSON.parse(raw);
      results.push({
        file,
        score: data.summary?.score ?? 0,
      });
    } catch {
      results.push({ file, score: 0 });
    }
  }
  results.sort((a, b) => b.score - a.score);
  return results;
};

const spawnWorker = (jobId, workerIndex, rounds, maxTicks) => {
  return new Promise((resolve, reject) => {
    const worker = new Worker(join(__dirname, "sim-worker.mjs"), {
      workerData: { jobId, workerIndex, rounds, maxTicks, runsDir },
    });
    worker.on("message", (msg) => {
      const job = jobs.get(jobId);
      if (!job) return;
      if (msg.type === "progress") {
        job.completed += 1;
        job.totalScore += msg.score || 0;
        job.bestScore = Math.max(job.bestScore, msg.score || 0);
        if (msg.termination) {
          job.terminationCounts[msg.termination] =
            (job.terminationCounts[msg.termination] || 0) + 1;
        }
        if (!job.workers[msg.workerIndex]) {
          job.workers[msg.workerIndex] = {
            completed: 0,
            lastScore: 0,
            lastTermination: "unknown",
          };
        }
        const w = job.workers[msg.workerIndex];
        w.completed += 1;
        w.lastScore = msg.score || 0;
        w.lastTermination = msg.termination || "unknown";
        w.status = "idle";
      }
      if (msg.type === "start") {
        if (!job.workers[msg.workerIndex]) {
          job.workers[msg.workerIndex] = {
            completed: 0,
            lastScore: 0,
            lastTermination: "unknown",
          };
        }
        const w = job.workers[msg.workerIndex];
        w.status = "running";
        w.currentRun = msg.runIndex;
      }
      if (msg.type === "error") {
        job.status = "error";
        job.error = msg.error;
      }
    });
    worker.on("error", reject);
    worker.on("exit", (code) => {
      if (code !== 0) {
        reject(new Error(`Worker ${workerIndex} exited with code ${code}`));
        return;
      }
      resolve();
    });
  });
};

const runJob = async (job) => {
  const workers = [];
  for (let i = 0; i < job.parallel; i++) {
    const roundsForWorker = Math.floor(job.rounds / job.parallel) + (i < job.rounds % job.parallel ? 1 : 0);
    if (roundsForWorker === 0) continue;
    workers.push(spawnWorker(job.id, i, roundsForWorker, job.maxTicks));
  }
  await Promise.all(workers);
  job.status = "done";
};

const server = createServer(async (req, res) => {
  try {
    if (req.method === "GET" && req.url === "/") {
      const html = await readFile(join(__dirname, "index.html"));
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(html);
      return;
    }
    if (req.method === "GET" && req.url === "/app.js") {
      const js = await readFile(join(__dirname, "app.js"));
      res.writeHead(200, { "Content-Type": "text/javascript" });
      res.end(js);
      return;
    }
    if (req.method === "GET" && req.url === "/api/status") {
      const rss = process.memoryUsage().rss;
      const total = totalmem();
      jsonResponse(res, 200, {
        cores: cpus().length,
        load: loadavg().map((n) => n.toFixed(2)),
        cpuUtil: Number((getCpuUtilization() * 100).toFixed(1)),
        rssMb: Math.round(rss / 1024 / 1024),
        ramTotalMb: Math.round(total / 1024 / 1024),
        ramPct: Number(((rss / total) * 100).toFixed(2)),
      });
      return;
    }
    if (req.method === "GET" && req.url === "/api/runs") {
      jsonResponse(res, 200, await listRuns());
      return;
    }
    if (req.method === "POST" && req.url === "/api/run") {
      const body = await readJson(req);
      const parallel = Math.max(1, Number(body.parallel) || 1);
      const rounds = Math.max(1, Number(body.rounds) || 1);
      const maxTicks = Math.max(1000, Number(body.maxTicks) || 20000);

      const jobId = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
      const job = {
        id: jobId,
        status: "running",
        parallel,
        rounds,
        maxTicks,
        completed: 0,
        total: rounds,
        totalScore: 0,
        bestScore: 0,
        terminationCounts: {},
        workers: Array.from({ length: parallel }, () => ({
          completed: 0,
          lastScore: 0,
          lastTermination: "idle",
          status: "idle",
          currentRun: null,
        })),
      };
      jobs.set(jobId, job);
      runJob(job).catch((err) => {
        job.status = "error";
        job.error = err.message;
      });
      jsonResponse(res, 200, { jobId });
      return;
    }
    if (req.method === "GET" && req.url?.startsWith("/api/job/")) {
      const jobId = req.url.split("/").pop();
      const job = jobs.get(jobId);
      if (!job) {
        jsonResponse(res, 404, { error: "not found" });
        return;
      }
      jsonResponse(res, 200, {
        ...job,
        avgScore: job.completed ? job.totalScore / job.completed : 0,
      });
      return;
    }
    if (req.method === "GET" && req.url?.startsWith("/runs/")) {
      const file = req.url.replace("/runs/", "");
      const data = await readFile(join(runsDir, file));
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(data);
      return;
    }

    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not found");
  } catch (err) {
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end(err.message);
  }
});

const port = Number(process.env.PORT) || 3000;
const host = process.env.HOST || "127.0.0.1";
server.listen(port, host, () => {
  console.log(`Headless runner UI: http://${host}:${port}`);
});
