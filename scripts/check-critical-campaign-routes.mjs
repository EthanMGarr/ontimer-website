import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const ktvuPagePath = path.join(root, "src", "app", "KTVU", "page.tsx");
const ktvuActionsPath = path.join(root, "src", "app", "KTVU", "KTVUActions.tsx");
const ktvuStylesPath = path.join(root, "src", "app", "KTVU", "ktvu.css");
const middlewarePath = path.join(root, "src", "middleware.ts");

for (const requiredPath of [ktvuPagePath, ktvuActionsPath, ktvuStylesPath]) {
  assert.ok(existsSync(requiredPath), `critical KTVU route asset is missing: ${requiredPath}`);
}

const page = readFileSync(ktvuPagePath, "utf8");
const actions = readFileSync(ktvuActionsPath, "utf8");
const middleware = readFileSync(middlewarePath, "utf8");

assert.match(
  page,
  /alternates:\s*\{\s*canonical:\s*"https:\/\/www\.ontimer\.app\/KTVU"\s*\}/,
  "KTVU must keep its uppercase canonical URL",
);
assert.match(page, /export default function KTVULandingPage\(\)/, "KTVU must export its landing page");
assert.match(actions, /utm_source=ktvu/, "KTVU actions must retain campaign attribution");
assert.match(
  middleware,
  /request\.nextUrl\.pathname === "\/ktvu"[\s\S]*?pathname = "\/KTVU"[\s\S]*?NextResponse\.redirect\(canonicalUrl, 308\)/,
  "lowercase /ktvu must permanently redirect to canonical /KTVU",
);
assert.ok(
  middleware.includes('"/ktvu"'),
  "lowercase /ktvu must remain in the unconditional middleware matcher",
);

console.log("Critical campaign route regression passed (8 checks).");
