import { generateICS, prefersNativeCalendarHandoff } from "../ics";

function assert(condition: boolean, message: string) {
  if (!condition) throw new Error(message);
}

const content = generateICS(
  [{ name: "Medication", time: "08:00", description: "Take 500mg (1 pill) with food" }],
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
assert(content.includes("DESCRIPTION:Take 500mg (1 pill) with food"), "calendar export should include optional medication instructions");

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

assert(prefersNativeCalendarHandoff("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 Version/18.6 Safari/605.1.15"), "Mac Safari should use native calendar handoff");
assert(prefersNativeCalendarHandoff("Mozilla/5.0 (iPhone; CPU iPhone OS 18_6 like Mac OS X) AppleWebKit/605.1.15 Version/18.6 Mobile/15E148 Safari/604.1"), "iOS Safari should use native calendar handoff");
assert(!prefersNativeCalendarHandoff("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/139.0.0.0 Safari/537.36"), "Mac Chrome should retain download fallback");
assert(!prefersNativeCalendarHandoff("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/139.0.0.0 Safari/537.36 Edg/139.0.0.0"), "Windows Edge should retain download fallback");
assert(!prefersNativeCalendarHandoff("Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:141.0) Gecko/20100101 Firefox/141.0"), "Firefox should retain download fallback");

console.log("Medication calendar export tests passed.");
