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
assert.match(source.airportPage, /<p data-nosnippet>\s*A common planning baseline/);
assert.match(source.airportCalculator, /Example — clearly labeled, not the user's result[\s\S]*?data-nosnippet/);
assert.match(source.cruiseCalculator, /Your leave time includes[\s\S]*?data-nosnippet/);
assert.match(source.destinationTemplate, /data-location-section="worked-examples"[^>]*data-nosnippet/);
assert.match(source.airportWebsite, /noSnippetQuestions: \[faqItems\[0\]\.question, faqItems\[1\]\.question\]/);
assert.match(source.cruiseWebsite, /noSnippetQuestions: \[faqItems\[0\]\.question, faqItems\[1\]\.question\]/);
assert.match(source.leavePage, /<p data-nosnippet>\s*The formula:/);
assert.match(source.leavePage, /data-nosnippet=\{index === 4 \|\| undefined\}/);
assert.match(source.wakePage, /<p data-nosnippet>\s*A common approach/);
assert.match(source.wakePage, /data-nosnippet=\{index === 0 \|\| undefined\}/);

console.log("Calculator snippet safeguards passed.");
