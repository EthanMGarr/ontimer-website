import type {
  ArrivalMode,
  Confidence,
  FlightType,
  Freshness,
  ObservedSecurityWait,
  SecurityLaneType,
  SecurityRequest,
  WaitRange,
} from "./types";

export const FALLBACK: Record<FlightType, WaitRange> = {
  domestic: { min: 15, avg: 25, max: 45 },
  international: { min: 30, avg: 45, max: 75 },
};

// Planning heuristic, not an observed or airport-specific historical feed.
const DOMESTIC_PATTERN_BY_HOUR = [
  8, 5, 5, 5, 8, 12,
  18, 28, 32, 30, 25, 22,
  25, 28, 25, 22, 25, 28,
  30, 28, 22, 18, 15, 10,
];

const CITY_TO_IATA: Record<string, string> = {
  laguardia: "LGA", kennedy: "JFK", newark: "EWR", "new york": "JFK",
  "los angeles": "LAX", chicago: "ORD",
  "san francisco": "SFO", miami: "MIA", atlanta: "ATL", dallas: "DFW",
  denver: "DEN", seattle: "SEA", boston: "BOS", phoenix: "PHX",
  minneapolis: "MSP", detroit: "DTW", "las vegas": "LAS", houston: "IAH",
  "salt lake": "SLC", portland: "PDX", "san diego": "SAN", charlotte: "CLT",
  orlando: "MCO", baltimore: "BWI", washington: "DCA", philadelphia: "PHL",
  "new orleans": "MSY", nashville: "BNA", austin: "AUS", pittsburgh: "PIT",
  cleveland: "CLE", tampa: "TPA", sacramento: "SMF", "san jose": "SJC",
  raleigh: "RDU", "kansas city": "MCI", "st. louis": "STL",
};

export function extractAirportCode(input: string): string | null {
  if (!input.trim()) return null;
  const inParens = input.match(/\(([A-Z]{3})\)/);
  if (inParens) return inParens[1];
  const upper = input.match(/\b([A-Z]{3})\b/);
  if (upper) return upper[1];
  const lower = input.toLowerCase();
  for (const [city, code] of Object.entries(CITY_TO_IATA)) {
    if (lower.includes(city)) return code;
  }
  return null;
}

export function getBaseAirportBufferMinutes(
  flightType: FlightType,
  hasCheckedBag: boolean,
  arrivalMode: ArrivalMode
): number {
  let minutes = flightType === "domestic" ? 90 : 135;
  if (hasCheckedBag) minutes += 15;
  if (arrivalMode === "parking") minutes += 20;
  else if (arrivalMode === "transit") minutes += 15;
  else if (arrivalMode === "rideshare" || arrivalMode === "dropoff") minutes += 5;
  return minutes;
}

export function securityLane(hasPreCheck: boolean, hasClear: boolean): SecurityLaneType {
  if (hasPreCheck && hasClear) return "precheck-clear";
  if (hasPreCheck) return "precheck";
  if (hasClear) return "clear";
  return "general";
}

function dayAdjustment(day: number): number {
  // Small, explicit heuristic. It is deliberately subordinate to current evidence.
  if (day === 1 || day === 5) return 2;
  if (day === 0) return 1;
  return 0;
}

export function planningPattern(date: Date, flightType: FlightType): number {
  const domestic = (DOMESTIC_PATTERN_BY_HOUR[date.getHours()] ?? 25) + dayAdjustment(date.getDay());
  return flightType === "international" ? Math.round(domestic * 1.8) : domestic;
}

function laneFactor(lane: SecurityLaneType): number {
  // These are explicitly inferred planning factors until licensed lane data exists.
  if (lane === "precheck-clear") return 0.55;
  if (lane === "precheck") return 0.65;
  if (lane === "clear") return 0.8;
  return 1;
}

export function inferLaneMinutes(minutes: number, lane: SecurityLaneType): number {
  return Math.max(5, Math.round(minutes * laneFactor(lane)));
}

export function evidenceWeight(hoursUntilArrival: number, freshness: Freshness): number {
  if (freshness === "stale" || hoursUntilArrival > 6) return 0;
  const timeWeight = hoursUntilArrival <= 1 ? 0.85 : hoursUntilArrival <= 3 ? 0.65 : 0.35;
  const freshnessWeight = freshness === "fresh" ? 1 : freshness === "aging" ? 0.75 : 0.6;
  return timeWeight * freshnessWeight;
}

function confidenceFor(evidence: ObservedSecurityWait | null, weight: number): Confidence {
  if (evidence?.confidence === "high" && weight >= 0.6) return "high";
  if (evidence && weight > 0) return "medium";
  return "low";
}

function rangeAround(minutes: number, flightType: FlightType): WaitRange {
  const spread = flightType === "international" ? 0.35 : 0.4;
  return {
    min: Math.max(5, Math.round(minutes * (1 - spread))),
    avg: minutes,
    max: Math.max(minutes, Math.round(minutes * (1 + spread))),
  };
}

function roundUpFive(minutes: number): number {
  return Math.ceil(minutes / 5) * 5;
}

export interface PredictionResult {
  arrivalAt: Date;
  predictedMinutes: number;
  range: WaitRange;
  confidence: Confidence;
  method: "current-adjusted-pattern" | "arrival-time-pattern" | "conservative-fallback";
  evidenceWeight: number;
  lane: SecurityLaneType;
  recommendation: number;
}

export function predictSecurity(
  request: SecurityRequest,
  evidence: ObservedSecurityWait | null,
  now: Date
): PredictionResult {
  const fallback = FALLBACK[request.flightType];
  const baseBuffer = getBaseAirportBufferMinutes(
    request.flightType,
    request.hasCheckedBag,
    request.arrivalMode
  );
  // First pass estimates the user's security-arrival time without requiring traffic.
  const initialArrival = new Date(request.departure.getTime() - (baseBuffer + fallback.avg) * 60_000);
  const arrivalPattern = planningPattern(initialArrival, request.flightType);
  const currentPattern = planningPattern(now, request.flightType);
  const hoursUntilArrival = (initialArrival.getTime() - now.getTime()) / 3_600_000;
  const weight = evidence ? evidenceWeight(hoursUntilArrival, evidence.freshness) : 0;

  let generalPrediction = arrivalPattern;
  let method: PredictionResult["method"] = "arrival-time-pattern";
  if (request.jurisdiction === "international" || !isFinite(hoursUntilArrival)) {
    generalPrediction = fallback.avg;
    method = "conservative-fallback";
  } else if (evidence && weight > 0) {
    // Carry the current airport deviation forward while allowing it to decay.
    const projectedFromCurrent = evidence.minutes + (arrivalPattern - currentPattern);
    generalPrediction = Math.round(weight * projectedFromCurrent + (1 - weight) * arrivalPattern);
    method = "current-adjusted-pattern";
  }

  const lane = securityLane(request.hasPreCheck, request.hasClear);
  const predictedMinutes = inferLaneMinutes(Math.max(5, generalPrediction), lane);
  const confidence = confidenceFor(evidence, weight);
  const safetyMargin = confidence === "high" ? 5 : confidence === "medium" ? 8 : 10;
  const laneFloor = lane === "general"
    ? request.flightType === "international" ? 35 : 20
    : lane === "clear" ? 15 : 10;
  const recommendation = Math.min(
    request.flightType === "international" ? 120 : 90,
    Math.max(laneFloor, roundUpFive(predictedMinutes + safetyMargin))
  );

  return {
    arrivalAt: initialArrival,
    predictedMinutes,
    range: rangeAround(predictedMinutes, request.flightType),
    confidence,
    method,
    evidenceWeight: weight,
    lane,
    recommendation,
  };
}
