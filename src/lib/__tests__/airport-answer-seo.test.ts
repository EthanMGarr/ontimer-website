import assert from "node:assert/strict";
import {
  buildAirportAnswerApplicationName,
  buildAirportAnswerDescription,
  buildAirportSnippetCandidate,
  buildAirportAnswerTitle,
  buildAirportSearchName,
} from "../airport-answer-seo";

const newark = {
  shortName: "Newark Airport",
  code: "EWR",
  name: "Newark Liberty International Airport",
};

assert.equal(
  buildAirportAnswerTitle(newark),
  "When Should I Leave for Newark Airport (EWR)? Free Calculator",
  "airport titles should match the traveler question and make the free calculator explicit",
);
assert.equal(
  buildAirportAnswerDescription(newark),
  "Calculate exactly when to leave for Newark Airport (EWR). This free calculator uses your flight, starting point, traffic, security, baggage and parking to give you a specific leave time.",
  "descriptions should distinguish the specific calculator result from generic airport advice",
);
assert.equal(
  buildAirportSnippetCandidate(newark),
  "Enter your flight and starting point. This free calculator uses traffic, security, bags, parking and terminal access to give you a specific leave time for Newark Airport (EWR).",
);
assert.equal(
  buildAirportAnswerApplicationName(newark),
  "When Should I Leave for Newark Airport (EWR)? Free Calculator",
);
assert.equal(buildAirportSearchName(newark), "Newark Airport (EWR)");

const lax = {
  shortName: "Los Angeles International Airport",
  code: "LAX",
  name: "Los Angeles International Airport",
  searchName: "LAX",
};

assert.equal(buildAirportSearchName(lax), "LAX");
assert.equal(
  buildAirportAnswerTitle(lax),
  "When Should I Leave for LAX? Free Airport Calculator",
);

const dfw = {
  shortName: "DFW Airport",
  code: "DFW",
  name: "Dallas Fort Worth International Airport",
};

assert.equal(buildAirportSearchName(dfw), "DFW Airport");
assert.equal(
  buildAirportAnswerTitle(dfw),
  "When Should I Leave for DFW Airport? Free Calculator",
  "airport codes already present in the natural name should not be duplicated",
);

console.log("Airport answer-intent SEO tests passed.");
