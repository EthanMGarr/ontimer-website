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
  CruiseEventKind,
  CruisePlanningContext,
  CruiseTransportationMode,
} from "./types";

export const cruiseEventTypes: EventType[] = [
  { id: "cruise.domestic", label: "Domestic cruise", destinationType: "cruise-terminal" },
  { id: "cruise.international", label: "International cruise", destinationType: "cruise-terminal" },
];

export function cruiseEventTypeFor(eventKind: CruiseEventKind): EventType {
  return eventKind === "international" ? cruiseEventTypes[1] : cruiseEventTypes[0];
}

export function createCruiseDestination(input: string, id = "cruise-terminal"): Destination {
  return {
    id,
    type: "cruise-terminal",
    name: input,
    canonicalName: input,
    aliases: input ? [input] : [],
  };
}

export function getCruiseCheckInMinutes(eventKind: CruiseEventKind): number {
  return eventKind === "international" ? 150 : 120;
}

export function getCruiseBaggageDropMinutes(hasCheckedLuggage: boolean): number {
  return hasCheckedLuggage ? 20 : 0;
}

export function getCruiseTerminalWalkMinutes(mode: CruiseTransportationMode): number {
  if (mode === "parking") return 20;
  if (mode === "hotel-shuttle") return 15;
  if (mode === "rideshare" || mode === "dropoff") return 10;
  return 15;
}

export function getCruiseBoardingCutoffMinutes(eventKind: CruiseEventKind): number {
  return eventKind === "international" ? 30 : 15;
}

export function getCruisePriorityAdjustmentMinutes(hasPriorityBoarding: boolean): number {
  return hasPriorityBoarding ? -10 : 0;
}

function parseOptionalMinutes(input: string | undefined): number | null {
  if (!input) return null;
  const parsed = parseInt(input, 10);
  return isNaN(parsed) ? NaN : parsed;
}

function resolveTravelMinutes(context: CruisePlanningContext): number | null {
  if (context.travelMinutes !== null) return context.travelMinutes;
  const manual = parseOptionalMinutes(context.manualTravelMinutesInput);
  return manual !== null && !isNaN(manual) && manual >= 0 ? manual : null;
}

function resolveUserBufferMinutes(context: CruisePlanningContext): number {
  const parsed = parseOptionalMinutes(context.userBufferMinutesInput);
  return parsed !== null && !isNaN(parsed) && parsed >= 0 ? parsed : 15;
}

function getRecommendedCruiseBufferMinutes(context: CruisePlanningContext): number {
  return Math.max(
    0,
    getCruiseCheckInMinutes(context.eventKind) +
      getCruiseBaggageDropMinutes(context.hasCheckedLuggage) +
      getCruiseTerminalWalkMinutes(context.transportationMode) +
      getCruiseBoardingCutoffMinutes(context.eventKind) +
      getCruisePriorityAdjustmentMinutes(context.hasPriorityBoarding) +
      resolveUserBufferMinutes(context)
  );
}

function resolveCruiseBufferMinutes(context: CruisePlanningContext): number {
  if (!context.useArrivalBufferOverride) return getRecommendedCruiseBufferMinutes(context);
  const override = parseOptionalMinutes(context.customArrivalBufferMinutesInput);
  return override === null ? getRecommendedCruiseBufferMinutes(context) : override;
}

function computeConfidence(
  bufferUsed: number,
  recommendedBuffer: number
): PlanningConfidence {
  if (bufferUsed >= recommendedBuffer) return "comfortable";
  if (bufferUsed >= recommendedBuffer - 20) return "tight";
  return "risk";
}

const travelRule: TimingRule<CruisePlanningContext> = {
  key: "cruise.travel",
  label: "Travel time",
  priority: 10,
  calculate(context) {
    const minutes = resolveTravelMinutes(context);
    if (minutes === null) return null;
    return {
      key: "travel",
      label: "Travel time",
      minutes,
      explanation: context.hasTrafficData
        ? "Estimated for your route and boarding window."
        : "Based on the travel time entered for this trip.",
      source: context.travelSource ?? "manual",
      sourceLabel: context.travelSource === "google"
        ? context.trafficBasis === "live"
          ? "live traffic"
          : context.trafficBasis === "predicted"
            ? "expected traffic"
            : "traffic estimate"
        : "manual",
      ruleKey: "cruise.travel",
      priority: 10,
      metadata: {
        hasTrafficData: context.hasTrafficData,
        trafficBasis: context.trafficBasis,
        planningMode: context.planningMode,
      },
    };
  },
};

const terminalWalkRule: TimingRule<CruisePlanningContext> = {
  key: "cruise.terminal-walk",
  label: "Terminal access",
  priority: 20,
  calculate(context) {
    return {
      key: "terminal_walk",
      label: context.transportationMode === "parking" ? "Parking & terminal walk" : "Terminal access",
      minutes: getCruiseTerminalWalkMinutes(context.transportationMode),
      explanation: context.transportationMode === "parking"
        ? "Time for parking, unloading and reaching the terminal."
        : "Time for curb, shuttle or drop-off movement before check-in.",
      source: "rule",
      sourceLabel: "terminal access",
      ruleKey: "cruise.terminal-walk",
      priority: 20,
    };
  },
};

const baggageRule: TimingRule<CruisePlanningContext> = {
  key: "cruise.baggage-drop",
  label: "Baggage drop",
  priority: 30,
  calculate(context) {
    const minutes = getCruiseBaggageDropMinutes(context.hasCheckedLuggage);
    if (minutes === 0) return null;
    return {
      key: "baggage_drop",
      label: "Baggage drop",
      minutes,
      explanation: "Time for porter or baggage handoff before check-in.",
      source: "rule",
      sourceLabel: "checked luggage",
      ruleKey: "cruise.baggage-drop",
      priority: 30,
    };
  },
};

const checkInRule: TimingRule<CruisePlanningContext> = {
  key: "cruise.check-in",
  label: "Cruise check-in",
  priority: 40,
  calculate(context) {
    const priorityAdjustment = getCruisePriorityAdjustmentMinutes(context.hasPriorityBoarding);
    return {
      key: "cruise_check_in",
      label: "Cruise check-in",
      minutes: Math.max(0, getCruiseCheckInMinutes(context.eventKind) + priorityAdjustment),
      explanation: context.hasPriorityBoarding
        ? "Adjusted for priority boarding."
        : "Planning baseline for documents, security and cruise check-in.",
      source: context.hasPriorityBoarding ? "priority-boarding" : "rule",
      sourceLabel: context.hasPriorityBoarding ? "priority boarding" : "boarding window",
      ruleKey: "cruise.check-in",
      priority: 40,
    };
  },
};

const boardingCutoffRule: TimingRule<CruisePlanningContext> = {
  key: "cruise.boarding-cutoff",
  label: "Boarding cutoff",
  priority: 50,
  calculate(context) {
    return {
      key: "boarding_cutoff",
      label: "Boarding cutoff",
      minutes: getCruiseBoardingCutoffMinutes(context.eventKind),
      explanation: "Buffer before boarding can close ahead of departure.",
      source: "rule",
      sourceLabel: "boarding cutoff",
      ruleKey: "cruise.boarding-cutoff",
      priority: 50,
    };
  },
};

const userBufferRule: TimingRule<CruisePlanningContext> = {
  key: "cruise.user-buffer",
  label: "Extra buffer",
  priority: 60,
  calculate(context) {
    return {
      key: "user_buffer",
      label: "Extra buffer",
      minutes: resolveUserBufferMinutes(context),
      explanation: "Extra margin for important trips and day-of uncertainty.",
      source: "rule",
      sourceLabel: "user buffer",
      ruleKey: "cruise.user-buffer",
      priority: 60,
    };
  },
};

export const cruiseTimingRules = [
  travelRule,
  terminalWalkRule,
  baggageRule,
  checkInRule,
  boardingCutoffRule,
  userBufferRule,
];

export const CruisePlugin: LeaveTimePlugin<CruisePlanningContext> = {
  id: "cruise-terminal",
  supportedEventTypes: cruiseEventTypes,
  rules: cruiseTimingRules,
  plan(request: PlanningRequest<CruisePlanningContext>): PlanningResult | null {
    if (isNaN(request.targetTime.getTime())) return null;

    const factors = cruiseTimingRules
      .map((rule) => rule.calculate(request.context))
      .filter((factor): factor is CalculationFactor => factor !== null)
      .sort((a, b) => (a.priority ?? 0) - (b.priority ?? 0));

    const travelFactor = factors.find((factor) => factor.key === "travel");
    if (!travelFactor || travelFactor.minutes < 0) return null;

    const recommendedBuffer = getRecommendedCruiseBufferMinutes(request.context);
    const totalBufferMinutes = resolveCruiseBufferMinutes(request.context);
    if (isNaN(totalBufferMinutes) || totalBufferMinutes < 0) return null;

    const resolvedFactors = request.context.useArrivalBufferOverride
      ? [
          travelFactor,
          {
            key: "arrival_buffer",
            label: "Arrival buffer",
            minutes: totalBufferMinutes,
            explanation: "Uses your manual total arrival buffer.",
            source: "override",
            sourceLabel: "manual",
            ruleKey: "cruise.arrival-buffer",
            priority: 20,
          } satisfies CalculationFactor,
        ]
      : factors;

    const arriveBy = new Date(request.targetTime.getTime() - totalBufferMinutes * 60 * 1000);
    const leaveAt = new Date(arriveBy.getTime() - travelFactor.minutes * 60 * 1000);

    return {
      destination: request.destination,
      eventType: request.eventType,
      targetTime: request.targetTime,
      arriveBy,
      leaveAt,
      travelMinutes: travelFactor.minutes,
      totalBufferMinutes,
      factors: resolvedFactors,
      confidence: computeConfidence(totalBufferMinutes, recommendedBuffer),
      metadata: {
        travelSource: request.context.travelSource ?? "manual",
        hasTrafficData: request.context.hasTrafficData,
        trafficBasis: request.context.trafficBasis,
        planningMode: request.context.planningMode,
        recommendedBuffer,
      },
    };
  },
};
