import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const footer = readFileSync("src/components/Homepage2Footer.tsx", "utf8");

assert.match(
  footer,
  /OnTimer is an iPhone calendar alarm app that turns events from Google Calendar,[\s\S]*Apple Calendar, and Outlook Calendar into automatic, persistent alarms/,
  "the site-wide footer must retain a concrete product and platform description"
);
assert.doesNotMatch(
  footer,
  /Calendars organize time\. OnTimer protects it\./,
  "the descriptive footer must not regress to an abstract second tagline"
);
assert.match(
  footer,
  /\["Days Until Calculator", "\/days-until"\]/,
  "the site-wide footer must link to the published Days Until hub"
);
assert.match(footer, /\["Airport Pickup Calculators", "\/airport-pickup-calculators"\]/, "the footer must link to the airport pickup directory");
assert.match(footer, /\["Airport Pickup Calculator", "\/airport-pickup-time-calculator"\]/, "the footer must link directly to the generic airport pickup calculator");
assert.match(
  footer,
  /title: "Popular tools"[\s\S]*?"\/what-time-should-i-leave"[\s\S]*?"\/airport-time-to-leave-calculator"[\s\S]*?"\/wake-up-time-calculator"/,
  "the footer must lead its tool index with the three highest-demand calculators"
);
assert.match(footer, /title: "Browse by need"[\s\S]*?"\/time-calculators#leave-time"[\s\S]*?"\/time-calculators#wake-countdowns"[\s\S]*?"\/time-calculators#medication-schedules"[\s\S]*?"\/time-calculators#deadlines"/, "the footer must expose the four plain-language tool buckets");
assert.match(footer, /\["Press", "\/press"\]/, "the site-wide footer must link to the press page");

const header = readFileSync("src/components/Homepage2Header.tsx", "utf8");
assert.match(
  header,
  /const featuredTools = \[[\s\S]*?href: "\/what-time-should-i-leave"[\s\S]*?href: "\/airport-time-to-leave-calculator"[\s\S]*?href: "\/wake-up-time-calculator"[\s\S]*?href: "\/days-until"/,
  "the shared Tools menu must lead with demand-backed featured calculators"
);
assert.match(header, /href: "\/time-calculators#leave-time", label: "Leave-time calculators"/, "the Tools menu must expose the leave-time group without listing every destination tool");
assert.match(header, /href: "\/airport-pickup-time-calculator", label: "Airport Pickup Calculator"/, "the desktop and mobile Tools menus must link directly to the generic airport pickup calculator");
assert.match(header, /href: "\/airport-pickup-calculators", label: "Airport Pickup Guides"/, "the desktop and mobile Tools menus must also expose the searchable reviewed-airport directory");
assert.match(header, /href: "\/time-calculators#wake-countdowns", label: "Wake-up & countdowns"/, "the Tools menu must expose the wake-up and countdown group");
assert.match(header, /href: "\/time-calculators#medication-schedules", label: "Medication schedules"/, "the Tools menu must expose the medication schedule group");
assert.match(header, /href: "\/time-calculators#deadlines", label: "Deadlines & due dates"/, "the Tools menu must expose the deadline group");
assert.doesNotMatch(header, /href: "\/2026-estimated-tax-payment-dates"|href: "\/estimated-tax-payment-dates"/, "year-specific tax tools must not crowd the global Tools menu");
assert.match(
  header,
  /<div className="hp2-mobile-tools"[^>]*>[\s\S]*?<h2>Most-used tools<\/h2>[\s\S]*?featuredTools\.map[\s\S]*?<h2>Browse by need<\/h2>[\s\S]*?browseGroups\.map[\s\S]*?Browse all tools/,
  "the mobile Tools menu must present featured tools before grouped discovery and the full directory"
);
assert.match(header, /trackToolsMenuOpened\("desktop_menu"\)/, "desktop Tools menu opens must be measured");
assert.match(header, /trackToolsMenuOpened\("mobile_menu"\)/, "mobile Tools menu opens must be measured");

const directory = readFileSync("src/app/time-calculators/page.tsx", "utf8");
const trackedToolLink = readFileSync("src/components/TrackedToolLink.tsx", "utf8");
assert.match(directory, /id="popular-tools"[\s\S]*?\/what-time-should-i-leave[\s\S]*?\/airport-time-to-leave-calculator[\s\S]*?\/wake-up-time-calculator/, "the all-tools page must start with the three demand-backed calculators");
assert.match(directory, /Browse by what you need[\s\S]*?id="leave-time"[\s\S]*?id="wake-countdowns"[\s\S]*?id="medication-schedules"[\s\S]*?id="deadlines"/, "the all-tools page must expose and render four plain-language buckets");
assert.match(directory, /#leave-time[\s\S]*?#wake-countdowns[\s\S]*?#medication-schedules[\s\S]*?#deadlines/, "the all-tools page must provide an early jump index to every lower bucket");
assert.doesNotMatch(directory, /The three calculators OnTimer visitors use most|Skip directly to the right group/, "directory headings must not be followed by self-explanatory filler copy");
assert.match(trackedToolLink, /href\.includes\("#"\)[\s\S]*?<a href=\{href\}/, "tracked bucket links must use native anchors so same-page jumps scroll to their targets");
assert.doesNotMatch(directory, /Featured estimated tax tools|heroSupplement=/, "estimated-tax tools must not receive hero-level directory prominence");

const homepage = readFileSync("src/app/homepage2/page.tsx", "utf8");
assert.match(
  homepage,
  /href="\/time-calculators#tax-deadlines"[\s\S]*?I need to remember a tax deadline/,
  "the homepage tools section must expose the estimated-tax year chooser"
);

console.log("site footer copy checks passed");
