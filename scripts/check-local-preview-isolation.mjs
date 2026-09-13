import { readFileSync } from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const nextConfig = readFileSync(path.join(root, "next.config.ts"), "utf8");
const previewScript = readFileSync(path.join(root, "scripts", "local-preview.mjs"), "utf8");
const packageJson = JSON.parse(readFileSync(path.join(root, "package.json"), "utf8"));

const checks = [
  [nextConfig.includes("PHASE_DEVELOPMENT_SERVER"), "development phase is detected explicitly"],
  [nextConfig.includes('".next-dev"') && nextConfig.includes('".next"'), "development and production output directories are separate"],
  [packageJson.scripts["preview:start"] === "node scripts/local-preview.mjs start", "managed preview start command exists"],
  [packageJson.scripts["preview:stop"] === "node scripts/local-preview.mjs stop", "managed preview stop command exists"],
  [packageJson.scripts["preview:status"] === "node scripts/local-preview.mjs status", "managed preview status command exists"],
  [previewScript.includes(reviewRoute()), "preview health check uses the calculator review route"],
  [previewScript.includes('body.includes("Internal Server Error")'), "health check rejects Next.js error pages"],
];

function reviewRoute() {
  return 'const reviewPath = "/what-time-should-i-leave"';
}

const failures = checks.filter(([passed]) => !passed).map(([, label]) => label);
if (failures.length) {
  console.error(`Local preview isolation regression failed:\n- ${failures.join("\n- ")}`);
  process.exit(1);
}

console.log(`Local preview isolation regression passed (${checks.length} checks).`);
