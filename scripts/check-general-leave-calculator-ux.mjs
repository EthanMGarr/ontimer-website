import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const component = readFileSync("src/app/what-time-should-i-leave/LeaveTimeCalculator.tsx", "utf8");
const page = readFileSync("src/app/what-time-should-i-leave/page.tsx", "utf8");
const handoff = readFileSync("src/components/leave-time/CalendarOnTimerHandoff.tsx", "utf8");
const currentLocationControl = readFileSync("src/components/CurrentLocationControl.tsx", "utf8");
const globalStyles = readFileSync("src/app/globals.css", "utf8");

assert.equal(component.includes("formExpanded"), false, "the trip form must never collapse on mobile");
assert.equal(component.includes("showRouteHint"), false, "route errors must not appear while an address is being typed");
assert.equal(component.includes("setResult(null)"), false, "editing trip details must preserve the prior result");
assert.match(component, /hasPendingChanges/);
assert.match(component, /lastCalculatedFingerprint/);
assert.match(component, /submitAttempted && !hasOrigin/);
assert.equal((component.match(/onClick=\{handleCalculate\}/g) ?? []).length, 1, "render exactly one calculate/update action");
assert.equal(component.includes("exclusivePrimaryAction"), false, "result acquisition must be available without a calendar detour");
assert.match(component, /id="leave-origin"[\s\S]*?includeAirports/, "the starting location must match airports by name or IATA code");
assert.match(component, /id="leave-destination"[\s\S]*?includeAirports/, "the destination must match airports by name or IATA code");
assert.match(component, /locationStatus !== "success"/, "the geolocation action must disappear after current location is set");
assert.match(component, /data-swap-control[\s\S]*?min-h-11 min-w-11/, "swap must stay compact with a 44px touch target");
assert.doesNotMatch(component, /<SwapIcon \/> \{copy\.swap\}/, "swap must not consume vertical space with a redundant visible label");
assert.match(currentLocationControl, /!active && \(/, "shared calculator location actions must disappear after success");
assert.match(currentLocationControl, /className="sr-only" role="status"/, "shared location success must remain available to assistive technology");
assert.match(globalStyles, /html \{[\s\S]*?overflow-x: clip;/, "the document root must prevent horizontal page drift");
assert.match(globalStyles, /body \{[\s\S]*?overflow-x: clip;/, "the page body must prevent horizontal page drift");
assert.doesNotMatch(handoff, /inline-flex whitespace-nowrap text-zinc-500/, "result handoff links must wrap on narrow screens");

assert.ok(page.indexOf("<LeaveTimeCalculator") < page.indexOf("How to calculate when to leave"), "the task must precede supporting SEO copy");
assert.equal(page.includes("Popular uses:"), false, "non-interactive use-case chips should not return");
assert.equal(page.includes("Never calculate this again"), false, "the competing pre-calculator promotion should not return");

assert.match(
  handoff,
  /!exclusivePrimaryAction \|\| calendarOpened \|\| showAndroidAffiliate/,
  "Android affiliate action must not be gated behind the calendar handoff"
);

console.log("general leave-time calculator UX checks passed");
