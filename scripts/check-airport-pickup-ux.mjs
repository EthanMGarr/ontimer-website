import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const page = readFileSync("src/app/airport-pickup-time-calculator/page.tsx", "utf8");
const calculator = readFileSync("src/app/airport-pickup-time-calculator/AirportPickupCalculator.tsx", "utf8");
const prefill = readFileSync("src/components/airport/AirportPickupPlanPrefill.tsx", "utf8");
const css = readFileSync("src/app/airport-pickup-time-calculator/pickup.css", "utf8");
const directory = readFileSync("src/app/airport-time-calculators/page.tsx", "utf8");
const pickupDirectory = readFileSync("src/app/airport-pickup-calculators/page.tsx", "utf8");
const siteSystem = readFileSync("src/app/site-system.css", "utf8");
const calculatorDateField = readFileSync("src/components/leave-time/CalculatorDateField.tsx", "utf8");
const airportTimeZone = readFileSync("src/lib/airport-time-zone.ts", "utf8");
assert.doesNotMatch(page, /No flight-data subscription required/);
for (const relationship of ["wife", "husband", "girlfriend", "boyfriend", "daughter", "son", "cousin", "friend", "colleague"]) assert.match(page, new RegExp(relationship));
assert.match(page, /Find out exactly when to leave for an airport pickup/);
assert.match(calculator, /PlaceAutocomplete/);
assert.match(calculator, /CurrentLocationControl/);
assert.match(calculator, /active=\{currentLocation !== null\}/);
assert.match(calculator, /onLocationChange=\{handleCurrentLocationChange\}/);
assert.match(calculator, /fetchDriveTime\(currentLocation \?\? origin, airport, pickupTrafficEstimateAt\(arrival\)\)/,
  "pickup routing must use current-location coordinates and a plausible departure window instead of routing at passenger-ready time");
assert.match(calculator, /\/api\/travel-time/);
assert.match(calculator, /trafficModel: "pessimistic"/, "pickup routing must request Google's bad-traffic planning model");
assert.match(calculator, /Recommended leave by/);
assert.match(calculator, /recommendedPickupTrafficCushion\(driveMinutes\)/, "automatic pickup routes must add a visible traffic cushion");
assert.match(calculator, /Passenger has Global Entry/, "international pickups must support expedited arrival processing");
assert.match(calculator, /globalEntry \? 15 : 45/, "Global Entry must change the passenger-ready planning estimate");
assert.match(calculator, /arrival\.getTime\(\) <= Date\.now\(\)/, "pickup calculations must reject a landing time that has already passed");
assert.match(calculator, /postCalendarHeading="Get an alarm when it’s time to leave\."/);
assert.match(calculator, /postCalendarBody="OnTimer turns this pickup into an automatic calendar alarm\."/);
assert.match(calculator, /buildAirportPlanLink\(\{[\s\S]*kind: "pickup"/, "pickup results must emit the shared v1 airport-plan URL");
assert.match(calculator, /buildPickupAirportPlanCalendarDescription/, "pickup calendar descriptions must include the shared recalculation block");
assert.match(calculator, /onOptionSelected=\{\(option\) => setSelectedAirportCode\(option\?\.code \?\? null\)\}/, "pickup links must retain a selected airport's IATA code");
assert.match(page, /<Suspense fallback=\{<AirportPickupCalculator \/>\}>[\s\S]*<AirportPickupPlanPrefill \/>/, "pickup URL prefill must be isolated behind Suspense");
assert.match(prefill, /parseAirportPlanLink\(searchParams\)/, "pickup URL prefill must use the shared v1 parser");
assert.match(prefill, /searchParams\.get\("airport"\)/, "the legacy pickup airport query must remain supported");
assert.match(calculator, /CalculatorDateField/);
assert.match(calculator, /inputId="pickup-arrival-date"/);
assert.match(calculator, /Flight lands at/);
assert.match(calculatorDateField, /type="date"/);
assert.match(calculatorDateField, /formatAirportDateLabel\(value, today, locale\)/);
assert.match(calculator, /id="pickup-arrival-time"[^>]+type="time"/);
assert.doesNotMatch(calculator, /type="datetime-local"/);
assert.match(calculator, /airportLocalDateTime\(arrivalDate, arrivalTime, airportTimeZone\)/, "pickup must interpret the entered landing time in the selected airport's time zone");
assert.match(calculator, /Flight date at the airport/, "pickup must label the date as airport-local");
assert.match(calculator, /Flight lands at \(\{landingTimeZoneLabel\}\)/, "pickup must show the airport time-zone abbreviation beside the landing time");
assert.match(airportTimeZone, /airport-time-zones\.generated/, "pickup time zones must use the compact generated IATA lookup rather than shipping the source dataset to every visitor");
assert.match(airportTimeZone, /instant = wallClockUtc - offsetAt\(instant\)/, "airport-local time conversion must account for the offset at the target date, including DST");
assert.doesNotMatch(calculator, /setDate\(date\.getDate\(\) \+ 1\)/, "pickup landing must not start with an invented date");
assert.doesNotMatch(calculator, /setHours\(18, 0, 0, 0\)/, "pickup landing must not start with an invented time");
assert.doesNotMatch(calculator, /flightNumber|pickup-flight-number|Flight number/);
assert.match(calculator, /<section className="pickup-form-section" aria-labelledby="pickup-flight-arrival-heading">/);
assert.match(calculator, /<h2 id="pickup-flight-arrival-heading">\{plan \? "Edit Trip" : "Flight arrival"\}<\/h2>/);
assert.doesNotMatch(calculator, /<legend>Flight arrival<\/legend>/);
assert.doesNotMatch(calculator, /pickup-preview/);
assert.match(calculatorDateField, /onPointerDown=\{openPicker\}/);
assert.match(calculatorDateField, /input\.showPicker\(\)/);
assert.ok(
  calculator.indexOf("calendarHref=") < calculator.indexOf('<div className="pickup-timeline">'),
  "the result must show the calendar handoff before optional timeline detail",
);
assert.ok(
  calculator.indexOf('pickup-result pickup-result--ready') < calculator.indexOf('<form className="pickup-form"'),
  "the calculated answer must come before edit controls in the result state",
);
assert.match(calculator, /\{plan \? "Edit Trip" : "Flight arrival"\}/);
assert.match(calculator, /plan \? "Recalculate pickup time" : "Calculate when to leave"/);
assert.match(calculator, /function resetResult\(\) \{ setCalendarProvider\(null\); setError\(""\); \}/, "editing must keep the result beside the form until the user updates it");
assert.match(calculator, /resultPanelRef\.current\?\.scrollIntoView/,
  "mobile submission must move the completed answer into view");
assert.match(calculator, /window\.innerWidth > 820/,
  "automatic result scrolling must follow the pickup mobile breakpoint");
assert.match(calculator, /ref=\{resultPanelRef\} className="pickup-result pickup-result--ready"/);
assert.doesNotMatch(calculator, /I’m picking up my/);
assert.match(calculator, /useState<Relationship>\("someone"\)/);
assert.match(calculator, /Personalize the calendar event/);
assert.match(calculator, /<small>Optional<\/small>/);
assert.match(calculator, /A colleague/);
assert.match(css, /\.pickup-personalize/);
assert.match(css, /\.pickup-page \{[^}]*font-family: var\(--font-body\);/s, "pickup pages must use the shared calculator body type");
assert.match(css, /\.pickup-workbench--ready \{ grid-template-columns: minmax\(0, 1\.2fr\) minmax\(320px, \.8fr\)/);
assert.match(css, /\.pickup-result \{[^}]*background: var\(--pickup-pale\);[^}]*color: var\(--pickup-ink\);/s);
assert.doesNotMatch(css, /\.pickup-result \{[^}]*background: var\(--pickup-ink\)/s);
assert.match(css, /@media \(max-width: 820px\).*\.pickup-workbench--ready \{ grid-template-columns: minmax\(0, 1fr\)/s);
assert.match(css, /\.pickup-result \{ scroll-margin-top: 88px;/);
assert.match(css, /\.pickup-landing__fields/);
assert.match(css, /\.pickup-date-input:focus-within/);
assert.match(css, /@media \(min-width: 40rem\).*\.pickup-landing__fields \{ grid-template-columns: repeat\(2, minmax\(0, 1fr\)\); \}/s);
assert.match(directory, /Find out exactly when to leave for your airport/);
assert.match(pickupDirectory, /<h1 className="site-title">Find out exactly when to leave for an airport pickup<\/h1>/);
assert.ok(
  pickupDirectory.indexOf('href="/airport-pickup-time-calculator"')
    < pickupDirectory.indexOf("All {pickupAirports.length} airport pickup calculators"),
  "the generic calculator link must render before the reviewed-airport directory",
);
assert.doesNotMatch(pickupDirectory, /<AirportPickupCalculator/, "the searchable directory must not embed the full generic calculator");
assert.match(pickupDirectory, /pickupAirports\.map/);
assert.match(siteSystem, /\.site-title \{[\s\S]*font-size: clamp\(2\.6rem, 5\.25vw, 4\.75rem\);/);
assert.doesNotMatch(siteSystem, /font-size: clamp\(3rem, 9vw, 6\.5rem\)/, "shared site titles must not use the oversized legacy scale");
console.log("airport pickup UX checks passed");
