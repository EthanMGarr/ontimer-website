import { strict as assert } from "node:assert";
import { calculateAirportPickup, pickupTrafficEstimateAt, recommendedPickupTrafficCushion } from "../airport-pickup";

const arrival = new Date("2026-09-13T20:42:00-04:00");
const curbside = calculateAirportPickup({ arrival, deplaneMinutes: 10, airportWalkMinutes: 10, bagMinutes: 0, immigrationMinutes: 0, driveMinutes: 31, trafficCushionMinutes: 15, parkingMinutes: 0, curbTimingMinutes: 0 });
assert.equal(curbside.passengerReady.toISOString(), "2026-09-14T01:02:00.000Z");
assert.equal(curbside.leaveAt.toISOString(), "2026-09-14T00:16:00.000Z");
assert.equal(curbside.landingToReadyMinutes, 20);
assert.equal(curbside.trafficCushionMinutes, 15);
const meetInside = calculateAirportPickup({ arrival, deplaneMinutes: 10, airportWalkMinutes: 10, bagMinutes: 20, immigrationMinutes: 45, driveMinutes: 31, trafficCushionMinutes: 15, parkingMinutes: 20, curbTimingMinutes: 0 });
assert.equal(meetInside.landingToReadyMinutes, 85);
assert.equal(meetInside.leaveAt.toISOString(), "2026-09-14T01:01:00.000Z");
assert.equal(recommendedPickupTrafficCushion(31), 30);
assert.equal(recommendedPickupTrafficCushion(70), 30);
assert.equal(recommendedPickupTrafficCushion(240), 60);
assert.equal(
  pickupTrafficEstimateAt(new Date("2026-11-13T00:30:00.000Z")).toISOString(),
  "2026-11-12T23:00:00.000Z",
);
assert.throws(() => calculateAirportPickup({ arrival: new Date("bad"), deplaneMinutes: 10, airportWalkMinutes: 10, bagMinutes: 0, immigrationMinutes: 0, driveMinutes: 30, trafficCushionMinutes: 15, parkingMinutes: 0, curbTimingMinutes: 0 }));
console.log("airport pickup tests passed");
