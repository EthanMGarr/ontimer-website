import { changedDoseTimeIndexes, decodeMedicationSchedule, encodeMedicationSchedule, medicationEmailDraft, medicationShareCopy, scheduleDurationLabel, scheduleFromHash, type SharedMedicationSchedule } from "../medication-share-link";

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
assert(decodeMedicationSchedule(encodeURIComponent(JSON.stringify({ ...schedule, days: "forever" }))) === null, "unrecognized duration strings should be rejected");
assert(JSON.stringify(decodeMedicationSchedule(encodeMedicationSchedule({ ...schedule, days: "ongoing" }))) === JSON.stringify({ ...schedule, days: "ongoing" }), "an ongoing duration should round-trip");
assert(scheduleDurationLabel("ongoing") === "Ongoing (no end date)", "ongoing schedules should read as no end date");
assert(scheduleDurationLabel(1) === "1 day", "a single day should use singular wording");
assert(scheduleDurationLabel(30) === "30 days", "a multi-day duration should use plural wording");
assert(decodeMedicationSchedule(encodeURIComponent(JSON.stringify({ ...schedule, medication: "" }))) === null, "blank medication should be rejected");
assert(decodeMedicationSchedule(encodeURIComponent(JSON.stringify({ ...schedule, takenWithFood: "yes" }))) === null, "a non-boolean taken-with-food value should be rejected");
assert(decodeMedicationSchedule(encodeMedicationSchedule({ ...schedule, takenWithFood: true }))?.takenWithFood === true, "taken-with-food should round-trip through the share link");
assert(decodeMedicationSchedule(encoded)?.takenWithFood === undefined, "omitting taken-with-food should decode as undefined, not a stored false");
const foodEmail = medicationEmailDraft({ ...schedule, takenWithFood: true }, "https://example.com/schedule");
assert(foodEmail.body.includes("Take with food: Yes"), "email drafts should surface the taken-with-food flag when set");
assert(!medicationEmailDraft(schedule, "https://example.com/schedule").body.includes("Take with food"), "email drafts should omit the taken-with-food line when unset");
assert(decodeMedicationSchedule(encodeURIComponent(JSON.stringify({ ...schedule, practiceName: "x".repeat(121) }))) === null, "overlong practice names should be rejected");
assert(scheduleFromHash("#schedule=not-json") === null, "malformed links should fail safely");
assert(medicationShareCopy("Riverside Family Medicine").title === "Your medication schedule from Riverside Family Medicine", "practice name should frame the share subject");
assert(medicationShareCopy().emailBody.includes("No account needed."), "email drafts should explain the private link before showing it");
assert(medicationShareCopy("Ethan", "caregiver").emailBody.includes("help keep the dose times in one place"), "caregiver email copy should feel helpful rather than clinical");
const providerEmail = medicationEmailDraft(schedule, "https://www.ontimer.app/medication-schedule#schedule=example");
assert(providerEmail.subject === "Your medication schedule from Riverside Family Medicine", "provider email subjects should identify the practice without exposing medication details");
assert(providerEmail.body.includes("REVIEW AND ADD IT TO YOUR CALENDAR\nhttps://www.ontimer.app/medication-schedule#schedule=example"), "email drafts should put the complete link beneath a clear action label");
assert(providerEmail.body.includes("Medication: Metformin 500mg"), "email drafts should include a readable medication summary");
assert(providerEmail.body.includes("Starts: August 11, 2026"), "email drafts should format the start date for people rather than machines");
assert(providerEmail.body.includes("Dose times: 8:00 AM, 8:00 PM ET"), "email drafts should summarize every dose time and timezone");
assert(providerEmail.body.includes("does not change or replace the medication label, prescription, or advice from a healthcare professional"), "email drafts should state the organizational limitation clearly");
const caregiverEmail = medicationEmailDraft({ ...schedule, practiceName: "Ethan", senderRole: "caregiver", times: [{ time: "00:00" }] }, "https://example.com/schedule");
assert(caregiverEmail.subject === "A medication schedule to help you stay on track", "caregiver subjects should be warm and avoid medication details");
assert(caregiverEmail.body.includes("12:00 midnight ET"), "email summaries should describe midnight unambiguously");
assert(caregiverEmail.body.includes("contact the prescribing healthcare professional"), "caregiver drafts should direct discrepancies to the prescriber");
assert(decodeMedicationSchedule(encodeMedicationSchedule({ ...schedule, senderRole: "caregiver" }))?.senderRole === "caregiver", "caregiver role should stay in the client-side hash payload");
assert(changedDoseTimeIndexes(["09:00", "20:00"], ["08:00", "20:00"]).length === 1, "a changed dose time should be detected");
assert(changedDoseTimeIndexes(["08:00", "20:00"], ["08:00", "20:00"]).length === 0, "reverting a dose time should clear the change state");

console.log("Medication share-link tests passed.");
