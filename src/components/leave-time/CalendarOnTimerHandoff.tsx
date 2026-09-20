"use client";

// Hallmark pre-emit critique: palette 5 · hierarchy 5 · error prevention 4 · simplicity 5 · responsiveness 5 · visual consistency 5.

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AppStoreButton } from "@/components/CTAButton";
import {
  trackAffiliateOfferClick,
  trackAffiliateOfferViewed,
  trackAndroidWaitlistClick,
  trackCalendarHandoffOpened,
  type AnalyticsParams,
} from "@/lib/analytics";
import { isAndroidUserAgent } from "@/lib/device-detection";
import type { SiteLocale } from "@/lib/i18n";

interface AndroidAffiliateOffer {
  href: string;
  partner: string;
  heading: string;
  body: string;
  buttonLabel: string;
  location: string;
}

const DEFAULT_ANDROID_AFFILIATE_OFFER: AndroidAffiliateOffer = {
  href: "https://tpx.lv/0BXXJ4gE",
  partner: "welcome_pickups",
  heading: "Need a ride for your trip?",
  body: "Check private transfer options from Welcome Pickups.",
  buttonLabel: "Check transfer options",
  location: "leave_time_android_result",
};

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
  compactOpenedStatus?: boolean;
  postCalendarHeading?: string;
  postCalendarBody?: string;
  appLocation: string;
  analyticsContext?: AnalyticsParams;
  androidAffiliateOffer?: AndroidAffiliateOffer;
  eventPreview?: {
    title: string;
    startLabel: string;
  };
  locale?: SiteLocale;
}

const handoffCopy = {
  en: {
    alternate: "Or tap here for Outlook, Apple or other calendars", ready: "Put this leave time on your calendar.", item: "event",
    fileDownloaded: "Calendar file downloaded", googleOpened: "Google Calendar {item} opened",
    openDownloaded: "Open the downloaded file to add this leave time.", addAnother: "Add to another calendar",
    reopenGoogle: "Re-open Google Calendar", otherCalendars: "Other calendars",
    addGoogle: "Add to Google Calendar", alarmHeading: "Don’t be late. Turn this into an alarm.",
    alarmBody: "OnTimer is free to download and automatically sets alarms for your calendar events.", getFree: "Get OnTimer Free",
    getAlarms: "Get Automatic Alarms", appStore: "Free download on the App Store", paid: "Paid link: OnTimer may earn a commission if you book, at no additional cost to you.",
    android: "OnTimer for Android is coming — join the waitlist", help: "Need help adding the calendar file?",
    helpBody: "Open the downloaded .ics file, choose your calendar, then confirm the event.", again: "Download the file again",
    googleInstead: "Use Google Calendar instead",
  },
  es: {
    alternate: "O usa Outlook, Apple Calendar u otro calendario", ready: "Guarda esta hora de salida en tu calendario.", item: "evento",
    fileDownloaded: "Archivo de calendario descargado", googleOpened: "Evento abierto en Google Calendar",
    openDownloaded: "Abre el archivo descargado para añadir esta hora de salida.", addAnother: "Añadir a otro calendario",
    reopenGoogle: "Volver a abrir Google Calendar", otherCalendars: "Otros calendarios",
    addGoogle: "Añadir a Google Calendar", alarmHeading: "No llegues tarde. Convierte este evento en una alarma.",
    alarmBody: "OnTimer se descarga gratis y configura alarmas automáticamente para los eventos de tu calendario.", getFree: "Descargar OnTimer gratis",
    getAlarms: "Recibir alarmas automáticas", appStore: "Descarga gratis en App Store", paid: "Enlace remunerado: OnTimer puede recibir una comisión si reservas, sin coste adicional para ti.",
    android: "OnTimer para Android está en camino — únete a la lista", help: "¿Necesitas ayuda para añadir el archivo?",
    helpBody: "Abre el archivo .ics descargado, elige tu calendario y confirma el evento.", again: "Descargar el archivo otra vez",
    googleInstead: "Usar Google Calendar",
  },
} as const;

export default function CalendarOnTimerHandoff({
  calendarHref,
  alternateCalendarHref,
  alternateCalendarFilename,
  alternateCalendarLabel,
  calendarProvider,
  setCalendarProvider,
  calculatorType,
  readyHeading,
  openedItemLabel,
  compactOpenedStatus = false,
  postCalendarHeading,
  postCalendarBody,
  appLocation,
  analyticsContext = {},
  androidAffiliateOffer,
  eventPreview,
  locale = "en",
}: CalendarOnTimerHandoffProps) {
  const copy = handoffCopy[locale];
  const effectiveAlternateCalendarLabel = alternateCalendarLabel ?? copy.alternate;
  const effectiveReadyHeading = readyHeading ?? copy.ready;
  const effectiveOpenedItemLabel = openedItemLabel ?? copy.item;
  const effectivePostCalendarHeading = postCalendarHeading ?? copy.alarmHeading;
  const effectivePostCalendarBody = postCalendarBody ?? copy.alarmBody;
  const [isAndroidDevice, setIsAndroidDevice] = useState<boolean | null>(null);
  const affiliateRef = useRef<HTMLAnchorElement>(null);
  const affiliateViewTrackedRef = useRef(false);
  const calendarOpened = calendarProvider !== null;
  const effectiveAndroidAffiliateOffer = androidAffiliateOffer ?? DEFAULT_ANDROID_AFFILIATE_OFFER;
  const showAndroidAffiliate = isAndroidDevice === true;
  const openedHeading = calendarProvider === "ics"
    ? copy.fileDownloaded
    : locale === "es" ? copy.googleOpened : copy.googleOpened.replace("{item}", effectiveOpenedItemLabel);
  const openedBody = calendarProvider === "ics"
    ? copy.openDownloaded
    : null;

  useEffect(() => {
    setIsAndroidDevice(isAndroidUserAgent(navigator.userAgent));
  }, []);

  useEffect(() => {
    if (!showAndroidAffiliate || affiliateViewTrackedRef.current) return;
    const offer = affiliateRef.current;
    if (!offer) return;

    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      affiliateViewTrackedRef.current = true;
      trackAffiliateOfferViewed(effectiveAndroidAffiliateOffer.location, {
        calculator_type: calculatorType,
        affiliate_partner: effectiveAndroidAffiliateOffer.partner,
        ...analyticsContext,
      });
      observer.disconnect();
    }, { threshold: 0.5 });

    observer.observe(offer);
    return () => observer.disconnect();
  }, [showAndroidAffiliate, effectiveAndroidAffiliateOffer, calculatorType, analyticsContext]);

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
            <p className="font-medium text-zinc-400">{copy.addAnother}</p>
            <a
              href={calendarHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex max-w-full whitespace-normal text-zinc-500 underline underline-offset-2 transition-colors [overflow-wrap:anywhere] hover:text-zinc-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400"
            >
              {copy.reopenGoogle}
            </a>
            <a
              href={alternateCalendarHref}
              download={alternateCalendarFilename}
              onClick={() => {
                trackCalendarHandoffOpened(calculatorType, "ics", analyticsContext);
                setCalendarProvider("ics");
              }}
              className="inline-flex max-w-full whitespace-normal text-zinc-500 underline underline-offset-2 transition-colors [overflow-wrap:anywhere] hover:text-zinc-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400"
            >
              {copy.otherCalendars}
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
            <p className="text-lg font-bold text-white">{effectiveReadyHeading}</p>
            <a
              href={calendarHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={eventPreview
                ? `${copy.addGoogle}: ${eventPreview.title}, ${eventPreview.startLabel}`
                : copy.addGoogle}
              onClick={() => {
                trackCalendarHandoffOpened(calculatorType, "google", analyticsContext);
                setCalendarProvider("google");
              }}
              className="mt-4 flex min-h-12 w-full items-center justify-center whitespace-nowrap rounded-full bg-green-500 px-5 py-3 text-sm font-bold text-black transition-colors hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400 active:bg-green-600"
            >
              {copy.addGoogle}
            </a>
            <a
              href={alternateCalendarHref}
              download={alternateCalendarFilename}
              onClick={() => {
                trackCalendarHandoffOpened(calculatorType, "ics", analyticsContext);
                setCalendarProvider("ics");
              }}
              className="mt-3 inline-flex max-w-full whitespace-normal text-left text-[11px] font-medium leading-relaxed text-zinc-400 underline underline-offset-2 transition-colors [overflow-wrap:anywhere] hover:text-zinc-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400 sm:text-xs"
            >
              {effectiveAlternateCalendarLabel}
            </a>
          </>
        )}
      </div>

      <div data-calendar-secondary-acquisition data-state={calendarOpened ? "post-calendar" : "available"} className={`mt-5 ${
        calendarOpened
          ? "order-1 rounded-xl border border-green-500/30 bg-green-500/[0.06] p-5"
          : "border-t border-zinc-800 pt-5"
      }`}>
        <p className="text-base font-bold text-white">
          {showAndroidAffiliate
            ? effectiveAndroidAffiliateOffer.heading
            : calendarOpened
              ? effectivePostCalendarHeading
              : copy.alarmHeading}
        </p>
        <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">
          {showAndroidAffiliate
            ? effectiveAndroidAffiliateOffer.body
            : calendarOpened
              ? effectivePostCalendarBody
              : copy.alarmBody}
        </p>
        <div className="mt-4">
          {showAndroidAffiliate ? (
            <div data-nosnippet>
              <a
                ref={affiliateRef}
                href={effectiveAndroidAffiliateOffer.href}
                target="_blank"
                rel="sponsored nofollow noopener noreferrer"
                onClick={() => trackAffiliateOfferClick(effectiveAndroidAffiliateOffer.location, {
                  calculator_type: calculatorType,
                  affiliate_partner: effectiveAndroidAffiliateOffer.partner,
                  ...analyticsContext,
                })}
                className="flex min-h-12 w-full items-center justify-center rounded-full bg-green-500 px-5 py-3 text-center text-sm font-bold text-black transition-colors hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400 active:bg-green-600"
              >
                {effectiveAndroidAffiliateOffer.buttonLabel}
              </a>
              <p className="mt-2 text-[11px] leading-relaxed text-zinc-500">
                {copy.paid}
              </p>
              <Link
                href="/android"
                onClick={() => trackAndroidWaitlistClick(`${effectiveAndroidAffiliateOffer.location}_waitlist`)}
                className="mt-3 inline-flex text-xs font-medium text-zinc-400 underline underline-offset-2 transition-colors hover:text-zinc-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400"
              >
                {copy.android}
              </Link>
            </div>
          ) : (
            <>
              <AppStoreButton
                size={calendarOpened ? "lg" : "md"}
                label={calendarOpened ? copy.getFree : copy.getAlarms}
                className={calendarOpened ? "w-full justify-center whitespace-nowrap" : "justify-center whitespace-nowrap"}
                location={appLocation}
                analyticsContext={{
                  calculator_type: calculatorType,
                  cta_variant: calendarOpened ? "post_calendar_automatic_alert" : "result_automatic_alert",
                  ...analyticsContext,
                }}
              />
              <p className="mt-2 text-[11px] text-zinc-500">{copy.appStore}</p>
            </>
          )}
        </div>
      </div>
      </div>

      {calendarProvider === "ics" && (
        <details className="mt-3 rounded-lg border border-zinc-800 bg-zinc-950/30 px-4 py-3 text-xs text-zinc-400">
          <summary className="cursor-pointer font-medium text-zinc-300 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400">
            {copy.help}
          </summary>
          <div className="mt-3 border-t border-zinc-800 pt-3 leading-relaxed">
            <p>{copy.helpBody}</p>
            <div className="mt-2 flex flex-wrap gap-x-3 gap-y-2">
              <a
                href={alternateCalendarHref}
                download={alternateCalendarFilename}
                onClick={() => trackCalendarHandoffOpened(calculatorType, "ics", analyticsContext)}
                className="whitespace-nowrap underline underline-offset-2 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400"
              >
                {copy.again}
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
                {copy.googleInstead}
              </a>
            </div>
          </div>
        </details>
      )}
    </>
  );
}
