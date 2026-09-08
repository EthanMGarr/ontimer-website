import assert from "node:assert/strict";
import {
  alternateLocalePath,
  localeForPathname,
  localizedAlternates,
  spanishAirportSlugs,
} from "../i18n";
import { spanishAirportCopy } from "../spanish-airports";

assert.equal(localeForPathname("/what-time-should-i-leave"), "en");
assert.equal(localeForPathname("/es/calculadora-a-que-hora-salir"), "es");
assert.equal(localeForPathname("/esoteric"), "en", "only the /es segment should select Spanish");

assert.equal(
  alternateLocalePath("/what-time-should-i-leave"),
  "/es/calculadora-a-que-hora-salir"
);
assert.equal(
  alternateLocalePath("/es/calculadora-cuando-salir-al-aeropuerto"),
  "/airport-time-to-leave-calculator"
);
assert.equal(alternateLocalePath("/features"), null);
assert.equal(
  alternateLocalePath("/airport-time-to-leave/madrid-barajas-mad"),
  "/es/aeropuerto/madrid-barajas-mad"
);
assert.equal(
  alternateLocalePath("/es/aeropuerto/santiago-scl"),
  "/airport-time-to-leave/santiago-scl"
);
assert.equal(alternateLocalePath("/airport-time-to-leave/london-heathrow-lhr"), null);

assert.equal(spanishAirportSlugs.length, 6);
for (const slug of spanishAirportSlugs) {
  const copy = spanishAirportCopy[slug];
  assert.ok(copy.shortName.length > 10, `${slug} needs a reviewed Spanish airport name`);
  assert.ok(copy.directAnswer.length > 100, `${slug} needs a substantive direct answer`);
  assert.ok(copy.airportAccess && copy.terminalAdvice && copy.transitAdvice && copy.finalLegAdvice);
}

assert.deepEqual(
  localizedAlternates("/what-time-should-i-leave", "/es/calculadora-a-que-hora-salir"),
  {
    languages: {
      en: "https://www.ontimer.app/what-time-should-i-leave",
      es: "https://www.ontimer.app/es/calculadora-a-que-hora-salir",
      "x-default": "https://www.ontimer.app/what-time-should-i-leave",
    },
  }
);

console.log("i18n tests passed");
