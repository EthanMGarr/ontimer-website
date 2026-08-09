"use client";

import { useEffect } from "react";
import { AppStoreButton } from "@/components/CTAButton";
import {
  trackAutomaticAlertCTAViewed,
  trackCalendarHandoffOpened,
  type AnalyticsParams,
} from "@/lib/analytics";

interface CalendarOnTimerHandoffProps {
  calendarHref: string;
  alternateCalendarHref: string;
  alternateCalendarFilename: string;
  alternateCalendarLabel?: string;
  calendarProvider: "google" | "ics" | null;
  setCalendarProvider: (provider: "google" | "ics" | null) => void;
  calculatorType: string;
  readyHeading: string;
  readyBody: string;
  openedItemLabel?: string;
  appBeforeHeading: string;
  appBeforeBody: string;
  appAfterHeading: string;
  appAfterBody: string;
  appLocation: string;
  analyticsContext?: AnalyticsParams;
}

export default function CalendarOnTimerHandoff({
  calendarHref,
  alternateCalendarHref,
  alternateCalendarFilename,
  alternateCalendarLabel = "Or tap here for Outlook, Apple or other calendars",
  calendarProvider,
  setCalendarProvider,
  calculatorType,
  readyHeading,
  readyBody,
  openedItemLabel = "event",
  appBeforeHeading,
  appBeforeBody,
  appAfterHeading,
  appAfterBody,
  appLocation,
  analyticsContext = {},
}: CalendarOnTimerHandoffProps) {
  useEffect(() => {
    if (!calendarProvider) return;
    trackAutomaticAlertCTAViewed(calculatorType, "post_calendar_automatic_alert");
  }, [calculatorType, calendarProvider]);

  const calendarOpened = calendarProvider !== null;
  const openedHeading = calendarProvider === "ics"
    ? "Calendar file ready"
    : `Google Calendar ${openedItemLabel} opened`;
  const openedBody = calendarProvider === "ics"
    ? "Open the .ics file with Apple Calendar, Outlook, or another calendar, then finish importing the event."
    : "Finish saving it in Google Calendar so it is added to your schedule.";

  return (
    <>
      <div className={`mt-5 min-w-0 rounded-xl border p-4 sm:p-5 ${
        calendarOpened
          ? "border-zinc-700 bg-zinc-950/40"
          : "border-green-500/40 bg-green-500/[0.07]"
      }`}>
        {calendarOpened ? (
          <div className="flex items-start gap-2.5">
            <span className="mt-0.5 text-green-500" aria-hidden="true">✓</span>
            <div>
              <p className="text-sm font-semibold text-white">{openedHeading}</p>
              <p className="mt-1 text-xs leading-relaxed text-zinc-400">{openedBody}</p>
              <a
                href={calendarHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex whitespace-nowrap text-xs text-zinc-500 underline underline-offset-2 transition-colors hover:text-zinc-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400"
              >
                Open Google Calendar again
              </a>
              <span className="mx-2 text-zinc-700" aria-hidden="true">·</span>
              <a
                href={alternateCalendarHref}
                download={alternateCalendarFilename}
                onClick={() => {
                  trackCalendarHandoffOpened(calculatorType, "ics", analyticsContext);
                  setCalendarProvider("ics");
                }}
                className="mt-2 inline-flex whitespace-nowrap text-xs text-zinc-500 underline underline-offset-2 transition-colors hover:text-zinc-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400"
              >
                Other calendars
              </a>
            </div>
          </div>
        ) : (
          <>
            <p className="text-xs font-semibold uppercase tracking-wider text-green-400">Your next step</p>
            <p className="mt-1 text-lg font-bold text-white">{readyHeading}</p>
            {readyBody && (
              <p className="mt-1 text-sm leading-relaxed text-zinc-400">{readyBody}</p>
            )}
            <a
              href={calendarHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                trackCalendarHandoffOpened(calculatorType, "google", analyticsContext);
                setCalendarProvider("google");
              }}
              className="mt-4 flex min-h-12 w-full items-center justify-center whitespace-nowrap rounded-full bg-green-500 px-5 py-3 text-sm font-bold text-black transition-colors hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400 active:bg-green-600"
            >
              Add to Google Calendar
            </a>
            <a
              href={alternateCalendarHref}
              download={alternateCalendarFilename}
              onClick={() => {
                trackCalendarHandoffOpened(calculatorType, "ics", analyticsContext);
                setCalendarProvider("ics");
              }}
              className="mt-3 inline-flex whitespace-nowrap text-[11px] font-medium text-zinc-400 underline underline-offset-2 transition-colors hover:text-zinc-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400 sm:text-xs"
            >
              {alternateCalendarLabel}
            </a>
          </>
        )}
      </div>

      <div className={`mt-5 ${
        calendarOpened
          ? "rounded-xl border border-green-500/30 bg-green-500/[0.06] p-5"
          : "border-t border-zinc-800 pt-5"
      }`}>
        <p className="text-base font-bold text-white">
          {calendarOpened ? appAfterHeading : appBeforeHeading}
        </p>
        <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">
          {calendarOpened ? appAfterBody : appBeforeBody}
        </p>
        <div className="mt-4">
          <AppStoreButton
            size={calendarOpened ? "lg" : "md"}
            label={calendarOpened ? "Get OnTimer Free" : "Get Automatic Alarms"}
            className={calendarOpened ? "w-full justify-center whitespace-nowrap" : "justify-center whitespace-nowrap"}
            location={appLocation}
            analyticsContext={{
              calculator_type: calculatorType,
              cta_variant: calendarOpened ? "post_calendar_automatic_alert" : "result_automatic_alert",
              ...analyticsContext,
            }}
          />
          <p className="mt-2 text-[11px] text-zinc-500">Download on the App Store</p>
        </div>
      </div>
    </>
  );
}
