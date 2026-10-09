"use client";

import type { ComponentProps } from "react";
import { useSearchParams } from "next/navigation";
import GenericAirportCalculator from "@/components/airport/GenericAirportCalculator";
import { parseAirportPlanLink } from "@/lib/airport-plan-link";

type AirportCalculatorPlanPrefillProps = Omit<
  ComponentProps<typeof GenericAirportCalculator>,
  "initialPlan"
>;

export default function AirportCalculatorPlanPrefill(
  props: AirportCalculatorPlanPrefillProps,
) {
  const parsed = parseAirportPlanLink(useSearchParams());
  return (
    <GenericAirportCalculator
      {...props}
      initialPlan={parsed?.kind === "departure" ? parsed : undefined}
    />
  );
}
