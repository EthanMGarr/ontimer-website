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
assert.match(
  footer,
  /\["Days Until Calculator", "\/days-until"\]/,
  "the site-wide footer must link to the published Days Until hub"
);
assert.match(footer, /\["Airport Pickup Time Calculator", "\/airport-pickup-time-calculator"\]/, "the footer must link to the airport pickup calculator");

const header = readFileSync("src/components/Homepage2Header.tsx", "utf8");
assert.match(
  header,
  /href: "\/days-until", label: "Days Until Calculator"/,
  "the shared Tools menu must link to the published Days Until hub"
);
assert.match(header, /href: "\/airport-pickup-time-calculator", label: "Airport Pickup Time Calculator"/, "the Tools menu must link to the airport pickup calculator");

console.log("site footer copy checks passed");
