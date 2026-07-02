import type {
  PlanningMode,
  TrafficBasis,
  TravelSource,
} from "../../domain/types";

export type CruiseEventKind = "domestic" | "international";

export type CruiseTransportationMode = "parking" | "hotel-shuttle" | "rideshare" | "dropoff";

export interface CruisePlanningContext {
  eventKind: CruiseEventKind;
  transportationMode: CruiseTransportationMode;
  hasCheckedLuggage: boolean;
  hasPriorityBoarding: boolean;
  travelMinutes: number | null;
  manualTravelMinutesInput?: string;
  travelSource: TravelSource | null;
  hasTrafficData: boolean;
  trafficBasis: TrafficBasis;
  planningMode: PlanningMode;
  useArrivalBufferOverride: boolean;
  customArrivalBufferMinutesInput?: string;
  userBufferMinutesInput?: string;
}
