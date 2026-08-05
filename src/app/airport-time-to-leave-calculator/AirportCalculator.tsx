"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { AppStoreButton } from "@/components/CTAButton";
import CalculationFactorList from "@/components/leave-time/CalculationFactorList";
import PlanningEstimateNotice from "@/components/leave-time/PlanningEstimateNotice";
import PlaceAutocomplete from "@/components/PlaceAutocomplete";
import CurrentLocationControl from "@/components/CurrentLocationControl";
import {
  trackAutomaticAlertCTAViewed,
  trackCalculatorCompleted,
  trackCalculatorStarted,
} from "@/lib/analytics";
import type { SecurityEstimate } from "@/app/api/security-wait/route";
import type { CalculatorExample } from "@/lib/travel-locations";
import {
  leaveTimePlanner,
  type CalculationFactor,
  type PlanningMode,
  type TrafficBasis,
  type TravelSource,
} from "@/core/leave-time";
import {
  AirportPlugin,
  airportEventTypeFor,
  createAirportDestination,
  getAirportBaseBufferMinutes,
  getAirportDefaultSecurityMinutes,
  type AirportArrivalMode,
  type AirportFlightType,
  type AirportPlanningContext,
} from "@/core/leave-time/plugins/airports";

// ─── Types ────────────────────────────────────────────────────────────────────

type FlightType = AirportFlightType;
type ArrivalMode = AirportArrivalMode;
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
  trafficBasis: TrafficBasis;
  planningMode: PlanningMode;
  confidence: Confidence;
  factors: CalculationFactor[];
}

// ─── API helpers ──────────────────────────────────────────────────────────────

async function fetchSecurityEstimate(
  airport: string,
  departureUnix: number | null,
  flightType: FlightType,
  hasPreCheck: boolean,
  hasClear: boolean,
  jurisdiction: "us" | "international"
): Promise<SecurityEstimate | null> {
  try {
    const params = new URLSearchParams({
      airport,
      flightType,
      hasPreCheck: hasPreCheck.toString(),
      hasClear: hasClear.toString(),
      jurisdiction,
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
  trafficBasis: TrafficBasis;
  cacheHit: boolean;
  error?: string;
}

async function fetchTravelTime(
  origin: string,
  destination: string,
  departureAt: Date,
  travelMode: "DRIVE" | "TRANSIT" = "DRIVE"
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
  return d.toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" });
}

function fmtDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m === 0 ? `${h} hr` : `${h} hr ${m} min`;
}

function factorMinutes(
  result: ComputedResult,
  key: string,
  fallback: number
): number {
  return result.factors.find((factor) => factor.key === key)?.minutes ?? fallback;
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

function localDateString(date = new Date()): string {
  return date.toLocaleDateString("en-CA");
}

function planningModeForDate(date: string): PlanningMode {
  return date === localDateString() ? "today" : "future";
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
  "min-h-12 min-w-0 w-full max-w-full touch-manipulation rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-3 text-base text-white placeholder-zinc-500 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 sm:py-2 sm:text-sm";

const timeInputClass = `${inputClass} block h-12 appearance-none box-border py-0 [color-scheme:dark]`;

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

interface AirportCalculatorProps {
  initialAirport?: string;
  locationCode?: string;
  example?: CalculatorExample;
  genericRedesign?: boolean;
  planningJurisdiction?: "us" | "international";
  shortHaulLabel?: string;
  longHaulLabel?: string;
  securityLabel?: string;
}

const genericExample: CalculatorExample = {
  eyebrow: "Example Time to Leave",
  summary: "1:00 PM flight · driving and parking",
  leaveTime: "Leave by 8:43 AM",
  breakdown: ["Personalize the calculator with your route and flight"],
};

export default function AirportCalculator({
  initialAirport = "",
  locationCode,
  example = genericExample,
  genericRedesign = false,
  planningJurisdiction = "us",
  shortHaulLabel = "Domestic",
  longHaulLabel = "International",
  securityLabel = planningJurisdiction === "international" ? "Airport security" : "TSA security",
}: AirportCalculatorProps) {
  const today = localDateString();
  const { date: defaultDate, time: defaultTime } = defaultDeparture();

  // ── Form state ──────────────────────────────────────────────────────────────
  const [departureDate, setDepartureDate] = useState(defaultDate);
  const [planningMode, setPlanningMode] = useState<PlanningMode>(() => planningModeForDate(defaultDate));
  const [departureTime, setDepartureTime] = useState(defaultTime);
  const [flightType, setFlightType] = useState<FlightType>("domestic");
  const [origin, setOrigin] = useState("");
  const [currentLocation, setCurrentLocation] = useState<string | null>(null);
  const [airport, setAirport] = useState(initialAirport);

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
  const [trafficBasis, setTrafficBasis] = useState<TrafficBasis>("none");
  const [isFetchingTravel, setIsFetchingTravel] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fallbackNotice, setFallbackNotice] = useState<string | null>(null);

  // ── Interaction state ───────────────────────────────────────────────────────
  const [calendarAdded, setCalendarAdded] = useState(false);
  const [showBreakdown, setShowBreakdown] = useState(!genericRedesign);
  const [formExpanded, setFormExpanded] = useState(true);

  const securityDebounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const resultPanelRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    setError(null);
    setFallbackNotice(null);
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
      const estimate = await fetchSecurityEstimate(
        airport,
        departureUnix,
        flightType,
        hasPreCheck,
        hasClear,
        planningJurisdiction
      );
      setSecurityEstimate(estimate);
      setIsFetchingSecurityEstimate(false);
    }, 500);
    return () => clearTimeout(securityDebounceRef.current);
  }, [airport, departureDate, departureTime, flightType, hasPreCheck, hasClear, planningJurisdiction]);

  // Route estimates are intentionally fetched only on explicit calculate.
  // Changing route/time inputs invalidates any prior automatic result.
  useEffect(() => {
    setTravelMins(null);
    setTravelSource(null);
    setHasTrafficData(false);
    setTrafficBasis("none");
    setIsFetchingTravel(false);
  }, [origin, airport, departureDate, departureTime]);

  // ── Derived values ──────────────────────────────────────────────────────────
  const baseBuffer = getAirportBaseBufferMinutes(flightType, hasCheckedBag, arrivalMode);
  const estimatedSecurityMins = securityEstimate?.avg ?? getAirportDefaultSecurityMinutes(flightType);
  const defaultBuffer = baseBuffer + estimatedSecurityMins;
  const hasRouteInputs = origin.trim().length >= 2 && airport.trim().length >= 2;

  function handleOriginChange(value: string) {
    setOrigin(value);
    setCurrentLocation(null);
  }

  function handleCurrentLocationChange(coordinates: string | null) {
    setCurrentLocation(coordinates);
    if (coordinates) setOrigin("Current location");
    else if (origin === "Current location") setOrigin("");
  }
  const manualDriveMinutes = parseInt(manualTravelMinutes, 10);
  const hasManualDriveTime = !isNaN(manualDriveMinutes) && manualDriveMinutes >= 0;
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
    flightType === "international" ? longHaulLabel.toLowerCase() : shortHaulLabel.toLowerCase(),
    arrivalMode === "parking" ? "parking" : null,
    arrivalMode === "transit" ? "public transit" : null,
    hasCheckedBag ? "bag drop" : null,
  ].filter(Boolean).join(" · ");

  // Core trust signals shown in the collapsed smart-timing card (always visible)
  const coreTrustSignals = [
    hasAirport && airportShortDisplay
      ? `${securityLabel} (${airportShortDisplay})`
      : `${securityLabel} time`,
    arrivalMode === "transit" ? "Station and terminal transfer" : "Parking or curb access",
    `${flightType === "international" ? longHaulLabel : shortHaulLabel} timing`,
    planningMode === "future" ? "Expected traffic" : "Live traffic conditions",
  ];

  const includedSignals = [
    planningMode === "future" ? "Expected traffic" : "Live traffic",
    `${securityLabel} time`,
    arrivalMode === "transit" ? "Transit and terminal walking" : "Parking and terminal walking",
    "Time inside the airport",
    `${flightType === "international" ? longHaulLabel : shortHaulLabel} recommendations`,
  ];

  function handlePlanningModeChange(mode: PlanningMode) {
    setPlanningMode(mode);
    if (mode === "today") setDepartureDate(localDateString());
  }

  function handleDepartureDateChange(date: string) {
    setDepartureDate(date);
    setPlanningMode(planningModeForDate(date));
  }

  // ── Computed result ─────────────────────────────────────────────────────────
  const computedResult = useMemo((): ComputedResult | null => {
    if (!departureDate || !departureTime) return null;
    const [year, month, day] = departureDate.split("-").map(Number);
    const [hour, minute] = departureTime.split(":").map(Number);
    const departure = new Date(year, month - 1, day, hour, minute, 0);
    if (isNaN(departure.getTime())) return null;

    const planningContext: AirportPlanningContext = {
      flightType,
      arrivalMode,
      hasCheckedBag,
      estimatedSecurityMinutes: estimatedSecurityMins,
      travelMinutes: travelMins,
      manualTravelMinutesInput: manualTravelMinutes,
      travelSource,
      hasTrafficData,
      trafficBasis,
      planningMode,
      useSecurityOverride: showSecurityOverride,
      customSecurityMinutesInput: customSecurityMinutes,
      useAirportBufferOverride: showBufferOverride,
      customAirportBufferMinutesInput: customBuffer,
      securityLabel,
      securitySourceLabel: planningJurisdiction === "international" ? "airport security estimate" : "TSA estimate",
    };

    const result = leaveTimePlanner.plan(
      {
        destination: createAirportDestination(airport),
        eventType: airportEventTypeFor(flightType),
        targetTime: departure,
        context: planningContext,
      },
      AirportPlugin
    );

    if (!result) return null;

    return {
      arrivalTime: result.arriveBy,
      leaveTime: result.leaveAt,
      bufferMinutes: result.totalBufferMinutes,
      baseBufferMinutes: Number(result.metadata?.baseBufferMinutes ?? 0),
      securityMinutes: Number(result.metadata?.securityMinutes ?? 0),
      travelMinutes: result.travelMinutes,
      travelSource: travelSource ?? "manual",
      hasTrafficData,
      trafficBasis,
      planningMode,
      confidence: result.confidence,
      factors: result.factors,
    };
  }, [departureDate, departureTime, travelMins, travelSource, hasTrafficData, trafficBasis,
      estimatedSecurityMins, baseBuffer, defaultBuffer, showSecurityOverride,
      customSecurityMinutes, showBufferOverride, customBuffer, manualTravelMinutes,
      planningMode, flightType, arrivalMode, hasCheckedBag, airport, securityLabel, planningJurisdiction]);

  const resultHeroMode = genericRedesign && computedResult !== null;

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

  useEffect(() => {
    if (
      !genericRedesign &&
      computedResult &&
      typeof window !== "undefined" &&
      window.innerWidth < 1024
    ) {
      setFormExpanded(false);
    }
  }, [computedResult, genericRedesign]);

  useEffect(() => {
    if (!genericRedesign || !computedResult || typeof window === "undefined") return;
    if (window.innerWidth >= 1024) return;
    window.requestAnimationFrame(() => {
      resultPanelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [computedResult, genericRedesign]);

  useEffect(() => {
    if (!computedResult) return;
    trackAutomaticAlertCTAViewed("airport_leave_time", "result_automatic_alert");
  }, [computedResult]);


  // ── Manual calculate fallback ───────────────────────────────────────────────
  async function handleCalculate() {
    setError(null);
    if (!departureDate || !departureTime) {
      setError("Enter your flight departure date and time.");
      return;
    }
    trackCalculatorStarted("airport_leave_time", {
      flight_type: flightType,
      arrival_mode: arrivalMode,
    });
    const [year, month, day] = departureDate.split("-").map(Number);
    const [hour, minute] = departureTime.split(":").map(Number);
    const departure = new Date(year, month - 1, day, hour, minute, 0);

    if (hasRouteInputs) {
      setIsFetchingTravel(true);
      try {
        const res = await fetchTravelTime(
          currentLocation ?? origin,
          airport,
          departure,
          arrivalMode === "transit" ? "TRANSIT" : "DRIVE"
        );
        setTravelMins(res.durationMinutes);
        setTravelSource("google");
        setHasTrafficData(res.hasTrafficData);
        setTrafficBasis(res.trafficBasis);
        track("routes_api_called", { duration_minutes: res.durationMinutes, trigger: "manual" });
      } catch {
        const manual = parseInt(manualTravelMinutes, 10);
        if (!isNaN(manual) && manual >= 0) {
          setTravelMins(manual);
          setTravelSource("manual");
          setHasTrafficData(false);
          setTrafficBasis("none");
          track("quota_fallback_used");
        } else {
          setShowRefinements(true);
          setShowManualDriveTime(true);
          setFormExpanded(true);
          setFallbackNotice("Automatic travel time did not load. Enter the journey time below to calculate manually.");
        }
      } finally {
        setIsFetchingTravel(false);
      }
    } else {
      if (!hasManualDriveTime) {
        setShowRefinements(true);
        setShowManualDriveTime(true);
        setFormExpanded(true);
        setFallbackNotice("Enter your starting location for automatic travel time, or enter the journey time manually below.");
        return;
      }
      setTravelMins(manualDriveMinutes);
      setTravelSource("manual");
      setHasTrafficData(false);
      setTrafficBasis("none");
    }
    track("calculator_used", {
      flight_type: flightType,
      arrival_mode: arrivalMode,
      trigger: "manual",
      ...(locationCode ? { location_code: locationCode } : {}),
    });
    trackCalculatorCompleted("airport_leave_time", {
      flight_type: flightType,
      arrival_mode: arrivalMode,
      travel_source: hasRouteInputs ? "google_or_fallback" : "manual",
      ...(locationCode ? { location_code: locationCode } : {}),
    });
  }

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <>
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 sm:p-6">
        <div className={`grid gap-6 ${
          resultHeroMode
            ? "lg:grid-cols-[minmax(0,1.25fr)_minmax(320px,0.75fr)] lg:items-start"
            : "lg:grid-cols-[1fr_1fr] lg:gap-8"
        }`}>

          {/* ══ Inputs ════════════════════════════════════════════════════════ */}
          <div
            className={`${computedResult ? "order-2" : "order-1"} space-y-4 ${
              resultHeroMode ? "lg:order-2 lg:opacity-80" : "lg:order-1"
            }`}
          >

            {!genericRedesign && (
              <button
                type="button"
                className="flex w-full items-center justify-between rounded-lg border border-zinc-800 bg-zinc-800/50 px-4 py-3 text-sm font-semibold text-zinc-300 transition-colors hover:bg-zinc-800 lg:hidden"
                onClick={() => setFormExpanded(!formExpanded)}
                aria-expanded={formExpanded}
                aria-controls="airport-calculator-form"
              >
                <span>{computedResult ? "Adjust flight details" : "Enter flight details"}</span>
                <span
                  className={`text-xs text-zinc-500 transition-transform duration-200 ${
                    formExpanded ? "rotate-180" : ""
                  }`}
                >
                  ▾
                </span>
              </button>
            )}

            <div
              id="airport-calculator-form"
              className={`space-y-4 ${genericRedesign || formExpanded ? "block" : "hidden lg:block"}`}
            >

            {/* Planning mode + time */}
            <div className={genericRedesign ? `rounded-xl border p-4 ${
              resultHeroMode ? "border-zinc-800/70 bg-zinc-950/25" : "border-zinc-800 bg-zinc-950/40"
            }` : ""}>
              {genericRedesign && (
                <p className="mb-4 text-sm font-bold text-white">
                  {resultHeroMode ? "Edit Trip" : "Your Trip"}
                </p>
              )}
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
                        value={departureDate}
                        min={today}
                        onChange={(e) => handleDepartureDateChange(e.target.value)}
                        className={`${inputClass} [color-scheme:dark]`}
                      />
                    </div>
                  )}
                </div>
                <div className="min-w-0">
                  <FieldLabel>Departure time</FieldLabel>
                  <input
                    type="time"
                    value={departureTime}
                    onChange={(e) => setDepartureTime(e.target.value)}
                    className={timeInputClass}
                  />
                </div>
              </div>

              {/* Flight type */}
              <div className={genericRedesign ? "mt-4" : "mt-4"}>
                <FieldLabel>Flight type</FieldLabel>
                <SegmentedControl
                  options={[
                      { value: "domestic", label: shortHaulLabel },
                      { value: "international", label: longHaulLabel },
                  ]}
                  value={flightType}
                  onChange={setFlightType}
                />
              </div>
            </div>

            {/* Route */}
            <div className={genericRedesign ? `rounded-xl border p-4 ${
              resultHeroMode ? "border-zinc-800/70 bg-zinc-950/25" : "border-zinc-800 bg-zinc-950/40"
            }` : ""}>
              {genericRedesign && (
                <p className="mb-4 text-sm font-bold text-white">Route</p>
              )}
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="min-w-0">
                  <FieldLabel>Leaving from</FieldLabel>
                  <PlaceAutocomplete
                    value={origin}
                    onChange={handleOriginChange}
                    placeholder="Your address or city"
                    inputClassName={inputClass}
                  />
                  <CurrentLocationControl
                    active={currentLocation !== null}
                    onLocationChange={handleCurrentLocationChange}
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
            </div>

            <button
              type="button"
              onClick={handleCalculate}
              disabled={
                !departureDate ||
                !departureTime ||
                airport.trim().length < 2 ||
                (!hasRouteInputs && !hasManualDriveTime) ||
                isFetchingTravel
              }
              className={`w-full rounded-full px-6 py-3 font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
                resultHeroMode
                  ? "border border-zinc-600 bg-zinc-800 text-zinc-100 hover:border-zinc-500 hover:bg-zinc-700"
                  : "bg-green-500 text-black hover:bg-green-400"
              }`}
            >
              {isFetchingTravel
                ? "Calculating leave time..."
                : resultHeroMode
                  ? "Update Leave Time"
                  : genericRedesign
                  ? "Show My Leave Time"
                  : "Calculate leave time"}
            </button>
            {airport.trim().length < 2 && (
              <p className="text-center text-xs text-zinc-500">
                Add your airport to calculate.
              </p>
            )}
            {airport.trim().length >= 2 && !origin.trim() && !hasManualDriveTime && (
              <p className="text-center text-xs text-zinc-500">
                Add where you are leaving from, or enter the journey time manually.
              </p>
            )}

            {/* Smart airport timing card */}
            <div className={`rounded-xl border p-4 ${
              resultHeroMode ? "border-zinc-800 bg-zinc-900/60" : "border-zinc-700 bg-zinc-800/70"
            }`}>

              {/* Header */}
              <div className="flex items-center gap-2">
                <span className={`text-base leading-none ${resultHeroMode ? "text-zinc-500" : "text-green-500"}`}>✓</span>
                <p className="text-sm font-semibold text-white">
                  {genericRedesign ? "Already Included" : "Smart airport timing enabled"}
                </p>
              </div>
              {!genericRedesign && (
                <p className="mt-1 text-xs leading-relaxed text-zinc-500">
                  We automatically account for the timing factors most travelers miss.
                </p>
              )}

              {/* Trust signals — 2-column grid */}
              <div className={`${genericRedesign ? "grid" : "hidden sm:grid"} mt-3 grid-cols-1 gap-x-4 gap-y-1.5 sm:grid-cols-2`}>
                {coreTrustSignals.map((item) => (
                  <div key={item} className="flex items-center gap-1.5">
                    <span className={`flex-shrink-0 text-xs ${resultHeroMode ? "text-zinc-500" : "text-green-500"}`}>✓</span>
                    <span className="text-xs text-zinc-300">{item}</span>
                  </div>
                ))}
                {hasCheckedBag && (
                  <div className="flex items-center gap-1.5">
                    <span className={`flex-shrink-0 text-xs ${resultHeroMode ? "text-zinc-500" : "text-green-500"}`}>✓</span>
                    <span className="text-xs text-zinc-300">Bag drop time</span>
                  </div>
                )}
                {(hasPreCheck || hasClear) && (
                  <div className="flex items-center gap-1.5">
                    <span className={`flex-shrink-0 text-xs ${resultHeroMode ? "text-zinc-500" : "text-green-500"}`}>✓</span>
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
                  <span>
                    {showRefinements
                      ? genericRedesign ? "Hide advanced options" : "Hide assumptions"
                      : genericRedesign ? "Advanced Options" : "Customize timing assumptions"}
                  </span>
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
                  {planningJurisdiction === "us" && <div>
                    <FieldLabel>Trusted traveler programs</FieldLabel>
                    <div className="flex flex-wrap gap-2">
                      <Toggle checked={hasPreCheck} onChange={setHasPreCheck} label="TSA PreCheck / Global Entry" />
                      <Toggle checked={hasClear} onChange={setHasClear} label="CLEAR" />
                    </div>
                  </div>}
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
                        { value: "transit", label: "Public transit" },
                      ]}
                      value={arrivalMode}
                      onChange={setArrivalMode}
                    />
                  </div>
                  <div>
                    <FieldLabel>{arrivalMode === "transit" ? "Transit time" : "Drive time"}</FieldLabel>
                    {!showManualDriveTime ? (
                      <div>
                        <p className="text-sm text-zinc-400">
                          Estimated automatically from your locations for the selected travel mode.
                        </p>
                        <button
                          type="button"
                          onClick={() => setShowManualDriveTime(true)}
                          className="mt-1.5 text-xs text-zinc-400 underline underline-offset-2 hover:text-zinc-300"
                        >
                          Enter travel time manually instead
                        </button>
                      </div>
                    ) : (
                      <div>
                        <input
                          type="number"
                          min="0"
                          max="2880"
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
              </div>
            )}
            {fallbackNotice && !error && (
              <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3">
                <p className="text-sm text-amber-200">{fallbackNotice}</p>
              </div>
            )}

            </div>
          </div>

          {/* ══ Result panel ══════════════════════════════════════════════════ */}
          <div
            ref={resultPanelRef}
            className={`${computedResult ? "order-1" : "order-2"} scroll-mt-28 flex flex-col ${
              resultHeroMode ? "lg:order-1" : "lg:order-2 lg:sticky lg:top-6 lg:self-start"
            }`}
          >

            {computedResult ? (
              /* ── COMPLETE ── */
              <div
                className={`rounded-xl border p-5 transition-all duration-300 ${
                  resultHeroMode
                    ? "border-green-500/30 bg-zinc-900 shadow-[0_0_40px_rgba(34,197,94,0.08)] sm:p-7"
                    : "border-zinc-700 bg-zinc-800/80"
                }`}
              >

                {departureTime && (
                  <p className="mb-2 text-xs text-zinc-500">
                    For your {fmtDepartureTime(departureTime)} {flightType} flight
                  </p>
                )}

                {/* Hero */}
                <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Leave by</p>
                <p className={`mt-1 whitespace-nowrap font-black leading-none text-green-500 ${
                  resultHeroMode ? "text-6xl sm:text-8xl" : "text-6xl sm:text-7xl"
                }`}>
                  {fmtTime(computedResult.leaveTime)}
                </p>
                <p className="mt-2 text-base text-zinc-300">{fmtDate(computedResult.leaveTime)}</p>
                <div className="mt-1.5">
                  <ConfidenceBadge confidence={computedResult.confidence} />
                </div>

                {genericRedesign && departureTime && (
                  <div className="mt-5 rounded-lg border border-zinc-700/60 bg-zinc-950/50 p-4">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <p className="text-sm font-semibold text-white">Why this recommendation?</p>
                      <p className="text-xs text-zinc-500">
                        {fmtDepartureTime(departureTime)} {flightType} flight
                      </p>
                    </div>
                    <div className="mt-3">
                      <CalculationFactorList
                        factors={computedResult.factors}
                        formatDuration={fmtDuration}
                      />
                    </div>
                  </div>
                )}

                {/* Inline summary — actual numbers, not category labels */}
                <p className="mt-3 text-xs text-zinc-500">
                  {fmtDuration(factorMinutes(computedResult, "travel", computedResult.travelMinutes))} drive
                  {" · "}
                  {fmtDuration(factorMinutes(computedResult, "tsa_security", computedResult.securityMinutes))} security
                  {" · "}
                  {fmtDuration(factorMinutes(computedResult, "airport_buffer", computedResult.baseBufferMinutes))} buffer
                </p>

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
                      onClick={() => {
                        track("calendar_link_clicked", locationCode ? { location_code: locationCode } : undefined);
                        setCalendarAdded(true);
                      }}
                      className="flex w-full items-center justify-center gap-2 rounded-lg border border-zinc-600 bg-zinc-700 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:border-zinc-500 hover:bg-zinc-600"
                    >
                      <span>📅</span>
                      <span>Add Leave Time to Calendar</span>
                    </a>
                  )}
                </div>

                {/* App download CTA — recurring solution before optional details */}
                <div className="mt-5 border-t border-zinc-800 pt-5">
                  <p className="text-base font-bold text-white">
                    {genericRedesign ? "Never be late again." : "Get this alert automatically."}
                  </p>
                  {genericRedesign ? (
                    <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">
                      OnTimer automatically reminds you when it&apos;s time to leave—for flights, meetings, appointments, and more.
                    </p>
                  ) : (
                    <>
                      <p className="mt-1.5 text-xs leading-relaxed text-zinc-400">
                        OnTimer can use your calendar location to alert you when it&apos;s time to leave,
                        so you do not have to repeat this calculation next trip. It fires a real alarm
                        with sound and haptics—not a notification you&apos;ll swipe away.
                      </p>
                      <p className="mt-1 text-[10px] text-zinc-500">
                        Works for flights, meetings, and any calendar event with a location.
                      </p>
                    </>
                  )}
                  <div className="mt-4">
                    <AppStoreButton
                      size="md"
                      label={genericRedesign ? "Get Leave Time Alerts" : "Download on the App Store"}
                      className={genericRedesign ? "justify-center" : "w-full justify-center"}
                      location={locationCode
                        ? `airport_${locationCode.toLowerCase()}_result`
                        : "airport_calculator_inline"}
                      analyticsContext={{
                        calculator_type: "airport_leave_time",
                        cta_variant: "result_automatic_alert",
                        ...(locationCode ? { location_code: locationCode } : {}),
                      }}
                    />
                    {genericRedesign && (
                      <p className="mt-2 text-[11px] text-zinc-500">
                        Download on the App Store
                      </p>
                    )}
                  </div>
                </div>

                {/* Timing details stay available without interrupting the conversion flow. */}
                <div className="mt-5 border-t border-zinc-800 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowBreakdown(!showBreakdown)}
                    className="flex items-center gap-1.5 text-xs text-zinc-500 transition-colors hover:text-zinc-400"
                    aria-expanded={showBreakdown}
                    aria-controls="airport-timing-breakdown"
                  >
                    <span>{showBreakdown ? "▾" : "▸"}</span>
                    <span>{showBreakdown ? "Hide timing breakdown" : "See timing breakdown"}</span>
                  </button>

                  {showBreakdown && (
                    <div id="airport-timing-breakdown" className="mt-4">
                      <CalculationFactorList
                        factors={computedResult.factors}
                        formatDuration={fmtDuration}
                        variant="breakdown"
                      />
                      <div className="flex items-baseline justify-between border-t border-zinc-800 pt-3">
                        <p className="text-sm text-zinc-400">Arrive at airport by</p>
                        <p className="text-sm font-semibold text-white">{fmtTime(computedResult.arrivalTime)}</p>
                      </div>
                    </div>
                  )}
                </div>

                {genericRedesign && (
                  <PlanningEstimateNotice requirement="verify airline and airport requirements before leaving." />
                )}
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
                  <p className="whitespace-nowrap text-6xl font-black leading-none text-zinc-600 sm:text-7xl">—:—</p>
                  <span className="mb-1.5 animate-pulse text-xs text-zinc-500">calculating…</span>
                </div>
                <p className="mt-3 text-xs text-zinc-500">
                  {planningMode === "future"
                    ? "Estimating expected traffic for your trip time"
                    : "Fetching live traffic for your route"}
                </p>
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
                <p className="text-sm font-semibold text-white">
                  {genericRedesign ? "Your leave time includes" : "Get your personalized leave time"}
                </p>
                {!genericRedesign && (
                  <p className="mt-1 text-xs leading-relaxed text-zinc-500">
                    Add your starting location and airport — we&apos;ll calculate:
                  </p>
                )}

                <div className="mt-4 space-y-2">
                  {(genericRedesign ? includedSignals : [
                    planningMode === "future" ? "Expected traffic for your trip time" : "Real-time traffic conditions",
                    `${securityLabel} time for your airport`,
                    "Parking and terminal timing",
                    "Domestic vs international buffer",
                  ]).map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <span className="flex-shrink-0 text-xs text-green-500">✓</span>
                      <span className="text-xs text-zinc-300">{item}</span>
                    </div>
                  ))}
                </div>

                {/* Example — clearly labeled, not the user's result */}
                <div className="mt-5 rounded-lg border border-zinc-700/40 bg-zinc-800/60 px-4 py-3">
                  <p className="text-xs font-semibold text-zinc-300">
                    {genericRedesign ? "Example Time to Leave" : example.eyebrow}
                  </p>
                  <div className="mt-2">
                    <p className="text-xs text-zinc-400">{example.summary}</p>
                    <p className="mt-1 text-lg font-bold text-zinc-200">{example.leaveTime}</p>
                    <ul className="mt-2 space-y-1">
                      {example.breakdown.map((item) => (
                        <li key={item} className="text-[11px] text-zinc-500">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Spacer so mobile sticky bar doesn't obscure bottom content */}
        {computedResult && !genericRedesign && <div className="h-20 lg:hidden" />}
      </div>

      {/* ── Mobile sticky leave-time bar ── */}
      {computedResult && !genericRedesign && (
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
                onClick={() => {
                  track(
                    "calendar_link_clicked_mobile_sticky",
                    locationCode ? { location_code: locationCode } : undefined
                  );
                  setCalendarAdded(true);
                }}
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
