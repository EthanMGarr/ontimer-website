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

import { useEffect, useState } from "react";
import CalendarOnTimerHandoff from "@/components/leave-time/CalendarOnTimerHandoff";
import CalculatorDateField from "@/components/leave-time/CalculatorDateField";
import PlaceAutocomplete from "@/components/PlaceAutocomplete";
import CurrentLocationControl from "@/components/CurrentLocationControl";
import { fireEvent, trackCalculatorCompleted, trackCalculatorStarted } from "@/lib/analytics";
import { buildGoogleCalendarLink, buildIcsCalendarDataUri, ONTIMER_CALENDAR_DESCRIPTION } from "@/lib/calendar-links";
import type { SiteLocale } from "@/lib/i18n";

type TravelMode = "DRIVE" | "WALK" | "TRANSIT";
type PlanningMode = "today" | "future";
type TrafficBasis = "live" | "predicted" | "scheduled" | "none";

interface CalculatorResult {
  wakeUpTime: Date;
  arrivalTime: Date;
  travelMinutes: number;
  getReadyMinutes: number;
  bufferMinutes: number;
  extraMinutes: number;
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

function fmtTime(d: Date, locale: SiteLocale) {
  return d.toLocaleTimeString(locale === "es" ? "es-ES" : undefined, { hour: "numeric", minute: "2-digit" });
}
function fmtDate(d: Date, locale: SiteLocale) {
  return d.toLocaleDateString(locale === "es" ? "es-ES" : undefined, { weekday: "short", month: "short", day: "numeric" });
}

function localDateString(date = new Date()): string {
  return date.toLocaleDateString("en-CA");
}

function planningModeForDate(date: string): PlanningMode {
  return date === localDateString() ? "today" : "future";
}

function trafficLabel(basis: TrafficBasis, mode: PlanningMode, locale: SiteLocale): string {
  if (locale === "es") {
    if (basis === "scheduled") return "horario programado";
    if (basis === "none") return "estimado";
    return mode === "future" || basis === "predicted" ? "tráfico previsto" : "tráfico actual";
  }
  if (basis === "scheduled") return "scheduled route";
  if (basis === "none") return "estimated";
  return mode === "future" || basis === "predicted" ? "expected traffic" : "live traffic";
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <p className="mb-2 text-sm font-semibold text-zinc-300">{children}</p>;
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
          {opt === 0 ? (locale === "es" ? "Ninguno" : "None") : `${opt} min`}
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
  "min-w-0 w-full max-w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2.5 text-sm text-white placeholder-zinc-400 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500";

const timeInputClass = `${inputClass} block h-[42px] appearance-none box-border py-0 [color-scheme:dark]`;

function defaultArrival() {
  const d = new Date();
  d.setHours(9, 0, 0, 0);
  if (d < new Date()) d.setDate(d.getDate() + 1);
  return {
    date: d.toLocaleDateString("en-CA"),
    time: "09:00",
  };
}

export default function WakeUpCalculator({ locale = "en" }: { locale?: SiteLocale }) {
  const isSpanish = locale === "es";
  const copy = isSpanish ? {
    destination: "Destino",
    destinationPlaceholder: "Escribe una dirección o lugar de destino",
    origin: "Punto de partida",
    originPlaceholder: "Escribe tu dirección de salida",
    currentLocation: "Ubicación actual",
    arrivalDate: "Fecha de llegada",
    arriveBy: "Llegar a las",
    travelMode: "Medio de transporte",
    driving: "En coche",
    walking: "A pie",
    transit: "Transporte público",
    readyTime: "¿Cuánto tiempo necesitas para prepararte?",
    buffer: "Margen adicional",
    extraTime: "Tiempo para desayunar, preparar cosas o salir de casa",
    optional: "(opcional)",
    estimatedTravel: "Tiempo de viaje estimado",
    estimatedTravelHelp: "Se estima automáticamente a partir de tus ubicaciones. Puedes sustituirlo si es necesario.",
    manualTravelPlaceholder: "O introduce los minutos manualmente (opcional)",
    travelMinutes: "Tiempo de viaje (minutos)",
    manualPlaceholder: "p. ej., 25",
    manualHelp: "Indica arriba el punto de partida y el destino para obtener una estimación automática.",
    calculating: "Calculando el tiempo de viaje…",
    calculate: "Calcular la hora de despertar →",
    wakeAt: "Despiértate a las",
    travelTime: "Tiempo de viaje",
    getReady: "Prepararte",
    breakfast: "Desayuno / preparativos",
    adjust: "Ajustar tiempos",
    emptyHeading: "Tu hora de despertar aparecerá aquí",
    emptyBody: "Indica el destino, la hora de llegada y tu rutina; después pulsa Calcular.",
    emptyItems: ["Tiempo de viaje según el tráfico", "Incluye tu rutina de la mañana", "Una hora concreta para levantarte sin prisas"],
  } : {
    destination: "Destination",
    destinationPlaceholder: "Enter destination address or place",
    origin: "Starting location",
    originPlaceholder: "Enter your starting address",
    currentLocation: "Current location",
    arrivalDate: "Arrival date",
    arriveBy: "Arrive by",
    travelMode: "Travel mode",
    driving: "Driving",
    walking: "Walking",
    transit: "Transit",
    readyTime: "How long do you need to get ready?",
    buffer: "Extra buffer",
    extraTime: "Extra time for breakfast, packing, or getting out the door",
    optional: "(optional)",
    estimatedTravel: "Estimated travel time",
    estimatedTravelHelp: "Estimated automatically from your locations. Override if needed.",
    manualTravelPlaceholder: "Or enter minutes manually (optional)",
    travelMinutes: "Travel time (minutes)",
    manualPlaceholder: "e.g. 25",
    manualHelp: "Enter a starting location and destination above for an automatic estimate.",
    calculating: "Estimating travel time…",
    calculate: "Calculate wake-up time →",
    wakeAt: "Wake up at",
    travelTime: "Travel time",
    getReady: "Get ready",
    breakfast: "Breakfast / packing",
    adjust: "Adjust assumptions",
    emptyHeading: "Your wake-up time will appear here",
    emptyBody: "Fill in your destination, arrival time, and routine, then click Calculate.",
    emptyItems: ["Real travel time based on traffic", "Accounts for your morning routine", "Exact wake-up time so you are not rushed"],
  };

  const [destination, setDestination] = useState("");
  const [origin, setOrigin] = useState("");
  const [currentLocation, setCurrentLocation] = useState<string | null>(null);
  const [today, setToday] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");
  const planningMode = planningModeForDate(arrivalDate);
  const [arrivalTime, setArrivalTime] = useState("");
  const [travelMode, setTravelMode] = useState<TravelMode>("DRIVE");
  const [getReadyTime, setGetReadyTime] = useState(45);
  const [buffer, setBuffer] = useState(10);
  const [extraTime, setExtraTime] = useState(0);
  const [manualTravelMinutes, setManualTravelMinutes] = useState("");

  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState<CalculatorResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fallbackNotice, setFallbackNotice] = useState<string | null>(null);
  const [calendarProvider, setCalendarProvider] = useState<"google" | "ics" | null>(null);

  const hasRouteInputs =
    origin.trim().length >= 2 && destination.trim().length >= 2;

  useEffect(() => {
    setCalendarProvider(null);
  }, [destination, arrivalDate, arrivalTime, travelMode, getReadyTime, buffer, extraTime]);

  useEffect(() => {
    const { date, time } = defaultArrival();
    setToday(localDateString());
    setArrivalDate(date);
    setArrivalTime(time);
  }, []);

  function handleOriginChange(value: string) {
    setOrigin(value);
    setCurrentLocation(null);
  }

  function handleCurrentLocationChange(coordinates: string | null) {
    setCurrentLocation(coordinates);
    if (coordinates) setOrigin(copy.currentLocation);
    else if (origin === copy.currentLocation) setOrigin("");
  }

  async function handleCalculate() {
    trackCalculatorStarted("wake_up", { travel_mode: travelMode });
    setError(null);
    setFallbackNotice(null);

    if (!arrivalDate || !arrivalTime) {
      setError(isSpanish ? "Indica la fecha y la hora a la que necesitas llegar." : "Enter the date and time you need to arrive.");
      return;
    }

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
        fireEvent(res.cacheHit ? "travel_time_cache_hit" : "routes_api_called", {
          page_path: window.location.pathname,
          duration_minutes: travelMinutes,
        });
      } catch {
        const manual = parseInt(manualTravelMinutes, 10);
        if (!isNaN(manual) && manual >= 0) {
          travelMinutes = manual;
          fireEvent("quota_fallback_used", { page_path: window.location.pathname });
        } else {
          setFallbackNotice(isSpanish
            ? "La estimación automática no está disponible para este trayecto. Introduce el tiempo manualmente o prueba con una dirección más completa."
            : "Automatic travel time is unavailable for this route. Enter travel time manually below, or try a fuller address.");
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
          isSpanish
            ? "Indica el punto de partida y el destino, o introduce manualmente el tiempo de viaje."
            : "Enter your starting location and destination, or enter travel time manually below."
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
      trafficBasis,
      planningMode,
    });
    fireEvent("wakeup_calculator_used", {
      page_path: window.location.pathname,
      travel_mode: travelMode,
      travel_source: travelSource,
    });
    trackCalculatorCompleted("wake_up", {
      travel_mode: travelMode,
      travel_source: travelSource,
    });
  }

  const arrivalCalendarEvent = result
    ? {
        title: isSpanish
          ? `Llegar a ${destination.split(",")[0] || "destino"}`
          : `Arrive at ${destination.split(",")[0] || "destination"}`,
        start: result.arrivalTime,
        end: new Date(result.arrivalTime.getTime() + 30 * 60 * 1000),
        details: isSpanish
          ? `Hora de despertar: ${fmtTime(result.wakeUpTime, locale)}\nCalculado por OnTimer\nDescarga gratis la app para iPhone: https://apps.apple.com/us/app/ontimer-never-be-late/id6755317601`
          : `Wake-up time: ${fmtTime(result.wakeUpTime, locale)}\n${ONTIMER_CALENDAR_DESCRIPTION}`,
        location: destination || undefined,
      }
    : null;
  const arrivalCalendarHref = arrivalCalendarEvent ? buildGoogleCalendarLink(arrivalCalendarEvent) : "";
  const arrivalCalendarIcsHref = arrivalCalendarEvent ? buildIcsCalendarDataUri(arrivalCalendarEvent) : "";

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 sm:p-8">
      <div className="grid gap-10 lg:grid-cols-2">
        {/* ── Inputs ── */}
        <div id="wake-up-calculator-form" className="scroll-mt-28 space-y-7">
          {/* Locations */}
          <div className="space-y-4">
            <div className="min-w-0">
              <FieldLabel>{copy.destination}</FieldLabel>
              <PlaceAutocomplete
                value={destination}
                onChange={setDestination}
                placeholder={copy.destinationPlaceholder}
                inputClassName={inputClass}
                includeAirports
              />
            </div>
            <div className="min-w-0">
              <FieldLabel>{copy.origin}</FieldLabel>
              <PlaceAutocomplete
                value={origin}
                onChange={handleOriginChange}
                placeholder={copy.originPlaceholder}
                inputClassName={inputClass}
                includeAirports
              />
              <CurrentLocationControl
                active={currentLocation !== null}
                onLocationChange={handleCurrentLocationChange}
                locale={locale}
              />
            </div>
          </div>

          {/* Planning mode + arrival time */}
          <div className="grid gap-4 sm:grid-cols-2">
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
                aria-label={copy.arriveBy}
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
              onChange={setTravelMode}
            />
          </div>

          {/* Get-ready time */}
          <div>
            <FieldLabel>{copy.readyTime}</FieldLabel>
            <PillSelector
              options={[15, 30, 45, 60, 75, 90]}
              value={getReadyTime}
              onChange={setGetReadyTime}
              locale={locale}
            />
          </div>

          {/* Buffer */}
          <div>
            <FieldLabel>{copy.buffer}</FieldLabel>
            <PillSelector
              options={[0, 5, 10, 15, 20, 30]}
              value={buffer}
              onChange={setBuffer}
              locale={locale}
            />
          </div>

          {/* Extra morning time */}
          <div>
            <FieldLabel>
              {copy.extraTime}{" "}
              <span className="font-normal text-zinc-400">{copy.optional}</span>
            </FieldLabel>
            <PillSelector
              options={[0, 5, 10, 15, 20, 30]}
              value={extraTime}
              onChange={setExtraTime}
              locale={locale}
            />
          </div>

          {/* Manual travel time */}
          <div>
            {hasRouteInputs ? (
              <>
                <FieldLabel>{copy.estimatedTravel}</FieldLabel>
                <p className="mb-2 text-xs text-zinc-400">
                  {copy.estimatedTravelHelp}
                </p>
                <input
                  type="number"
                  min="0"
                  max="600"
                  placeholder={copy.manualTravelPlaceholder}
                  value={manualTravelMinutes}
                  onChange={(e) => setManualTravelMinutes(e.target.value)}
                  className={inputClass}
                />
              </>
            ) : (
              <>
                <FieldLabel>{copy.travelMinutes}</FieldLabel>
                <input
                  type="number"
                  min="0"
                  max="600"
                  placeholder={copy.manualPlaceholder}
                  value={manualTravelMinutes}
                  onChange={(e) => setManualTravelMinutes(e.target.value)}
                  className={inputClass}
                />
                <p className="mt-1.5 text-xs text-zinc-400">
                  {copy.manualHelp}
                </p>
              </>
            )}
          </div>

          {error && (
            <p className="rounded-lg border border-red-900/50 bg-red-950/30 px-4 py-3 text-sm text-red-400">
              {error}
            </p>
          )}
          {fallbackNotice && !error && (
            <p className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
              {fallbackNotice}
            </p>
          )}

          <button
            type="button"
            onClick={handleCalculate}
            disabled={isCalculating}
            className="w-full rounded-full bg-green-500 px-6 py-3 font-semibold text-black transition-colors hover:bg-green-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isCalculating ? copy.calculating : copy.calculate}
          </button>
        </div>

        {/* ── Results ── */}
        <div className="flex flex-col">
          {result ? (
            <div className="rounded-xl border border-zinc-700 bg-zinc-800 p-6">
              <div className="border-b border-zinc-700 pb-5">
                <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  {copy.wakeAt}
                </p>
                <p className="text-5xl font-black text-green-500">
                  {fmtTime(result.wakeUpTime, locale)}
                </p>
                <p className="mt-1 text-sm text-zinc-400">{fmtDate(result.wakeUpTime, locale)}</p>
              </div>

              <div className="space-y-3 pt-4">
                <div className="flex items-baseline justify-between">
                  <p className="text-xs text-zinc-400">{copy.arriveBy}</p>
                  <p className="text-sm font-semibold text-white">
                    {fmtTime(result.arrivalTime, locale)}
                  </p>
                </div>
                <div className="flex items-baseline justify-between">
                  <p className="text-xs text-zinc-400">{copy.travelTime}</p>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-white">
                      {result.travelMinutes} min
                    </p>
                    {result.travelSource === "google" && (
                      <p className="text-xs text-green-500">
                        {trafficLabel(result.trafficBasis, result.planningMode, locale)}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-baseline justify-between">
                  <p className="text-xs text-zinc-400">{copy.getReady}</p>
                  <p className="text-sm font-semibold text-white">
                    {result.getReadyMinutes} min
                  </p>
                </div>
                {result.bufferMinutes > 0 && (
                  <div className="flex items-baseline justify-between">
                    <p className="text-xs text-zinc-400">{copy.buffer}</p>
                    <p className="text-sm font-semibold text-white">
                      {result.bufferMinutes} min
                    </p>
                  </div>
                )}
                {result.extraMinutes > 0 && (
                  <div className="flex items-baseline justify-between">
                    <p className="text-xs text-zinc-400">{copy.breakfast}</p>
                    <p className="text-sm font-semibold text-white">
                      {result.extraMinutes} min
                    </p>
                  </div>
                )}
              </div>

              <p className="mt-4 border-t border-zinc-700 pt-4 text-xs leading-relaxed text-zinc-400">
                {isSpanish ? (
                  <>Para llegar a las {fmtTime(result.arrivalTime, locale)}, con {result.travelMinutes} min de viaje y {result.getReadyMinutes} min para prepararte{result.bufferMinutes > 0 ? `, ${result.bufferMinutes} min de margen` : ""}{result.extraMinutes > 0 ? ` y ${result.extraMinutes} min adicionales` : ""}, despiértate a las {fmtTime(result.wakeUpTime, locale)}.</>
                ) : (
                  <>To arrive by {fmtTime(result.arrivalTime, locale)} with {result.travelMinutes} min of travel and {result.getReadyMinutes} min to get ready{result.bufferMinutes > 0 ? `, a ${result.bufferMinutes}-min buffer` : ""}{result.extraMinutes > 0 ? `, and ${result.extraMinutes} min of extra morning time` : ""}, wake up at {fmtTime(result.wakeUpTime, locale)}.</>
                )}
              </p>
              <button
                type="button"
                onClick={() => document.getElementById("wake-up-calculator-form")?.scrollIntoView({ behavior: "smooth", block: "start" })}
                className="mt-2 inline-flex min-h-11 items-center text-sm font-semibold text-green-400 underline underline-offset-4 hover:text-green-300"
              >
                {copy.adjust}
              </button>

              <CalendarOnTimerHandoff
                calendarHref={arrivalCalendarHref}
                alternateCalendarHref={arrivalCalendarIcsHref}
                alternateCalendarFilename="arrival-event.ics"
                calendarProvider={calendarProvider}
                setCalendarProvider={setCalendarProvider}
                calculatorType="wake_up"
                readyHeading={isSpanish ? "Guarda la hora de llegada en tu calendario." : "Put your arrival appointment on your calendar."}
                openedItemLabel={isSpanish ? "evento de llegada" : "arrival event"}
                compactOpenedStatus
                postCalendarHeading={isSpanish ? "No llegues tarde. Convierte el evento en una alarma." : "Don’t be late. Turn this into an alarm."}
                postCalendarBody={isSpanish ? "OnTimer configura alarmas automáticamente para los eventos de tu calendario" : "OnTimer automatically sets alarms for your calendar events"}
                appLocation="wakeup_calculator_result"
                locale={locale}
                eventPreview={{
                  title: arrivalCalendarEvent?.title ?? (isSpanish ? "Llegar al destino" : "Arrive at destination"),
                  startLabel: fmtTime(result.arrivalTime, locale),
                }}
              />
            </div>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-dashed border-zinc-700 p-10 text-center">
              <div className="mb-4 text-4xl">⏰</div>
              <p className="text-base font-semibold text-zinc-300">
                {copy.emptyHeading}
              </p>
              <p className="mt-1.5 text-sm text-zinc-400">
                {copy.emptyBody}
              </p>
              <ul className="mt-6 w-full max-w-xs space-y-2.5 text-left">
                {copy.emptyItems.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-xs text-zinc-400">
                    <span className="mt-0.5 flex-shrink-0 text-zinc-400">•</span>
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
