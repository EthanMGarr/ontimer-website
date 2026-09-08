"use client";

import { useState, useEffect, useRef } from "react";
import { AppStoreButton } from "@/components/CTAButton";
import CalendarOnTimerHandoff from "@/components/leave-time/CalendarOnTimerHandoff";
import CalculatorDateField from "@/components/leave-time/CalculatorDateField";
import PlaceAutocomplete from "@/components/PlaceAutocomplete";
import {
  fireEvent,
  trackCalendarHandoffOpened,
  trackCalculatorCompleted,
  trackCalculatorStarted,
} from "@/lib/analytics";
import { buildGoogleCalendarLink, buildIcsCalendarDataUri, ONTIMER_CALENDAR_DESCRIPTION } from "@/lib/calendar-links";
import type { SiteLocale } from "@/lib/i18n";

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

const calculatorCopy = {
  en: {
    none: "None", minutes: "minutes", getHeading: "What you will get",
    getBody: "Add your destination and arrival time to calculate the latest reasonable time to leave.",
    getItems: ["Leave-by time", "Travel time", "Personal buffer", "Calendar-ready result"],
    scheduledRoute: "scheduled route", estimated: "estimated", expectedTraffic: "expected traffic", liveTraffic: "live traffic",
    locationUnavailable: "Current location is not available in this browser. Enter an address instead.",
    currentLocation: "Current location", locationAdded: "Current location added.",
    locationDenied: "We couldn’t access your location. Allow location access or enter an address.",
    automaticUnavailable: "Automatic travel time is unavailable for this route. Enter travel time below, or try a fuller address.",
    startingLocationNeeded: "Add a starting location for automatic travel time, or enter minutes manually in timing assumptions.",
    modes: { DRIVE: "drive", WALK: "walk", TRANSIT: "transit" },
    leaveFor: "Leave for", destinationFallback: "destination", leaveBy: "Leave by",
    buffer: "buffer", parkingWalkIn: "parking / walk-in", noExtraBuffer: "No extra buffer selected",
    adjustAssumptions: "Adjust assumptions", adjustHint: "Drive time, buffer, or walk-in different? Edit →",
    alarmHeading: "Don’t be late. Turn this into an alarm.", alarmBody: "OnTimer sets an automatic alarm for this calendar event.",
    adjustInputs: "Adjust inputs", enterTrip: "Enter trip details", destination: "Destination",
    whereGoing: "Where are you going?", swap: "Swap", swapAria: "Swap origin and destination",
    startingLocation: "Starting location", optional: "(optional)", startingAddress: "Your starting address",
    findingLocation: "Finding your location…", useLocation: "Use my current location",
    routeHint: "Can’t find a route. Enter minutes manually or add a missing address.",
    arrivalDate: "Arrival date", arriveBy: "Arrive by", travelMode: "Travel mode",
    driving: "Driving", walking: "Walking", transit: "Transit",
    estimating: "Estimating travel time…", calculate: "Calculate leave time", calculateArrow: "Calculate leave time →",
    enableLong: "Add a destination and arrival time to enable.", enableShort: "Add a destination & time to enable.",
    extraBuffer: "Extra buffer you like to have", parkingTime: "Parking / walk-in time",
    hideAdjustments: "Hide adjustments", travelTime: "Travel time",
    automaticEstimate: "Estimated automatically from your locations.", manualInstead: "✏︎ Edit travel time manually",
    useAutomatic: "Use automatic estimate instead", addStartForAutomatic: "Add a starting location above for an automatic estimate.",
    exampleMinutes: "e.g. 25", travelMinutesAria: "Travel time in minutes", updating: "Updating leave time…",
    update: "Update Leave Time", appStore: "Get OnTimer Free", addGoogle: "Add to Google Calendar",
    calendarDetails: ONTIMER_CALENDAR_DESCRIPTION,
  },
  es: {
    none: "Ninguno", minutes: "minutos", getHeading: "Tu resultado incluirá",
    getBody: "Añade tu destino y la hora de llegada para calcular la última hora razonable a la que deberías salir.",
    getItems: ["Hora de salida", "Tiempo de viaje", "Margen personal", "Resultado listo para el calendario"],
    scheduledRoute: "ruta programada", estimated: "estimado", expectedTraffic: "tráfico previsto", liveTraffic: "tráfico en tiempo real",
    locationUnavailable: "Tu ubicación actual no está disponible en este navegador. Escribe una dirección.",
    currentLocation: "Ubicación actual", locationAdded: "Ubicación actual añadida.",
    locationDenied: "No pudimos acceder a tu ubicación. Permite el acceso o escribe una dirección.",
    automaticUnavailable: "No se pudo calcular automáticamente el tiempo para esta ruta. Indica el tiempo de viaje o prueba con una dirección más completa.",
    startingLocationNeeded: "Añade un punto de partida para calcular el viaje automáticamente o indica los minutos en los ajustes.",
    modes: { DRIVE: "en coche", WALK: "a pie", TRANSIT: "en transporte público" },
    leaveFor: "Salir hacia", destinationFallback: "el destino", leaveBy: "Sal a más tardar a las",
    buffer: "de margen", parkingWalkIn: "para aparcar / entrar", noExtraBuffer: "Sin margen adicional",
    adjustAssumptions: "Ajustar tiempos", adjustHint: "¿Cambian el viaje, el margen o la entrada? Editar →",
    alarmHeading: "No llegues tarde. Convierte este evento en una alarma.", alarmBody: "OnTimer crea una alarma automática para este evento del calendario.",
    adjustInputs: "Modificar datos", enterTrip: "Introduce los datos del trayecto", destination: "Destino",
    whereGoing: "¿Adónde vas?", swap: "Intercambiar", swapAria: "Intercambiar origen y destino",
    startingLocation: "Punto de partida", optional: "(opcional)", startingAddress: "Tu dirección de partida",
    findingLocation: "Buscando tu ubicación…", useLocation: "Usar mi ubicación actual",
    routeHint: "No encontramos una ruta. Indica los minutos o añade la dirección que falta.",
    arrivalDate: "Fecha de llegada", arriveBy: "Llegar antes de", travelMode: "Medio de transporte",
    driving: "Coche", walking: "A pie", transit: "Transporte público",
    estimating: "Calculando el viaje…", calculate: "Calcular hora de salida", calculateArrow: "Calcular hora de salida →",
    enableLong: "Añade un destino y una hora de llegada para continuar.", enableShort: "Añade un destino y una hora.",
    extraBuffer: "Margen adicional que prefieres", parkingTime: "Tiempo para aparcar / entrar",
    hideAdjustments: "Ocultar ajustes", travelTime: "Tiempo de viaje",
    automaticEstimate: "Calculado automáticamente a partir de tus ubicaciones.", manualInstead: "✏︎ Indicar el tiempo manualmente",
    useAutomatic: "Usar de nuevo el cálculo automático", addStartForAutomatic: "Añade un punto de partida arriba para calcularlo automáticamente.",
    exampleMinutes: "p. ej., 25", travelMinutesAria: "Tiempo de viaje en minutos", updating: "Actualizando la hora…",
    update: "Actualizar hora de salida", appStore: "Descargar OnTimer gratis", addGoogle: "Añadir a Google Calendar",
    calendarDetails: "Creado con OnTimer. Recibe alarmas automáticas para los eventos de tu calendario: https://www.ontimer.app",
  },
} as const;

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
  fireEvent(name, { page_path: window.location.pathname, ...params });
}

// ─── Formatting ───────────────────────────────────────────────────────────────

function fmtTime(d: Date, locale: SiteLocale) {
  return d.toLocaleTimeString(locale === "es" ? "es-ES" : "en-US", { hour: "numeric", minute: "2-digit" });
}

function fmtDate(d: Date, locale: SiteLocale) {
  return d.toLocaleDateString(locale === "es" ? "es-ES" : "en-US", { weekday: "short", month: "short", day: "numeric" });
}

function localDateString(date = new Date()): string {
  return date.toLocaleDateString("en-CA");
}

function planningModeForDate(date: string): PlanningMode {
  return date === localDateString() ? "today" : "future";
}

function trafficLabel(basis: TrafficBasis, mode: PlanningMode, locale: SiteLocale): string {
  const copy = calculatorCopy[locale];
  if (basis === "scheduled") return copy.scheduledRoute;
  if (basis === "none") return copy.estimated;
  return mode === "future" || basis === "predicted" ? copy.expectedTraffic : copy.liveTraffic;
}

// ─── UI Primitives ────────────────────────────────────────────────────────────

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <p className="mb-1.5 text-xs font-semibold text-zinc-400">{children}</p>;
}

function PillSelector({
  options,
  value,
  onChange,
  locale,
}: {
  options: number[];
  value: number;
  onChange: (v: number) => void;
  locale: SiteLocale;
}) {
  const copy = calculatorCopy[locale];
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          aria-label={opt === 0 ? copy.none : `${opt} ${copy.minutes}`}
          className={`rounded-full px-3.5 py-1 text-sm font-medium transition-colors ${
            value === opt
              ? "bg-green-500 text-black"
              : "border border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-white"
          }`}
        >
          {opt === 0 ? copy.none : `${opt} min`}
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

function SkeletonResult({ locale }: { locale: SiteLocale }) {
  const copy = calculatorCopy[locale];
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-800/40 p-4 sm:p-5">
      <p className="text-sm font-semibold text-white">{copy.getHeading}</p>
      <p className="mt-1 text-xs leading-relaxed text-zinc-500">
        {copy.getBody}
      </p>
      <div className="mt-4 grid gap-2 text-xs text-zinc-300 sm:grid-cols-2">
        {copy.getItems.map((item) => (
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

export default function LeaveTimeCalculator({ locale = "en" }: { locale?: SiteLocale }) {
  const copy = calculatorCopy[locale];

  // Form state
  const [today, setToday] = useState("");
  const [destination, setDestination] = useState("");
  const [origin, setOrigin] = useState("");
  const [currentLocation, setCurrentLocation] = useState<string | null>(null);
  const [locationStatus, setLocationStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [locationMessage, setLocationMessage] = useState<string | null>(null);
  const [arrivalDate, setArrivalDate] = useState("");
  const planningMode = planningModeForDate(arrivalDate);
  const [arrivalTime, setArrivalTime] = useState("");
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

  // Initialize time-sensitive defaults after mount so cached HTML cannot cross
  // a date or 15-minute boundary before hydration.
  useEffect(() => {
    const { date, time } = defaultArrival();
    setToday(localDateString());
    setArrivalDate(date);
    setArrivalTime(time);
  }, []);

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
      setLocationMessage(copy.locationUnavailable);
      return;
    }

    setLocationStatus("loading");
    setLocationMessage(null);
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setCurrentLocation(`${coords.latitude},${coords.longitude}`);
        setOrigin(copy.currentLocation);
        setLocationStatus("success");
        setLocationMessage(copy.locationAdded);
        track("current_location_used", { accuracy_meters: Math.round(coords.accuracy) });
      },
      () => {
        setCurrentLocation(null);
        if (origin === copy.currentLocation) setOrigin("");
        setLocationStatus("error");
        setLocationMessage(copy.locationDenied);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
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
            copy.automaticUnavailable
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
          copy.startingLocationNeeded
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

  const travelModeLabel = copy.modes[travelMode];
  const leaveCalendarEvent = result
    ? {
        title: `${copy.leaveFor} ${destination.split(",")[0] || copy.destinationFallback}`,
        start: result.leaveTime,
        details: copy.calendarDetails,
        location: destination || undefined,
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
                  {copy.leaveBy}
                </p>
                <p
                  className="mt-0.5 text-6xl font-black leading-none text-green-500"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  {fmtTime(result.leaveTime, locale)}
                </p>
                <p className="mt-1.5 text-sm text-zinc-400">{fmtDate(result.leaveTime, locale)}</p>

                <div className="mt-5 border-t border-zinc-800 pt-4">
                  <p className="text-sm text-zinc-300">
                    {result.travelMinutes} min {travelModeLabel}
                    {result.travelSource === "google" ? ` · ${trafficLabel(result.trafficBasis, result.planningMode, locale)}` : ""}
                  </p>
                  <p className="mt-0.5 text-sm text-zinc-400">
                    {[result.bufferMinutes > 0 ? `${result.bufferMinutes} min ${copy.buffer}` : null, result.prepMinutes > 0 ? `${result.prepMinutes} min ${copy.parkingWalkIn}` : null].filter(Boolean).join(" · ") || copy.noExtraBuffer}
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
                    <span>{copy.adjustAssumptions}</span>
                  </span>
                  <span className="text-xs text-zinc-500">
                    {copy.adjustHint}
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
                  postCalendarHeading={copy.alarmHeading}
                  postCalendarBody={copy.alarmBody}
                  locale={locale}
                  appLocation="leave_calculator_result"
                  eventPreview={{
                    title: leaveCalendarEvent?.title ?? `${copy.leaveFor} ${copy.destinationFallback}`,
                    startLabel: fmtTime(result.leaveTime, locale),
                  }}
                />
              </div>
            ) : (
              <SkeletonResult locale={locale} />
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
              <span>{result ? copy.adjustInputs : copy.enterTrip}</span>
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
                <FieldLabel>{copy.destination}</FieldLabel>
                <PlaceAutocomplete
                  value={destination}
                  onChange={setDestination}
                  placeholder={copy.whereGoing}
                  inputClassName={inputClass}
                />

                <div className="flex items-center justify-center py-1.5">
                  <button
                    type="button"
                    onClick={handleSwap}
                    className="flex items-center gap-1.5 rounded-full border border-zinc-700 bg-zinc-800 px-3 py-1 text-xs font-medium text-zinc-400 transition-colors hover:border-zinc-600 hover:text-white"
                    aria-label={copy.swapAria}
                  >
                    <SwapIcon />
                    {copy.swap}
                  </button>
                </div>

                <FieldLabel>
                  {copy.startingLocation}{" "}
                  <span className="font-normal text-zinc-500">{copy.optional}</span>
                </FieldLabel>
                <PlaceAutocomplete
                  value={origin}
                  onChange={handleOriginChange}
                  placeholder={copy.startingAddress}
                  inputClassName={inputClass}
                />

                <button
                  type="button"
                  onClick={handleUseCurrentLocation}
                  disabled={locationStatus === "loading"}
                  className="mt-2 inline-flex min-h-9 items-center gap-2 rounded-lg px-2 text-sm font-semibold text-green-400 transition-colors hover:bg-green-500/10 hover:text-green-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 disabled:cursor-wait disabled:text-zinc-500"
                >
                  <LocationIcon />
                  {locationStatus === "loading" ? copy.findingLocation : copy.useLocation}
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
                    {copy.routeHint}
                  </p>
                )}
              </div>

              {/* Planning mode + arrival time */}
              <div className="grid gap-3 sm:grid-cols-2">
                <CalculatorDateField
                  label={copy.arrivalDate}
                  value={arrivalDate}
                  today={today}
                  inputClassName={inputClass}
                  onChange={setArrivalDate}
                  locale={locale}
                />
                <div className="min-w-0">
                  <FieldLabel>{copy.arriveBy}</FieldLabel>
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
                <FieldLabel>{copy.travelMode}</FieldLabel>
                <SegmentedControl
                  options={[
                    { value: "DRIVE", label: copy.driving },
                    { value: "WALK", label: copy.walking },
                    { value: "TRANSIT", label: copy.transit },
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
                    {isCalculating ? copy.estimating : copy.calculate}
                  </button>
                  {!isFormValid && (
                    <p className="mt-1.5 text-center text-xs text-zinc-500">
                      {copy.enableLong}
                    </p>
                  )}
                </div>
              )}

              {/* Buffer */}
              <div>
                <FieldLabel>
                  {copy.extraBuffer}
                </FieldLabel>
                <PillSelector
                  options={[0, 5, 10, 15, 20, 30]}
                  value={buffer}
                  onChange={setBuffer}
                  locale={locale}
                />
              </div>

              {/* Prep / walk-in time */}
              <div>
                <FieldLabel>
                  {copy.parkingTime}{" "}
                  <span className="font-normal text-zinc-500">{copy.optional}</span>
                </FieldLabel>
                <PillSelector
                  options={[0, 5, 10, 15, 20, 30]}
                  value={prepTime}
                  onChange={setPrepTime}
                  locale={locale}
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
                        ? copy.hideAdjustments
                        : copy.adjustAssumptions}
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
                    <FieldLabel>{copy.travelTime}</FieldLabel>
                    {hasRouteInputs ? (
                      !showManualTravel ? (
                        <div>
                          <p className="mb-1.5 text-xs text-zinc-400">
                            {copy.automaticEstimate}
                          </p>
                          <button
                            type="button"
                            onClick={() => setShowManualTravel(true)}
                            className="text-xs text-zinc-400 underline underline-offset-2 hover:text-zinc-300"
                          >
                            {copy.manualInstead}
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              min="0"
                              max="600"
                              placeholder={copy.exampleMinutes}
                              value={manualTravelMinutes}
                              onChange={(e) => setManualTravelMinutes(e.target.value)}
                              className={`${inputClass} flex-1`}
                              aria-label={copy.travelMinutesAria}
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
                            {copy.useAutomatic}
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
                            placeholder={copy.exampleMinutes}
                            value={manualTravelMinutes}
                            onChange={(e) => setManualTravelMinutes(e.target.value)}
                            className={`${inputClass} flex-1`}
                            aria-label={copy.travelMinutesAria}
                          />
                          <span className="text-sm text-zinc-400">min</span>
                        </div>
                        <p className="text-xs text-zinc-500">
                          {copy.addStartForAutomatic}
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
                    {isCalculating ? copy.updating : copy.update}
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={handleCalculate}
                      disabled={!isFormValid || isCalculating}
                      className="w-full rounded-full bg-green-500 px-6 py-3 font-semibold text-black transition-colors hover:bg-green-400 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {isCalculating ? copy.estimating : copy.calculateArrow}
                    </button>
                    {!isFormValid && (
                      <p className="mt-1.5 text-center text-xs text-zinc-500">
                        {copy.enableShort}
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
              <p className="text-[10px] font-medium text-zinc-500">{copy.leaveBy}</p>
              <p
                className="text-2xl font-black leading-tight text-green-500"
                aria-live="polite"
                aria-atomic="true"
              >
                {fmtTime(result.leaveTime, locale)}
              </p>
            </div>
            {calendarProvider ? (
              <AppStoreButton
                size="sm"
                label={copy.appStore}
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
                {copy.addGoogle}
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
