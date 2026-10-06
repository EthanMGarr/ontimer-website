import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (path) => readFileSync(path, "utf8");
const handoff = read("src/components/leave-time/CalendarOnTimerHandoff.tsx");
const airportCalculator = read("src/app/airport-time-to-leave-calculator/AirportCalculator.tsx");
const calendarLinks = read("src/lib/calendar-links.ts");
const airportPage = read("src/app/airport-time-to-leave-calculator/page.tsx");
const spanishAirportPage = read("src/app/es/calculadora-cuando-salir-al-aeropuerto/page.tsx");
const airportPrefill = read("src/components/airport/AirportCalculatorPlanPrefill.tsx");
const analytics = read("src/lib/analytics.ts");
const experiment = read("src/lib/calculator-cta-experiment.ts");
const callers = [
  "src/app/what-time-should-i-leave/LeaveTimeCalculator.tsx",
  "src/app/airport-time-to-leave-calculator/AirportCalculator.tsx",
  "src/app/cruise-time-to-leave/CruiseCalculator.tsx",
  "src/app/wake-up-time-calculator/WakeUpCalculator.tsx",
  "src/app/airport-pickup-time-calculator/AirportPickupCalculator.tsx",
  "src/app/events/[slug]/when-to-leave/EventLeaveCalculator.tsx",
];

assert.doesNotMatch(handoff, /exclusivePrimaryAction/, "shared acquisition cannot be gated behind calendar use");
assert.match(handoff, /data-calendar-secondary-acquisition/, "shared result handoff needs a persistent secondary acquisition path");
assert.match(handoff, /appPrimary[\s\S]*order-1 rounded-xl border border-green-500/, "the treatment must make OnTimer the primary result action");
assert.match(handoff, /Add this result to Google Calendar/, "the treatment must frame calendar as the one-result alternative");
assert.match(handoff, /result_app_primary_v1/, "the treatment CTA needs its own campaign and analytics variant");
assert.match(handoff, /acquisition\.scrollIntoView/, "calendar return must move the platform-specific acquisition action into view");
assert.match(handoff, /window\.addEventListener\("focus", handleReturn/, "calendar return must respond when the browser regains focus");
assert.match(handoff, /document\.addEventListener\("visibilitychange", handleVisibilityChange\)/, "calendar return must handle mobile app-to-browser visibility changes");
assert.match(handoff, /showAndroidAffiliate[\s\S]*effectiveAndroidAffiliateOffer\.heading/, "Android calendar return must lead to the travel affiliate offer");
assert.match(handoff, /calendarOpened \? copy\.getFree : copy\.getAlarms/, "iOS calendar return must lead to the OnTimer action");
assert.match(handoff, /Get Automatic Alarms/, "the pre-calendar OnTimer action must lead with its benefit");
assert.match(handoff, /OnTimer is free\. Turn calendar events into automatic alarms\./, "the shared English offer must state that OnTimer is free without qualifying the claim");
assert.match(handoff, /Works with Google Calendar, Apple Calendar, and Microsoft 365\./, "the shared supporting line must provide compatibility proof instead of repeating price");
assert.match(handoff, /OnTimer es gratis\. Convierte los eventos de tu calendario en alarmas automáticas\./, "the shared Spanish offer must retain the same free-value disclosure");
assert.doesNotMatch(handoff, /free to download|Free download on the App Store|se descarga gratis|Descarga gratis en App Store/, "calculator acquisition copy must not qualify or repeat the free claim");
assert.doesNotMatch(airportCalculator, /locationCode === "EWR"[\s\S]*?buildAirportPlanLink/, "departure airport-plan links must not remain limited to EWR");
assert.match(airportCalculator, /computedResult && flightDepartureAt[\s\S]*?buildAirportPlanLink/, "every completed departure result must build an airport-plan link");
assert.equal((airportCalculator.match(/details: calendarDetails/g) ?? []).length, 3, "every departure Google and ICS calendar builder must use the recalculation description");
assert.match(airportCalculator, /buildDepartureAirportPlanCalendarDescription\(recalculateUrl, locale\)/, "departure calendar descriptions must use the shared description builder");
assert.match(calendarLinks, /Calculated by OnTimer - Never be late/, "airport calendar descriptions must lead with the OnTimer attribution");
assert.match(calendarLinks, /Recalculate Leave Time/, "departure calendar actions must name the leave-time outcome");
assert.match(calendarLinks, /Recalculate Pickup Time/, "pickup calendar actions must name the pickup-time outcome");
assert.match(calendarLinks, /Never be late\\n\\nRecalculate Leave Time: \$\{recalculateUrl}\\n\\n/, "departure calendar descriptions must separate each action with a blank line");
assert.match(airportPage, /<Suspense[\s\S]*?<AirportCalculatorPlanPrefill/, "the generic airport page must isolate URL prefill behind Suspense");
assert.match(spanishAirportPage, /<Suspense[\s\S]*?<AirportCalculatorPlanPrefill[\s\S]*locale="es"/, "the Spanish airport page must parse v1 URL state behind Suspense");
assert.match(airportPrefill, /useSearchParams\(\)[\s\S]*?initialPlan=/, "the generic airport calculator must parse v1 URL state into initial fields");

for (const path of callers) {
  const source = read(path);
  assert.match(source, /<CalendarOnTimerHandoff/, `${path} must use the shared result handoff`);
  assert.doesNotMatch(source, /exclusivePrimaryAction/, `${path} must not hide OnTimer until calendar use`);
}

const until = read("src/app/days-until/UntilCalculator.tsx");
assert.match(until, /data-calendar-secondary-acquisition/, "Days Until must offer OnTimer before calendar use");
assert.match(until, /Get Automatic Alarms/, "Days Until must use the shared benefit-led secondary CTA");
assert.match(until, /OnTimer is free\. Turn calendar events into automatic alarms\./, "Days Until must state that OnTimer is free without qualifying the claim");
assert.match(until, /Works with Google Calendar, Apple Calendar, and Microsoft 365\./, "Days Until must use its supporting line for compatibility proof");
assert.doesNotMatch(until, /free to download|Free download on the App Store/, "Days Until must not qualify or repeat the free claim");
assert.match(until, /until-alarm-offer--result-primary/, "Days Until must participate in the app-primary treatment");
assert.match(until, /result_app_primary_v1/, "Days Until must identify treatment CTA clicks");
assert.match(until, /trackAutomaticAlertCTAViewed/, "Days Until must measure result CTA exposure as well as clicks");
assert.match(handoff, /CONSENT_EVENT/, "shared calculator UI must resync its assigned variant after consent changes");
assert.match(until, /CONSENT_EVENT/, "Days Until UI must resync its assigned variant after consent changes");

assert.match(experiment, /calculator_app_primary_v1/, "the calculator CTA experiment needs a stable ID");
assert.match(experiment, /stored === "control" \|\| stored === "app_primary"/, "the experiment assignment must persist across visits");
assert.match(experiment, /!\/Android\/i\.test/, "Android visitors must remain outside the iPhone download experiment");
assert.match(analytics, /"experiment_assignment"/, "GA4 must receive an explicit assignment event");
assert.match(analytics, /\.\.\.\(experiment \?\? \{\}\)/, "calculator outcome events must carry the experiment context");

console.log("calendar-capable calculator conversion UX checks passed");
