"use client";

import { useEffect, useRef, useState } from "react";
import { AppStoreButton, AndroidWaitlistButton } from "@/components/CTAButton";
import { fireEvent } from "@/lib/analytics";
import { isAndroidUserAgent } from "@/lib/device-detection";
import {
  buildEstimatedTaxIcs,
  ESTIMATED_TAX_REMINDER_LEADS,
  type EstimatedTaxDeadline,
  getActiveEstimatedTaxSchedule,
  getUpcomingEstimatedTaxReminderEvents,
} from "@/lib/estimated-tax-deadlines";
import styles from "./estimated-tax.module.css";

const ANDROID_AFFILIATE_URL = process.env.NEXT_PUBLIC_ESTIMATED_TAX_ANDROID_AFFILIATE_URL?.trim();
const ANDROID_AFFILIATE_NAME = process.env.NEXT_PUBLIC_ESTIMATED_TAX_ANDROID_AFFILIATE_NAME?.trim();

interface EstimatedTaxDeadlineToolProps {
  primaryDeadlines: EstimatedTaxDeadline[];
  rolloverDeadlines: EstimatedTaxDeadline[];
}
export default function EstimatedTaxDeadlineTool({
  primaryDeadlines,
  rolloverDeadlines,
}: EstimatedTaxDeadlineToolProps) {
  const [isAndroid, setIsAndroid] = useState(false);
  const [showCalendarStep, setShowCalendarStep] = useState(false);
  const [reminderTime, setReminderTime] = useState("09:00");
  const calendarStepRef = useRef<HTMLDivElement>(null);
  const primaryTaxYear = primaryDeadlines[0].taxYear;
  const rolloverTaxYear = rolloverDeadlines[0].taxYear;
  const storageKey = `estimated-tax-${primaryTaxYear}-calendar-step`;
  const activeSchedule = getActiveEstimatedTaxSchedule(
    primaryDeadlines,
    rolloverDeadlines,
    reminderTime,
  );
  const isRolloverSchedule = activeSchedule.rolledForward;
  const activeDeadlines = activeSchedule.deadlines;
  const upcomingEvents = activeSchedule.events;
  const upcomingDeadlineIds = new Set(upcomingEvents.map(({ deadline }) => deadline.id));
  const upcomingDeadlines = activeDeadlines.filter(({ id }) => upcomingDeadlineIds.has(id));
  const activeTaxYear = activeDeadlines[0].taxYear;
  const activeScheduleStatus = activeDeadlines[0].scheduleStatus;
  const hasCompletePreset = upcomingEvents.length === upcomingDeadlines.length * ESTIMATED_TAX_REMINDER_LEADS.length;

  useEffect(() => {
    const android = isAndroidUserAgent(navigator.userAgent);
    setIsAndroid(android);
    let previouslyShown = false;
    try {
      previouslyShown = window.sessionStorage.getItem(storageKey) === "shown";
    } catch {
      // Session storage can be unavailable in privacy-restricted browsers.
    }
    if (android || previouslyShown) {
      setShowCalendarStep(true);
    }
  }, [storageKey]);

  function revealCalendarStep() {
    setShowCalendarStep(true);
    try {
      window.sessionStorage.setItem(storageKey, "shown");
    } catch {
      // The visible step still works without persistence.
    }
    if (!showCalendarStep) {
      fireEvent("deadline_calendar_step_revealed", { deadline_type: `estimated_tax_${primaryTaxYear}` });
    }

    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
      window.setTimeout(() => calendarStepRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 250);
    }
  }

  function downloadCalendar() {
    const now = new Date();
    const events = getUpcomingEstimatedTaxReminderEvents(activeDeadlines, ESTIMATED_TAX_REMINDER_LEADS, reminderTime, now);
    const eventCount = events.length;
    if (eventCount === 0) return;
    const blob = new Blob([buildEstimatedTaxIcs(
      activeDeadlines,
      ESTIMATED_TAX_REMINDER_LEADS,
      reminderTime,
      now,
    )], {
      type: "text/calendar;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${activeTaxYear}-estimated-tax-deadlines.ics`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
    fireEvent("deadline_calendar_created", {
      deadline_type: `estimated_tax_${activeTaxYear}`,
      event_count: eventCount,
      device_platform: isAndroid ? "android" : "eligible_for_ios",
    });
  }

  return (
    <section className={styles.tool} aria-labelledby="deadline-tool-title">
      <div className={styles.conversionPanel} aria-labelledby="deadline-tool-title">
        <p className={styles.stepLabel}>Step 1</p>
        {!isAndroid ? (
          <>
            <h2 id="deadline-tool-title">Get OnTimer</h2>
            <p>OnTimer is free. It turns your calendar events into alarms so your estimated tax reminders won&apos;t get lost.</p>
            <div onClickCapture={revealCalendarStep}>
              <AppStoreButton
                size="lg"
                className={styles.primaryCta}
                location={`estimated_tax_${primaryTaxYear}_result`}
                label="Get Automatic Alarms"
                analyticsContext={{ calculator_type: "estimated_tax_deadlines", cta_variant: "result_app_primary_v1" }}
              />
            </div>
            <p className={styles.compatibility}>For iPhone · Works with Apple, Google, and Outlook calendars</p>
          </>
        ) : ANDROID_AFFILIATE_URL && ANDROID_AFFILIATE_NAME ? (
          <>
            <h2 id="deadline-tool-title">Keep the deadlines and payment prep together</h2>
            <p>OnTimer is not on Android yet. {ANDROID_AFFILIATE_NAME} may help you prepare and track estimated taxes.</p>
            <a
              className={styles.primaryCta}
              href={ANDROID_AFFILIATE_URL}
              target="_blank"
              rel="sponsored noopener noreferrer"
              onClick={() => {
                revealCalendarStep();
                fireEvent("android_affiliate_click", { partner: ANDROID_AFFILIATE_NAME, page: `estimated_tax_${primaryTaxYear}` });
              }}
            >
              See {ANDROID_AFFILIATE_NAME}
            </a>
            <p className={styles.disclosure}>Paid link: OnTimer may earn a commission if you sign up.</p>
          </>
        ) : (
          <>
            <h2 id="deadline-tool-title">OnTimer for Android is not available yet</h2>
            <p>Put the reminders on your calendar now, or join the Android list for product updates.</p>
            <div onClickCapture={revealCalendarStep}>
              <AndroidWaitlistButton size="lg" className={styles.androidWaitlist} location={`estimated_tax_${primaryTaxYear}`} />
            </div>
          </>
        )}
      </div>

      {showCalendarStep && (
        <div className={styles.calendarStep} ref={calendarStepRef} aria-live="polite">
          <div className={styles.stepHeading}>
            <p className={styles.stepLabel}>Step 2</p>
            <h2>Put the reminders on your calendar</h2>
            <p>Put these estimated tax payment reminders on your calendar.</p>
            <p>
              {hasCompletePreset && upcomingDeadlines.length === 1
                ? `We will preset five reminders starting one month before the remaining ${activeScheduleStatus} payment deadline.`
                : hasCompletePreset && upcomingDeadlines.length === 4
                  ? `We will preset five reminders starting one month before each of the four ${activeScheduleStatus} payment deadlines.`
                : `We will add every reminder that is still ahead for the remaining ${activeScheduleStatus} payment deadlines. Past reminder dates are left out automatically.`}
            </p>
            {isRolloverSchedule && (
              <p className={styles.rolloverNote}>
                The {primaryTaxYear} schedule has passed. The tool has rolled forward to {activeScheduleStatus} {rolloverTaxYear} dates based on the standard IRS schedule and weekend-and-holiday rules. Confirm the dates before paying.
              </p>
            )}
          </div>

          <ol className={styles.reminderSequence} aria-label="Reminder schedule for every estimated tax payment">
            {ESTIMATED_TAX_REMINDER_LEADS.map((reminder, index) => (
              <li key={reminder.id}>
                <span>{index + 1}</span>
                <strong>{reminder.label}</strong>
                <small>{reminder.shortLabel}</small>
              </li>
            ))}
          </ol>

          <div className={styles.deadlineSummary}>
            <p>
              {upcomingDeadlines.length === 4
                ? `Applied to all four ${activeScheduleStatus} ${activeTaxYear} deadlines`
                : `${upcomingDeadlines.length} remaining ${activeScheduleStatus} ${activeTaxYear} ${upcomingDeadlines.length === 1 ? "deadline" : "deadlines"}`}
            </p>
            <ul>
              {upcomingDeadlines.map((deadline) => (
                <li key={deadline.id}><strong>{deadline.displayDate}</strong><span>{deadline.installment}</span></li>
              ))}
            </ul>
          </div>

          <label className={styles.timeControl} htmlFor="estimated-tax-reminder-time">
            <span>Reminders will be scheduled at</span>
            <input
              id="estimated-tax-reminder-time"
              type="time"
              value={reminderTime}
              onChange={(event) => setReminderTime(event.target.value)}
            />
          </label>

          <button className={styles.calendarButton} type="button" onClick={downloadCalendar} disabled={upcomingEvents.length === 0}>
            Add Calendar Reminders
          </button>
          <p className={styles.calendarNote}>
            Creates one calendar file with {upcomingEvents.length} {upcomingEvents.length === 1 ? "event" : "events"}. You can adjust them later in your calendar.
          </p>
        </div>
      )}
    </section>
  );
}
