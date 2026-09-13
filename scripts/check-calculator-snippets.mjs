import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const files = {
  airportPage: "src/app/airport-time-to-leave-calculator/page.tsx",
  airportCalculator: "src/app/airport-time-to-leave-calculator/AirportCalculator.tsx",
  cruiseCalculator: "src/app/cruise-time-to-leave/CruiseCalculator.tsx",
  destinationTemplate: "src/components/destination-pages/DestinationPageTemplate.tsx",
  airportWebsite: "src/core/leave-time/plugins/airports/website.tsx",
  cruiseWebsite: "src/core/leave-time/plugins/cruise-terminals/website.tsx",
  leavePage: "src/app/what-time-should-i-leave/page.tsx",
  wakePage: "src/app/wake-up-time-calculator/page.tsx",
};

const source = Object.fromEntries(
  await Promise.all(
    Object.entries(files).map(async ([key, path]) => [key, await readFile(path, "utf8")])
  )
);

assert.doesNotMatch(source.airportPage, /need to leave by 9:20 AM/i);
assert.match(source.airportPage, /<div data-nosnippet>\s*A common planning baseline/);
assert.match(source.airportCalculator, /Example — clearly labeled, not the user's result[\s\S]*?data-nosnippet/);
assert.match(source.cruiseCalculator, /Your leave time includes[\s\S]*?data-nosnippet/);
assert.match(source.destinationTemplate, /data-location-section="worked-examples"[^>]*data-nosnippet/);
assert.match(source.destinationTemplate, /<div[\s\S]*?data-nosnippet=\{model\.faq\.noSnippetQuestions/);
assert.match(source.airportWebsite, /const snippetEligibleFaqItems = faqItems\.slice\(2\)/);
assert.match(source.airportWebsite, /noSnippetQuestions: \[faqItems\[0\]\.question, faqItems\[1\]\.question\]/);
assert.match(source.cruiseWebsite, /const snippetEligibleFaqItems = faqItems\.slice\(2\)/);
assert.match(source.cruiseWebsite, /noSnippetQuestions: \[faqItems\[0\]\.question, faqItems\[1\]\.question\]/);
assert.match(
  source.leavePage,
  /Going somewhere\? This free calculator uses traffic-aware routing, travel mode, arrival time, and your buffer to tell you when to leave—no sign-up required\./
);
assert.match(source.leavePage, /<div data-nosnippet>\s*The formula:/);
assert.match(source.leavePage, /const snippetEligibleFaqItems = faqItems\.filter\(\(_, index\) => index !== 0 && index !== 4\)/);
assert.match(source.leavePage, /data-nosnippet=\{index === 0 \|\| index === 4 \|\| undefined\}/);
assert.match(source.wakePage, /<div data-nosnippet>\s*A common approach/);
assert.match(source.wakePage, /data-nosnippet=\{index === 0 \|\| undefined\}/);
assert.doesNotMatch(
  Object.values(source).join("\n"),
  /<p(?:\s[^>]*)?\sdata-nosnippet(?:=|\s|>)/,
  "Google only supports data-nosnippet on div, span, and section elements"
);

console.log("Calculator snippet safeguards passed.");
