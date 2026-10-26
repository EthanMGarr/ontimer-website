import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const nextConfig = readFileSync(path.join(root, "next.config.ts"), "utf8");

assert.match(
  nextConfig,
  /source:\s*"\/\$"[\s\S]*?destination:\s*"\/"[\s\S]*?permanent:\s*true/,
  "the Search Console /$ crawl artifact must redirect exactly to the homepage",
);

assert.doesNotMatch(
  nextConfig,
  /source:\s*"\/[^"\n]*\*[^"\n]*\$[^"\n]*"/,
  "malformed-path cleanup must not use a wildcard redirect",
);

console.log("SEO redirect regression passed (2 checks).");
