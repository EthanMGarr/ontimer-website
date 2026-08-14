import { decodeMedicationSchedule, encodeMedicationSchedule, scheduleFromHash, type SharedMedicationSchedule } from "../medication-share-link";

function assert(condition: boolean, message: string) {
  if (!condition) throw new Error(message);
}

const schedule: SharedMedicationSchedule = {
  version: 1,
  medication: "Metformin 500mg",
  instructions: "Take 1 pill with food",
  startDate: "2026-08-11",
  days: 30,
  times: [{ time: "08:00" }, { time: "20:00" }],
  timeZone: "America/New_York",
};
const encoded = encodeMedicationSchedule(schedule);
assert(JSON.stringify(decodeMedicationSchedule(encoded)) === JSON.stringify(schedule), "share payload should round-trip");
assert(scheduleFromHash(`#schedule=${encoded}`)?.medication === schedule.medication, "hash should decode locally");
assert(decodeMedicationSchedule(encodeURIComponent(JSON.stringify({ ...schedule, days: 0 }))) === null, "invalid duration should be rejected");
assert(decodeMedicationSchedule(encodeURIComponent(JSON.stringify({ ...schedule, medication: "" }))) === null, "blank medication should be rejected");
assert(scheduleFromHash("#schedule=not-json") === null, "malformed links should fail safely");

console.log("Medication share-link tests passed.");

