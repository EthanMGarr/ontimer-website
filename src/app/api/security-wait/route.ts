/// Provider-neutral airport security estimate endpoint.
///
/// The legacy response fields remain stable. The additive `intelligence` object
/// distinguishes current provider evidence, OnTimer's arrival-time prediction,
/// and the conservative allowance used by the calculator.

import { NextRequest, NextResponse } from "next/server";
import {
  createAirportSecurityService,
  createTsaWaitTimesProvider,
  type ArrivalMode,
  type FlightType,
  type SecurityEstimate,
} from "@/lib/airport-security";

const providerEnabled = process.env.AIRPORT_SECURITY_TSAWAITTIMES_ENABLED !== "false";

const securityService = createAirportSecurityService({
  providers: providerEnabled ? [createTsaWaitTimesProvider()] : [],
  log(event) {
    console.info("[airport-security]", JSON.stringify(event));
  },
});

function parseDeparture(raw: string, now: Date): Date {
  const seconds = Number.parseInt(raw, 10);
  if (!Number.isFinite(seconds) || seconds <= 0) return now;
  const departure = new Date(seconds * 1000);
  return isNaN(departure.getTime()) ? now : departure;
}

function parseFlightType(value: string | null): FlightType {
  return value === "international" ? "international" : "domestic";
}

function parseArrivalMode(value: string | null): ArrivalMode {
  if (value === "rideshare" || value === "dropoff" || value === "transit") return value;
  return "parking";
}

function requestInput(request: NextRequest, now: Date) {
  const { searchParams } = request.nextUrl;
  const explicitAirportCode = searchParams.get("airportCode")?.trim().toUpperCase() ?? "";
  return {
    airportInput: /^[A-Z]{3}$/.test(explicitAirportCode)
      ? explicitAirportCode
      : searchParams.get("airport") ?? "",
    departure: parseDeparture(searchParams.get("departureTime") ?? "", now),
    flightType: parseFlightType(searchParams.get("flightType")),
    jurisdiction: searchParams.get("jurisdiction") === "international"
      ? "international" as const
      : "us" as const,
    hasPreCheck: searchParams.get("hasPreCheck") === "true",
    hasClear: searchParams.get("hasClear") === "true",
    hasCheckedBag: searchParams.get("hasCheckedBag") === "true",
    arrivalMode: parseArrivalMode(searchParams.get("arrivalMode")),
  };
}

export async function GET(request: NextRequest) {
  const now = new Date();
  const input = requestInput(request, now);
  try {
    const estimate = await securityService.estimate(input);
    return NextResponse.json(estimate satisfies SecurityEstimate);
  } catch (error) {
    console.error("[airport-security] estimate_failed", {
      error: error instanceof Error ? error.message : "unknown",
    });
    const fallback = await createAirportSecurityService({ providers: [] }).estimate(input);
    return NextResponse.json(fallback satisfies SecurityEstimate);
  }
}
