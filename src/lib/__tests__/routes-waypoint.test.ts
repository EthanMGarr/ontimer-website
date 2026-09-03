import assert from "node:assert/strict";
import { buildRoutesWaypoint } from "../routes-waypoint";

assert.deepEqual(
  buildRoutesWaypoint("40.4006179,-74.2100794"),
  { location: { latLng: { latitude: 40.4006179, longitude: -74.2100794 } } },
  "browser coordinates should use the Routes API latLng waypoint shape"
);
assert.deepEqual(buildRoutesWaypoint(" EWR "), { address: "EWR airport" });
assert.deepEqual(buildRoutesWaypoint("123 Main Street"), { address: "123 Main Street" });
assert.deepEqual(
  buildRoutesWaypoint("91,-74"),
  { address: "91,-74" },
  "out-of-range coordinates must not be emitted as latLng waypoints"
);

console.log("routes waypoint tests passed");
