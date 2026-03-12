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

import { useState } from "react";
import { AppStoreButton } from "@/components/CTAButton";
import PlaceAutocomplete from "@/components/PlaceAutocomplete";

type TravelMode = "DRIVE" | "WALK" | "TRANSIT";

interface CalculatorResult {
  wakeUpTime: Date;
  arrivalTime: Date;
  travelMinutes: number;
  getReadyMinutes: number;
  bufferMinutes: number;
  extraMinutes: number;
  travelSource: "google" | "manual";
  hasTrafficData: boolean;
}

interface TravelTimeResponse {
  durationMinutes: number;
  hasTrafficData: boolean;
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
  "w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500";

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
  const today = new Date().toISOString().split("T")[0];
  const { date: defaultDate, time: defaultTime } = defaultArrival();

  const [destination, setDestination] = useState("");
  const [origin, setOrigin] = useState("");
  const [arrivalDate, setArrivalDate] = useState(defaultDate);
  const [arrivalTime, setArrivalTime] = useState(defaultTime);
  const [travelMode, setTravelMode] = useState<TravelMode>("DRIVE");
  const [getReadyTime, setGetReadyTime] = useState(45);
  const [buffer, setBuffer] = useState(10);
  const [extraTime, setExtraTime] = useState(0);
  const [manualTravelMinutes, setManualTravelMinutes] = useState("");

  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState<CalculatorResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const hasRouteInputs =
    origin.trim().length >= 2 && destination.trim().length >= 2;

  async function handleCalculate() {
    setError(null);

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

    if (hasRouteInputs) {
      setIsCalculating(true);
      try {
        const res = await fetchTravelTime(origin, destination, arrival, travelMode);
        travelMinutes = res.durationMinutes;
        travelSource = "google";
        hasTrafficData = res.hasTrafficData;
        track(res.cacheHit ? "travel_time_cache_hit" : "routes_api_called", {
          duration_minutes: travelMinutes,
        });
      } catch {
        const manual = parseInt(manualTravelMinutes, 10);
        if (!isNaN(manual) && manual >= 0) {
          travelMinutes = manual;
          track("quota_fallback_used");
        } else {
          setError("Could not estimate travel time. Enter it manually below.");
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
    });
    track("wakeup_calculator_used", {
      travel_mode: travelMode,
      travel_source: travelSource,
    });
  }

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 sm:p-8">
      <div className="grid gap-10 lg:grid-cols-2">
        {/* ── Inputs ── */}
        <div className="space-y-7">
          {/* Locations */}
          <div className="space-y-4">
            <div>
              <FieldLabel>Destination</FieldLabel>
              <PlaceAutocomplete
                value={destination}
                onChange={setDestination}
                placeholder="Enter destination address or place"
                inputClassName={inputClass}
              />
            </div>
            <div>
              <FieldLabel>Starting location</FieldLabel>
              <PlaceAutocomplete
                value={origin}
                onChange={setOrigin}
                placeholder="Enter your starting address"
                inputClassName={inputClass}
              />
            </div>
          </div>

          {/* Arrival date + time */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <FieldLabel>Arrival date</FieldLabel>
              <input
                type="date"
                value={arrivalDate}
                min={today}
                onChange={(e) => setArrivalDate(e.target.value)}
                className={`${inputClass} [color-scheme:dark]`}
              />
            </div>
            <div>
              <FieldLabel>When do you need to arrive?</FieldLabel>
              <input
                type="time"
                value={arrivalTime}
                onChange={(e) => setArrivalTime(e.target.value)}
                className={`${inputClass} [color-scheme:dark]`}
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
              <span className="font-normal text-zinc-500">(optional)</span>
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
                <p className="mb-2 text-xs text-zinc-500">
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
                <p className="mt-1.5 text-xs text-zinc-500">
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
                <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  Wake up at
                </p>
                <p className="text-5xl font-black text-green-500">
                  {fmtTime(result.wakeUpTime)}
                </p>
                <p className="mt-1 text-sm text-zinc-400">{fmtDate(result.wakeUpTime)}</p>
              </div>

              <div className="space-y-3 pt-4">
                <div className="flex items-baseline justify-between">
                  <p className="text-xs text-zinc-500">Arrive by</p>
                  <p className="text-sm font-semibold text-white">
                    {fmtTime(result.arrivalTime)}
                  </p>
                </div>
                <div className="flex items-baseline justify-between">
                  <p className="text-xs text-zinc-500">Travel time</p>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-white">
                      {result.travelMinutes} min
                    </p>
                    {result.travelSource === "google" && (
                      <p className="text-xs text-green-500">
                        {result.hasTrafficData ? "live traffic" : "estimated"}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-baseline justify-between">
                  <p className="text-xs text-zinc-500">Get ready</p>
                  <p className="text-sm font-semibold text-white">
                    {result.getReadyMinutes} min
                  </p>
                </div>
                {result.bufferMinutes > 0 && (
                  <div className="flex items-baseline justify-between">
                    <p className="text-xs text-zinc-500">Buffer</p>
                    <p className="text-sm font-semibold text-white">
                      {result.bufferMinutes} min
                    </p>
                  </div>
                )}
                {result.extraMinutes > 0 && (
                  <div className="flex items-baseline justify-between">
                    <p className="text-xs text-zinc-500">Breakfast / packing</p>
                    <p className="text-sm font-semibold text-white">
                      {result.extraMinutes} min
                    </p>
                  </div>
                )}
              </div>

              <p className="mt-4 border-t border-zinc-700 pt-4 text-xs leading-relaxed text-zinc-500">
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

              <div className="mt-5 rounded-xl border border-green-900/40 bg-green-950/20 p-4">
                <p className="mb-1 text-sm font-semibold text-green-400">
                  Need more than one reminder to actually get moving?
                </p>
                <p className="mb-3 text-xs leading-relaxed text-zinc-400">
                  OnTimer helps you stay on schedule with stronger alerts before
                  important events.
                </p>
                <AppStoreButton size="sm" location="wakeup_calculator_result" />
              </div>
            </div>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-dashed border-zinc-700 p-10 text-center">
              <div className="mb-4 text-4xl">⏰</div>
              <p className="text-base font-semibold text-zinc-300">
                Your wake-up time will appear here
              </p>
              <p className="mt-1.5 text-sm text-zinc-500">
                Fill in your destination, arrival time, and routine, then click Calculate.
              </p>
              <ul className="mt-6 w-full max-w-xs space-y-2.5 text-left">
                {[
                  "Real travel time based on traffic",
                  "Accounts for your morning routine",
                  "Exact wake-up time so you are not rushed",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-xs text-zinc-600">
                    <span className="mt-0.5 flex-shrink-0 text-zinc-700">•</span>
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
