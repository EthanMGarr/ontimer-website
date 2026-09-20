import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const page = readFileSync("src/app/events/[slug]/when-to-leave/page.tsx", "utf8");
const component = readFileSync("src/app/events/[slug]/when-to-leave/EventLeaveCalculator.tsx", "utf8");
const styles = readFileSync("src/app/events/[slug]/when-to-leave/event-leave.css", "utf8");
const guidance = readFileSync("docs/CALCULATOR_CONVERSION_UX_CHECKLIST.md", "utf8");
const sitemap = readFileSync("src/app/sitemap.ts", "utf8");

assert.ok(
  page.indexOf("event-task__context") < page.indexOf("<EventLeaveCalculator"),
  "compact event context must introduce the calculator"
);
assert.ok(
  page.indexOf("<EventLeaveCalculator") < page.indexOf("What changes the leave time"),
  "the calculator must precede venue education"
);
assert.doesNotMatch(page, /sm:grid-cols-2 lg:grid-cols-4/, "the repeated pre-task event detail grid must not return");
assert.doesNotMatch(page, /Always confirm the event date, start time, venue, and entry information/, "the full disclaimer must not displace the primary input");

const resultStart = component.indexOf('data-event-result');
const summary = component.indexOf('event-result__summary', resultStart);
const handoff = component.indexOf('data-calendar-handoff-slot', resultStart);
const optionalDetails = component.indexOf('event-result__details', resultStart);
assert.ok(resultStart >= 0 && summary > resultStart, "the result must lead with the primary answer and compact summary");
assert.ok(handoff > summary, "the calendar handoff must follow the compact result summary");
assert.ok(optionalDetails > handoff, "optional calculation detail must follow the calendar handoff");
assert.equal(
  component.slice(resultStart, handoff).includes("event-route"),
  false,
  "the timing diagram must not appear before the calendar handoff"
);
assert.equal(
  component.slice(resultStart, handoff).includes("event-result__warning"),
  false,
  "the estimate warning card must not appear before the calendar handoff"
);
assert.match(component, /scrollIntoView\(\{ behavior: "smooth", block: "start" \}\)/, "calculation must move the result into view");
assert.doesNotMatch(component, /exclusivePrimaryAction/, "the event flow must offer OnTimer before calendar use");
assert.match(component, /postCalendarHeading="Now make sure you leave on time\."/, "the post-calendar focal state must lead with OnTimer's outcome");
assert.match(page, /robots: isEventIndexable\(event\) \? \{ index: true, follow: true \}/, "usable future event pages must be indexable");
assert.match(sitemap, /REVIEWED_EVENT_FIXTURES/, "reviewed event pages must enter the sitemap");
assert.match(sitemap, /VENUE_PROFILES\.map/, "every reviewed venue hub must enter the sitemap");
assert.match(styles, /Task-first Conversion Workbench/, "the page must retain its locked Hallmark structure");
assert.match(guidance, /input → answer → calendar → OnTimer/, "the durable checklist must state the conversion sequence");

console.log("event calculator conversion UX checks passed");
