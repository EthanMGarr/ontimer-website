"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { AppStoreButton } from "@/components/CTAButton";
import PlaceAutocomplete from "@/components/PlaceAutocomplete";
import type { SecurityEstimate } from "@/app/api/security-wait/route";

// ─── Types ────────────────────────────────────────────────────────────────────

type FlightType = "domestic" | "international";
type ArrivalMode = "parking" | "rideshare" | "dropoff";
type TravelSource = "google" | "manual";
type Confidence = "comfortable" | "tight" | "risk";

interface ComputedResult {
  arrivalTime: Date;
  leaveTime: Date;
  bufferMinutes: number;
  baseBufferMinutes: number;
  securityMinutes: number;
  travelMinutes: number;
  travelSource: TravelSource;
  hasTrafficData: boolean;
  confidence: Confidence;
}

// ─── Buffer logic ─────────────────────────────────────────────────────────────

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

// ─── API helpers ──────────────────────────────────────────────────────────────

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
  return d.toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" });
}

function fmtDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m === 0 ? `${h} hr` : `${h} hr ${m} min`;
}

function fmtDepartureTime(timeStr: string): string {
  const parts = timeStr.split(":");
  if (parts.length < 2) return "";
  const h = Number(parts[0]);
  const m = Number(parts[1]);
  if (isNaN(h) || isNaN(m)) return "";
  const hour = h % 12 || 12;
  const ampm = h < 12 ? "AM" : "PM";
  return m === 0 ? `${hour} ${ampm}` : `${hour}:${m.toString().padStart(2, "0")} ${ampm}`;
}

// ─── Airport display ──────────────────────────────────────────────────────────

const CITY_CODE_MAP: Record<string, string> = {
  newark: "EWR", "new york": "JFK", "los angeles": "LAX", chicago: "ORD",
  "san francisco": "SFO", miami: "MIA", atlanta: "ATL", dallas: "DFW",
  denver: "DEN", seattle: "SEA", boston: "BOS", phoenix: "PHX",
  minneapolis: "MSP", detroit: "DTW", "las vegas": "LAS", houston: "IAH",
  "salt lake": "SLC", portland: "PDX", "san diego": "SAN", charlotte: "CLT",
  orlando: "MCO", baltimore: "BWI", washington: "DCA", philadelphia: "PHL",
  "new orleans": "MSY", nashville: "BNA", austin: "AUS", pittsburgh: "PIT",
  cleveland: "CLE", tampa: "TPA", sacramento: "SMF", "san jose": "SJC",
  raleigh: "RDU", "kansas city": "MCI",
};

function buildAirportShortDisplay(input: string): string {
  const s = input.trim();
  if (!s) return "";
  if (/^[A-Za-z]{3}$/.test(s)) return s.toUpperCase();
  const placeName = s.split(",")[0].trim();
  const inParens = s.match(/\(([A-Z]{3})\)/);
  const explicitCode = inParens?.[1] ?? null;
  let shortName = placeName
    .replace(/\s*\([A-Z]{3}\)/g, "")
    .replace(/\s+(Liberty|O'?Hare|Midway|Logan|Dulles|Hartsfield[-\s]Jackson|Reagan|Tacoma|Dulles)\b.*/i, "")
    .replace(/\s+(International|Intl\.?|Regional|Municipal|National|Executive|Memorial)\s*(Airport|Airfield)?\.?\s*$/i, "")
    .replace(/\s+Airport\.?\s*$/i, "")
    .trim();
  const lower = `${shortName} ${s}`.toLowerCase();
  const lookupCode = Object.entries(CITY_CODE_MAP).find(([city]) => lower.includes(city))?.[1] ?? null;
  const code = explicitCode ?? lookupCode;
  if (!shortName) shortName = placeName.split(" ")[0];
  return code ? `${shortName} (${code})` : shortName;
}

// ─── Constants & helpers ──────────────────────────────────────────────────────

const TYPICAL_TRAVEL_MINS = 30;

function computeConfidence(bufferUsed: number, recommendedBuffer: number): Confidence {
  if (bufferUsed >= recommendedBuffer) return "comfortable";
  if (bufferUsed >= recommendedBuffer - 20) return "tight";
  return "risk";
}

function buildGCalLink(leaveTime: Date, airportInput: string): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  const fmt = (d: Date) =>
    `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`;
  const end = new Date(leaveTime.getTime() + 15 * 60 * 1000);
  const name = airportInput
    ? `Leave for ${buildAirportShortDisplay(airportInput)}`
    : "Leave for airport";
  return (
    `https://calendar.google.com/calendar/r/eventedit` +
    `?text=${encodeURIComponent(name)}` +
    `&dates=${fmt(leaveTime)}/${fmt(end)}` +
    `&details=${encodeURIComponent("Calculated by OnTimer")}`
  );
}

// ─── UI primitives ────────────────────────────────────────────────────────────

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

function ConfidenceBadge({ confidence }: { confidence: Confidence }) {
  const config = {
    comfortable: { dot: "bg-green-500", label: "You should have plenty of time", text: "text-green-500" },
    tight:       { dot: "bg-amber-500", label: "This timing may be tight",        text: "text-amber-500" },
    risk:        { dot: "bg-red-400",   label: "This timing may be risky",        text: "text-red-400"   },
  }[confidence];
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs ${config.text}`}>
      <span className={`h-1.5 w-1.5 flex-shrink-0 rounded-full ${config.dot}`} />
      {config.label}
    </span>
  );
}

const inputClass =
  "w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white placeholder-zinc-500 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500";

// ─── Default departure ────────────────────────────────────────────────────────

function defaultDeparture() {
  const d = new Date(Date.now() + 2 * 60 * 60 * 1000);
  const mins = d.getMinutes();
  const remainder = mins % 15;
  if (remainder !== 0) d.setMinutes(mins + (15 - remainder), 0, 0);
  const date = d.toLocaleDateString("en-CA");
  const time = d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
  return { date, time };
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function AirportCalculator() {
  const today = new Date().toISOString().split("T")[0];
  const { date: defaultDate, time: defaultTime } = defaultDeparture();

  // ── Form state ──────────────────────────────────────────────────────────────
  const [departureDate, setDepartureDate] = useState(defaultDate);
  const [departureTime, setDepartureTime] = useState(defaultTime);
  const [flightType, setFlightType] = useState<FlightType>("domestic");
  const [origin, setOrigin] = useState("");
  const [airport, setAirport] = useState("");

  // ── Refinement state ────────────────────────────────────────────────────────
  const [showRefinements, setShowRefinements] = useState(false);
  const [hasPreCheck, setHasPreCheck] = useState(false);
  const [hasClear, setHasClear] = useState(false);
  const [hasCheckedBag, setHasCheckedBag] = useState(false);
  const [arrivalMode, setArrivalMode] = useState<ArrivalMode>("parking");
  const [showBufferOverride, setShowBufferOverride] = useState(false);
  const [customBuffer, setCustomBuffer] = useState("");
  const [showManualDriveTime, setShowManualDriveTime] = useState(false);
  const [manualTravelMinutes, setManualTravelMinutes] = useState("");
  const [showSecurityOverride, setShowSecurityOverride] = useState(false);
  const [customSecurityMinutes, setCustomSecurityMinutes] = useState("");

  // ── Security estimate state ─────────────────────────────────────────────────
  const [securityEstimate, setSecurityEstimate] = useState<SecurityEstimate | null>(null);
  const [isFetchingSecurityEstimate, setIsFetchingSecurityEstimate] = useState(false);

  // ── Travel time state ───────────────────────────────────────────────────────
  const [travelMins, setTravelMins] = useState<number | null>(null);
  const [travelSource, setTravelSource] = useState<TravelSource | null>(null);
  const [hasTrafficData, setHasTrafficData] = useState(false);
  const [isFetchingTravel, setIsFetchingTravel] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ── Interaction state ───────────────────────────────────────────────────────
  const [calendarAdded, setCalendarAdded] = useState(false);
  const [showBreakdown, setShowBreakdown] = useState(false);

  const securityDebounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const travelDebounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const travelAbortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    setError(null);
  }, [departureDate, departureTime, origin, airport, flightType, arrivalMode,
      hasCheckedBag, manualTravelMinutes, hasPreCheck, hasClear, customBuffer, customSecurityMinutes]);

  // ── Auto-fetch security estimate ────────────────────────────────────────────
  useEffect(() => {
    clearTimeout(securityDebounceRef.current);
    if (airport.trim().length < 2) {
      setSecurityEstimate(null);
      setIsFetchingSecurityEstimate(false);
      return;
    }
    securityDebounceRef.current = setTimeout(async () => {
      let departureUnix: number | null = null;
      if (departureDate && departureTime) {
        const [y, mo, d] = departureDate.split("-").map(Number);
        const [h, mi] = departureTime.split(":").map(Number);
        const dep = new Date(y, mo - 1, d, h, mi, 0);
        if (!isNaN(dep.getTime())) departureUnix = Math.floor(dep.getTime() / 1000);
      }
      setIsFetchingSecurityEstimate(true);
      const estimate = await fetchSecurityEstimate(airport, departureUnix, flightType, hasPreCheck, hasClear);
      setSecurityEstimate(estimate);
      setIsFetchingSecurityEstimate(false);
    }, 500);
    return () => clearTimeout(securityDebounceRef.current);
  }, [airport, departureDate, departureTime, flightType, hasPreCheck, hasClear]);

  // ── Auto-fetch travel time ──────────────────────────────────────────────────
  useEffect(() => {
    clearTimeout(travelDebounceRef.current);
    travelAbortRef.current?.abort();

    if (origin.trim().length < 2 || airport.trim().length < 2 || !departureDate || !departureTime) {
      setTravelMins(null);
      setTravelSource(null);
      setIsFetchingTravel(false);
      return;
    }

    travelDebounceRef.current = setTimeout(async () => {
      const [year, month, day] = departureDate.split("-").map(Number);
      const [hour, minute] = departureTime.split(":").map(Number);
      const departure = new Date(year, month - 1, day, hour, minute, 0);
      if (isNaN(departure.getTime())) return;

      const controller = new AbortController();
      travelAbortRef.current = controller;
      setIsFetchingTravel(true);
      setError(null);

      try {
        const res = await fetchTravelTime(origin, airport, departure);
        if (controller.signal.aborted) return;
        setTravelMins(res.durationMinutes);
        setTravelSource("google");
        setHasTrafficData(res.hasTrafficData);
        if (res.cacheHit) {
          track("travel_time_cache_hit", { duration_minutes: res.durationMinutes });
        } else {
          track("routes_api_called", { duration_minutes: res.durationMinutes, trigger: "auto" });
        }
        track("airport_calculator_result_shown", { travel_minutes: res.durationMinutes, trigger: "auto" });
      } catch {
        if (!controller.signal.aborted) {
          const manual = parseInt(manualTravelMinutes, 10);
          if (!isNaN(manual) && manual >= 0) {
            setTravelMins(manual);
            setTravelSource("manual");
            setHasTrafficData(false);
          } else {
            setTravelMins(null);
            setTravelSource(null);
          }
          track("quota_fallback_used");
        }
      } finally {
        if (!controller.signal.aborted) setIsFetchingTravel(false);
      }
    }, 1000);

    return () => {
      clearTimeout(travelDebounceRef.current);
      travelAbortRef.current?.abort();
    };
  }, [origin, airport, departureDate, departureTime]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Derived values ──────────────────────────────────────────────────────────
  const baseBuffer = baseAirportBuffer(flightType, hasCheckedBag, arrivalMode);
  const estimatedSecurityMins = securityEstimate?.avg ?? (flightType === "domestic" ? 25 : 45);
  const defaultBuffer = baseBuffer + estimatedSecurityMins;
  const hasRouteInputs = origin.trim().length >= 2 && airport.trim().length >= 2;
  const airportShortDisplay = buildAirportShortDisplay(airport);
  const hasAirport = airport.trim().length >= 2;

  type SecurityState = "empty" | "loading" | "ready";
  const securityState: SecurityState =
    !hasAirport ? "empty" :
    (isFetchingSecurityEstimate || securityEstimate === null) ? "loading" :
    "ready";

  const activeRefinementCount = [
    hasPreCheck || hasClear,
    hasCheckedBag,
    arrivalMode !== "parking",
    showManualDriveTime,
    showBufferOverride,
    showSecurityOverride,
  ].filter(Boolean).length;

  const bufferContextLabel = [
    flightType === "international" ? "international flight" : "domestic flight",
    arrivalMode === "parking" ? "parking" : null,
    hasCheckedBag ? "bag drop" : null,
  ].filter(Boolean).join(" · ");

  // Core trust signals shown in the collapsed smart-timing card (always visible)
  const coreTrustSignals = [
    hasAirport && airportShortDisplay
      ? `TSA wait (${airportShortDisplay})`
      : "TSA wait estimates",
    "Parking time",
    flightType === "international" ? "International timing" : "Domestic timing",
    "Live traffic conditions",
  ];

  // ── Computed result ─────────────────────────────────────────────────────────
  const computedResult = useMemo((): ComputedResult | null => {
    if (!departureDate || !departureTime) return null;
    const [year, month, day] = departureDate.split("-").map(Number);
    const [hour, minute] = departureTime.split(":").map(Number);
    const departure = new Date(year, month - 1, day, hour, minute, 0);
    if (isNaN(departure.getTime())) return null;

    const secMins = showSecurityOverride && customSecurityMinutes
      ? parseInt(customSecurityMinutes, 10)
      : estimatedSecurityMins;
    const baseBuf = showBufferOverride && customBuffer
      ? Math.max(0, parseInt(customBuffer, 10) - secMins)
      : baseBuffer;
    const bufMins = baseBuf + secMins;
    if (isNaN(bufMins) || bufMins < 0) return null;

    const resolvedManual = parseInt(manualTravelMinutes, 10);
    const effectiveTravelMins =
      travelMins !== null ? travelMins :
      (!isNaN(resolvedManual) && resolvedManual >= 0 ? resolvedManual : null);
    if (effectiveTravelMins === null) return null;

    const arrivalTime = new Date(departure.getTime() - bufMins * 60 * 1000);
    const leaveTime = new Date(arrivalTime.getTime() - effectiveTravelMins * 60 * 1000);

    return {
      arrivalTime,
      leaveTime,
      bufferMinutes: bufMins,
      baseBufferMinutes: baseBuf,
      securityMinutes: secMins,
      travelMinutes: effectiveTravelMins,
      travelSource: travelSource ?? "manual",
      hasTrafficData,
      confidence: computeConfidence(bufMins, defaultBuffer),
    };
  }, [departureDate, departureTime, travelMins, travelSource, hasTrafficData,
      estimatedSecurityMins, baseBuffer, defaultBuffer, showSecurityOverride,
      customSecurityMinutes, showBufferOverride, customBuffer, manualTravelMinutes]);

  // ── Airport arrival preview (partial + estimating states) ───────────────────
  const arrivalOnlyPreview = useMemo((): Date | null => {
    if (!departureDate || !departureTime || computedResult) return null;
    const [y, mo, d] = departureDate.split("-").map(Number);
    const [h, mi] = departureTime.split(":").map(Number);
    const dep = new Date(y, mo - 1, d, h, mi, 0);
    if (isNaN(dep.getTime())) return null;
    const secMins = showSecurityOverride && customSecurityMinutes
      ? parseInt(customSecurityMinutes, 10)
      : estimatedSecurityMins;
    const bufMins = showBufferOverride && customBuffer
      ? parseInt(customBuffer, 10)
      : baseBuffer + secMins;
    if (isNaN(bufMins) || bufMins < 0) return null;
    return new Date(dep.getTime() - bufMins * 60 * 1000);
  }, [departureDate, departureTime, computedResult, estimatedSecurityMins, baseBuffer,
      showSecurityOverride, customSecurityMinutes, showBufferOverride, customBuffer]);

  // Estimated leave shown only in the estimating (fetching) state — assumes typical drive time
  const estimatedLeaveTime = useMemo((): Date | null => {
    if (!arrivalOnlyPreview) return null;
    return new Date(arrivalOnlyPreview.getTime() - TYPICAL_TRAVEL_MINS * 60 * 1000);
  }, [arrivalOnlyPreview]);

  // ── Manual calculate fallback ───────────────────────────────────────────────
  async function handleCalculate() {
    setError(null);
    if (!departureDate || !departureTime) {
      setError("Enter your flight departure date and time.");
      return;
    }
    const [year, month, day] = departureDate.split("-").map(Number);
    const [hour, minute] = departureTime.split(":").map(Number);
    const departure = new Date(year, month - 1, day, hour, minute, 0);

    if (hasRouteInputs) {
      setIsFetchingTravel(true);
      try {
        const res = await fetchTravelTime(origin, airport, departure);
        setTravelMins(res.durationMinutes);
        setTravelSource("google");
        setHasTrafficData(res.hasTrafficData);
        track("routes_api_called", { duration_minutes: res.durationMinutes, trigger: "manual" });
      } catch {
        const manual = parseInt(manualTravelMinutes, 10);
        if (!isNaN(manual) && manual >= 0) {
          setTravelMins(manual);
          setTravelSource("manual");
          setHasTrafficData(false);
          track("quota_fallback_used");
        } else {
          setError("Could not estimate drive time. Open Adjust assumptions to enter drive time manually.");
        }
      } finally {
        setIsFetchingTravel(false);
      }
    } else {
      const manual = parseInt(manualTravelMinutes, 10);
      if (isNaN(manual) || manual < 0) {
        setError("Enter your starting location and airport, or open Adjust assumptions to enter drive time manually.");
        return;
      }
      setTravelMins(manual);
      setTravelSource("manual");
      setHasTrafficData(false);
    }
    track("calculator_used", { flight_type: flightType, arrival_mode: arrivalMode, trigger: "manual" });
  }

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <>
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 sm:p-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:gap-8">

          {/* ══ LEFT: Inputs ══════════════════════════════════════════════════ */}
          <div className="space-y-4">

            {/* Date + Time */}
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <FieldLabel>Flight date</FieldLabel>
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

            {/* Route */}
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <FieldLabel>Starting location</FieldLabel>
                <PlaceAutocomplete
                  value={origin}
                  onChange={setOrigin}
                  placeholder="Your address or city"
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

            {/* Smart airport timing card */}
            <div className="rounded-xl border border-zinc-700 bg-zinc-800/70 p-4">

              {/* Header */}
              <div className="flex items-center gap-2">
                <span className="text-base leading-none text-green-500">⚙</span>
                <p className="text-sm font-semibold text-white">Smart airport timing enabled</p>
              </div>
              <p className="mt-1 text-xs leading-relaxed text-zinc-500">
                We automatically account for the timing factors most travelers miss.
              </p>

              {/* Trust signals — 2-column grid */}
              <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5">
                {coreTrustSignals.map((item) => (
                  <div key={item} className="flex items-center gap-1.5">
                    <span className="flex-shrink-0 text-xs text-green-500">✓</span>
                    <span className="text-xs text-zinc-300">{item}</span>
                  </div>
                ))}
                {hasCheckedBag && (
                  <div className="flex items-center gap-1.5">
                    <span className="flex-shrink-0 text-xs text-green-500">✓</span>
                    <span className="text-xs text-zinc-300">Bag drop time</span>
                  </div>
                )}
                {(hasPreCheck || hasClear) && (
                  <div className="flex items-center gap-1.5">
                    <span className="flex-shrink-0 text-xs text-green-500">✓</span>
                    <span className="text-xs text-zinc-300">PreCheck / CLEAR</span>
                  </div>
                )}
              </div>

              {/* Expand button — visually interactive */}
              <button
                type="button"
                onClick={() => setShowRefinements(!showRefinements)}
                className="mt-4 flex w-full items-center justify-between gap-3 rounded-lg border border-zinc-600 bg-zinc-700/60 px-4 py-2.5 text-sm font-medium text-zinc-200 transition-colors hover:border-zinc-500 hover:bg-zinc-700 hover:text-white"
              >
                <span className="flex items-center gap-2">
                  <span>{showRefinements ? "Hide assumptions" : "Customize timing assumptions"}</span>
                  {activeRefinementCount > 0 && !showRefinements && (
                    <span className="rounded-full bg-green-500/20 px-1.5 py-0.5 text-[10px] font-semibold text-green-400">
                      {activeRefinementCount} modified
                    </span>
                  )}
                </span>
                <span className={`flex-shrink-0 text-xs text-zinc-400 transition-transform duration-200 ${showRefinements ? "rotate-180" : ""}`}>
                  ▾
                </span>
              </button>

              {showRefinements && (
                <div className="mt-4 space-y-5 border-t border-zinc-700 pt-4">
                  <div>
                    <FieldLabel>Trusted traveler programs</FieldLabel>
                    <div className="flex flex-wrap gap-2">
                      <Toggle checked={hasPreCheck} onChange={setHasPreCheck} label="TSA PreCheck / Global Entry" />
                      <Toggle checked={hasClear} onChange={setHasClear} label="CLEAR" />
                    </div>
                  </div>
                  <div>
                    <FieldLabel>Bags</FieldLabel>
                    <Toggle checked={hasCheckedBag} onChange={setHasCheckedBag} label="Checking a bag" />
                  </div>
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
                  <div>
                    <FieldLabel>Drive time</FieldLabel>
                    {!showManualDriveTime ? (
                      <div>
                        <p className="text-sm text-zinc-400">Estimated automatically from your locations.</p>
                        <button
                          type="button"
                          onClick={() => setShowManualDriveTime(true)}
                          className="mt-1.5 text-xs text-zinc-400 underline underline-offset-2 hover:text-zinc-300"
                        >
                          Enter drive time manually instead
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
                          className="mt-1.5 text-xs text-zinc-400 underline underline-offset-2 hover:text-zinc-300"
                        >
                          Use automatic estimate instead
                        </button>
                      </div>
                    )}
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={() => setShowBufferOverride(!showBufferOverride)}
                      className="text-xs text-zinc-400 underline underline-offset-2 hover:text-zinc-300"
                    >
                      {showBufferOverride
                        ? "Use recommended buffer"
                        : `Adjust airport arrival buffer (${fmtDuration(defaultBuffer)} recommended)`}
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
                        <p className="mt-1.5 text-xs text-zinc-400">
                          How early to arrive at the airport before your flight.
                        </p>
                      </div>
                    )}
                  </div>
                  <div>
                    {!showSecurityOverride ? (
                      <button
                        type="button"
                        onClick={() => setShowSecurityOverride(true)}
                        className="text-xs text-zinc-400 underline underline-offset-2 hover:text-zinc-300"
                      >
                        Adjust security time manually
                      </button>
                    ) : (
                      <div>
                        <FieldLabel>Custom security time</FieldLabel>
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
                          className="mt-1.5 text-xs text-zinc-400 underline underline-offset-2 hover:text-zinc-300"
                        >
                          Use estimated time instead
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {error && (
              <div className="rounded-lg border border-red-900/50 bg-red-950/30 px-4 py-3">
                <p className="text-sm text-red-400">{error}</p>
                <button
                  type="button"
                  onClick={handleCalculate}
                  className="mt-1.5 text-xs text-red-400 underline underline-offset-2 hover:text-red-300"
                >
                  Try again
                </button>
              </div>
            )}

            {!hasRouteInputs && !computedResult && (
              <button
                type="button"
                onClick={handleCalculate}
                disabled={isFetchingTravel}
                className="w-full rounded-full border border-zinc-700 bg-transparent px-6 py-2 text-sm font-medium text-zinc-300 transition-colors hover:border-zinc-500 hover:text-white disabled:opacity-50"
              >
                {isFetchingTravel ? "Calculating…" : "Get leave time →"}
              </button>
            )}
          </div>

          {/* ══ RIGHT: Result panel ═══════════════════════════════════════════ */}
          <div className="flex flex-col lg:sticky lg:top-6 lg:self-start">

            {computedResult ? (
              /* ── COMPLETE ── */
              <div className="rounded-xl border border-zinc-700 bg-zinc-800/80 p-5 transition-all duration-300">

                {departureTime && (
                  <p className="mb-2 text-xs text-zinc-500">
                    For your {fmtDepartureTime(departureTime)} {flightType} flight
                  </p>
                )}

                {/* Hero */}
                <p className="text-xs font-semibold text-zinc-400">Leave by</p>
                <p className="mt-0.5 text-7xl font-black leading-none text-green-500">
                  {fmtTime(computedResult.leaveTime)}
                </p>
                <p className="mt-2 text-sm text-zinc-400">{fmtDate(computedResult.leaveTime)}</p>
                <div className="mt-1.5">
                  <ConfidenceBadge confidence={computedResult.confidence} />
                </div>

                {/* Trust signals */}
                <div className="mt-4 space-y-1.5">
                  {[
                    computedResult.travelSource === "google"
                      ? (computedResult.hasTrafficData ? "Live traffic conditions" : "Route time estimated")
                      : "Manual drive time used",
                    `TSA wait time${airportShortDisplay ? ` (${airportShortDisplay})` : ""}`,
                    arrivalMode === "parking"
                      ? `${flightType === "international" ? "International" : "Domestic"} buffer + parking`
                      : `${flightType === "international" ? "International" : "Domestic"} airport buffer`,
                  ].map((signal) => (
                    <div key={signal} className="flex items-center gap-2">
                      <span className="text-xs text-green-500">✓</span>
                      <span className="text-xs text-zinc-400">{signal}</span>
                    </div>
                  ))}
                </div>

                {/* Calendar CTA */}
                <div className="mt-5">
                  {calendarAdded ? (
                    <div className="flex items-center gap-2 rounded-lg border border-green-900/50 bg-green-950/20 px-3 py-2.5">
                      <span className="text-green-500">✓</span>
                      <span className="text-sm font-semibold text-green-400">Added to calendar</span>
                    </div>
                  ) : (
                    <a
                      href={buildGCalLink(computedResult.leaveTime, airport)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => { track("calendar_link_clicked"); setCalendarAdded(true); }}
                      className="flex w-full items-center justify-center gap-2 rounded-lg border border-zinc-600 bg-zinc-700 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:border-zinc-500 hover:bg-zinc-600"
                    >
                      <span>📅</span>
                      <span>Add Leave Time to Calendar</span>
                    </a>
                  )}
                </div>

                {/* Automation CTA */}
                <div className="mt-4 border-t border-zinc-800 pt-4">
                  <p className="text-sm font-bold text-white">Never calculate this manually again.</p>
                  <div className="mt-2 space-y-1.5">
                    {[
                      "Calculates when to leave",
                      "Adjusts for live traffic",
                      "Alerts you at the right moment",
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-2">
                        <span className="text-xs text-green-500">✓</span>
                        <span className="text-xs text-zinc-400">{item}</span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-1.5 text-[10px] text-zinc-500">
                    Works for flights, meetings, and any calendar event.
                  </p>
                  <div className="mt-3">
                    <AppStoreButton size="sm" location="airport_calculator_inline" />
                  </div>
                </div>

                {/* Breakdown — collapsed by default, below automation CTA */}
                <div className="mt-4 border-t border-zinc-800 pt-3">
                  <button
                    type="button"
                    onClick={() => setShowBreakdown(!showBreakdown)}
                    className="flex items-center gap-1.5 text-xs text-zinc-500 transition-colors hover:text-zinc-400"
                  >
                    <span>{showBreakdown ? "▾" : "▸"}</span>
                    <span>{showBreakdown ? "Hide timing breakdown" : "See full timing breakdown"}</span>
                  </button>

                  {showBreakdown && (
                    <div className="mt-4 space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm text-zinc-400">Drive time</p>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-white">{fmtDuration(computedResult.travelMinutes)}</p>
                          {computedResult.travelSource === "google" && (
                            <p className="text-[11px] text-green-500">
                              {computedResult.hasTrafficData ? "live traffic" : "estimated route"}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-sm text-zinc-400">Security wait</p>
                          {securityEstimate && securityState === "ready" && airportShortDisplay && (
                            <p className="text-[11px] text-zinc-500">
                              {airportShortDisplay}: {fmtDuration(securityEstimate.min)}–{fmtDuration(securityEstimate.max)} typical
                            </p>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-white">{fmtDuration(computedResult.securityMinutes)}</p>
                          {securityState === "ready" && (
                            <p className="text-[11px] text-green-500">TSA estimate</p>
                          )}
                          {securityState === "loading" && (
                            <p className="text-[11px] text-zinc-500">estimating…</p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-sm text-zinc-400">Airport buffer</p>
                          {bufferContextLabel && (
                            <p className="text-[11px] text-zinc-500">{bufferContextLabel}</p>
                          )}
                        </div>
                        <p className="text-sm font-semibold text-white">
                          {fmtDuration(computedResult.baseBufferMinutes)}
                        </p>
                      </div>

                      <div className="flex items-baseline justify-between border-t border-zinc-800 pt-3">
                        <p className="text-sm text-zinc-400">Arrive at airport by</p>
                        <p className="text-sm font-semibold text-white">{fmtTime(computedResult.arrivalTime)}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

            ) : isFetchingTravel ? (
              /* ── ESTIMATING ── */
              <div className="rounded-xl border border-zinc-700 bg-zinc-800/80 p-5 transition-all duration-300">
                {departureTime && (
                  <p className="mb-2 text-xs text-zinc-500">
                    For your {fmtDepartureTime(departureTime)} flight
                  </p>
                )}
                <p className="text-xs font-semibold text-zinc-400">Leave by</p>
                <div className="mt-0.5 flex items-end gap-3">
                  <p className="text-7xl font-black leading-none text-zinc-600">
                    {estimatedLeaveTime ? fmtTime(estimatedLeaveTime) : "—:—"}
                  </p>
                  <span className="mb-1.5 animate-pulse text-xs text-zinc-500">calculating…</span>
                </div>
                <p className="mt-3 text-xs text-zinc-500">Fetching live traffic for your route</p>
                {arrivalOnlyPreview && (
                  <div className="mt-4 space-y-2 border-t border-zinc-800 pt-4">
                    <div className="flex items-baseline justify-between">
                      <p className="text-sm text-zinc-400">Arrive at airport by</p>
                      <p className="text-sm font-semibold text-white">{fmtTime(arrivalOnlyPreview)}</p>
                    </div>
                    <div className="flex items-baseline justify-between">
                      <p className="text-sm text-zinc-400">Airport buffer</p>
                      <p className="text-sm font-semibold text-white">{fmtDuration(defaultBuffer)}</p>
                    </div>
                  </div>
                )}
              </div>

            ) : (
              /* ── CAPABILITY STATE — no route inputs yet (default / initial) ── */
              <div className="rounded-xl border border-zinc-700/50 bg-zinc-800/50 p-5">
                <p className="text-sm font-semibold text-white">Get your personalized leave time</p>
                <p className="mt-1 text-xs leading-relaxed text-zinc-500">
                  Add your starting location and airport — we&apos;ll calculate:
                </p>

                <div className="mt-4 space-y-2">
                  {[
                    "Real-time traffic conditions",
                    "TSA wait estimates for your airport",
                    "Parking and terminal timing",
                    "Domestic vs international buffer",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <span className="flex-shrink-0 text-xs text-green-500">✓</span>
                      <span className="text-xs text-zinc-300">{item}</span>
                    </div>
                  ))}
                </div>

                {/* Example — clearly labeled, not the user's result */}
                <div className="mt-5 rounded-lg border border-zinc-700/40 bg-zinc-800/60 px-4 py-3">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-600">
                    Example result
                  </p>
                  <div className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="text-xs text-zinc-500">1:00 PM · JFK departure</span>
                    <span className="text-zinc-700">·</span>
                    <span className="text-sm font-bold text-zinc-400">Leave by 8:43 AM</span>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Spacer so mobile sticky bar doesn't obscure bottom content */}
        {computedResult && <div className="h-20 lg:hidden" />}
      </div>

      {/* ── Mobile sticky leave-time bar ── */}
      {computedResult && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-zinc-800 bg-zinc-950/95 px-4 py-3 backdrop-blur-sm">
          <div className="mx-auto flex max-w-lg items-center justify-between gap-4">
            <div>
              <p className="text-[10px] font-medium text-zinc-500">Leave by</p>
              <p className="text-2xl font-black leading-tight text-green-500">
                {fmtTime(computedResult.leaveTime)}
              </p>
            </div>
            {calendarAdded ? (
              <span className="flex items-center gap-1.5 text-sm font-semibold text-green-400">
                <span>✓</span>
                <span>Saved</span>
              </span>
            ) : (
              <a
                href={buildGCalLink(computedResult.leaveTime, airport)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => { track("calendar_link_clicked_mobile_sticky"); setCalendarAdded(true); }}
                className="flex flex-shrink-0 items-center gap-1.5 rounded-full border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm font-semibold text-white transition-colors active:bg-zinc-700"
              >
                <span>📅</span>
                <span>Add to Calendar</span>
              </a>
            )}
          </div>
        </div>
      )}
    </>
  );
}
