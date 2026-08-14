/// Hallmark · component: medication schedule handoff · genre: utilitarian · theme: existing OnTimer
/// States: default · hover · focus · active · disabled · error · success
/// Pre-emit critique: Philosophy 5 · Hierarchy 5 · Execution 4 · Specificity 5 · Restraint 5 · Variety 4

"use client";

import { useEffect, useMemo, useState } from "react";
import { formatMedicationTime, generateMedicationTimes, isOvernightTime, type MedicationFrequency } from "@/lib/medication-schedule";
import { encodeMedicationSchedule, type SharedMedicationSchedule } from "@/lib/medication-share-link";

type Frequency = MedicationFrequency;
type Duration = 7 | 10 | 14 | 30 | "custom";

const FREQ_OPTIONS: { label: string; value: Frequency }[] = [
  { label: "Once", value: 1 }, { label: "Twice", value: 2 }, { label: "3 times", value: 3 },
  { label: "4 times", value: 4 }, { label: "Custom", value: "custom" },
];
const DURATION_OPTIONS: { label: string; value: Duration }[] = [
  { label: "7 days", value: 7 }, { label: "10 days", value: 10 }, { label: "14 days", value: 14 },
  { label: "30 days", value: 30 }, { label: "Custom", value: "custom" },
];
const COMMON_TIME_ZONES = [
  { value: "America/New_York", label: "ET" }, { value: "America/Chicago", label: "CT" },
  { value: "America/Denver", label: "MT" }, { value: "America/Los_Angeles", label: "PT" },
  { value: "America/Phoenix", label: "AZ" }, { value: "America/Anchorage", label: "AK" },
  { value: "Pacific/Honolulu", label: "HI" }, { value: "UTC", label: "UTC" },
];

function todayISO() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function Label({ children }: { children: React.ReactNode }) { return <p className="mb-2 text-sm font-semibold text-zinc-300">{children}</p>; }
function Pill({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return <button type="button" onClick={onClick} className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${selected ? "bg-green-500 text-black" : "border border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-white"}`}>{label}</button>;
}
const inputClass = "w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-green-500 focus:outline-none";

export default function ProviderMedicationSchedule() {
  const [medication, setMedication] = useState("");
  const [instructions, setInstructions] = useState("");
  const [frequency, setFrequency] = useState<Frequency>(1);
  const [startTime, setStartTime] = useState("08:00");
  const [startDate, setStartDate] = useState(todayISO());
  const [duration, setDuration] = useState<Duration>(30);
  const [customDays, setCustomDays] = useState("60");
  const [times, setTimes] = useState<string[]>([]);
  const [timeZone, setTimeZone] = useState("");
  const [generated, setGenerated] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC");
  }, []);
  const timeZones = useMemo(() => COMMON_TIME_ZONES.some((zone) => zone.value === timeZone) || !timeZone ? COMMON_TIME_ZONES : [{ value: timeZone, label: "Local" }, ...COMMON_TIME_ZONES], [timeZone]);
  const parsedDays = Number.parseInt(customDays, 10);
  const effectiveDuration = duration === "custom" ? Math.min(365, Math.max(1, Number.isFinite(parsedDays) ? parsedDays : 1)) : duration;
  const mailto = useMemo(() => {
    const subject = "I created a medication schedule for you to add to your calendar";
    const body = `I created a medication schedule for you to add to your calendar.\n\nOpen this private link to review the dosing schedule, then tap Add schedule to calendar:\n${shareUrl}\n\nNo account is needed.`;
    return `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }, [shareUrl]);

  function handleGenerate() {
    if (!medication.trim()) { setError("Enter a medication name."); return; }
    setTimes(generateMedicationTimes(startTime, frequency));
    setGenerated(true); setShareUrl(""); setCopied(false); setError("");
  }
  function sharedSchedule(): SharedMedicationSchedule {
    let dayOffset = 0;
    const scheduledTimes = times.map((time, index) => {
      if (index > 0 && time <= times[index - 1]) dayOffset += 1;
      return { time, dayOffset };
    });
    return { version: 1, medication: medication.trim(), instructions: instructions.trim(), startDate, days: effectiveDuration, times: scheduledTimes, timeZone: timeZone || undefined };
  }
  function createShareUrl() {
    const url = `${window.location.origin}/medication-schedule#schedule=${encodeMedicationSchedule(sharedSchedule())}`;
    setShareUrl(url);
    return url;
  }
  async function handleShare() {
    const url = shareUrl || createShareUrl();
    const title = "I created a medication schedule for you to add to your calendar";
    const text = "Open this private link to review the dosing schedule, then tap Add schedule to calendar. No account is needed.";
    try {
      if (typeof navigator.share === "function") {
        await navigator.share({ title, text, url });
      } else {
        window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${text}\n\n${url}`)}`;
      }
      setError("");
    } catch (shareError) {
      if (shareError instanceof DOMException && shareError.name === "AbortError") return;
      setError("This device could not open sharing. Copy the private link and paste it into an email or text instead.");
    }
  }
  async function handleCopy() {
    const url = shareUrl || createShareUrl();
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setError("");
    } catch {
      setError("Copying was blocked. Select and copy the link below instead.");
    }
  }

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 sm:p-6">
      <div className="rounded-lg border border-green-500/30 bg-green-500/[0.07] px-4 py-3 text-sm leading-relaxed text-zinc-300"><strong className="text-white">Private by design.</strong> This tool runs in your browser. We don&apos;t see, store, or transmit what you type here.</div>
      {!generated ? <>
        <h2 className="mt-6 text-xl font-black tracking-tight text-white sm:text-2xl">Create the schedule</h2>
        <div className="mt-5 space-y-5">
          <div><Label>Medication name</Label><input value={medication} onChange={(e) => setMedication(e.target.value)} placeholder="e.g. Metformin" autoComplete="off" className={inputClass} /></div>
          <div><Label>Instructions (optional)</Label><input value={instructions} onChange={(e) => setInstructions(e.target.value)} placeholder="Take 500mg (1 pill) with food" autoComplete="off" className={inputClass} /></div>
          <div><Label>How often per day?</Label><div className="flex flex-wrap gap-2">{FREQ_OPTIONS.map((option) => <Pill key={option.value} label={option.label} selected={frequency === option.value} onClick={() => setFrequency(option.value)} />)}</div></div>
          <div><Label>First dose time</Label><div className="grid grid-cols-[minmax(0,1fr)_5.25rem] gap-2 sm:max-w-sm"><input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} className={inputClass} /><select value={timeZone} onChange={(e) => setTimeZone(e.target.value)} className={inputClass} aria-label="Schedule time zone">{!timeZone && <option value="">Local time</option>}{timeZones.map((zone) => <option key={zone.value} value={zone.value}>{zone.label}</option>)}</select></div></div>
          <div className="sm:max-w-xs"><Label>Start date</Label><input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className={inputClass} /></div>
          <div><Label>How long is this schedule?</Label><div className="flex flex-wrap gap-2">{DURATION_OPTIONS.map((option) => <Pill key={option.value} label={option.label} selected={duration === option.value} onClick={() => setDuration(option.value)} />)}</div>{duration === "custom" && <div className="mt-3"><input type="text" inputMode="numeric" pattern="[0-9]*" value={customDays} onChange={(e) => setCustomDays(e.target.value.replace(/\D/g, "").slice(0, 3))} onBlur={() => setCustomDays(String(effectiveDuration))} aria-label="Custom schedule duration in days" className="w-40 rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2.5 text-sm text-white focus:border-green-500 focus:outline-none" /><span className="ml-2 text-sm text-zinc-500">days (max 365)</span></div>}</div>
          {error && <p role="alert" className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</p>}
          <button type="button" onClick={handleGenerate} className="rounded-full bg-green-500 px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-green-400">Generate Schedule</button>
        </div>
      </> : <>
        <div className="mt-6 flex flex-wrap items-start justify-between gap-3"><div><h2 className="text-xl font-black text-white sm:text-2xl">Medication schedule is ready</h2><p className="mt-1 text-sm text-zinc-400">{times.length} {times.length === 1 ? "dose" : "doses"} per day for {effectiveDuration} days</p></div><button type="button" onClick={() => { setGenerated(false); setShareUrl(""); setCopied(false); }} className="text-xs font-medium text-zinc-400 underline underline-offset-2 hover:text-white">Edit schedule setup</button></div>
        <div className="mt-6 grid min-w-0 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(17rem,.82fr)] lg:items-start">
          <div><Label>Review dose times</Label><div className="space-y-2">{times.map((time, index) => <div key={index} className="flex min-w-0 items-center gap-2 sm:gap-3"><span className="w-5 shrink-0 text-center text-xs font-semibold text-zinc-500">{index + 1}</span><input type="time" value={time} onChange={(e) => { setTimes((current) => current.map((item, i) => i === index ? e.target.value : item)); setShareUrl(""); setCopied(false); }} className={`min-w-0 rounded-lg border px-3 py-2 text-sm text-white focus:outline-none ${isOvernightTime(time) ? "border-amber-500/70 bg-amber-500/10 focus:border-amber-400" : "border-zinc-700 bg-zinc-800 focus:border-green-500"}`} /><span className="hidden text-xs text-zinc-500 sm:inline">{formatMedicationTime(time)}</span><button type="button" onClick={() => { setTimes((current) => current.filter((_, i) => i !== index)); setShareUrl(""); setCopied(false); }} className="ml-auto text-zinc-600 hover:text-red-400" aria-label="Remove this time">✕</button></div>)}</div><button type="button" onClick={() => { setTimes((current) => [...current, "08:00"]); setShareUrl(""); setCopied(false); }} className="mt-3 text-sm text-green-500 hover:text-green-400">+ Add time</button></div>
          <div className="flex min-w-0 flex-col gap-4 lg:sticky lg:top-24">
            <div className="rounded-xl border border-zinc-700 bg-zinc-950/35 p-4"><p className="text-xs font-semibold uppercase tracking-wider text-green-400">Your next step</p><p className="mt-1 text-lg font-bold text-white">Send the schedule.</p><button type="button" onClick={handleShare} disabled={!timeZone || times.length === 0} className="mt-4 w-full rounded-full bg-green-500 px-5 py-3.5 text-sm font-bold text-black hover:bg-green-400 disabled:cursor-not-allowed disabled:bg-zinc-700 disabled:text-zinc-400">Send schedule link</button><button type="button" onClick={handleCopy} className="mt-3 w-full text-sm font-medium text-zinc-300 underline underline-offset-2 hover:text-white">{copied ? "Link copied" : "Copy private link"}</button><p className="mt-3 text-xs leading-relaxed text-zinc-500">The patient reviews the schedule, then adds it to their calendar. OnTimer never receives what you entered.</p>{shareUrl && <><input readOnly value={shareUrl} aria-label="Private medication schedule link" className="mt-3 w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-zinc-500" /><a href={mailto} className="mt-3 inline-flex text-sm font-medium text-green-500 underline underline-offset-2 hover:text-green-400">Open email draft</a></>}</div>
          </div>
        </div>
      </>}
      <p className="mt-5 text-xs leading-relaxed text-zinc-500">OnTimer is not a medical device and does not provide medical advice. Confirm the schedule with your patient and make sure they understand how to follow the instructions.</p>
    </div>
  );
}
