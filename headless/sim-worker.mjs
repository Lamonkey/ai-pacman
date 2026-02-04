import { parentPort, workerData } from "worker_threads";
import { writeFile } from "fs/promises";
import { join } from "path";
import { createHeadlessGame } from "../pacman.js";

const { jobId, workerIndex, rounds, maxTicks, runsDir, saveRuns } = workerData;

const runOne = async (runIndex) => {
  parentPort.postMessage({ type: "start", workerIndex, runIndex });
  const game = createHeadlessGame();
  const termination = game.runUntilGameOver(maxTicks);
  const recording = game.getRecording();
  let file = null;
  if (saveRuns) {
    file = `run_${jobId}_${workerIndex}_${runIndex}.json`;
    const outputPath = join(runsDir, file);
    await writeFile(outputPath, JSON.stringify(recording));
  }
  parentPort.postMessage({
    type: "progress",
    workerIndex,
    runIndex,
    file,
    summary: recording.summary || {},
    score: recording.summary?.score ?? 0,
    termination,
  });
};

const main = async () => {
  for (let i = 0; i < rounds; i++) {
    await runOne(i);
  }
};

main().catch((err) => {
  parentPort.postMessage({ type: "error", error: err.message });
});
