import assert from "node:assert/strict";
import {
  airportPlanningJurisdictionForCountry,
  buildAirportCalendarLocation,
  filterAirportOptions,
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
assert.equal(filterAirportOptions(options, "heathrow").length, 0, "non-matches should return an empty list");
assert.equal(airportPlanningJurisdictionForCountry("United States"), "us", "US airports should use TSA controls");
assert.equal(airportPlanningJurisdictionForCountry("Canada"), "international", "Canadian airports should not use TSA controls");

console.log("airport autocomplete tests passed");
