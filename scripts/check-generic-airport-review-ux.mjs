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
  calculator,
  /mode: "current"[\s\S]*?airportCode[\s\S]*?jurisdiction: "us"/,
  "current airport status must request licensed evidence independently of the trip date",
);
assert.match(
  calculator,
  /effectivePlanningJurisdiction === "us"[\s\S]*?\^\[A-Z\]\{3\}\$[\s\S]*?fetchCurrentAirportSecurityStatus\(currentSecurityAirportCode\)/,
  "current status must expand only to calculators with a valid U.S. airport code",
);
assert.match(calculator, /data-current-airport-security/, "eligible airport calculators must expose the compact current-security status line");
assert.match(calculator, /`\$\{currentSecurityAirportCode\} security`/, "the current-status label must identify the selected airport concisely");
assert.match(calculator, /hidden sm:inline/, "the optional status qualifier must not widen the narrowest mobile layout");
assert.match(page, /detailPageHref: `\/airport-time-to-leave\/\$\{location\.slug\}`/, "the English generic calculator must map reviewed airports to their canonical detail pages");
assert.match(spanishGeneric, /detailPageHref: spanishAirportSlugs\.includes[\s\S]*?`\/es\/aeropuerto\/\$\{location\.slug\}`[\s\S]*?: undefined/, "the Spanish generic calculator must link only airports with a reviewed localized detail page");
assert.match(calculator, /effectiveAirportOption\?\.detailPageHref[\s\S]*?data-airport-detail-link/, "a selected reviewed airport must expose one contextual detail-page link");
assert.match(calculator, /airport guide & calculator →/, "the contextual airport link must describe both the guide and calculator destination");
assert.match(page, /Does this calculator use current airport security wait times\?/, "the generic FAQ must explain current security evidence");
assert.match(page, /TSAWaitTimes\.com[\s\S]*?not official TSA checkpoint measurements/, "the FAQ must identify the third-party source without implying official TSA measurement");
assert.match(calculator, /data-nosnippet/, "the changing EWR value must not become a stale search-result snippet");
assert.doesNotMatch(
  calculator,
  /data-ewr-current-security|currentEwrSecurityEvidence|locationCode !== "EWR"/,
  "the live-security treatment must no longer be hard-coded to EWR",
);
assert.doesNotMatch(
  calculator,
  /Current TSA security wait time/,
  "the third-party estimate must not be presented as an official TSA measurement",
);
assert.match(
  calculator,
  /replace\(\/\^TM Initiatives:/,
  "raw FAA traffic-management codes must be removed from customer-facing airport updates",
);
assert.match(
  calculator,
  /Departure delays of \$\{minimum\}–\$\{maximum\} min; conditions are/,
  "FAA departure delays must be translated into concise plain language",
);
assert.match(
  calculator,
  /Airport update[\s\S]*?text-zinc-400/,
  "airport updates must use a neutral informational treatment instead of warning-colored body copy",
);
assert.doesNotMatch(
  calculator,
  /text-amber-800/,
  "airport updates must not compete with the result handoff as a warning block",
);
assert.match(
  placeAutocomplete,
  /aria-describedby=\{ariaDescribedBy\}/,
  "PlaceAutocomplete must expose the helper relationship to assistive technology",
);

console.log("airport family review UX checks passed");
