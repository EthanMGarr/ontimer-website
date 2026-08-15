/// Hallmark · component: shared medication schedule · genre: utilitarian · theme: existing OnTimer
/// States: default · hover · focus · active · disabled · loading · error · success
/// Pre-emit critique: Philosophy 5 · Hierarchy 5 · Execution 4 · Specificity 5 · Restraint 5 · Variety 4

"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AppStoreButton } from "@/components/CTAButton";
import { formatMedicationTime, isOvernightTime } from "@/lib/medication-schedule";
import { changedDoseTimeIndexes, scheduleFromHash, type SharedMedicationSchedule as Schedule } from "@/lib/medication-share-link";
import { generateProviderMedicationICS, handoffProviderMedicationICS } from "@/lib/provider-medication-calendar";

export default function SharedMedicationSchedule() {
  const [schedule, setSchedule] = useState<Schedule | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [calendarHandoff, setCalendarHandoff] = useState<"native" | "download" | null>(null);
  const [originalTimes, setOriginalTimes] = useState<string[]>([]);
  const onTimerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const decoded = scheduleFromHash(window.location.hash);
    setSchedule(decoded);
    setOriginalTimes(decoded?.times.map((item) => item.time) ?? []);
    setLoaded(true);
    if (decoded) window.history.replaceState(null, "", window.location.pathname);
  }, []);

  useEffect(() => {
    if (!downloaded) return;
    const focusOnTimer = () => {
      onTimerRef.current?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "center" });
      onTimerRef.current?.focus({ preventScroll: true });
    };
    if (calendarHandoff === "download") {
      const timeout = window.setTimeout(focusOnTimer, 450);
      return () => window.clearTimeout(timeout);
    }
    window.addEventListener("focus", focusOnTimer, { once: true });
    return () => window.removeEventListener("focus", focusOnTimer);
  }, [calendarHandoff, downloaded]);

  function updateTime(index: number, time: string) {
    setSchedule((current) => current ? { ...current, times: current.times.map((item, itemIndex) => itemIndex === index ? { ...item, time } : item) } : current);
    setDownloaded(false);
    setCalendarHandoff(null);
  }

  function handleDownload() {
    if (!schedule || schedule.times.some((item) => !/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(item.time))) return;
    const handoff = handoffProviderMedicationICS(generateProviderMedicationICS(schedule), navigator.userAgent);
    setCalendarHandoff(handoff);
    setDownloaded(true);
  }

  if (!loaded) {
    return <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 text-sm text-zinc-400">Loading your schedule…</div>;
  }

  if (!schedule) {
    return (
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-wider text-amber-400">Link unavailable</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight text-white">This medication schedule link is incomplete.</h1>
        <p className="mt-4 leading-relaxed text-zinc-400">Ask the healthcare provider who sent it to create and share a new link.</p>
      </div>
    );
  }

  const changedDoseIndexes = changedDoseTimeIndexes(schedule.times.map((item) => item.time), originalTimes);
  const hasInvalidTime = schedule.times.some((item) => !/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(item.time));
  const overnightTimes = schedule.times.map((item) => item.time).filter(isOvernightTime);
  const timeZoneLabel = (() => {
    if (!schedule.timeZone) return "local time";
    try {
      const sample = new Date(`${schedule.startDate}T12:00:00`);
      const part = new Intl.DateTimeFormat(undefined, { timeZone: schedule.timeZone, timeZoneName: "short" }).formatToParts(sample).find((item) => item.type === "timeZoneName")?.value;
      return part || schedule.timeZone;
    } catch {
      return schedule.timeZone;
    }
  })();

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 sm:p-8">
      <div>
        <h1 className="min-w-0 [overflow-wrap:anywhere] text-2xl font-black tracking-tight text-white sm:text-3xl">Your medication schedule is ready</h1>
        {schedule.practiceName && <p className="mt-2 text-sm font-medium text-green-400">Sent by {schedule.practiceName}</p>}
        <p className="mt-1 text-sm text-zinc-400">
          {schedule.times.length} {schedule.times.length === 1 ? "dose" : "doses"} per day for {schedule.days} days
        </p>
        <div className="mt-4 border-t border-zinc-800 pt-4 lg:hidden">
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Medication</p>
          <p className="mt-1 text-lg font-black text-white">{schedule.medication}</p>
          {schedule.instructions && <p className="mt-1 text-sm leading-relaxed text-zinc-300">{schedule.instructions}</p>}
        </div>
      </div>

      <div className="mt-5 grid min-w-0 gap-5 lg:mt-6 lg:grid-cols-[minmax(0,1fr)_minmax(17rem,0.82fr)] lg:items-start lg:gap-6">
        <div className="order-2 min-w-0 space-y-5 lg:order-1">
          <div className="hidden lg:block">
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Medication</p>
            <p className="mt-1 text-xl font-black text-white">{schedule.medication}</p>
            {schedule.instructions && <p className="mt-2 text-sm leading-relaxed text-zinc-300">{schedule.instructions}</p>}
          </div>

          <div>
            <p className="mb-2 text-sm font-semibold text-zinc-300">Review dose times</p>
            <div className="space-y-2">
              {schedule.times.map((item, index) => (
                <div key={index} className="flex min-w-0 items-center gap-2 sm:gap-3">
                  <span className="w-5 shrink-0 text-center text-xs font-semibold text-zinc-500">{index + 1}</span>
                  <input
                    type="time"
                    value={item.time}
                    onChange={(event) => updateTime(index, event.target.value)}
                    aria-label={`Dose time ${index + 1}`}
                    aria-describedby={isOvernightTime(item.time) ? "recipient-overnight-dose-warning" : undefined}
                    className={`min-w-0 rounded-lg border px-3 py-2 text-sm text-white focus:outline-none ${isOvernightTime(item.time) ? "border-amber-500/70 bg-amber-500/10 focus:border-amber-400" : "border-zinc-700 bg-zinc-800 focus:border-green-500"}`}
                  />
                  <span className={`hidden text-xs sm:inline ${isOvernightTime(item.time) ? "font-medium text-amber-400" : "text-zinc-500"}`}>{formatMedicationTime(item.time)} {timeZoneLabel}</span>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-zinc-500">Repeats daily for {schedule.days} days</p>
            <p className="mt-1 text-xs text-zinc-500">Times are shown in {timeZoneLabel}, matching the calendar file.</p>
          </div>

          {changedDoseIndexes.length > 0 && (
            <div role="alert" className="rounded-lg border-2 border-red-400 bg-red-500/15 px-4 py-3 text-sm leading-relaxed text-red-100">
              <strong className="font-bold text-white">You changed {changedDoseIndexes.length === 1 ? "a dose time" : `${changedDoseIndexes.length} dose times`} from what your provider sent.</strong>{" "}
              Make sure this is okay with them before adding the schedule to your calendar.
            </div>
          )}

          {hasInvalidTime && <p role="alert" className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-100">Choose a valid time for every dose before adding the schedule to your calendar.</p>}

          {overnightTimes.length > 0 && (
            <div id="recipient-overnight-dose-warning" className="rounded-lg border border-amber-500/40 bg-amber-500/10 px-4 py-3">
              <p className="text-sm leading-relaxed text-zinc-300"><strong className="font-semibold text-white">{overnightTimes.length === 1 ? `One dose falls at ${overnightTimes[0] === "00:00" ? "midnight" : formatMedicationTime(overnightTimes[0])}. ` : `${overnightTimes.length} doses fall overnight. `}</strong>Check that this matches the schedule your healthcare provider sent before adding it to your calendar.</p>
            </div>
          )}

          <dl className="grid gap-4 border-t border-zinc-800 pt-5 sm:grid-cols-2">
            <div><dt className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Starts</dt><dd className="mt-1 text-sm font-medium text-white">{new Date(`${schedule.startDate}T12:00:00`).toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" })}</dd></div>
            <div><dt className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Duration</dt><dd className="mt-1 text-sm font-medium text-white">{schedule.days} days</dd></div>
          </dl>

          <p className="text-xs leading-relaxed text-zinc-400">If anything looks wrong, contact the healthcare provider who sent you this link before adding it.</p>
        </div>

        <div className="order-1 flex min-w-0 flex-col gap-4 lg:order-2 lg:sticky lg:top-24">
          <div className={`${downloaded ? "order-2" : "order-1"} rounded-xl border border-zinc-700 bg-zinc-950/35 p-4 lg:order-1`}>
            <p className="text-xs font-semibold uppercase tracking-wider text-green-400">{downloaded ? "Added to calendar" : "Your next step"}</p>
            <p className="mt-1 text-lg font-bold text-white">Put this schedule on your calendar.</p>

            <button type="button" onClick={handleDownload} disabled={hasInvalidTime} className="mt-4 w-full whitespace-nowrap rounded-full bg-green-500 px-5 py-3.5 text-sm font-bold text-black transition-colors hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-300 active:translate-y-px disabled:cursor-not-allowed disabled:bg-zinc-700 disabled:text-zinc-400">Add Schedule to Calendar</button>
            <p className="mt-2 text-xs leading-relaxed text-zinc-500">One calendar file includes every dose time for all {schedule.days} days.</p>

            {downloaded && (
              <div className="mt-4 flex items-start gap-2.5 border-t border-zinc-800 pt-4" aria-live="polite">
                <span className="mt-0.5 text-green-500" aria-hidden="true">✓</span>
                <div><p className="text-sm font-semibold text-white">{calendarHandoff === "native" ? "Calendar opened" : "Calendar file downloaded"}</p><p className="mt-0.5 text-xs leading-relaxed text-zinc-400">{calendarHandoff === "native" ? "Confirm the recurring dose times in your calendar." : "Open medication-schedule.ics and confirm the recurring events in your calendar."}</p></div>
              </div>
            )}
          </div>

          <div ref={onTimerRef} tabIndex={-1} className={`rounded-xl border border-green-500/30 bg-green-500/[0.07] p-5 outline-none focus-visible:ring-2 focus-visible:ring-green-400 ${downloaded ? "order-1 lg:order-2" : "order-2"}`}>
            <p className="text-lg font-black text-white">Make it hard to miss your doses.</p>
            <p className="mt-1.5 text-sm leading-relaxed text-zinc-300">Automatically turn this schedule into alarms.</p>
            <div className="mt-4"><AppStoreButton size="lg" className="w-full justify-center whitespace-nowrap" location={downloaded ? "shared_medication_after_export" : "shared_medication_schedule"} label="Get OnTimer Free" /><p className="mt-2 text-[11px] text-zinc-500">Download on the App Store</p></div>
          </div>

          {downloaded && calendarHandoff === "download" && (
            <details className="order-3 rounded-lg border border-zinc-800 bg-zinc-950/30 px-4 py-3 text-xs text-zinc-400">
              <summary className="cursor-pointer font-medium text-zinc-300 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400">Need help adding the calendar file?</summary>
              <div className="mt-3 space-y-3 border-t border-zinc-800 pt-3 leading-relaxed"><p><strong className="text-zinc-200">Apple Calendar or Outlook:</strong> open medication-schedule.ics from your browser Downloads, choose your calendar, and confirm the recurring events.</p><p><strong className="text-zinc-200">Google Calendar:</strong> open Settings → Import &amp; export, select medication-schedule.ics from Downloads, choose a calendar, then select Import.</p><button type="button" onClick={handleDownload} className="whitespace-nowrap underline underline-offset-2 transition-colors hover:text-white">Download calendar file again</button></div>
            </details>
          )}
        </div>
      </div>

      <div className="mt-6 rounded-lg border border-green-500/20 bg-green-500/[0.05] px-4 py-3 text-xs leading-relaxed text-zinc-400"><strong className="text-zinc-200">Private by design.</strong> The schedule was read from the private part of this link in your browser and then removed from the address bar. OnTimer did not receive or store its contents. <Link href="/privacy" className="underline underline-offset-2 hover:text-zinc-200">Privacy Policy</Link></div>
      <p className="mt-5 text-xs leading-relaxed text-zinc-500">OnTimer is not a medical device and does not provide medical advice. Verify the medication, dose times, and instructions with your healthcare provider before relying on this schedule. <Link href="/terms" className="underline underline-offset-2 hover:text-zinc-300">Terms of Service</Link></p>

    </div>
  );
}
