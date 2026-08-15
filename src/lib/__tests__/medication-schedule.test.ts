import {
  formatMedicationTime,
  generateMedicationTimes,
  isOvernightTime,
  medicationTimeFromParts,
  medicationTimeParts,
} from "../medication-schedule";

function assert(condition: boolean, message: string) {
  if (!condition) throw new Error(message);
}

const evenlySpaced = generateMedicationTimes("08:00", 3);
assert(
  JSON.stringify(evenlySpaced) === JSON.stringify(["08:00", "16:00", "00:00"]),
  "three daily doses should remain evenly spaced",
);
assert(isOvernightTime("00:00"), "midnight should be flagged as overnight");
assert(isOvernightTime("05:59"), "times before 6am should be flagged as overnight");
assert(isOvernightTime("23:00"), "times from 11pm should be flagged as overnight");
assert(!isOvernightTime("06:00"), "6am should not be flagged as overnight");
assert(!isOvernightTime("22:59"), "times before 11pm should not be flagged as overnight");
assert(formatMedicationTime("") === "Choose a valid time", "empty edited times should not render a malformed label");
assert(formatMedicationTime("00:00") === "12:00 midnight", "midnight should be unambiguous");
assert(
  JSON.stringify(medicationTimeParts("00:00")) === JSON.stringify({ hour: 12, minute: 0, period: "AM" }),
  "midnight should map to an explicit 12 AM selection",
);
assert(medicationTimeFromParts(11, 0, "PM") === "23:00", "11 PM should convert without an AM/PM ambiguity");
assert(medicationTimeFromParts(12, 0, "PM") === "12:00", "12 PM should remain noon");
assert(medicationTimeFromParts(12, 0, "AM") === "00:00", "12 AM should remain midnight");

const fourTimes = generateMedicationTimes("08:00", 4);
assert(
  JSON.stringify(fourTimes) === JSON.stringify(["08:00", "14:00", "20:00", "02:00"]),
  "four daily doses should remain evenly spaced",
);
assert(
  JSON.stringify(generateMedicationTimes("09:30", "custom")) === JSON.stringify(["09:30"]),
  "custom schedules should begin with the selected first dose",
);

console.log("Medication schedule tests passed.");
