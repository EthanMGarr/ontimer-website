/// Hallmark · component: shared medication schedule · genre: utilitarian · theme: existing OnTimer
/// States: default · hover · focus · active · disabled · loading · error · success
/// Pre-emit critique: Philosophy 5 · Hierarchy 5 · Execution 4 · Specificity 5 · Restraint 5 · Variety 4

"use client";

import { useEffect, useRef, useState } from "react";
import { AppStoreButton } from "@/components/CTAButton";
import { formatMedicationTime, isOvernightTime } from "@/lib/medication-schedule";
import { scheduleFromHash, type SharedMedicationSchedule as Schedule } from "@/lib/medication-share-link";
import { downloadProviderMedicationICS, generateProviderMedicationICS } from "@/lib/provider-medication-calendar";

export default function SharedMedicationSchedule() {
  const [schedule, setSchedule] = useState<Schedule | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [showDesktopInstructions, setShowDesktopInstructions] = useState(false);
  const [spotlightOnTimer, setSpotlightOnTimer] = useState(false);
  const instructionDialogRef = useRef<HTMLDialogElement>(null);
  const instructionDoneRef = useRef<HTMLButtonElement>(null);
  const onTimerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const decoded = scheduleFromHash(window.location.hash);
    setSchedule(decoded);
    setLoaded(true);
    if (decoded) window.history.replaceState(null, "", window.location.pathname);
  }, []);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 768px) and (hover: hover) and (pointer: fine)");
    const updateDesktop = () => setIsDesktop(desktopQuery.matches);
    updateDesktop();
    desktopQuery.addEventListener("change", updateDesktop);
    return () => desktopQuery.removeEventListener("change", updateDesktop);
  }, []);

  useEffect(() => {
    const dialog = instructionDialogRef.current;
    if (!dialog) return;
    if (showDesktopInstructions && !dialog.open) {
      dialog.showModal();
      window.requestAnimationFrame(() => instructionDoneRef.current?.focus());
    } else if (!showDesktopInstructions && dialog.open) {
      dialog.close();
    }
  }, [showDesktopInstructions]);

  useEffect(() => {
    if (!spotlightOnTimer) return;
    const timeout = window.setTimeout(() => setSpotlightOnTimer(false), 1800);
    return () => window.clearTimeout(timeout);
  }, [spotlightOnTimer]);

  function updateTime(index: number, time: string) {
    setSchedule((current) => current ? { ...current, times: current.times.map((item, itemIndex) => itemIndex === index ? { ...item, time } : item) } : current);
    setDownloaded(false);
  }

  function handleDownload() {
    if (!schedule) return;
    downloadProviderMedicationICS(generateProviderMedicationICS(schedule));
    setDownloaded(true);
    if (isDesktop) setShowDesktopInstructions(true);
  }

  function finishDesktopInstructions() {
    setShowDesktopInstructions(false);
    setSpotlightOnTimer(true);
    window.requestAnimationFrame(() => {
      onTimerRef.current?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "center" });
      onTimerRef.current?.focus({ preventScroll: true });
    });
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

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 sm:p-8">
      <div>
        <h1 className="min-w-0 [overflow-wrap:anywhere] text-2xl font-black tracking-tight text-white sm:text-3xl">Your medication schedule is ready</h1>
        <p className="mt-1 text-sm text-zinc-400">
          {schedule.times.length} {schedule.times.length === 1 ? "dose" : "doses"} per day for {schedule.days} days
        </p>
      </div>

      <div className="mt-6 grid min-w-0 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(17rem,0.82fr)] lg:items-start">
        <div className="min-w-0 space-y-5">
          <div>
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
                    className={`min-w-0 rounded-lg border px-3 py-2 text-sm text-white focus:outline-none ${isOvernightTime(item.time) ? "border-amber-500/70 bg-amber-500/10 focus:border-amber-400" : "border-zinc-700 bg-zinc-800 focus:border-green-500"}`}
                  />
                  <span className="hidden text-xs text-zinc-500 sm:inline">{formatMedicationTime(item.time)}</span>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-zinc-500">Repeats daily for {schedule.days} days</p>
          </div>

          <dl className="grid gap-4 border-t border-zinc-800 pt-5 sm:grid-cols-2">
            <div><dt className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Starts</dt><dd className="mt-1 text-sm font-medium text-white">{new Date(`${schedule.startDate}T12:00:00`).toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" })}</dd></div>
            <div><dt className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Duration</dt><dd className="mt-1 text-sm font-medium text-white">{schedule.days} days</dd></div>
          </dl>

          <p className="text-xs leading-relaxed text-zinc-400">If anything looks wrong, contact the healthcare provider who sent you this link before adding it.</p>
        </div>

        <div className="flex min-w-0 flex-col gap-4 lg:sticky lg:top-24">
          <div className="order-1 rounded-xl border border-zinc-700 bg-zinc-950/35 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-green-400">Your next step</p>
            <p className="mt-1 text-lg font-bold text-white">Put this schedule on your calendar.</p>

            <button type="button" onClick={handleDownload} className="mt-4 w-full whitespace-nowrap rounded-full bg-green-500 px-5 py-3.5 text-sm font-bold text-black transition-colors hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-300 active:translate-y-px">Add Schedule to Calendar</button>
            <p className="mt-2 text-xs leading-relaxed text-zinc-500">One calendar file includes every dose time for all {schedule.days} days.</p>

            {downloaded && !isDesktop && (
              <div className="mt-4 flex items-start gap-2.5 border-t border-zinc-800 pt-4" aria-live="polite">
                <span className="mt-0.5 text-green-500" aria-hidden="true">✓</span>
                <div><p className="text-sm font-semibold text-white">Calendar file downloaded</p><p className="mt-0.5 text-xs leading-relaxed text-zinc-400">Open medication-schedule.ics and confirm the recurring events in your calendar.</p></div>
              </div>
            )}
          </div>

          <div
            ref={onTimerRef}
            tabIndex={-1}
            className={`rounded-xl border p-5 outline-none transition-[border-color,background-color,box-shadow] duration-200 ${downloaded ? "order-1 lg:order-2" : "order-2"} ${spotlightOnTimer ? "border-green-400 bg-green-500/[0.13] ring-4 ring-green-400/15" : "border-green-500/30 bg-green-500/[0.07]"}`}
          >
            <p className="text-lg font-black text-white">Make it hard to miss your doses.</p>
            <p className="mt-1.5 text-sm leading-relaxed text-zinc-300">Automatically turn this schedule into alarms.</p>
            <div className="mt-4"><AppStoreButton size="lg" className="w-full justify-center whitespace-nowrap" location={downloaded ? "shared_medication_after_export" : "shared_medication_schedule"} label="Get OnTimer Free" /><p className="mt-2 text-[11px] text-zinc-500">Download on the App Store</p></div>
          </div>

          {downloaded && (
            <details className="order-3 rounded-lg border border-zinc-800 bg-zinc-950/30 px-4 py-3 text-xs text-zinc-400">
              <summary className="cursor-pointer font-medium text-zinc-300 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400">Need help adding the calendar file?</summary>
              <div className="mt-3 border-t border-zinc-800 pt-3 leading-relaxed"><p>Open the downloaded .ics file, choose your calendar, then confirm the events.</p><button type="button" onClick={handleDownload} className="mt-2 whitespace-nowrap underline underline-offset-2 transition-colors hover:text-white">Download calendar file again</button></div>
            </details>
          )}
        </div>
      </div>

      <div className="mt-6 rounded-lg border border-green-500/20 bg-green-500/[0.05] px-4 py-3 text-xs leading-relaxed text-zinc-400"><strong className="text-zinc-200">Private by design.</strong> The schedule was read from the link in your browser. OnTimer did not receive or store its contents.</div>
      <p className="mt-5 text-xs leading-relaxed text-zinc-500">OnTimer is not a medical device and does not provide medical advice. Follow the instructions from your healthcare provider.</p>

      <dialog
        ref={instructionDialogRef}
        aria-labelledby="calendar-download-title"
        onCancel={(event) => {
          event.preventDefault();
          finishDesktopInstructions();
        }}
        onClick={(event) => {
          if (event.target === instructionDialogRef.current) finishDesktopInstructions();
        }}
        className="m-auto w-[min(34rem,calc(100%-2rem))] rounded-2xl border border-zinc-700 bg-zinc-900 p-0 text-left text-white shadow-2xl backdrop:bg-black/75"
      >
        <div className="p-6 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wider text-green-400">Calendar file downloaded</p>
              <h2 id="calendar-download-title" className="mt-2 text-2xl font-black tracking-tight">Add the schedule to your calendar</h2>
            </div>
            <button type="button" onClick={finishDesktopInstructions} aria-label="Close calendar instructions" className="shrink-0 rounded-full border border-zinc-700 px-3 py-1.5 text-lg leading-none text-zinc-300 transition-colors hover:border-zinc-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-300 active:translate-y-px">×</button>
          </div>

          <div className="mt-5 space-y-5 text-sm leading-relaxed text-zinc-300">
            <section>
              <h3 className="font-bold text-white">Apple Calendar or Outlook</h3>
              <ol className="mt-2 list-decimal space-y-1.5 pl-5">
                <li>Open your browser&apos;s Downloads.</li>
                <li>Open <strong className="text-white">medication-schedule.ics</strong>.</li>
                <li>Choose your calendar and confirm the recurring events.</li>
              </ol>
            </section>

            <section className="border-t border-zinc-800 pt-5">
              <h3 className="font-bold text-white">Google Calendar</h3>
              <ol className="mt-2 list-decimal space-y-1.5 pl-5">
                <li>Open Google Calendar settings and select <strong className="text-white">Import &amp; export</strong>.</li>
                <li>Select <strong className="text-white">medication-schedule.ics</strong> from your Downloads.</li>
                <li>Choose a calendar, then select <strong className="text-white">Import</strong>.</li>
              </ol>
            </section>
          </div>

          <button ref={instructionDoneRef} type="button" onClick={finishDesktopInstructions} className="mt-6 w-full whitespace-nowrap rounded-full bg-green-500 px-5 py-3.5 text-sm font-bold text-black transition-colors hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-300 active:translate-y-px">Got it</button>
        </div>
      </dialog>
    </div>
  );
}
