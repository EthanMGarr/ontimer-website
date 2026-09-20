import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const component = readFileSync("src/app/what-time-should-i-leave/LeaveTimeCalculator.tsx", "utf8");
const wakeComponent = readFileSync("src/app/wake-up-time-calculator/WakeUpCalculator.tsx", "utf8");
const page = readFileSync("src/app/what-time-should-i-leave/page.tsx", "utf8");
const handoff = readFileSync("src/components/leave-time/CalendarOnTimerHandoff.tsx", "utf8");
const currentLocationControl = readFileSync("src/components/CurrentLocationControl.tsx", "utf8");
const globalStyles = readFileSync("src/app/globals.css", "utf8");
const rootLayout = readFileSync("src/app/layout.tsx", "utf8");

assert.equal(component.includes("formExpanded"), false, "the trip form must never collapse on mobile");
assert.equal(component.includes("showRouteHint"), false, "route errors must not appear while an address is being typed");
assert.equal(component.includes("setResult(null)"), false, "editing trip details must preserve the prior result");
assert.match(component, /hasPendingChanges/);
assert.match(component, /lastCalculatedFingerprint/);
assert.match(component, /type JourneyPurpose = "arrival" \| "pickup" \| "dropoff";/, "the general calculator must support arrival, pickup, and drop-off intent");
assert.match(component, /useState<JourneyPurpose>\("arrival"\)/, "arrival must remain the default calculator intent");
assert.match(component, /grid grid-cols-3 gap-2[\s\S]*?whitespace-nowrap/, "the purpose selector must stay compact and single-line on mobile");
assert.match(component, /date: "Pickup date",\s*time: "Pickup time",/, "pickup scheduling fields must use direct, parallel labels");
assert.match(component, /date: "Drop-off date",\s*time: "Drop-off time",/, "drop-off scheduling fields must use direct, parallel labels");
assert.doesNotMatch(component, /Ready for pickup at|They need to arrive by/, "interpretive pickup and drop-off time labels must not return");
assert.match(component, /planning_purpose: journeyPurpose/, "calculator analytics must identify the selected planning purpose");
assert.match(component, /analyticsContext=\{\{ planning_purpose: journeyPurpose \}\}/, "calendar and acquisition analytics must retain planning purpose");
assert.match(component, /submitAttempted && !hasOrigin/);
assert.equal((component.match(/onClick=\{handleCalculate\}/g) ?? []).length, 1, "render exactly one calculate/update action");
assert.equal(component.includes("exclusivePrimaryAction"), false, "result acquisition must be available without a calendar detour");
assert.match(component, /id="leave-origin"[\s\S]*?includeAirports/, "the starting location must match airports by name or IATA code");
assert.match(component, /id="leave-destination"[\s\S]*?includeAirports/, "the destination must match airports by name or IATA code");
const wakeLocationFields = wakeComponent.match(/<PlaceAutocomplete[\s\S]*?\/>/g) ?? [];
assert.equal(wakeLocationFields.length, 2, "the wake-up calculator must retain both location fields");
assert.ok(
  wakeLocationFields.every((field) => field.includes("includeAirports")),
  "both wake-up calculator fields must match airports by name or IATA code"
);
assert.match(component, /locationStatus !== "success"/, "the geolocation action must disappear after current location is set");
assert.match(component, /data-swap-control[\s\S]*?min-h-11 min-w-11/, "desktop swap must stay compact with a 44px touch target");
assert.match(component, /className="relative hidden h-7 sm:block" data-swap-control/, "swap must stay out of the mobile task path while remaining available on larger screens");
assert.match(component, /leave_locations_swapped[\s\S]*?planning_purpose: journeyPurpose/, "desktop swap use must remain measurable");
assert.doesNotMatch(component, /<SwapIcon \/> \{copy\.swap\}/, "swap must not consume vertical space with a redundant visible label");
assert.match(component, /className="mt-1 inline-flex min-h-11[^"]*">?/, "the general current-location action must sit close to its field without shrinking its touch target");
assert.match(currentLocationControl, /!active && \(/, "shared calculator location actions must disappear after success");
assert.match(currentLocationControl, /className="mt-1 inline-flex min-h-11[^"]*">?/, "shared current-location actions must sit close to their fields without shrinking their touch targets");
assert.match(currentLocationControl, /className="sr-only" role="status"/, "shared location success must remain available to assistive technology");
assert.match(globalStyles, /html \{[\s\S]*?overflow-x: clip;/, "the document root must prevent horizontal page drift");
assert.match(globalStyles, /body \{[\s\S]*?overflow-x: clip;/, "the page body must prevent horizontal page drift");
assert.match(globalStyles, /@media \(max-width: 639px\)[\s\S]*?input:not\(\[type="range"\]\)[\s\S]*?font-size: 1rem !important;/, "mobile form controls must remain at 16px to prevent iOS Safari focus zoom");
assert.doesNotMatch(handoff, /inline-flex whitespace-nowrap text-zinc-500/, "result handoff links must wrap on narrow screens");
assert.doesNotMatch(handoff, /copy\.adds|copy\.at/, "the calendar handoff must not repeat the event title and leave time visually");
assert.match(handoff, /aria-label=\{eventPreview[\s\S]*?eventPreview\.title[\s\S]*?eventPreview\.startLabel/, "the calendar action must retain event and time context for assistive technology");
assert.match(handoff, /setIsAndroidDevice\(isAndroidUserAgent\(navigator\.userAgent\)\)/, "affiliate routing must depend on the Android user agent, not viewport width");
assert.match(rootLayout, /<html[^>]*suppressHydrationWarning/, "the intentional localized document-language update must not emit a hydration warning");

assert.ok(page.indexOf("<LeaveTimeCalculator") < page.indexOf("How to calculate when to leave"), "the task must precede supporting SEO copy");
assert.ok(page.indexOf("<LeaveTimeCalculator") < page.indexOf("What Time Should I Leave to Pick Someone Up?"), "pickup search content must stay below the calculator");
assert.ok(page.indexOf("<LeaveTimeCalculator") < page.indexOf("What Time Should I Leave to Drop Someone Off on Time?"), "drop-off search content must stay below the calculator");
assert.match(page, /aria-label="Breadcrumb" className="hidden[^\n]*sm:block"/, "the visual breadcrumb must not consume the mobile first viewport");
assert.match(page, /<span className="sm:hidden">Free departure time calculator<\/span>/, "the mobile eyebrow must stay short and single-purpose");
assert.equal((page.match(/Going somewhere\? This free calculator uses traffic-aware routing/g) ?? []).length, 5, "the proven introduction must remain once in each established metadata, schema, and visible location without a responsive duplicate");
assert.match(page, /title: "What Time Should I Leave\? Free Departure Time Calculator"/, "the proven primary search title must remain unchanged");
assert.match(page, /What Time Should\{" "\}[\s\S]*?I Leave\?/, "the proven primary H1 must remain unchanged");
assert.match(page, /question: "What time should I leave to pick someone up\?"/, "pickup intent must be present in the visible FAQ and FAQ schema source");
assert.match(page, /question: "What time should I leave to drop someone off on time\?"/, "drop-off intent must be present in the visible FAQ and FAQ schema source");
assert.equal(page.includes("Popular uses:"), false, "non-interactive use-case chips should not return");
assert.equal(page.includes("Never calculate this again"), false, "the competing pre-calculator promotion should not return");

assert.doesNotMatch(handoff, /exclusivePrimaryAction/, "the shared OnTimer action must never be gated behind calendar use");
assert.match(handoff, /data-calendar-secondary-acquisition/, "the shared handoff must expose a secondary OnTimer path before calendar use");
assert.match(handoff, /OnTimer is free\. Turn calendar events into automatic alarms\./, "the acquisition path must state plainly that OnTimer is free");
assert.match(handoff, /Works with Google Calendar, Apple Calendar, and Microsoft 365\./, "the supporting line must provide compatibility proof");
assert.doesNotMatch(handoff, /free to download|Free download on the App Store/, "the acquisition path must not qualify or repeat the free claim");

console.log("general leave-time calculator UX checks passed");
