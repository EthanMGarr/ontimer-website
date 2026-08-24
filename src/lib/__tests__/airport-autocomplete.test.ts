import assert from "node:assert/strict";
import {
  buildAirportCalendarLocation,
  filterAirportOptions,
  type AirportAutocompleteOption,
} from "../airport-autocomplete";

const options: AirportAutocompleteOption[] = [
  {
    code: "LAX",
    name: "Los Angeles International Airport",
    city: "Los Angeles, California",
    location: "Los Angeles International Airport (LAX), Los Angeles, California",
    searchText: "lax los angeles international airport los angeles california",
  },
  {
    code: "JFK",
    name: "John F. Kennedy International Airport",
    city: "Queens, New York",
    location: "John F. Kennedy International Airport (JFK), Queens, New York",
    searchText: "jfk john f kennedy international airport queens new york",
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
assert.equal(filterAirportOptions(options, "heathrow").length, 0, "non-matches should return an empty list");

console.log("airport autocomplete tests passed");
