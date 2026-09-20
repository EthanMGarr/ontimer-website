/* Hallmark · genre: modern-minimal · macrostructure: Task-first Conversion Workbench · design-system: design.md · designed-as-app */
"use client";

import { useMemo, useRef, useState } from "react";
import PlaceAutocomplete from "@/components/PlaceAutocomplete";
import CalendarOnTimerHandoff from "@/components/leave-time/CalendarOnTimerHandoff";
import { fireEvent, trackCalculatorCompleted, trackCalculatorStarted } from "@/lib/analytics";
import { buildIcsCalendarDataUri } from "@/lib/calendar-links";
import {
  calculateEventLeavePlan,
  provisionalDepartureFor,
  type ArrivalPreference,
  type EventLeavePlan,
  type EventRecord,
  type EventTravelMode,
  type VenueProfile,
} from "@/lib/event-time-to-leave";
import { venueRouteWaypoint } from "@/lib/venue-catalog";
import "./event-leave.css";

interface TravelTimeResponse {
  durationMinutes?: number;
  trafficBasis?: "live" | "predicted" | "scheduled" | "none";
  error?: string;
}

interface CalculatedResult {
  plan: EventLeavePlan;
  source: "google" | "manual";
  trafficBasis: "live" | "predicted" | "scheduled" | "none";
  inputKey: string;
}

const preferences: Array<{ value: ArrivalPreference; label: string; note: string }> = [
  { value: "just-in-time", label: "Just in time", note: "Aim for 45 minutes before the event" },
  { value: "comfortable", label: "Comfortable", note: "Aim for doors open when available" },
  { value: "extra-early", label: "Extra early", note: "Arrive before the main entry rush" },
];

const travelModes: Array<{ value: EventTravelMode; label: string }> = [
  { value: "DRIVE", label: "Drive" },
  { value: "TRANSIT", label: "Transit" },
  { value: "WALK", label: "Walk" },
];

function formatEventTime(date: Date | string, timezone: string): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(date));
}

function formatEventDate(date: string, timezone: string): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

function utcCalendarStamp(date: Date): string {
  return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
}

function buildUtcGoogleCalendarLink({
  title,
  start,
  end,
  details,
  location,
}: {
  title: string;
  start: Date;
  end: Date;
  details: string;
  location: string;
}): string {
  const params = new URLSearchParams({
    text: title,
    dates: `${utcCalendarStamp(start)}/${utcCalendarStamp(end)}`,
    details,
    location,
  });
  return `https://calendar.google.com/calendar/r/eventedit?${params.toString()}`;
}

function inputKey(origin: string, mode: EventTravelMode, preference: ArrivalPreference, manualMinutes: string): string {
  return [origin.trim(), mode, preference, manualMinutes.trim()].join("|");
}

export default function EventLeaveCalculator({ event, venue }: { event: EventRecord; venue: VenueProfile }) {
  const [origin, setOrigin] = useState("");
  const [travelMode, setTravelMode] = useState<EventTravelMode>("DRIVE");
  const [preference, setPreference] = useState<ArrivalPreference>("comfortable");
  const [manualMinutes, setManualMinutes] = useState("");
  const [result, setResult] = useState<CalculatedResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [calendarProvider, setCalendarProvider] = useState<"google" | "ics" | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const currentInputKey = inputKey(origin, travelMode, preference, manualMinutes);
  const resultIsCurrent = result?.inputKey === currentInputKey;
  const destination = venueRouteWaypoint(venue);
  const eventStart = useMemo(() => new Date(event.startDateTime), [event.startDateTime]);
  const calendarEnd = useMemo(
    () => event.endDateTime ? new Date(event.endDateTime) : new Date(eventStart.getTime() + 3 * 60 * 60_000),
    [event.endDateTime, eventStart],
  );

  async function handleSubmit(submission: React.FormEvent<HTMLFormElement>) {
    submission.preventDefault();
    setError(null);
    setCalendarProvider(null);
    if (!origin.trim()) {
      setError("Enter the address or place you are leaving from.");
      return;
    }

    setIsLoading(true);
    trackCalculatorStarted("event_time_to_leave", {
      event_category: event.category,
      venue_id: venue.id,
      travel_mode: travelMode,
      arrival_preference: preference,
    });

    try {
      const enteredMinutes = Number(manualMinutes);
      let travelMinutes: number;
      let source: CalculatedResult["source"];
      let trafficBasis: CalculatedResult["trafficBasis"];

      if (manualMinutes.trim()) {
        if (!Number.isFinite(enteredMinutes) || enteredMinutes < 1 || enteredMinutes > 1_440) {
          throw new Error("Enter a travel time between 1 and 1,440 minutes.");
        }
        travelMinutes = Math.round(enteredMinutes);
        source = "manual";
        trafficBasis = "none";
      } else {
        const provisionalDeparture = provisionalDepartureFor(event, venue, preference, travelMode);
        const params = new URLSearchParams({
          origin: origin.trim(),
          destination,
          departureTime: Math.floor(provisionalDeparture.getTime() / 1000).toString(),
          travelMode,
        });
        const response = await fetch(`/api/travel-time?${params.toString()}`);
        const payload = await response.json() as TravelTimeResponse;
        if (!response.ok || !payload.durationMinutes) {
          throw new Error("Automatic travel time is unavailable. Open Timing options and enter the trip time manually.");
        }
        travelMinutes = payload.durationMinutes;
        source = "google";
        trafficBasis = payload.trafficBasis || "predicted";
      }

      const plan = calculateEventLeavePlan({ event, venue, preference, travelMode, travelMinutes });
      const nextResult = { plan, source, trafficBasis, inputKey: currentInputKey };
      setResult(nextResult);
      trackCalculatorCompleted("event_time_to_leave", {
        event_category: event.category,
        venue_id: venue.id,
        travel_mode: travelMode,
        arrival_preference: preference,
        travel_source: source,
      });
      fireEvent("event_leave_time_result_shown", {
        event_id: event.id,
        venue_id: venue.id,
        days_before_event: Math.max(0, Math.ceil((eventStart.getTime() - Date.now()) / 86_400_000)),
      });
      window.setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    } catch (caught) {
      setResult(null);
      setError(caught instanceof Error ? caught.message : "We could not calculate this trip.");
    } finally {
      setIsLoading(false);
    }
  }

  const calendarEvent = result && resultIsCurrent ? {
    title: `${event.title}${event.subtitle ? ` — ${event.subtitle}` : ""}`,
    start: eventStart,
    end: calendarEnd,
    location: venue.address,
    details: [
      `Scheduled event start: ${formatEventTime(eventStart, event.timezone)} on ${formatEventDate(event.startDateTime, event.timezone)}.`,
      `OnTimer recommended leave time: ${formatEventTime(result.plan.leaveAt, event.timezone)}.`,
      "Event schedules and conditions can change. Confirm the current date, time, venue, and entry information with the organizer or venue before leaving.",
      ...(event.endDateTime ? [] : ["Calendar end time is an estimate; confirm the event schedule."]),
      `Source: ${event.source.url}`,
    ].join("\n\n"),
  } : null;

  const calendarHref = calendarEvent ? buildUtcGoogleCalendarLink(calendarEvent) : "#";
  const icsHref = calendarEvent ? buildIcsCalendarDataUri(calendarEvent) : "#";

  return (
    <section className="event-calc" aria-labelledby="event-calculator-heading" data-event-calculator-entry>
      <div className="event-calc__card">
        <div className="event-calc__intro">
          <h2 id="event-calculator-heading">Where are you leaving from?</h2>
          <p>Add your starting point. We’ll account for the trip and the venue arrival steps.</p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="event-calc__field">
            <label htmlFor="event-origin">Starting location</label>
            <PlaceAutocomplete
              id="event-origin"
              value={origin}
              onChange={setOrigin}
              placeholder="Address, neighborhood, or place"
              inputClassName="event-calc__input"
            />
            <p className="event-calc__helper">Used only to estimate this trip. It is not added to the event page.</p>
          </div>

          <fieldset className="event-calc__field">
            <legend>Travel mode</legend>
            <div className="event-calc__pills">
              {travelModes.map((mode) => (
                <button
                  key={mode.value}
                  type="button"
                  aria-pressed={travelMode === mode.value}
                  className="event-calc__pill"
                  onClick={() => setTravelMode(mode.value)}
                >
                  {mode.label}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="event-calc__field">
            <legend>How early do you want to be?</legend>
            <div className="event-calc__preferences">
              {preferences.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  aria-pressed={preference === option.value}
                  className="event-calc__preference"
                  onClick={() => setPreference(option.value)}
                >
                  <span>{option.label}</span>
                  <small>{option.note}</small>
                </button>
              ))}
            </div>
          </fieldset>

          <details className="event-calc__details">
            <summary>Timing options</summary>
            <div className="event-calc__field event-calc__field--nested">
              <label htmlFor="event-manual-minutes">Travel time in minutes</label>
              <input
                id="event-manual-minutes"
                className="event-calc__input"
                inputMode="numeric"
                min="1"
                max="1440"
                type="number"
                value={manualMinutes}
                onChange={(change) => setManualMinutes(change.target.value)}
                placeholder="Leave blank for an automatic route estimate"
              />
              <p className="event-calc__helper">Entering minutes here skips the automatic route estimate.</p>
            </div>
          </details>

          {error ? <p className="event-calc__error" role="alert">{error}</p> : null}
          {result && !resultIsCurrent ? (
            <p className="event-calc__notice" role="status">Trip details changed. Update the result before adding it to your calendar.</p>
          ) : null}

          <button className="event-calc__submit" type="submit" disabled={isLoading} data-state={isLoading ? "loading" : "default"}>
            {isLoading ? "Estimating travel time…" : result ? "Update leave time" : "Calculate leave time"}
          </button>
        </form>
      </div>

      {result && resultIsCurrent ? (
        <div ref={resultRef} className="event-result" aria-live="polite" data-event-result>
          <div className="event-result__answer">
            <p>We recommend leaving by</p>
            <h2>{formatEventTime(result.plan.leaveAt, event.timezone)}</h2>
            <span>{formatEventDate(event.startDateTime, event.timezone)}</span>
          </div>

          <p className="event-result__summary">
            {result.plan.travelMinutes} min {travelMode.toLowerCase()} · {result.plan.lastMileMinutes} min venue arrival · {result.plan.arrivalBufferMinutes} min before start
          </p>

          {calendarEvent ? (
            <div data-calendar-handoff-slot>
              <CalendarOnTimerHandoff
                calendarHref={calendarHref}
                alternateCalendarHref={icsHref}
                alternateCalendarFilename={`${event.slug}.ics`}
                calendarProvider={calendarProvider}
                setCalendarProvider={setCalendarProvider}
                calculatorType="event_time_to_leave"
                readyHeading="Put this leave time on your calendar."
                openedItemLabel="event"
                compactOpenedStatus
                postCalendarHeading="Now make sure you leave on time."
                postCalendarBody="OnTimer turns this calendar event into an automatic alarm."
                appLocation="event_time_to_leave_after_calendar"
                analyticsContext={{ event_id: event.id, event_category: event.category, venue_id: venue.id }}
                eventPreview={{ title: calendarEvent.title, startLabel: `${formatEventDate(event.startDateTime, event.timezone)} at ${formatEventTime(eventStart, event.timezone)}` }}
              />
            </div>
          ) : null}

          <details className="event-result__details">
            <summary>See how this leave time was calculated</summary>
            <div className="event-route" aria-label="How the leave time was calculated">
              {[
                { label: "Leave", value: formatEventTime(result.plan.leaveAt, event.timezone) },
                { label: "Reach venue", value: formatEventTime(result.plan.venueArrivalAt, event.timezone) },
                { label: "Be at entrance", value: formatEventTime(result.plan.entranceAt, event.timezone) },
                { label: "Event starts", value: formatEventTime(result.plan.eventStartsAt, event.timezone) },
              ].map((node, index) => (
                <div className="event-route__node" key={node.label}>
                  <span className="event-route__dot" aria-hidden="true">{index + 1}</span>
                  <strong>{node.value}</strong>
                  <small>{node.label}</small>
                </div>
              ))}
            </div>

            <dl className="event-result__spec">
              <div><dt>Estimated {travelMode.toLowerCase()}</dt><dd>{result.plan.travelMinutes} min</dd></div>
              <div><dt>{travelMode === "DRIVE" ? "Parking + walk" : travelMode === "TRANSIT" ? "Station + walk" : "Venue approach"}</dt><dd>{result.plan.lastMileMinutes} min</dd></div>
              <div><dt>Uncertainty cushion</dt><dd>{result.plan.uncertaintyMinutes} min</dd></div>
              <div><dt>Entrance before start</dt><dd>{result.plan.arrivalBufferMinutes} min</dd></div>
            </dl>

            <p className="event-result__source">
              Route: {result.source === "google" ? `${result.trafficBasis} Google estimate` : "your entered travel time"}. Venue timing: reviewed OnTimer profile.
            </p>
            <p className="event-result__warning">
              <strong>Leave-time estimates are guidance, not a guarantee.</strong> Traffic, transit delays, parking, security lines, weather, schedule changes, and other conditions can affect your arrival time.
            </p>
          </details>
        </div>
      ) : null}
    </section>
  );
}
