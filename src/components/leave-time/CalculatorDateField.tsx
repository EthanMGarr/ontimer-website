import { formatAirportDateLabel } from "@/lib/airport-date-label";

interface CalculatorDateFieldProps {
  label: string;
  value: string;
  today: string;
  inputClassName: string;
  onChange: (value: string) => void;
  locale?: "en" | "es";
}

export default function CalculatorDateField({
  label,
  value,
  today,
  inputClassName,
  onChange,
  locale = "en",
}: CalculatorDateFieldProps) {
  return (
    <div className="min-w-0">
      <p className="mb-1.5 text-xs font-semibold text-zinc-400">{label}</p>
      <div className={`${inputClassName} relative flex items-center [color-scheme:dark]`}>
        <span className="truncate pr-7">{formatAirportDateLabel(value, today, locale)}</span>
        <span className="pointer-events-none absolute right-3 text-zinc-400" aria-hidden="true">▾</span>
        <input
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
