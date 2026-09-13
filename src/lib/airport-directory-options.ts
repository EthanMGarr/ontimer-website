import {
  airportPlanningJurisdictionForCountry,
  type AirportAutocompleteOption,
} from "@/lib/airport-autocomplete";

let airportDirectoryOptionsPromise: Promise<AirportAutocompleteOption[]> | null = null;

/**
 * Loads the scheduled-service airport directory only when an airport-aware
 * field is used. Keeping this shared preserves one name/code matching source
 * for both the airport planner and the general leave-time calculator.
 */
export function loadAirportDirectoryOptions(): Promise<AirportAutocompleteOption[]> {
  if (!airportDirectoryOptionsPromise) {
    airportDirectoryOptionsPromise = import("@/lib/airport-directory.generated").then(
      ({ airportDirectoryRecords }) => airportDirectoryRecords.map(
        ([code, name, municipality, country, keywords]) => ({
          code,
          name,
          city: [municipality, country].filter(Boolean).join(", "),
          aliases: keywords ? [keywords] : undefined,
          planningJurisdiction: airportPlanningJurisdictionForCountry(country),
        })
      )
    );
  }

  return airportDirectoryOptionsPromise;
}

export function resetAirportDirectoryOptionsForRetry() {
  airportDirectoryOptionsPromise = null;
}
