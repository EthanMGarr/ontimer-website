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

import { useEffect, useMemo, useState } from "react";
import { AppStoreButton } from "@/components/CTAButton";
import { generateICS, downloadICS } from "@/lib/ics";
import {
  formatMedicationTime,
  generateMedicationTimes,
  isOvernightTime,
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

function getTimeZones(detectedTimeZone: string): string[] {
  const fallback = [
    "America/New_York",
    "America/Chicago",
    "America/Denver",
    "America/Los_Angeles",
    "America/Anchorage",
    "Pacific/Honolulu",
    "UTC",
  ];
  const supportedValuesOf = (
    Intl as typeof Intl & { supportedValuesOf?: (key: "timeZone") => string[] }
  ).supportedValuesOf;
  const zones = supportedValuesOf ? supportedValuesOf("timeZone") : fallback;
  return Array.from(new Set([detectedTimeZone, ...zones].filter(Boolean)));
}

function formatTimeZone(timeZone: string): string {
  const commonNames: Record<string, string> = {
    "America/New_York": "ET",
    "America/Chicago": "CT",
    "America/Denver": "MT",
    "America/Los_Angeles": "PT",
    "America/Anchorage": "AKT",
    "America/Phoenix": "MST",
    "Pacific/Honolulu": "HST",
    UTC: "UTC",
  };
  if (commonNames[timeZone]) return commonNames[timeZone];

  const parts = timeZone.split("/").map((part) => part.replaceAll("_", " "));
  return parts.at(-1) || timeZone;
}

export default function MedicationScheduleGenerator() {
  const [medName, setMedName] = useState("");
  const [frequency, setFrequency] = useState<Frequency>(1);
  const [startTime, setStartTime] = useState("08:00");
  const [startDate, setStartDate] = useState(todayISO());
  const [duration, setDuration] = useState<Duration>(30);
  const [customDays, setCustomDays] = useState<number>(60);
  const [times, setTimes] = useState<string[]>([]);
  const [generated, setGenerated] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [timeZone, setTimeZone] = useState("");

  useEffect(() => {
    setTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC");
  }, []);

  const timeZones = useMemo(() => getTimeZones(timeZone), [timeZone]);
  const overnightTimes = times.filter(isOvernightTime);

  function handleGenerate() {
    setTimes(generateMedicationTimes(startTime, frequency));
    setGenerated(true);
    setDownloaded(false);
    track("medication_schedule_generated", { frequency, duration: effectiveDuration });
  }

  function handleDownload() {
    const medTimes = times.map((t) => ({ name: medName.trim() || "Medication", time: t }));
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

  const effectiveDuration = duration === "custom" ? (customDays >= 1 ? customDays : 1) : duration;
  const totalReminders = times.length * effectiveDuration;
  const freqLabel = `${times.length} ${times.length === 1 ? "dose" : "doses"} per day`;

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <h2 className="text-xl font-black tracking-tight text-white sm:text-2xl">
        Create your schedule
      </h2>
      <p className="mt-2 text-sm text-zinc-400">
        Your dose times stay editable before you add them to your calendar.
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
          <div className="grid grid-cols-[minmax(0,1fr)_5.25rem] gap-2 sm:max-w-sm">
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2.5 text-sm text-white focus:border-green-500 focus:outline-none"
            />
            <select
              value={timeZone}
              onChange={(event) => setTimeZone(event.target.value)}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2.5 text-sm text-white focus:border-green-500 focus:outline-none"
              aria-label="Schedule time zone"
            >
              {!timeZone && <option value="">Local time</option>}
              {timeZones.map((zone) => (
                <option key={zone} value={zone}>{formatTimeZone(zone)}</option>
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
                type="number"
                min={1}
                max={365}
                value={customDays}
                onChange={(e) => setCustomDays(Math.min(365, Math.max(1, Number(e.target.value))))}
                placeholder="Enter number of days"
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
          className="rounded-full bg-green-500 px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-green-400"
        >
          Generate Schedule
        </button>
      </div>

      {/* Results */}
      {generated && (
        <div className="mt-8 space-y-6 border-t border-zinc-800 pt-8">

          {/* Summary header */}
          <div>
            <p className="text-lg font-black text-white">Your schedule is ready</p>
            <p className="mt-1 text-sm text-zinc-400">
              {freqLabel} for {effectiveDuration} days &mdash; <span className="text-white font-medium">{totalReminders} reminders total</span>
            </p>
          </div>

          {/* Editable Time List */}
          <div>
            <FieldLabel>Dose times</FieldLabel>
            <div className="space-y-2">
              {times.map((t, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="w-6 text-center text-xs font-semibold text-zinc-500">{i + 1}</span>
                  <input
                    type="time"
                    value={t}
                    onChange={(e) => handleTimeChange(i, e.target.value)}
                    className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white focus:border-green-500 focus:outline-none"
                  />
                  <span className="text-xs text-zinc-500">{formatMedicationTime(t)}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTime(i)}
                    className="ml-auto text-zinc-600 hover:text-red-400 transition-colors text-sm"
                    aria-label="Remove this time"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-3 flex items-center justify-between">
              <button
                type="button"
                onClick={handleAddTime}
                className="text-sm text-green-500 hover:text-green-400 transition-colors"
              >
                + Add time
              </button>
              <p className="text-xs text-zinc-500">Repeats daily for {effectiveDuration} days</p>
            </div>
          </div>

          {/* Overnight-dose notice */}
          {overnightTimes.length > 0 && (
            <div className="rounded-lg border border-amber-500/40 bg-amber-500/10 px-4 py-3">
              <p className="text-sm leading-relaxed text-zinc-300">
                <strong className="font-semibold text-white">
                  {overnightTimes.length === 1
                    ? `One dose falls at ${overnightTimes[0] === "00:00" ? "midnight" : formatMedicationTime(overnightTimes[0])}. `
                    : `${overnightTimes.length} doses fall overnight. `}
                </strong>
                These times are evenly spaced based on your first dose. Adjust them only if your prescription or healthcare provider allows it.
              </p>
            </div>
          )}

          {/* Tool result disclaimer */}
          <p className="text-sm text-zinc-300 italic">
            This schedule is for planning purposes only and does not replace medical instructions.
          </p>

          {!downloaded ? (
            <div>
              <button
                type="button"
                onClick={handleDownload}
                disabled={!timeZone}
                className="w-full whitespace-nowrap rounded-full bg-green-500 px-6 py-3.5 text-sm font-bold text-black transition-colors hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-300 active:translate-y-px disabled:cursor-not-allowed disabled:bg-zinc-700 disabled:text-zinc-400 sm:w-auto sm:px-8"
              >
                Add to Calendar
              </button>
              <p className="mt-2 text-xs text-zinc-500">Works with Google Calendar, Apple Calendar, and Outlook Calendar</p>
              <button
                type="button"
                onClick={handleDownload}
                disabled={!timeZone}
                className="mt-4 whitespace-nowrap text-xs text-zinc-500 underline underline-offset-2 transition-colors hover:text-zinc-300 disabled:cursor-not-allowed disabled:text-zinc-700"
              >
                Download .ics file instead
              </button>
            </div>
          ) : (
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <p className="text-sm font-semibold text-green-500">✓ Schedule downloaded</p>
              <button
                type="button"
                onClick={handleDownload}
                disabled={!timeZone}
                className="whitespace-nowrap text-xs text-zinc-500 underline underline-offset-2 transition-colors hover:text-zinc-300 disabled:cursor-not-allowed disabled:text-zinc-700"
              >
                Download again
              </button>
            </div>
          )}

          {/* OnTimer handoff */}
          <div className="border-l-2 border-green-500 pl-4 sm:pl-5">
            <p className="text-lg font-black text-white">Turn on automatic alarms</p>
            <p className="mt-1 max-w-md text-sm leading-relaxed text-zinc-300">
              Get OnTimer free and turn your medication calendar events into alarms that are harder to miss.
            </p>
            <div className="mt-4">
              <AppStoreButton
                size="md"
                location={downloaded ? "medication_tool_after_export" : "medication_tool_conversion"}
                label="Get OnTimer free"
              />
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
