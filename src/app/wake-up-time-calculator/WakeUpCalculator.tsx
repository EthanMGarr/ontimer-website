/// Wake-Up Time Calculator — interactive client component.
///
/// ## Purpose
/// Calculates what time to wake up in order to get ready, travel, and arrive on time.
///
/// ## Include
/// - Destination + origin with PlaceAutocomplete
/// - Arrival date/time pickers
/// - Travel mode selector
/// - Get-ready time, buffer, and extra morning time selectors
/// - Google Routes API integration via /api/travel-time
/// - Manual travel time fallback
///
/// ## Don't Include
/// - Page-level SEO, structured data (handled in page.tsx)

"use client";

import { useEffect, useState } from "react";
import CalendarOnTimerHandoff from "@/components/leave-time/CalendarOnTimerHandoff";
import PlaceAutocomplete from "@/components/PlaceAutocomplete";
import CurrentLocationControl from "@/components/CurrentLocationControl";
import { trackCalculatorCompleted, trackCalculatorStarted } from "@/lib/analytics";
import { buildGoogleCalendarLink } from "@/lib/calendar-links";

type TravelMode = "DRIVE" | "WALK" | "TRANSIT";
type PlanningMode = "today" | "future";
type TrafficBasis = "live" | "predicted" | "scheduled" | "none";

interface CalculatorResult {
  wakeUpTime: Date;
  arrivalTime: Date;
  travelMinutes: number;
  getReadyMinutes: number;
  bufferMinutes: number;
  extraMinutes: number;
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

function track(name: string, params?: Record<string, string | number>) {
  if (typeof window === "undefined") return;
  const g = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
  if (typeof g !== "function") return;
  g("event", name, { page_path: window.location.pathname, ...params });
}

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

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <p className="mb-2 text-sm font-semibold text-zinc-300">{children}</p>;
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
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
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
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
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

const inputClass =
  "min-w-0 w-full max-w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2.5 text-sm text-white placeholder-zinc-400 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500";

const timeInputClass = `${inputClass} block h-[42px] appearance-none box-border py-0 [color-scheme:dark]`;

function defaultArrival() {
  const d = new Date();
  d.setHours(9, 0, 0, 0);
  if (d < new Date()) d.setDate(d.getDate() + 1);
  return {
    date: d.toLocaleDateString("en-CA"),
    time: "09:00",
  };
}

export default function WakeUpCalculator() {
  const today = localDateString();
  const { date: defaultDate, time: defaultTime } = defaultArrival();

  const [destination, setDestination] = useState("");
  const [origin, setOrigin] = useState("");
  const [currentLocation, setCurrentLocation] = useState<string | null>(null);
  const [arrivalDate, setArrivalDate] = useState(defaultDate);
  const [planningMode, setPlanningMode] = useState<PlanningMode>(() => planningModeForDate(defaultDate));
  const [arrivalTime, setArrivalTime] = useState(defaultTime);
  const [travelMode, setTravelMode] = useState<TravelMode>("DRIVE");
  const [getReadyTime, setGetReadyTime] = useState(45);
  const [buffer, setBuffer] = useState(10);
  const [extraTime, setExtraTime] = useState(0);
  const [manualTravelMinutes, setManualTravelMinutes] = useState("");

  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState<CalculatorResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fallbackNotice, setFallbackNotice] = useState<string | null>(null);
  const [calendarOpened, setCalendarOpened] = useState(false);

  const hasRouteInputs =
    origin.trim().length >= 2 && destination.trim().length >= 2;

  useEffect(() => {
    setCalendarOpened(false);
  }, [destination, arrivalDate, arrivalTime, travelMode, getReadyTime, buffer, extraTime]);

  function handleOriginChange(value: string) {
    setOrigin(value);
    setCurrentLocation(null);
  }

  function handleCurrentLocationChange(coordinates: string | null) {
    setCurrentLocation(coordinates);
    if (coordinates) setOrigin("Current location");
    else if (origin === "Current location") setOrigin("");
  }

  function handlePlanningModeChange(mode: PlanningMode) {
    setPlanningMode(mode);
    if (mode === "today") setArrivalDate(localDateString());
  }

  function handleArrivalDateChange(date: string) {
    setArrivalDate(date);
    setPlanningMode(planningModeForDate(date));
  }

  async function handleCalculate() {
    trackCalculatorStarted("wake_up", { travel_mode: travelMode });
    setError(null);
    setFallbackNotice(null);

    if (!arrivalDate || !arrivalTime) {
      setError("Enter the date and time you need to arrive.");
      return;
    }

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
          setFallbackNotice("Automatic travel time is unavailable for this route. Enter travel time manually below, or try a fuller address.");
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
          "Enter your starting location and destination, or enter travel time manually below."
        );
        return;
      }
      travelMinutes = manual;
    }

    const totalOffset = travelMinutes + getReadyTime + buffer + extraTime;
    const wakeUpTime = new Date(arrival.getTime() - totalOffset * 60 * 1000);

    setResult({
      wakeUpTime,
      arrivalTime: arrival,
      travelMinutes,
      getReadyMinutes: getReadyTime,
      bufferMinutes: buffer,
      extraMinutes: extraTime,
      travelSource,
      hasTrafficData,
      trafficBasis,
      planningMode,
    });
    track("wakeup_calculator_used", {
      travel_mode: travelMode,
      travel_source: travelSource,
    });
    trackCalculatorCompleted("wake_up", {
      travel_mode: travelMode,
      travel_source: travelSource,
    });
  }

  const arrivalCalendarHref = result
    ? buildGoogleCalendarLink({
        title: `Arrive at ${destination.split(",")[0] || "destination"}`,
        start: result.arrivalTime,
        end: new Date(result.arrivalTime.getTime() + 30 * 60 * 1000),
        details: `Wake-up time calculated by OnTimer: ${fmtTime(result.wakeUpTime)}`,
        location: destination || undefined,
      })
    : "";

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 sm:p-8">
      <div className="grid gap-10 lg:grid-cols-2">
        {/* ── Inputs ── */}
        <div className="space-y-7">
          {/* Locations */}
          <div className="space-y-4">
            <div className="min-w-0">
              <FieldLabel>Destination</FieldLabel>
              <PlaceAutocomplete
                value={destination}
                onChange={setDestination}
                placeholder="Enter destination address or place"
                inputClassName={inputClass}
              />
            </div>
            <div className="min-w-0">
              <FieldLabel>Starting location</FieldLabel>
              <PlaceAutocomplete
                value={origin}
                onChange={handleOriginChange}
                placeholder="Enter your starting address"
                inputClassName={inputClass}
              />
              <CurrentLocationControl
                active={currentLocation !== null}
                onLocationChange={handleCurrentLocationChange}
              />
            </div>
          </div>

          {/* Planning mode + arrival time */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
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
              <FieldLabel>When do you need to arrive?</FieldLabel>
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
              onChange={setTravelMode}
            />
          </div>

          {/* Get-ready time */}
          <div>
            <FieldLabel>How long do you need to get ready?</FieldLabel>
            <PillSelector
              options={[15, 30, 45, 60, 75, 90]}
              value={getReadyTime}
              onChange={setGetReadyTime}
            />
          </div>

          {/* Buffer */}
          <div>
            <FieldLabel>Extra buffer</FieldLabel>
            <PillSelector
              options={[0, 5, 10, 15, 20, 30]}
              value={buffer}
              onChange={setBuffer}
            />
          </div>

          {/* Extra morning time */}
          <div>
            <FieldLabel>
              Extra time for breakfast, packing, or getting out the door{" "}
              <span className="font-normal text-zinc-400">(optional)</span>
            </FieldLabel>
            <PillSelector
              options={[0, 5, 10, 15, 20, 30]}
              value={extraTime}
              onChange={setExtraTime}
            />
          </div>

          {/* Manual travel time */}
          <div>
            {hasRouteInputs ? (
              <>
                <FieldLabel>Estimated travel time</FieldLabel>
                <p className="mb-2 text-xs text-zinc-400">
                  Estimated automatically from your locations. Override if needed.
                </p>
                <input
                  type="number"
                  min="0"
                  max="600"
                  placeholder="Or enter minutes manually (optional)"
                  value={manualTravelMinutes}
                  onChange={(e) => setManualTravelMinutes(e.target.value)}
                  className={inputClass}
                />
              </>
            ) : (
              <>
                <FieldLabel>Travel time (minutes)</FieldLabel>
                <input
                  type="number"
                  min="0"
                  max="600"
                  placeholder="e.g. 25"
                  value={manualTravelMinutes}
                  onChange={(e) => setManualTravelMinutes(e.target.value)}
                  className={inputClass}
                />
                <p className="mt-1.5 text-xs text-zinc-400">
                  Enter a starting location and destination above for an automatic estimate.
                </p>
              </>
            )}
          </div>

          {error && (
            <p className="rounded-lg border border-red-900/50 bg-red-950/30 px-4 py-3 text-sm text-red-400">
              {error}
            </p>
          )}
          {fallbackNotice && !error && (
            <p className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
              {fallbackNotice}
            </p>
          )}

          <button
            type="button"
            onClick={handleCalculate}
            disabled={isCalculating}
            className="w-full rounded-full bg-green-500 px-6 py-3 font-semibold text-black transition-colors hover:bg-green-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isCalculating ? "Estimating travel time…" : "Calculate wake-up time →"}
          </button>
        </div>

        {/* ── Results ── */}
        <div className="flex flex-col">
          {result ? (
            <div className="rounded-xl border border-zinc-700 bg-zinc-800 p-6">
              <div className="border-b border-zinc-700 pb-5">
                <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  Wake up at
                </p>
                <p className="text-5xl font-black text-green-500">
                  {fmtTime(result.wakeUpTime)}
                </p>
                <p className="mt-1 text-sm text-zinc-400">{fmtDate(result.wakeUpTime)}</p>
              </div>

              <div className="space-y-3 pt-4">
                <div className="flex items-baseline justify-between">
                  <p className="text-xs text-zinc-400">Arrive by</p>
                  <p className="text-sm font-semibold text-white">
                    {fmtTime(result.arrivalTime)}
                  </p>
                </div>
                <div className="flex items-baseline justify-between">
                  <p className="text-xs text-zinc-400">Travel time</p>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-white">
                      {result.travelMinutes} min
                    </p>
                    {result.travelSource === "google" && (
                      <p className="text-xs text-green-500">
                        {trafficLabel(result.trafficBasis, result.planningMode)}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-baseline justify-between">
                  <p className="text-xs text-zinc-400">Get ready</p>
                  <p className="text-sm font-semibold text-white">
                    {result.getReadyMinutes} min
                  </p>
                </div>
                {result.bufferMinutes > 0 && (
                  <div className="flex items-baseline justify-between">
                    <p className="text-xs text-zinc-400">Buffer</p>
                    <p className="text-sm font-semibold text-white">
                      {result.bufferMinutes} min
                    </p>
                  </div>
                )}
                {result.extraMinutes > 0 && (
                  <div className="flex items-baseline justify-between">
                    <p className="text-xs text-zinc-400">Breakfast / packing</p>
                    <p className="text-sm font-semibold text-white">
                      {result.extraMinutes} min
                    </p>
                  </div>
                )}
              </div>

              <p className="mt-4 border-t border-zinc-700 pt-4 text-xs leading-relaxed text-zinc-400">
                To arrive by {fmtTime(result.arrivalTime)} with {result.travelMinutes}{" "}
                min of travel and {result.getReadyMinutes} min to get ready
                {result.bufferMinutes > 0
                  ? `, a ${result.bufferMinutes}-min buffer`
                  : ""}
                {result.extraMinutes > 0
                  ? `, and ${result.extraMinutes} min of extra morning time`
                  : ""}
                , wake up at {fmtTime(result.wakeUpTime)}.
              </p>

              <CalendarOnTimerHandoff
                calendarHref={arrivalCalendarHref}
                calendarLabel="Add Arrival to Calendar"
                calendarOpened={calendarOpened}
                setCalendarOpened={setCalendarOpened}
                calculatorType="wake_up"
                readyHeading="Put the appointment behind this wake-up time on your calendar."
                readyBody="We’ll add your arrival time and destination—not pretend a calendar notification is a wake-up alarm."
                openedHeading="Arrival event opened"
                openedBody="Finish saving it in Google Calendar so your destination and arrival time are on your schedule."
                appBeforeHeading="Then let OnTimer protect the moment to leave."
                appBeforeBody="OnTimer uses the saved calendar event and its location to create an automatic alarm when it is time to head out."
                appAfterHeading="Make the departure moment harder to miss."
                appAfterBody="OnTimer turns the arrival event into a persistent alarm before it is time to leave. Your calculated wake-up time remains shown above."
                appLocation="wakeup_calculator_result"
              />
            </div>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-dashed border-zinc-700 p-10 text-center">
              <div className="mb-4 text-4xl">⏰</div>
              <p className="text-base font-semibold text-zinc-300">
                Your wake-up time will appear here
              </p>
              <p className="mt-1.5 text-sm text-zinc-400">
                Fill in your destination, arrival time, and routine, then click Calculate.
              </p>
              <ul className="mt-6 w-full max-w-xs space-y-2.5 text-left">
                {[
                  "Real travel time based on traffic",
                  "Accounts for your morning routine",
                  "Exact wake-up time so you are not rushed",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-xs text-zinc-400">
                    <span className="mt-0.5 flex-shrink-0 text-zinc-400">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
