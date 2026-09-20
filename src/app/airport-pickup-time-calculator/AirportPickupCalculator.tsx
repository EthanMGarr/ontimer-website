/* Hallmark · pre-emit critique: P5 H5 E4 S5 R5 V4 */
"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import AirportAutocomplete from "@/components/AirportAutocomplete";
import PlaceAutocomplete from "@/components/PlaceAutocomplete";
import CalendarOnTimerHandoff from "@/components/leave-time/CalendarOnTimerHandoff";
import { trackCalculatorCompleted, trackCalculatorStarted } from "@/lib/analytics";
import { calculateAirportPickup, type AirportPickupPlan } from "@/lib/airport-pickup";
import { buildGoogleCalendarLink, buildIcsCalendarDataUri, ONTIMER_CALENDAR_DESCRIPTION } from "@/lib/calendar-links";

type Relationship = "someone" | "friend" | "colleague" | "wife" | "husband" | "girlfriend" | "boyfriend" | "daughter" | "son" | "parent" | "cousin" | "family member";
type TravelResult = { durationMinutes: number; hasTrafficData: boolean; trafficBasis: "live" | "predicted" | "scheduled" | "none" };
const pad = (value: number) => String(value).padStart(2, "0");
const localInput = (date: Date) => `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
const formatTime = (date: Date) => date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
const formatDateTime = (date: Date) => date.toLocaleString([], { weekday: "short", month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });

async function fetchDriveTime(origin: string, destination: string, departureAt: Date): Promise<TravelResult> {
  const params = new URLSearchParams({ origin: origin.trim(), destination: destination.trim(), departureTime: Math.floor(departureAt.getTime() / 1000).toString(), travelMode: "DRIVE" });
  const response = await fetch(`/api/travel-time?${params}`);
  const body = await response.json() as TravelResult & { error?: string };
  if (!response.ok) throw new Error(body.error ?? "Travel time unavailable");
  return body;
}

interface AirportPickupCalculatorProps {
  initialAirport?: string;
  locationCode?: string;
  lockAirport?: boolean;
  pageType?: "generic_pickup" | "airport_pickup";
  intentNav?: ReactNode;
}

export default function AirportPickupCalculator({
  initialAirport = "",
  locationCode,
  lockAirport = false,
  pageType = "generic_pickup",
  intentNav,
}: AirportPickupCalculatorProps) {
  const initialArrival = useMemo(() => { const date = new Date(); date.setDate(date.getDate() + 1); date.setHours(18, 0, 0, 0); return localInput(date); }, []);
  const [relationship, setRelationship] = useState<Relationship>("someone");
  const [airport, setAirport] = useState(initialAirport);
  const [arrivalValue, setArrivalValue] = useState(initialArrival);
  const [origin, setOrigin] = useState("");
  const [checkedBag, setCheckedBag] = useState(false);
  const [international, setInternational] = useState(false);
  const [meetInside, setMeetInside] = useState(false);
  const [manualDrive, setManualDrive] = useState("");
  const [plan, setPlan] = useState<(AirportPickupPlan & { driveMinutes: number; trafficBasis: TravelResult["trafficBasis"] | "manual" }) | null>(null);
  const [calendarProvider, setCalendarProvider] = useState<"google" | "ics" | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [error, setError] = useState("");
  const started = useRef(false);
  const person = relationship === "someone" ? "your passenger" : `your ${relationship}`;
  const analyticsContext = {
    airport_code: locationCode ?? "unspecified",
    page_type: pageType,
    planning_intent: "pickup",
  };

  useEffect(() => {
    if (initialAirport || typeof window === "undefined") return;
    const requestedAirport = new URLSearchParams(window.location.search).get("airport")?.trim();
    if (requestedAirport) setAirport(requestedAirport.slice(0, 120));
  }, [initialAirport]);

  const calendarEvent = plan ? {
    title: `Leave to pick up ${person} at ${airport}`,
    start: plan.leaveAt,
    end: new Date(plan.leaveAt.getTime() + 30 * 60_000),
    location: airport,
    details: `Picking up ${person}.\n\n${ONTIMER_CALENDAR_DESCRIPTION}`,
  } : null;

  function noteStarted() { if (!started.current) { started.current = true; trackCalculatorStarted("airport_pickup", analyticsContext); } }
  function resetResult() { setPlan(null); setCalendarProvider(null); setError(""); }

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
        const route = await fetchDriveTime(origin, airport, roughReady);
        driveMinutes = route.durationMinutes; trafficBasis = route.trafficBasis;
      }
      if (!Number.isFinite(driveMinutes) || driveMinutes <= 0) throw new Error("Invalid travel time");
      const timing = calculateAirportPickup({ arrival, deplaneMinutes: 10, airportWalkMinutes: 10, bagMinutes: checkedBag ? 20 : 0, immigrationMinutes: international ? 45 : 0, driveMinutes, parkingMinutes: meetInside ? 20 : 0, curbTimingMinutes: meetInside ? 0 : 5 });
      setPlan({ ...timing, driveMinutes, trafficBasis });
      trackCalculatorCompleted("airport_pickup", { ...analyticsContext, relationship, checked_bag: checkedBag ? 1 : 0, international: international ? 1 : 0, meet_inside: meetInside ? 1 : 0, drive_minutes: driveMinutes });
    } catch { setError("Automatic drive time isn’t available right now. Enter the drive time below and calculate again."); }
    finally { setIsCalculating(false); }
  }

  return <div className="pickup-workbench pickup-shell">
    <form className="pickup-form" onSubmit={(event) => { event.preventDefault(); void calculate(); }}>
      {intentNav}
      <p className="pickup-step">Plan the pickup</p><h2>When should you leave?</h2>
      {lockAirport ? (
        <div className="pickup-airport-context" aria-label={`Pickup airport: ${airport}`}>
          <span>Pickup airport</span>
          <strong>{airport}</strong>
        </div>
      ) : <>
        <label htmlFor="pickup-airport">Pickup airport</label>
        <AirportAutocomplete inputId="pickup-airport" value={airport} onChange={(value) => { noteStarted(); setAirport(value); resetResult(); }} options={[]} inputClassName="pickup-input" />
      </>}
      <label htmlFor="pickup-arrival">Scheduled landing</label>
      <input id="pickup-arrival" className="pickup-input" type="datetime-local" value={arrivalValue} onChange={(event) => { noteStarted(); setArrivalValue(event.target.value); resetResult(); }} />
      <label htmlFor="pickup-origin">Where are you driving from?</label>
      <PlaceAutocomplete id="pickup-origin" value={origin} onChange={(value) => { noteStarted(); setOrigin(value); resetResult(); }} placeholder="Home address or starting place" inputClassName="pickup-input" />

      <fieldset className="pickup-choices"><legend>What happens after landing?</legend>
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
      <details className="pickup-manual"><summary>Enter drive time manually</summary><label htmlFor="pickup-drive">Drive time in minutes</label><input id="pickup-drive" className="pickup-input" type="number" min="1" max="300" value={manualDrive} onChange={(event) => { setManualDrive(event.target.value); resetResult(); }} /></details>
      {error ? <p className="pickup-error" role="alert">{error}</p> : null}
      <button className="pickup-submit" type="submit" disabled={isCalculating}>{isCalculating ? "Checking the drive…" : "Calculate when to leave"}</button>
    </form>

    <section className={`pickup-result${plan ? " pickup-result--ready" : ""}`} aria-live="polite">
      {plan ? <><p className="pickup-step">Your pickup plan</p><h2>Leave by {formatTime(plan.leaveAt)}</h2><p className="pickup-result__date">{formatDateTime(plan.leaveAt)}</p>
        <div className="pickup-timeline"><div><span>1</span><p><strong>You leave</strong>{formatTime(plan.leaveAt)} · {plan.driveMinutes} min drive</p></div><div><span>2</span><p><strong>Flight lands</strong>{formatTime(new Date(arrivalValue))} at {airport}</p></div><div><span>3</span><p><strong>{person} reaches pickup</strong>About {formatTime(plan.passengerReady)}</p></div></div>
        <details className="pickup-breakdown"><summary>How we estimated this</summary><dl><div><dt>Getting off the plane</dt><dd>10 min</dd></div><div><dt>Walk to arrivals</dt><dd>10 min</dd></div>{checkedBag ? <div><dt>Checked bag</dt><dd>20 min</dd></div> : null}{international ? <div><dt>Immigration</dt><dd>45 min</dd></div> : null}{meetInside ? <div><dt>Parking and walking in</dt><dd>20 min</dd></div> : <div><dt>Curb timing</dt><dd>Aim 5 min after they’re ready</dd></div>}<div><dt>Your drive</dt><dd>{plan.driveMinutes} min · {plan.trafficBasis === "live" ? "live traffic" : plan.trafficBasis === "predicted" ? "expected traffic" : "estimate"}</dd></div></dl></details>
        <p className="pickup-assumption">Flight schedules can change. Check the airline before you leave.</p>
        {calendarEvent ? <CalendarOnTimerHandoff calendarHref={buildGoogleCalendarLink(calendarEvent)} alternateCalendarHref={buildIcsCalendarDataUri(calendarEvent)} alternateCalendarFilename="airport-pickup.ics" calendarProvider={calendarProvider} setCalendarProvider={setCalendarProvider} calculatorType="airport_pickup" readyHeading={`Put ${person}’s pickup on your calendar.`} openedItemLabel="pickup event" exclusivePrimaryAction compactOpenedStatus postCalendarHeading="Get an alarm when it’s time to leave." postCalendarBody="OnTimer turns this pickup into an automatic calendar alarm." appLocation="airport_pickup_after_calendar" analyticsContext={{ ...analyticsContext, relationship }} eventPreview={{ title: calendarEvent.title, startLabel: formatDateTime(plan.leaveAt) }} /> : null}</>
      : <><p className="pickup-step">What you’ll get</p><h2>One clear time to leave.</h2><div className="pickup-preview"><p>We’ll work backward from the landing, time to reach arrivals, and your drive.</p><p><strong>Leave</strong><span>→</span><strong>Land</strong><span>→</span><strong>Meet</strong></p></div></>}
    </section>
  </div>;
}
