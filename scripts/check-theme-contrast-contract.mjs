import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const [themeCss, airportCalculator, designSystem] = await Promise.all([
  readFile(new URL("../src/app/globals.css", import.meta.url), "utf8"),
  readFile(new URL("../src/app/airport-time-to-leave-calculator/AirportCalculator.tsx", import.meta.url), "utf8"),
  readFile(new URL("../design.md", import.meta.url), "utf8"),
]);

for (const className of [
  "text-sky-300",
  "text-amber-200",
  "text-amber-400",
  "text-red-200",
  "text-red-400",
]) {
  assert.match(
    themeCss,
    new RegExp(`\\.site-modern \\.${className.replace("-", "\\-")}`),
    `${className} must have a light-theme foreground override`,
  );
}

for (const token of ["text-green-500/70", "bg-green-950/60"]) {
  assert(themeCss.includes(`[class~="${token}"]`), `${token} must have a light-theme override`);
}
assert.match(themeCss, /\.bg-green-500\.text-zinc-950/);
assert.match(themeCss, /p a\.text-green-400/);

const handoffPosition = airportCalculator.indexOf("<CalendarOnTimerHandoff");
const securityPosition = airportCalculator.indexOf('aria-label={locale === "es" ? "Estimación de seguridad actual"');
assert(handoffPosition > -1 && securityPosition > handoffPosition, "Live security data must follow the calendar handoff");
assert(!airportCalculator.includes("TSAWaitTimes.com estimate"), "The result must not promote the licensed provider");
assert(!airportCalculator.includes("Estimación de TSAWaitTimes.com"), "The Spanish result must not promote the licensed provider");
assert.match(airportCalculator, /Security now/);
assert.match(designSystem, /must not push that handoff below the first practical\s+mobile result viewport/);

console.log("Theme contrast and calculator CTA hierarchy contract passed.");
