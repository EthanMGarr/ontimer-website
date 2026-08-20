"use client";

import { useState, useEffect, useRef } from "react";
import { AppStoreButton } from "@/components/CTAButton";
import CalendarOnTimerHandoff from "@/components/leave-time/CalendarOnTimerHandoff";
import PlaceAutocomplete from "@/components/PlaceAutocomplete";
import {
  trackCalendarHandoffOpened,
  trackCalculatorCompleted,
  trackCalculatorStarted,
} from "@/lib/analytics";
import { buildGoogleCalendarLink, buildIcsCalendarDataUri } from "@/lib/calendar-links";

// ─── Types ────────────────────────────────────────────────────────────────────

type TravelMode = "DRIVE" | "WALK" | "TRANSIT";
type PlanningMode = "today" | "future";
type TrafficBasis = "live" | "predicted" | "scheduled" | "none";

interface CalculatorResult {
  leaveTime: Date;
  arrivalTime: Date;
  travelMinutes: number;
  bufferMinutes: number;
  prepMinutes: number;
  travelSource: "google" | "manual";
  hasTrafficData: boolean;
  trafficBasis: TrafficBasis;
  planningMode: PlanningMode;
}

interface TravelTimeResponse {
  durationMinutes: number;
  hasTrafficData: boolean;
  trafficBasis: TrafficBasis;
  cacheHit: boolean;
  error?: string;
}

// ─── API ──────────────────────────────────────────────────────────────────────

async function fetchTravelTime(
  origin: string,
  destination: string,
  departureAt: Date,
  travelMode: TravelMode
): Promise<TravelTimeResponse> {
  const params = new URLSearchParams({
    origin: origin.trim(),
    destination: destination.trim(),
    departureTime: Math.floor(departureAt.getTime() / 1000).toString(),
    travelMode,
  });
  const res = await fetch(`/api/travel-time?${params}`);
  const body: TravelTimeResponse = await res.json();
  if (!res.ok) throw new Error(body.error ?? `API error ${res.status}`);
  return body;
}

// ─── Analytics ────────────────────────────────────────────────────────────────

function track(name: string, params?: Record<string, string | number>) {
  if (typeof window === "undefined") return;
  const g = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
  if (typeof g !== "function") return;
  g("event", name, { page_path: window.location.pathname, ...params });
}

// ─── Formatting ───────────────────────────────────────────────────────────────

function fmtTime(d: Date) {
  return d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

function fmtDate(d: Date) {
  return d.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" });
}

function localDateString(date = new Date()): string {
  return date.toLocaleDateString("en-CA");
}

function planningModeForDate(date: string): PlanningMode {
  return date === localDateString() ? "today" : "future";
}

function trafficLabel(basis: TrafficBasis, mode: PlanningMode): string {
  if (basis === "scheduled") return "scheduled route";
  if (basis === "none") return "estimated";
  return mode === "future" || basis === "predicted" ? "expected traffic" : "live traffic";
}

// ─── UI Primitives ────────────────────────────────────────────────────────────

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <p className="mb-1.5 text-xs font-semibold text-zinc-400">{children}</p>;
}

function PillSelector({
  options,
  value,
  onChange,
}: {
  options: number[];
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          aria-label={opt === 0 ? "None" : `${opt} minutes`}
          className={`rounded-full px-3.5 py-1 text-sm font-medium transition-colors ${
            value === opt
              ? "bg-green-500 text-black"
              : "border border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-white"
          }`}
        >
          {opt === 0 ? "None" : `${opt} min`}
        </button>
      ))}
    </div>
  );
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

// ─── Skeleton placeholder ─────────────────────────────────────────────────────

function SkeletonResult() {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-800/40 p-4 sm:p-5">
      <p className="text-sm font-semibold text-white">What you will get</p>
      <p className="mt-1 text-xs leading-relaxed text-zinc-500">
        Add your destination and arrival time to calculate the latest reasonable time to leave.
      </p>
      <div className="mt-4 grid gap-2 text-xs text-zinc-300 sm:grid-cols-2">
        {["Leave-by time", "Travel time", "Personal buffer", "Calendar-ready result"].map((item) => (
          <div key={item} className="flex items-center gap-2">
            <span className="text-green-500">✓</span>
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Constants ────────────────────────────────────────────────────────────────

const TRAVEL_MODE_KEY = "leaveCalc_travelMode";

const inputClass =
  "min-w-0 w-full max-w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white placeholder-zinc-400 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500";

const timeInputClass = `${inputClass} block h-[38px] appearance-none box-border py-0 [color-scheme:dark]`;

function defaultArrival() {
  const today = localDateString();
  const upcoming = new Date(Date.now() + 2 * 60 * 60 * 1000);
  const mins = upcoming.getMinutes();
  const remainder = mins % 15;
  if (remainder !== 0) upcoming.setMinutes(mins + (15 - remainder), 0, 0);
  return {
    date: today,
    time: upcoming.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }),
  };
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function LeaveTimeCalculator() {
  const today = localDateString();
  const { date: defaultDate, time: defaultTime } = defaultArrival();

  // Form state
  const [destination, setDestination] = useState("");
  const [origin, setOrigin] = useState("");
  const [currentLocation, setCurrentLocation] = useState<string | null>(null);
  const [locationStatus, setLocationStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [locationMessage, setLocationMessage] = useState<string | null>(null);
  const [arrivalDate, setArrivalDate] = useState(defaultDate);
  const [planningMode, setPlanningMode] = useState<PlanningMode>(() => planningModeForDate(defaultDate));
  const [arrivalTime, setArrivalTime] = useState(defaultTime);
  const [travelMode, setTravelMode] = useState<TravelMode>("DRIVE");
  const [buffer, setBuffer] = useState(10);
  const [prepTime, setPrepTime] = useState(0);

  // Assumptions panel
  const [showAssumptions, setShowAssumptions] = useState(false);
  const [showManualTravel, setShowManualTravel] = useState(false);
  const [manualTravelMinutes, setManualTravelMinutes] = useState("");

  // Calculation state
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState<CalculatorResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fallbackNotice, setFallbackNotice] = useState<string | null>(null);
  const [calendarProvider, setCalendarProvider] = useState<"google" | "ics" | null>(null);

  // Mobile: form starts expanded; collapses after first result
  const [formExpanded, setFormExpanded] = useState(true);

  const assumptionsRef = useRef<HTMLDivElement>(null);

  // Derived
  const isFormValid = destination.trim().length >= 2 && arrivalTime.length > 0;
  const hasRouteInputs = origin.trim().length >= 2 && destination.trim().length >= 2;
  // Show route hint when one address is filled but the other is empty
  const showRouteHint = destination.trim().length >= 2 && origin.trim().length === 0;

  // Restore travel mode from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(TRAVEL_MODE_KEY) as TravelMode;
    if (["DRIVE", "WALK", "TRANSIT"].includes(saved)) setTravelMode(saved);
  }, []);

  // Clear stale result whenever any input that affects the calculation changes
  useEffect(() => {
    setResult(null);
    setError(null);
    setFallbackNotice(null);
    setCalendarProvider(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [destination, origin, arrivalDate, arrivalTime, travelMode, buffer, prepTime]);

  // Collapse form on mobile after result appears
  useEffect(() => {
    if (result && typeof window !== "undefined" && window.innerWidth < 1024) {
      setFormExpanded(false);
    }
  }, [result]);

  function handleTravelModeChange(mode: TravelMode) {
    setTravelMode(mode);
    localStorage.setItem(TRAVEL_MODE_KEY, mode);
  }

  function handleSwap() {
    const tmp = destination;
    setDestination(currentLocation ?? origin);
    setOrigin(tmp);
    setCurrentLocation(null);
    setLocationStatus("idle");
    setLocationMessage(null);
  }

  function handleOriginChange(value: string) {
    setOrigin(value);
    setCurrentLocation(null);
    setLocationStatus("idle");
    setLocationMessage(null);
  }

  function handleUseCurrentLocation() {
    if (!("geolocation" in navigator)) {
      setLocationStatus("error");
      setLocationMessage("Current location is not available in this browser. Enter an address instead.");
      return;
    }

    setLocationStatus("loading");
    setLocationMessage(null);
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setCurrentLocation(`${coords.latitude},${coords.longitude}`);
        setOrigin("Current location");
        setLocationStatus("success");
        setLocationMessage("Current location added.");
        track("current_location_used", { accuracy_meters: Math.round(coords.accuracy) });
      },
      () => {
        setCurrentLocation(null);
        if (origin === "Current location") setOrigin("");
        setLocationStatus("error");
        setLocationMessage("We couldn’t access your location. Allow location access or enter an address.");
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  }

  function handlePlanningModeChange(mode: PlanningMode) {
    setPlanningMode(mode);
    if (mode === "today") setArrivalDate(localDateString());
  }

  function handleArrivalDateChange(date: string) {
    setArrivalDate(date);
    setPlanningMode(planningModeForDate(date));
  }

  function handleCustomize() {
    setFormExpanded(true);
    setShowAssumptions(true);
    setTimeout(() => {
      assumptionsRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 50);
  }

  async function handleCalculate() {
    if (!isFormValid) return;
    trackCalculatorStarted("leave_time", { travel_mode: travelMode });
    setError(null);

    const [year, month, day] = arrivalDate.split("-").map(Number);
    const [hour, minute] = arrivalTime.split(":").map(Number);
    const arrival = new Date(year, month - 1, day, hour, minute, 0);

    let travelMinutes: number;
    let travelSource: "google" | "manual" = "manual";
    let hasTrafficData = false;
    let trafficBasis: TrafficBasis = "none";

    if (hasRouteInputs) {
      setIsCalculating(true);
      try {
        const res = await fetchTravelTime(currentLocation ?? origin, destination, arrival, travelMode);
        travelMinutes = res.durationMinutes;
        travelSource = "google";
        hasTrafficData = res.hasTrafficData;
        trafficBasis = res.trafficBasis;
        track(res.cacheHit ? "travel_time_cache_hit" : "routes_api_called", {
          duration_minutes: travelMinutes,
        });
      } catch {
        const manual = parseInt(manualTravelMinutes, 10);
        if (!isNaN(manual) && manual >= 0) {
          travelMinutes = manual;
          track("quota_fallback_used");
        } else {
          setFormExpanded(true);
          setShowAssumptions(true);
          setShowManualTravel(true);
          setFallbackNotice(
            "Automatic travel time is unavailable for this route. Enter travel time below, or try a fuller address."
          );
          setIsCalculating(false);
          return;
        }
      } finally {
        setIsCalculating(false);
      }
    } else {
      const manual = parseInt(manualTravelMinutes, 10);
      if (isNaN(manual) || manual < 0) {
        setError(
          "Add a starting location for automatic travel time, or enter minutes manually in timing assumptions."
        );
        return;
      }
      travelMinutes = manual;
    }

    const leaveTime = new Date(
      arrival.getTime() - (travelMinutes + buffer + prepTime) * 60 * 1000
    );

    setResult({
      leaveTime,
      arrivalTime: arrival,
      travelMinutes,
      bufferMinutes: buffer,
      prepMinutes: prepTime,
      travelSource,
      hasTrafficData,
      trafficBasis,
      planningMode,
    });
    track("leave_calculator_used", {
      travel_mode: travelMode,
      travel_source: travelSource,
    });
    trackCalculatorCompleted("leave_time", {
      travel_mode: travelMode,
      travel_source: travelSource,
    });
  }

  const travelModeLabel = { DRIVE: "drive", WALK: "walk", TRANSIT: "transit" }[travelMode];
  const leaveCalendarEvent = result
    ? {
        title: `Leave for ${destination.split(",")[0] || "destination"}`,
        start: result.leaveTime,
        details: "Calculated by OnTimer",
      }
    : null;
  const leaveCalendarHref = leaveCalendarEvent ? buildGoogleCalendarLink(leaveCalendarEvent) : "";
  const leaveCalendarIcsHref = leaveCalendarEvent ? buildIcsCalendarDataUri(leaveCalendarEvent) : "";
  return (
    <>
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 sm:p-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">

          {/* ══ Results ══════════════════════════════════════════════════════════ */}
          <div className={`${result ? "order-1" : "order-2"} min-w-0 lg:order-2 lg:sticky lg:top-6 lg:self-start`}>
            {result ? (
              <div className="rounded-xl border border-zinc-700 bg-zinc-800/80 p-5 transition-all duration-300">

                {/* Hero */}
                <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  Leave by
                </p>
                <p
                  className="mt-0.5 text-6xl font-black leading-none text-green-500"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  {fmtTime(result.leaveTime)}
                </p>
                <p className="mt-1.5 text-sm text-zinc-400">{fmtDate(result.leaveTime)}</p>

                <div className="mt-5 border-t border-zinc-800 pt-4">
                  <p className="text-sm text-zinc-300">
                    {result.travelMinutes} min {travelModeLabel}
                    {result.travelSource === "google" ? ` · ${trafficLabel(result.trafficBasis, result.planningMode)}` : ""}
                  </p>
                  <p className="mt-0.5 text-sm text-zinc-400">
                    {[result.bufferMinutes > 0 ? `${result.bufferMinutes} min buffer` : null, result.prepMinutes > 0 ? `${result.prepMinutes} min parking / walk-in` : null].filter(Boolean).join(" · ") || "No extra buffer selected"}
                  </p>
                </div>

                {/* Customize link */}
                <button
                  type="button"
                  onClick={handleCustomize}
                  className="mt-4 flex w-full items-center justify-between rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2.5 text-sm font-medium text-zinc-300 transition-colors hover:border-zinc-600 hover:text-white"
                >
                  <span className="flex items-center gap-2">
                    <span className="text-zinc-400">⚙</span>
                    <span>Adjust assumptions</span>
                  </span>
                  <span className="text-xs text-zinc-500">
                    Drive time, buffer, or walk-in different? Edit →
                  </span>
                </button>

                <CalendarOnTimerHandoff
                  calendarHref={leaveCalendarHref}
                  alternateCalendarHref={leaveCalendarIcsHref}
                  alternateCalendarFilename="leave-time.ics"
                  calendarProvider={calendarProvider}
                  setCalendarProvider={setCalendarProvider}
                  calculatorType="leave_time"
                  exclusivePrimaryAction
                  compactOpenedStatus
                  postCalendarHeading={`Don’t miss ${fmtTime(result.leaveTime)}.`}
                  postCalendarBody="OnTimer sets an automatic alarm for this calendar event."
                  appLocation="leave_calculator_result"
                />
              </div>
            ) : (
              <SkeletonResult />
            )}
          </div>

          {/* ══ Inputs ════════════════════════════════════════════════════════════ */}
          <div className={`${result ? "order-2" : "order-1"} min-w-0 flex flex-col gap-5 lg:order-1`}>

            {/* Mobile accordion toggle — hidden on desktop */}
            <button
              type="button"
              className="flex w-full items-center justify-between rounded-lg border border-zinc-800 bg-zinc-800/50 px-4 py-3 text-sm font-semibold text-zinc-300 transition-colors hover:bg-zinc-800 lg:hidden"
              onClick={() => setFormExpanded(!formExpanded)}
              aria-expanded={formExpanded}
              aria-controls="calculator-form"
            >
              <span>{result ? "Adjust inputs" : "Enter trip details"}</span>
              <span
                className={`text-xs text-zinc-500 transition-transform duration-200 ${
                  formExpanded ? "rotate-180" : ""
                }`}
              >
                ▾
              </span>
            </button>

            {/* Subtle shadow divider on mobile when form is collapsible */}
            <div className="h-px bg-zinc-800 shadow-[0_2px_8px_rgba(0,0,0,0.5)] lg:hidden" />

            <div
              id="calculator-form"
              className={`space-y-5 ${formExpanded ? "block" : "hidden lg:block"}`}
            >

              {/* Destination + swap + origin */}
              <div>
                <FieldLabel>Destination</FieldLabel>
                <PlaceAutocomplete
                  value={destination}
                  onChange={setDestination}
                  placeholder="Where are you going?"
                  inputClassName={inputClass}
                />

                <div className="flex items-center justify-center py-1.5">
                  <button
                    type="button"
                    onClick={handleSwap}
                    className="flex items-center gap-1.5 rounded-full border border-zinc-700 bg-zinc-800 px-3 py-1 text-xs font-medium text-zinc-400 transition-colors hover:border-zinc-600 hover:text-white"
                    aria-label="Swap origin and destination"
                  >
                    <SwapIcon />
                    Swap
                  </button>
                </div>

                <FieldLabel>
                  Starting location{" "}
                  <span className="font-normal text-zinc-500">(optional)</span>
                </FieldLabel>
                <PlaceAutocomplete
                  value={origin}
                  onChange={handleOriginChange}
                  placeholder="Your starting address"
                  inputClassName={inputClass}
                />

                <button
                  type="button"
                  onClick={handleUseCurrentLocation}
                  disabled={locationStatus === "loading"}
                  className="mt-2 inline-flex min-h-9 items-center gap-2 rounded-lg px-2 text-sm font-semibold text-green-400 transition-colors hover:bg-green-500/10 hover:text-green-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 disabled:cursor-wait disabled:text-zinc-500"
                >
                  <LocationIcon />
                  {locationStatus === "loading" ? "Finding your location…" : "Use my current location"}
                </button>

                {locationMessage && (
                  <p
                    className={`mt-1 text-xs ${
                      locationStatus === "error" ? "text-amber-400" : "text-zinc-500"
                    }`}
                    role={locationStatus === "error" ? "alert" : "status"}
                  >
                    {locationMessage}
                  </p>
                )}

                {showRouteHint && (
                  <p className="mt-1.5 text-xs text-amber-400/90">
                    Can&apos;t find a route. Enter minutes manually or add a missing address.
                  </p>
                )}
              </div>

              {/* Planning mode + arrival time */}
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="min-w-0">
                  <FieldLabel>Planning this trip</FieldLabel>
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
                        value={arrivalDate}
                        min={today}
                        onChange={(e) => handleArrivalDateChange(e.target.value)}
                        className={`${inputClass} [color-scheme:dark]`}
                      />
                    </div>
                  )}
                </div>
                <div className="min-w-0">
                  <FieldLabel>Arrival time</FieldLabel>
                  <input
                    type="time"
                    value={arrivalTime}
                    onChange={(e) => setArrivalTime(e.target.value)}
                    className={timeInputClass}
                  />
                </div>
              </div>

              {/* Travel mode */}
              <div>
                <FieldLabel>Travel mode</FieldLabel>
                <SegmentedControl
                  options={[
                    { value: "DRIVE", label: "Driving" },
                    { value: "WALK", label: "Walking" },
                    { value: "TRANSIT", label: "Transit" },
                  ]}
                  value={travelMode}
                  onChange={handleTravelModeChange}
                />
              </div>

              {!result && (
                <div className="lg:hidden">
                  <button
                    type="button"
                    onClick={handleCalculate}
                    disabled={!isFormValid || isCalculating}
                    className="w-full rounded-full bg-green-500 px-6 py-3 font-semibold text-black transition-colors hover:bg-green-400 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isCalculating ? "Estimating travel time..." : "Calculate leave time"}
                  </button>
                  {!isFormValid && (
                    <p className="mt-1.5 text-center text-xs text-zinc-500">
                      Add a destination and arrival time to enable.
                    </p>
                  )}
                </div>
              )}

              {/* Buffer */}
              <div>
                <FieldLabel>
                  Extra buffer <strong className="text-zinc-300">you</strong> like to have
                </FieldLabel>
                <PillSelector
                  options={[0, 5, 10, 15, 20, 30]}
                  value={buffer}
                  onChange={setBuffer}
                />
              </div>

              {/* Prep / walk-in time */}
              <div>
                <FieldLabel>
                  Parking / walk-in time{" "}
                  <span className="font-normal text-zinc-500">(optional)</span>
                </FieldLabel>
                <PillSelector
                  options={[0, 5, 10, 15, 20, 30]}
                  value={prepTime}
                  onChange={setPrepTime}
                />
              </div>

              {/* Timing assumptions — collapsed by default */}
              <div ref={assumptionsRef} id="timing-assumptions">
                <button
                  type="button"
                  onClick={() => setShowAssumptions(!showAssumptions)}
                  className="flex w-full items-center justify-between rounded-lg border border-zinc-700 bg-zinc-800/70 px-4 py-2.5 text-sm font-medium text-zinc-300 transition-colors hover:border-zinc-600 hover:text-white"
                  aria-expanded={showAssumptions}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-zinc-500">⚙</span>
                    <span>
                      {showAssumptions
                        ? "Hide adjustments"
                        : "Adjust assumptions"}
                    </span>
                  </span>
                  <span
                    className={`text-xs text-zinc-500 transition-transform duration-200 ${
                      showAssumptions ? "rotate-180" : ""
                    }`}
                  >
                    ▾
                  </span>
                </button>

                {showAssumptions && (
                  <div className="mt-3 rounded-lg border border-zinc-700/50 bg-zinc-800/40 p-4">
                    <FieldLabel>Travel time</FieldLabel>
                    {hasRouteInputs ? (
                      !showManualTravel ? (
                        <div>
                          <p className="mb-1.5 text-xs text-zinc-400">
                            Estimated automatically from your locations.
                          </p>
                          <button
                            type="button"
                            onClick={() => setShowManualTravel(true)}
                            className="text-xs text-zinc-400 underline underline-offset-2 hover:text-zinc-300"
                          >
                            ✏︎ Edit travel time manually
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              min="0"
                              max="600"
                              placeholder="e.g. 25"
                              value={manualTravelMinutes}
                              onChange={(e) => setManualTravelMinutes(e.target.value)}
                              className={`${inputClass} flex-1`}
                              aria-label="Travel time in minutes"
                            />
                            <span className="text-sm text-zinc-400">min</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setShowManualTravel(false);
                              setManualTravelMinutes("");
                            }}
                            className="text-xs text-zinc-400 underline underline-offset-2 hover:text-zinc-300"
                          >
                            Use automatic estimate instead
                          </button>
                        </div>
                      )
                    ) : (
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            min="0"
                            max="600"
                            placeholder="e.g. 25"
                            value={manualTravelMinutes}
                            onChange={(e) => setManualTravelMinutes(e.target.value)}
                            className={`${inputClass} flex-1`}
                            aria-label="Travel time in minutes"
                          />
                          <span className="text-sm text-zinc-400">min</span>
                        </div>
                        <p className="text-xs text-zinc-500">
                          Add a starting location above for an automatic estimate.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Error */}
              {error && (
                <div className="rounded-lg border border-red-900/50 bg-red-950/30 px-4 py-3">
                  <p className="text-sm text-red-400">{error}</p>
                </div>
              )}
              {fallbackNotice && !error && (
                <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3">
                  <p className="text-sm text-amber-200">{fallbackNotice}</p>
                </div>
              )}

              {/* CTA — sticky on desktop; swaps to App Store after result */}
              <div className="lg:sticky lg:bottom-4 bg-zinc-900 pb-1 pt-1">
                {result ? (
                  <button
                    type="button"
                    onClick={handleCalculate}
                    disabled={isCalculating}
                    className="w-full rounded-full border border-zinc-600 bg-zinc-800 px-6 py-3 font-semibold text-zinc-100 transition-colors hover:border-zinc-500 hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isCalculating ? "Updating leave time…" : "Update Leave Time"}
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={handleCalculate}
                      disabled={!isFormValid || isCalculating}
                      className="w-full rounded-full bg-green-500 px-6 py-3 font-semibold text-black transition-colors hover:bg-green-400 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {isCalculating ? "Estimating travel time…" : "Calculate leave time →"}
                    </button>
                    {!isFormValid && (
                      <p className="mt-1.5 text-center text-xs text-zinc-500">
                        Add a destination &amp; time to enable.
                      </p>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>

        </div>

        {/* Spacer so mobile sticky bar doesn't obscure bottom content */}
        {result && <div className="h-16 lg:hidden" />}
      </div>

      {/* ── Mobile sticky leave-time bar ── */}
      {result && (
        <div className="hidden fixed bottom-0 left-0 right-0 z-40 border-t border-zinc-800 bg-zinc-950/95 px-4 py-3 backdrop-blur-sm lg:hidden">
          <div className="mx-auto flex max-w-lg items-center justify-between gap-4">
            <div>
              <p className="text-[10px] font-medium text-zinc-500">Leave by</p>
              <p
                className="text-2xl font-black leading-tight text-green-500"
                aria-live="polite"
                aria-atomic="true"
              >
                {fmtTime(result.leaveTime)}
              </p>
            </div>
            {calendarProvider ? (
              <AppStoreButton
                size="sm"
                label="Get OnTimer Free"
                location="leave_calculator_mobile_sticky"
                placement="above"
                className="whitespace-nowrap"
              />
            ) : (
              <a
                href={leaveCalendarHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  trackCalendarHandoffOpened("leave_time", "google", { placement: "mobile_sticky" });
                  setCalendarProvider("google");
                }}
                className="flex min-h-11 flex-shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-green-500 px-4 py-2 text-sm font-bold text-black active:bg-green-600"
              >
                Add to Google Calendar
              </a>
            )}
          </div>
        </div>
      )}
    </>
  );
}

function SwapIcon() {
  return (
    <svg
      className="h-3.5 w-3.5"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 3L2 6l3 3M2 6h10M11 13l3-3-3-3M14 10H4" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3" />
      <path strokeLinecap="round" d="M12 2v3M12 19v3M2 12h3M19 12h3" />
      <circle cx="12" cy="12" r="8" />
    </svg>
  );
}
