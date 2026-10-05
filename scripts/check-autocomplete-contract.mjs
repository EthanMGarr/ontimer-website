import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const autocomplete = readFileSync("src/components/PlaceAutocomplete.tsx", "utf8");
const travelRoute = readFileSync("src/app/api/travel-time/route.ts", "utf8");

assert.match(
  autocomplete,
  /types === "airport" \? "off" : "street-address"/,
  "shared address inputs must advertise street-address semantics so saved contacts fill the complete address"
);
assert.match(
  autocomplete,
  /finishBulkLookupAfterBlurRef\.current \|\| provider === "mapbox"/,
  "saved-address and paste lookups must survive leaving the field for both Google and Mapbox"
);
assert.match(
  autocomplete,
  /selectFirstAfterBlurRef\.current = true/,
  "a saved address must resolve to the reviewed top suggestion before routing"
);
assert.match(
  travelRoute,
  /code === "invalid_location" \? 422 : 502/,
  "invalid locations must have a stable response distinct from provider outages"
);

const consumers = [
  "src/app/airport-pickup-time-calculator/AirportPickupCalculator.tsx",
  "src/app/airport-time-to-leave-calculator/AirportCalculator.tsx",
  "src/app/airport-theory-calculator/AirportTheoryCalculator.tsx",
  "src/app/cruise-time-to-leave/CruiseCalculator.tsx",
  "src/app/events/[slug]/when-to-leave/EventLeaveCalculator.tsx",
  "src/app/wake-up-time-calculator/WakeUpCalculator.tsx",
  "src/app/what-time-should-i-leave/LeaveTimeCalculator.tsx",
];

for (const file of consumers) {
  const source = readFileSync(file, "utf8");
  const placeInputs = source.match(/<PlaceAutocomplete[\s\S]*?\/>/g) ?? [];
  const addressInputs = placeInputs.filter((input) => !/types="airport"/.test(input));
  assert.ok(addressInputs.length > 0, `${file} must contain a shared address autocomplete`);
  for (const input of addressInputs) {
    assert.match(
      input,
      /onResolutionChange=/,
      `${file} must wait for saved-address resolution before calculating`
    );
  }
  assert.match(
    source,
    /isInvalidTravelTimeLocation/,
    `${file} must distinguish invalid addresses from travel-service failures`
  );
}

console.log("shared autocomplete contract checks passed");
