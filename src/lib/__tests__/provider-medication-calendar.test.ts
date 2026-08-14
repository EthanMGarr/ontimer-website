import { generateProviderMedicationICS } from "../provider-medication-calendar";

function assert(condition: boolean, message: string) {
  if (!condition) throw new Error(message);
}

const content = generateProviderMedicationICS({
  medication: "Metformin, 500mg",
  instructions: "with food; follow prescribed directions",
  startDate: "2026-08-10",
  days: 30,
  times: [{ time: "08:00" }, { time: "20:00" }],
  timeZone: "America/New_York",
}, new Date("2026-08-10T12:00:00Z"));

assert((content.match(/BEGIN:VEVENT/g) || []).length === 2, "each dose time should create one recurring event");
assert(content.includes("RRULE:FREQ=DAILY;COUNT=30"), "provider schedules should reuse daily duration recurrence");
assert(content.includes("SUMMARY:Take Metformin\\, 500mg"), "calendar text should be escaped");
assert(content.includes("DESCRIPTION:Take Metformin\\, 500mg — with food\\; follow prescribed directions"), "instructions should be included safely");

console.log("Provider medication calendar tests passed.");
