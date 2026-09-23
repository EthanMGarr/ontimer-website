import assert from "node:assert/strict";
import {
  airportPlanningJurisdictionForCountry,
  buildAirportCalendarLocation,
  filterAirportOptions,
  hasExactAirportIdentifierMatch,
  type AirportAutocompleteOption,
} from "../airport-autocomplete";

const options: AirportAutocompleteOption[] = [
  {
    code: "LAX",
    name: "Los Angeles International Airport",
    city: "Los Angeles, California",
  },
  {
    code: "JFK",
    name: "John F. Kennedy International Airport",
    city: "Queens, New York",
  },
  {
    code: "YHZ",
    name: "Halifax / Stanfield International Airport",
    city: "Halifax, Canada",
    aliases: ["Robert L. Stanfield International Airport"],
  },
  {
    code: "YUL",
    name: "Montréal-Trudeau International Airport",
    city: "Montréal, Canada",
  },
  {
    code: "DHB",
    name: "Deer Harbor SPB",
    city: "Deer Harbor, United States",
    aliases: ["42W"],
  },
];

assert.equal(
  buildAirportCalendarLocation({
    code: "LAX",
    name: "Los Angeles International Airport (LAX)",
    city: "Los Angeles, California",
  }),
  "Los Angeles International Airport (LAX), Los Angeles, California",
  "calendar locations should include the full airport name and code exactly once"
);

assert.equal(filterAirportOptions(options, "jfk")[0]?.code, "JFK", "exact IATA matches should rank first");
assert.equal(filterAirportOptions(options, "los angeles")[0]?.code, "LAX", "multi-word city searches should match");
assert.equal(filterAirportOptions(options, "YHZ")[0]?.code, "YHZ", "YHZ should match Halifax airport by code");
assert.equal(filterAirportOptions(options, "halifax")[0]?.code, "YHZ", "Halifax should match by city");
assert.equal(filterAirportOptions(options, "montreal")[0]?.code, "YUL", "search should ignore diacritics");
assert.equal(filterAirportOptions(options, "42").length, 0, "numeric street prefixes must not surface airport aliases");
assert.equal(filterAirportOptions(options, "42 I").length, 0, "digit-leading addresses must not combine airport identifiers with location text");
assert.equal(filterAirportOptions(options, "42W")[0]?.code, "DHB", "complete mixed-character airport identifiers should still match");
assert.equal(filterAirportOptions(options, "heathrow").length, 0, "non-matches should return an empty list");
assert.equal(hasExactAirportIdentifierMatch(options, "jfk"), true, "exact IATA codes should be safe to resolve locally");
assert.equal(hasExactAirportIdentifierMatch(options, " 42w "), true, "exact mixed-character aliases should be safe to resolve locally");
assert.equal(hasExactAirportIdentifierMatch(options, "new york"), false, "place names must retain ordinary place suggestions");
assert.equal(hasExactAirportIdentifierMatch(options, "42"), false, "partial numeric identifiers must retain ordinary place suggestions");
assert.equal(airportPlanningJurisdictionForCountry("United States"), "us", "US airports should use TSA controls");
assert.equal(airportPlanningJurisdictionForCountry("Canada"), "international", "Canadian airports should not use TSA controls");

console.log("airport autocomplete tests passed");
