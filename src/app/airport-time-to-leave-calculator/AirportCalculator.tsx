"use client";

import { useState } from "react";
import { AppStoreButton } from "@/components/CTAButton";

// ─── Types ────────────────────────────────────────────────────────────────────

type FlightType = "domestic" | "international";
type ArrivalMode = "parking" | "rideshare" | "dropoff";

interface CalculatorResult {
  arrivalTime: Date;
  leaveTime: Date;
  bufferMinutes: number;
  travelMinutes: number;
}

// ─── Calculation Logic ────────────────────────────────────────────────────────
// Isolated for Phase 2 upgrade: swap getTravelTimeMinutes() with a Maps API call
// without touching any UI code.

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

// Phase 2 integration point: replace this stub with Google Maps / Mapbox API.
// Origin and destination are already captured in state and passed here.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function getTravelTimeMinutes(
  _origin: string,
  _destination: string,
  _departureAt: Date
): Promise<number | null> {
  return null; // Replaced with Maps API in Phase 2
}

function parseManualTravelTime(value: string): number | null {
  const n = parseInt(value, 10);
  return isNaN(n) || n < 0 ? null : n;
}

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
  return (
    <p className="mb-2 text-sm font-semibold text-zinc-300">{children}</p>
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

  // Origin + destination (captured for Phase 2 Maps API integration)
  const [origin, setOrigin] = useState("");
  const [airport, setAirport] = useState("");

  // Travel options
  const [travelTimeMinutes, setTravelTimeMinutes] = useState("");
  const [hasPreCheck, setHasPreCheck] = useState(false);
  const [hasCheckedBag, setHasCheckedBag] = useState(false);
  const [arrivalMode, setArrivalMode] = useState<ArrivalMode>("parking");

  // Buffer override
  const [showBufferOverride, setShowBufferOverride] = useState(false);
  const [customBuffer, setCustomBuffer] = useState("");

  // Output
  const [result, setResult] = useState<CalculatorResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const defaultBuffer = recommendedBuffer(flightType, hasPreCheck, hasCheckedBag, arrivalMode);

  function handleCalculate() {
    setError(null);

    if (!departureDate || !departureTime) {
      setError("Enter your flight departure date and time.");
      return;
    }

    const travel = parseManualTravelTime(travelTimeMinutes);
    if (travel === null) {
      setError("Enter your estimated drive time in minutes.");
      return;
    }

    const [year, month, day] = departureDate.split("-").map(Number);
    const [hour, minute] = departureTime.split(":").map(Number);
    const departure = new Date(year, month - 1, day, hour, minute, 0);

    const bufferMins =
      showBufferOverride && customBuffer
        ? parseInt(customBuffer, 10)
        : defaultBuffer;

    if (isNaN(bufferMins) || bufferMins < 0) {
      setError("Enter a valid buffer in minutes.");
      return;
    }

    const arrivalTime = new Date(departure.getTime() - bufferMins * 60 * 1000);
    const leaveTime = new Date(arrivalTime.getTime() - travel * 60 * 1000);

    setResult({ arrivalTime, leaveTime, bufferMinutes: bufferMins, travelMinutes: travel });

    track("calculator_used", { flight_type: flightType, arrival_mode: arrivalMode });
    track("airport_calculator_result_shown", {
      buffer_minutes: bufferMins,
      travel_minutes: travel,
    });

    // Phase 2: call getTravelTimeMinutes(origin, airport, departure) here
    void getTravelTimeMinutes(origin, airport, departure);
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

          {/* Origin + destination — captured for Phase 2 Maps API */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <FieldLabel>Starting location</FieldLabel>
              <input
                type="text"
                placeholder="City or address"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <FieldLabel>Airport</FieldLabel>
              <input
                type="text"
                placeholder="e.g. JFK, LAX, Newark"
                value={airport}
                onChange={(e) => setAirport(e.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          {/* Drive time — manual until Maps API added */}
          <div>
            <FieldLabel>Drive time to airport (minutes)</FieldLabel>
            <input
              type="number"
              min="0"
              max="300"
              placeholder="e.g. 35"
              value={travelTimeMinutes}
              onChange={(e) => setTravelTimeMinutes(e.target.value)}
              className={inputClass}
            />
            <p className="mt-1.5 text-xs text-zinc-500">
              Enter your estimated drive time. Live traffic estimates coming soon.
            </p>
          </div>

          {/* Security */}
          <div>
            <FieldLabel>Security</FieldLabel>
            <div className="flex flex-wrap gap-2">
              <Toggle
                checked={hasPreCheck}
                onChange={setHasPreCheck}
                label="TSA PreCheck / Global Entry"
              />
            </div>
          </div>

          {/* Bags */}
          <div>
            <FieldLabel>Bags</FieldLabel>
            <div className="flex flex-wrap gap-2">
              <Toggle
                checked={hasCheckedBag}
                onChange={setHasCheckedBag}
                label="Checking a bag"
              />
            </div>
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
                  Minutes before departure you want to arrive at the airport.
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
                  <p className="text-2xl font-black text-white">
                    {fmtTime(result.arrivalTime)}
                  </p>
                  <p className="text-sm text-zinc-400">{fmtDate(result.arrivalTime)}</p>
                </div>

                <div className="border-b border-zinc-700 pb-5">
                  <p className="mb-1 text-xs text-zinc-500">Estimated drive time</p>
                  <p className="text-2xl font-black text-white">
                    {result.travelMinutes} min
                  </p>
                </div>

                <div>
                  <p className="mb-1 text-xs text-zinc-500">Leave by</p>
                  <p className="text-4xl font-black text-green-500">
                    {fmtTime(result.leaveTime)}
                  </p>
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
                <AppStoreButton
                  size="sm"
                  location="airport_calculator"
                />
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
