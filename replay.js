import { createReplay } from "./pacman.js";

const fileInput = document.getElementById("file");
const playBtn = document.getElementById("play");
const pauseBtn = document.getElementById("pause");
const seek = document.getElementById("seek");
const label = document.getElementById("label");
const speedInput = document.getElementById("speed");

const replay = createReplay();
let snapshots = [];
let index = 0;
let timer = null;

const render = (i) => {
  if (!snapshots.length) return;
  index = Math.max(0, Math.min(i, snapshots.length - 1));
  replay.renderSnapshot(snapshots[index]);
  seek.value = String(index);
  label.textContent = `${index + 1} / ${snapshots.length}`;
};

const play = () => {
  const speed = Math.max(1, Number(speedInput.value) || 1);
  if (timer) return;
  timer = setInterval(() => {
    if (index >= snapshots.length - 1) {
      pause();
      return;
    }
    render(index + 1);
  }, 1000 / (speed * 10));
};

const pause = () => {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
};

fileInput.addEventListener("change", async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const text = await file.text();
  const data = JSON.parse(text);
  snapshots = data.snapshots || [];
  seek.max = Math.max(0, snapshots.length - 1);
  render(0);
});

seek.addEventListener("input", () => {
  pause();
  render(Number(seek.value));
});

playBtn.addEventListener("click", play);
pauseBtn.addEventListener("click", pause);
