"use client";

import type { ComponentProps } from "react";
import { useSearchParams } from "next/navigation";
import AirportCalculator from "@/app/airport-time-to-leave-calculator/AirportCalculator";
import { parseAirportPlanLink } from "@/lib/airport-plan-link";

type AirportCalculatorPlanPrefillProps = Omit<
  ComponentProps<typeof AirportCalculator>,
  "initialPlan"
>;

export default function AirportCalculatorPlanPrefill(
  props: AirportCalculatorPlanPrefillProps,
) {
  const parsed = parseAirportPlanLink(useSearchParams());
  return (
    <AirportCalculator
      {...props}
      initialPlan={parsed?.kind === "departure" ? parsed : undefined}
    />
  );
}
