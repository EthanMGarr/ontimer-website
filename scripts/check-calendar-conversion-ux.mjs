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
assert.match(handoff, /OnTimer is free\. Turn calendar events into automatic alarms\./, "the shared English offer must state that OnTimer is free without qualifying the claim");
assert.match(handoff, /Works with Google Calendar, Apple Calendar, and Microsoft 365\./, "the shared supporting line must provide compatibility proof instead of repeating price");
assert.match(handoff, /OnTimer es gratis\. Convierte los eventos de tu calendario en alarmas automáticas\./, "the shared Spanish offer must retain the same free-value disclosure");
assert.doesNotMatch(handoff, /free to download|Free download on the App Store|se descarga gratis|Descarga gratis en App Store/, "calculator acquisition copy must not qualify or repeat the free claim");

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

console.log("calendar-capable calculator conversion UX checks passed");
