"use client";

import { useEffect, useRef } from "react";
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
  readyHeading?: string;
  openedItemLabel?: string;
  exclusivePrimaryAction?: boolean;
  compactOpenedStatus?: boolean;
  postCalendarHeading?: string;
  postCalendarBody?: string;
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
  readyHeading = "Put this leave time on your calendar.",
  openedItemLabel = "event",
  exclusivePrimaryAction = false,
  compactOpenedStatus = false,
  postCalendarHeading = "Get an alarm when it's time to leave.",
  postCalendarBody = "OnTimer sets automatic alarms for your calendar events.",
  appLocation,
  analyticsContext = {},
}: CalendarOnTimerHandoffProps) {
  const analyticsContextRef = useRef(analyticsContext);
  analyticsContextRef.current = analyticsContext;

  useEffect(() => {
    if (!calendarProvider) return;
    trackAutomaticAlertCTAViewed(
      calculatorType,
      "post_calendar_automatic_alert",
      analyticsContextRef.current,
    );
  }, [calculatorType, calendarProvider]);

  const calendarOpened = calendarProvider !== null;
  const openedHeading = calendarProvider === "ics"
    ? "Calendar file downloaded"
    : `Google Calendar ${openedItemLabel} opened`;
  const openedBody = calendarProvider === "ics"
    ? "Open the downloaded file to add this leave time."
    : null;

  return (
    <>
      <div className="flex flex-col">
      <div className={`mt-5 min-w-0 rounded-xl border ${
        calendarOpened && compactOpenedStatus
          ? "px-0 pb-0 pt-4"
          : calendarProvider === "ics"
            ? "px-4 py-3"
            : "p-4 sm:p-5"
      } ${
        calendarOpened
          ? compactOpenedStatus
            ? "order-2 border-0 border-t border-zinc-800 bg-transparent"
            : "order-2 border-zinc-700 bg-zinc-950/40"
          : "border-green-500/40 bg-green-500/[0.07]"
      }`}>
        {calendarProvider === "google" ? (
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs">
            <p className="font-medium text-zinc-400">Add to another calendar</p>
            <a
              href={calendarHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex whitespace-nowrap text-zinc-500 underline underline-offset-2 transition-colors hover:text-zinc-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400"
            >
              Re-open Google Calendar
            </a>
            <a
              href={alternateCalendarHref}
              download={alternateCalendarFilename}
              onClick={() => {
                trackCalendarHandoffOpened(calculatorType, "ics", analyticsContext);
                setCalendarProvider("ics");
              }}
              className="inline-flex whitespace-nowrap text-zinc-500 underline underline-offset-2 transition-colors hover:text-zinc-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400"
            >
              Other calendars
            </a>
          </div>
        ) : calendarOpened ? (
          <div className="flex items-start gap-2.5">
            <span className="mt-0.5 text-green-500" aria-hidden="true">✓</span>
            <div>
              <p className="text-sm font-semibold text-white">{openedHeading}</p>
              <p className="mt-0.5 text-xs leading-relaxed text-zinc-400">{openedBody}</p>
            </div>
          </div>
        ) : (
          <>
            <p className="text-lg font-bold text-white">{readyHeading}</p>
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

      {(!exclusivePrimaryAction || calendarOpened) && <div className={`mt-5 ${
        calendarOpened
          ? "order-1 rounded-xl border border-green-500/30 bg-green-500/[0.06] p-5"
          : "border-t border-zinc-800 pt-5"
      }`}>
        <p className="text-base font-bold text-white">{calendarOpened ? postCalendarHeading : "Get an alarm when it's time to leave."}</p>
        <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">
          {calendarOpened ? postCalendarBody : "OnTimer sets automatic alarms for your calendar events."}
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
      </div>}
      </div>

      {calendarProvider === "ics" && (
        <details className="mt-3 rounded-lg border border-zinc-800 bg-zinc-950/30 px-4 py-3 text-xs text-zinc-400">
          <summary className="cursor-pointer font-medium text-zinc-300 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400">
            Need help adding the calendar file?
          </summary>
          <div className="mt-3 border-t border-zinc-800 pt-3 leading-relaxed">
            <p>Open the downloaded .ics file, choose your calendar, then confirm the event.</p>
            <div className="mt-2 flex flex-wrap gap-x-3 gap-y-2">
              <a
                href={alternateCalendarHref}
                download={alternateCalendarFilename}
                onClick={() => trackCalendarHandoffOpened(calculatorType, "ics", analyticsContext)}
                className="whitespace-nowrap underline underline-offset-2 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400"
              >
                Download the file again
              </a>
              <a
                href={calendarHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  trackCalendarHandoffOpened(calculatorType, "google", analyticsContext);
                  setCalendarProvider("google");
                }}
                className="whitespace-nowrap underline underline-offset-2 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400"
              >
                Use Google Calendar instead
              </a>
            </div>
          </div>
        </details>
      )}
    </>
  );
}
