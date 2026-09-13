"use client";

import { useMemo, useRef, useState } from "react";
import AirportAutocomplete from "@/components/AirportAutocomplete";
import CalendarOnTimerHandoff from "@/components/leave-time/CalendarOnTimerHandoff";
import { trackCalculatorCompleted, trackCalculatorStarted } from "@/lib/analytics";
import { calculateAirportPickup, type AirportPickupPlan } from "@/lib/airport-pickup";
import { buildGoogleCalendarLink, buildIcsCalendarDataUri, ONTIMER_CALENDAR_DESCRIPTION } from "@/lib/calendar-links";

const pad = (value: number) => String(value).padStart(2, "0");
const localInput = (date: Date) => `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
const formatTime = (date: Date) => date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
const formatDateTime = (date: Date) => date.toLocaleString([], { weekday: "short", month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });

export default function AirportPickupCalculator() {
  const initialArrival = useMemo(() => { const date = new Date(); date.setDate(date.getDate() + 1); date.setHours(18, 0, 0, 0); return localInput(date); }, []);
  const [airport, setAirport] = useState("");
  const [arrivalValue, setArrivalValue] = useState(initialArrival);
  const [exitMinutes, setExitMinutes] = useState(45);
  const [driveMinutes, setDriveMinutes] = useState(30);
  const [meetMinutes, setMeetMinutes] = useState(0);
  const [plan, setPlan] = useState<AirportPickupPlan | null>(null);
  const [calendarProvider, setCalendarProvider] = useState<"google" | "ics" | null>(null);
  const [error, setError] = useState("");
  const started = useRef(false);

  const calendarEvent = plan ? {
    title: `Leave to pick up at ${airport || "the airport"}`,
    start: plan.leaveAt,
    end: new Date(plan.leaveAt.getTime() + 30 * 60_000),
    location: airport || undefined,
    details: ONTIMER_CALENDAR_DESCRIPTION,
  } : null;

  function noteStarted() {
    if (started.current) return;
    started.current = true;
    trackCalculatorStarted("airport_pickup");
  }

  function calculate() {
    noteStarted();
    const arrival = new Date(arrivalValue);
    if (!airport.trim() || Number.isNaN(arrival.getTime())) {
      setError("Choose an airport and a valid flight arrival time.");
      return;
    }
    try {
      const nextPlan = calculateAirportPickup({ arrival, exitMinutes, driveMinutes, meetMinutes });
      setPlan(nextPlan);
      setCalendarProvider(null);
      setError("");
      trackCalculatorCompleted("airport_pickup", { exit_buffer_minutes: exitMinutes, drive_minutes: driveMinutes, meet_buffer_minutes: meetMinutes });
    } catch {
      setError("Check the timing values and try again.");
    }
  }

  return <div className="pickup-workbench pickup-shell">
    <form className="pickup-form" onSubmit={(event) => { event.preventDefault(); calculate(); }}>
      <div><p className="pickup-step">1 · Flight</p><h2>When does the flight arrive?</h2></div>
      <label htmlFor="pickup-airport">Airport</label>
      <AirportAutocomplete inputId="pickup-airport" value={airport} onChange={(value) => { noteStarted(); setAirport(value); setPlan(null); }} options={[]} inputClassName="pickup-input" />
      <label htmlFor="pickup-arrival">Scheduled arrival</label>
      <input id="pickup-arrival" className="pickup-input" type="datetime-local" value={arrivalValue} onChange={(event) => { noteStarted(); setArrivalValue(event.target.value); setPlan(null); }} />

      <div className="pickup-divider"><p className="pickup-step">2 · After landing</p><h2>When will they reach you?</h2></div>
      <label htmlFor="pickup-exit">Time from landing to pickup</label>
      <select id="pickup-exit" className="pickup-input" value={exitMinutes} onChange={(event) => { noteStarted(); setExitMinutes(Number(event.target.value)); setPlan(null); }}>
        <option value={20}>Domestic · carry-on only — 20 min</option>
        <option value={45}>Domestic · checked bag — 45 min</option>
        <option value={75}>International arrival — 75 min</option>
        <option value={105}>International + checked bag — 105 min</option>
      </select>
      <div className="pickup-pair">
        <label>Drive to airport<input className="pickup-input" type="number" min="0" max="300" inputMode="numeric" value={driveMinutes} onChange={(event) => { noteStarted(); setDriveMinutes(Number(event.target.value)); setPlan(null); }} /><span>minutes</span></label>
        <label>Parking / meeting buffer<input className="pickup-input" type="number" min="0" max="120" inputMode="numeric" value={meetMinutes} onChange={(event) => { noteStarted(); setMeetMinutes(Number(event.target.value)); setPlan(null); }} /><span>minutes</span></label>
      </div>
      {error ? <p className="pickup-error" role="alert">{error}</p> : null}
      <button className="pickup-submit" type="submit">Calculate my pickup plan</button>
    </form>

    <section className={`pickup-result${plan ? " pickup-result--ready" : ""}`} aria-live="polite">
      {plan ? <>
        <p className="pickup-step">Your pickup plan</p>
        <h2>Leave at {formatTime(plan.leaveAt)}</h2>
        <p className="pickup-result__date">{formatDateTime(plan.leaveAt)}</p>
        <dl><div><dt>Passenger likely ready</dt><dd>{formatTime(plan.passengerReady)}</dd></div><div><dt>Scheduled landing</dt><dd>{formatTime(new Date(arrivalValue))}</dd></div></dl>
        <p className="pickup-assumption">Uses {exitMinutes} minutes after landing, {driveMinutes} minutes of driving, and {meetMinutes} minutes to park or meet. Flight delays are not tracked—check the airline before leaving.</p>
        {calendarEvent ? <CalendarOnTimerHandoff calendarHref={buildGoogleCalendarLink(calendarEvent)} alternateCalendarHref={buildIcsCalendarDataUri(calendarEvent)} alternateCalendarFilename="airport-pickup.ics" calendarProvider={calendarProvider} setCalendarProvider={setCalendarProvider} calculatorType="airport_pickup" readyHeading="Put this leave time on your calendar." openedItemLabel="pickup event" exclusivePrimaryAction compactOpenedStatus postCalendarHeading="Get an alarm when it’s time to leave." postCalendarBody="OnTimer turns this calendar event into an automatic alarm." appLocation="airport_pickup_after_calendar" analyticsContext={{ pickup_airport_entered: 1 }} eventPreview={{ title: calendarEvent.title, startLabel: formatDateTime(plan.leaveAt) }} /> : null}
      </> : <><p className="pickup-step">Your answer</p><h2>Know when to leave for the pickup.</h2><p>Enter the scheduled arrival and a realistic airport-exit estimate. You’ll get the likely pickup time and the time to start driving.</p></>}
    </section>
  </div>;
}
