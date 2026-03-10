"use client";

import { useState } from "react";
import { AppStoreButton } from "@/components/CTAButton";

// ─── Types ────────────────────────────────────────────────────────────────────

type FlightType = "domestic" | "international";
type ArrivalMode = "parking" | "rideshare" | "dropoff";
type TravelTimeSource = "api" | "manual";

interface CalculatorResult {
  arrivalTime: Date;
  leaveTime: Date;
  bufferMinutes: number;
  travelMinutes: number;
  travelTimeSource: TravelTimeSource;
  hasTrafficData: boolean;
}

// ─── Calculation Logic ────────────────────────────────────────────────────────

function recommendedBuffer(
  flightType: FlightType,
  hasPreCheck: boolean,
  hasCheckedBag: boolean,
  arrivalMode: ArrivalMode
): number {
  let minutes = flightType === "domestic" ? 120 : 180;
  if (hasPreCheck) minutes -= 15;
  if (hasCheckedBag) minutes += 15;
  if (arrivalMode === "parking") minutes += 20;
  else if (arrivalMode === "rideshare" || arrivalMode === "dropoff") minutes += 5;
  return minutes;
}

function parseManualTravelTime(value: string): number | null {
  const n = parseInt(value, 10);
  return isNaN(n) || n < 0 ? null : n;
}

// ─── Google Maps travel time fetch ───────────────────────────────────────────
// Calls the server-side /api/travel-time route so the API key stays secret.

async function fetchTravelTime(
  origin: string,
  destination: string,
  departureAt: Date
): Promise<{ durationMinutes: number; hasTrafficData: boolean }> {
  const params = new URLSearchParams({
    origin,
    destination,
    departureTime: Math.floor(departureAt.getTime() / 1000).toString(),
  });
  const res = await fetch(`/api/travel-time?${params}`);
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? `API error ${res.status}`);
  }
  return res.json();
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmtTime(d: Date) {
  return d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

function fmtDate(d: Date) {
  return d.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" });
}

function track(name: string, params?: Record<string, string | number>) {
  if (typeof window === "undefined") return;
  const g = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
  if (typeof g !== "function") return;
  g("event", name, { page_path: window.location.pathname, ...params });
}

// ─── Small UI primitives ──────────────────────────────────────────────────────

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <p className="mb-2 text-sm font-semibold text-zinc-300">{children}</p>;
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
      className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
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

const inputClass =
  "w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500";

// ─── Main component ───────────────────────────────────────────────────────────

export default function AirportCalculator() {
  const today = new Date().toISOString().split("T")[0];

  // Flight details
  const [departureDate, setDepartureDate] = useState(today);
  const [departureTime, setDepartureTime] = useState("09:00");
  const [flightType, setFlightType] = useState<FlightType>("domestic");

  // Origin + destination
  const [origin, setOrigin] = useState("");
  const [airport, setAirport] = useState("");

  // Travel time — set by API or manual entry
  const [travelTimeMinutes, setTravelTimeMinutes] = useState("");
  const [travelTimeSource, setTravelTimeSource] = useState<TravelTimeSource>("manual");
  const [hasTrafficData, setHasTrafficData] = useState(false);
  const [isFetchingTravel, setIsFetchingTravel] = useState(false);
  const [travelFetchError, setTravelFetchError] = useState<string | null>(null);

  // Travel options
  const [hasPreCheck, setHasPreCheck] = useState(false);
  const [hasCheckedBag, setHasCheckedBag] = useState(false);
  const [arrivalMode, setArrivalMode] = useState<ArrivalMode>("parking");

  // Buffer override
  const [showBufferOverride, setShowBufferOverride] = useState(false);
  const [customBuffer, setCustomBuffer] = useState("");

  // Output
  const [result, setResult] = useState<CalculatorResult | null>(null);
  const [calcError, setCalcError] = useState<string | null>(null);

  const defaultBuffer = recommendedBuffer(flightType, hasPreCheck, hasCheckedBag, arrivalMode);
  const canEstimateTravel = origin.trim().length >= 3 && airport.trim().length >= 2;

  async function handleEstimateTravel() {
    if (!canEstimateTravel) return;
    setTravelFetchError(null);
    setIsFetchingTravel(true);

    const [year, month, day] = departureDate.split("-").map(Number);
    const [hour, minute] = departureTime.split(":").map(Number);
    const departure = new Date(year, month - 1, day, hour, minute, 0);

    try {
      const { durationMinutes, hasTrafficData: traffic } = await fetchTravelTime(
        origin.trim(),
        airport.trim(),
        departure
      );
      setTravelTimeMinutes(durationMinutes.toString());
      setTravelTimeSource("api");
      setHasTrafficData(traffic);
      track("airport_calculator_travel_time_fetched", {
        duration_minutes: durationMinutes,
        has_traffic: traffic ? 1 : 0,
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Could not estimate drive time.";
      setTravelFetchError(msg);
      setTravelTimeSource("manual");
    } finally {
      setIsFetchingTravel(false);
    }
  }

  function handleCalculate() {
    setCalcError(null);

    if (!departureDate || !departureTime) {
      setCalcError("Enter your flight departure date and time.");
      return;
    }

    const travel = parseManualTravelTime(travelTimeMinutes);
    if (travel === null) {
      setCalcError("Enter your drive time in minutes, or use the estimate button above.");
      return;
    }

    const [year, month, day] = departureDate.split("-").map(Number);
    const [hour, minute] = departureTime.split(":").map(Number);
    const departure = new Date(year, month - 1, day, hour, minute, 0);

    const bufferMins =
      showBufferOverride && customBuffer ? parseInt(customBuffer, 10) : defaultBuffer;

    if (isNaN(bufferMins) || bufferMins < 0) {
      setCalcError("Enter a valid buffer in minutes.");
      return;
    }

    const arrivalTime = new Date(departure.getTime() - bufferMins * 60 * 1000);
    const leaveTime = new Date(arrivalTime.getTime() - travel * 60 * 1000);

    setResult({
      arrivalTime,
      leaveTime,
      bufferMinutes: bufferMins,
      travelMinutes: travel,
      travelTimeSource,
      hasTrafficData,
    });

    track("calculator_used", { flight_type: flightType, arrival_mode: arrivalMode });
    track("airport_calculator_result_shown", {
      buffer_minutes: bufferMins,
      travel_minutes: travel,
      travel_source: travelTimeSource,
    });
  }

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 sm:p-8">
      <div className="grid gap-10 lg:grid-cols-2">

        {/* ── Inputs column ── */}
        <div className="space-y-6">

          {/* Date + time */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <FieldLabel>Flight departure date</FieldLabel>
              <input
                type="date"
                value={departureDate}
                min={today}
                onChange={(e) => setDepartureDate(e.target.value)}
                className={`${inputClass} [color-scheme:dark]`}
              />
            </div>
            <div>
              <FieldLabel>Departure time</FieldLabel>
              <input
                type="time"
                value={departureTime}
                onChange={(e) => setDepartureTime(e.target.value)}
                className={`${inputClass} [color-scheme:dark]`}
              />
            </div>
          </div>

          {/* Flight type */}
          <div>
            <FieldLabel>Flight type</FieldLabel>
            <SegmentedControl
              options={[
                { value: "domestic", label: "Domestic" },
                { value: "international", label: "International" },
              ]}
              value={flightType}
              onChange={setFlightType}
            />
          </div>

          {/* Origin + destination */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <FieldLabel>Starting location</FieldLabel>
              <input
                type="text"
                placeholder="City or address"
                value={origin}
                onChange={(e) => {
                  setOrigin(e.target.value);
                  setTravelTimeSource("manual");
                }}
                className={inputClass}
              />
            </div>
            <div>
              <FieldLabel>Airport</FieldLabel>
              <input
                type="text"
                placeholder="e.g. JFK, LAX, Newark"
                value={airport}
                onChange={(e) => {
                  setAirport(e.target.value);
                  setTravelTimeSource("manual");
                }}
                className={inputClass}
              />
            </div>
          </div>

          {/* Travel time — API estimate or manual */}
          <div>
            <div className="mb-2 flex items-center justify-between gap-3">
              <FieldLabel>Drive time to airport (minutes)</FieldLabel>
              {canEstimateTravel && (
                <button
                  type="button"
                  onClick={handleEstimateTravel}
                  disabled={isFetchingTravel}
                  className="flex-shrink-0 rounded-full border border-green-700 px-3 py-1 text-xs font-semibold text-green-400 transition-colors hover:border-green-500 hover:text-green-300 disabled:opacity-50"
                >
                  {isFetchingTravel ? "Estimating…" : "Estimate with Google Maps"}
                </button>
              )}
            </div>
            <input
              type="number"
              min="0"
              max="300"
              placeholder="e.g. 35"
              value={travelTimeMinutes}
              onChange={(e) => {
                setTravelTimeMinutes(e.target.value);
                setTravelTimeSource("manual");
              }}
              className={inputClass}
            />
            {travelTimeSource === "api" && travelTimeMinutes && (
              <p className="mt-1.5 text-xs text-green-500">
                ✓ Estimated by Google Maps
                {hasTrafficData ? " (with live traffic)" : ""} — edit to override
              </p>
            )}
            {travelFetchError && (
              <p className="mt-1.5 text-xs text-red-400">
                {travelFetchError} — enter manually below.
              </p>
            )}
            {!canEstimateTravel && !travelTimeMinutes && (
              <p className="mt-1.5 text-xs text-zinc-500">
                Enter your starting location and airport above to get a Google Maps estimate.
              </p>
            )}
          </div>

          {/* Security */}
          <div>
            <FieldLabel>Security</FieldLabel>
            <Toggle
              checked={hasPreCheck}
              onChange={setHasPreCheck}
              label="TSA PreCheck / Global Entry"
            />
          </div>

          {/* Bags */}
          <div>
            <FieldLabel>Bags</FieldLabel>
            <Toggle
              checked={hasCheckedBag}
              onChange={setHasCheckedBag}
              label="Checking a bag"
            />
          </div>

          {/* Arrival mode */}
          <div>
            <FieldLabel>Getting to the airport by</FieldLabel>
            <SegmentedControl
              options={[
                { value: "parking", label: "Parking" },
                { value: "rideshare", label: "Rideshare" },
                { value: "dropoff", label: "Drop-off" },
              ]}
              value={arrivalMode}
              onChange={setArrivalMode}
            />
          </div>

          {/* Buffer override */}
          <div>
            <button
              type="button"
              onClick={() => setShowBufferOverride(!showBufferOverride)}
              className="text-xs text-zinc-500 underline underline-offset-2 transition-colors hover:text-zinc-300"
            >
              {showBufferOverride
                ? "Use recommended buffer"
                : `Override arrival buffer (recommended: ${defaultBuffer} min)`}
            </button>
            {showBufferOverride && (
              <div className="mt-3">
                <input
                  type="number"
                  min="0"
                  max="480"
                  placeholder={`Recommended: ${defaultBuffer} min`}
                  value={customBuffer}
                  onChange={(e) => setCustomBuffer(e.target.value)}
                  className={inputClass}
                />
                <p className="mt-1.5 text-xs text-zinc-500">
                  Minutes before departure to arrive at the airport.
                </p>
              </div>
            )}
          </div>

          {calcError && (
            <p className="rounded-lg border border-red-900/50 bg-red-950/30 px-4 py-3 text-sm text-red-400">
              {calcError}
            </p>
          )}

          <button
            type="button"
            onClick={handleCalculate}
            className="w-full rounded-full bg-green-500 px-6 py-3 font-semibold text-black transition-colors hover:bg-green-400"
          >
            Calculate leave time →
          </button>
        </div>

        {/* ── Results column ── */}
        <div className="flex flex-col">
          {result ? (
            <div className="rounded-xl border border-zinc-700 bg-zinc-800 p-6">
              <p className="mb-5 text-xs font-semibold uppercase tracking-wider text-green-500">
                Your results
              </p>

              <div className="space-y-5">
                <div className="border-b border-zinc-700 pb-5">
                  <p className="mb-1 text-xs text-zinc-500">Recommended airport arrival</p>
                  <p className="text-2xl font-black text-white">{fmtTime(result.arrivalTime)}</p>
                  <p className="text-sm text-zinc-400">{fmtDate(result.arrivalTime)}</p>
                </div>

                <div className="border-b border-zinc-700 pb-5">
                  <p className="mb-1 text-xs text-zinc-500">Estimated drive time</p>
                  <p className="text-2xl font-black text-white">{result.travelMinutes} min</p>
                  {result.travelTimeSource === "api" && (
                    <p className="mt-0.5 text-xs text-green-500">
                      {result.hasTrafficData
                        ? "Google Maps · with live traffic"
                        : "Google Maps · estimated"}
                    </p>
                  )}
                </div>

                <div>
                  <p className="mb-1 text-xs text-zinc-500">Leave by</p>
                  <p className="text-4xl font-black text-green-500">{fmtTime(result.leaveTime)}</p>
                  <p className="text-sm text-zinc-400">{fmtDate(result.leaveTime)}</p>
                </div>
              </div>

              <p className="mt-5 text-xs leading-relaxed text-zinc-500">
                Based on a {result.bufferMinutes}-minute airport arrival buffer plus{" "}
                {result.travelMinutes} minutes of drive time.
              </p>

              {/* Product bridge */}
              <div className="mt-6 rounded-xl border border-green-900/40 bg-green-950/20 p-4">
                <p className="mb-1 text-sm font-semibold text-green-400">
                  Want this automatically?
                </p>
                <p className="mb-3 text-xs leading-relaxed text-zinc-400">
                  OnTimer can remind you when it&apos;s time to leave for flights,
                  meetings, and appointments — without the manual math.
                </p>
                <AppStoreButton size="sm" location="airport_calculator" />
              </div>
            </div>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-dashed border-zinc-700 p-10 text-center">
              <div className="mb-3 text-5xl">✈️</div>
              <p className="text-sm font-semibold text-zinc-400">
                Fill in your details and click Calculate.
              </p>
              <p className="mt-2 text-xs text-zinc-600">
                Your suggested leave time will appear here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
