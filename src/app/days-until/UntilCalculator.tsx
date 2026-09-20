"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { fireEvent, trackAppStoreClick, trackCalculatorCompleted, trackCalculatorStarted, trackCalendarHandoffOpened } from "@/lib/analytics";
import { ONTIMER_CALENDAR_DESCRIPTION } from "@/lib/calendar-links";
import { APP_STORE_URL } from "@/lib/constants";
import { calculateUntil, COUNTDOWN_OPTIONS, formatDateInput, getCountdownOption } from "@/lib/until";

type Props = { initialDate?: string; initialLabel?: string; initialNow?: string; eventSlug?: string; answerFirst?: boolean };
const MILESTONES = [30, 10, 1];

function parseLocalDate(value: string): Date | null {
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return null;
  const date = new Date(year, month - 1, day, 0, 0, 0, 0);
  return Number.isNaN(date.getTime()) ? null : date;
}

function calendarDate(date: Date): string {
  return formatDateInput(date).replaceAll("-", "");
}

function escapeIcs(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/\r?\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");
}

export default function UntilCalculator({ initialDate, initialLabel = "My event", initialNow, eventSlug = "custom", answerFirst = false }: Props) {
  const tomorrow = useMemo(() => { const date = new Date(); date.setDate(date.getDate() + 1); return formatDateInput(date); }, []);
  const [dateValue, setDateValue] = useState(initialDate || tomorrow);
  const [label, setLabel] = useState(initialLabel);
  const [eventId, setEventId] = useState(eventSlug);
  const [now, setNow] = useState<Date | null>(() => initialNow ? new Date(initialNow) : null);
  const [milestones, setMilestones] = useState<number[]>([30, 10, 1]);
  const [calendarHandoff, setCalendarHandoff] = useState<"google" | "file" | null>(null);
  const started = useRef(false);
  const alarmOfferRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setNow(new Date());
    const timer = window.setInterval(() => setNow(new Date()), 60_000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!calendarHandoff) return;
    const focusOffer = () => {
      alarmOfferRef.current?.focus({ preventScroll: true });
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      alarmOfferRef.current?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
    };
    if (calendarHandoff === "file") {
      const timeout = window.setTimeout(focusOffer, 150);
      return () => window.clearTimeout(timeout);
    }
    window.addEventListener("focus", focusOffer, { once: true });
    return () => window.removeEventListener("focus", focusOffer);
  }, [calendarHandoff]);

  const target = parseLocalDate(dateValue);
  const result = target && now ? calculateUntil(target, now) : null;
  const optionGroups = ["Popular", "Holidays", "Seasons", "Personal"] as const;
  const sortedMilestones = [...milestones].sort((a, b) => b - a);
  const reminderList = sortedMilestones.length < 2 ? `${sortedMilestones[0] ?? ""}` : `${sortedMilestones.slice(0, -1).join(", ")}, and ${sortedMilestones.at(-1)}`;
  const reminderSummary = milestones.length === 0 ? "No countdown reminders selected" : `Includes reminders ${reminderList} day${milestones.length === 1 && milestones[0] === 1 ? "" : "s"} before`;

  function noteInteraction() {
    if (started.current) return;
    started.current = true;
    trackCalculatorStarted("days_until", { event_slug: eventSlug });
  }

  function googleLink() {
    if (!target) return "#";
    const end = new Date(target); end.setDate(end.getDate() + 1);
    const params = new URLSearchParams({ action: "TEMPLATE", text: `OnTimer - ${label.trim() || "My event"}!`, dates: `${calendarDate(target)}/${calendarDate(end)}`, details: ONTIMER_CALENDAR_DESCRIPTION });
    return `https://calendar.google.com/calendar/render?${params}`;
  }

  function downloadCalendar() {
    if (!target) return;
    noteInteraction();
    const eventDates = [{ date: target, title: `OnTimer - ${label.trim() || "My event"}!` }, ...milestones.map((days) => { const date = new Date(target); date.setDate(date.getDate() - days); return { date, title: `OnTimer - ${days} day${days === 1 ? "" : "s"} until ${label.trim() || "my event"}` }; })];
    const body = eventDates.map(({ date, title }) => { const end = new Date(date); end.setDate(end.getDate() + 1); return ["BEGIN:VEVENT", `UID:${eventSlug}-${calendarDate(date)}-${title.length}@ontimer.app`, `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z")}`, `DTSTART;VALUE=DATE:${calendarDate(date)}`, `DTEND;VALUE=DATE:${calendarDate(end)}`, `SUMMARY:${escapeIcs(title)}`, `DESCRIPTION:${escapeIcs(ONTIMER_CALENDAR_DESCRIPTION)}`, "END:VEVENT"].join("\r\n"); }).join("\r\n");
    const ics = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//OnTimer//Until Calendar//EN", "CALSCALE:GREGORIAN", body, "END:VCALENDAR"].join("\r\n");
    const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar;charset=utf-8" }));
    const anchor = document.createElement("a"); anchor.href = url; anchor.download = `${eventSlug}-countdown.ics`; anchor.click(); URL.revokeObjectURL(url);
    setCalendarHandoff("file");
    trackCalendarHandoffOpened("days_until", "ics", { event_slug: eventSlug, milestone_count: milestones.length });
    fireEvent("until_milestone_bundle_downloaded", { event_slug: eventSlug, milestone_count: milestones.length });
  }

  useEffect(() => {
    if (!result || !started.current) return;
    trackCalculatorCompleted("days_until", { event_slug: eventSlug, days_remaining: result.days });
  }, [dateValue, eventSlug, result?.days]);

  const controls = <div className="until-controls">
    <label htmlFor="until-event">What are you counting down to?</label>
    <select id="until-event" className="until-input" value={eventId} onChange={(event) => { noteInteraction(); setCalendarHandoff(null); const nextId = event.target.value; const option = getCountdownOption(nextId); setEventId(nextId); if (!option) return; setLabel(option.label.replace(" (choose date)", "")); if (option.nextDate) setDateValue(formatDateInput(option.nextDate(new Date()))); }}>
      {optionGroups.map((group) => <optgroup key={group} label={group}>{COUNTDOWN_OPTIONS.filter((option) => option.category === group).map((option) => <option key={option.id} value={option.id}>{option.label}</option>)}</optgroup>)}
    </select>
    <label htmlFor="until-date">When is it?</label>
    <input id="until-date" className="until-input" type="date" min={tomorrow} value={dateValue} onChange={(event) => { noteInteraction(); setCalendarHandoff(null); setDateValue(event.target.value); }} />
  </div>;

  return (
    <>
      <section className={`until-workbench until-shell${answerFirst ? " until-workbench--answer-first" : ""}`} aria-label="Days until calculator">
        {!answerFirst ? controls : null}
        <div className="until-result">
          <div aria-live="polite">
            <div className="until-answer">{result ? result.days : "—"}</div>
            <div className="until-answer-label">{result?.days === 1 ? "day until" : "days until"} {label || "your event"}</div>
          </div>
          <div className="until-target">{target ? target.toLocaleDateString(undefined, { weekday: "long", year: "numeric", month: "long", day: "numeric" }) : "Choose a future date."}</div>
          <div className="until-calendar-step">
            {calendarHandoff ? <aside ref={alarmOfferRef} tabIndex={-1} className="until-alarm-offer" aria-live="polite">
              <div><h2>Turn these into {label || "event"} alarms!</h2><p>OnTimer is free. Turn calendar events into automatic alarms, so you’re never late.</p></div>
              <div><a className="until-app-button" href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackAppStoreClick("days_until_after_calendar", { event_slug: eventSlug, calendar_provider: calendarHandoff })}>Get OnTimer</a><p className="until-app-caption">Works with Google Calendar, Apple Calendar, and Microsoft 365.</p></div>
            </aside> : <>
              <h2>Put {label || "this event"} on your calendar.</h2>
              <p>Add the date and countdown reminders in one step.</p>
              <div className="until-action-row">
                <button className="until-button" type="button" onClick={downloadCalendar}><span className="until-action-full">{milestones.length > 0 ? `Add ${label || "event"} + reminders` : `Add ${label || "event"}`}</span><span className="until-action-compact">{milestones.length > 0 ? "Add event + reminders" : "Add event"}</span></button>
                <a className="until-link" href={googleLink()} target="_blank" rel="noreferrer" onClick={() => { noteInteraction(); setCalendarHandoff("google"); trackCalendarHandoffOpened("days_until", "google", { event_slug: eventSlug }); }}><span className="until-action-full">{label || "Event"} only · Google Calendar</span><span className="until-action-compact">Event only · Google Calendar</span></a>
              </div>
              <details className="until-reminder-options"><summary>{reminderSummary}</summary><fieldset className="until-milestones"><legend>Choose reminders</legend>{MILESTONES.map((days) => <label key={days}><input className="until-check" type="checkbox" checked={milestones.includes(days)} onChange={() => { noteInteraction(); setCalendarHandoff(null); setMilestones((current) => current.includes(days) ? current.filter((item) => item !== days) : [...current, days]); }} />{days} day{days === 1 ? "" : "s"} before</label>)}</fieldset></details>
              <p className="until-note">The first option creates a calendar file for Apple Calendar or Outlook. Google Calendar can import it on a computer.</p>
              <aside className="until-secondary-offer" data-calendar-secondary-acquisition>
                <div><h3>Prefer automatic alarms?</h3><p>OnTimer is free. Turn calendar events into automatic alarms.</p></div>
                <div><a className="until-app-button" href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackAppStoreClick("days_until_result", { event_slug: eventSlug })}>Get Automatic Alarms</a><p className="until-app-caption">Works with Google Calendar, Apple Calendar, and Microsoft 365.</p></div>
              </aside>
            </>}
          </div>
          <div className="until-breakdown" aria-label="Countdown details">
            <div><strong>{result ? Math.floor(result.weeks).toLocaleString() : "—"}</strong><span>full weeks</span></div>
            <div><strong>{result ? (result.days % 7).toLocaleString() : "—"}</strong><span>extra days</span></div>
            <div><strong>{result ? Math.ceil(result.totalMilliseconds / 3_600_000).toLocaleString() : "—"}</strong><span>approx. hours</span></div>
          </div>
        </div>
        {answerFirst ? <details className="until-adjustments"><summary>Change event or date</summary>{controls}</details> : null}
      </section>
    </>
  );
}
