/// Server-side proxy for TSA security wait time estimates.
///
/// ## Purpose
/// Fetches live or historical TSA wait time data from tsawaittimes.com and
/// blends it with fallback baselines to return a trustworthy security estimate.
///
/// ## Include
/// - TSA API fetch with timeout and graceful fallback
/// - Historical hourly patterns for time-of-day estimates
/// - PreCheck / CLEAR reduction factors
/// - Safety blending so no single source is trusted blindly
///
/// ## Don't Include
/// - Auth, user state, UI concerns, travel time logic
///
/// ## Lifecycle & Usage
/// Called from AirportCalculator reactively on airport / time / traveler-program
/// changes (debounced). Always returns an estimate — never throws or 5xx.

import { NextRequest, NextResponse } from "next/server";

// ─── Types ────────────────────────────────────────────────────────────────────

type FlightType = "domestic" | "international";

export interface SecurityEstimate {
  min: number;
  avg: number;
  max: number;
  source: "live" | "historical" | "fallback";
  context: string;
}

// ─── Baselines ────────────────────────────────────────────────────────────────

const FALLBACK: Record<FlightType, { min: number; avg: number; max: number }> = {
  domestic:      { min: 15, avg: 25, max: 45 },
  international: { min: 30, avg: 45, max: 75 },
};

// Typical US domestic wait minutes by departure hour (no trusted traveler)
const HIST_DOMESTIC_BY_HOUR = [
  8, 5, 5, 5, 8, 12,       // 12am–5am
  18, 28, 32, 30, 25, 22,  // 6am–11am
  25, 28, 25, 22, 25, 28,  // 12pm–5pm
  30, 28, 22, 18, 15, 10,  // 6pm–11pm
];

function historicalAvg(hour: number, flightType: FlightType): number {
  const domestic = HIST_DOMESTIC_BY_HOUR[hour] ?? 25;
  return flightType === "international" ? Math.round(domestic * 1.8) : domestic;
}

// ─── Trusted traveler adjustments ─────────────────────────────────────────────

function applyTrustedTraveler(
  raw: { min: number; avg: number; max: number },
  hasPreCheck: boolean,
  hasClear: boolean
): { min: number; avg: number; max: number } {
  // CLEAR eliminates most of the ID-check line; PreCheck secondary benefit
  const avgFactor   = hasClear ? 0.40 : hasPreCheck ? 0.60 : 1.0;
  const rangeFactor = hasClear ? 0.50 : hasPreCheck ? 0.65 : 1.0;
  return {
    min: Math.max(3, Math.round(raw.min * rangeFactor)),
    avg: Math.max(5, Math.round(raw.avg * avgFactor)),
    max: Math.max(8, Math.round(raw.max * rangeFactor)),
  };
}

// ─── Safety blending ──────────────────────────────────────────────────────────
// Prevents raw API data from being trusted blindly.

function blend(apiAvg: number | null, histAvg: number, fallbackAvg: number): number {
  if (apiAvg === null) {
    return Math.round(0.6 * histAvg + 0.4 * fallbackAvg);
  }
  // Live gets weight but is anchored to historical + fallback
  return Math.round(0.5 * apiAvg + 0.3 * histAvg + 0.2 * fallbackAvg);
}

// ─── TSA API fetch ────────────────────────────────────────────────────────────

interface TsaCheckpoint {
  wait_time_minutes?: number;
  wait_time?: number;
  current_wait?: number;
  average_wait?: number;
}

interface TsaAirportPayload {
  checkpoints?: TsaCheckpoint[];
  wait_times?: TsaCheckpoint[];
  waittimes?: TsaCheckpoint[];
  current_wait?: number;
  average_wait?: number;
}

function parseTsaResponse(data: TsaAirportPayload | TsaAirportPayload[]): number | null {
  const airport: TsaAirportPayload = Array.isArray(data) ? data[0] : data;
  if (!airport) return null;

  // Try direct top-level fields
  const direct = airport.average_wait ?? airport.current_wait;
  if (typeof direct === "number" && direct > 0) return direct;

  // Try nested checkpoint arrays
  const cps = airport.checkpoints ?? airport.wait_times ?? airport.waittimes;
  if (!Array.isArray(cps) || cps.length === 0) return null;
  const waits = cps
    .map((cp) => cp.wait_time_minutes ?? cp.wait_time ?? cp.current_wait ?? cp.average_wait)
    .filter((w): w is number => typeof w === "number" && w >= 0);
  if (waits.length === 0) return null;
  return Math.round(waits.reduce((a, b) => a + b, 0) / waits.length);
}

async function fetchTsaWait(airportCode: string): Promise<number | null> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 4000);
  try {
    const res = await fetch(
      `https://www.tsawaittimes.com/api/airports/${airportCode.toUpperCase()}`,
      { signal: controller.signal, cache: "no-store" }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return parseTsaResponse(data);
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

// ─── Airport code extraction ──────────────────────────────────────────────────

const CITY_TO_IATA: Record<string, string> = {
  newark: "EWR", "new york": "JFK", "los angeles": "LAX", chicago: "ORD",
  "san francisco": "SFO", miami: "MIA", atlanta: "ATL", dallas: "DFW",
  denver: "DEN", seattle: "SEA", boston: "BOS", phoenix: "PHX",
  minneapolis: "MSP", detroit: "DTW", "las vegas": "LAS", houston: "IAH",
  "salt lake": "SLC", portland: "PDX", "san diego": "SAN", charlotte: "CLT",
  orlando: "MCO", baltimore: "BWI", washington: "DCA", philadelphia: "PHL",
  "new orleans": "MSY", nashville: "BNA", austin: "AUS", pittsburgh: "PIT",
  cleveland: "CLE", tampa: "TPA", sacramento: "SMF", "san jose": "SJC",
  raleigh: "RDU", "kansas city": "MCI", "st. louis": "STL",
};

function extractAirportCode(input: string): string | null {
  if (!input.trim()) return null;
  // "Kennedy (JFK)" or "JFK)"
  const inParens = input.match(/\(([A-Z]{3})\)/);
  if (inParens) return inParens[1];
  // Standalone 3-letter uppercase: "JFK airport"
  const upper = input.match(/\b([A-Z]{3})\b/);
  if (upper) return upper[1];
  // Lowercase city lookup
  const lower = input.toLowerCase();
  for (const [city, code] of Object.entries(CITY_TO_IATA)) {
    if (lower.includes(city)) return code;
  }
  return null;
}

// ─── Context label ────────────────────────────────────────────────────────────

function buildContext(airportCode: string | null, departure: Date, source: SecurityEstimate["source"]): string {
  const h = departure.getHours() % 12 || 12;
  const m = departure.getMinutes();
  const ampm = departure.getHours() < 12 ? "AM" : "PM";
  const timeStr = m > 0 ? `${h}:${m.toString().padStart(2, "0")} ${ampm}` : `${h} ${ampm}`;
  const ap = airportCode ?? "your airport";

  if (source === "live")       return `Live TSA data at ${ap} around ${timeStr}`;
  if (source === "historical") return `Typical for ${ap} around ${timeStr}`;
  return `Standard estimate for ${ap}`;
}

// ─── Route handler ────────────────────────────────────────────────────────────

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const airportInput = searchParams.get("airport") ?? "";
  const rawTime      = searchParams.get("departureTime") ?? "";
  const flightType   = (searchParams.get("flightType") ?? "domestic") as FlightType;
  const hasPreCheck  = searchParams.get("hasPreCheck") === "true";
  const hasClear     = searchParams.get("hasClear")    === "true";

  const departureUnix = parseInt(rawTime, 10);
  const departure = !isNaN(departureUnix) && departureUnix > 0
    ? new Date(departureUnix * 1000)
    : new Date();

  const hoursUntil = (departure.getTime() - Date.now()) / (1000 * 60 * 60);
  const airportCode = extractAirportCode(airportInput);
  const fb = FALLBACK[flightType] ?? FALLBACK.domestic;
  const histAvg = historicalAvg(departure.getHours(), flightType);

  let source: SecurityEstimate["source"];
  let apiAvg: number | null = null;

  if (hoursUntil <= 6 && airportCode) {
    apiAvg = await fetchTsaWait(airportCode);
    source = apiAvg !== null ? "live" : "historical";
  } else if (hoursUntil <= 24) {
    source = "historical";
  } else {
    source = "fallback";
  }

  const blendedAvg = blend(apiAvg, histAvg, fb.avg);
  const safeAvg = Math.max(fb.min, Math.min(fb.max + 15, blendedAvg));

  // Build range proportionally around blended avg
  const spread = flightType === "international" ? 0.4 : 0.5;
  const rawEst = {
    min: Math.max(5, Math.round(safeAvg * (1 - spread * 0.6))),
    avg: safeAvg,
    max: Math.round(safeAvg * (1 + spread * 0.7)),
  };

  const adjusted = applyTrustedTraveler(rawEst, hasPreCheck, hasClear);
  const context  = buildContext(airportCode, departure, source);

  return NextResponse.json({ ...adjusted, source, context } satisfies SecurityEstimate);
}
