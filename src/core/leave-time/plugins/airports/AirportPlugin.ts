import type {
  CalculationFactor,
  Destination,
  EventType,
  LeaveTimePlugin,
  PlanningConfidence,
  PlanningRequest,
  PlanningResult,
  TimingRule,
} from "../../domain/types";
import type {
  AirportArrivalMode,
  AirportFlightType,
  AirportPlanningContext,
} from "./types";

export const airportEventTypes: EventType[] = [
  { id: "airport.domestic-flight", label: "Domestic flight", destinationType: "airport" },
  { id: "airport.international-flight", label: "International flight", destinationType: "airport" },
];

export function airportEventTypeFor(flightType: AirportFlightType): EventType {
  return flightType === "international" ? airportEventTypes[1] : airportEventTypes[0];
}

export function createAirportDestination(input: string, id = "airport"): Destination {
  return {
    id,
    type: "airport",
    name: input,
    canonicalName: input,
    aliases: input ? [input] : [],
  };
}

export function getAirportBaseBufferMinutes(
  flightType: AirportFlightType,
  hasCheckedBag: boolean,
  arrivalMode: AirportArrivalMode
): number {
  let minutes = flightType === "domestic" ? 90 : 135;
  if (hasCheckedBag) minutes += 15;
  if (arrivalMode === "parking") minutes += 20;
  else if (arrivalMode === "rideshare" || arrivalMode === "dropoff") minutes += 5;
  return minutes;
}

export function getAirportDefaultSecurityMinutes(flightType: AirportFlightType): number {
  return flightType === "domestic" ? 25 : 45;
}

export function getAirportRecommendedBufferMinutes(context: AirportPlanningContext): number {
  return getAirportBaseBufferMinutes(
    context.flightType,
    context.hasCheckedBag,
    context.arrivalMode
  ) + context.estimatedSecurityMinutes;
}

function computeConfidence(
  bufferUsed: number,
  recommendedBuffer: number
): PlanningConfidence {
  if (bufferUsed >= recommendedBuffer) return "comfortable";
  if (bufferUsed >= recommendedBuffer - 20) return "tight";
  return "risk";
}

function parseOptionalMinutes(input: string | undefined): number | null {
  if (!input) return null;
  const parsed = parseInt(input, 10);
  return isNaN(parsed) ? NaN : parsed;
}

function resolveTravelMinutes(context: AirportPlanningContext): number | null {
  if (context.travelMinutes !== null) return context.travelMinutes;
  const manual = parseOptionalMinutes(context.manualTravelMinutesInput);
  return manual !== null && !isNaN(manual) && manual >= 0 ? manual : null;
}

function resolveSecurityMinutes(context: AirportPlanningContext): number {
  if (!context.useSecurityOverride) return context.estimatedSecurityMinutes;
  const override = parseOptionalMinutes(context.customSecurityMinutesInput);
  return override === null ? context.estimatedSecurityMinutes : override;
}

function resolveAirportBufferMinutes(
  context: AirportPlanningContext,
  securityMinutes: number
): number {
  const baseBuffer = getAirportBaseBufferMinutes(
    context.flightType,
    context.hasCheckedBag,
    context.arrivalMode
  );

  if (!context.useAirportBufferOverride) return baseBuffer;
  const override = parseOptionalMinutes(context.customAirportBufferMinutesInput);
  return override === null ? baseBuffer : Math.max(0, override - securityMinutes);
}

const travelRule: TimingRule<AirportPlanningContext> = {
  key: "airport.travel",
  label: "Drive time",
  priority: 10,
  calculate(context) {
    const minutes = resolveTravelMinutes(context);
    if (minutes === null) return null;
    return {
      key: "travel",
      label: "Drive time",
      minutes,
      source: context.travelSource ?? "manual",
      ruleKey: "airport.travel",
      priority: 10,
      metadata: {
        hasTrafficData: context.hasTrafficData,
        trafficBasis: context.trafficBasis,
        planningMode: context.planningMode,
      },
    };
  },
};

const securityRule: TimingRule<AirportPlanningContext> = {
  key: "airport.tsa-security",
  label: "TSA Security",
  priority: 20,
  calculate(context) {
    return {
      key: "tsa_security",
      label: "TSA Security",
      minutes: resolveSecurityMinutes(context),
      source: context.useSecurityOverride ? "override" : "estimate",
      ruleKey: "airport.tsa-security",
      priority: 20,
    };
  },
};

const airportBufferRule: TimingRule<AirportPlanningContext> = {
  key: "airport.arrival-buffer",
  label: "Airport buffer",
  priority: 30,
  calculate(context) {
    const securityMinutes = resolveSecurityMinutes(context);
    return {
      key: "airport_buffer",
      label: "Airport buffer",
      minutes: resolveAirportBufferMinutes(context, securityMinutes),
      source: context.useAirportBufferOverride ? "override" : "rule",
      ruleKey: "airport.arrival-buffer",
      priority: 30,
    };
  },
};

export const airportTimingRules = [travelRule, securityRule, airportBufferRule];

function factorMinutes(factors: CalculationFactor[], key: string): number {
  return factors.find((factor) => factor.key === key)?.minutes ?? 0;
}

export const AirportPlugin: LeaveTimePlugin<AirportPlanningContext> = {
  id: "airport",
  supportedEventTypes: airportEventTypes,
  rules: airportTimingRules,
  plan(request: PlanningRequest<AirportPlanningContext>): PlanningResult | null {
    if (isNaN(request.targetTime.getTime())) return null;

    const factors = airportTimingRules
      .map((rule) => rule.calculate(request.context))
      .filter((factor): factor is CalculationFactor => factor !== null)
      .sort((a, b) => (a.priority ?? 0) - (b.priority ?? 0));

    const travelMinutes = factorMinutes(factors, "travel");
    if (travelMinutes < 0 || !factors.some((factor) => factor.key === "travel")) {
      return null;
    }

    const securityMinutes = factorMinutes(factors, "tsa_security");
    const airportBufferMinutes = factorMinutes(factors, "airport_buffer");
    const totalBufferMinutes = securityMinutes + airportBufferMinutes;

    if (isNaN(totalBufferMinutes) || totalBufferMinutes < 0) return null;

    const arriveBy = new Date(request.targetTime.getTime() - totalBufferMinutes * 60 * 1000);
    const leaveAt = new Date(arriveBy.getTime() - travelMinutes * 60 * 1000);
    const recommendedBuffer = getAirportRecommendedBufferMinutes(request.context);

    return {
      destination: request.destination,
      eventType: request.eventType,
      targetTime: request.targetTime,
      arriveBy,
      leaveAt,
      travelMinutes,
      totalBufferMinutes,
      factors,
      confidence: computeConfidence(totalBufferMinutes, recommendedBuffer),
      metadata: {
        travelSource: request.context.travelSource ?? "manual",
        hasTrafficData: request.context.hasTrafficData,
        trafficBasis: request.context.trafficBasis,
        planningMode: request.context.planningMode,
        securityMinutes,
        baseBufferMinutes: airportBufferMinutes,
      },
    };
  },
};
