"use client";

import { useId, useRef } from "react";
import { formatAirportDateLabel } from "@/lib/airport-date-label";

interface CalculatorDateFieldProps {
  label: string;
  value: string;
  today: string;
  inputClassName: string;
  onChange: (value: string) => void;
  locale?: "en" | "es";
  inputId?: string;
  labelClassName?: string;
  colorSchemeClassName?: string;
  chevronClassName?: string;
}

export default function CalculatorDateField({
  label,
  value,
  today,
  inputClassName,
  onChange,
  locale = "en",
  inputId,
  labelClassName = "mb-1.5 text-xs font-semibold text-zinc-400",
  colorSchemeClassName = "[color-scheme:dark]",
  chevronClassName = "text-zinc-400",
}: CalculatorDateFieldProps) {
  const generatedInputId = useId();
  const resolvedInputId = inputId ?? generatedInputId;
  const inputRef = useRef<HTMLInputElement>(null);

  function openPicker() {
    const input = inputRef.current;
    if (!input) return;
    try {
      input.showPicker();
    } catch {
      input.focus();
    }
  }

  return (
    <div className="min-w-0">
      <label htmlFor={resolvedInputId} className={labelClassName}>{label}</label>
      <div
        className={`${inputClassName} relative flex items-center ${colorSchemeClassName}`}
        onPointerDown={openPicker}
      >
        <span className="truncate pr-7">{formatAirportDateLabel(value, today, locale)}</span>
        <span className={`pointer-events-none absolute right-3 ${chevronClassName}`} aria-hidden="true">▾</span>
        <input
          ref={inputRef}
          id={resolvedInputId}
          type="date"
          value={value}
          min={today}
          aria-label={label}
          onChange={(event) => onChange(event.target.value)}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        />
      </div>
    </div>
  );
}
