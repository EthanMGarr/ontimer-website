import assert from "node:assert/strict";
import {
  airportPickupProfiles,
  getAirportPickupPath,
  getAirportPickupProfile,
  isAirportPickupPilotSlug,
  validateAirportPickupProfiles,
} from "../airport-pickup-profiles";

validateAirportPickupProfiles();
assert.equal(airportPickupProfiles.length, 12);
assert.deepEqual(airportPickupProfiles.map(({ code }) => code), [
  "LAX", "JFK", "EWR", "LGA", "ORD", "ATL",
  "LAS", "IAD", "DEN", "BOS", "PDX", "DFW",
]);

for (const profile of airportPickupProfiles) {
  assert.equal(getAirportPickupProfile(profile.slug), profile);
  assert.equal(isAirportPickupPilotSlug(profile.slug), true);
  assert.equal(getAirportPickupPath(profile.slug), `/airport-pickup/${profile.slug}`);
  assert.ok(profile.directAnswer.length >= 120);
  assert.ok(profile.sources.every(({ url }) => url.startsWith("https://")));
  assert.ok(profile.faqs.length >= 3);
  assert.ok(profile.pickupRules.length >= 3);
  assert.ok(profile.waitingOptions.length >= 2);
  assert.ok(profile.terminalConsiderations.length >= 2);
  assert.ok(profile.groundAccessNotes.length >= 2);
}

assert.equal(isAirportPickupPilotSlug("not-a-pilot"), false);
console.log("airport pickup profile tests passed");
