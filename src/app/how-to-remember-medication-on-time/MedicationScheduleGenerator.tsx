/// Medication Schedule Generator — interactive client component.
///
/// ## Purpose
/// Lets users generate a medication schedule, edit times, and download an ICS file.
///
/// ## Include
/// - Medication name, frequency, start date, start time, duration inputs
/// - Editable time list (add/remove slots)
/// - Primary "Add to Calendar" CTA + secondary ".ics" link
/// - Conversion block shown immediately after Generate
///
/// ## Don't Include
/// - Page-level SEO or structured data (handled in page.tsx)
/// - Server-side logic

"use client";

import { useState } from "react";
import { AppStoreButton } from "@/components/CTAButton";
import { generateICS, downloadICS } from "@/lib/ics";

type Frequency = 1 | 2 | 3;
type Duration = 7 | 10 | 14 | 30 | "custom";

const FREQ_OPTIONS: { label: string; value: Frequency }[] = [
  { label: "Once daily", value: 1 },
  { label: "Twice daily", value: 2 },
  { label: "Three times daily", value: 3 },
];

const DURATION_OPTIONS: { label: string; value: Duration }[] = [
  { label: "7 days", value: 7 },
  { label: "10 days", value: 10 },
  { label: "14 days", value: 14 },
  { label: "30 days", value: 30 },
  { label: "Custom", value: "custom" },
];

const FREQ_LABELS: Record<Frequency, string> = {
  1: "1 dose",
  2: "2 doses",
  3: "3 doses",
};

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

function generateTimes(startTime: string, frequency: Frequency): string[] {
  const [h, m] = startTime.split(":").map(Number);
  const startMinutes = h * 60 + m;
  const gap = Math.floor(1440 / frequency);
  return Array.from({ length: frequency }, (_, i) => {
    const total = (startMinutes + i * gap) % 1440;
    const hh = String(Math.floor(total / 60)).padStart(2, "0");
    const mm = String(total % 60).padStart(2, "0");
    return `${hh}:${mm}`;
  });
}

function fmtTime(t: string) {
  const [h, m] = t.split(":").map(Number);
  const ampm = h >= 12 ? "pm" : "am";
  const h12 = h % 12 || 12;
  return `${h12}:${String(m).padStart(2, "0")} ${ampm}`;
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

  function handleGenerate() {
    setTimes(generateTimes(startTime, frequency));
    setGenerated(true);
    setDownloaded(false);
    track("medication_schedule_generated", { frequency, duration: effectiveDuration });
  }

  function handleDownload() {
    const medTimes = times.map((t) => ({ name: medName.trim() || "Medication", time: t }));
    const start = new Date(startDate + "T00:00:00");
    const content = generateICS(medTimes, start, effectiveDuration);
    downloadICS(content, "medication-schedule.ics");
    setDownloaded(true);
    track("medication_ics_downloaded");
  }

  function handleTimeChange(index: number, value: string) {
    setTimes((prev) => prev.map((t, i) => (i === index ? value : t)));
  }

  function handleRemoveTime(index: number) {
    setTimes((prev) => prev.filter((_, i) => i !== index));
  }

  function handleAddTime() {
    setTimes((prev) => [...prev, "08:00"]);
  }

  const effectiveDuration = duration === "custom" ? (customDays >= 1 ? customDays : 1) : duration;
  const totalReminders = times.length * effectiveDuration;
  const freqLabel = `${FREQ_LABELS[frequency]} per day`;

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 sm:p-8">
      <h2 className="text-xl font-black tracking-tight text-white sm:text-2xl">
        Generate Your Medication Schedule
      </h2>
      <p className="mt-2 text-sm text-zinc-400">
        Set it up in under a minute. Adds directly to any calendar app.
      </p>
      <p className="mt-2 text-sm text-zinc-300 italic">
        For organization only. Always follow your prescribed instructions.
      </p>

      <div className="mt-6 space-y-6">
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

        {/* Start Time + Start Date — side by side on sm+ */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <FieldLabel>First dose time</FieldLabel>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2.5 text-sm text-white focus:border-green-500 focus:outline-none"
            />
          </div>
          <div>
            <FieldLabel>Start date</FieldLabel>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2.5 text-sm text-white focus:border-green-500 focus:outline-none"
            />
          </div>
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
                  <span className="text-xs text-zinc-500">{fmtTime(t)}</span>
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

          {/* Tool result disclaimer */}
          <p className="text-sm text-zinc-300 italic">
            This schedule is for planning purposes only and does not replace medical instructions.
          </p>

          {/* PRIMARY CTA: Add to Calendar */}
          <div>
            <button
              type="button"
              onClick={handleDownload}
              className="w-full rounded-full bg-green-500 px-6 py-3.5 text-sm font-bold text-black transition-colors hover:bg-green-400 sm:w-auto sm:px-8"
            >
              Add to Calendar
            </button>
            <p className="mt-2 text-xs text-zinc-500">Works with Google Calendar, Apple Calendar, and Outlook Calendar</p>
          </div>

          {/* SECONDARY: raw .ics link */}
          <button
            type="button"
            onClick={handleDownload}
            className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors underline underline-offset-2"
          >
            Download .ics file instead
          </button>

          {downloaded && (
            <p className="text-xs text-green-500">
              ✓ File ready — open it to add events to your calendar.
            </p>
          )}

          {/* Conversion block */}
          <div className="rounded-xl border border-zinc-700 bg-zinc-800/60 p-5">
            <p className="text-sm text-zinc-300 leading-relaxed">
              These reminders will show up on your calendar.{" "}
              <span className="text-white font-medium">
                But calendar reminders are easy to ignore — that&apos;s how most people still miss doses.
              </span>{" "}
              If you&apos;ve ever thought &ldquo;I&apos;ll take it in a minute&rdquo; and then
              didn&apos;t, that&apos;s the problem.
            </p>
            <p className="mt-2 text-sm font-semibold text-white">
              OnTimer makes sure you don&apos;t miss that moment.
            </p>
            <div className="mt-4" onClick={() => track("medication_ontimer_click", { location: "tool" })}>
              <AppStoreButton size="sm" location="medication_tool_conversion" />
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
