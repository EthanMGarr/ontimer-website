/// Hallmark · component: medication schedule handoff · genre: utilitarian · theme: existing OnTimer
/// States: default · hover · focus · active · disabled · error · success
/// Pre-emit critique: Philosophy 5 · Hierarchy 5 · Execution 5 · Specificity 5 · Restraint 5 · Variety 4

"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import DoseTimeField from "@/components/DoseTimeField";
import MedicationAutocomplete from "@/components/MedicationAutocomplete";
import { formatMedicationTime, generateMealAnchoredMedicationTimes, generateMedicationTimes, generateRoutineAnchoredMedicationTimes, hasAsNeededDirections, type MedicationFrequency } from "@/lib/medication-schedule";
import { encodeMedicationSchedule, medicationEmailDraft, medicationShareCopy, scheduleDurationLabel, type DoseAnchorLabel, type MealDoseLabel, type SharedMedicationSchedule } from "@/lib/medication-share-link";
import { MEDICATION_NAMES } from "@/lib/medication-names";
import { trackMedicationScheduleGenerated, trackMedicationShareInitiated, type MedicationAudience } from "@/lib/analytics";

type Frequency = MedicationFrequency;
type Duration = 7 | 10 | 14 | 30 | "ongoing" | "custom";
type ScheduleBasis = "clock" | "meals" | "routine";

const FREQ_OPTIONS: { label: string; value: Frequency }[] = [
  { label: "Once", value: 1 }, { label: "Twice", value: 2 }, { label: "3 times", value: 3 },
  { label: "4 times", value: 4 }, { label: "Set times manually", value: "custom" },
];
const DURATION_OPTIONS: { label: string; value: Duration }[] = [
  { label: "7 days", value: 7 }, { label: "10 days", value: 10 }, { label: "14 days", value: 14 },
  { label: "30 days", value: 30 }, { label: "Ongoing", value: "ongoing" }, { label: "Custom", value: "custom" },
];
function parseDuration(value: string): Duration {
  return value === "ongoing" || value === "custom" ? value : (Number(value) as Duration);
}
const MEAL_LABELS_BY_FREQUENCY: Record<1 | 2 | 3 | 4, MealDoseLabel[]> = {
  1: ["Breakfast"],
  2: ["Breakfast", "Dinner"],
  3: ["Breakfast", "Lunch", "Dinner"],
  4: ["Breakfast", "Lunch", "Dinner", "Evening"],
};
function mealDoseLabel(index: number, frequency: Frequency): MealDoseLabel | undefined {
  return frequency === "custom" ? undefined : MEAL_LABELS_BY_FREQUENCY[frequency][index];
}
const ROUTINE_LABELS_BY_FREQUENCY: Record<1 | 2 | 3 | 4, DoseAnchorLabel[]> = {
  1: ["Wake-up"],
  2: ["Wake-up", "Bedtime"],
  3: ["Wake-up", "Midday", "Bedtime"],
  4: ["Wake-up", "Lunch", "Dinner", "Bedtime"],
};
function routineDoseLabel(index: number, frequency: Frequency): DoseAnchorLabel | undefined {
  return frequency === "custom" ? undefined : ROUTINE_LABELS_BY_FREQUENCY[frequency][index];
}
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
  return <button type="button" onClick={onClick} className={`rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-300 active:translate-y-px ${selected ? "bg-green-500 text-black" : "border border-zinc-700 text-zinc-300 hover:border-zinc-500 hover:text-white"}`}>{label}</button>;
}
const inputClass = "w-full rounded-xl border border-zinc-700 bg-zinc-800 px-3 py-3 text-sm text-white placeholder-zinc-500 transition-colors focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-400/20";

export default function ProviderMedicationSchedule({ variant = "provider" }: { variant?: "provider" | "caregiver" | "veterinary" }) {
  const isCaregiver = variant === "caregiver";
  const isVeterinary = variant === "veterinary";
  const timePickerAudience = isCaregiver ? "patient" : "provider";
  const analyticsAudience: Exclude<MedicationAudience, "patient"> = isVeterinary ? "veterinary" : isCaregiver ? "caregiver" : "provider";
  const [medication, setMedication] = useState("");
  const [practiceName, setPracticeName] = useState("");
  const [instructions, setInstructions] = useState("");
  const [scheduleBasis, setScheduleBasis] = useState<ScheduleBasis>("clock");
  const [frequency, setFrequency] = useState<Frequency>(1);
  const [startTime, setStartTime] = useState("08:00");
  const [startDate, setStartDate] = useState(todayISO());
  const [duration, setDuration] = useState<Duration>(30);
  const [customDays, setCustomDays] = useState("60");
  const [times, setTimes] = useState<string[]>([]);
  const [generatedTimes, setGeneratedTimes] = useState<string[]>([]);
  const [timeZone, setTimeZone] = useState("");
  const [generated, setGenerated] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const [stickyCtaReady, setStickyCtaReady] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);
  const formHeadingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (generated) return;
    function checkHeadingPosition() {
      const node = formHeadingRef.current;
      if (node) setStickyCtaReady(node.getBoundingClientRect().bottom < 0);
    }
    checkHeadingPosition();
    window.addEventListener("scroll", checkHeadingPosition, { passive: true });
    window.addEventListener("resize", checkHeadingPosition);
    return () => {
      window.removeEventListener("scroll", checkHeadingPosition);
      window.removeEventListener("resize", checkHeadingPosition);
    };
  }, [generated]);

  useEffect(() => {
    setTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC");
  }, []);
  const timeZones = useMemo(() => COMMON_TIME_ZONES.some((zone) => zone.value === timeZone) || !timeZone ? COMMON_TIME_ZONES : [{ value: timeZone, label: "Local" }, ...COMMON_TIME_ZONES], [timeZone]);
  const parsedDays = Number.parseInt(customDays, 10);
  const effectiveDuration: number | "ongoing" = duration === "custom" ? Math.min(365, Math.max(1, Number.isFinite(parsedDays) ? parsedDays : 1)) : duration;
  const takenWithFood = scheduleBasis === "meals";
  const asNeededWarning = hasAsNeededDirections(instructions);
  function doseLabel(index: number): DoseAnchorLabel | undefined {
    if (scheduleBasis === "meals") return mealDoseLabel(index, frequency);
    if (scheduleBasis === "routine") return routineDoseLabel(index, frequency);
    return undefined;
  }
  function handleGenerate() {
    if (!medication.trim()) { setError("Enter a medication name."); return; }
    const nextTimes = scheduleBasis === "meals"
      ? generateMealAnchoredMedicationTimes(frequency)
      : scheduleBasis === "routine"
        ? generateRoutineAnchoredMedicationTimes(frequency)
        : generateMedicationTimes(startTime, frequency);
    setTimes(nextTimes);
    setGeneratedTimes(nextTimes);
    setGenerated(true); setShareUrl(""); setCopied(false); setError("");
    trackMedicationScheduleGenerated(analyticsAudience);
    window.requestAnimationFrame(() => resultRef.current?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" }));
  }
  function sharedSchedule(): SharedMedicationSchedule {
    let dayOffset = 0;
    const scheduledTimes = times.map((time, index) => {
      if (index > 0 && time <= times[index - 1]) dayOffset += 1;
      return { time, dayOffset, doseLabel: doseLabel(index) };
    });
    return { version: 1, medication: medication.trim(), practiceName: practiceName.trim() || undefined, senderRole: variant, instructions: instructions.trim(), startDate, days: effectiveDuration, times: scheduledTimes, timeZone: timeZone || undefined, takenWithFood: takenWithFood || undefined };
  }
  function createShareUrl() {
    const url = `${window.location.origin}/medication-schedule#schedule=${encodeMedicationSchedule(sharedSchedule())}`;
    setShareUrl(url);
    return url;
  }
  async function handleShare() {
    const url = shareUrl || createShareUrl();
    const { title, text } = medicationShareCopy(practiceName, variant);
    try {
      if (typeof navigator.share === "function") {
        await navigator.share({ title, text, url });
        trackMedicationShareInitiated(analyticsAudience, "native_share");
      } else {
        trackMedicationShareInitiated(analyticsAudience, "email");
        window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${text}\n\n${url}`)}`;
      }
      setError("");
    } catch (shareError) {
      if (shareError instanceof DOMException && shareError.name === "AbortError") return;
      setError("This device could not open sharing. Copy the schedule link and send it only to the intended person.");
    }
  }
  function handleEmail() {
    const url = shareUrl || createShareUrl();
    const draft = medicationEmailDraft(sharedSchedule(), url);
    trackMedicationShareInitiated(analyticsAudience, "email");
    window.location.href = `mailto:?subject=${encodeURIComponent(draft.subject)}&body=${encodeURIComponent(draft.body)}`;
  }
  async function handleCopy() {
    const url = shareUrl || createShareUrl();
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setError("");
      trackMedicationShareInitiated(analyticsAudience, "copy");
    } catch {
      setError("Copying was blocked. Select and copy the link below instead.");
    }
  }
  const previewDoseLabel = doseLabel(0);
  const calendarPreviewTitle = `${previewDoseLabel ? `${previewDoseLabel} dose: ` : ""}Take ${medication.trim() || "medication"}`;

  return (
    <div ref={resultRef} className="scroll-mt-24 rounded-2xl border border-zinc-800 bg-zinc-900 p-4 sm:p-6">
      {!generated ? <>
        <div className="flex items-start gap-3 border-b border-zinc-800 pb-5">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-green-500 text-sm font-black text-black">1</span>
          <div><h2 ref={formHeadingRef} className="text-xl font-black tracking-tight text-white sm:text-2xl">{isVeterinary ? "Create a medication schedule for a pet owner" : isCaregiver ? "Create a medication schedule for someone in your care" : "Create a medication schedule for your patient"}</h2><p className="mt-1 text-sm leading-relaxed text-zinc-400">{isVeterinary ? "Enter the veterinarian’s directions. You’ll review every dose time before sharing." : isCaregiver ? "Enter the directions from the prescription. You’ll review every dose time before sharing." : "Enter the prescribed regimen. You’ll review every dose time before sharing."}</p></div>
        </div>
        <div className="mt-5 space-y-5">
          <div><Label>Medication</Label><MedicationAutocomplete value={medication} onChange={setMedication} options={MEDICATION_NAMES} className={inputClass} /></div>
          <div><Label>{isCaregiver ? "Directions from the prescription" : isVeterinary ? "Veterinarian directions" : "Medication directions"} <span className="font-normal text-zinc-500">(optional)</span></Label><input value={instructions} onChange={(e) => setInstructions(e.target.value)} placeholder={isVeterinary ? "e.g. Give 1 tablet with food" : isCaregiver ? "e.g. Take 1 tablet with food" : "e.g. 500 mg with meals"} autoComplete="off" className={inputClass} />{asNeededWarning && <p className="mt-3 rounded-lg border border-amber-400/30 bg-amber-400/[0.07] px-4 py-3 text-sm leading-relaxed text-zinc-200">This tool creates recurring dose times. Confirm that a recurring schedule is appropriate for this medication before sharing.</p>}</div>
          <div><Label>How often?</Label><div className="flex flex-wrap gap-2">{FREQ_OPTIONS.map((option) => <Pill key={option.value} label={option.label} selected={frequency === option.value} onClick={() => setFrequency(option.value)} />)}</div></div>
          <fieldset className="rounded-xl border border-zinc-800 bg-zinc-950/30 p-4"><legend className="px-1 text-sm font-semibold text-zinc-200">How should dose times be set?</legend><p className="mt-1 text-xs leading-relaxed text-zinc-400">Choose the option that best matches the directions.</p><div className="mt-3 flex flex-wrap gap-2"><Pill label="Clock times" selected={scheduleBasis === "clock"} onClick={() => setScheduleBasis("clock")} /><Pill label="Meal times" selected={scheduleBasis === "meals"} onClick={() => setScheduleBasis("meals")} /><Pill label="Daily routine" selected={scheduleBasis === "routine"} onClick={() => setScheduleBasis("routine")} /></div>{scheduleBasis === "meals" ? <div className="mt-4 rounded-lg border border-green-500/20 bg-green-500/[0.06] p-3 text-sm text-zinc-300"><p className="font-semibold text-white">Default meal times</p><p className="mt-1 leading-relaxed">Breakfast at 8:15 am, lunch at 12:45 pm, and dinner at 6:30 pm.</p><p className="mt-2 text-xs leading-relaxed text-zinc-400">Fully adjustable on the next screen.</p></div> : scheduleBasis === "routine" ? <div className="mt-4 rounded-lg border border-green-500/20 bg-green-500/[0.06] p-3 text-sm text-zinc-300"><p className="font-semibold text-white">Default routine times</p><p className="mt-1 leading-relaxed">Wake-up at 7:00 am and bedtime at 9:00 pm, with additional daytime doses when needed.</p><p className="mt-2 text-xs leading-relaxed text-zinc-400">Fully adjustable on the next screen.</p></div> : <div className="mt-4"><Label>First dose time</Label><DoseTimeField value={startTime} onChange={setStartTime} label="First dose time" audience={isCaregiver ? "patient" : "provider"} /></div>}</fieldset>
          <fieldset className="rounded-xl border border-zinc-800 bg-zinc-950/20 p-4"><legend className="px-1 text-sm font-semibold text-zinc-200">Schedule dates and time zone</legend><div className="mt-2 grid gap-5 sm:grid-cols-2"><div><Label>Start date</Label><input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className={inputClass} /></div><div><Label>Duration</Label><select value={duration} onChange={(e) => setDuration(parseDuration(e.target.value))} aria-label="Schedule duration" className={inputClass}>{DURATION_OPTIONS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select>{duration === "custom" && <div className="mt-3"><input type="text" inputMode="numeric" pattern="[0-9]*" value={customDays} onChange={(e) => setCustomDays(e.target.value.replace(/\D/g, "").slice(0, 3))} onBlur={() => setCustomDays(String(effectiveDuration))} aria-label="Custom schedule duration in days" className={inputClass} /><span className="mt-2 block text-xs text-zinc-500">Days, up to 365</span></div>}</div><div><Label>{isVeterinary ? "Pet owner’s time zone" : isCaregiver ? "Their time zone" : "Patient’s time zone"}</Label><select value={timeZone} onChange={(e) => setTimeZone(e.target.value)} className={inputClass} aria-label={isVeterinary ? "Pet owner’s time zone" : isCaregiver ? "Their time zone" : "Patient’s time zone"}>{!timeZone && <option value="">Select time zone</option>}{timeZones.map((zone) => <option key={zone.value} value={zone.value}>{zone.label}</option>)}</select><span className="mt-2 block text-xs text-zinc-500">Calendar events will use this time zone.</span></div><div><Label>{isCaregiver ? "Your name" : "Practice or clinic name"} <span className="font-normal text-zinc-500">(optional)</span></Label><input value={practiceName} onChange={(e) => setPracticeName(e.target.value.slice(0, 120))} placeholder={isCaregiver ? "e.g. Ethan" : isVeterinary ? "e.g. Lakeside Veterinary Clinic" : "e.g. Riverside Family Medicine"} autoComplete={isCaregiver ? "name" : "organization"} className={inputClass} /></div></div></fieldset>
          {error && <p role="alert" className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</p>}
          <div className={stickyCtaReady ? "sticky bottom-0 z-10 -mx-4 border-t border-zinc-800 bg-zinc-900/95 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6" : "pt-1"}><button type="button" onClick={handleGenerate} className="w-full rounded-full bg-green-500 px-6 py-3.5 text-sm font-bold text-black transition-colors hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-300 active:translate-y-px sm:w-auto">Review schedule</button></div>
        </div>
      </> : <>
        <div className="mt-1 flex items-start gap-3 border-b border-zinc-800 pb-5"><span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-green-500 text-sm font-black text-black">2</span><div><h2 className="text-xl font-black text-white sm:text-2xl">Review schedule before sharing</h2><p className="mt-1 text-sm leading-relaxed text-zinc-400">Adjust the schedule as desired.</p></div></div>
        <div className="mt-6 grid min-w-0 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(17rem,.82fr)] lg:items-start">
          <div className="order-2 lg:order-1"><Label>Every dose time</Label><div className="space-y-2">{times.map((time, index) => <div key={index} className="min-w-0 rounded-xl border border-zinc-800 bg-zinc-950/20 p-3"><div className="mb-2 flex items-center justify-between gap-3"><span className="text-xs font-semibold text-zinc-400">{doseLabel(index) ? `${doseLabel(index)} dose` : `Dose ${index + 1}`} · {formatMedicationTime(time)}</span><button type="button" onClick={() => { setTimes((current) => current.filter((_, i) => i !== index)); setShareUrl(""); setCopied(false); }} className="text-zinc-500 transition-colors hover:text-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400" aria-label="Remove this time">Remove</button></div><DoseTimeField value={time} onChange={(value) => { setTimes((current) => current.map((item, i) => i === index ? value : item)); setShareUrl(""); setCopied(false); }} label={`${doseLabel(index) || `Dose ${index + 1}`} time`} audience={timePickerAudience} /></div>)}</div><button type="button" onClick={() => { setTimes((current) => [...current, "08:00"]); setShareUrl(""); setCopied(false); }} className="mt-3 text-sm font-medium text-green-400 underline underline-offset-4 transition-colors hover:text-green-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400">Add another dose time</button>{(times.length !== generatedTimes.length || times.some((time, index) => time !== generatedTimes[index])) && <p className="mt-4 rounded-lg border border-amber-400/30 bg-amber-400/[0.07] px-4 py-3 text-sm leading-relaxed text-zinc-200">{isVeterinary ? "You changed a dose time. Confirm the new time with the veterinarian before sharing." : isCaregiver ? "You changed a dose time. Confirm the new time with their healthcare provider before sharing." : "Dose times changed from the suggested routine. Review the final times before sharing."}</p>}{asNeededWarning && <p className="mt-4 rounded-lg border border-amber-400/30 bg-amber-400/[0.07] px-4 py-3 text-sm leading-relaxed text-zinc-200">This tool creates recurring dose times. Confirm that a recurring schedule is appropriate for this medication before sharing.</p>}</div>
          <div className="order-1 flex min-w-0 flex-col gap-4 lg:order-2 lg:sticky lg:top-24">
            <div className="rounded-xl border border-zinc-700 bg-zinc-950/35 p-4"><div className="flex items-center gap-2"><span className="flex size-6 items-center justify-center rounded-full bg-green-500 text-xs font-black text-black">3</span><p className="text-lg font-bold text-white">Share the schedule</p></div><p className="mt-2 text-sm leading-relaxed text-zinc-400">{isVeterinary ? "Send one schedule link to the pet owner so they can review it and add it to their calendar." : isCaregiver ? "They open one schedule link, check the details, and add it to their own calendar." : "Paste the schedule link into the patient’s portal message or visit instructions."}</p><p className="mt-2 text-xs leading-relaxed text-zinc-500">Anyone with the complete link can view the schedule. Send it only to the intended person.</p><div className="mt-4 rounded-lg border border-zinc-800 bg-zinc-900/70 p-3"><p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">Calendar event</p><p className="mt-1 text-sm font-semibold text-white">{calendarPreviewTitle}</p><p className="mt-1 text-xs text-zinc-400">{times.length} {times.length === 1 ? "time" : "times"} daily · {scheduleDurationLabel(effectiveDuration)}</p></div><button type="button" onClick={handleCopy} className="mt-4 w-full rounded-full bg-green-500 px-5 py-3.5 text-sm font-bold text-black transition-colors hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-300 active:translate-y-px">{copied ? "Schedule link copied" : isVeterinary ? "Copy for pet owner" : isCaregiver ? "Copy schedule link" : "Copy for patient portal"}</button><button type="button" onClick={handleEmail} disabled={!timeZone || times.length === 0} className="mt-3 w-full whitespace-nowrap text-sm font-medium text-zinc-200 underline underline-offset-2 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400 disabled:cursor-not-allowed disabled:text-zinc-600">Email it instead</button><button type="button" onClick={handleShare} disabled={!timeZone || times.length === 0} className="mt-3 w-full whitespace-nowrap text-sm font-medium text-zinc-400 underline underline-offset-2 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400 disabled:cursor-not-allowed disabled:text-zinc-600">Text or use another app</button></div>
          </div>
        </div>
      </>}
      <div className="mt-6 border-t border-zinc-800 pt-4 text-xs leading-relaxed text-zinc-500"><p><strong className="text-zinc-300">Processed in this browser.</strong> OnTimer does not provide accounts or server-side storage for these schedules. The complete link is not encrypted or access-controlled, so send it only to the intended person. <Link href="/OnTimer_Privacy_Policy.html" className="underline underline-offset-2 hover:text-zinc-300">Privacy Policy</Link></p><p className="mt-3">OnTimer is an organizational tool and does not provide medical or veterinary advice. {isVeterinary ? "Check the medication, dose times, and directions against the veterinary prescription before sharing." : isCaregiver ? "Check the medication, dose times, and directions against the prescription or with their healthcare provider before sharing." : "It does not determine the medication, dosage, or clinical timing."} <Link href="/terms" className="underline underline-offset-2 hover:text-zinc-300">Terms of Service</Link></p></div>
    </div>
  );
}
