import type {
  PlanningMode,
  TrafficBasis,
  TravelSource,
} from "../../domain/types";

export type AirportFlightType = "domestic" | "international";

export type AirportArrivalMode = "parking" | "rideshare" | "dropoff";

export interface AirportPlanningContext {
  flightType: AirportFlightType;
  arrivalMode: AirportArrivalMode;
  hasCheckedBag: boolean;
  estimatedSecurityMinutes: number;
  travelMinutes: number | null;
  manualTravelMinutesInput?: string;
  travelSource: TravelSource | null;
  hasTrafficData: boolean;
  trafficBasis: TrafficBasis;
  planningMode: PlanningMode;
  useSecurityOverride: boolean;
  customSecurityMinutesInput?: string;
  useAirportBufferOverride: boolean;
  customAirportBufferMinutesInput?: string;
}
