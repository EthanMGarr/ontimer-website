"use client";

import { useSearchParams } from "next/navigation";
import AirportCalculator from "@/app/airport-time-to-leave-calculator/AirportCalculator";
import type { AirportAutocompleteOption } from "@/lib/airport-autocomplete";
import { parseAirportPlanLink } from "@/lib/airport-plan-link";

export default function AirportCalculatorPlanPrefill({
  airportOptions,
}: {
  airportOptions: AirportAutocompleteOption[];
}) {
  const parsed = parseAirportPlanLink(useSearchParams());
  return (
    <AirportCalculator
      genericRedesign
      airportOptions={airportOptions}
      initialPlan={parsed?.kind === "departure" ? parsed : undefined}
    />
  );
}
