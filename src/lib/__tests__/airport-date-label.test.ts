import assert from "node:assert/strict";
import { formatAirportDateLabel } from "../airport-date-label";

assert.equal(
  formatAirportDateLabel("2026-08-24", "2026-08-24"),
  "Today, Monday, August 24",
  "today should be identified inside the single date control"
);

assert.equal(
  formatAirportDateLabel("2026-08-25", "2026-08-24"),
  "Tuesday, August 25",
  "future dates should be spelled out without a redundant planning mode"
);

assert.equal(
  formatAirportDateLabel("", "2026-08-24"),
  "Select a date",
  "an empty date should keep the control understandable"
);

console.log("airport date label tests passed");
