import assert from "node:assert/strict";
import {
  buildAirportAnswerApplicationName,
  buildAirportAnswerDescription,
  buildAirportDepartureHeading,
  buildAirportPickupHeading,
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
  "Find out exactly when to leave for Newark Airport (EWR) — Free Calculator",
  "airport titles should lead with the exact traveler outcome and a readable airport entity",
);
assert.equal(buildAirportDepartureHeading(newark), "Find out exactly when to leave for Newark Airport (EWR)");
assert.equal(buildAirportPickupHeading(newark), "Find out exactly when to leave for a pickup at Newark Airport (EWR)");
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
  "Find out exactly when to leave for Newark Airport (EWR)",
);
assert.equal(buildAirportSearchName(newark), "Newark Airport (EWR)");

const lax = {
  shortName: "Los Angeles International Airport",
  code: "LAX",
  name: "Los Angeles International Airport",
};

assert.equal(buildAirportSearchName(lax), "Los Angeles International Airport (LAX)");
assert.equal(
  buildAirportAnswerTitle(lax),
  "Find out exactly when to leave for Los Angeles International Airport (LAX) — Free Calculator",
);

const dfw = {
  shortName: "DFW Airport",
  code: "DFW",
  name: "Dallas Fort Worth International Airport",
};

assert.equal(buildAirportSearchName(dfw), "DFW Airport (DFW)");
assert.equal(
  buildAirportAnswerTitle(dfw),
  "Find out exactly when to leave for DFW Airport (DFW) — Free Calculator",
  "airport codes should remain explicit in parentheses even when the familiar name contains the code",
);

const alreadyFormatted = {
  shortName: "Newark Airport (EWR)",
  code: "EWR",
  name: "Newark Liberty International Airport",
};
assert.equal(buildAirportSearchName(alreadyFormatted), "Newark Airport (EWR)", "the shared formatter must not duplicate an existing code suffix");

console.log("Airport answer-intent SEO tests passed.");
