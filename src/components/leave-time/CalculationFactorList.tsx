import type { CalculationFactor } from "@/core/leave-time";

interface CalculationFactorListProps {
  factors: CalculationFactor[];
  formatDuration: (minutes: number) => string;
  variant?: "summary" | "breakdown";
}

export default function CalculationFactorList({
  factors,
  formatDuration,
  variant = "summary",
}: CalculationFactorListProps) {
  if (variant === "breakdown") {
    return (
      <div className="space-y-3">
        {factors.map((factor) => (
          <div key={factor.key} className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm text-zinc-400">{factor.label}</p>
              {factor.explanation && (
                <p className="mt-0.5 text-[11px] leading-snug text-zinc-500">{factor.explanation}</p>
              )}
            </div>
            <div className="shrink-0 text-right">
              <p className="text-sm font-semibold text-white">{formatDuration(factor.minutes)}</p>
              {factor.sourceLabel && (
                <p className="text-[11px] text-green-500">{factor.sourceLabel}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-1.5 sm:grid-cols-2">
      {factors.map((factor) => (
        <div key={factor.key} className="flex items-start gap-2">
          <span className="mt-0.5 flex-shrink-0 text-xs text-green-500">✓</span>
          <span className="text-xs leading-relaxed text-zinc-300">
            {factor.label}: {formatDuration(factor.minutes)}
          </span>
        </div>
      ))}
    </div>
  );
}
