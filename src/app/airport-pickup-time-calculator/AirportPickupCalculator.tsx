/* Hallmark · pre-emit critique: P5 H5 E4 S5 R5 V4 */
"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import AirportAutocomplete from "@/components/AirportAutocomplete";
import PlaceAutocomplete from "@/components/PlaceAutocomplete";
import CalendarOnTimerHandoff from "@/components/leave-time/CalendarOnTimerHandoff";
import CalculatorDateField from "@/components/leave-time/CalculatorDateField";
import CurrentLocationControl from "@/components/CurrentLocationControl";
import { trackCalculatorCompleted, trackCalculatorStarted } from "@/lib/analytics";
import { getDefaultAirportEventTime } from "@/lib/airport-planning-default";
import { calculateAirportPickup, type AirportPickupPlan } from "@/lib/airport-pickup";
import {
  buildGoogleCalendarLink,
  buildIcsCalendarDataUri,
  buildPickupAirportPlanCalendarDescription,
} from "@/lib/calendar-links";
import {
  buildAirportPlanLink,
  type ParsedPickupAirportPlan,
} from "@/lib/airport-plan-link";
import {
  invalidAddressMessage,
  isInvalidTravelTimeLocation,
  readTravelTimeResponse,
} from "@/lib/travel-time-errors";

type Relationship = "someone" | "friend" | "colleague" | "wife" | "husband" | "girlfriend" | "boyfriend" | "daughter" | "son" | "parent" | "cousin" | "family member";
type TravelResult = { durationMinutes: number; hasTrafficData: boolean; trafficBasis: "live" | "predicted" | "scheduled" | "none" };
const formatTime = (date: Date) => date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
const formatDateTime = (date: Date) => date.toLocaleString([], { weekday: "short", month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
const localInputDateString = (date: Date) => {
  const pad = (value: number) => String(value).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
};
const localInputTimeString = (date: Date) => {
  const pad = (value: number) => String(value).padStart(2, "0");
  return `${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

async function fetchDriveTime(origin: string, destination: string, departureAt: Date): Promise<TravelResult> {
  const params = new URLSearchParams({ origin: origin.trim(), destination: destination.trim(), departureTime: Math.floor(departureAt.getTime() / 1000).toString(), travelMode: "DRIVE" });
  const response = await fetch(`/api/travel-time?${params}`);
  return readTravelTimeResponse<TravelResult>(response);
}

interface AirportPickupCalculatorProps {
  initialAirport?: string;
  locationCode?: string;
  lockAirport?: boolean;
  pageType?: "generic_pickup" | "airport_pickup";
  intentNav?: ReactNode;
  initialPlan?: ParsedPickupAirportPlan;
}

export default function AirportPickupCalculator({
  initialAirport = "",
  locationCode,
  lockAirport = false,
  pageType = "generic_pickup",
  intentNav,
  initialPlan,
}: AirportPickupCalculatorProps) {
  const initialLandingDate = initialPlan?.landingAt
    ? localInputDateString(initialPlan.landingAt)
    : "";
  const initialLandingTime = initialPlan?.landingAt
    ? localInputTimeString(initialPlan.landingAt)
    : "";
  const initialAirportValue = initialPlan?.airportName ?? initialPlan?.airportCode ?? initialAirport;
  const hasInitialLanding = Boolean(initialPlan?.landingAt);
  const [today, setToday] = useState("");
  const [relationship, setRelationship] = useState<Relationship>("someone");
  const [airport, setAirport] = useState(initialAirportValue);
  const [selectedAirportCode, setSelectedAirportCode] = useState<string | null>(initialPlan?.airportCode ?? locationCode ?? null);
  const [arrivalDate, setArrivalDate] = useState(initialLandingDate);
  const [arrivalTime, setArrivalTime] = useState(initialLandingTime);
  const [origin, setOrigin] = useState("");
  const [currentLocation, setCurrentLocation] = useState<string | null>(null);
  const [checkedBag, setCheckedBag] = useState(initialPlan?.checkedBag ?? false);
  const [international, setInternational] = useState(initialPlan?.flightType === "international");
  const [meetInside, setMeetInside] = useState(initialPlan?.meetMode === "inside");
  const [manualDrive, setManualDrive] = useState("");
  const [plan, setPlan] = useState<(AirportPickupPlan & { driveMinutes: number; trafficBasis: TravelResult["trafficBasis"] | "manual" }) | null>(null);
  const [calendarProvider, setCalendarProvider] = useState<"google" | "ics" | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [isResolvingOrigin, setIsResolvingOrigin] = useState(false);
  const [error, setError] = useState("");
  const started = useRef(false);
  const resultPanelRef = useRef<HTMLElement>(null);
  const person = relationship === "someone" ? "your passenger" : `your ${relationship}`;
  const arrivalValue = arrivalDate && arrivalTime ? `${arrivalDate}T${arrivalTime}` : "";
  const analyticsContext = {
    airport_code: locationCode ?? "unspecified",
    page_type: pageType,
    planning_intent: "pickup",
  };

  useEffect(() => {
    const defaults = getDefaultAirportEventTime();
    setToday(defaults.date);
    if (!hasInitialLanding) {
      setArrivalDate(defaults.date);
      setArrivalTime(defaults.time);
    }
  }, [hasInitialLanding]);

  useEffect(() => {
    if (initialAirport || typeof window === "undefined") return;
    const requestedAirport = new URLSearchParams(window.location.search).get("airport")?.trim();
    if (requestedAirport) setAirport(requestedAirport.slice(0, 120));
  }, [initialAirport]);

  useEffect(() => {
    if (!plan || typeof window === "undefined" || window.innerWidth > 820) return;
    const frame = window.requestAnimationFrame(() => {
      resultPanelRef.current?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        block: "start",
      });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [plan]);

  const landingAt = arrivalValue ? new Date(arrivalValue) : null;
  const normalizedAirportCode = (selectedAirportCode ?? airport).trim().toUpperCase();
  const airportPlanCode = normalizedAirportCode && /^[A-Z]{3}$/.test(normalizedAirportCode)
    ? normalizedAirportCode
    : undefined;
  const recalculateUrl = plan && landingAt && !Number.isNaN(landingAt.getTime())
    ? buildAirportPlanLink({
        kind: "pickup",
        ...(airportPlanCode ? { airportCode: airportPlanCode } : { airportName: airport }),
        landingAt,
        flightType: international ? "international" : "domestic",
        checkedBag,
        meetMode: meetInside ? "inside" : "curb",
      })
    : null;
  const calendarEvent = plan && recalculateUrl ? {
    title: `Leave to pick up ${person} at ${airport}`,
    start: plan.leaveAt,
    end: new Date(plan.leaveAt.getTime() + 30 * 60_000),
    location: airport,
    details: buildPickupAirportPlanCalendarDescription(
      recalculateUrl,
      `Picking up ${person}.`,
    ),
  } : null;

  function noteStarted() { if (!started.current) { started.current = true; trackCalculatorStarted("airport_pickup", analyticsContext); } }
  function resetResult() { setCalendarProvider(null); setError(""); }
  function handleOriginChange(value: string) { noteStarted(); setOrigin(value); setCurrentLocation(null); resetResult(); }
  function handleCurrentLocationChange(coordinates: string | null) {
    noteStarted();
    setCurrentLocation(coordinates);
    if (coordinates) setOrigin("Current location");
    else if (origin === "Current location") setOrigin("");
    resetResult();
  }

  async function calculate() {
    noteStarted();
    const arrival = new Date(arrivalValue);
    if (!airport.trim() || !origin.trim() || Number.isNaN(arrival.getTime())) { setError("Add the pickup airport, scheduled landing time, and where you’re driving from."); return; }
    setIsCalculating(true); setError("");
    try {
      let driveMinutes: number;
      let trafficBasis: TravelResult["trafficBasis"] | "manual";
      if (manualDrive.trim()) { driveMinutes = Number(manualDrive); trafficBasis = "manual"; }
      else {
        const roughReady = new Date(arrival.getTime() + (20 + (checkedBag ? 20 : 0) + (international ? 45 : 0)) * 60_000);
        const route = await fetchDriveTime(currentLocation ?? origin, airport, roughReady);
        driveMinutes = route.durationMinutes; trafficBasis = route.trafficBasis;
      }
      if (!Number.isFinite(driveMinutes) || driveMinutes <= 0) throw new Error("Invalid travel time");
      const timing = calculateAirportPickup({ arrival, deplaneMinutes: 10, airportWalkMinutes: 10, bagMinutes: checkedBag ? 20 : 0, immigrationMinutes: international ? 45 : 0, driveMinutes, parkingMinutes: meetInside ? 20 : 0, curbTimingMinutes: meetInside ? 0 : 5 });
      setPlan({ ...timing, driveMinutes, trafficBasis });
      trackCalculatorCompleted("airport_pickup", { ...analyticsContext, relationship, checked_bag: checkedBag ? 1 : 0, international: international ? 1 : 0, meet_inside: meetInside ? 1 : 0, drive_minutes: driveMinutes });
    } catch (caught) {
      setError(isInvalidTravelTimeLocation(caught)
        ? invalidAddressMessage()
        : "Automatic drive time isn’t available right now. Enter the drive time below and calculate again.");
    }
    finally { setIsCalculating(false); }
  }

  return <div className={`pickup-workbench pickup-shell${plan ? " pickup-workbench--ready" : ""}`}>
    {plan ? <section ref={resultPanelRef} className="pickup-result pickup-result--ready" aria-live="polite">
      <p className="pickup-result__context">For the {formatTime(new Date(arrivalValue))} arrival</p>
      <p className="pickup-step">Leave by</p>
      <h2>{formatTime(plan.leaveAt)}</h2>
      <p className="pickup-result__date">{formatDateTime(plan.leaveAt)}</p>
      {calendarEvent ? <CalendarOnTimerHandoff calendarHref={buildGoogleCalendarLink(calendarEvent)} alternateCalendarHref={buildIcsCalendarDataUri(calendarEvent)} alternateCalendarFilename="airport-pickup.ics" calendarProvider={calendarProvider} setCalendarProvider={setCalendarProvider} calculatorType="airport_pickup" readyHeading={`Put ${person}’s pickup on your calendar.`} openedItemLabel="pickup event" compactOpenedStatus postCalendarHeading="Get an alarm when it’s time to leave." postCalendarBody="OnTimer turns this pickup into an automatic calendar alarm." appLocation="airport_pickup_after_calendar" analyticsContext={{ ...analyticsContext, relationship }} eventPreview={{ title: calendarEvent.title, startLabel: formatDateTime(plan.leaveAt) }} /> : null}
      <div className="pickup-timeline"><div><span>1</span><p><strong>You leave</strong>{formatTime(plan.leaveAt)} · {plan.driveMinutes} min drive</p></div><div><span>2</span><p><strong>Flight lands</strong>{formatTime(new Date(arrivalValue))} at {airport}</p></div><div><span>3</span><p><strong>{person} reaches pickup</strong>About {formatTime(plan.passengerReady)}</p></div></div>
      <details className="pickup-breakdown"><summary>How we estimated this</summary><dl><div><dt>Getting off the plane</dt><dd>10 min</dd></div><div><dt>Walk to arrivals</dt><dd>10 min</dd></div>{checkedBag ? <div><dt>Checked bag</dt><dd>20 min</dd></div> : null}{international ? <div><dt>Immigration</dt><dd>45 min</dd></div> : null}{meetInside ? <div><dt>Parking and walking in</dt><dd>20 min</dd></div> : <div><dt>Curb timing</dt><dd>Aim 5 min after they’re ready</dd></div>}<div><dt>Your drive</dt><dd>{plan.driveMinutes} min · {plan.trafficBasis === "live" ? "live traffic" : plan.trafficBasis === "predicted" ? "expected traffic" : "estimate"}</dd></div></dl></details>
      <p className="pickup-assumption">Flight schedules can change. Check the airline before you leave.</p>
    </section> : null}

    <form className="pickup-form" onSubmit={(event) => { event.preventDefault(); void calculate(); }}>
      {intentNav}
      <section className="pickup-form-section" aria-labelledby="pickup-flight-arrival-heading">
        <h2 id="pickup-flight-arrival-heading">{plan ? "Edit Trip" : "Flight arrival"}</h2>
        {lockAirport ? (
          <div className="pickup-airport-context" aria-label={`Pickup airport: ${airport}`}>
            <span>Pickup airport</span>
            <strong>{airport}</strong>
          </div>
        ) : <div className="pickup-field pickup-field--airport">
          <label htmlFor="pickup-airport">Pickup airport</label>
          <AirportAutocomplete
            inputId="pickup-airport"
            value={airport}
            onChange={(value) => { noteStarted(); setAirport(value); resetResult(); }}
            onOptionSelected={(option) => setSelectedAirportCode(option?.code ?? null)}
            options={[]}
            inputClassName="pickup-input"
          />
        </div>}
        <div className="pickup-landing__fields">
          <CalculatorDateField
            label="Flight date"
            value={arrivalDate}
            today={today}
            inputId="pickup-arrival-date"
            inputClassName="pickup-input pickup-date-input"
            labelClassName="pickup-landing__label"
            colorSchemeClassName="[color-scheme:light]"
            chevronClassName="pickup-date-chevron"
            onChange={(value) => { noteStarted(); setArrivalDate(value); resetResult(); }}
          />
          <div>
            <label htmlFor="pickup-arrival-time">Flight lands at</label>
            <input id="pickup-arrival-time" className="pickup-input" type="time" value={arrivalTime} onChange={(event) => { noteStarted(); setArrivalTime(event.target.value); resetResult(); }} />
          </div>
        </div>
      </section>

      <section className="pickup-form-section" aria-labelledby="pickup-route-heading">
        <h2 id="pickup-route-heading">Route</h2>
        <div className="pickup-field">
          <label htmlFor="pickup-origin">Leaving from</label>
          <PlaceAutocomplete id="pickup-origin" value={origin} onChange={handleOriginChange} placeholder="Your address or city" inputClassName="pickup-input" onResolutionChange={setIsResolvingOrigin} />
          <CurrentLocationControl active={currentLocation !== null} onLocationChange={handleCurrentLocationChange} />
        </div>
        <details className="pickup-manual"><summary>Enter drive time manually</summary><label htmlFor="pickup-drive">Drive time in minutes</label><input id="pickup-drive" className="pickup-input" type="number" min="1" max="300" value={manualDrive} onChange={(event) => { setManualDrive(event.target.value); resetResult(); }} /></details>
      </section>

      <section className="pickup-form-section" aria-labelledby="pickup-details-heading">
        <h2 id="pickup-details-heading">Pickup details</h2>
        <fieldset className="pickup-choices"><legend className="pickup-visually-hidden">Pickup details</legend>
          <label><input type="checkbox" checked={checkedBag} onChange={(event) => { setCheckedBag(event.target.checked); resetResult(); }} /> Checked bag</label>
          <label><input type="checkbox" checked={international} onChange={(event) => { setInternational(event.target.checked); resetResult(); }} /> International arrival</label>
          <label><input type="checkbox" checked={meetInside} onChange={(event) => { setMeetInside(event.target.checked); resetResult(); }} /> Park and meet inside</label>
        </fieldset>
        <details className="pickup-personalize">
          <summary><span>Personalize the calendar event</span><small>Optional</small></summary>
          <label htmlFor="pickup-person">Who are you picking up?</label>
          <select id="pickup-person" className="pickup-input" value={relationship} onChange={(event) => { noteStarted(); setRelationship(event.target.value as Relationship); resetResult(); }}>
            <option value="someone">Someone</option>
            <option value="friend">A friend</option>
            <option value="colleague">A colleague</option>
            <option value="wife">My wife</option>
            <option value="husband">My husband</option>
            <option value="girlfriend">My girlfriend</option>
            <option value="boyfriend">My boyfriend</option>
            <option value="daughter">My daughter</option>
            <option value="son">My son</option>
            <option value="parent">My parent</option>
            <option value="cousin">My cousin</option>
            <option value="family member">A family member</option>
          </select>
          <p>The person you choose only changes the calendar event title—not the timing.</p>
        </details>
      </section>
      {error ? <p className="pickup-error" role="alert">{error}</p> : null}
      <button className="pickup-submit" type="submit" disabled={isCalculating || isResolvingOrigin}>{isResolvingOrigin ? "Checking the address…" : isCalculating ? "Checking the drive…" : plan ? "Update pickup plan" : "Calculate when to leave"}</button>
    </form>
  </div>;
}
