/// Medication Schedule Generator — interactive client component.
///
/// ## Purpose
/// Lets users generate a medication schedule, edit times, and download an ICS file.
///
/// ## Include
/// - Medication name, frequency, start date, start time, duration inputs
/// - Editable time list (add/remove slots)
/// - Primary "Add to Calendar" CTA before export
/// - Compact OnTimer handoff that becomes primary after export
///
/// ## Don't Include
/// - Page-level SEO or structured data (handled in page.tsx)
/// - Server-side logic
///
/// Hallmark · component: medication schedule guard · genre: utilitarian · theme: existing OnTimer
/// States: default · hover · focus · active · disabled · warning · confirmed · success
/// Pre-emit critique: Philosophy 5 · Hierarchy 5 · Execution 4 · Specificity 5 · Restraint 5 · Variety 4

"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { AppStoreButton } from "@/components/CTAButton";
import DoseTimeField from "@/components/DoseTimeField";
import { generateICS, downloadICS } from "@/lib/ics";
import {
  formatMedicationTime,
  generateMedicationTimes,
} from "@/lib/medication-schedule";

type Frequency = 1 | 2 | 3 | 4 | "custom";
type Duration = 7 | 10 | 14 | 30 | "custom";

const FREQ_OPTIONS: { label: string; value: Frequency }[] = [
  { label: "Once", value: 1 },
  { label: "Twice", value: 2 },
  { label: "3 times", value: 3 },
  { label: "4 times", value: 4 },
  { label: "Custom", value: "custom" },
];

const DURATION_OPTIONS: { label: string; value: Duration }[] = [
  { label: "7 days", value: 7 },
  { label: "10 days", value: 10 },
  { label: "14 days", value: 14 },
  { label: "30 days", value: 30 },
  { label: "Custom", value: "custom" },
];

function todayISO() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function track(name: string, params?: Record<string, string | number>) {
  if (typeof window === "undefined") return;
  const g = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
  if (typeof g !== "function") return;
  g("event", name, { page_path: window.location.pathname, ...params });
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <p className="mb-2 text-sm font-semibold text-zinc-300">{children}</p>;
}

function Pill<T>({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
  value: T;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
        selected
          ? "bg-green-500 text-black"
          : "border border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-white"
      }`}
    >
      {label}
    </button>
  );
}

const COMMON_TIME_ZONES = [
  { value: "America/New_York", label: "ET" },
  { value: "America/Chicago", label: "CT" },
  { value: "America/Denver", label: "MT" },
  { value: "America/Los_Angeles", label: "PT" },
  { value: "America/Phoenix", label: "AZ" },
  { value: "America/Anchorage", label: "AK" },
  { value: "Pacific/Honolulu", label: "HI" },
  { value: "UTC", label: "UTC" },
];

function getTimeZones(detectedTimeZone: string) {
  const detected = COMMON_TIME_ZONES.find((zone) => zone.value === detectedTimeZone);
  if (detected || !detectedTimeZone) return COMMON_TIME_ZONES;
  return [{ value: detectedTimeZone, label: "Local" }, ...COMMON_TIME_ZONES];
}

export default function MedicationScheduleGenerator() {
  const workbenchRef = useRef<HTMLDivElement>(null);
  const [medName, setMedName] = useState("");
  const [instructions, setInstructions] = useState("");
  const [frequency, setFrequency] = useState<Frequency>(1);
  const [startTime, setStartTime] = useState("08:00");
  const [startDate, setStartDate] = useState(todayISO());
  const [duration, setDuration] = useState<Duration>(30);
  const [customDays, setCustomDays] = useState("60");
  const [times, setTimes] = useState<string[]>([]);
  const [generatedTimes, setGeneratedTimes] = useState<string[]>([]);
  const [generated, setGenerated] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [timeZone, setTimeZone] = useState("");

  useEffect(() => {
    setTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC");
  }, []);

  const timeZones = useMemo(() => getTimeZones(timeZone), [timeZone]);
  const timesChanged = times.length !== generatedTimes.length || times.some((time, index) => time !== generatedTimes[index]);

  function handleGenerate() {
    if (duration === "custom") setCustomDays(String(effectiveDuration));
    const nextTimes = generateMedicationTimes(startTime, frequency);
    setTimes(nextTimes);
    setGeneratedTimes(nextTimes);
    setGenerated(true);
    setDownloaded(false);
    track("medication_schedule_generated", { frequency, duration: effectiveDuration });
    window.requestAnimationFrame(() => {
      workbenchRef.current?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        block: "start",
      });
    });
  }

  function handleDownload() {
    let dayOffset = 0;
    const medTimes = times.map((t, index) => {
      if (index > 0 && t <= times[index - 1]) dayOffset += 1;
      return { name: medName.trim() || "Medication", time: t, dayOffset, description: instructions.trim() || undefined };
    });
    const start = new Date(startDate + "T00:00:00");
    const content = generateICS(medTimes, start, effectiveDuration, timeZone || undefined);
    downloadICS(content, "medication-schedule.ics");
    setDownloaded(true);
    track("medication_ics_downloaded");
  }

  function handleTimeChange(index: number, value: string) {
    setTimes((prev) => prev.map((t, i) => (i === index ? value : t)));
    setDownloaded(false);
  }

  function handleRemoveTime(index: number) {
    setTimes((prev) => prev.filter((_, i) => i !== index));
    setDownloaded(false);
  }

  function handleAddTime() {
    setTimes((prev) => [...prev, "08:00"]);
    setDownloaded(false);
  }

  const parsedCustomDays = Number.parseInt(customDays, 10);
  const effectiveDuration = duration === "custom"
    ? Math.min(365, Math.max(1, Number.isFinite(parsedCustomDays) ? parsedCustomDays : 1))
    : duration;
  const totalReminders = times.length * effectiveDuration;
  const freqLabel = `${times.length} ${times.length === 1 ? "dose" : "doses"} per day`;

  return (
    <div ref={workbenchRef} className="scroll-mt-24 rounded-2xl border border-zinc-800 bg-zinc-900 p-5 sm:p-6">
      {!generated && (
        <>
          <h2 className="text-xl font-black tracking-tight text-white sm:text-2xl">
            Create your schedule
          </h2>
          <p className="mt-2 text-sm font-semibold text-green-500">
            Free medication schedule generator. No account required.
          </p>

          <div className="mt-5 space-y-5">
        {/* Medication Name */}
        <div>
          <FieldLabel>Medication name (optional)</FieldLabel>
          <input
            type="text"
            value={medName}
            onChange={(e) => setMedName(e.target.value)}
            placeholder="e.g. Lisinopril, Vitamin D…"
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-green-500 focus:outline-none"
          />
        </div>

        <div>
          <FieldLabel>Instructions (optional)</FieldLabel>
          <input
            type="text"
            value={instructions}
            onChange={(event) => setInstructions(event.target.value)}
            placeholder="e.g. Take 500mg (1 pill) with food"
            autoComplete="off"
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-green-500 focus:outline-none"
          />
          <p className="mt-1.5 text-xs text-zinc-500">Included in each calendar event.</p>
        </div>

        {/* Frequency */}
        <div>
          <FieldLabel>How often per day?</FieldLabel>
          <div className="flex flex-wrap gap-2">
            {FREQ_OPTIONS.map((opt) => (
              <Pill
                key={opt.value}
                label={opt.label}
                value={opt.value}
                selected={frequency === opt.value}
                onClick={() => setFrequency(opt.value)}
              />
            ))}
          </div>
        </div>

        {/* First dose time + compact schedule time zone */}
        <div>
          <FieldLabel>First dose time</FieldLabel>
          <div className="grid gap-2 sm:max-w-md sm:grid-cols-[minmax(17rem,1fr)_5.25rem]">
            <DoseTimeField value={startTime} onChange={setStartTime} label="First dose time" />
            <select
              value={timeZone}
              onChange={(event) => setTimeZone(event.target.value)}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2.5 text-sm text-white focus:border-green-500 focus:outline-none"
              aria-label="Schedule time zone"
            >
              {!timeZone && <option value="">Local time</option>}
              {timeZones.map((zone) => (
                <option key={zone.value} value={zone.value}>{zone.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="sm:max-w-xs">
          <FieldLabel>Start date</FieldLabel>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2.5 text-sm text-white focus:border-green-500 focus:outline-none"
          />
        </div>

        {/* Duration */}
        <div>
          <FieldLabel>How long will you take this?</FieldLabel>
          <div className="flex flex-wrap gap-2">
            {DURATION_OPTIONS.map((opt) => (
              <Pill
                key={opt.value}
                label={opt.label}
                value={opt.value}
                selected={duration === opt.value}
                onClick={() => setDuration(opt.value)}
              />
            ))}
          </div>
          {duration === "custom" && (
            <div className="mt-3">
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={customDays}
                onChange={(event) => {
                  const digits = event.target.value.replace(/\D/g, "").slice(0, 3);
                  setCustomDays(digits);
                }}
                onBlur={() => setCustomDays(String(effectiveDuration))}
                placeholder="Enter number of days"
                aria-label="Custom schedule duration in days"
                className="w-40 rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2.5 text-sm text-white focus:border-green-500 focus:outline-none"
              />
              <span className="ml-2 text-sm text-zinc-500">days (max 365)</span>
            </div>
          )}
        </div>

        {/* Generate */}
        <button
          type="button"
          onClick={handleGenerate}
          className="whitespace-nowrap rounded-full bg-green-500 px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-300 active:translate-y-px"
        >
          Review my schedule
        </button>
        <p className="text-xs leading-relaxed text-zinc-500">
          <strong className="font-semibold text-zinc-300">Private by design.</strong> Your medication name, instructions, start date, and dose times stay in this browser. You can review and edit every dose time before adding one complete medication schedule to your calendar. If analytics is enabled, OnTimer records tool usage such as the selected frequency and duration—not what you type. {" "}
          <Link href="/OnTimer_Privacy_Policy.html" className="underline underline-offset-2 hover:text-zinc-300">Privacy Policy</Link>
        </p>
          </div>
        </>
      )}

      {/* Results */}
      {generated && (
        <div>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xl font-black text-white sm:text-2xl">Your medication schedule is ready</p>
              <p className="mt-1 text-sm text-zinc-400">
                {freqLabel} for {effectiveDuration} days &middot; <span className="font-medium text-white">{totalReminders} calendar events</span>
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setGenerated(false);
                setDownloaded(false);
              }}
              className="whitespace-nowrap text-xs font-medium text-zinc-400 underline underline-offset-2 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400"
            >
              Edit schedule setup
            </button>
          </div>

          <div className="mt-6 grid min-w-0 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(17rem,0.82fr)] lg:items-start">
            <div className="min-w-0 space-y-5">
              <div>
                <FieldLabel>Review dose times</FieldLabel>
                <div className="space-y-2">
                  {times.map((t, i) => (
                    <div key={i} className="min-w-0 rounded-xl border border-zinc-800 bg-zinc-950/20 p-3">
                      <div className="mb-2 flex items-center justify-between gap-3">
                        <span className="text-xs font-semibold text-zinc-400">Dose {i + 1} · {formatMedicationTime(t)}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTime(i)}
                        className="shrink-0 text-sm text-zinc-600 transition-colors hover:text-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400"
                        aria-label="Remove this time"
                      >
                        ✕
                      </button>
                      </div>
                      <DoseTimeField value={t} onChange={(value) => handleTimeChange(i, value)} label={`Dose ${i + 1} time`} />
                    </div>
                  ))}
                </div>
                <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={handleAddTime}
                    className="text-sm text-green-500 transition-colors hover:text-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400"
                  >
                    + Add time
                  </button>
                  <p className="text-xs text-zinc-500">Repeats daily for {effectiveDuration} days</p>
                </div>
              </div>

              {timesChanged && (
                <p className="rounded-lg border border-zinc-700 bg-zinc-950/30 px-4 py-3 text-sm leading-relaxed text-zinc-300">
                  You changed a dose time. Make sure any changes match your prescription or are cleared with your healthcare provider.
                </p>
              )}

              <p className="text-xs leading-relaxed text-zinc-400">
                Planning tool only. Follow your prescription or healthcare provider&apos;s instructions.
              </p>
            </div>

            <div className="flex min-w-0 flex-col gap-4 lg:sticky lg:top-24">
              <div className={`rounded-xl border border-zinc-700 bg-zinc-950/35 p-4 ${
                downloaded ? "order-2 lg:order-1" : "order-1"
              }`}>
                {!downloaded ? (
                  <>
                    <p className="text-xs font-semibold uppercase tracking-wider text-green-400">Your next step</p>
                    <p className="mt-1 text-lg font-bold text-white">Put this schedule on your calendar.</p>
                    <button
                      type="button"
                      onClick={handleDownload}
                      disabled={!timeZone}
                      className="mt-4 w-full whitespace-nowrap rounded-full bg-green-500 px-5 py-3.5 text-sm font-bold text-black transition-colors hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-300 active:translate-y-px disabled:cursor-not-allowed disabled:bg-zinc-700 disabled:text-zinc-400"
                    >
                      Add Schedule to Calendar
                    </button>
                    <p className="mt-2 text-xs leading-relaxed text-zinc-500">
                      You&apos;ll confirm the events in your calendar. Past dose times begin at their next occurrence.
                    </p>
                  </>
                ) : (
                  <div className="flex items-start gap-2.5">
                    <span className="mt-0.5 text-green-500" aria-hidden="true">✓</span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-green-400">Calendar opened</p>
                      <p className="mt-0.5 text-xs leading-relaxed text-zinc-400">
                        Finish confirming the schedule in your calendar.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className={`rounded-xl border border-green-500/30 bg-green-500/[0.07] p-5 ${
                downloaded ? "order-1 lg:order-2" : "order-2"
              }`}>
                <p className="text-lg font-black text-white">Make it hard to miss your doses.</p>
                <p className="mt-1.5 text-sm leading-relaxed text-zinc-300">
                  Automatically turn this schedule into alarms.
                </p>
                <div className="mt-4">
                  <AppStoreButton
                    size="lg"
                    className="w-full justify-center whitespace-nowrap"
                    location={downloaded ? "medication_tool_after_export" : "medication_tool_conversion"}
                    label="Get OnTimer Free"
                  />
                  <p className="mt-2 text-[11px] text-zinc-500">Download on the App Store</p>
                </div>
              </div>

              {downloaded && (
                <details className="order-3 rounded-lg border border-zinc-800 bg-zinc-950/30 px-4 py-3 text-xs text-zinc-400">
                  <summary className="cursor-pointer font-medium text-zinc-300 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400">
                    Need help adding the calendar file?
                  </summary>
                  <div className="mt-3 border-t border-zinc-800 pt-3 leading-relaxed">
                    <p>Open the downloaded .ics file, choose your calendar, then confirm the events.</p>
                    <button
                      type="button"
                      onClick={handleDownload}
                      disabled={!timeZone}
                      className="mt-2 whitespace-nowrap underline underline-offset-2 transition-colors hover:text-white disabled:cursor-not-allowed disabled:text-zinc-700"
                    >
                      Open calendar import again
                    </button>
                  </div>
                </details>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
