export type FlightType = "domestic" | "international";
export type AirportJurisdiction = "us" | "international";
export type ArrivalMode = "parking" | "rideshare" | "dropoff" | "transit";
export type SecurityLaneType = "general" | "precheck" | "clear" | "precheck-clear";
export type EvidenceKind = "observed" | "provider-estimate" | "inferred" | "historical" | "fallback";
export type Freshness = "fresh" | "aging" | "stale" | "unknown";
export type Confidence = "high" | "medium" | "low";

export interface WaitRange {
  min: number;
  avg: number;
  max: number;
}

export interface WaitProviderMetadata {
  id: string;
  name: string;
  official: boolean;
}

export interface ObservedSecurityWait {
  minutes: number;
  airportCode: string;
  terminal: string | null;
  checkpoint: string | null;
  laneType: SecurityLaneType;
  valueKind: "observed" | "provider-estimate";
  provider: WaitProviderMetadata;
  observedAt: string | null;
  fetchedAt: string;
  freshness: Freshness;
  confidence: Confidence;
}

export interface PredictedSecurityWait {
  minutes: number;
  range: WaitRange;
  predictedFor: string;
  laneType: SecurityLaneType;
  valueKind: "predicted";
  confidence: Confidence;
  method: "current-adjusted-pattern" | "arrival-time-pattern" | "conservative-fallback";
  evidenceKind: EvidenceKind;
}

export interface RecommendedSecurityAllowance {
  minutes: number;
  valueKind: "recommended";
  policy: "conservative-rounded-v1";
  confidence: Confidence;
}

export interface AirportSecurityIntelligence {
  airportCode: string | null;
  expectedSecurityArrivalAt: string;
  observedWait: ObservedSecurityWait | null;
  predictedWaitAtArrival: PredictedSecurityWait;
  recommendedSecurityAllowance: RecommendedSecurityAllowance;
  sourcePath: string[];
  generatedAt: string;
  providerCacheHit: boolean;
}

export interface SecurityEstimate extends WaitRange {
  source: "live" | "historical" | "fallback" | "official-guidance";
  context: string;
  intelligence: AirportSecurityIntelligence;
}

export interface SecurityRequest {
  airportInput: string;
  departure: Date;
  flightType: FlightType;
  jurisdiction: AirportJurisdiction;
  hasPreCheck: boolean;
  hasClear: boolean;
  hasCheckedBag: boolean;
  arrivalMode: ArrivalMode;
}

export interface WaitProvider {
  readonly metadata: WaitProviderMetadata;
  fetchCurrentWait(airportCode: string): Promise<ObservedSecurityWait | null>;
}
