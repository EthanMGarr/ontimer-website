import { closeSync, existsSync, mkdirSync, openSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { spawn } from "node:child_process";
import path from "node:path";
import process from "node:process";

const repoRoot = path.resolve(import.meta.dirname, "..");
const stateDir = path.join(repoRoot, ".local-preview");
const statePath = path.join(stateDir, "server.json");
const logPath = path.join(stateDir, "server.log");
const nextBin = path.join(repoRoot, "node_modules", "next", "dist", "bin", "next");
const port = 3010;
const reviewPath = "/what-time-should-i-leave";
const reviewUrl = `http://127.0.0.1:${port}${reviewPath}`;

function readState() {
  if (!existsSync(statePath)) return null;

  try {
    const state = JSON.parse(readFileSync(statePath, "utf8"));
    return Number.isInteger(state.pid) && state.pid > 1 ? state : null;
  } catch {
    return null;
  }
}

function isRunning(pid) {
  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}

async function healthCheck() {
  try {
    const response = await fetch(reviewUrl, { signal: AbortSignal.timeout(5_000) });
    const body = await response.text();
    return response.ok && !body.includes("Internal Server Error") && body.includes("What time should I leave");
  } catch {
    return false;
  }
}

async function waitForHealth(timeoutMs = 45_000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    if (await healthCheck()) return true;
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  return false;
}

async function stopManagedPreview({ quiet = false } = {}) {
  const state = readState();
  if (!state) {
    if (!quiet) console.log("No managed local preview is running.");
    return;
  }

  if (isRunning(state.pid)) {
    process.kill(state.pid, "SIGTERM");
    const deadline = Date.now() + 8_000;
    while (isRunning(state.pid) && Date.now() < deadline) {
      await new Promise((resolve) => setTimeout(resolve, 200));
    }
  }

  rmSync(statePath, { force: true });
  if (!quiet) console.log("Stopped the managed local preview.");
}

async function startManagedPreview() {
  mkdirSync(stateDir, { recursive: true });
  const current = readState();

  if (current && isRunning(current.pid) && (await healthCheck())) {
    console.log(`Local preview is already healthy: ${reviewUrl}`);
    return;
  }

  if (current) await stopManagedPreview({ quiet: true });
  if (!existsSync(nextBin)) {
    throw new Error("Next.js is not installed. Run npm install before starting the preview.");
  }

  const logFd = openSync(logPath, "w");
  const child = spawn(process.execPath, [nextBin, "dev", "-p", String(port)], {
    cwd: repoRoot,
    detached: true,
    env: { ...process.env, NODE_ENV: "development" },
    stdio: ["ignore", logFd, logFd],
  });
  child.unref();
  closeSync(logFd);

  writeFileSync(
    statePath,
    `${JSON.stringify({ pid: child.pid, port, cwd: repoRoot, startedAt: new Date().toISOString() }, null, 2)}\n`,
  );

  if (await waitForHealth()) {
    console.log(`Local preview is healthy: ${reviewUrl}`);
    console.log(`Log: ${logPath}`);
    return;
  }

  await stopManagedPreview({ quiet: true });
  const log = existsSync(logPath) ? readFileSync(logPath, "utf8").trim().split("\n").slice(-30).join("\n") : "";
  throw new Error(`Local preview did not become healthy.\n${log}`);
}

async function reportStatus() {
  const state = readState();
  if (!state || !isRunning(state.pid)) {
    console.log("Local preview is stopped.");
    process.exitCode = 1;
    return;
  }

  if (await healthCheck()) {
    console.log(`Local preview is healthy: ${reviewUrl} (PID ${state.pid})`);
    return;
  }

  console.log(`Local preview process ${state.pid} is running but ${reviewUrl} is unhealthy.`);
  console.log(`Inspect ${logPath} or run npm run preview:stop before restarting.`);
  process.exitCode = 1;
}

const command = process.argv[2] ?? "start";

if (command === "start") await startManagedPreview();
else if (command === "stop") await stopManagedPreview();
else if (command === "status") await reportStatus();
else throw new Error(`Unknown command: ${command}`);
