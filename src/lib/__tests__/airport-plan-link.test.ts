import assert from "node:assert/strict";
import { buildAirportPlanLink, parseAirportPlanLink } from "../airport-plan-link";

const departureUrl = buildAirportPlanLink({
  kind: "departure",
  airportCode: "ewr",
  departureAt: new Date("2026-10-12T14:59:00Z"),
  flightType: "international",
  checkedBag: true,
  arrivalMode: "rideshare",
});
assert.equal(
  departureUrl,
  "https://www.ontimer.app/airport-time-to-leave-calculator?v=1&k=dep&a=EWR&dep=2026-10-12T14%3A59%3A00Z&ft=intl&bag=1&m=rideshare",
);
assert.deepEqual(parseAirportPlanLink(departureUrl), {
  kind: "departure",
  airportCode: "EWR",
  departureAt: new Date("2026-10-12T14:59:00Z"),
  flightType: "international",
  checkedBag: true,
  arrivalMode: "rideshare",
});

const pickupUrl = buildAirportPlanLink({
  kind: "pickup",
  airportCode: "LAX",
  landingAt: new Date("2026-11-03T07:05:00Z"),
  flightType: "domestic",
  checkedBag: false,
  meetMode: "inside",
});
assert.deepEqual(parseAirportPlanLink(pickupUrl), {
  kind: "pickup",
  airportCode: "LAX",
  landingAt: new Date("2026-11-03T07:05:00Z"),
  flightType: "domestic",
  checkedBag: false,
  meetMode: "inside",
});

const fallbackUrl = new URL(buildAirportPlanLink({
  kind: "departure",
  airportName: "Heathrow Airport",
  departureAt: new Date("2026-12-20T18:30:00Z"),
  flightType: "international",
  checkedBag: false,
  arrivalMode: "transit",
  locale: "es",
}));
assert.equal(fallbackUrl.pathname, "/es/calculadora-cuando-salir-al-aeropuerto");
assert.equal(fallbackUrl.searchParams.has("a"), false);
assert.equal(fallbackUrl.searchParams.get("an"), "Heathrow Airport");

assert.deepEqual(
  parseAirportPlanLink("?v=1&k=dep&a=TOOLONG&an=Newark&dep=not-a-date&ft=other&bag=maybe&m=boat&origin=home"),
  { kind: "departure", airportName: "Newark" },
);
assert.equal(parseAirportPlanLink("?v=2&k=dep&a=EWR"), null);
assert.equal(parseAirportPlanLink("?v=1&k=unknown&a=EWR"), null);

for (const builtUrl of [departureUrl, pickupUrl, fallbackUrl.toString()]) {
  const params = new URL(builtUrl).searchParams;
  for (const personalField of [
    "origin", "address", "lat", "lng", "relationship", "precheck", "clear",
    "travel", "security", "buffer",
  ]) {
    assert.equal(params.has(personalField), false, `${personalField} must never be emitted`);
  }
}

console.log("airport plan link tests passed");
