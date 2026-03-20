/// Airport Theory Calculator — interactive "how late can I push it" tool.
///
/// ## Purpose
/// Calculates the theoretical minimum leave time for a flight at three
/// aggression levels, then explains exactly why each level is a bad idea.
/// Humor is intentional and load-bearing.
///
/// ## Include
/// - Aggression-level picker (responsible / close / maniac)
/// - Theory buffer calculation (optimistic fixed values, not TSA data)
/// - Dynamic quips, success rate, and reality-check checklist
/// - Share button (Web Share API + clipboard fallback)
/// - CTA linking back to the sane calculator
///
/// ## Don't Include
/// - TSA wait time fetching — theory mode uses intentionally optimistic values
/// - Security estimate UI — this calculator ignores realism on purpose
///
/// ## Lifecycle & Usage
/// Client component rendered by airport-theory-calculator/page.tsx.
/// Fetches drive time on Calculate press via /api/travel-time proxy.

"use client";

import { useState } from "react";
import Link from "next/link";
import { AppStoreButton } from "@/components/CTAButton";
import PlaceAutocomplete from "@/components/PlaceAutocomplete";

// ─── Types ────────────────────────────────────────────────────────────────────

type FlightType = "domestic" | "international";
type Aggression = 1 | 2 | 3;
type TravelSource = "google" | "manual";

interface TheoryResult {
  leaveTime: Date;
  bufferMinutes: number;
  travelMinutes: number;
  travelSource: TravelSource;
  aggression: Aggression;
  hasCheckedBag: boolean;
  flightType: FlightType;
}

// ─── Aggression config ────────────────────────────────────────────────────────

const LEVELS: Record<Aggression, {
  emoji: string;
  label: string;
  accentClass: string;
  borderClass: string;
  bgClass: string;
  quips: string[];
  successRate: string;
  translation: string;
}> = {
  1: {
    emoji: "😇",
    label: "Responsible Adult",
    accentClass: "text-amber-400",
    borderClass: "border-amber-900/50",
    bgClass: "bg-amber-950/20",
    quips: ["You'll probably make it.", "Probably.", "Don't stop for coffee."],
    successRate: "73%",
    translation: "you miss roughly 1 in 4 flights like this",
  },
  2: {
    emoji: "😬",
    label: "Cutting It Close",
    accentClass: "text-orange-400",
    borderClass: "border-orange-900/50",
    bgClass: "bg-orange-950/20",
    quips: [
      "This is not a plan.",
      "This is a bet.",
      "Good luck.",
    ],
    successRate: "41%",
    translation: "you miss roughly 6 in 10 flights like this",
  },
  3: {
    emoji: "😈",
    label: "Absolute Maniac",
    accentClass: "text-red-400",
    borderClass: "border-red-900/50",
    bgClass: "bg-red-950/20",
    quips: [
      "This is how people miss flights.",
      "You're not planning. You're gambling.",
      "We calculated it. We do not recommend it.",
    ],
    successRate: "12% (on a good day)",
    translation: "you make this flight about 1 in 8 times",
  },
};

const REALITY_CHECKS: Record<Aggression, string[]> = {
  1: [
    "No traffic",
    "Security line is moving normally",
    "Gate isn't at the end of the terminal",
    "Boarding is still open when you arrive",
  ],
  2: [
    "No traffic",
    "No security line",
    "Gate is close to security",
    "Boarding is still open",
    "No stops — nothing",
  ],
  3: [
    "No traffic",
    "No security line",
    "TSA PreCheck lane is open and empty",
    "Gate is right after security",
    "Boarding hasn't started closing",
    "No stops (bathroom, food, anything)",
    "Every moving walkway is working",
    "You can sprint in your shoes",
    "No delays anywhere",
    "The gate agent takes pity on you",
    "The universe is on your side today",
  ],
};

// ─── Theory buffer logic ──────────────────────────────────────────────────────
// Intentionally optimistic. This is the point.

function theoryBuffer(
  flightType: FlightType,
  hasCheckedBag: boolean,
  hasPreCheck: boolean,
  aggression: Aggression
): number {
  const boardingCutoff = flightType === "international" ? 20 : 15;
  const security =
    aggression === 1 ? (hasPreCheck ? 12 : 22) :
    aggression === 2 ? (hasPreCheck ? 7  : 13) :
                       (hasPreCheck ? 3  : 7);
  const gateWalk = aggression === 1 ? 12 : aggression === 2 ? 7 : 3;
  // Level 3 skips bag check time — you should not have checked a bag
  const bags = hasCheckedBag ? (aggression === 1 ? 15 : aggression === 2 ? 10 : 0) : 0;
  return boardingCutoff + security + gateWalk + bags;
}

// ─── Travel time fetch ────────────────────────────────────────────────────────

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

// ─── Formatting ───────────────────────────────────────────────────────────────

function fmtTime(d: Date) {
  return d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

function fmtDate(d: Date) {
  return d.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" });
}

function defaultDeparture() {
  const d = new Date(Date.now() + 2 * 60 * 60 * 1000);
  const mins = d.getMinutes();
  const remainder = mins % 15;
  if (remainder !== 0) d.setMinutes(mins + (15 - remainder), 0, 0);
  return {
    date: d.toLocaleDateString("en-CA"),
    time: d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }),
  };
}

// ─── UI primitives ────────────────────────────────────────────────────────────

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <p className="mb-2 text-sm font-semibold text-zinc-300">{children}</p>;
}

function Toggle({ checked, onChange, label }: {
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

function SegmentedControl<T extends string>({
  options, value, onChange,
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

// ─── Main component ───────────────────────────────────────────────────────────

export default function AirportTheoryCalculator() {
  const today = new Date().toISOString().split("T")[0];
  const { date: defaultDate, time: defaultTime } = defaultDeparture();

  const [departureDate, setDepartureDate] = useState(defaultDate);
  const [departureTime, setDepartureTime] = useState(defaultTime);
  const [flightType, setFlightType] = useState<FlightType>("domestic");
  const [origin, setOrigin] = useState("");
  const [airport, setAirport] = useState("");
  const [hasPreCheck, setHasPreCheck] = useState(false);
  const [hasCheckedBag, setHasCheckedBag] = useState(false);
  const [aggression, setAggression] = useState<Aggression>(2);
  const [manualTravelMinutes, setManualTravelMinutes] = useState("");
  const [showManualTravel, setShowManualTravel] = useState(false);

  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState<TheoryResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [shareStatus, setShareStatus] = useState<"idle" | "copied">("idle");

  const hasRouteInputs = origin.trim().length >= 2 && airport.trim().length >= 2;

  async function handleCalculate() {
    setError(null);
    if (!departureDate || !departureTime) {
      setError("Enter your flight departure date and time.");
      return;
    }

    const [year, month, day] = departureDate.split("-").map(Number);
    const [hour, minute] = departureTime.split(":").map(Number);
    const departure = new Date(year, month - 1, day, hour, minute, 0);
    const bufferMins = theoryBuffer(flightType, hasCheckedBag, hasPreCheck, aggression);

    let travelMinutes: number;
    let travelSource: TravelSource = "manual";

    if (hasRouteInputs) {
      setIsCalculating(true);
      try {
        const res = await fetchTravelTime(origin, airport, departure);
        travelMinutes = res.durationMinutes;
        travelSource = "google";
      } catch {
        const manual = parseInt(manualTravelMinutes, 10);
        if (!isNaN(manual) && manual >= 0) {
          travelMinutes = manual;
        } else {
          setError("Could not estimate drive time. Enter it manually below.");
          setIsCalculating(false);
          return;
        }
      } finally {
        setIsCalculating(false);
      }
    } else {
      const manual = parseInt(manualTravelMinutes, 10);
      if (isNaN(manual) || manual < 0) {
        setError("Enter your starting location and airport, or enter your drive time below.");
        return;
      }
      travelMinutes = manual;
    }

    const leaveTime = new Date(departure.getTime() - (bufferMins + travelMinutes) * 60 * 1000);
    setResult({ leaveTime, bufferMinutes: bufferMins, travelMinutes, travelSource, aggression, hasCheckedBag, flightType });
  }

  async function handleShare() {
    if (!result) return;
    const text = `I just found out I can leave at ${fmtTime(result.leaveTime)} and still (maybe) make my flight ${LEVELS[result.aggression].emoji} — Airport Theory Calculator`;
    const url = "https://www.ontimer.app/airport-theory-calculator";
    try {
      if (navigator.share) {
        await navigator.share({ title: "Airport Theory Calculator", text, url });
      } else {
        await navigator.clipboard.writeText(`${text}\n\n${url}`);
        setShareStatus("copied");
        setTimeout(() => setShareStatus("idle"), 2500);
      }
    } catch { /* user cancelled */ }
  }

  const level = LEVELS[aggression];

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 sm:p-8">
      <div className="grid gap-10 lg:grid-cols-2">

        {/* ── Inputs ── */}
        <div className="space-y-7">

          {/* Date + time */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <FieldLabel>Flight departure date</FieldLabel>
              <input type="date" value={departureDate} min={today}
                onChange={(e) => setDepartureDate(e.target.value)}
                className={`${inputClass} [color-scheme:dark]`} />
            </div>
            <div>
              <FieldLabel>Departure time</FieldLabel>
              <input type="time" value={departureTime}
                onChange={(e) => setDepartureTime(e.target.value)}
                className={`${inputClass} [color-scheme:dark]`} />
            </div>
          </div>

          {/* Flight type */}
          <div>
            <FieldLabel>Flight type</FieldLabel>
            <SegmentedControl
              options={[{ value: "domestic", label: "Domestic" }, { value: "international", label: "International" }]}
              value={flightType}
              onChange={setFlightType}
            />
          </div>

          {/* Route */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <FieldLabel>Starting location</FieldLabel>
              <PlaceAutocomplete value={origin} onChange={setOrigin}
                placeholder="Start typing an address" inputClassName={inputClass} />
            </div>
            <div>
              <FieldLabel>Airport</FieldLabel>
              <PlaceAutocomplete value={airport} onChange={setAirport}
                placeholder="e.g. JFK, LAX, Newark" inputClassName={inputClass} types="establishment" />
            </div>
          </div>

          {/* Drive time */}
          <div>
            <FieldLabel>Drive time</FieldLabel>
            {!showManualTravel ? (
              <div>
                <p className="text-sm text-zinc-500">Estimated from your location and airport.</p>
                <button type="button" onClick={() => setShowManualTravel(true)}
                  className="mt-2 text-xs text-zinc-500 underline underline-offset-2 transition-colors hover:text-zinc-300">
                  Enter manually
                </button>
              </div>
            ) : (
              <div>
                <input type="number" min="0" max="300" placeholder="e.g. 35"
                  value={manualTravelMinutes} onChange={(e) => setManualTravelMinutes(e.target.value)}
                  className={inputClass} />
                <button type="button"
                  onClick={() => { setShowManualTravel(false); setManualTravelMinutes(""); }}
                  className="mt-2 text-xs text-zinc-500 underline underline-offset-2 transition-colors hover:text-zinc-300">
                  Use automatic estimate
                </button>
              </div>
            )}
          </div>

          {/* Toggles */}
          <div className="flex flex-wrap gap-3">
            <Toggle checked={hasPreCheck} onChange={setHasPreCheck} label="TSA PreCheck / Global Entry" />
            <Toggle checked={hasCheckedBag} onChange={setHasCheckedBag} label="Checking a bag" />
          </div>

          {/* Aggression picker */}
          <div>
            <FieldLabel>How aggressive are you?</FieldLabel>
            <div className="grid grid-cols-3 gap-2">
              {([1, 2, 3] as Aggression[]).map((lvl) => {
                const cfg = LEVELS[lvl];
                const selected = aggression === lvl;
                return (
                  <button key={lvl} type="button" onClick={() => setAggression(lvl)}
                    className={`rounded-xl border p-3 text-center transition-all ${
                      selected ? `${cfg.borderClass} ${cfg.bgClass}` : "border-zinc-700 hover:border-zinc-600"
                    }`}>
                    <div className="text-2xl">{cfg.emoji}</div>
                    <div className={`mt-1 text-xs font-medium leading-tight ${selected ? cfg.accentClass : "text-zinc-500"}`}>
                      {cfg.label}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {error && (
            <p className="rounded-lg border border-red-900/50 bg-red-950/30 px-4 py-3 text-sm text-red-400">
              {error}
            </p>
          )}

          <button type="button" onClick={handleCalculate} disabled={isCalculating}
            className="w-full rounded-full bg-red-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-red-400 disabled:cursor-not-allowed disabled:opacity-60">
            {isCalculating ? "Calculating your bad decision…" : `Calculate My Bad Decision ${level.emoji}`}
          </button>
        </div>

        {/* ── Results ── */}
        <div className="flex flex-col">
          {result ? (
            <ResultPanel result={result} onShare={handleShare} shareStatus={shareStatus} />
          ) : (
            <EmptyState level={level} />
          )}
        </div>

      </div>
    </div>
  );
}

// ─── Empty state ──────────────────────────────────────────────────────────────

function EmptyState({ level }: { level: typeof LEVELS[Aggression] }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-dashed border-zinc-700 p-10 text-center">
      <div className="mb-4 text-5xl">{level.emoji}</div>
      <p className="text-base font-semibold text-zinc-300">
        Your extremely questionable leave time will appear here
      </p>
      <p className="mt-2 text-sm text-zinc-500">Fill in your flight details and click the button.</p>
      <p className="mt-4 text-xs italic text-zinc-600">Warning: this is a terrible idea.</p>
    </div>
  );
}

// ─── Result panel ─────────────────────────────────────────────────────────────

function ResultPanel({ result, onShare, shareStatus }: {
  result: TheoryResult;
  onShare: () => void;
  shareStatus: "idle" | "copied";
}) {
  const level = LEVELS[result.aggression];

  return (
    <div className="space-y-4">

      {/* Leave time */}
      <div className={`rounded-xl border ${level.borderClass} ${level.bgClass} p-6`}>
        <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-zinc-500">
          Leave by (if everything goes perfectly)
        </p>
        <p className={`text-5xl font-black ${level.accentClass}`}>{fmtTime(result.leaveTime)}</p>
        <p className="mt-1 text-sm text-zinc-400">{fmtDate(result.leaveTime)}</p>
        <p className={`mt-3 text-xs font-semibold uppercase tracking-wider text-zinc-500`}>
          You are attempting airport theory.
        </p>
        <p className={`mt-2 text-sm font-semibold ${level.accentClass}`}>
          {level.emoji} {level.label} mode
        </p>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-xs text-zinc-500">Estimated success rate:</span>
          <span className={`text-xs font-bold ${level.accentClass}`}>{level.successRate}</span>
        </div>
        <p className="mt-1 text-xs text-zinc-600">Translation: {level.translation}</p>
      </div>

      {/* Quips */}
      <div className={`rounded-xl border ${level.borderClass} ${level.bgClass} p-4`}>
        {level.quips.map((quip, i) => (
          <p key={quip} className={`text-sm font-semibold ${i === 0 ? level.accentClass : "text-zinc-400"} ${i > 0 ? "mt-1" : ""}`}>
            {quip}
          </p>
        ))}
      </div>

      {/* Breakdown */}
      <div className="space-y-2 rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3">
        <div className="flex justify-between text-xs">
          <span className="text-zinc-500">Drive time</span>
          <span className="font-semibold text-white">{result.travelMinutes} min</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-zinc-500">Airport buffer (theory mode)</span>
          <span className="font-semibold text-white">{result.bufferMinutes} min</span>
        </div>
        {result.hasCheckedBag && result.aggression === 3 && (
          <p className="pt-1 text-xs text-red-400">⚠️ Checking a bag on maniac mode is not a strategy.</p>
        )}
      </div>

      {/* Reality check */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-4">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-400">
          {REALITY_CHECKS[result.aggression].length} things that must go perfectly
        </p>
        <ul className="space-y-1.5">
          {REALITY_CHECKS[result.aggression].map((item) => (
            <li key={item} className="flex items-start gap-2 text-xs text-zinc-500">
              <span className="mt-0.5 flex-shrink-0 text-red-500">✕</span>
              {item}
            </li>
          ))}
        </ul>
        <p className={`mt-4 text-sm font-bold ${level.accentClass}`}>
          Miss ONE of these… and you miss your flight.
        </p>
      </div>

      {/* Share */}
      <div className="space-y-2 text-center">
        <p className="text-xs text-zinc-500">Know someone who would 100% try this?</p>
        <button type="button" onClick={onShare}
          className="w-full rounded-full border border-zinc-700 py-2.5 text-sm font-medium text-zinc-300 transition-colors hover:border-zinc-500 hover:text-white">
          {shareStatus === "copied" ? "✓ Copied!" : "Send this to them →"}
        </button>
      </div>

      {/* Sane recommendation */}
      <div className="rounded-xl border border-green-900/40 bg-green-950/20 p-4">
        <p className="mb-1 text-sm font-semibold text-green-400">Want a sane recommendation?</p>
        <p className="mb-3 text-xs text-zinc-400">
          The normal calculator uses real TSA wait times and traffic data to give you a sensible leave time.
        </p>
        <Link href="/airport-time-to-leave-calculator"
          className="inline-flex items-center gap-1.5 rounded-full border border-green-700 px-4 py-2 text-xs font-semibold text-green-400 transition-colors hover:bg-green-900/20">
          Show me when I should actually leave →
        </Link>
      </div>

      {/* App CTA */}
      <div className="pt-1">
        <p className="mb-3 text-xs text-zinc-600">Or just don&apos;t think about this ever again…</p>
        <AppStoreButton size="sm" location="airport_theory_result" />
      </div>

    </div>
  );
}
