/// Medication Schedule Generator — interactive client component.
///
/// ## Purpose
/// Lets users generate a medication schedule, edit times, and download an ICS file.
///
/// ## Include
/// - Medication name, frequency selector, start time inputs
/// - Editable time list (add/remove slots)
/// - ICS download + OnTimer CTA (side by side)
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

function track(name: string, params?: Record<string, string | number>) {
  if (typeof window === "undefined") return;
  const g = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
  if (typeof g !== "function") return;
  g("event", name, { page_path: window.location.pathname, ...params });
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <p className="mb-2 text-sm font-semibold text-zinc-300">{children}</p>;
}

function FreqPill({
  label,
  value,
  selected,
  onClick,
}: {
  label: string;
  value: Frequency;
  selected: boolean;
  onClick: (v: Frequency) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onClick(value)}
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

export default function MedicationScheduleGenerator() {
  const [medName, setMedName] = useState("");
  const [frequency, setFrequency] = useState<Frequency>(1);
  const [startTime, setStartTime] = useState("08:00");
  const [times, setTimes] = useState<string[]>([]);
  const [generated, setGenerated] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  function handleGenerate() {
    const generated = generateTimes(startTime, frequency);
    setTimes(generated);
    setGenerated(true);
    track("medication_schedule_generated", { frequency });
  }

  function handleDownload() {
    const medTimes = times.map((t) => ({ name: medName || "Medication", time: t }));
    const content = generateICS(medTimes, new Date(), 30);
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

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 sm:p-8">
      <h2 className="text-xl font-black tracking-tight text-white sm:text-2xl">
        Generate Your Medication Schedule
      </h2>
      <p className="mt-2 text-sm text-zinc-400">
        Set it up in under a minute. Download to any calendar app.
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
            <FreqPill label="Once daily" value={1} selected={frequency === 1} onClick={setFrequency} />
            <FreqPill label="Twice daily" value={2} selected={frequency === 2} onClick={setFrequency} />
            <FreqPill label="Three times daily" value={3} selected={frequency === 3} onClick={setFrequency} />
          </div>
        </div>

        {/* Start Time */}
        <div>
          <FieldLabel>First dose time</FieldLabel>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2.5 text-sm text-white focus:border-green-500 focus:outline-none"
          />
        </div>

        {/* Generate Button */}
        <button
          type="button"
          onClick={handleGenerate}
          className="rounded-full bg-green-500 px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-green-400"
        >
          Generate Schedule
        </button>
      </div>

      {/* Results — shown after Generate */}
      {generated && (
        <div className="mt-8 space-y-6">
          {/* Editable Time List */}
          <div>
            <p className="mb-3 text-sm font-semibold text-zinc-300">Your dose times</p>
            <div className="space-y-2">
              {times.map((t, i) => (
                <div key={i} className="flex items-center gap-3">
                  <input
                    type="time"
                    value={t}
                    onChange={(e) => handleTimeChange(i, e.target.value)}
                    className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white focus:border-green-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveTime(i)}
                    className="text-zinc-500 hover:text-red-400 transition-colors text-sm"
                    aria-label="Remove this time"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={handleAddTime}
              className="mt-3 text-sm text-green-500 hover:text-green-400 transition-colors"
            >
              + Add time
            </button>
          </div>

          {/* Conversion Block — shown immediately after Generate */}
          <div className="rounded-xl border border-zinc-700 bg-zinc-800/60 p-5">
            <p className="text-sm text-zinc-300 leading-relaxed">
              These reminders will show up on your calendar.{" "}
              <span className="text-white font-medium">
                But reminders are easy to ignore — that&apos;s how most people miss doses.
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

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 items-center">
            <button
              type="button"
              onClick={handleDownload}
              className="rounded-full border border-zinc-600 bg-zinc-800 px-5 py-2.5 text-sm font-semibold text-white hover:bg-zinc-700 transition-colors"
            >
              Download Calendar File (.ics)
            </button>
            <span onClick={() => track("medication_ontimer_click", { location: "tool" })}>
              <AppStoreButton size="sm" location="medication_tool_side_cta" />
            </span>
          </div>

          {downloaded && (
            <p className="text-xs text-zinc-500">
              File downloaded. Open it with Calendar, Outlook, or Google Calendar.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
