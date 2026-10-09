"use client";

import type { ComponentProps } from "react";
import AirportCalculator from "@/app/airport-time-to-leave-calculator/AirportCalculator";

export type GenericAirportCalculatorProps = Omit<
  ComponentProps<typeof AirportCalculator>,
  "genericRedesign"
>;

/**
 * The generic airport routes always use the reviewed task-first calculator.
 * Keeping this invariant inside the component prevents Suspense fallback and
 * hydrated branches from silently drifting to different experiences.
 */
export default function GenericAirportCalculator(
  props: GenericAirportCalculatorProps,
) {
  return <AirportCalculator {...props} genericRedesign />;
}
