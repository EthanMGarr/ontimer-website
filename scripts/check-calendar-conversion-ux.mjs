import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (path) => readFileSync(path, "utf8");
const handoff = read("src/components/leave-time/CalendarOnTimerHandoff.tsx");
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
assert.match(handoff, /Get Automatic Alarms/, "the pre-calendar OnTimer action must lead with its benefit");
assert.match(handoff, /OnTimer is free to download/, "the shared English offer must explicitly state that OnTimer is free");
assert.match(handoff, /Free download on the App Store/, "the shared App Store caption must explicitly state that OnTimer is free");
assert.match(handoff, /OnTimer se descarga gratis/, "the shared Spanish offer must retain the same free-value disclosure");

for (const path of callers) {
  const source = read(path);
  assert.match(source, /<CalendarOnTimerHandoff/, `${path} must use the shared result handoff`);
  assert.doesNotMatch(source, /exclusivePrimaryAction/, `${path} must not hide OnTimer until calendar use`);
}

const until = read("src/app/days-until/UntilCalculator.tsx");
assert.match(until, /data-calendar-secondary-acquisition/, "Days Until must offer OnTimer before calendar use");
assert.match(until, /Get Automatic Alarms/, "Days Until must use the shared benefit-led secondary CTA");
assert.match(until, /Free download on the App Store/, "Days Until must explicitly state that OnTimer is free");

console.log("calendar-capable calculator conversion UX checks passed");
