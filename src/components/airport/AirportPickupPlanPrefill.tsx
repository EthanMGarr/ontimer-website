"use client";

import { useSearchParams } from "next/navigation";
import AirportPickupCalculator from "@/app/airport-pickup-time-calculator/AirportPickupCalculator";
import { parseAirportPlanLink } from "@/lib/airport-plan-link";

export default function AirportPickupPlanPrefill() {
  const searchParams = useSearchParams();
  const parsed = parseAirportPlanLink(searchParams);
  const legacyAirport = parsed
    ? undefined
    : searchParams.get("airport")?.trim().slice(0, 120) || undefined;

  return (
    <AirportPickupCalculator
      initialAirport={legacyAirport}
      initialPlan={parsed?.kind === "pickup" ? parsed : undefined}
    />
  );
}
