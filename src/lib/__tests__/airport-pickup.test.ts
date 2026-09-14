import { strict as assert } from "node:assert";
import { calculateAirportPickup } from "../airport-pickup";

const arrival = new Date("2026-09-13T20:42:00-04:00");
const curbside = calculateAirportPickup({ arrival, deplaneMinutes: 10, airportWalkMinutes: 10, bagMinutes: 0, immigrationMinutes: 0, driveMinutes: 31, parkingMinutes: 0, curbTimingMinutes: 5 });
assert.equal(curbside.passengerReady.toISOString(), "2026-09-14T01:02:00.000Z");
assert.equal(curbside.leaveAt.toISOString(), "2026-09-14T00:36:00.000Z");
assert.equal(curbside.landingToReadyMinutes, 20);
const meetInside = calculateAirportPickup({ arrival, deplaneMinutes: 10, airportWalkMinutes: 10, bagMinutes: 20, immigrationMinutes: 45, driveMinutes: 31, parkingMinutes: 20, curbTimingMinutes: 0 });
assert.equal(meetInside.landingToReadyMinutes, 85);
assert.equal(meetInside.leaveAt.toISOString(), "2026-09-14T01:16:00.000Z");
assert.throws(() => calculateAirportPickup({ arrival: new Date("bad"), deplaneMinutes: 10, airportWalkMinutes: 10, bagMinutes: 0, immigrationMinutes: 0, driveMinutes: 30, parkingMinutes: 0, curbTimingMinutes: 5 }));
console.log("airport pickup tests passed");
