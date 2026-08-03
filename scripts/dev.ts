import { type ChildProcess, spawn } from "node:child_process";

// Dev runner: spawns the content watcher and the vinxi dev server, pipes
// their output through, and prints clickable URLs for both sites once the
// server is ready.

const children: ChildProcess[] = [];
let bannerPrinted = false;

function printBanner() {
  if (bannerPrinted) return;
  bannerPrinted = true;
  console.log("");
  console.log("  ➜ octahedron  http://octa.localhost:4242/");
  console.log("  ➜ mreis       http://mreis.localhost:4242/");
  console.log("");
}

function shutdown(code: number) {
  for (const child of children) {
    if (child.exitCode === null && !child.killed) {
      child.kill("SIGINT");
    }
  }
  process.exit(code);
}

const watcher = spawn("pnpm", ["watch:content"], {
  stdio: "inherit",
});
children.push(watcher);

const vinxi = spawn("pnpm", ["exec", "vinxi", "dev", "--port", "4242"], {
  stdio: ["inherit", "pipe", "inherit"],
});
children.push(vinxi);

vinxi.stdout?.on("data", (chunk: Buffer) => {
  const text = chunk.toString();
  process.stdout.write(text);
  // vinxi/vite prints a "Local:" line once the dev server is up.
  if (!bannerPrinted && text.includes("Local:")) {
    printBanner();
  }
});

// Fallback in case the ready line never matches.
const fallbackTimer = setTimeout(printBanner, 5000);
fallbackTimer.unref?.();

for (const child of children) {
  child.on("exit", (code) => {
    shutdown(code ?? 0);
  });
}

process.on("SIGINT", () => shutdown(0));
process.on("SIGTERM", () => shutdown(0));
