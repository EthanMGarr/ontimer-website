import { generateProviderMedicationICS, MEDICATION_EVENT_LOCATION_MARKER } from "../provider-medication-calendar";

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
assert(content.includes(`LOCATION:${MEDICATION_EVENT_LOCATION_MARKER}`), "every medication event should carry the OnTimer medication-schedule location marker");

const foodContent = generateProviderMedicationICS({
  medication: "Lisinopril",
  instructions: "1 tablet",
  startDate: "2026-08-10",
  days: 30,
  times: [{ time: "08:00" }],
  timeZone: "America/New_York",
  takenWithFood: true,
}, new Date("2026-08-10T12:00:00Z"));

assert(foodContent.includes("DESCRIPTION:Take Lisinopril — 1 tablet — Take with food"), "the taken-with-food flag should append to the description after instructions");

const foodNoInstructionsContent = generateProviderMedicationICS({
  medication: "Lisinopril",
  instructions: "",
  startDate: "2026-08-10",
  days: 30,
  times: [{ time: "08:00" }],
  takenWithFood: true,
}, new Date("2026-08-10T12:00:00Z"));

assert(foodNoInstructionsContent.includes("DESCRIPTION:Take Lisinopril — Take with food"), "the taken-with-food flag should still append when there are no instructions");

const mealContent = generateProviderMedicationICS({
  medication: "Lisinopril",
  instructions: "1 tablet",
  startDate: "2026-08-10",
  days: 30,
  times: [{ time: "08:15", mealLabel: "Breakfast" }, { time: "18:30", mealLabel: "Dinner" }],
  takenWithFood: true,
}, new Date("2026-08-10T12:00:00Z"));

assert(mealContent.includes("SUMMARY:Breakfast dose: Take Lisinopril"), "meal-based calendar events should identify the breakfast dose");
assert(mealContent.includes("SUMMARY:Dinner dose: Take Lisinopril"), "meal-based calendar events should identify the dinner dose");

const routineContent = generateProviderMedicationICS({
  medication: "Lisinopril",
  instructions: "1 tablet",
  startDate: "2026-08-10",
  days: 30,
  times: [{ time: "07:00", doseLabel: "Wake-up" }, { time: "21:00", doseLabel: "Bedtime" }],
}, new Date("2026-08-10T12:00:00Z"));

assert(routineContent.includes("SUMMARY:Wake-up dose: Take Lisinopril"), "routine calendar events should identify the wake-up dose");
assert(routineContent.includes("SUMMARY:Bedtime dose: Take Lisinopril"), "routine calendar events should identify the bedtime dose");

const ongoingContent = generateProviderMedicationICS({
  medication: "Metformin, 500mg",
  instructions: "with food; follow prescribed directions",
  startDate: "2026-08-10",
  days: "ongoing",
  times: [{ time: "08:00" }, { time: "20:00" }],
  timeZone: "America/New_York",
}, new Date("2026-08-10T12:00:00Z"));

assert(ongoingContent.includes("RRULE:FREQ=DAILY\r\n"), "an ongoing schedule should recur daily with no COUNT or UNTIL");
assert(!ongoingContent.includes("COUNT="), "an ongoing schedule must not include a COUNT limit");

console.log("Provider medication calendar tests passed.");
