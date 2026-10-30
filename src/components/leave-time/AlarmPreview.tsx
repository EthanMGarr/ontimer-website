import type { SiteLocale } from "@/lib/i18n";

interface AlarmPreviewProps {
  /** Formatted time such as "6:33 PM"; omitted when the result is not a leave time. */
  time?: string;
  title?: string;
  locale?: SiteLocale;
}

/**
 * A small rendering of the OnTimer alarm screen. Colors are fixed hex values on purpose:
 * it depicts the dark iPhone alarm, so it must not follow the site's light-theme remapping.
 */
export default function AlarmPreview({ time, title, locale = "en" }: AlarmPreviewProps) {
  const [digits, meridiem] = splitTime(time);
  const slideLabel = locale === "es" ? "desliza para detener" : "slide to stop";
  const label = time
    ? locale === "es" ? `Vista previa de una alarma de OnTimer a las ${time}` : `Preview of an OnTimer alarm at ${time}`
    : locale === "es" ? "Vista previa de una alarma de OnTimer" : "Preview of an OnTimer alarm";

  return (
    <div
      role="img"
      aria-label={label}
      data-alarm-preview
      className="flex w-[5.75rem] shrink-0 flex-col items-center rounded-2xl bg-[#0b0b0c] px-2 pb-2 pt-2.5 shadow-[0_6px_18px_rgba(0,0,0,0.25)] ring-1 ring-[#ffffff1a]"
    >
      <span className="w-full truncate text-center text-[8px] font-medium leading-tight text-[#d4d4d8]">
        ⏰ {title ?? "OnTimer"}
      </span>
      {digits ? (
        <span className="mt-1 flex items-baseline gap-0.5 text-[#ffffff]">
          <span className="text-[22px] font-bold leading-none tabular-nums tracking-tight">{digits}</span>
          {meridiem && <span className="text-[8px] font-semibold">{meridiem}</span>}
        </span>
      ) : (
        <BellIcon />
      )}
      <span className="mt-0.5 text-[8px] text-[#a1a1aa]">OnTimer</span>
      <span className="mt-2 flex w-full items-center gap-1 rounded-full bg-[#27272a] p-0.5 pr-1.5">
        <span className="h-3.5 w-3.5 shrink-0 rounded-full bg-[#f4f4f5]" />
        <span className="truncate text-[7px] text-[#d4d4d8]">{slideLabel}</span>
      </span>
    </div>
  );
}

function splitTime(time?: string): [string | null, string | null] {
  if (!time) return [null, null];
  const match = time.match(/^(\d{1,2}[:.]\d{2})\s*(.*)$/);
  return match ? [match[1], match[2].trim() || null] : [time, null];
}

function BellIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="mt-1 h-6 w-6 text-[#ffffff]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}
