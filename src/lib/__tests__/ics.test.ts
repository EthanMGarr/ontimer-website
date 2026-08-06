import { generateICS } from "../ics";

function assert(condition: boolean, message: string) {
  if (!condition) throw new Error(message);
}

const content = generateICS(
  [{ name: "Medication", time: "08:00" }],
  new Date(2026, 7, 6),
  7,
  "America/Los_Angeles",
);

assert(
  content.includes("DTSTART;TZID=America/Los_Angeles:20260806T080000"),
  "calendar events should include the selected time zone",
);
assert(content.includes("RRULE:FREQ=DAILY;COUNT=7"), "calendar events should retain duration");

console.log("Medication calendar export tests passed.");
