import { changedDoseTimeIndexes, decodeMedicationSchedule, encodeMedicationSchedule, medicationShareCopy, scheduleFromHash, type SharedMedicationSchedule } from "../medication-share-link";

function assert(condition: boolean, message: string) {
  if (!condition) throw new Error(message);
}

const schedule: SharedMedicationSchedule = {
  version: 1,
  medication: "Metformin 500mg",
  practiceName: "Riverside Family Medicine",
  instructions: "Take 1 pill with food",
  startDate: "2026-08-11",
  days: 30,
  times: [{ time: "08:00" }, { time: "20:00" }],
  timeZone: "America/New_York",
};
const encoded = encodeMedicationSchedule(schedule);
const compactBinary = Array.from(new TextEncoder().encode(JSON.stringify(schedule)), (byte) => String.fromCharCode(byte)).join("");
const compactEncoded = `v1_${btoa(compactBinary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")}`;
assert(encoded.startsWith("%7B"), "new share links should retain the original iOS Mail-compatible percent-encoded format");
assert(JSON.stringify(decodeMedicationSchedule(encoded)) === JSON.stringify(schedule), "share payload should round-trip");
assert(JSON.stringify(decodeMedicationSchedule(compactEncoded)) === JSON.stringify(schedule), "compact links already shared should remain valid");
assert(JSON.stringify(decodeMedicationSchedule(encodeURIComponent(JSON.stringify(schedule)))) === JSON.stringify(schedule), "existing URL-encoded links should remain valid");
assert(scheduleFromHash(`#schedule=${encoded}`)?.medication === schedule.medication, "original keyed hash should decode locally");
assert(scheduleFromHash(`#schedule=${encoded}`)?.practiceName === schedule.practiceName, "practice name should stay in the client-side hash payload");
assert(decodeMedicationSchedule(encodeURIComponent(JSON.stringify({ ...schedule, days: 0 }))) === null, "invalid duration should be rejected");
assert(decodeMedicationSchedule(encodeURIComponent(JSON.stringify({ ...schedule, medication: "" }))) === null, "blank medication should be rejected");
assert(decodeMedicationSchedule(encodeURIComponent(JSON.stringify({ ...schedule, practiceName: "x".repeat(121) }))) === null, "overlong practice names should be rejected");
assert(scheduleFromHash("#schedule=not-json") === null, "malformed links should fail safely");
assert(medicationShareCopy("Riverside Family Medicine").title === "Your medication schedule from Riverside Family Medicine", "practice name should frame the share subject");
assert(medicationShareCopy().emailBody.includes("No account needed."), "email drafts should explain the private link before showing it");
assert(changedDoseTimeIndexes(["09:00", "20:00"], ["08:00", "20:00"]).length === 1, "a changed dose time should be detected");
assert(changedDoseTimeIndexes(["08:00", "20:00"], ["08:00", "20:00"]).length === 0, "reverting a dose time should clear the change state");

console.log("Medication share-link tests passed.");
