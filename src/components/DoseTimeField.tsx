/// Hallmark · component: dose-time wheel · genre: utilitarian · theme: iOS alarm picker
/// States: default · hover · focus · open · late/early caution
/// Pre-emit critique: Philosophy 5 · Hierarchy 5 · Execution 5 · Specificity 5 · Restraint 5 · Variety 4

"use client";

import { useEffect, useRef, useState } from "react";
import { formatMedicationTime, medicationTimeFromParts, medicationTimeParts, type MedicationTimePeriod } from "@/lib/medication-schedule";

const ROW_HEIGHT = 48;
const HOURS = Array.from({ length: 12 }, (_, index) => index + 1);
const MINUTES = Array.from({ length: 60 }, (_, index) => index);
const PERIODS: MedicationTimePeriod[] = ["AM", "PM"];

interface DoseTimeFieldProps { value: string; onChange: (value: string) => void; label: string; audience?: "patient" | "provider"; }

function WheelColumn<T extends string | number>({ values, value, label, format, onSelect }: { values: T[]; value: T; label: string; format: (value: T) => string; onSelect: (value: T) => void; }) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef<number | null>(null);
  useEffect(() => { ref.current?.scrollTo({ top: Math.max(0, values.indexOf(value)) * ROW_HEIGHT }); }, [value, values]);
  return <div ref={ref} role="listbox" aria-label={label} className="relative z-10 h-36 snap-y snap-mandatory overflow-y-auto overscroll-contain py-12 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" onScroll={(event) => { if (frame.current !== null) cancelAnimationFrame(frame.current); const target = event.currentTarget; frame.current = requestAnimationFrame(() => { const index = Math.max(0, Math.min(values.length - 1, Math.round(target.scrollTop / ROW_HEIGHT))); if (values[index] !== value) onSelect(values[index]); }); }}>{values.map((item) => <button key={String(item)} type="button" role="option" aria-selected={item === value} onClick={() => onSelect(item)} className={`flex h-12 w-full snap-center items-center justify-center text-xl transition-colors ${item === value ? "font-semibold text-white" : "text-zinc-600"}`}>{format(item)}</button>)}</div>;
}

export default function DoseTimeField({ value, onChange, label, audience = "patient" }: DoseTimeFieldProps) {
  const [open, setOpen] = useState(false);
  const parts = medicationTimeParts(value);
  const hour24 = Number(value.slice(0, 2));
  const isLate = hour24 >= 23 || hour24 < 5;
  const isEarly = hour24 >= 5 && hour24 < 7;
  const cautioned = isLate || isEarly;
  const timingWord = isLate ? "late" : "early";
  const warning = audience === "provider" ? `Confirm this ${timingWord} dose time is intentional before sharing.` : `Note ${timingWord} dose time — adjust only with provider's approval.`;
  const update = (hour: number, minute: number, period: MedicationTimePeriod) => onChange(medicationTimeFromParts(hour, minute, period));
  const updateHour = (hour: number) => {
    const period = parts.hour === 12 && hour === 11 ? (parts.period === "AM" ? "PM" : "AM") : parts.period;
    update(hour, parts.minute, period);
  };

  return <div className="min-w-0">
    <button type="button" onClick={() => setOpen(true)} aria-label={`${label}: ${formatMedicationTime(value)}. Edit time`} className={`min-h-11 w-full rounded-lg border px-3 py-2.5 text-left text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400/40 ${cautioned ? "border-amber-500/60 bg-amber-500/10 text-amber-300" : "border-zinc-700 bg-zinc-800 text-white hover:border-zinc-600"}`}>{formatMedicationTime(value)}</button>
    {cautioned && <p className="mt-2 text-xs font-semibold text-amber-400">{warning}</p>}
    {open && <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/70 p-3 sm:items-center" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false); }}>
      <div role="dialog" aria-modal="true" aria-label={`Edit ${label}`} className="w-full max-w-md rounded-3xl border border-zinc-700 bg-zinc-900 p-4 shadow-2xl">
        <div className="flex items-center justify-between"><button type="button" onClick={() => setOpen(false)} className="grid size-11 place-items-center rounded-full bg-zinc-800 text-2xl text-zinc-300" aria-label="Close time picker">×</button><p className="font-bold text-white">Set dose time</p><button type="button" onClick={() => setOpen(false)} className="grid size-11 place-items-center rounded-full bg-green-500 text-xl font-black text-black" aria-label="Confirm time">✓</button></div>
        <div className="relative mt-4 grid grid-cols-3 overflow-hidden rounded-2xl bg-zinc-950/50"><div className="pointer-events-none absolute inset-x-2 top-12 h-12 rounded-xl bg-zinc-800" /><WheelColumn values={HOURS} value={parts.hour} label="Hour" format={(item) => String(item)} onSelect={updateHour} /><WheelColumn values={MINUTES} value={parts.minute} label="Minute" format={(item) => String(item).padStart(2, "0")} onSelect={(minute) => update(parts.hour, minute, parts.period)} /><WheelColumn values={PERIODS} value={parts.period} label="AM or PM" format={(item) => item} onSelect={(period) => update(parts.hour, parts.minute, period)} /></div>
      </div>
    </div>}
  </div>;
}
