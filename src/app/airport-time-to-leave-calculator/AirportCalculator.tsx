"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { AppStoreButton } from "@/components/CTAButton";
import CalculationFactorList from "@/components/leave-time/CalculationFactorList";
import CalendarOnTimerHandoff from "@/components/leave-time/CalendarOnTimerHandoff";
import CalculatorDateField from "@/components/leave-time/CalculatorDateField";
import PlanningEstimateNotice from "@/components/leave-time/PlanningEstimateNotice";
import PlaceAutocomplete from "@/components/PlaceAutocomplete";
import AirportAutocomplete from "@/components/AirportAutocomplete";
import CurrentLocationControl from "@/components/CurrentLocationControl";
import { fireEvent, trackCalculatorCompleted, trackCalculatorStarted } from "@/lib/analytics";
import { buildGoogleCalendarLink, buildIcsCalendarDataUri, ONTIMER_CALENDAR_DESCRIPTION } from "@/lib/calendar-links";
import { getAirportDepartureStatus } from "@/lib/airport-departure-status";
import type { SecurityEstimate } from "@/lib/airport-security";
import type { CalculatorExample } from "@/lib/travel-locations";
import {
  buildAirportCalendarLocation,
  type AirportAutocompleteOption,
} from "@/lib/airport-autocomplete";
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
import type { SiteLocale } from "@/lib/i18n";

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

const airportCopy = {
  en: {
    airportSecurity: "Airport security", tsaSecurity: "TSA security", currentLocation: "Current location",
    leaveFor: "Leave for", airportFallback: "airport", parking: "parking", transit: "public transit", bagDrop: "bag drop",
    stationTransfer: "Station and terminal transfer", parkingAccess: "Parking or curb access", timing: "timing",
    expectedTraffic: "Expected traffic", liveTraffic: "Live traffic", liveTrafficConditions: "Live traffic conditions",
    transitWalking: "Transit and terminal walking", parkingWalking: "Parking and terminal walking", insideAirport: "Time inside the airport", recommendations: "recommendations",
    dateTimeError: "Enter your flight departure date and time.", autoTravelError: "Automatic travel time did not load. Enter the journey time below to calculate manually.",
    startError: "Enter your starting location for automatic travel time, or enter the journey time manually below.",
    adjustFlight: "Adjust flight details", enterFlight: "Enter flight details", editTrip: "Edit Trip", yourTrip: "Your Trip",
    flightDate: "Flight date", flightDeparts: "Flight departs at", flightType: "Flight type", domestic: "Domestic", international: "International",
    route: "Route", leavingFrom: "Leaving from", addressCity: "Your address or city", departureAirport: "Departure airport",
    airportPlaceholder: "Departure airport name or IATA code", airportExample: "e.g. JFK, LAX, Newark",
    calculating: "Calculating leave time...", update: "Update Leave Time", show: "Show My Leave Time", calculate: "Calculate leave time",
    addAirport: "Add your airport to calculate.", addOrigin: "Add where you are leaving from, or enter the journey time manually.",
    whatWeUse: "What we use", smartTiming: "Smart airport timing enabled", smartTimingBody: "We automatically account for the timing factors most travelers miss.",
    bagDropTime: "Bag drop time", hideAdjustments: "Hide adjustments", hideAssumptions: "Hide assumptions", adjustAssumptions: "Adjust assumptions", customize: "Customize timing assumptions", modified: "modified",
    trustedPrograms: "Trusted traveler programs", bags: "Bags", checkingBag: "Checking a bag", gettingThere: "Getting to the airport by",
    parkingMode: "Parking", rideshare: "Rideshare", dropoff: "Drop-off", publicTransit: "Public transit", transitTime: "Transit time", driveTime: "Drive time",
    automaticTravel: "Estimated automatically from your locations for the selected travel mode.", manualTravel: "Enter travel time manually instead", example35: "e.g. 35",
    automaticInstead: "Use automatic estimate instead", recommendedBuffer: "Use recommended buffer", adjustBuffer: "Adjust airport arrival buffer", recommended: "recommended",
    recommendedPlaceholder: "Recommended", bufferHelp: "How early to arrive at the airport before your flight.", adjustSecurity: "Adjust security time manually", customSecurity: "Custom security time", auto: "Auto", estimatedInstead: "Use estimated time instead",
    forFlight: "For your", flight: "flight", leaveBy: "Leave by", drive: "drive", security: "security", arriveBy: "Arrive by",
    parkingIncluded: "Parking included", transferIncluded: "Terminal transfer included", rideshareIncluded: "Rideshare access included", dropoffIncluded: "Drop-off access included", bagIncluded: "Bag drop included",
    alarmHeading: "Don’t be late. Turn this into an alarm.", alarmBody: "OnTimer sets an automatic alarm for this calendar event.",
    hideDetails: "Hide calculation details", howCalculated: "How we calculated your leave time", arriveAirport: "Arrive at airport by", requirement: "verify airline and airport requirements before leaving.",
    calculatingShort: "calculating…", estimateExpected: "Estimating expected traffic for your trip time", fetchingLive: "Fetching live traffic for your route", airportBuffer: "Airport buffer",
    calendarDetails: ONTIMER_CALENDAR_DESCRIPTION,
  },
  es: {
    airportSecurity: "Seguridad del aeropuerto", tsaSecurity: "Control de seguridad TSA", currentLocation: "Ubicación actual",
    leaveFor: "Salir hacia", airportFallback: "el aeropuerto", parking: "aparcamiento", transit: "transporte público", bagDrop: "facturación de equipaje",
    stationTransfer: "Traslado a la estación y la terminal", parkingAccess: "Aparcamiento o acceso a la terminal", timing: "planificación",
    expectedTraffic: "Tráfico previsto", liveTraffic: "Tráfico en tiempo real", liveTrafficConditions: "Condiciones de tráfico en tiempo real",
    transitWalking: "Transporte y recorrido por la terminal", parkingWalking: "Aparcamiento y recorrido por la terminal", insideAirport: "Tiempo dentro del aeropuerto", recommendations: "recomendaciones",
    dateTimeError: "Indica la fecha y la hora de salida del vuelo.", autoTravelError: "No se pudo calcular el trayecto automáticamente. Indica abajo el tiempo de viaje para continuar.",
    startError: "Indica tu punto de partida para calcular el trayecto automáticamente o escribe el tiempo de viaje abajo.",
    adjustFlight: "Modificar datos del vuelo", enterFlight: "Introduce los datos del vuelo", editTrip: "Editar viaje", yourTrip: "Tu viaje",
    flightDate: "Fecha del vuelo", flightDeparts: "El vuelo sale a las", flightType: "Tipo de vuelo", domestic: "Nacional", international: "Internacional",
    route: "Trayecto", leavingFrom: "Sales desde", addressCity: "Tu dirección o ciudad", departureAirport: "Aeropuerto de salida",
    airportPlaceholder: "Nombre o código IATA del aeropuerto de salida", airportExample: "p. ej., MAD, MEX, SCL",
    calculating: "Calculando la hora de salida…", update: "Actualizar hora de salida", show: "Mostrar mi hora de salida", calculate: "Calcular hora de salida",
    addAirport: "Añade tu aeropuerto para calcular.", addOrigin: "Indica desde dónde sales o introduce el tiempo de viaje manualmente.",
    whatWeUse: "Qué tenemos en cuenta", smartTiming: "Planificación inteligente del aeropuerto", smartTimingBody: "Incluimos automáticamente los tiempos que más suelen olvidarse.",
    bagDropTime: "Tiempo para facturar equipaje", hideAdjustments: "Ocultar ajustes", hideAssumptions: "Ocultar supuestos", adjustAssumptions: "Ajustar tiempos", customize: "Personalizar tiempos", modified: "modificados",
    trustedPrograms: "Programas para viajeros autorizados", bags: "Equipaje", checkingBag: "Voy a facturar equipaje", gettingThere: "Cómo llegarás al aeropuerto",
    parkingMode: "Aparcamiento", rideshare: "VTC / taxi", dropoff: "Me dejan en la terminal", publicTransit: "Transporte público", transitTime: "Tiempo en transporte", driveTime: "Tiempo en coche",
    automaticTravel: "Calculado automáticamente con tus ubicaciones y el medio de transporte elegido.", manualTravel: "Indicar el tiempo de viaje manualmente", example35: "p. ej., 35",
    automaticInstead: "Usar el cálculo automático", recommendedBuffer: "Usar el margen recomendado", adjustBuffer: "Ajustar el margen de llegada", recommended: "recomendado",
    recommendedPlaceholder: "Recomendado", bufferHelp: "Antelación con la que quieres llegar al aeropuerto antes del vuelo.", adjustSecurity: "Ajustar manualmente el tiempo de seguridad", customSecurity: "Tiempo de seguridad personalizado", auto: "Automático", estimatedInstead: "Usar el tiempo estimado",
    forFlight: "Para tu vuelo", flight: "", leaveBy: "Sal a más tardar a las", drive: "en coche", security: "de seguridad", arriveBy: "Llega antes de las",
    parkingIncluded: "Aparcamiento incluido", transferIncluded: "Traslado a la terminal incluido", rideshareIncluded: "Acceso en VTC / taxi incluido", dropoffIncluded: "Acceso a la terminal incluido", bagIncluded: "Facturación de equipaje incluida",
    alarmHeading: "No llegues tarde. Convierte este evento en una alarma.", alarmBody: "OnTimer crea una alarma automática para este evento del calendario.",
    hideDetails: "Ocultar detalles del cálculo", howCalculated: "Cómo calculamos tu hora de salida", arriveAirport: "Llega al aeropuerto antes de las", requirement: "comprueba los requisitos de la aerolínea y el aeropuerto antes de salir.",
    calculatingShort: "calculando…", estimateExpected: "Calculando el tráfico previsto para tu viaje", fetchingLive: "Consultando el tráfico de tu ruta", airportBuffer: "Margen para el aeropuerto",
    calendarDetails: "Creado con OnTimer. Recibe alarmas automáticas para los eventos de tu calendario: https://www.ontimer.app",
  },
} as const;

// ─── API helpers ──────────────────────────────────────────────────────────────

async function fetchSecurityEstimate(
  airport: string,
  departureUnix: number | null,
  flightType: FlightType,
  hasPreCheck: boolean,
  hasClear: boolean,
  jurisdiction: "us" | "international",
  hasCheckedBag: boolean,
  arrivalMode: ArrivalMode,
  airportCode?: string
): Promise<SecurityEstimate | null> {
  try {
    const params = new URLSearchParams({
      airport,
      flightType,
      hasPreCheck: hasPreCheck.toString(),
      hasClear: hasClear.toString(),
      jurisdiction,
      hasCheckedBag: hasCheckedBag.toString(),
      arrivalMode,
    });
    if (airportCode) params.set("airportCode", airportCode);
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

/// Routes through the centralized `fireEvent` so airport-specific events inherit
/// attribution_token, landing_page, and traffic_source like every other tracked event.
function track(name: string, params?: Record<string, string | number>) {
  if (typeof window === "undefined") return;
  fireEvent(name, { page_path: window.location.pathname, ...params });
}

// ─── Formatting ───────────────────────────────────────────────────────────────

function fmtTime(d: Date, locale: SiteLocale = "en") {
  return d.toLocaleTimeString(locale === "es" ? "es-ES" : "en-US", { hour: "numeric", minute: "2-digit" });
}

function fmtDate(d: Date, locale: SiteLocale = "en") {
  return d.toLocaleDateString(locale === "es" ? "es-ES" : "en-US", { weekday: "long", month: "long", day: "numeric" });
}

function fmtDuration(minutes: number, locale: SiteLocale = "en"): string {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  const hourLabel = locale === "es" ? "h" : "hr";
  return m === 0 ? `${h} ${hourLabel}` : `${h} ${hourLabel} ${m} min`;
}

function factorMinutes(result: ComputedResult, key: string, fallback: number): number {
  return result.factors.find((factor) => factor.key === key)?.minutes ?? fallback;
}

function fmtDepartureTime(timeStr: string, locale: SiteLocale = "en"): string {
  const parts = timeStr.split(":");
  if (parts.length < 2) return "";
  const h = Number(parts[0]);
  const m = Number(parts[1]);
  if (isNaN(h) || isNaN(m)) return "";
  if (locale === "es") return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
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
  laguardia: "LGA", kennedy: "JFK", newark: "EWR", "new york": "JFK",
  "los angeles": "LAX", chicago: "ORD",
  "san francisco": "SFO", miami: "MIA", atlanta: "ATL", dallas: "DFW",
  denver: "DEN", seattle: "SEA", boston: "BOS", phoenix: "PHX",
  minneapolis: "MSP", detroit: "DTW", "las vegas": "LAS", houston: "IAH",
  "salt lake": "SLC", portland: "PDX", "san diego": "SAN", charlotte: "CLT",
  orlando: "MCO", baltimore: "BWI", washington: "DCA", philadelphia: "PHL",
  "new orleans": "MSY", nashville: "BNA", austin: "AUS", pittsburgh: "PIT",
  cleveland: "CLE", tampa: "TPA", sacramento: "SMF", "san jose": "SJC",
  raleigh: "RDU", "kansas city": "MCI",
};

function buildAirportShortDisplay(input: string, codeOverride?: string): string {
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
  const normalizedOverride = codeOverride?.trim().toUpperCase();
  const code = normalizedOverride && /^[A-Z]{3}$/.test(normalizedOverride)
    ? normalizedOverride
    : explicitCode ?? lookupCode;
  if (!shortName) shortName = placeName.split(" ")[0];
  return code ? `${shortName} (${code})` : shortName;
}

// ─── Constants & helpers ──────────────────────────────────────────────────────

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

function DepartureStatusBadge({
  leaveTime,
  confidence,
  nowMs,
  locale = "en",
}: {
  leaveTime: Date;
  confidence: Confidence;
  nowMs: number;
  locale?: SiteLocale;
}) {
  const status = getAirportDepartureStatus(leaveTime, confidence, new Date(nowMs));
  const config = {
    positive: { dot: "bg-green-500", text: "text-green-500" },
    caution: { dot: "bg-amber-500", text: "text-amber-400" },
    urgent: { dot: "bg-red-400", text: "text-red-400" },
  }[status.tone];
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs ${config.text}`}>
      <span className={`h-1.5 w-1.5 flex-shrink-0 rounded-full ${config.dot}`} />
      {locale === "es"
        ? { positive: "Vas con margen", caution: "El tiempo es justo", urgent: "Es hora de salir" }[status.tone]
        : status.label}
    </span>
  );
}

const inputClass =
  "min-h-12 min-w-0 w-full max-w-full touch-manipulation rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-3 text-base text-white placeholder-zinc-500 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 sm:py-2 sm:text-sm";

const timeInputClass = `${inputClass} block h-12 appearance-none box-border py-0 [color-scheme:dark]`;

// ─── Default departure ────────────────────────────────────────────────────────

function defaultDeparture() {
  const d = new Date(Date.now() + 4 * 60 * 60 * 1000);
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
  airportOptions?: AirportAutocompleteOption[];
  locale?: SiteLocale;
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
  airportOptions = [],
  locale = "en",
}: AirportCalculatorProps) {
  const copy = airportCopy[locale];
  // ── Form state ──────────────────────────────────────────────────────────────
  const [today, setToday] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [flightType, setFlightType] = useState<FlightType>("domestic");
  const [origin, setOrigin] = useState("");
  const [currentLocation, setCurrentLocation] = useState<string | null>(null);
  const [airport, setAirport] = useState(initialAirport);
  const [selectedAirportOption, setSelectedAirportOption] = useState<AirportAutocompleteOption | null>(null);

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
  const [calendarProvider, setCalendarProvider] = useState<"google" | "ics" | null>(null);
  const [showBreakdown, setShowBreakdown] = useState(!genericRedesign);
  const [formExpanded, setFormExpanded] = useState(true);

  const securityDebounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const resultPanelRef = useRef<HTMLDivElement | null>(null);
  const answerAnalyticsSignatureRef = useRef<string | null>(null);
  useEffect(() => {
    const { date, time } = defaultDeparture();
    setToday(localDateString());
    setDepartureDate(date);
    setDepartureTime(time);
  }, []);

  useEffect(() => {
    setError(null);
    setFallbackNotice(null);
  }, [departureDate, departureTime, origin, airport, flightType, arrivalMode,
      hasCheckedBag, manualTravelMinutes, hasPreCheck, hasClear, customBuffer, customSecurityMinutes]);

  const effectiveAirportOption = useMemo(() => {
    if (selectedAirportOption) return selectedAirportOption;
    const normalizedAirport = airport.trim().toUpperCase();
    return airportOptions.find((option) =>
      option.code.toUpperCase() === normalizedAirport ||
      buildAirportCalendarLocation(option) === airport
    );
  }, [airport, airportOptions, selectedAirportOption]);
  const effectivePlanningJurisdiction =
    effectiveAirportOption?.planningJurisdiction ?? planningJurisdiction;
  const effectiveSecurityLabel = effectiveAirportOption
    ? effectivePlanningJurisdiction === "international" ? copy.airportSecurity : copy.tsaSecurity
    : locale === "es"
      ? effectivePlanningJurisdiction === "international" ? copy.airportSecurity : copy.tsaSecurity
      : securityLabel;

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
        effectivePlanningJurisdiction,
        hasCheckedBag,
        arrivalMode,
        locationCode
      );
      setSecurityEstimate(estimate);
      setIsFetchingSecurityEstimate(false);
    }, 500);
    return () => clearTimeout(securityDebounceRef.current);
  }, [airport, departureDate, departureTime, flightType, hasPreCheck, hasClear,
      effectivePlanningJurisdiction, hasCheckedBag, arrivalMode, locationCode]);

  // Route estimates are intentionally fetched only on explicit calculate.
  // Changing route/time inputs invalidates any prior automatic result.
  useEffect(() => {
    setTravelMins(null);
    setTravelSource(null);
    setHasTrafficData(false);
    setTrafficBasis("none");
    setIsFetchingTravel(false);
    setCalendarProvider(null);
  }, [origin, airport, departureDate, departureTime]);

  // ── Derived values ──────────────────────────────────────────────────────────
  const baseBuffer = getAirportBaseBufferMinutes(flightType, hasCheckedBag, arrivalMode);
  const estimatedSecurityMins = securityEstimate?.avg ?? getAirportDefaultSecurityMinutes(flightType);
  const defaultBuffer = baseBuffer + estimatedSecurityMins;
  const hasRouteInputs = origin.trim().length >= 2 && airport.trim().length >= 2;
  const planningMode = planningModeForDate(departureDate);

  function handleOriginChange(value: string) {
    setOrigin(value);
    setCurrentLocation(null);
  }

  function handleCurrentLocationChange(coordinates: string | null) {
    setCurrentLocation(coordinates);
    if (coordinates) setOrigin(copy.currentLocation);
    else if (origin === copy.currentLocation) setOrigin("");
  }
  const manualDriveMinutes = parseInt(manualTravelMinutes, 10);
  const hasManualDriveTime = !isNaN(manualDriveMinutes) && manualDriveMinutes >= 0;
  const airportShortDisplay = buildAirportShortDisplay(airport, locationCode);
  const calendarEventTitle = airportShortDisplay ? `${copy.leaveFor} ${airportShortDisplay}` : `${copy.leaveFor} ${copy.airportFallback}`;
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
    arrivalMode === "parking" ? copy.parking : null,
    arrivalMode === "transit" ? copy.transit : null,
    hasCheckedBag ? copy.bagDrop : null,
  ].filter(Boolean).join(" · ");

  // Core trust signals shown in the collapsed smart-timing card (always visible)
  const coreTrustSignals = [
    hasAirport && airportShortDisplay
      ? `${effectiveSecurityLabel} (${airportShortDisplay})`
      : `${effectiveSecurityLabel} time`,
    arrivalMode === "transit" ? copy.stationTransfer : copy.parkingAccess,
    `${locale === "es" ? (flightType === "international" ? copy.international : copy.domestic) : (flightType === "international" ? longHaulLabel : shortHaulLabel)} ${copy.timing}`,
    planningMode === "future" ? copy.expectedTraffic : copy.liveTrafficConditions,
  ];

  const includedSignals = [
    planningMode === "future" ? copy.expectedTraffic : copy.liveTraffic,
    `${effectiveSecurityLabel} time`,
    arrivalMode === "transit" ? copy.transitWalking : copy.parkingWalking,
    copy.insideAirport,
    `${locale === "es" ? (flightType === "international" ? copy.international : copy.domestic) : (flightType === "international" ? longHaulLabel : shortHaulLabel)}: ${copy.recommendations}`,
  ];

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
      securityLabel: effectiveSecurityLabel,
      securitySourceLabel: locale === "es" ? "estimación de seguridad" : "airport security estimate",
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
      planningMode, flightType, arrivalMode, hasCheckedBag, airport, effectiveSecurityLabel]);

  const [statusNowMs, setStatusNowMs] = useState(() => Date.now());
  useEffect(() => {
    if (!computedResult) return;
    setStatusNowMs(Date.now());
    const interval = window.setInterval(() => setStatusNowMs(Date.now()), 30_000);
    return () => window.clearInterval(interval);
  }, [computedResult]);

  const currentDepartureStatus = computedResult
    ? getAirportDepartureStatus(computedResult.leaveTime, computedResult.confidence, new Date(statusNowMs))
    : null;

  const localizedFactors = useMemo(() => {
    if (!computedResult || locale !== "es") return computedResult?.factors ?? [];
    const labels: Record<string, { label: string; explanation?: string; sourceLabel?: string }> = {
      travel: { label: "Tiempo de viaje", explanation: "Trayecto desde tu punto de partida hasta el aeropuerto." },
      tsa_security: { label: "Control de seguridad", explanation: "Tiempo estimado para pasar el control de seguridad." },
      airport_buffer: { label: "Tiempo en el aeropuerto", explanation: "Facturación, acceso y recorrido hasta la puerta de embarque." },
    };
    return computedResult.factors.map((factor) => ({
      ...factor,
      ...(labels[factor.key] ?? {}),
    }));
  }, [computedResult, locale]);

  useEffect(() => {
    if (!computedResult) return;
    const signature = [
      computedResult.leaveTime.toISOString(),
      computedResult.travelSource,
      computedResult.trafficBasis,
      flightType,
      arrivalMode,
      hasCheckedBag,
      showBufferOverride,
      showSecurityOverride,
    ].join("|");
    if (answerAnalyticsSignatureRef.current === signature) return;
    answerAnalyticsSignatureRef.current = signature;

    const departureStatus = getAirportDepartureStatus(
      computedResult.leaveTime,
      computedResult.confidence,
      new Date(),
    );
    const intelligence = securityEstimate?.intelligence;
    track("airport_leave_time_answer_generated", {
      intent_cluster: "airport_when_to_leave",
      flight_type: flightType,
      arrival_mode: arrivalMode,
      planning_mode: planningMode,
      travel_source: computedResult.travelSource,
      traffic_basis: computedResult.trafficBasis,
      result_tone: departureStatus.tone,
      minutes_until_leave: Math.round((computedResult.leaveTime.getTime() - Date.now()) / 60_000),
      refinement_count: activeRefinementCount,
      security_source_path: intelligence?.sourcePath.join("|") ?? "unknown",
      security_evidence_kind: intelligence?.predictedWaitAtArrival.evidenceKind ?? "unknown",
      security_freshness: intelligence?.observedWait?.freshness ?? "unknown",
      security_confidence: intelligence?.recommendedSecurityAllowance.confidence ?? "unknown",
      ...(locationCode ? { location_code: locationCode } : {}),
    });
  }, [computedResult, flightType, arrivalMode, planningMode, hasCheckedBag,
      showBufferOverride, showSecurityOverride, activeRefinementCount, locationCode, securityEstimate]);

  const resultHeroMode = genericRedesign && computedResult !== null;
  // Hallmark · pre-emit critique: P5 H5 E4 S5 R5 V4
  const ewrResultExperiment = genericRedesign;

  function openResultAdjustments() {
    setFormExpanded(true);
    setShowRefinements(true);
    track("airport_result_adjustments_opened", { location_code: locationCode ?? "generic" });
    window.requestAnimationFrame(() => {
      document.getElementById("airport-calculator-form")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }

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

  // ── Manual calculate fallback ───────────────────────────────────────────────
  async function handleCalculate() {
    setError(null);
    if (!departureDate || !departureTime) {
      setError(copy.dateTimeError);
      return;
    }
    trackCalculatorStarted("airport_leave_time", {
      intent_cluster: "airport_when_to_leave",
      flight_type: flightType,
      arrival_mode: arrivalMode,
      ...(locationCode ? { location_code: locationCode } : {}),
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
          setFallbackNotice(copy.autoTravelError);
        }
      } finally {
        setIsFetchingTravel(false);
      }
    } else {
      if (!hasManualDriveTime) {
        setShowRefinements(true);
        setShowManualDriveTime(true);
        setFormExpanded(true);
        setFallbackNotice(copy.startError);
        return;
      }
      setTravelMins(manualDriveMinutes);
      setTravelSource("manual");
      setHasTrafficData(false);
      setTrafficBasis("none");
    }
    trackCalculatorCompleted("airport_leave_time", {
      intent_cluster: "airport_when_to_leave",
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
            : genericRedesign
              ? "mx-auto max-w-2xl"
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
                <span>{computedResult ? copy.adjustFlight : copy.enterFlight}</span>
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

            {/* Flight date + time */}
            <div className={genericRedesign ? `rounded-xl border p-4 ${
              resultHeroMode ? "border-zinc-800/70 bg-zinc-950/25" : "border-zinc-800 bg-zinc-950/40"
            }` : ""}>
              {genericRedesign && (
                <p className="mb-4 text-sm font-bold text-white">
                  {resultHeroMode ? copy.editTrip : copy.yourTrip}
                </p>
              )}
              <div className="grid gap-3 sm:grid-cols-2">
                <CalculatorDateField
                  label={copy.flightDate}
                  value={departureDate}
                  today={today}
                  inputClassName={inputClass}
                  onChange={setDepartureDate}
                  locale={locale}
                />
                <div className="min-w-0">
                  <FieldLabel>{copy.flightDeparts}</FieldLabel>
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
                <FieldLabel>{copy.flightType}</FieldLabel>
                <SegmentedControl
                  options={[
                      { value: "domestic", label: locale === "es" ? copy.domestic : shortHaulLabel },
                      { value: "international", label: locale === "es" ? copy.international : longHaulLabel },
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
                <p className="mb-4 text-sm font-bold text-white">{copy.route}</p>
              )}
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="min-w-0">
                  <FieldLabel>{copy.leavingFrom}</FieldLabel>
                  <PlaceAutocomplete
                    value={origin}
                    onChange={handleOriginChange}
                    placeholder={copy.addressCity}
                    inputClassName={inputClass}
                  />
                  <CurrentLocationControl
                    active={currentLocation !== null}
                    onLocationChange={handleCurrentLocationChange}
                    locale={locale}
                  />
                </div>
                <div>
                  <FieldLabel>{copy.departureAirport}</FieldLabel>
                  {genericRedesign && airportOptions.length > 0 ? (
                    <AirportAutocomplete
                      value={airport}
                      onChange={setAirport}
                      onOptionSelected={setSelectedAirportOption}
                      options={airportOptions}
                      placeholder={copy.airportPlaceholder}
                      inputClassName={inputClass}
                      locale={locale}
                    />
                  ) : (
                    <PlaceAutocomplete
                      value={airport}
                      onChange={setAirport}
                      placeholder={copy.airportExample}
                      inputClassName={inputClass}
                      types="airport"
                    />
                  )}
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
                ? copy.calculating
                : resultHeroMode
                  ? copy.update
                  : genericRedesign
                  ? copy.show
                  : copy.calculate}
            </button>
            {airport.trim().length < 2 && (
              <p className="text-center text-xs text-zinc-500">
                {copy.addAirport}
              </p>
            )}
            {airport.trim().length >= 2 && !origin.trim() && !hasManualDriveTime && (
              <p className="text-center text-xs text-zinc-500">
                {copy.addOrigin}
              </p>
            )}

            {/* Smart airport timing card */}
            <div className={`rounded-xl border p-4 ${
              resultHeroMode ? "border-zinc-800 bg-zinc-900/60" : "border-zinc-700 bg-zinc-800/70"
            }`}>

              {/* Header */}
              <div>
                <p className="text-sm font-semibold text-white">
                  {genericRedesign ? copy.whatWeUse : copy.smartTiming}
                </p>
              </div>
              {!genericRedesign && (
                <p className="mt-1 text-xs leading-relaxed text-zinc-500">
                  {copy.smartTimingBody}
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
                    <span className="text-xs text-zinc-300">{copy.bagDropTime}</span>
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
                onClick={() => {
                  const willOpen = !showRefinements;
                  setShowRefinements(willOpen);
                  if (willOpen) {
                    track("airport_timing_options_opened", {
                      ...(locationCode ? { location_code: locationCode } : {}),
                    });
                  }
                }}
                className="mt-4 flex w-full items-center justify-between gap-3 rounded-lg border border-zinc-600 bg-zinc-700/60 px-4 py-2.5 text-sm font-medium text-zinc-200 transition-colors hover:border-zinc-500 hover:bg-zinc-700 hover:text-white"
              >
                <span className="flex items-center gap-2">
                  <span>
                    {showRefinements
                      ? genericRedesign ? copy.hideAdjustments : copy.hideAssumptions
                      : genericRedesign ? copy.adjustAssumptions : copy.customize}
                  </span>
                  {activeRefinementCount > 0 && !showRefinements && (
                    <span className="rounded-full bg-green-500/20 px-1.5 py-0.5 text-[10px] font-semibold text-green-400">
                      {activeRefinementCount} {copy.modified}
                    </span>
                  )}
                </span>
                <span className={`flex-shrink-0 text-xs text-zinc-400 transition-transform duration-200 ${showRefinements ? "rotate-180" : ""}`}>
                  ▾
                </span>
              </button>

              {showRefinements && (
                <div className="mt-4 space-y-5 border-t border-zinc-700 pt-4">
                  {effectivePlanningJurisdiction === "us" && <div>
                    <FieldLabel>{copy.trustedPrograms}</FieldLabel>
                    <div className="flex flex-wrap gap-2">
                      <Toggle checked={hasPreCheck} onChange={setHasPreCheck} label="TSA PreCheck / Global Entry" />
                      <Toggle checked={hasClear} onChange={setHasClear} label="CLEAR" />
                    </div>
                  </div>}
                  <div>
                    <FieldLabel>{copy.bags}</FieldLabel>
                    <Toggle checked={hasCheckedBag} onChange={setHasCheckedBag} label={copy.checkingBag} />
                  </div>
                  <div>
                    <FieldLabel>{copy.gettingThere}</FieldLabel>
                    <SegmentedControl
                      options={[
                        { value: "parking", label: copy.parkingMode },
                        { value: "rideshare", label: copy.rideshare },
                        { value: "dropoff", label: copy.dropoff },
                        { value: "transit", label: copy.publicTransit },
                      ]}
                      value={arrivalMode}
                      onChange={setArrivalMode}
                    />
                  </div>
                  <div>
                    <FieldLabel>{arrivalMode === "transit" ? copy.transitTime : copy.driveTime}</FieldLabel>
                    {!showManualDriveTime ? (
                      <div>
                        <p className="text-sm text-zinc-400">
                          {copy.automaticTravel}
                        </p>
                        <button
                          type="button"
                          onClick={() => setShowManualDriveTime(true)}
                          className="mt-1.5 text-xs text-zinc-400 underline underline-offset-2 hover:text-zinc-300"
                        >
                          {copy.manualTravel}
                        </button>
                      </div>
                    ) : (
                      <div>
                        <input
                          type="number"
                          min="0"
                          max="2880"
                          placeholder={copy.example35}
                          value={manualTravelMinutes}
                          onChange={(e) => setManualTravelMinutes(e.target.value)}
                          className={inputClass}
                        />
                        <button
                          type="button"
                          onClick={() => { setShowManualDriveTime(false); setManualTravelMinutes(""); }}
                          className="mt-1.5 text-xs text-zinc-400 underline underline-offset-2 hover:text-zinc-300"
                        >
                          {copy.automaticInstead}
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
                        ? copy.recommendedBuffer
                        : `${copy.adjustBuffer} (${fmtDuration(defaultBuffer, locale)} ${copy.recommended})`}
                    </button>
                    {showBufferOverride && (
                      <div className="mt-3">
                        <input
                          type="number"
                          min="0"
                          max="480"
                          placeholder={`${copy.recommendedPlaceholder}: ${defaultBuffer} min`}
                          value={customBuffer}
                          onChange={(e) => setCustomBuffer(e.target.value)}
                          className={inputClass}
                        />
                        <p className="mt-1.5 text-xs text-zinc-400">
                          {copy.bufferHelp}
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
                        {copy.adjustSecurity}
                      </button>
                    ) : (
                      <div>
                        <FieldLabel>{copy.customSecurity}</FieldLabel>
                        <input
                          type="number"
                          min="0"
                          max="180"
                          placeholder={`${copy.auto}: ${estimatedSecurityMins} min`}
                          value={customSecurityMinutes}
                          onChange={(e) => setCustomSecurityMinutes(e.target.value)}
                          className={inputClass}
                        />
                        <button
                          type="button"
                          onClick={() => { setShowSecurityOverride(false); setCustomSecurityMinutes(""); }}
                          className="mt-1.5 text-xs text-zinc-400 underline underline-offset-2 hover:text-zinc-300"
                        >
                          {copy.estimatedInstead}
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
                    {copy.forFlight} {fmtDepartureTime(departureTime, locale)} {locale === "es" ? (flightType === "international" ? copy.international.toLowerCase() : copy.domestic.toLowerCase()) : flightType} {copy.flight}
                  </p>
                )}

                {/* Hero */}
                <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">{copy.leaveBy}</p>
                <p className={`mt-1 whitespace-nowrap font-black leading-none ${
                  currentDepartureStatus?.tone === "urgent" ? "text-red-400" : "text-green-500"
                } ${
                  resultHeroMode ? "text-6xl sm:text-8xl" : "text-6xl sm:text-7xl"
                }`}>
                  {fmtTime(computedResult.leaveTime, locale)}
                </p>
                <p className="mt-2 text-base text-zinc-300">{fmtDate(computedResult.leaveTime, locale)}</p>
                <div className="mt-1.5">
                  <DepartureStatusBadge
                    leaveTime={computedResult.leaveTime}
                    confidence={computedResult.confidence}
                    nowMs={statusNowMs}
                    locale={locale}
                  />
                </div>

                {ewrResultExperiment && (
                  <div className="mt-5 border-t border-zinc-800 pt-4">
                    <p className="text-sm leading-relaxed text-zinc-300">
                      {fmtDuration(factorMinutes(computedResult, "travel", computedResult.travelMinutes), locale)}
                      {arrivalMode === "transit" ? ` ${copy.transit}` : ` ${copy.drive}`}
                      {" · "}
                      {fmtDuration(factorMinutes(computedResult, "tsa_security", computedResult.securityMinutes), locale)} {copy.security}
                    </p>
                    <p className="mt-0.5 text-sm leading-relaxed text-zinc-400">
                      {copy.arriveBy} {fmtTime(computedResult.arrivalTime, locale)}
                      {" · "}
                      {arrivalMode === "parking"
                        ? copy.parkingIncluded
                        : arrivalMode === "transit"
                          ? copy.transferIncluded
                          : arrivalMode === "rideshare"
                            ? copy.rideshareIncluded
                            : copy.dropoffIncluded}
                      {hasCheckedBag ? ` · ${copy.bagIncluded}` : ""}
                    </p>
                    <button
                      type="button"
                      onClick={openResultAdjustments}
                      className="mt-2 inline-flex min-h-11 items-center text-sm font-semibold text-green-400 underline underline-offset-4 transition-colors hover:text-green-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400"
                    >
                      {copy.adjustAssumptions}
                    </button>
                  </div>
                )}

                <CalendarOnTimerHandoff
                  calendarHref={buildGoogleCalendarLink({
                    title: calendarEventTitle,
                    start: computedResult.leaveTime,
                    details: copy.calendarDetails,
                    location: airport || undefined,
                  })}
                  alternateCalendarHref={buildIcsCalendarDataUri({
                    title: calendarEventTitle,
                    start: computedResult.leaveTime,
                    details: copy.calendarDetails,
                    location: airport || undefined,
                  })}
                  alternateCalendarFilename="airport-leave-time.ics"
                  calendarProvider={calendarProvider}
                  setCalendarProvider={setCalendarProvider}
                  calculatorType="airport_leave_time"
                  exclusivePrimaryAction={ewrResultExperiment}
                  compactOpenedStatus={ewrResultExperiment}
                  postCalendarHeading={copy.alarmHeading}
                  postCalendarBody={copy.alarmBody}
                  locale={locale}
                  appLocation={locationCode ? `airport_${locationCode.toLowerCase()}_result` : "airport_calculator_inline"}
                  analyticsContext={{
                    intent_cluster: "airport_when_to_leave",
                    ...(locationCode ? { location_code: locationCode } : {}),
                  }}
                  androidAffiliateOffer={locationCode === "EWR" ? {
                    href: "https://tpx.lv/XkyWTwQx",
                    partner: "welcome_pickups",
                    heading: "Need a ride to or from Newark Airport?",
                    body: "Check private airport-transfer options from Welcome Pickups.",
                    buttonLabel: "Check Newark airport transfers",
                    location: "airport_ewr_android_result",
                  } : undefined}
                  eventPreview={{
                    title: calendarEventTitle,
                    startLabel: fmtTime(computedResult.leaveTime, locale),
                  }}
                />

                {/* Timing details stay available without interrupting the conversion flow. */}
                <div className="mt-5 border-t border-zinc-800 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      const willOpen = !showBreakdown;
                      setShowBreakdown(willOpen);
                      if (willOpen) {
                        track("airport_answer_breakdown_opened", {
                          ...(locationCode ? { location_code: locationCode } : {}),
                        });
                      }
                    }}
                    className="flex min-h-11 w-full items-center justify-between rounded-lg border border-zinc-800 px-3 text-sm font-semibold text-zinc-300 transition-colors hover:border-zinc-700 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400"
                    aria-expanded={showBreakdown}
                    aria-controls="airport-timing-breakdown"
                  >
                    <span>{showBreakdown ? copy.hideDetails : copy.howCalculated}</span>
                    <span className="text-base leading-none text-zinc-500" aria-hidden="true">{showBreakdown ? "⌃" : "⌄"}</span>
                  </button>

                  {showBreakdown && (
                    <div id="airport-timing-breakdown" className="mt-4">
                      <CalculationFactorList
                        factors={localizedFactors}
                        formatDuration={(minutes) => fmtDuration(minutes, locale)}
                        variant="breakdown"
                      />
                      <div className="flex items-baseline justify-between border-t border-zinc-800 pt-3">
                        <p className="text-sm text-zinc-400">{copy.arriveAirport}</p>
                        <p className="text-sm font-semibold text-white">{fmtTime(computedResult.arrivalTime, locale)}</p>
                      </div>
                      <button
                        type="button"
                        onClick={openResultAdjustments}
                        className="mt-4 text-xs font-medium text-zinc-400 underline underline-offset-2 transition-colors hover:text-white"
                      >
                        {copy.adjustAssumptions}
                      </button>
                    </div>
                  )}
                </div>

                {genericRedesign && (
                  <PlanningEstimateNotice requirement={copy.requirement} locale={locale} />
                )}
              </div>

            ) : isFetchingTravel ? (
              /* ── ESTIMATING ── */
              <div className="rounded-xl border border-zinc-700 bg-zinc-800/80 p-5 transition-all duration-300">
                {departureTime && (
                  <p className="mb-2 text-xs text-zinc-500">
                    {copy.forFlight} {fmtDepartureTime(departureTime, locale)}
                  </p>
                )}
                <p className="text-xs font-semibold text-zinc-400">{copy.leaveBy}</p>
                <div className="mt-0.5 flex items-end gap-3">
                  <p className="whitespace-nowrap text-6xl font-black leading-none text-zinc-600 sm:text-7xl">—:—</p>
                  <span className="mb-1.5 animate-pulse text-xs text-zinc-500">{copy.calculatingShort}</span>
                </div>
                <p className="mt-3 text-xs text-zinc-500">
                  {planningMode === "future"
                    ? copy.estimateExpected
                    : copy.fetchingLive}
                </p>
                {arrivalOnlyPreview && (
                  <div className="mt-4 space-y-2 border-t border-zinc-800 pt-4">
                    <div className="flex items-baseline justify-between">
                      <p className="text-sm text-zinc-400">{copy.arriveAirport}</p>
                      <p className="text-sm font-semibold text-white">{fmtTime(arrivalOnlyPreview, locale)}</p>
                    </div>
                    <div className="flex items-baseline justify-between">
                      <p className="text-sm text-zinc-400">{copy.airportBuffer}</p>
                      <p className="text-sm font-semibold text-white">{fmtDuration(defaultBuffer, locale)}</p>
                    </div>
                  </div>
                )}
              </div>

            ) : genericRedesign ? null : (
              /* ── CAPABILITY STATE — no route inputs yet (default / initial) ── */
              <div className="rounded-xl border border-zinc-700/50 bg-zinc-800/50 p-5">
                <p className="text-sm font-semibold text-white">
                  {genericRedesign ? "What your answer will account for" : "Get your personalized leave time"}
                </p>
                {!genericRedesign && (
                  <p className="mt-1 text-xs leading-relaxed text-zinc-500">
                    Add your starting location and airport — we&apos;ll calculate:
                  </p>
                )}

                <div className="mt-4 space-y-2">
                  {(genericRedesign ? includedSignals : [
                    planningMode === "future" ? "Expected traffic for your trip time" : "Real-time traffic conditions",
                    `${effectiveSecurityLabel} time for your airport`,
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
                <div
                  className="mt-5 rounded-lg border border-zinc-700/40 bg-zinc-800/60 px-4 py-3"
                  data-nosnippet
                >
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
            {calendarProvider ? (
              <span className="flex items-center gap-1.5 text-sm font-semibold text-green-400">
                <span>✓</span>
                <span>Saved</span>
              </span>
            ) : (
              <a
                href={buildGoogleCalendarLink({
                  title: airport ? `Leave for ${buildAirportShortDisplay(airport, locationCode)}` : "Leave for airport",
                  start: computedResult.leaveTime,
                  details: ONTIMER_CALENDAR_DESCRIPTION,
                  location: airport || undefined,
                })}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  track(
                    "calendar_link_clicked_mobile_sticky",
                    locationCode ? { location_code: locationCode } : undefined
                  );
                  setCalendarProvider("google");
                }}
                className="flex flex-shrink-0 items-center gap-1.5 rounded-full border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm font-semibold text-white transition-colors active:bg-zinc-700"
              >
                <span>📅</span>
                <span>Add to Google Calendar</span>
              </a>
            )}
          </div>
        </div>
      )}
    </>
  );
}
