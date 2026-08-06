import {
  formatMedicationTime,
  generateMedicationTimes,
  isOvernightTime,
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
assert(formatMedicationTime("00:00") === "12:00 midnight", "midnight should be unambiguous");

console.log("Medication schedule tests passed.");
