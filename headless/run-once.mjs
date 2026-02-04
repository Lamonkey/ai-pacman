import { writeFile } from "fs/promises";
import { createHeadlessGame } from "../pacman.js";

const args = process.argv.slice(2);
const getArg = (name, fallback) => {
  const idx = args.indexOf(name);
  if (idx === -1) return fallback;
  const next = args[idx + 1];
  return next ?? fallback;
};

const maxTicks = Number(getArg("--maxTicks", "20000"));
const output = getArg("--output", "");

const game = createHeadlessGame();
game.runUntilGameOver(maxTicks);
const recording = game.getRecording();

const metrics = {
  score: recording.summary?.score ?? 0,
  lives: recording.summary?.lives ?? 0,
  ticks: recording.summary?.ticks ?? 0,
  level: recording.summary?.level ?? 0,
  termination: recording.summary?.termination ?? "unknown",
  snapshots: recording.snapshots?.length ?? 0,
};

if (output) {
  await writeFile(output, JSON.stringify(recording));
  const result = {
    metrics,
    output,
  };
  console.log(JSON.stringify(result, null, 2));
} else {
  const result = {
    metrics,
    recording,
  };
  console.log(JSON.stringify(result, null, 2));
}
