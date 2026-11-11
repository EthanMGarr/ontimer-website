import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const [page, calculator, genericCalculator, planPrefill, destinationPlanner, spanishGeneric, spanishAirport, placeAutocomplete, airportWebsite, productStory, handoff, ctaButton, alarmPreview, destinationTemplate, homepage, ktvuProof, globals] = await Promise.all([
  readFile(new URL("../src/app/airport-time-to-leave-calculator/page.tsx", import.meta.url), "utf8"),
  readFile(new URL("../src/app/airport-time-to-leave-calculator/AirportCalculator.tsx", import.meta.url), "utf8"),
  readFile(new URL("../src/components/airport/GenericAirportCalculator.tsx", import.meta.url), "utf8"),
  readFile(new URL("../src/components/airport/AirportCalculatorPlanPrefill.tsx", import.meta.url), "utf8"),
  readFile(new URL("../src/components/airport/AirportDeparturePlanner.tsx", import.meta.url), "utf8"),
  readFile(new URL("../src/app/es/calculadora-cuando-salir-al-aeropuerto/page.tsx", import.meta.url), "utf8"),
  readFile(new URL("../src/app/es/aeropuerto/[slug]/page.tsx", import.meta.url), "utf8"),
  readFile(new URL("../src/components/PlaceAutocomplete.tsx", import.meta.url), "utf8"),
  readFile(new URL("../src/core/leave-time/plugins/airports/website.tsx", import.meta.url), "utf8"),
  readFile(new URL("../src/components/airport/AirportV2ProductStory.tsx", import.meta.url), "utf8"),
  readFile(new URL("../src/components/leave-time/CalendarOnTimerHandoff.tsx", import.meta.url), "utf8"),
  readFile(new URL("../src/components/CTAButton.tsx", import.meta.url), "utf8"),
  readFile(new URL("../src/components/leave-time/AlarmPreview.tsx", import.meta.url), "utf8"),
  readFile(new URL("../src/components/destination-pages/DestinationPageTemplate.tsx", import.meta.url), "utf8"),
  readFile(new URL("../src/app/homepage2/page.tsx", import.meta.url), "utf8"),
  readFile(new URL("../src/components/KTVUProof.tsx", import.meta.url), "utf8"),
  readFile(new URL("../src/app/globals.css", import.meta.url), "utf8"),
]);

assert.match(
  page,
  /Enter your flight&apos;s departure time, starting point and airport\./,
  "the generic hero must describe the departure-time input accurately",
);
for (const [name, source] of [["English generic", page], ["Spanish generic", spanishGeneric]]) {
  assert.match(source, /fallback=\{\([\s\S]*?<GenericAirportCalculator/, `${name} fallback must use the invariant generic wrapper`);
  assert.match(source, /<AirportCalculatorPlanPrefill/, `${name} hydrated branch must use the generic prefill wrapper`);
  assert.doesNotMatch(source, /<AirportCalculator\b/, `${name} must not bypass the invariant generic wrapper`);
}
assert.match(
  genericCalculator,
  /<AirportCalculator \{\.\.\.props\} genericRedesign airportV2Pilot \/>/,
  "the generic wrapper must enforce the reviewed product-led experience after all caller props",
);
assert.match(
  genericCalculator,
  /Omit<[\s\S]*?"genericRedesign" \| "airportV2Pilot"/,
  "callers must not be able to disable the generic product-led experience",
);
assert.match(
  planPrefill,
  /<GenericAirportCalculator[\s\S]*?initialPlan=/,
  "the hydrated URL-prefill branch must flow through the invariant generic wrapper",
);
assert.match(
  calculator,
  /data-route-details[\s\S]*?order-1/,
  "the route and Leaving from field must be first in the generic mobile task flow",
);
assert.match(
  calculator,
  /data-flight-details[\s\S]*?order-2/,
  "flight timing must follow the starting-location task in the generic mobile flow",
);
assert.match(
  calculator,
  /<CalendarOnTimerHandoff[\s\S]*?\/>[\s\S]*?copy\.adjustAssumptions/,
  "optional result adjustments must follow the conversion handoff",
);
assert.match(calculator, /genericRedesign \? "flex flex-col gap-4"/, "the generic airport task flow must use real flex ordering instead of inert order classes");
assert.match(calculator, /data-airport-timing-options[\s\S]*?order-3/, "custom timing must appear before the generic airport calculation action");
assert.match(calculator, /handleCalculate[\s\S]*?genericRedesign \? "order-4"/, "the generic airport calculation action must follow optional timing controls");
assert.match(calculator, /genericRedesign \? `order-5 rounded-xl border p-4[\s\S]*?copy\.whatWeUse/, "the explanatory What we use card must follow the calculation action");
assert.match(calculator, /adjustAssumptions: "Adjust details"/, "the optional timing control must read like a clear action");
assert.doesNotMatch(calculator, /hover:bg-zinc-700 hover:text-white|active:bg-zinc-800/, "the timing disclosure must not enter an unreadable sticky hover or pressed state on the light calculator surface");
assert.match(calculator, /calculator-disclosure/, "the timing disclosure must use the explicit cross-browser contrast contract");
assert.match(globals, /\.site-modern \.calculator-disclosure:hover,[\s\S]*?\.calculator-disclosure:active,[\s\S]*?background-color: var\(--sky-100\);[\s\S]*?color: var\(--navy-950\);[\s\S]*?-webkit-tap-highlight-color: transparent/, "the light calculator disclosure must remain readable in persistent iOS hover and pressed states");
assert.match(calculator, /update: "Recalculate Leave Time"/, "a changed completed result must offer an explicit recalculation action");
assert.match(calculator, /\(!computedResult \|\| lastCalculatedInputSignature !== currentCalculationInputSignature\)[\s\S]*?onClick=\{handleCalculate\}/, "the recalculation action must stay hidden until a completed result has actually been changed");
assert.match(calculator, /aria-expanded=\{showRefinements\}[\s\S]*?aria-controls="airport-timing-options-panel"/, "the timing disclosure must expose its expanded state and controlled panel");
assert.match(calculator, /Current airport-wide estimate:/, "security detail must label the current airport-wide evidence");
assert.match(calculator, /Estimated at your [\s\S]*? arrival:/, "security detail must label the arrival-time prediction");
assert.match(calculator, /Your leave time includes [\s\S]*? min to protect against variation/, "security detail must explain the conservative planning allowance");
assert.match(calculator, /not live airport queue data/, "fallback security estimates must not imply live airport data");
assert.match(calculator, /addressCity: "Address, neighborhood, or place"/, "the origin field must invite landmark and business search");
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
  /Recommended airport arrival[\s\S]*?fmtDuration\(defaultBuffer, locale\)[\s\S]*?copy\.beforeFlight/,
  "the recommendation must use a readable hours-and-minutes duration",
);
assert.match(
  calculator,
  /id="airport-origin"[\s\S]*?ariaDescribedBy=\{currentLocation === null \? "airport-origin-help" : undefined\}/,
  "the starting-location helper must be attached only until current location is found",
);
assert.match(calculator, /\{currentLocation === null && \([\s\S]*?copy\.startingPointHelp/, "the redundant starting-location instruction must disappear after geolocation succeeds");
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
assert.match(airportWebsite, /const airportV2Experience = true/, "every airport departure page must use the approved product-led experience");
assert.match(airportWebsite, /productStory: <AirportV2ProductStory airportCode=\{location\.code\} \/>/, "every airport departure page must include the Time To Fly product story");
assert.match(airportWebsite, /secondaryLabels: \[location\.city\]/, "airport task paths must not promote their review date as hero content");
assert.match(spanishAirport, /airportV2Pilot[\s\S]*?<AirportV2ProductStory airportCode=\{location\.code\} locale="es" \/>[\s\S]*?<KTVUProof variant="airport" locale="es" \/>/, "Spanish airport pages must use the fully localized product-led experience");
assert.match(spanishGeneric, /<AirportV2ProductStory airportCode="tu aeropuerto" locale="es" analyticsCode="generic" \/>[\s\S]*?<KTVUProof variant="airport" locale="es" \/>/, "the Spanish generic airport calculator must include localized product and proof sections");
assert.match(calculator, /experienceVariant=\{airportV2Pilot \? "airport-v2" : undefined\}/, "the JFK result must opt into the product-led handoff");
assert.match(handoff, /Never miss the moment to leave for a flight\./, "the pilot result must lead with the recurring flight outcome");
assert.match(handoff, /Connect your calendar once\.[\s\S]*?automatically finds your flights[\s\S]*?OnTimer is free\./, "the pilot result must explain automatic flight alarms plainly and honestly");
assert.doesNotMatch(handoff, /OnTimer works backward|How Time To Fly works/, "the pilot result must not add an abstract numbered explainer after the primary action");
assert.match(handoff, /presentation=\{airportV2 && !calendarOpened \? "app-store-badge" : "button"\}/, "the pilot's primary acquisition action must use the official App Store badge presentation");
assert.match(handoff, /Or save just this trip[\s\S]*?copy\.addOneGoogle/, "the JFK calendar alternative must remain useful without competing visually with acquisition");
assert.match(handoff, /<PlaneIcon[\s\S]*?Time To Fly/, "the JFK result must use a restrained flight cue without replacing the alarm proof");
assert.match(handoff, /emphasis=\{airportV2 && !calendarOpened \? "flight" : "standard"\}/, "the JFK result must opt into the one-time alarm emphasis without changing other calculators");
assert.match(handoff, /flightAlarms: "Get automatic alarms for every flight\."[\s\S]*?flightAlarms: "Recibe alarmas automáticas para todos tus vuelos\."/, "the airport acquisition headline must be localized in English and Spanish");
assert.match(handoff, /data-airport-v2-inline-cta[\s\S]*?copy\.flightAlarms[\s\S]*?presentation="app-store-badge"/, "the mobile airport result must put the localized official App Store action directly beneath the timeline");
assert.match(handoff, /data-airport-v2-sticky-cta[\s\S]*?result_app_sticky_v1/, "the JFK mobile result must retain an acquisition action while the inline badge is outside the viewport");
assert.match(handoff, /IntersectionObserver[\s\S]*?setShowAirportStickyCta\(!entry\.isIntersecting\)/, "the JFK sticky action must disappear when the inline App Store action is visible");
assert.match(calculator, /data-airport-trip-timeline="desktop"[\s\S]*?data-airport-trip-timeline="mobile"/, "the pilot must use a vertical desktop timeline and compact mobile timeline");
assert.match(calculator, /trafficBasis === "live"[\s\S]*?Drive to \$\{airportCode\} now[\s\S]*?trafficBasis === "predicted"[\s\S]*?Expected drive to \$\{airportCode\}/, "the JFK timeline must distinguish current from expected driving using the actual provider basis");
assert.match(calculator, /wait: `\$\{securityWaitLabel\.charAt\(0\)\.toUpperCase\(\)\}.*estimada al llegar`/, "the Spanish timeline must localize the jurisdiction-appropriate arrival security estimate");
assert.match(calculator, /wait: `Estimated \$\{securityWaitLabel\} at arrival`/, "the English timeline must retain the jurisdiction-appropriate arrival security estimate");
assert.doesNotMatch(calculator, /securityAllowanceMinutes|TSA at arrival ·|min allowed/, "the compact timeline must keep the conservative allowance and heavier TSA labels in the detailed explanation");
assert.match(calculator, /airportV2Pilot \? locale === "es" \? "Editar detalles del viaje" : "Edit trip details" : copy\.adjustAssumptions/, "the mobile airport return action must explain that it navigates to trip editing in both locales");
assert.match(calculator, /airportV2Pilot \? "lg:hidden"/, "the redundant JFK result-level adjustment link must be absent on desktop");
assert.match(calculator, /airportV2Pilot && locationCode \? `Leave for \$\{locationCode\}`/, "the JFK alarm preview must name the concrete destination concisely");
assert.match(calculator, /resultScrollRequest === 0[\s\S]*?\[resultScrollRequest, genericRedesign\]/, "editing a completed JFK result must not retrigger the mobile result scroll");
assert.doesNotMatch(calculator, /if \(!genericRedesign \|\| !computedResult[\s\S]{0,300}scrollIntoView/, "derived result changes must not steal focus or scroll while a traveler edits timing");
assert.match(calculator, /customBufferLabel: "Arrive at the airport before departure"[\s\S]*?customBufferHours: "Hours"[\s\S]*?customBufferMinutes: "Minutes"/, "the airport buffer editor must use human-readable hours and minutes");
assert.match(calculator, /updateCustomBufferPart\(part: "hours" \| "minutes"[\s\S]*?nextHours \* 60 \+ nextMinutes/, "the hours and minutes editor must continue supplying total minutes to the planner");
assert.doesNotMatch(calculator, /Custom airport arrival time in minutes|\(\$\{defaultBuffer\} min\)/, "the traveler must not have to translate the recommended buffer into total minutes");
assert.match(productStory, /Time To Fly · free in OnTimer/, "the airport product story must state the free Time To Fly offer plainly");
assert.doesNotMatch(productStory, /works backward|Time To Fly workflow/, "the product story must demonstrate the calendar-to-alarm behavior without abstract process language");
assert.match(ctaButton, /tools\.applemediaservices\.com\/api\/badges\/download-on-the-app-store\/black\/en-us/, "the pilot badge presentation must use Apple's official preferred badge artwork");
assert.match(ctaButton, /width="162"[\s\S]*?height="54"/, "the primary App Store badge must be large enough to carry the acquisition hierarchy");
assert.match(ctaButton, /if \(!isDesktop\) trackAppStoreClick/, "opening a desktop QR popover must not count as an App Store click");
assert.match(ctaButton, /appStoreQrUrl\(\{ location, ctaVariant, calculatorType \}\)/, "desktop QR codes must use a separately attributable campaign URL");
assert.match(alarmPreview, /alarm-preview--ringing min-h-\[7\.25rem\] w-24/, "the JFK alarm proof must use the more realistic rectangular proportion");
assert.match(handoff, /<p[^>]*>\{copy\.freeIphone\}<\/p>[\s\S]*?<p>\{copy\.appStore\}<\/p>/, "the promoted mobile action must separate the localized free iPhone claim from calendar compatibility");
assert.match(destinationTemplate, /\{model\.productStory\}[\s\S]*?airportV2 && <KTVUProof variant="airport"/, "the KTVU proof must follow the product story across airport departure pages");
assert.match(destinationTemplate, /\{model\.trackerCode\} airport arrival time/, "the airport coverage proof must name the current airport instead of JFK");
assert.match(homepage, /<\/section>[\s\S]*?<KTVUProof \/>[\s\S]*?<section className="hp2-problem"/, "the homepage must place permanent KTVU proof directly after the hero");
assert.doesNotMatch(homepage, /KTVUAnnouncementBar|Watching KTVU/, "the stale temporary KTVU announcement must not remain on the homepage");
assert.match(ktvuProof, /Featured on KTVU FOX 2[\s\S]*?App relieving holiday airport stress[\s\S]*?Watch the KTVU segment/, "the KTVU proof must name the verified source, story, and direct watch action");

console.log("airport family review UX checks passed");
