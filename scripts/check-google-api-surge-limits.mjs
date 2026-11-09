import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const travelRoute = readFileSync("src/app/api/travel-time/route.ts", "utf8");
const placesRoute = readFileSync("src/app/api/places-autocomplete/route.ts", "utf8");
const reverseGeocodeRoute = readFileSync("src/app/api/reverse-geocode/route.ts", "utf8");

assert.match(
  travelRoute,
  /perIpLimit: 12,[\s\S]*?globalLimit: 25_000,[\s\S]*?globalWindowMs: 24 \* 60 \* 60 \* 1000/,
  "travel-time must retain its per-IP guard while allowing the 25,000-request provider day"
);
assert.match(
  placesRoute,
  /perIpLimit: 60,[\s\S]*?globalLimit: 50_000,[\s\S]*?globalWindowMs: 24 \* 60 \* 60 \* 1000/,
  "autocomplete must retain its per-IP guard while allowing the 50,000-request provider day"
);
assert.match(
  reverseGeocodeRoute,
  /perIpLimit: 20,[\s\S]*?globalLimit: 3_000,[\s\S]*?globalWindowMs: 60 \* 1000/,
  "reverse geocoding must retain its per-IP guard while allowing the 3,000-request provider minute"
);

for (const [name, source] of [
  ["travel-time", travelRoute],
  ["autocomplete", placesRoute],
  ["reverse-geocode", reverseGeocodeRoute],
]) {
  assert.match(source, /guard(?:Paid|Google)ApiRequest\(/, `${name} must keep the paid-API request guard`);
}

console.log("Google API surge-limit checks passed");
