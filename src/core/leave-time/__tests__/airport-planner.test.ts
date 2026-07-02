import assert from "node:assert/strict";
import {
  leaveTimePlanner,
  type PlanningMode,
  type TrafficBasis,
  type TravelSource,
} from "../index";
import {
  AirportPlugin,
  airportEventTypeFor,
  createAirportDestination,
  getAirportBaseBufferMinutes,
  getAirportDefaultSecurityMinutes,
  type AirportArrivalMode,
  type AirportFlightType,
  type AirportPlanningContext,
} from "../plugins/airports";

interface Case {
  name: string;
  targetTime: Date;
  flightType: AirportFlightType;
  arrivalMode: AirportArrivalMode;
  hasCheckedBag: boolean;
  estimatedSecurityMinutes?: number;
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

function legacyPlan(testCase: Case) {
  const estimatedSecurityMinutes =
    testCase.estimatedSecurityMinutes ?? getAirportDefaultSecurityMinutes(testCase.flightType);
  const baseBuffer = getAirportBaseBufferMinutes(
    testCase.flightType,
    testCase.hasCheckedBag,
    testCase.arrivalMode
  );
  const defaultBuffer = baseBuffer + estimatedSecurityMinutes;
  const securityMinutes = testCase.useSecurityOverride && testCase.customSecurityMinutesInput
    ? parseInt(testCase.customSecurityMinutesInput, 10)
    : estimatedSecurityMinutes;
  const baseBufferMinutes = testCase.useAirportBufferOverride && testCase.customAirportBufferMinutesInput
    ? Math.max(0, parseInt(testCase.customAirportBufferMinutesInput, 10) - securityMinutes)
    : baseBuffer;
  const totalBufferMinutes = baseBufferMinutes + securityMinutes;

  const resolvedManual = parseInt(testCase.manualTravelMinutesInput ?? "", 10);
  const travelMinutes =
    testCase.travelMinutes !== null
      ? testCase.travelMinutes
      : !isNaN(resolvedManual) && resolvedManual >= 0
        ? resolvedManual
        : null;

  if (travelMinutes === null || isNaN(totalBufferMinutes) || totalBufferMinutes < 0) {
    return null;
  }

  const arriveBy = new Date(testCase.targetTime.getTime() - totalBufferMinutes * 60 * 1000);
  const leaveAt = new Date(arriveBy.getTime() - travelMinutes * 60 * 1000);
  const confidence =
    totalBufferMinutes >= defaultBuffer
      ? "comfortable"
      : totalBufferMinutes >= defaultBuffer - 20
        ? "tight"
        : "risk";

  return {
    arriveBy,
    leaveAt,
    travelMinutes,
    totalBufferMinutes,
    securityMinutes,
    baseBufferMinutes,
    confidence,
  };
}

function corePlan(testCase: Case) {
  const context: AirportPlanningContext = {
    flightType: testCase.flightType,
    arrivalMode: testCase.arrivalMode,
    hasCheckedBag: testCase.hasCheckedBag,
    estimatedSecurityMinutes:
      testCase.estimatedSecurityMinutes ?? getAirportDefaultSecurityMinutes(testCase.flightType),
    travelMinutes: testCase.travelMinutes,
    manualTravelMinutesInput: testCase.manualTravelMinutesInput,
    travelSource: testCase.travelSource,
    hasTrafficData: testCase.hasTrafficData,
    trafficBasis: testCase.trafficBasis,
    planningMode: testCase.planningMode,
    useSecurityOverride: testCase.useSecurityOverride,
    customSecurityMinutesInput: testCase.customSecurityMinutesInput,
    useAirportBufferOverride: testCase.useAirportBufferOverride,
    customAirportBufferMinutesInput: testCase.customAirportBufferMinutesInput,
  };

  return leaveTimePlanner.plan(
    {
      destination: createAirportDestination("Newark Liberty International Airport"),
      eventType: airportEventTypeFor(testCase.flightType),
      targetTime: testCase.targetTime,
      context,
    },
    AirportPlugin
  );
}

const cases: Case[] = [
  {
    name: "domestic parking with live route",
    targetTime: new Date(2026, 6, 2, 11, 45, 0),
    flightType: "domestic",
    arrivalMode: "parking",
    hasCheckedBag: false,
    estimatedSecurityMinutes: 23,
    travelMinutes: 74,
    travelSource: "google",
    hasTrafficData: true,
    trafficBasis: "live",
    planningMode: "today",
    useSecurityOverride: false,
    useAirportBufferOverride: false,
  },
  {
    name: "international rideshare with bag and manual drive",
    targetTime: new Date(2026, 6, 3, 18, 0, 0),
    flightType: "international",
    arrivalMode: "rideshare",
    hasCheckedBag: true,
    estimatedSecurityMinutes: 48,
    travelMinutes: null,
    manualTravelMinutesInput: "65",
    travelSource: null,
    hasTrafficData: false,
    trafficBasis: "none",
    planningMode: "future",
    useSecurityOverride: false,
    useAirportBufferOverride: false,
  },
  {
    name: "custom total airport buffer and security override",
    targetTime: new Date(2026, 6, 4, 9, 30, 0),
    flightType: "domestic",
    arrivalMode: "dropoff",
    hasCheckedBag: true,
    estimatedSecurityMinutes: 25,
    travelMinutes: 40,
    travelSource: "google",
    hasTrafficData: false,
    trafficBasis: "predicted",
    planningMode: "future",
    useSecurityOverride: true,
    customSecurityMinutesInput: "10",
    useAirportBufferOverride: true,
    customAirportBufferMinutesInput: "100",
  },
];

for (const testCase of cases) {
  const legacy = legacyPlan(testCase);
  const result = corePlan(testCase);

  assert.ok(legacy, `${testCase.name}: legacy result should exist`);
  assert.ok(result, `${testCase.name}: core result should exist`);
  assert.equal(result.leaveAt.getTime(), legacy.leaveAt.getTime(), testCase.name);
  assert.equal(result.arriveBy.getTime(), legacy.arriveBy.getTime(), testCase.name);
  assert.equal(result.travelMinutes, legacy.travelMinutes, testCase.name);
  assert.equal(result.totalBufferMinutes, legacy.totalBufferMinutes, testCase.name);
  assert.equal(result.confidence, legacy.confidence, testCase.name);
  assert.equal(result.factors.find((factor) => factor.key === "travel")?.minutes, legacy.travelMinutes);
  assert.equal(result.factors.find((factor) => factor.key === "tsa_security")?.minutes, legacy.securityMinutes);
  assert.equal(result.factors.find((factor) => factor.key === "airport_buffer")?.minutes, legacy.baseBufferMinutes);
}

assert.equal(
  corePlan({
    ...cases[0],
    name: "missing travel minutes",
    travelMinutes: null,
    manualTravelMinutesInput: "",
  }),
  null
);
