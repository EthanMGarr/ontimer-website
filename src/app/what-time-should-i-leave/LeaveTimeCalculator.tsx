/* Hallmark · pre-emit critique: P5 H5 E4 S5 R5 V4 */
/* Hallmark · genre: modern-minimal · macrostructure: Workbench · design-system: design.md · designed-as-app */
"use client";

import { useState, useEffect, useRef } from "react";
import CalendarOnTimerHandoff from "@/components/leave-time/CalendarOnTimerHandoff";
import CalculatorDateField from "@/components/leave-time/CalculatorDateField";
import PlaceAutocomplete from "@/components/PlaceAutocomplete";
import {
  fireEvent,
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
  travelMode: TravelMode;
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
    none: "None", minutes: "minutes",
    scheduledRoute: "scheduled route", estimated: "estimated", expectedTraffic: "expected traffic", liveTraffic: "live traffic",
    locationUnavailable: "Current location is not available in this browser. Enter an address instead.",
    currentLocation: "Current location", locationAdded: "Current location added.",
    locationDenied: "We couldn’t access your location. Allow location access or enter an address.",
    automaticUnavailable: "Automatic travel time is unavailable for this route. Enter travel time below, or try a fuller address.",
    startingLocationNeeded: "Add a starting location for automatic travel time, or enter minutes manually in timing assumptions.",
    modes: { DRIVE: "drive", WALK: "walk", TRANSIT: "transit" },
    leaveFor: "Leave for", destinationFallback: "destination", leaveBy: "Leave by",
    buffer: "buffer", parkingWalkIn: "parking / walk-in", noExtraBuffer: "No extra buffer selected",
    adjustAssumptions: "Timing options", adjustHint: "Buffer, parking, or travel time",
    alarmHeading: "Don’t be late. Turn this into an alarm.", alarmBody: "OnTimer sets an automatic alarm for this calendar event.",
    destination: "Destination",
    whereGoing: "Where are you going?", swap: "Swap", swapAria: "Swap origin and destination",
    startingLocation: "Starting location", optional: "(optional)", startingAddress: "Your starting address",
    findingLocation: "Finding your location…", useLocation: "Use my current location",
    startingRequired: "Enter a starting location or use your current location.", destinationRequired: "Enter a destination.",
    arrivalDate: "Arrival date", arriveBy: "Arrive by", travelMode: "Travel mode",
    driving: "Driving", walking: "Walking", transit: "Transit",
    estimating: "Estimating travel time…", calculate: "Calculate leave time",
    extraBuffer: "Extra buffer you like to have", parkingTime: "Parking / walk-in time",
    hideAdjustments: "Hide adjustments", travelTime: "Travel time",
    automaticEstimate: "Estimated automatically from your locations.", manualInstead: "✏︎ Edit travel time manually",
    useAutomatic: "Use automatic estimate instead", addStartForAutomatic: "Add a starting location above for an automatic estimate.",
    exampleMinutes: "e.g. 25", travelMinutesAria: "Travel time in minutes", updating: "Updating leave time…",
    update: "Update leave time", detailsChanged: "Trip details changed", updateNeeded: "Update the result before saving it to your calendar.",
    resultCurrent: "This result matches your trip details.", appStore: "Get OnTimer Free", addGoogle: "Add to Google Calendar",
    calendarDetails: ONTIMER_CALENDAR_DESCRIPTION,
  },
  es: {
    none: "Ninguno", minutes: "minutos",
    scheduledRoute: "ruta programada", estimated: "estimado", expectedTraffic: "tráfico previsto", liveTraffic: "tráfico en tiempo real",
    locationUnavailable: "Tu ubicación actual no está disponible en este navegador. Escribe una dirección.",
    currentLocation: "Ubicación actual", locationAdded: "Ubicación actual añadida.",
    locationDenied: "No pudimos acceder a tu ubicación. Permite el acceso o escribe una dirección.",
    automaticUnavailable: "No se pudo calcular automáticamente el tiempo para esta ruta. Indica el tiempo de viaje o prueba con una dirección más completa.",
    startingLocationNeeded: "Añade un punto de partida para calcular el viaje automáticamente o indica los minutos en los ajustes.",
    modes: { DRIVE: "en coche", WALK: "a pie", TRANSIT: "en transporte público" },
    leaveFor: "Salir hacia", destinationFallback: "el destino", leaveBy: "Sal a más tardar a las",
    buffer: "de margen", parkingWalkIn: "para aparcar / entrar", noExtraBuffer: "Sin margen adicional",
    adjustAssumptions: "Opciones de tiempo", adjustHint: "Margen, aparcamiento o viaje",
    alarmHeading: "No llegues tarde. Convierte este evento en una alarma.", alarmBody: "OnTimer crea una alarma automática para este evento del calendario.",
    destination: "Destino",
    whereGoing: "¿Adónde vas?", swap: "Intercambiar", swapAria: "Intercambiar origen y destino",
    startingLocation: "Punto de partida", optional: "(opcional)", startingAddress: "Tu dirección de partida",
    findingLocation: "Buscando tu ubicación…", useLocation: "Usar mi ubicación actual",
    startingRequired: "Indica un punto de partida o usa tu ubicación actual.", destinationRequired: "Indica un destino.",
    arrivalDate: "Fecha de llegada", arriveBy: "Llegar antes de", travelMode: "Medio de transporte",
    driving: "Coche", walking: "A pie", transit: "Transporte público",
    estimating: "Calculando el viaje…", calculate: "Calcular hora de salida",
    extraBuffer: "Margen adicional que prefieres", parkingTime: "Tiempo para aparcar / entrar",
    hideAdjustments: "Ocultar ajustes", travelTime: "Tiempo de viaje",
    automaticEstimate: "Calculado automáticamente a partir de tus ubicaciones.", manualInstead: "✏︎ Indicar el tiempo manualmente",
    useAutomatic: "Usar de nuevo el cálculo automático", addStartForAutomatic: "Añade un punto de partida arriba para calcularlo automáticamente.",
    exampleMinutes: "p. ej., 25", travelMinutesAria: "Tiempo de viaje en minutos", updating: "Actualizando la hora…",
    update: "Actualizar hora de salida", detailsChanged: "Los datos del trayecto han cambiado", updateNeeded: "Actualiza el resultado antes de guardarlo en tu calendario.",
    resultCurrent: "Este resultado coincide con los datos del trayecto.", appStore: "Descargar OnTimer gratis", addGoogle: "Añadir a Google Calendar",
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

function FieldLabel({ children, htmlFor }: { children: React.ReactNode; htmlFor?: string }) {
  const className = "mb-1.5 block text-xs font-semibold text-zinc-400";
  return htmlFor
    ? <label className={className} htmlFor={htmlFor}>{children}</label>
    : <p className={className}>{children}</p>;
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
          className={`min-h-11 rounded-full px-3.5 py-1 text-sm font-medium transition-colors ${
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
          className={`min-h-11 rounded-full px-3.5 py-1 text-sm font-medium transition-colors ${
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

// ─── Constants ────────────────────────────────────────────────────────────────

const TRAVEL_MODE_KEY = "leaveCalc_travelMode";

const inputClass =
  "min-h-11 min-w-0 w-full max-w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white placeholder-zinc-400 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500";

const timeInputClass = `${inputClass} block h-11 appearance-none box-border py-0 [color-scheme:dark]`;

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
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [lastCalculatedFingerprint, setLastCalculatedFingerprint] = useState<string | null>(null);

  const assumptionsRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const resultPanelRef = useRef<HTMLDivElement>(null);

  // Derived
  const hasOrigin = origin.trim().length >= 2 || currentLocation !== null;
  const hasDestination = destination.trim().length >= 2;
  const isFormValid = hasOrigin && hasDestination && arrivalDate.length > 0 && arrivalTime.length > 0;
  const hasRouteInputs = origin.trim().length >= 2 && destination.trim().length >= 2;
  const currentFingerprint = JSON.stringify({
    origin: currentLocation ?? origin.trim(),
    destination: destination.trim(),
    arrivalDate,
    arrivalTime,
    travelMode,
    buffer,
    prepTime,
    showManualTravel,
    manualTravelMinutes: showManualTravel ? manualTravelMinutes : "",
  });
  const hasPendingChanges = result !== null && lastCalculatedFingerprint !== currentFingerprint;

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
    setError(null);
    setFallbackNotice(null);
  }

  function handleOriginChange(value: string) {
    setOrigin(value);
    setCurrentLocation(null);
    setLocationStatus("idle");
    setLocationMessage(null);
    setError(null);
    setFallbackNotice(null);
  }

  function handleDestinationChange(value: string) {
    setDestination(value);
    setError(null);
    setFallbackNotice(null);
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
    setShowAssumptions(true);
    setTimeout(() => {
      assumptionsRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 50);
  }

  async function handleCalculate() {
    setSubmitAttempted(true);
    if (!isFormValid) {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    trackCalculatorStarted("leave_time", { travel_mode: travelMode });
    setError(null);

    const [year, month, day] = arrivalDate.split("-").map(Number);
    const [hour, minute] = arrivalTime.split(":").map(Number);
    const arrival = new Date(year, month - 1, day, hour, minute, 0);

    let travelMinutes: number;
    let travelSource: "google" | "manual" = "manual";
    let hasTrafficData = false;
    let trafficBasis: TrafficBasis = "none";

    const manual = parseInt(manualTravelMinutes, 10);
    if (showManualTravel && !isNaN(manual) && manual >= 0) {
      travelMinutes = manual;
    } else if (hasRouteInputs) {
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
        if (!isNaN(manual) && manual >= 0) {
          travelMinutes = manual;
          track("quota_fallback_used");
        } else {
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
      travelMode,
    });
    setLastCalculatedFingerprint(currentFingerprint);
    setCalendarProvider(null);
    setSubmitAttempted(false);
    track("leave_calculator_used", {
      travel_mode: travelMode,
      travel_source: travelSource,
    });
    trackCalculatorCompleted("leave_time", {
      travel_mode: travelMode,
      travel_source: travelSource,
    });
    window.setTimeout(() => {
      resultPanelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }

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
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4 sm:p-6">
      <div className={`grid min-w-0 gap-6 ${result ? "lg:grid-cols-2 lg:gap-8" : "max-w-2xl"}`}>
        <div ref={formRef} className="min-w-0 scroll-mt-28 space-y-5">
          <div>
            <h2 className="text-xl font-bold text-white">{locale === "es" ? "Planifica tu trayecto" : "Plan your trip"}</h2>
            <p className="mt-1 text-sm text-zinc-400">
              {locale === "es" ? "Los cuatro datos necesarios están aquí." : "Everything needed for your leave time is here."}
            </p>
          </div>

          <div className="space-y-2">
            <div>
              <FieldLabel htmlFor="leave-origin">{copy.startingLocation}</FieldLabel>
              <PlaceAutocomplete
                id="leave-origin"
                value={origin}
                onChange={handleOriginChange}
                placeholder={copy.startingAddress}
                inputClassName={inputClass}
                includeAirports
              />
              {submitAttempted && !hasOrigin && (
                <p className="mt-1.5 text-xs text-red-400" role="alert">{copy.startingRequired}</p>
              )}
              {locationStatus !== "success" && (
                <button
                  type="button"
                  onClick={handleUseCurrentLocation}
                  disabled={locationStatus === "loading"}
                  className="mt-2 inline-flex min-h-11 items-center gap-2 rounded-lg px-2 text-sm font-semibold text-green-400 transition-colors hover:bg-green-500/10 hover:text-green-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 disabled:cursor-wait disabled:text-zinc-500"
                >
                  <LocationIcon />
                  {locationStatus === "loading" ? copy.findingLocation : copy.useLocation}
                </button>
              )}
              {locationMessage && locationStatus === "error" && (
                <p className="mt-1 text-xs text-amber-400" role="alert">
                  {locationMessage}
                </p>
              )}
              {locationStatus === "success" && (
                <p className="sr-only" role="status">{copy.locationAdded}</p>
              )}
            </div>

            <div className="relative h-7" data-swap-control>
              <span className="absolute inset-x-0 top-1/2 h-px bg-zinc-800" aria-hidden="true" />
              <button
                type="button"
                onClick={handleSwap}
                className="absolute left-1/2 top-1/2 flex min-h-11 min-w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-zinc-400 transition-colors hover:border-zinc-600 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
                aria-label={copy.swapAria}
                title={copy.swap}
              >
                <SwapIcon />
              </button>
            </div>

            <div>
              <FieldLabel htmlFor="leave-destination">{copy.destination}</FieldLabel>
              <PlaceAutocomplete
                id="leave-destination"
                value={destination}
                onChange={handleDestinationChange}
                placeholder={copy.whereGoing}
                inputClassName={inputClass}
                includeAirports
              />
              {submitAttempted && !hasDestination && (
                <p className="mt-1.5 text-xs text-red-400" role="alert">{copy.destinationRequired}</p>
              )}
            </div>
          </div>

          <div className="grid min-w-0 gap-3 sm:grid-cols-2">
            <CalculatorDateField
              label={copy.arrivalDate}
              value={arrivalDate}
              today={today}
              inputClassName={inputClass}
              onChange={setArrivalDate}
              locale={locale}
            />
            <div className="min-w-0">
              <FieldLabel htmlFor="leave-arrival-time">{copy.arriveBy}</FieldLabel>
              <input id="leave-arrival-time" type="time" value={arrivalTime} onChange={(e) => setArrivalTime(e.target.value)} className={timeInputClass} />
            </div>
          </div>

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

          <div ref={assumptionsRef} id="timing-assumptions">
            <button
              type="button"
              onClick={() => setShowAssumptions(!showAssumptions)}
              className="flex min-h-12 w-full items-center justify-between gap-3 rounded-lg border border-zinc-700 bg-zinc-800/70 px-4 py-2.5 text-left text-sm font-medium text-zinc-300 transition-colors hover:border-zinc-600 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
              aria-expanded={showAssumptions}
              aria-controls="timing-options-panel"
            >
              <span>
                <span className="block font-semibold">{showAssumptions ? copy.hideAdjustments : copy.adjustAssumptions}</span>
                {!showAssumptions && <span className="mt-0.5 block text-xs font-normal text-zinc-500">{copy.adjustHint}</span>}
              </span>
              <span className={`flex-shrink-0 text-xs text-zinc-500 transition-transform duration-200 ${showAssumptions ? "rotate-180" : ""}`}>▾</span>
            </button>

            {showAssumptions && (
              <div id="timing-options-panel" className="mt-3 space-y-5 rounded-lg border border-zinc-700/50 bg-zinc-800/40 p-4">
                <div>
                  <FieldLabel>{copy.extraBuffer}</FieldLabel>
                  <PillSelector options={[0, 5, 10, 15, 20, 30]} value={buffer} onChange={setBuffer} locale={locale} />
                </div>
                <div>
                  <FieldLabel>{copy.parkingTime} <span className="font-normal text-zinc-500">{copy.optional}</span></FieldLabel>
                  <PillSelector options={[0, 5, 10, 15, 20, 30]} value={prepTime} onChange={setPrepTime} locale={locale} />
                </div>
                <div>
                  <FieldLabel>{copy.travelTime}</FieldLabel>
                  {!showManualTravel ? (
                    <div>
                      <p className="text-xs text-zinc-400">{copy.automaticEstimate}</p>
                      <button type="button" onClick={() => setShowManualTravel(true)} className="mt-2 min-h-11 text-xs text-zinc-400 underline underline-offset-2 hover:text-zinc-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500">
                        {copy.manualInstead}
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <input id="leave-manual-travel" type="number" min="0" max="600" placeholder={copy.exampleMinutes} value={manualTravelMinutes} onChange={(e) => setManualTravelMinutes(e.target.value)} className={`${inputClass} flex-1`} aria-label={copy.travelMinutesAria} />
                        <span className="text-sm text-zinc-400">min</span>
                      </div>
                      <button type="button" onClick={() => { setShowManualTravel(false); setManualTravelMinutes(""); }} className="min-h-11 text-xs text-zinc-400 underline underline-offset-2 hover:text-zinc-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500">
                        {copy.useAutomatic}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {error && <div className="rounded-lg border border-red-900/50 bg-red-950/30 px-4 py-3"><p className="text-sm text-red-400" role="alert">{error}</p></div>}
          {fallbackNotice && !error && <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3"><p className="text-sm text-amber-200" role="status">{fallbackNotice}</p></div>}

          {!result || hasPendingChanges ? (
            <div>
              {hasPendingChanges && (
                <div className="mb-3 rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3" role="status">
                  <p className="text-sm font-semibold text-amber-100">{copy.detailsChanged}</p>
                  <p className="mt-1 text-xs text-amber-200/80">{copy.updateNeeded}</p>
                </div>
              )}
              <button
                type="button"
                onClick={handleCalculate}
                disabled={isCalculating}
                className="min-h-12 w-full rounded-full bg-green-500 px-6 py-3 font-semibold text-black transition-colors hover:bg-green-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900 active:bg-green-600 disabled:cursor-wait disabled:opacity-60"
              >
                {isCalculating ? (result ? copy.updating : copy.estimating) : result ? copy.update : copy.calculate}
              </button>
            </div>
          ) : (
            <p className="flex items-center gap-2 text-sm text-zinc-400" role="status"><span className="text-green-500" aria-hidden="true">✓</span>{copy.resultCurrent}</p>
          )}
        </div>

        {result && (
          <div ref={resultPanelRef} className="min-w-0 scroll-mt-28 lg:sticky lg:top-6 lg:self-start">
            <div className={`rounded-xl border p-5 ${hasPendingChanges ? "border-amber-500/40 bg-amber-500/[0.05]" : "border-zinc-700 bg-zinc-800/80"}`}>
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">{copy.leaveBy}</p>
              <p className="mt-0.5 text-6xl font-black leading-none text-green-500" aria-live="polite" aria-atomic="true">{fmtTime(result.leaveTime, locale)}</p>
              <p className="mt-1.5 text-sm text-zinc-400">{fmtDate(result.leaveTime, locale)}</p>

              <div className="mt-5 border-t border-zinc-800 pt-4">
                <p className="text-sm text-zinc-300">
                  {result.travelMinutes} min {copy.modes[result.travelMode]}
                  {result.travelSource === "google" ? ` · ${trafficLabel(result.trafficBasis, result.planningMode, locale)}` : ""}
                </p>
                <p className="mt-0.5 text-sm text-zinc-400">
                  {[result.bufferMinutes > 0 ? `${result.bufferMinutes} min ${copy.buffer}` : null, result.prepMinutes > 0 ? `${result.prepMinutes} min ${copy.parkingWalkIn}` : null].filter(Boolean).join(" · ") || copy.noExtraBuffer}
                </p>
              </div>

              {!hasPendingChanges && (
                <button type="button" onClick={handleCustomize} className="mt-3 inline-flex min-h-11 items-center text-sm font-semibold text-zinc-400 underline underline-offset-4 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500">
                  {copy.adjustAssumptions}
                </button>
              )}

              {!hasPendingChanges && (
                <CalendarOnTimerHandoff
                  calendarHref={leaveCalendarHref}
                  alternateCalendarHref={leaveCalendarIcsHref}
                  alternateCalendarFilename="leave-time.ics"
                  calendarProvider={calendarProvider}
                  setCalendarProvider={setCalendarProvider}
                  calculatorType="leave_time"
                  compactOpenedStatus
                  postCalendarHeading={copy.alarmHeading}
                  postCalendarBody={copy.alarmBody}
                  locale={locale}
                  appLocation="leave_calculator_result"
                  eventPreview={{ title: leaveCalendarEvent?.title ?? `${copy.leaveFor} ${copy.destinationFallback}`, startLabel: fmtTime(result.leaveTime, locale) }}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
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
