import assert from "node:assert/strict";
import {
  buildCruiseSnippetCandidate,
  buildCruiseSnippetDescription,
} from "../cruise-answer-seo";

const portMiami = {
  name: "PortMiami Cruise Terminals",
};

assert.match(buildCruiseSnippetDescription(portMiami), /^Calculate when to leave for PortMiami/);
assert.match(buildCruiseSnippetDescription(portMiami), /starting location/);
assert.match(buildCruiseSnippetCandidate(portMiami), /not a generic rule of thumb/);

console.log("Cruise answer-intent SEO tests passed.");
