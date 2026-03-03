import { shape } from "../src/renderers/population-simulation/plugins/randoms";

function printHistogram() {
  const SAMPLES = 10000; // Increased to 10k for smoother curve display
  const BINS = 20;
  const bins = new Array(BINS).fill(0);
  const bottom = 0.5;
  const max = 0.9;
  const top = 1.0;

  for (let i = 0; i < SAMPLES; i++) {
    const val = shape(bottom, max, top);
    const ratio = (val - bottom) / (top - bottom);
    const binIndex = Math.min(BINS - 1, Math.floor(ratio * BINS));
    bins[binIndex]++;
  }

  console.log(
    `\nTriangular Distribution shape(${bottom}, ${max}, ${top}) - ${SAMPLES} samples`,
  );
  console.log(`--------------------------------------------------------`);
  for (let i = 0; i < bins.length; i++) {
    const rangeStart = (bottom + (i * (top - bottom)) / BINS).toFixed(3);
    const bar = "█".repeat(Math.round(bins[i] / (SAMPLES / 100)));
    console.log(`${rangeStart} | ${bar} (${bins[i]})`);
  }
}

printHistogram();
