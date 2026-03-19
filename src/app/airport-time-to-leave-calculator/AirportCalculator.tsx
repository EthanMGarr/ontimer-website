"use client";

import { useState, useEffect, useRef } from "react";
import { AppStoreButton } from "@/components/CTAButton";
import PlaceAutocomplete from "@/components/PlaceAutocomplete";
import type { SecurityEstimate } from "@/app/api/security-wait/route";

// ─── Types ────────────────────────────────────────────────────────────────────

type FlightType = "domestic" | "international";
type ArrivalMode = "parking" | "rideshare" | "dropoff";
type TravelSource = "google" | "manual";

interface CalculatorResult {
  arrivalTime: Date;
  leaveTime: Date;
  bufferMinutes: number;
  securityMinutes: number;
  travelMinutes: number;
  travelSource: TravelSource;
  hasTrafficData: boolean;
}

// ─── Buffer logic (non-security portion only) ─────────────────────────────────
// Security time is handled separately by the dynamic estimate.
// This covers: gate transit, boarding start window, bag drop, parking walk.

function baseAirportBuffer(
  flightType: FlightType,
  hasCheckedBag: boolean,
  arrivalMode: ArrivalMode
): number {
  let minutes = flightType === "domestic" ? 90 : 135;
  if (hasCheckedBag) minutes += 15;
  if (arrivalMode === "parking") minutes += 20;
  else if (arrivalMode === "rideshare" || arrivalMode === "dropoff") minutes += 5;
  return minutes;
}

// ─── Security estimate fetch ──────────────────────────────────────────────────
// Proxied through /api/security-wait so all blending logic stays server-side.

async function fetchSecurityEstimate(
  airport: string,
  departureUnix: number | null,
  flightType: FlightType,
  hasPreCheck: boolean,
  hasClear: boolean
): Promise<SecurityEstimate | null> {
  try {
    const params = new URLSearchParams({
      airport,
      flightType,
      hasPreCheck: hasPreCheck.toString(),
      hasClear: hasClear.toString(),
    });
    if (departureUnix !== null) params.set("departureTime", departureUnix.toString());

    const res = await fetch(`/api/security-wait?${params}`);
    if (!res.ok) return null;
    return await res.json() as SecurityEstimate;
  } catch {
    return null;
  }
}

// ─── Travel time fetch ────────────────────────────────────────────────────────
// Only called on explicit Calculate press — never reactively.
// Proxied through /api/travel-time so the Maps API key stays server-side only.

interface TravelTimeResponse {
  durationMinutes: number;
  hasTrafficData: boolean;
  cacheHit: boolean;
  error?: string;
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

/** "HH:MM" → "8:00 PM" */
function fmtDepartureTime(timeStr: string): string {
  const [h, m] = timeStr.split(":").map(Number);
  if (isNaN(h)) return "";
  const hour = h % 12 || 12;
  const ampm = h < 12 ? "AM" : "PM";
  return m === 0 ? `${hour} ${ampm}` : `${hour}:${m.toString().padStart(2, "0")} ${ampm}`;
}

/**
 * Produce a clean airport display string from raw user input.
 * "John F. Kennedy International Airport (JFK)" → "John F. Kennedy International Airport (JFK)"
 * "Newark Airport" → "Newark Airport"
 * "JFK" → "JFK"
 */
function buildAirportDisplay(input: string): string {
  const s = input.trim();
  if (!s) return "your airport";
  // If the string already contains "(XXX)", use as-is (PlaceAutocomplete often returns this)
  if (/\([A-Z]{3}\)/.test(s)) return s;
  // Bare 3-letter code
  if (/^[A-Za-z]{3}$/.test(s)) return s.toUpperCase();
  return s;
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

function defaultDeparture() {
  // 2 hours from now, rounded up to the nearest 15 minutes
  const d = new Date(Date.now() + 2 * 60 * 60 * 1000);
  const mins = d.getMinutes();
  const remainder = mins % 15;
  if (remainder !== 0) d.setMinutes(mins + (15 - remainder), 0, 0);
  const date = d.toLocaleDateString("en-CA"); // YYYY-MM-DD in local time
  const time = d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }); // HH:MM
  return { date, time };
}

export default function AirportCalculator() {
  const today = new Date().toISOString().split("T")[0];
  const { date: defaultDate, time: defaultTime } = defaultDeparture();

  const [departureDate, setDepartureDate] = useState(defaultDate);
  const [departureTime, setDepartureTime] = useState(defaultTime);
  const [flightType, setFlightType] = useState<FlightType>("domestic");
  const [origin, setOrigin] = useState("");
  const [airport, setAirport] = useState("");
  const [manualTravelMinutes, setManualTravelMinutes] = useState("");
  const [hasPreCheck, setHasPreCheck] = useState(false);
  const [hasClear, setHasClear] = useState(false);
  const [hasCheckedBag, setHasCheckedBag] = useState(false);
  const [arrivalMode, setArrivalMode] = useState<ArrivalMode>("parking");
  const [showBufferOverride, setShowBufferOverride] = useState(false);
  const [customBuffer, setCustomBuffer] = useState("");

  const [showManualDriveTime, setShowManualDriveTime] = useState(false);

  // Security estimate state
  const [securityEstimate, setSecurityEstimate] = useState<SecurityEstimate | null>(null);
  const [isFetchingSecurityEstimate, setIsFetchingSecurityEstimate] = useState(false);
  const [showSecurityOverride, setShowSecurityOverride] = useState(false);
  const [customSecurityMinutes, setCustomSecurityMinutes] = useState("");

  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState<CalculatorResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const securityDebounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // ── Auto-fetch security estimate when relevant inputs change ───────────────
  useEffect(() => {
    clearTimeout(securityDebounceRef.current);
    securityDebounceRef.current = setTimeout(async () => {
      // Build departure unix for time-of-day logic
      let departureUnix: number | null = null;
      if (departureDate && departureTime) {
        const [y, mo, d] = departureDate.split("-").map(Number);
        const [h, mi] = departureTime.split(":").map(Number);
        const dep = new Date(y, mo - 1, d, h, mi, 0);
        if (!isNaN(dep.getTime())) {
          departureUnix = Math.floor(dep.getTime() / 1000);
        }
      }

      setIsFetchingSecurityEstimate(true);
      const estimate = await fetchSecurityEstimate(
        airport,
        departureUnix,
        flightType,
        hasPreCheck,
        hasClear
      );
      setSecurityEstimate(estimate);
      setIsFetchingSecurityEstimate(false);
    }, 500);

    return () => clearTimeout(securityDebounceRef.current);
  }, [airport, departureDate, departureTime, flightType, hasPreCheck, hasClear]);

  // Derived values
  const baseBuffer = baseAirportBuffer(flightType, hasCheckedBag, arrivalMode);
  const estimatedSecurityMins = securityEstimate?.avg ?? (flightType === "domestic" ? 25 : 45);
  const defaultBuffer = baseBuffer + estimatedSecurityMins;
  const hasRouteInputs = origin.trim().length >= 2 && airport.trim().length >= 2;

  // Security description lines
  const airportDisplay = buildAirportDisplay(airport);
  const timeDisplay = fmtDepartureTime(departureTime);
  const securityPrimaryLine = securityEstimate?.source === "live"
    ? `Live TSA wait time at ${airportDisplay}`
    : `Based on TSA wait times for ${airportDisplay}${timeDisplay ? ` at ${timeDisplay}` : ""}`;

  async function handleCalculate() {
    setError(null);

    if (!departureDate || !departureTime) {
      setError("Enter your flight departure date and time.");
      return;
    }

    const [year, month, day] = departureDate.split("-").map(Number);
    const [hour, minute] = departureTime.split(":").map(Number);
    const departure = new Date(year, month - 1, day, hour, minute, 0);

    // Resolve security time
    const securityMins =
      showSecurityOverride && customSecurityMinutes
        ? parseInt(customSecurityMinutes, 10)
        : estimatedSecurityMins;

    // Resolve total buffer
    const bufferMins =
      showBufferOverride && customBuffer
        ? parseInt(customBuffer, 10)
        : baseBuffer + securityMins;

    if (isNaN(bufferMins) || bufferMins < 0) {
      setError("Enter a valid buffer in minutes.");
      return;
    }

    let travelMinutes: number;
    let travelSource: TravelSource = "manual";
    let hasTrafficData = false;

    if (hasRouteInputs) {
      setIsCalculating(true);
      try {
        const res = await fetchTravelTime(origin, airport, departure);
        travelMinutes = res.durationMinutes;
        travelSource = "google";
        hasTrafficData = res.hasTrafficData;

        if (res.cacheHit) {
          track("travel_time_cache_hit", { duration_minutes: travelMinutes });
        } else {
          track("routes_api_called", { duration_minutes: travelMinutes });
        }
      } catch {
        const manual = parseInt(manualTravelMinutes, 10);
        if (!isNaN(manual) && manual >= 0) {
          travelMinutes = manual;
          track("quota_fallback_used");
        } else {
          setError(
            "Could not estimate drive time from Google Maps. Enter it manually below."
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
          "Enter your starting location and airport, or enter your drive time in minutes below."
        );
        return;
      }
      travelMinutes = manual;
    }

    const arrivalTime = new Date(departure.getTime() - bufferMins * 60 * 1000);
    const leaveTime = new Date(arrivalTime.getTime() - travelMinutes * 60 * 1000);

    setResult({
      arrivalTime,
      leaveTime,
      bufferMinutes: bufferMins,
      securityMinutes: securityMins,
      travelMinutes,
      travelSource,
      hasTrafficData,
    });
    track("calculator_used", { flight_type: flightType, arrival_mode: arrivalMode, travel_source: travelSource });
    track("airport_calculator_result_shown", { buffer_minutes: bufferMins, travel_minutes: travelMinutes });
  }

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 sm:p-8">
      <div className="grid gap-10 lg:grid-cols-2">

        {/* ── Inputs ── */}
        <div className="space-y-7">

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

          {/* Route — used for Google Maps estimate on submit */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <FieldLabel>Starting location</FieldLabel>
              <PlaceAutocomplete
                value={origin}
                onChange={setOrigin}
                placeholder="Start typing an address or city"
                inputClassName={inputClass}
              />
            </div>
            <div>
              <FieldLabel>Airport</FieldLabel>
              <PlaceAutocomplete
                value={airport}
                onChange={setAirport}
                placeholder="e.g. JFK, LAX, Newark"
                inputClassName={inputClass}
                types="establishment"
              />
            </div>
          </div>

          {/* Drive time — progressive disclosure */}
          <div>
            <FieldLabel>Drive time</FieldLabel>
            {!showManualDriveTime ? (
              <div>
                <p className="text-sm text-zinc-500">
                  Estimated automatically from your starting location and airport.
                </p>
                <p className="mt-1 text-xs text-zinc-600">
                  Based on current routing and traffic patterns
                </p>
                <button
                  type="button"
                  onClick={() => setShowManualDriveTime(true)}
                  className="mt-2 text-xs text-zinc-500 underline underline-offset-2 transition-colors hover:text-zinc-300"
                >
                  Enter drive time manually
                </button>
              </div>
            ) : (
              <div>
                <input
                  type="number"
                  min="0"
                  max="300"
                  placeholder="e.g. 35"
                  value={manualTravelMinutes}
                  onChange={(e) => setManualTravelMinutes(e.target.value)}
                  className={inputClass}
                />
                <button
                  type="button"
                  onClick={() => { setShowManualDriveTime(false); setManualTravelMinutes(""); }}
                  className="mt-2 text-xs text-zinc-500 underline underline-offset-2 transition-colors hover:text-zinc-300"
                >
                  Use automatic estimate instead
                </button>
              </div>
            )}
          </div>

          {/* Security Time — dynamic estimate replacing static toggle */}
          <div>
            <div className="mb-2 flex items-center gap-2">
              <p className="text-sm font-semibold text-zinc-300">Security Time</p>
              <span
                className="cursor-help rounded-full border border-green-900/50 bg-green-950/30 px-2 py-0.5 text-xs text-green-500"
                title="Calculated using TSA wait times, airport data, and time-of-day patterns"
              >
                TSA-Based Estimate
              </span>
            </div>

            {/* Estimate display */}
            <div className="mb-3">
              {isFetchingSecurityEstimate ? (
                <p className="text-sm text-zinc-500">Estimating…</p>
              ) : (
                <>
                  <p className="text-2xl font-bold text-white">
                    {showSecurityOverride && customSecurityMinutes
                      ? `${customSecurityMinutes} min`
                      : `${estimatedSecurityMins} min`}
                  </p>
                  {securityEstimate && (
                    <>
                      <p className="mt-1.5 text-xs text-zinc-400">{securityPrimaryLine}</p>
                      <p className="mt-0.5 text-xs text-zinc-500">
                        Typical range: {securityEstimate.min}–{securityEstimate.max} min depending on TSA traffic
                      </p>
                      <p className="mt-0.5 text-xs text-zinc-600">
                        Security time changes throughout the day — this adjusts for your departure time
                      </p>
                    </>
                  )}
                </>
              )}
            </div>

            {/* Controls */}
            <div className="flex flex-wrap gap-2">
              <Toggle checked={hasPreCheck} onChange={setHasPreCheck} label="TSA PreCheck / Global Entry" />
              <Toggle checked={hasClear} onChange={setHasClear} label="CLEAR" />
            </div>

            {/* Manual override */}
            {!showSecurityOverride ? (
              <button
                type="button"
                onClick={() => setShowSecurityOverride(true)}
                className="mt-2 text-xs text-zinc-500 underline underline-offset-2 transition-colors hover:text-zinc-300"
              >
                Adjust manually
              </button>
            ) : (
              <div className="mt-3">
                <input
                  type="number"
                  min="0"
                  max="180"
                  placeholder={`Auto: ${estimatedSecurityMins} min`}
                  value={customSecurityMinutes}
                  onChange={(e) => setCustomSecurityMinutes(e.target.value)}
                  className={inputClass}
                />
                <button
                  type="button"
                  onClick={() => { setShowSecurityOverride(false); setCustomSecurityMinutes(""); }}
                  className="mt-2 text-xs text-zinc-500 underline underline-offset-2 transition-colors hover:text-zinc-300"
                >
                  Use estimated time instead
                </button>
              </div>
            )}
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
                : `Adjust airport arrival buffer (${defaultBuffer} min recommended)`}
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
                  How early to arrive at the airport before your flight.
                </p>
              </div>
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
            className="w-full rounded-full bg-green-500 px-6 py-3 font-semibold text-black transition-colors hover:bg-green-400 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isCalculating ? "Estimating drive time…" : "Calculate leave time →"}
          </button>
        </div>

        {/* ── Results ── */}
        <div className="flex flex-col">
          {result ? (
            <div className="rounded-xl border border-zinc-700 bg-zinc-800 p-6">
              {/* Leave by — dominant result */}
              <div className="border-b border-zinc-700 pb-5">
                <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-zinc-500">Leave by</p>
                <p className="text-5xl font-black text-green-500">{fmtTime(result.leaveTime)}</p>
                <p className="mt-1 text-sm text-zinc-400">{fmtDate(result.leaveTime)}</p>
              </div>

              {/* Secondary details */}
              <div className="space-y-3 pt-1">
                <div className="flex items-baseline justify-between">
                  <p className="text-xs text-zinc-500">Arrive at airport by</p>
                  <p className="text-sm font-semibold text-white">{fmtTime(result.arrivalTime)}</p>
                </div>
                <div className="flex items-baseline justify-between">
                  <p className="text-xs text-zinc-500">Drive time</p>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-white">{result.travelMinutes} min</p>
                    {result.travelSource === "google" && (
                      <p className="text-xs text-green-500">
                        {result.hasTrafficData ? "live traffic" : "estimated"}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-baseline justify-between">
                  <p className="text-xs text-zinc-500">Security wait (est.)</p>
                  <p className="text-sm font-semibold text-white">{result.securityMinutes} min</p>
                </div>
                <div className="flex items-baseline justify-between">
                  <p className="text-xs text-zinc-500">Airport buffer</p>
                  <p className="text-sm font-semibold text-white">{result.bufferMinutes} min</p>
                </div>
              </div>

              <div className="mt-5 rounded-xl border border-green-900/40 bg-green-950/20 p-4">
                <p className="mb-1 text-sm font-semibold text-green-400">
                  Want this automatically?
                </p>
                <p className="mb-3 text-xs leading-relaxed text-zinc-400">
                  OnTimer can remind you when it&apos;s time to leave — for flights, meetings, and more.
                </p>
                <AppStoreButton size="sm" location="airport_calculator" />
                <a
                  href="/features"
                  className="mt-3 block text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
                  onClick={() => track("airport_calculator_feature_click")}
                >
                  See how OnTimer automatically reminds you when it&apos;s time to leave →
                </a>
              </div>
            </div>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-dashed border-zinc-700 p-10 text-center">
              <div className="mb-4 text-4xl">✈️</div>
              <p className="text-base font-semibold text-zinc-300">
                Your leave time will appear here
              </p>
              <p className="mt-1.5 text-sm text-zinc-500">
                Fill in your flight details and click Calculate.
              </p>
              <ul className="mt-6 space-y-2.5 text-left w-full max-w-xs">
                {[
                  "Recommended airport arrival time",
                  "Estimated drive time based on traffic",
                  "Exact time to leave your home",
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
