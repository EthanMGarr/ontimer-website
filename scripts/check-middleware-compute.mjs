import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const middleware = readFileSync(path.join(root, "src", "middleware.ts"), "utf8");

assert.match(
  middleware,
  /source:\s*"\/\(\(\?!_next\/static\|_next\/image\|favicon\.ico\|images\|api\)\.\*\)"[\s\S]*?missing:\s*\[\{\s*type:\s*"cookie",\s*key:\s*"ontimer_region"\s*\}\]/,
  "general page middleware must run only when the region cookie is missing",
);

for (const route of [
  "/provider-medication-schedule/:path*",
  "/caregiver-medication-schedule/:path*",
  "/medication-schedule/:path*",
  "/how-to-remember-medication-on-time/:path*",
]) {
  assert.ok(
    middleware.includes(`"${route}"`),
    `${route} must retain unconditional middleware coverage`,
  );
}

assert.match(
  middleware,
  /PRIVATE_MEDICATION_ROUTES\.has\(request\.nextUrl\.pathname\)/,
  "provider preview access must remain enforced",
);
assert.match(
  middleware,
  /isAnalyticsFreeMedicationPath\(request\.nextUrl\.pathname\)/,
  "medication privacy headers must remain enforced",
);

console.log("Middleware compute regression passed (7 checks).");
