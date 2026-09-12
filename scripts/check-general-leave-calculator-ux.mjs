import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const component = readFileSync("src/app/what-time-should-i-leave/LeaveTimeCalculator.tsx", "utf8");
const page = readFileSync("src/app/what-time-should-i-leave/page.tsx", "utf8");
const handoff = readFileSync("src/components/leave-time/CalendarOnTimerHandoff.tsx", "utf8");

assert.equal(component.includes("formExpanded"), false, "the trip form must never collapse on mobile");
assert.equal(component.includes("showRouteHint"), false, "route errors must not appear while an address is being typed");
assert.equal(component.includes("setResult(null)"), false, "editing trip details must preserve the prior result");
assert.match(component, /hasPendingChanges/);
assert.match(component, /lastCalculatedFingerprint/);
assert.match(component, /submitAttempted && !hasOrigin/);
assert.equal((component.match(/onClick=\{handleCalculate\}/g) ?? []).length, 1, "render exactly one calculate/update action");
assert.equal(component.includes("exclusivePrimaryAction"), false, "result acquisition must be available without a calendar detour");

assert.ok(page.indexOf("<LeaveTimeCalculator") < page.indexOf("How to calculate when to leave"), "the task must precede supporting SEO copy");
assert.equal(page.includes("Popular uses:"), false, "non-interactive use-case chips should not return");
assert.equal(page.includes("Never calculate this again"), false, "the competing pre-calculator promotion should not return");

assert.match(
  handoff,
  /!exclusivePrimaryAction \|\| calendarOpened \|\| showAndroidAffiliate/,
  "Android affiliate action must not be gated behind the calendar handoff"
);

console.log("general leave-time calculator UX checks passed");
