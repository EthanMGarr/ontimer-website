"use client";

import { useMemo, useState } from "react";
import { AppStoreButton } from "@/components/CTAButton";
import CalculationFactorList from "@/components/leave-time/CalculationFactorList";
import PlanningEstimateNotice from "@/components/leave-time/PlanningEstimateNotice";
import PlaceAutocomplete from "@/components/PlaceAutocomplete";
import {
  leaveTimePlanner,
  type CalculationFactor,
  type PlanningMode,
  type TrafficBasis,
  type TravelSource,
} from "@/core/leave-time";
import {
  CruisePlugin,
  createCruiseDestination,
  cruiseEventTypeFor,
  type CruiseEventKind,
  type CruisePlanningContext,
  type CruiseTransportationMode,
} from "@/core/leave-time/plugins/cruise-terminals";
import type { CalculatorExample } from "@/lib/travel-locations";

interface TravelTimeResponse {
  durationMinutes: number;
  hasTrafficData: boolean;
  trafficBasis: TrafficBasis;
  cacheHit: boolean;
  error?: string;
}

interface CruiseCalculatorProps {
  initialTerminal?: string;
  locationCode?: string;
  example?: CalculatorExample;
}

interface CruiseResult {
  arriveBy: Date;
  leaveAt: Date;
  targetTime: Date;
  travelMinutes: number;
  totalBufferMinutes: number;
  factors: CalculationFactor[];
  confidence: "comfortable" | "tight" | "risk";
  travelSource: TravelSource;
  trafficBasis: TrafficBasis;
  planningMode: PlanningMode;
}

const inputClass =
  "min-h-12 w-full touch-manipulation rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-3 text-base text-white placeholder-zinc-500 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 sm:py-2 sm:text-sm";

const defaultExample: CalculatorExample = {
  eyebrow: "Example Time to Leave",
  summary: "1:00 PM cruise boarding · driving and parking",
  leaveTime: "Leave by 9:45 AM",
  breakdown: ["Personalize the calculator with your route and boarding details"],
};

function localDateString(date = new Date()): string {
  return date.toLocaleDateString("en-CA");
}

function defaultBoarding() {
  const d = new Date(Date.now() + 24 * 60 * 60 * 1000);
  d.setHours(13, 0, 0, 0);
  return {
    date: d.toLocaleDateString("en-CA"),
    time: d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }),
  };
}

function planningModeForDate(date: string): PlanningMode {
  return date === localDateString() ? "today" : "future";
}

function fmtTime(d: Date) {
  return d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

function fmtDate(d: Date) {
  return d.toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" });
}

function fmtDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m === 0 ? `${h} hr` : `${h} hr ${m} min`;
}

function confidenceLabel(confidence: CruiseResult["confidence"]) {
  if (confidence === "comfortable") return "You should have plenty of time";
  if (confidence === "tight") return "This timing may be tight";
  return "This timing may be risky";
}

function buildCalendarLink(leaveTime: Date, terminalInput: string): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  const fmt = (d: Date) =>
    `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`;
  const end = new Date(leaveTime.getTime() + 15 * 60 * 1000);
  const name = terminalInput ? `Leave for ${terminalInput.split(",")[0]}` : "Leave for cruise terminal";
  return (
    `https://calendar.google.com/calendar/r/eventedit` +
    `?text=${encodeURIComponent(name)}` +
    `&dates=${fmt(leaveTime)}/${fmt(end)}` +
    `&details=${encodeURIComponent("Calculated by OnTimer")}`
  );
}

async function fetchTravelTime(
  origin: string,
  destination: string,
  departureAt: Date
): Promise<TravelTimeResponse> {
  const params = new URLSearchParams({
    origin: origin.trim(),
    destination: destination.trim(),
    departureTime: Math.floor(departureAt.getTime() / 1000).toString(),
  });
  const res = await fetch(`/api/travel-time?${params}`);
  const body: TravelTimeResponse = await res.json();
  if (!res.ok) throw new Error(body.error ?? `API error ${res.status}`);
  return body;
}

function track(name: string, params?: Record<string, string | number>) {
  if (typeof window === "undefined") return;
  const g = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
  if (typeof g !== "function") return;
  g("event", name, { page_path: window.location.pathname, ...params });
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <p className="mb-1.5 text-xs font-semibold text-zinc-400">{children}</p>;
}

function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`rounded-full px-3.5 py-1 text-sm font-medium transition-colors ${
            value === opt.value
              ? "bg-green-500 text-black"
              : "border border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-white"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`rounded-full px-3.5 py-1 text-sm font-medium transition-colors ${
        checked
          ? "bg-green-500 text-black"
          : "border border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-white"
      }`}
    >
      {checked && <span className="mr-1">✓</span>}
      {label}
    </button>
  );
}

export default function CruiseCalculator({
  initialTerminal = "",
  locationCode,
  example = defaultExample,
}: CruiseCalculatorProps) {
  const today = localDateString();
  const { date: defaultDate, time: defaultTime } = defaultBoarding();

  const [boardingDate, setBoardingDate] = useState(defaultDate);
  const [planningMode, setPlanningMode] = useState<PlanningMode>(() => planningModeForDate(defaultDate));
  const [boardingTime, setBoardingTime] = useState(defaultTime);
  const [eventKind, setEventKind] = useState<CruiseEventKind>("domestic");
  const [origin, setOrigin] = useState("");
  const [terminal, setTerminal] = useState(initialTerminal);
  const [transportationMode, setTransportationMode] = useState<CruiseTransportationMode>("parking");
  const [hasCheckedLuggage, setHasCheckedLuggage] = useState(true);
  const [hasPriorityBoarding, setHasPriorityBoarding] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showManualTravelTime, setShowManualTravelTime] = useState(false);
  const [manualTravelMinutes, setManualTravelMinutes] = useState("");
  const [showArrivalBufferOverride, setShowArrivalBufferOverride] = useState(false);
  const [customArrivalBufferMinutes, setCustomArrivalBufferMinutes] = useState("");
  const [userBufferMinutes, setUserBufferMinutes] = useState("15");
  const [travelMins, setTravelMins] = useState<number | null>(null);
  const [travelSource, setTravelSource] = useState<TravelSource | null>(null);
  const [hasTrafficData, setHasTrafficData] = useState(false);
  const [trafficBasis, setTrafficBasis] = useState<TrafficBasis>("none");
  const [isFetchingTravel, setIsFetchingTravel] = useState(false);
  const [fallbackNotice, setFallbackNotice] = useState<string | null>(null);
  const [calendarAdded, setCalendarAdded] = useState(false);

  const hasRouteInputs = origin.trim().length >= 2 && terminal.trim().length >= 2;
  const manualDriveMinutes = parseInt(manualTravelMinutes, 10);
  const hasManualDriveTime = !isNaN(manualDriveMinutes) && manualDriveMinutes >= 0;

  function handlePlanningModeChange(mode: PlanningMode) {
    setPlanningMode(mode);
    if (mode === "today") setBoardingDate(localDateString());
  }

  function handleBoardingDateChange(date: string) {
    setBoardingDate(date);
    setPlanningMode(planningModeForDate(date));
  }

  const computedResult = useMemo((): CruiseResult | null => {
    if (!boardingDate || !boardingTime) return null;
    const [year, month, day] = boardingDate.split("-").map(Number);
    const [hour, minute] = boardingTime.split(":").map(Number);
    const boarding = new Date(year, month - 1, day, hour, minute, 0);
    if (isNaN(boarding.getTime())) return null;

    const context: CruisePlanningContext = {
      eventKind,
      transportationMode,
      hasCheckedLuggage,
      hasPriorityBoarding,
      travelMinutes: travelMins,
      manualTravelMinutesInput: manualTravelMinutes,
      travelSource,
      hasTrafficData,
      trafficBasis,
      planningMode,
      useArrivalBufferOverride: showArrivalBufferOverride,
      customArrivalBufferMinutesInput: customArrivalBufferMinutes,
      userBufferMinutesInput: userBufferMinutes,
    };

    const result = leaveTimePlanner.plan(
      {
        destination: createCruiseDestination(terminal),
        eventType: cruiseEventTypeFor(eventKind),
        targetTime: boarding,
        context,
      },
      CruisePlugin
    );

    if (!result) return null;

    return {
      arriveBy: result.arriveBy,
      leaveAt: result.leaveAt,
      targetTime: result.targetTime,
      travelMinutes: result.travelMinutes,
      totalBufferMinutes: result.totalBufferMinutes,
      factors: result.factors,
      confidence: result.confidence,
      travelSource: travelSource ?? "manual",
      trafficBasis,
      planningMode,
    };
  }, [
    boardingDate,
    boardingTime,
    eventKind,
    transportationMode,
    hasCheckedLuggage,
    hasPriorityBoarding,
    travelMins,
    manualTravelMinutes,
    travelSource,
    hasTrafficData,
    trafficBasis,
    planningMode,
    showArrivalBufferOverride,
    customArrivalBufferMinutes,
    userBufferMinutes,
    terminal,
  ]);

  async function handleCalculate() {
    setFallbackNotice(null);
    if (!boardingDate || !boardingTime) return;
    const [year, month, day] = boardingDate.split("-").map(Number);
    const [hour, minute] = boardingTime.split(":").map(Number);
    const boarding = new Date(year, month - 1, day, hour, minute, 0);

    if (hasRouteInputs) {
      setIsFetchingTravel(true);
      try {
        const res = await fetchTravelTime(origin, terminal, boarding);
        setTravelMins(res.durationMinutes);
        setTravelSource("google");
        setHasTrafficData(res.hasTrafficData);
        setTrafficBasis(res.trafficBasis);
      } catch {
        if (hasManualDriveTime) {
          setTravelMins(manualDriveMinutes);
          setTravelSource("manual");
          setHasTrafficData(false);
          setTrafficBasis("none");
        } else {
          setShowAdvanced(true);
          setShowManualTravelTime(true);
          setFallbackNotice("Live travel time did not load. Enter travel time below to calculate without live traffic.");
        }
      } finally {
        setIsFetchingTravel(false);
      }
    } else if (hasManualDriveTime) {
      setTravelMins(manualDriveMinutes);
      setTravelSource("manual");
      setHasTrafficData(false);
      setTrafficBasis("none");
    } else {
      setShowAdvanced(true);
      setShowManualTravelTime(true);
      setFallbackNotice("Enter your starting location for automatic travel time, or enter travel time manually below.");
      return;
    }

    track("cruise_calculator_used", {
      event_kind: eventKind,
      transportation_mode: transportationMode,
      ...(locationCode ? { location_code: locationCode } : {}),
    });
  }

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 sm:p-6">
      <div className={`grid gap-6 ${
        computedResult
          ? "lg:grid-cols-[minmax(0,1.25fr)_minmax(320px,0.75fr)] lg:items-start"
          : "lg:grid-cols-[1fr_1fr] lg:gap-8"
      }`}>
        <div className={`${computedResult ? "order-2 lg:order-2 lg:opacity-80" : "order-1"} space-y-4`}>
          <div className={`rounded-xl border p-4 ${
            computedResult ? "border-zinc-800/70 bg-zinc-950/25" : "border-zinc-800 bg-zinc-950/40"
          }`}>
            <p className="mb-4 text-sm font-bold text-white">
              {computedResult ? "Edit Cruise Details" : "Your Cruise"}
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <FieldLabel>Planning this cruise</FieldLabel>
                <SegmentedControl
                  options={[
                    { value: "today", label: "Today" },
                    { value: "future", label: "Future date" },
                  ]}
                  value={planningMode}
                  onChange={handlePlanningModeChange}
                />
                {planningMode === "future" && (
                  <div className="mt-3">
                    <input
                      type="date"
                      value={boardingDate}
                      min={today}
                      onChange={(e) => handleBoardingDateChange(e.target.value)}
                      className={`${inputClass} [color-scheme:dark]`}
                    />
                  </div>
                )}
              </div>
              <div>
                <FieldLabel>Boarding time</FieldLabel>
                <input
                  type="time"
                  value={boardingTime}
                  onChange={(e) => setBoardingTime(e.target.value)}
                  className={`${inputClass} [color-scheme:dark]`}
                />
              </div>
            </div>
            <div className="mt-4">
              <FieldLabel>Cruise type</FieldLabel>
              <SegmentedControl
                options={[
                  { value: "domestic", label: "Domestic" },
                  { value: "international", label: "International" },
                ]}
                value={eventKind}
                onChange={setEventKind}
              />
            </div>
          </div>

          <div className={`rounded-xl border p-4 ${
            computedResult ? "border-zinc-800/70 bg-zinc-950/25" : "border-zinc-800 bg-zinc-950/40"
          }`}>
            <p className="mb-4 text-sm font-bold text-white">Route</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <FieldLabel>Leaving from</FieldLabel>
                <PlaceAutocomplete
                  value={origin}
                  onChange={setOrigin}
                  placeholder="Your address, hotel, or city"
                  inputClassName={inputClass}
                />
              </div>
              <div>
                <FieldLabel>Cruise terminal</FieldLabel>
                <PlaceAutocomplete
                  value={terminal}
                  onChange={setTerminal}
                  placeholder="e.g. PortMiami"
                  inputClassName={inputClass}
                  types="establishment"
                />
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleCalculate}
            disabled={
              !boardingDate ||
              !boardingTime ||
              terminal.trim().length < 2 ||
              (!hasRouteInputs && !hasManualDriveTime) ||
              isFetchingTravel
            }
            className={`w-full rounded-full px-6 py-3 font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
              computedResult
                ? "border border-zinc-600 bg-zinc-800 text-zinc-100 hover:border-zinc-500 hover:bg-zinc-700"
                : "bg-green-500 text-black hover:bg-green-400"
            }`}
          >
            {isFetchingTravel
              ? "Calculating leave time..."
              : computedResult
                ? "Update Leave Time"
                : "Show My Leave Time"}
          </button>

          <div className={`rounded-xl border p-4 ${
            computedResult ? "border-zinc-800 bg-zinc-900/60" : "border-zinc-700 bg-zinc-800/70"
          }`}>
            <div className="flex items-center gap-2">
              <span className={`text-base leading-none ${computedResult ? "text-zinc-500" : "text-green-500"}`}>✓</span>
              <p className="text-sm font-semibold text-white">Cruise timing included</p>
            </div>
            <div className="mt-3 grid grid-cols-1 gap-x-4 gap-y-1.5 sm:grid-cols-2">
              {[
                planningMode === "future" ? "Expected traffic" : "Live traffic conditions",
                "Cruise check-in window",
                "Baggage drop",
                "Parking or terminal access",
              ].map((item) => (
                <div key={item} className="flex items-center gap-1.5">
                  <span className={`flex-shrink-0 text-xs ${computedResult ? "text-zinc-500" : "text-green-500"}`}>✓</span>
                  <span className="text-xs text-zinc-300">{item}</span>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="mt-4 flex w-full items-center justify-between gap-3 rounded-lg border border-zinc-600 bg-zinc-700/60 px-4 py-2.5 text-sm font-medium text-zinc-200 transition-colors hover:border-zinc-500 hover:bg-zinc-700 hover:text-white"
            >
              <span>{showAdvanced ? "Hide advanced options" : "Advanced Options"}</span>
              <span className={`flex-shrink-0 text-xs text-zinc-400 transition-transform duration-200 ${showAdvanced ? "rotate-180" : ""}`}>
                ▾
              </span>
            </button>
            {showAdvanced && (
              <div className="mt-4 space-y-5 border-t border-zinc-700 pt-4">
                <div>
                  <FieldLabel>Transportation</FieldLabel>
                  <SegmentedControl
                    options={[
                      { value: "parking", label: "Parking" },
                      { value: "hotel-shuttle", label: "Hotel shuttle" },
                      { value: "rideshare", label: "Rideshare" },
                      { value: "dropoff", label: "Drop-off" },
                    ]}
                    value={transportationMode}
                    onChange={setTransportationMode}
                  />
                </div>
                <div>
                  <FieldLabel>Boarding details</FieldLabel>
                  <div className="flex flex-wrap gap-2">
                    <Toggle checked={hasCheckedLuggage} onChange={setHasCheckedLuggage} label="Checking luggage" />
                    <Toggle checked={hasPriorityBoarding} onChange={setHasPriorityBoarding} label="Priority boarding" />
                  </div>
                </div>
                <div>
                  <FieldLabel>Extra buffer</FieldLabel>
                  <input
                    type="number"
                    min="0"
                    max="180"
                    value={userBufferMinutes}
                    onChange={(e) => setUserBufferMinutes(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <FieldLabel>Travel time</FieldLabel>
                  {!showManualTravelTime ? (
                    <div>
                      <p className="text-sm text-zinc-400">Estimated automatically from your locations.</p>
                      <button
                        type="button"
                        onClick={() => setShowManualTravelTime(true)}
                        className="mt-1.5 text-xs text-zinc-400 underline underline-offset-2 hover:text-zinc-300"
                      >
                        Enter travel time manually instead
                      </button>
                    </div>
                  ) : (
                    <input
                      type="number"
                      min="0"
                      max="2880"
                      placeholder="e.g. 35"
                      value={manualTravelMinutes}
                      onChange={(e) => setManualTravelMinutes(e.target.value)}
                      className={inputClass}
                    />
                  )}
                </div>
                <div>
                  <button
                    type="button"
                    onClick={() => setShowArrivalBufferOverride(!showArrivalBufferOverride)}
                    className="text-xs text-zinc-400 underline underline-offset-2 hover:text-zinc-300"
                  >
                    {showArrivalBufferOverride ? "Use recommended cruise buffer" : "Adjust arrival buffer manually"}
                  </button>
                  {showArrivalBufferOverride && (
                    <div className="mt-3">
                      <input
                        type="number"
                        min="0"
                        max="480"
                        placeholder="e.g. 150"
                        value={customArrivalBufferMinutes}
                        onChange={(e) => setCustomArrivalBufferMinutes(e.target.value)}
                        className={inputClass}
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {fallbackNotice && (
            <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3">
              <p className="text-sm text-amber-200">{fallbackNotice}</p>
            </div>
          )}
        </div>

        <div className={`${computedResult ? "order-1 lg:order-1" : "order-2"} scroll-mt-20 flex flex-col`}>
          {computedResult ? (
            <div className="rounded-xl border border-green-500/30 bg-zinc-900 p-5 shadow-[0_0_40px_rgba(34,197,94,0.08)] transition-all duration-300 sm:p-7">
              <p className="mb-2 text-xs text-zinc-500">
                For your {fmtTime(computedResult.targetTime)} {eventKind} cruise boarding
              </p>
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Leave by</p>
              <p className="mt-1 whitespace-nowrap text-6xl font-black leading-none text-green-500 sm:text-8xl">
                {fmtTime(computedResult.leaveAt)}
              </p>
              <p className="mt-2 text-base text-zinc-300">{fmtDate(computedResult.leaveAt)}</p>
              <p className="mt-1.5 text-xs text-green-500">{confidenceLabel(computedResult.confidence)}</p>

              <PlanningEstimateNotice finalSentence="verify your cruise line's boarding time and embarkation requirements before you leave." />

              <div className="mt-5 rounded-lg border border-zinc-700/60 bg-zinc-950/50 p-4">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <p className="text-sm font-semibold text-white">Why this recommendation?</p>
                  <p className="text-xs text-zinc-500">{fmtTime(computedResult.targetTime)} boarding</p>
                </div>
                <div className="mt-3">
                  <CalculationFactorList
                    factors={computedResult.factors}
                    formatDuration={fmtDuration}
                  />
                </div>
              </div>

              <p className="mt-3 text-xs text-zinc-500">
                {fmtDuration(computedResult.travelMinutes)} travel
                {" · "}
                {fmtDuration(computedResult.totalBufferMinutes)} cruise buffer
              </p>

              <div className="mt-5">
                {calendarAdded ? (
                  <div className="flex items-center gap-2 rounded-lg border border-green-900/50 bg-green-950/20 px-3 py-2.5">
                    <span className="text-green-500">✓</span>
                    <span className="text-sm font-semibold text-green-400">Added to calendar</span>
                  </div>
                ) : (
                  <a
                    href={buildCalendarLink(computedResult.leaveAt, terminal)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      track("cruise_calendar_link_clicked", locationCode ? { location_code: locationCode } : undefined);
                      setCalendarAdded(true);
                    }}
                    className="flex w-full items-center justify-center gap-2 rounded-lg border border-zinc-600 bg-zinc-700 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:border-zinc-500 hover:bg-zinc-600"
                  >
                    <span>📅</span>
                    <span>Add Leave Time to Calendar</span>
                  </a>
                )}
              </div>

              <div className="mt-5 border-t border-zinc-800 pt-5">
                <p className="text-base font-bold text-white">Never be late again.</p>
                <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">
                  OnTimer automatically reminds you when it&apos;s time to leave—for cruises, flights, meetings, appointments, and more.
                </p>
                <div className="mt-4">
                  <AppStoreButton
                    size="md"
                    label="Get Leave Time Alerts"
                    className="justify-center"
                    location={locationCode
                      ? `cruise_${locationCode.toLowerCase()}_result`
                      : "cruise_calculator_inline"}
                  />
                  <p className="mt-2 text-[11px] text-zinc-500">Download on the App Store</p>
                </div>
              </div>

              <div className="mt-5 border-t border-zinc-800 pt-4">
                <div>
                  <CalculationFactorList
                    factors={computedResult.factors}
                    formatDuration={fmtDuration}
                    variant="breakdown"
                  />
                  <div className="flex items-baseline justify-between border-t border-zinc-800 pt-3">
                    <p className="text-sm text-zinc-400">Arrive at cruise terminal by</p>
                    <p className="text-sm font-semibold text-white">{fmtTime(computedResult.arriveBy)}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-zinc-700/50 bg-zinc-800/50 p-5">
              <p className="text-sm font-semibold text-white">Your leave time includes</p>
              <div className="mt-4 space-y-2">
                {[
                  planningMode === "future" ? "Expected traffic for your trip time" : "Live traffic conditions",
                  "Cruise check-in and boarding cutoff",
                  "Baggage drop",
                  "Parking, shuttle, or terminal access",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <span className="flex-shrink-0 text-xs text-green-500">✓</span>
                    <span className="text-xs text-zinc-300">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-lg border border-zinc-700/40 bg-zinc-800/60 px-4 py-3">
                <p className="text-xs font-semibold text-zinc-300">{example.eyebrow}</p>
                <p className="mt-2 text-xs text-zinc-400">{example.summary}</p>
                <p className="mt-1 text-lg font-bold text-zinc-200">{example.leaveTime}</p>
                <ul className="mt-2 space-y-1">
                  {example.breakdown.map((item) => (
                    <li key={item} className="text-[11px] text-zinc-500">{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
