import assert from "node:assert/strict";
import {
  airportLocalDateTime,
  airportLocalInputParts,
  airportTimeZoneForCode,
  airportTimeZoneLabel,
} from "../airport-time-zone";

assert.equal(airportTimeZoneForCode("lax"), "America/Los_Angeles");
assert.equal(airportTimeZoneForCode("JFK"), "America/New_York");
assert.equal(airportTimeZoneForCode("???"), null);

const laxLanding = airportLocalDateTime("2026-11-12", "16:30", "America/Los_Angeles");
assert.equal(laxLanding.toISOString(), "2026-11-13T00:30:00.000Z");
assert.deepEqual(airportLocalInputParts(laxLanding, "America/Los_Angeles"), {
  date: "2026-11-12",
  time: "16:30",
});
assert.equal(airportTimeZoneLabel("America/Los_Angeles", laxLanding), "PST");

console.log("airport time-zone tests passed");
