import { generateICS } from "../ics";

function assert(condition: boolean, message: string) {
  if (!condition) throw new Error(message);
}

const content = generateICS(
  [{ name: "Medication", time: "08:00" }],
  new Date(2026, 7, 6),
  7,
  "America/Los_Angeles",
  new Date("2026-08-06T12:00:00Z"),
);

assert(
  content.includes("DTSTART;TZID=America/Los_Angeles:20260806T080000"),
  "calendar events should include the selected time zone",
);
assert(content.includes("RRULE:FREQ=DAILY;COUNT=7"), "calendar events should retain duration");
assert(content.includes("BEGIN:VALARM"), "calendar events should include an alert");
assert(content.includes("TRIGGER:PT0M"), "calendar alerts should fire at dose time");

const afternoonExport = generateICS(
  [
    { name: "Medication", time: "08:00" },
    { name: "Medication", time: "16:00" },
    { name: "Medication", time: "00:00", dayOffset: 1 },
  ],
  new Date(2026, 7, 6),
  7,
  "America/New_York",
  new Date("2026-08-06T19:00:00Z"),
);

assert(
  afternoonExport.includes("DTSTART;TZID=America/New_York:20260807T080000"),
  "a dose time that already passed should begin tomorrow",
);
assert(
  afternoonExport.includes("DTSTART;TZID=America/New_York:20260806T160000"),
  "the next upcoming dose should still begin today",
);
assert(
  afternoonExport.includes("DTSTART;TZID=America/New_York:20260807T000000"),
  "a wrapped overnight dose should begin on the following day",
);

console.log("Medication calendar export tests passed.");
