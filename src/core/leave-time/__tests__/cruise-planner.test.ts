import assert from "node:assert/strict";
import {
  leaveTimePlanner,
  type PlanningMode,
  type TrafficBasis,
  type TravelSource,
} from "../index";
import {
  CruisePlugin,
  createCruiseDestination,
  cruiseEventTypeFor,
  getCruiseBaggageDropMinutes,
  getCruiseBoardingCutoffMinutes,
  getCruiseCheckInMinutes,
  getCruisePriorityAdjustmentMinutes,
  getCruiseTerminalWalkMinutes,
  type CruiseEventKind,
  type CruisePlanningContext,
  type CruiseTransportationMode,
} from "../plugins/cruise-terminals";

interface Case {
  name: string;
  targetTime: Date;
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

function expectedBuffer(testCase: Case): number {
  const userBuffer = parseInt(testCase.userBufferMinutesInput ?? "", 10);
  return Math.max(
    0,
    getCruiseCheckInMinutes(testCase.eventKind) +
      getCruiseBaggageDropMinutes(testCase.hasCheckedLuggage) +
      getCruiseTerminalWalkMinutes(testCase.transportationMode) +
      getCruiseBoardingCutoffMinutes(testCase.eventKind) +
      getCruisePriorityAdjustmentMinutes(testCase.hasPriorityBoarding) +
      (!isNaN(userBuffer) && userBuffer >= 0 ? userBuffer : 15)
  );
}

function corePlan(testCase: Case) {
  const context: CruisePlanningContext = {
    eventKind: testCase.eventKind,
    transportationMode: testCase.transportationMode,
    hasCheckedLuggage: testCase.hasCheckedLuggage,
    hasPriorityBoarding: testCase.hasPriorityBoarding,
    travelMinutes: testCase.travelMinutes,
    manualTravelMinutesInput: testCase.manualTravelMinutesInput,
    travelSource: testCase.travelSource,
    hasTrafficData: testCase.hasTrafficData,
    trafficBasis: testCase.trafficBasis,
    planningMode: testCase.planningMode,
    useArrivalBufferOverride: testCase.useArrivalBufferOverride,
    customArrivalBufferMinutesInput: testCase.customArrivalBufferMinutesInput,
    userBufferMinutesInput: testCase.userBufferMinutesInput,
  };

  return leaveTimePlanner.plan(
    {
      destination: createCruiseDestination("PortMiami Cruise Terminals"),
      eventType: cruiseEventTypeFor(testCase.eventKind),
      targetTime: testCase.targetTime,
      context,
    },
    CruisePlugin
  );
}

const cases: Case[] = [
  {
    name: "domestic cruise with parking and luggage",
    targetTime: new Date(2026, 6, 2, 15, 30, 0),
    eventKind: "domestic",
    transportationMode: "parking",
    hasCheckedLuggage: true,
    hasPriorityBoarding: false,
    travelMinutes: 42,
    travelSource: "google",
    hasTrafficData: true,
    trafficBasis: "live",
    planningMode: "today",
    useArrivalBufferOverride: false,
  },
  {
    name: "international cruise with shuttle and priority boarding",
    targetTime: new Date(2026, 6, 3, 13, 0, 0),
    eventKind: "international",
    transportationMode: "hotel-shuttle",
    hasCheckedLuggage: true,
    hasPriorityBoarding: true,
    travelMinutes: null,
    manualTravelMinutesInput: "30",
    travelSource: null,
    hasTrafficData: false,
    trafficBasis: "none",
    planningMode: "future",
    useArrivalBufferOverride: false,
    userBufferMinutesInput: "25",
  },
  {
    name: "manual arrival buffer override",
    targetTime: new Date(2026, 6, 4, 12, 0, 0),
    eventKind: "domestic",
    transportationMode: "rideshare",
    hasCheckedLuggage: false,
    hasPriorityBoarding: false,
    travelMinutes: 18,
    travelSource: "google",
    hasTrafficData: false,
    trafficBasis: "predicted",
    planningMode: "future",
    useArrivalBufferOverride: true,
    customArrivalBufferMinutesInput: "90",
  },
];

for (const testCase of cases) {
  const result = corePlan(testCase);
  assert.ok(result, `${testCase.name}: result should exist`);
  const manual = parseInt(testCase.manualTravelMinutesInput ?? "", 10);
  const travelMinutes = testCase.travelMinutes ?? manual;
  const buffer = testCase.useArrivalBufferOverride
    ? parseInt(testCase.customArrivalBufferMinutesInput ?? "", 10)
    : expectedBuffer(testCase);

  assert.equal(result.travelMinutes, travelMinutes, testCase.name);
  assert.equal(result.totalBufferMinutes, buffer, testCase.name);
  assert.equal(
    result.leaveAt.getTime(),
    testCase.targetTime.getTime() - (buffer + travelMinutes) * 60 * 1000,
    testCase.name
  );
  assert.equal(result.factors.find((factor) => factor.key === "travel")?.minutes, travelMinutes);
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
