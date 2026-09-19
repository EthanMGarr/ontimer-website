import assert from "node:assert/strict";
import {
  buildCruiseAnswerTitle,
  buildCruiseSnippetCandidate,
  buildCruiseSnippetDescription,
} from "../cruise-answer-seo";

const portMiami = {
  name: "PortMiami Cruise Terminals",
  shortName: "PortMiami",
};

assert.equal(
  buildCruiseAnswerTitle(portMiami),
  "When Should I Leave for PortMiami? Free Cruise Calculator",
);
assert.equal(
  buildCruiseSnippetDescription(portMiami),
  "Calculate exactly when to leave for PortMiami. This free cruise calculator uses your boarding time, starting point, traffic, parking, luggage and terminal access.",
);
assert.equal(
  buildCruiseSnippetCandidate(portMiami),
  "Enter your boarding time and starting point. This free calculator uses traffic, parking, luggage, check-in and terminal access to give you a specific leave time for PortMiami.",
);

console.log("Cruise answer-intent SEO tests passed.");
