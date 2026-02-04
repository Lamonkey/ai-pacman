import { Worker } from "worker_threads";
import { mkdir, writeFile } from "fs/promises";
import { existsSync } from "fs";
import { cpus } from "os";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const runsDir = join(__dirname, "runs");

const args = process.argv.slice(2);
const getArg = (name, fallback) => {
  const idx = args.indexOf(name);
  if (idx === -1) return fallback;
  const next = args[idx + 1];
  return next ?? fallback;
};

const rounds = Math.max(1, Number(getArg("--rounds", "10")));
const parallel = Math.max(1, Number(getArg("--parallel", String(Math.max(1, cpus().length - 1)))));
const maxTicks = Math.max(1000, Number(getArg("--maxTicks", "20000")));
const saveRuns = getArg("--saveRuns", "false") === "true";

if (!existsSync(runsDir)) {
  await mkdir(runsDir, { recursive: true });
}

const jobId = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
const workers = new Map();

let completed = 0;
let totalScore = 0;
let bestScore = 0;
const terminationCounts = {};
const runs = [];

const renderStatus = () => {
  process.stdout.write(
    `\rcompleted ${completed}/${rounds} | best ${bestScore} | avg ${(completed ? totalScore / completed : 0).toFixed(2)} | term ${JSON.stringify(terminationCounts)}`
  );
};

const spawnWorker = (workerIndex, roundsForWorker) => {
  return new Promise((resolve, reject) => {
    const worker = new Worker(join(__dirname, "sim-worker.mjs"), {
      workerData: { jobId, workerIndex, rounds: roundsForWorker, maxTicks, runsDir, saveRuns },
    });
    workers.set(workerIndex, worker);
    worker.on("message", (msg) => {
      if (msg.type === "progress") {
        completed += 1;
        totalScore += msg.score || 0;
        bestScore = Math.max(bestScore, msg.score || 0);
        if (msg.termination) {
          terminationCounts[msg.termination] = (terminationCounts[msg.termination] || 0) + 1;
        }
        runs.push({
          file: msg.file || null,
          score: msg.summary?.score ?? msg.score ?? 0,
          lives: msg.summary?.lives ?? null,
          ticks: msg.summary?.ticks ?? null,
          level: msg.summary?.level ?? null,
          termination: msg.summary?.termination ?? msg.termination ?? "unknown",
        });
        renderStatus();
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

const run = async () => {
  const workerPromises = [];
  for (let i = 0; i < parallel; i++) {
    const roundsForWorker = Math.floor(rounds / parallel) + (i < rounds % parallel ? 1 : 0);
    if (roundsForWorker === 0) continue;
    workerPromises.push(spawnWorker(i, roundsForWorker));
  }
  await Promise.all(workerPromises);
  process.stdout.write("\n");
  const now = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  const stamp = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}_${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
  const reportFile = join(runsDir, `report_${stamp}.json`);
  const report = {
    rounds,
    parallel,
    maxTicks,
    saveRuns,
    bestScore,
    avgScore: completed ? totalScore / completed : 0,
    terminationCounts,
    runs,
  };
  await writeFile(reportFile, JSON.stringify(report, null, 2));
  console.log("done");
  console.log(
    JSON.stringify(
      {
        rounds,
        parallel,
        maxTicks,
        bestScore,
        avgScore: completed ? totalScore / completed : 0,
        terminationCounts,
        runsDir,
        reportFile,
      },
      null,
      2
    )
  );
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
