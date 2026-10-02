import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const autocomplete = readFileSync("src/components/PlaceAutocomplete.tsx", "utf8");
const searchRoute = readFileSync("src/app/api/mapbox-search/route.ts", "utf8");
const travelRoute = readFileSync("src/app/api/travel-time/route.ts", "utf8");
const calculator = readFileSync("src/app/what-time-should-i-leave/LeaveTimeCalculator.tsx", "utf8");
const page = readFileSync("src/app/what-time-should-i-leave/page.tsx", "utf8");
const spanishPage = readFileSync("src/app/es/calculadora-a-que-hora-salir/page.tsx", "utf8");
const pilotGate = readFileSync("src/lib/mapbox-pilot.ts", "utf8");

assert.match(page, /dynamic = "force-dynamic"[\s\S]*?isMapboxPilotActive\(\)/, "the English page must evaluate the expiring pilot gate per request");
assert.match(spanishPage, /dynamic = "force-dynamic"[\s\S]*?isMapboxPilotActive\(\)/, "the Spanish page must evaluate the expiring pilot gate per request");
assert.match(pilotGate, /MAPBOX_PILOT_ENABLED[\s\S]*?MAPBOX_ACCESS_TOKEN[\s\S]*?MAPBOX_PILOT_EXPIRES_AT/, "the pilot must require its flag, token, and expiry");
assert.match(pilotGate, /now < expiresAt/, "the pilot must fail closed after its expiry");
assert.match(searchRoute, /guardPaidApiRequest\(request, MAPBOX_SEARCH_RATE_LIMIT\)/, "Mapbox search must retain same-origin and rate-limit guards");
assert.match(searchRoute, /export async function POST/, "Mapbox search inputs must stay out of access-log query strings");
assert.match(searchRoute, /!isMapboxPilotActive\(\)/, "the search route must enforce the expiring server-side kill switch");
assert.match(autocomplete, /const sessionToken = mapboxSessionToken\(\);[\s\S]*?sessionToken,/, "retrieve must reuse the active Mapbox session token");
assert.match(autocomplete, /mapboxSessionRef\.current = null/, "a completed selection must end the client search session");
assert.match(autocomplete, /Search results powered by Mapbox/, "Mapbox suggestions must identify their provider");
assert.match(autocomplete, /\[prediction\.mainText\.trim\(\), prediction\.secondaryText\.trim\(\)\][\s\S]*?description: reviewedDescription/, "Mapbox selection must preserve exactly the visible suggestion label instead of hidden full-address metadata");
assert.match(calculator, /travelMode !== "TRANSIT"/, "transit must remain on Google routing");
assert.match(calculator, /originCoordinates[\s\S]*?destinationCoordinates[\s\S]*?\? "mapbox"[\s\S]*?: "google"/, "Mapbox routing must require selected coordinates and retain Google fallback");
assert.match(travelRoute, /Never retry one paid provider with another/, "a failed paid request must not trigger a second provider charge");
assert.match(calculator, /provider === "mapbox"[\s\S]*?method: "POST"/, "Mapbox route inputs must stay out of access-log query strings");
assert.doesNotMatch(travelRoute, /origin="\$\{origin\}"|dest="\$\{destination\}"/, "routing logs must not contain entered locations");

console.log("mapbox pilot source checks passed");
