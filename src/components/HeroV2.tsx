"use client";

import { useEffect, useRef, useState } from "react";

type HeroPhase =
  | "calendar"
  | "transform"
  | "alarm"
  | "reminder"
  | "missed"
  | "ontimer"
  | "acknowledged";

const heroTimeline: Array<{ phase: HeroPhase; duration: number }> = [
  { phase: "calendar", duration: 1500 },
  { phase: "transform", duration: 1100 },
  { phase: "alarm", duration: 1300 },
  { phase: "reminder", duration: 1300 },
  { phase: "missed", duration: 1000 },
  { phase: "ontimer", duration: 1700 },
  { phase: "acknowledged", duration: 1100 },
];

function useHeroTimeline() {
  const [phase, setPhase] = useState<HeroPhase>("calendar");
  const [isVisible, setIsVisible] = useState(true);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = rootRef.current;
    if (!node || !("IntersectionObserver" in window)) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.25 },
    );
    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      setPhase("ontimer");
      return undefined;
    }

    if (!isVisible) return undefined;

    let index = 0;
    let timer: number | undefined;

    const advance = () => {
      setPhase(heroTimeline[index].phase);
      timer = window.setTimeout(() => {
        index = (index + 1) % heroTimeline.length;
        advance();
      }, heroTimeline[index].duration);
    };

    advance();

    return () => {
      if (timer) window.clearTimeout(timer);
    };
  }, [isVisible]);

  return { phase, rootRef };
}

function CalendarGlyph() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5">
      <path
        fill="currentColor"
        d="M7 2a1 1 0 0 1 1 1v1h8V3a1 1 0 1 1 2 0v1h1.25A2.75 2.75 0 0 1 22 6.75v11.5A2.75 2.75 0 0 1 19.25 21H4.75A2.75 2.75 0 0 1 2 18.25V6.75A2.75 2.75 0 0 1 4.75 4H6V3a1 1 0 0 1 1-1Zm13 7H4v9.25c0 .41.34.75.75.75h14.5c.41 0 .75-.34.75-.75V9ZM4.75 6a.75.75 0 0 0-.75.75V7h16v-.25a.75.75 0 0 0-.75-.75H18v.5a1 1 0 1 1-2 0V6H8v.5a1 1 0 1 1-2 0V6H4.75Z"
      />
    </svg>
  );
}

function AlarmGlyph({ ringing = false }: { ringing?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={`h-5 w-5 ${ringing ? "animate-[heroV2Ring_0.8s_ease-in-out_infinite]" : ""}`}
    >
      <path
        fill="currentColor"
        d="M7.88 3.39 4.6 6.12a1 1 0 0 1-1.28-1.54L6.6 1.85a1 1 0 0 1 1.28 1.54Zm8.24 0a1 1 0 0 1 1.28-1.54l3.28 2.73a1 1 0 1 1-1.28 1.54l-3.28-2.73ZM12 6a7 7 0 1 0 0 14 7 7 0 0 0 0-14Zm1 7.59 2.2 2.2a1 1 0 0 1-1.4 1.42l-2.5-2.5A1 1 0 0 1 11 14V9.5a1 1 0 1 1 2 0v4.09Z"
      />
    </svg>
  );
}

function CheckGlyph() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5">
      <path
        fill="currentColor"
        d="M9.55 17.4 4.8 12.65a1 1 0 0 1 1.4-1.42l4.04 4.03 7.55-8.66a1 1 0 1 1 1.5 1.32l-8.25 9.47a1 1 0 0 1-1.49.01Z"
      />
    </svg>
  );
}

function CalendarEventCard({ phase }: { phase: HeroPhase }) {
  const isTransforming = phase === "transform" || phase === "alarm";

  return (
    <div
      className={`rounded-[1.35rem] border border-zinc-700/80 bg-zinc-950/92 p-4 shadow-2xl shadow-black/35 backdrop-blur transition duration-700 ${
        isTransforming ? "translate-y-[-10px] scale-[0.97] opacity-55" : ""
      }`}
    >
      <div className="flex items-center justify-between text-xs font-semibold text-zinc-500">
        <span>Calendar Event</span>
        <span>Tomorrow</span>
      </div>
      <div className="mt-4 flex gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-zinc-950">
          <CalendarGlyph />
        </div>
        <div className="min-w-0">
          <p className="text-lg font-black leading-tight text-white">
            Team Standup
          </p>
          <p className="mt-1 text-sm font-semibold text-zinc-400">9:00 AM</p>
          <p className="mt-3 text-xs font-semibold text-zinc-500">
            From your existing calendar
          </p>
        </div>
      </div>
    </div>
  );
}

function TransformationBridge({ phase }: { phase: HeroPhase }) {
  const isActive = phase === "transform" || phase === "alarm";

  return (
    <div
      className={`flex items-center justify-center gap-3 py-3 text-xs font-black uppercase tracking-[0.18em] transition duration-500 ${
        isActive ? "text-emerald-300 opacity-100" : "text-zinc-600 opacity-60"
      }`}
    >
      <span className="h-px w-12 bg-current opacity-40" />
      <span>Automatically becomes</span>
      <span className="h-px w-12 bg-current opacity-40" />
    </div>
  );
}

function OnTimerAlarmCard({
  phase,
  isSoundPlaying,
  onDismiss,
}: {
  phase: HeroPhase;
  isSoundPlaying: boolean;
  onDismiss?: () => void;
}) {
  const isActive =
    phase === "alarm" || phase === "ontimer" || phase === "acknowledged";
  const isAcknowledged = phase === "acknowledged";
  const isRinging = phase === "ontimer" || isSoundPlaying;

  return (
    <div
      className={`rounded-[1.35rem] border p-4 shadow-2xl transition duration-700 ${
        isActive
          ? "translate-y-0 border-emerald-400/45 bg-white text-zinc-950 shadow-emerald-950/30 opacity-100"
          : "translate-y-6 border-white/10 bg-white/80 text-zinc-950 opacity-0"
      } ${isRinging ? "animate-[heroV2Pulse_1.15s_ease-in-out_infinite]" : ""}`}
    >
      <div className="flex items-start gap-3">
        <img
          src="/images/ontimer_1024x1024.png"
          alt=""
          className="h-11 w-11 rounded-[0.9rem]"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-black text-zinc-500">OnTimer</p>
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700">
              <AlarmGlyph ringing={isRinging} />
              <span>{isRinging ? "Repeating" : "Alarm"}</span>
            </div>
          </div>
          <p className="mt-1 text-lg font-black leading-tight">
            Meeting starts in 2 minutes
          </p>
          <p className="mt-1 text-sm text-zinc-500">Tap to dismiss</p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <div className="text-xs font-semibold text-zinc-500">
          {isAcknowledged ? "Alarm acknowledged" : "Stays visible until you respond"}
        </div>
        <button
          type="button"
          onClick={onDismiss}
          className={`rounded-full px-3 py-1.5 text-xs font-black transition ${
            isAcknowledged
              ? "bg-emerald-600 text-white"
              : "bg-zinc-950 text-white hover:bg-zinc-800"
          }`}
        >
          {isAcknowledged ? (
            <span className="inline-flex items-center gap-1">
              <CheckGlyph /> Done
            </span>
          ) : (
            "Dismiss"
          )}
        </button>
      </div>
    </div>
  );
}

function ReminderContrast({ phase }: { phase: HeroPhase }) {
  const showReminder = phase === "reminder";
  const showMissed = phase === "missed";
  const showAlarm = phase === "ontimer" || phase === "acknowledged";

  return (
    <div className="relative mt-5 min-h-[11.5rem] overflow-hidden rounded-[1.35rem] border border-zinc-800 bg-black/36 p-4">
      <div className="flex items-center justify-between text-xs font-semibold text-zinc-500">
        <span>Behavioral difference</span>
        <span>9:00 AM</span>
      </div>

      <div
        className={`absolute left-4 right-4 top-12 rounded-2xl border border-zinc-700 bg-zinc-900 p-3 transition duration-700 ${
          showReminder ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0"
        }`}
      >
        <p className="text-xs font-bold text-zinc-500">Calendar reminder</p>
        <p className="mt-1 text-sm font-bold text-zinc-200">Team Standup soon</p>
      </div>

      <div
        className={`absolute left-4 right-4 top-12 rounded-2xl border border-zinc-800 bg-zinc-950 p-3 transition duration-700 ${
          showMissed ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
        }`}
      >
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold text-zinc-500">9:02 AM</p>
          <p className="rounded-full bg-zinc-800 px-2 py-1 text-xs font-black text-zinc-400">
            Missed opportunity
          </p>
        </div>
        <p className="mt-2 text-sm text-zinc-500">
          The notification disappeared before you acted.
        </p>
      </div>

      <div
        className={`absolute left-4 right-4 top-12 rounded-2xl border border-emerald-400/45 bg-white p-3 text-zinc-950 shadow-xl transition duration-700 ${
          showAlarm ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
        } ${phase === "ontimer" ? "animate-[heroV2Pulse_1.15s_ease-in-out_infinite]" : ""}`}
      >
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
            {phase === "acknowledged" ? <CheckGlyph /> : <AlarmGlyph ringing />}
          </div>
          <div>
            <p className="text-xs font-black text-zinc-500">OnTimer alarm</p>
            <p className="mt-1 text-sm font-black">
              {phase === "acknowledged"
                ? "Alarm acknowledged"
                : "Repeats until you respond"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Callout({
  children,
  active,
}: {
  children: string;
  active?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-bold transition ${
        active
          ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-200"
          : "border-zinc-800 bg-zinc-950/60 text-zinc-400"
      }`}
    >
      <span className="text-emerald-300">✓</span>
      <span>{children}</span>
    </div>
  );
}

export function HeroV2() {
  const { phase, rootRef } = useHeroTimeline();
  const [isSoundPlaying, setIsSoundPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const stopTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (stopTimerRef.current) window.clearTimeout(stopTimerRef.current);
      audioRef.current?.pause();
    };
  }, []);

  const stopAlarmPreview = () => {
    if (stopTimerRef.current) window.clearTimeout(stopTimerRef.current);
    stopTimerRef.current = null;
    audioRef.current?.pause();
    if (audioRef.current) audioRef.current.currentTime = 0;
    setIsSoundPlaying(false);
  };

  const playAlarmPreview = async () => {
    stopAlarmPreview();

    const audio = new Audio("/alarm.wav");
    audio.volume = 1;
    audioRef.current = audio;

    try {
      await audio.play();
      setIsSoundPlaying(true);
      stopTimerRef.current = window.setTimeout(stopAlarmPreview, 3000);
    } catch {
      stopAlarmPreview();
    }
  };

  return (
    <div
      ref={rootRef}
      className="relative mx-auto w-full max-w-[35rem] overflow-hidden rounded-[1.5rem] border border-zinc-800 bg-zinc-950 shadow-2xl shadow-black/60"
    >
      <style jsx global>{`
        @keyframes heroV2Pulse {
          0%,
          100% {
            transform: translateZ(0) scale(1);
            box-shadow: 0 18px 45px rgba(0, 0, 0, 0.24);
          }
          50% {
            transform: translateZ(0) scale(1.018);
            box-shadow: 0 22px 56px rgba(16, 185, 129, 0.16);
          }
        }

        @keyframes heroV2Ring {
          0%,
          100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(-9deg);
          }
          75% {
            transform: rotate(9deg);
          }
        }
      `}</style>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1f2937_0%,transparent_48%),linear-gradient(180deg,#111827_0%,#09090b_78%)] opacity-90" />

      {/* Timeline: calendar source -> automatic conversion -> OnTimer alarm -> notification contrast -> acknowledgement. */}
      <div className="relative p-5 sm:p-7">
        <div className="grid gap-3">
          <CalendarEventCard phase={phase} />
          <TransformationBridge phase={phase} />
          <OnTimerAlarmCard
            phase={phase}
            isSoundPlaying={isSoundPlaying}
            onDismiss={() => stopAlarmPreview()}
          />
        </div>

        <ReminderContrast phase={phase} />

        <button
          type="button"
          onClick={playAlarmPreview}
          className={`mx-auto mt-5 flex items-center justify-center gap-3 rounded-full border px-5 py-3 text-sm font-black transition focus:outline-none focus:ring-2 focus:ring-emerald-300 ${
            isSoundPlaying
              ? "border-emerald-300/60 bg-emerald-400/15 text-emerald-100"
              : "border-zinc-700 bg-zinc-900 text-zinc-100 hover:border-zinc-500 hover:bg-zinc-800"
          }`}
          aria-label="Play a three second OnTimer alarm preview"
        >
          <AlarmGlyph ringing={isSoundPlaying} />
          {isSoundPlaying ? "Playing the alarm" : "Tap to hear the alarm"}
        </button>

        <div className="mt-5 flex flex-wrap justify-center gap-2">
          <Callout active={phase === "alarm" || phase === "ontimer"}>
            Works after you leave the app
          </Callout>
          <Callout active={phase === "ontimer"}>
            Repeats until you respond
          </Callout>
          <Callout active={phase === "calendar" || phase === "transform"}>
            Built from your existing calendar
          </Callout>
        </div>
      </div>
    </div>
  );
}
