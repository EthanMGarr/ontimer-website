"use client";

import { useSearchParams } from "next/navigation";
import AirportCalculator from "@/app/airport-time-to-leave-calculator/AirportCalculator";
import AirportIntentNav, { type AirportPlanningIntent } from "@/components/airport/AirportIntentNav";
import type { CalculatorExample } from "@/lib/travel-locations";

interface AirportDeparturePlannerProps {
  slug: string;
  airportCode: string;
  initialAirport: string;
  example: CalculatorExample;
  planningJurisdiction?: "us" | "international";
  shortHaulLabel?: string;
  longHaulLabel?: string;
  securityLabel?: string;
  showIntentNav?: boolean;
}

function AirportDeparturePlannerView({
  slug,
  airportCode,
  initialAirport,
  example,
  planningJurisdiction,
  shortHaulLabel,
  longHaulLabel,
  securityLabel,
  showIntentNav = false,
  planningIntent,
}: AirportDeparturePlannerProps & { planningIntent: AirportPlanningIntent }) {
  return (
    <>
      {showIntentNav ? (
        <AirportIntentNav
          slug={slug}
          airportCode={airportCode}
          currentIntent={planningIntent}
        />
      ) : null}
      <AirportCalculator
        key={planningIntent}
        initialAirport={initialAirport}
        locationCode={airportCode}
        example={example}
        planningJurisdiction={planningJurisdiction}
        shortHaulLabel={shortHaulLabel}
        longHaulLabel={longHaulLabel}
        securityLabel={securityLabel}
        initialArrivalMode={planningIntent === "dropoff" ? "dropoff" : "parking"}
        genericRedesign
      />
    </>
  );
}

/**
 * Static-render fallback and canonical default. Flying remains the primary
 * airport-page intent while the query-state enhancement hydrates.
 */
export function AirportDeparturePlannerFallback(props: AirportDeparturePlannerProps) {
  return <AirportDeparturePlannerView {...props} planningIntent="flying" />;
}

/**
 * Keeps the approved `?intent=dropoff` state in the browser so the surrounding
 * destination page can remain prerendered and avoid a function invocation on
 * every visit. The intent key intentionally resets the calculator when the
 * visitor switches tasks, matching the previous navigation behavior.
 */
export default function AirportDeparturePlanner(props: AirportDeparturePlannerProps) {
  const searchParams = useSearchParams();
  const planningIntent: AirportPlanningIntent =
    searchParams.get("intent") === "dropoff" ? "dropoff" : "flying";

  return <AirportDeparturePlannerView {...props} planningIntent={planningIntent} />;
}
