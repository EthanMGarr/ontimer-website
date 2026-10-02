import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const [page, calculator, destinationPlanner, spanishGeneric, spanishAirport, placeAutocomplete] = await Promise.all([
  readFile(new URL("../src/app/airport-time-to-leave-calculator/page.tsx", import.meta.url), "utf8"),
  readFile(new URL("../src/app/airport-time-to-leave-calculator/AirportCalculator.tsx", import.meta.url), "utf8"),
  readFile(new URL("../src/components/airport/AirportDeparturePlanner.tsx", import.meta.url), "utf8"),
  readFile(new URL("../src/app/es/calculadora-cuando-salir-al-aeropuerto/page.tsx", import.meta.url), "utf8"),
  readFile(new URL("../src/app/es/aeropuerto/[slug]/page.tsx", import.meta.url), "utf8"),
  readFile(new URL("../src/components/PlaceAutocomplete.tsx", import.meta.url), "utf8"),
]);

assert.match(
  page,
  /Enter your flight&apos;s departure time, starting point and airport\./,
  "the generic hero must describe the departure-time input accurately",
);
assert.doesNotMatch(
  `${page}\n${calculator}\n${destinationPlanner}\n${spanishGeneric}\n${spanishAirport}`,
  /genericCalculatorPilot/,
  "the reviewed airport UX must be shared instead of hidden behind a generic-only flag",
);
for (const [name, source] of [
  ["English generic", page],
  ["English airport-specific", destinationPlanner],
  ["Spanish generic", spanishGeneric],
  ["Spanish airport-specific", spanishAirport],
]) {
  assert.match(source, /<AirportCalculator/, `${name} route must use the shared reviewed calculator`);
}
assert.doesNotMatch(
  calculator,
  /hasSelectedFlightType/,
  "the airport calculator must not hide the established domestic default behind an extra selection gate",
);
assert.match(
  calculator,
  /value=\{flightType\}[\s\S]*?onChange=\{setFlightType\}/,
  "the flight-type control must render and update the domestic default normally",
);
assert.match(
  calculator,
  /Recommended airport arrival[\s\S]*?fmtDuration\(defaultBuffer, locale\)[\s\S]*?defaultBuffer} min/,
  "the recommendation must associate the readable duration with its minute total",
);
assert.match(
  calculator,
  /id="airport-origin"[\s\S]*?ariaDescribedBy="airport-origin-help"/,
  "the shared starting-location helper must be attached to the input",
);
assert.doesNotMatch(
  calculator,
  /copy\.addOrigin/,
  "the detached below-submit origin prompt must be removed from the airport family",
);
assert.match(calculator, /beforeFlight: "before the flight"/, "English timing guidance must be localized");
assert.match(calculator, /beforeFlight: "antes del vuelo"/, "Spanish timing guidance must be localized");
assert.match(spanishGeneric, /hora de salida del vuelo/, "the Spanish generic hero must name the departure-time input accurately");
assert.match(
  placeAutocomplete,
  /aria-describedby=\{ariaDescribedBy\}/,
  "PlaceAutocomplete must expose the helper relationship to assistive technology",
);

console.log("airport family review UX checks passed");
