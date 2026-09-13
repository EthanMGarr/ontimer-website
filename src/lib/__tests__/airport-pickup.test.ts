import { strict as assert } from "node:assert";
import { calculateAirportPickup } from "../airport-pickup";

const plan = calculateAirportPickup({
  arrival: new Date(2026, 8, 14, 18, 0),
  exitMinutes: 45,
  driveMinutes: 35,
  meetMinutes: 10,
});
assert.equal(plan.passengerReady.getHours(), 18);
assert.equal(plan.passengerReady.getMinutes(), 45);
assert.equal(plan.leaveAt.getHours(), 18);
assert.equal(plan.leaveAt.getMinutes(), 0);
assert.throws(() => calculateAirportPickup({ arrival: new Date("bad"), exitMinutes: 20, driveMinutes: 20, meetMinutes: 0 }));
console.log("airport pickup tests passed");
