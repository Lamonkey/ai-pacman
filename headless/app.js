const statusEl = document.getElementById("status");
const systemEl = document.getElementById("system");
const runsEl = document.getElementById("runs");
const workersEl = document.getElementById("workers");
const parallelEl = document.getElementById("parallel");
const roundsEl = document.getElementById("rounds");
const maxTicksEl = document.getElementById("maxTicks");
const startEl = document.getElementById("start");

let activeJobId = null;

const fetchJson = async (url, options) => {
  const res = await fetch(url, options);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || res.statusText);
  }
  return res.json();
};

const refreshRuns = async () => {
  const runs = await fetchJson("/api/runs");
  runsEl.innerHTML = "";
  for (const run of runs) {
    const li = document.createElement("li");
    const link = document.createElement("a");
    link.textContent = `${run.file} (score: ${run.score})`;
    link.href = `/runs/${run.file}`;
    link.target = "_blank";
    li.appendChild(link);
    runsEl.appendChild(li);
  }
};

const refreshStatus = async () => {
  const status = await fetchJson("/api/status");
  systemEl.textContent = `CPU: ${status.cpuUtil}% | Cores: ${status.cores} | Load avg: ${status.load.join(", ")} | RSS: ${status.rssMb} MB (${status.ramPct}% of ${status.ramTotalMb} MB)`;
};

const pollJob = async () => {
  if (!activeJobId) return;
  const job = await fetchJson(`/api/job/${activeJobId}`);
  statusEl.textContent = `${job.status} (${job.completed}/${job.total}) | best ${job.bestScore} | avg ${job.avgScore.toFixed(2)} | terminations ${JSON.stringify(job.terminationCounts)}`;
  if (workersEl) {
    const grid = document.createElement("div");
    grid.className = "worker-grid";
    for (let i = 0; i < job.workers.length; i++) {
      const w = job.workers[i];
      const card = document.createElement("div");
      card.className = "worker-card";
      card.innerHTML = `
        <h3>Worker ${i + 1}</h3>
        <div class="stat">Status: ${w.status || "idle"}</div>
        <div class="stat">Current run: ${w.currentRun ?? "-"}</div>
        <div class="stat">Completed: ${w.completed}</div>
        <div class="stat">Last score: ${w.lastScore}</div>
        <div class="stat">Last end: ${w.lastTermination}</div>
      `;
      grid.appendChild(card);
    }
    workersEl.innerHTML = "";
    workersEl.appendChild(grid);
  }
  if (job.status === "done" || job.status === "error") {
    activeJobId = null;
    await refreshRuns();
  } else {
    setTimeout(pollJob, 1000);
  }
};

startEl.addEventListener("click", async () => {
  const parallel = Number(parallelEl.value);
  const rounds = Number(roundsEl.value);
  const maxTicks = Number(maxTicksEl.value);
  statusEl.textContent = "starting...";
  const job = await fetchJson("/api/run", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ parallel, rounds, maxTicks }),
  });
  activeJobId = job.jobId;
  pollJob();
});

refreshStatus();
refreshRuns();
setInterval(refreshStatus, 2000);
