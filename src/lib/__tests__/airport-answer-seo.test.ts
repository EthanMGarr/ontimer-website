import assert from "node:assert/strict";
import {
  buildAirportAnswerApplicationName,
  buildAirportAnswerDescription,
  buildAirportSnippetCandidate,
  buildAirportAnswerTitle,
} from "../airport-answer-seo";

const newark = {
  shortName: "Newark Airport",
  code: "EWR",
  name: "Newark Liberty International Airport",
};

assert.equal(
  buildAirportAnswerTitle(newark),
  "When Should I Leave for Newark Airport (EWR)?",
  "airport titles should lead with the traveler question rather than the calculator format",
);
assert.match(
  buildAirportAnswerDescription(newark),
  /^Calculate what time to leave for Newark Liberty International Airport/,
  "descriptions should promise the answer before describing its inputs",
);
assert.match(buildAirportSnippetCandidate(newark), /Newark Liberty International Airport \(EWR\)/);
assert.match(buildAirportSnippetCandidate(newark), /not a generic rule of thumb/);
assert.equal(
  buildAirportAnswerApplicationName(newark),
  "When to Leave for Newark Airport (EWR)",
);

console.log("Airport answer-intent SEO tests passed.");
