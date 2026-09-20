import assert from "node:assert/strict";
import {
  airportPickupProfiles,
  getAirportPickupPath,
  getAirportPickupProfile,
  isAirportPickupPilotSlug,
  validateAirportPickupProfiles,
} from "../airport-pickup-profiles";

validateAirportPickupProfiles();
assert.equal(airportPickupProfiles.length, 6);
assert.deepEqual(airportPickupProfiles.map(({ code }) => code), ["LAX", "JFK", "EWR", "LGA", "ORD", "ATL"]);

for (const profile of airportPickupProfiles) {
  assert.equal(getAirportPickupProfile(profile.slug), profile);
  assert.equal(isAirportPickupPilotSlug(profile.slug), true);
  assert.equal(getAirportPickupPath(profile.slug), `/airport-pickup/${profile.slug}`);
  assert.ok(profile.directAnswer.length >= 120);
  assert.ok(profile.sources.every(({ url }) => url.startsWith("https://")));
  assert.ok(profile.faqs.length >= 3);
}

assert.equal(isAirportPickupPilotSlug("not-a-pilot"), false);
console.log("airport pickup profile tests passed");
