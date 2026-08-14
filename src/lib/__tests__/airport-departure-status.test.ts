import assert from "node:assert/strict";
import { getAirportDepartureStatus } from "../airport-departure-status";

const now = new Date("2026-08-13T16:23:00-04:00");

assert.deepEqual(
  getAirportDepartureStatus(new Date("2026-08-13T15:09:00-04:00"), "comfortable", now),
  { tone: "urgent", label: "You should have left 1 hr 14 min ago" }
);

assert.deepEqual(
  getAirportDepartureStatus(new Date("2026-08-13T16:33:00-04:00"), "comfortable", now),
  { tone: "urgent", label: "Leave in 10 min" }
);

assert.deepEqual(
  getAirportDepartureStatus(new Date("2026-08-13T17:23:00-04:00"), "comfortable", now),
  { tone: "positive", label: "Leave in 1 hr" }
);

assert.deepEqual(
  getAirportDepartureStatus(new Date("2026-08-13T17:23:00-04:00"), "risk", now),
  { tone: "urgent", label: "Leave in 1 hr · your airport buffer may be risky" }
);

console.log("airport departure status tests passed");
