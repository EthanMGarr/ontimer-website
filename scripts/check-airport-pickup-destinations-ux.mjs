import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
const route = read("src/app/airport-pickup/[slug]/page.tsx");
const calculator = read("src/app/airport-pickup-time-calculator/AirportPickupCalculator.tsx");
const departure = read("src/app/airport-time-to-leave/[slug]/page.tsx");
const sitemap = read("src/app/sitemap.ts");
const header = read("src/components/Homepage2Header.tsx");
const footer = read("src/components/Homepage2Footer.tsx");

assert.match(route, /dynamicParams = false/);
assert.match(route, /alternates: \{ canonical: url \}/);
assert.match(route, /FAQPage/);
assert.match(route, /lockAirport/);
assert.match(route, /AirportIntentNav/);
assert.match(calculator, /pageType\?: "generic_pickup" \| "airport_pickup"/);
assert.match(calculator, /planning_intent: "pickup"/);
assert.match(departure, /requestedIntent === "dropoff"/);
assert.match(sitemap, /airportPickupProfiles\.map/);
assert.equal((header.match(/href: "\/airport-pickup-time-calculator"/g) ?? []).length, 1);
assert.equal((footer.match(/"\/airport-pickup-time-calculator"/g) ?? []).length, 1);
assert.doesNotMatch(header, /\/airport-pickup\//);
assert.doesNotMatch(footer, /\/airport-pickup\//);

console.log("airport pickup destination UX contract passed");
