import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const footer = readFileSync("src/components/Homepage2Footer.tsx", "utf8");

assert.match(
  footer,
  /OnTimer is an iPhone calendar alarm app that turns events from Google Calendar,[\s\S]*Apple Calendar, and Microsoft 365 into automatic, persistent alarms/,
  "the site-wide footer must retain a concrete product and platform description"
);
assert.doesNotMatch(
  footer,
  /Calendars organize time\. OnTimer protects it\./,
  "the descriptive footer must not regress to an abstract second tagline"
);

console.log("site footer copy checks passed");
