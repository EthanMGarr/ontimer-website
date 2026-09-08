import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const pageSource = fs.readFileSync(
  path.join(root, "src/app/airport-time-to-leave-calculator/page.tsx"),
  "utf8"
);
const autocompleteSource = fs.readFileSync(
  path.join(root, "src/components/AirportAutocomplete.tsx"),
  "utf8"
);

assert.doesNotMatch(
  pageSource,
  /airport-directory\.generated/,
  "the server page must not serialize the full airport directory into its initial RSC payload"
);
assert.match(
  autocompleteSource,
  /import\("@\/lib\/airport-directory\.generated"\)/,
  "the browser autocomplete must load the full airport directory on demand"
);
assert.doesNotMatch(
  autocompleteSource,
  /from\s+["']@\/lib\/airport-directory\.generated["']/,
  "the full airport directory must remain a dynamic import"
);

console.log("airport payload regression check passed");
