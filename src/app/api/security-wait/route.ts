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
import { guardGoogleApiRequest } from "@/lib/api-cost-guard";

const providerEnabled = process.env.AIRPORT_SECURITY_TSAWAITTIMES_ENABLED !== "false";
const providerApiKey = process.env.TSA_WAIT_TIMES_API_KEY?.trim();
const SECURITY_RATE_LIMIT = {
  name: "security-wait",
  perIpLimit: 60,
  perIpWindowMs: 60 * 60_000,
  globalLimit: 5_000,
  globalWindowMs: 60 * 60_000,
};

const securityService = createAirportSecurityService({
  providers: providerEnabled && providerApiKey
    ? [createTsaWaitTimesProvider({ apiKey: providerApiKey })]
    : [],
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
  const guard = guardGoogleApiRequest(request, SECURITY_RATE_LIMIT);
  if (!guard.allowed) {
    return NextResponse.json(
      { error: guard.reason },
      {
        status: guard.reason === "rate_limited" ? 429 : 403,
        headers: guard.retryAfterSeconds
          ? { "Retry-After": String(guard.retryAfterSeconds) }
          : undefined,
      }
    );
  }
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
