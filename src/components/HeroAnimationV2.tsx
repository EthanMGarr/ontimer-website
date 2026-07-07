"use client";

import { useEffect, useRef, useState } from "react";

type DemoPhase = "calendar" | "morph" | "alarm";

const demoTimeline: Array<{ phase: DemoPhase; duration: number }> = [
  { phase: "calendar", duration: 2200 },
  { phase: "morph", duration: 420 },
  { phase: "alarm", duration: 3100 },
];

function useDemoPhase() {
  const [phase, setPhase] = useState<DemoPhase>("calendar");
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
      setPhase("alarm");
      return undefined;
    }

    if (!isVisible) return undefined;

    let index = 0;
    let timer: number | undefined;

    const advance = () => {
      setPhase(demoTimeline[index].phase);
      timer = window.setTimeout(() => {
        index = (index + 1) % demoTimeline.length;
        advance();
      }, demoTimeline[index].duration);
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

function SpeakerGlyph({ active }: { active?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={`h-4 w-4 ${active ? "animate-[heroDemoRing_0.72s_ease-in-out_infinite]" : ""}`}
    >
      <path
        fill="currentColor"
        d="M4.5 9.5A2.5 2.5 0 0 1 7 7h1.35l3.34-2.67A1.45 1.45 0 0 1 14 5.46v13.08a1.45 1.45 0 0 1-2.31 1.13L8.35 17H7a2.5 2.5 0 0 1-2.5-2.5v-5Zm12.45-1.17a1 1 0 0 1 1.41 0A5.17 5.17 0 0 1 19.9 12a5.17 5.17 0 0 1-1.54 3.67 1 1 0 1 1-1.41-1.42A3.17 3.17 0 0 0 17.9 12c0-.88-.36-1.67-.95-2.25a1 1 0 0 1 0-1.42Z"
      />
    </svg>
  );
}

function CalendarEvent({ phase }: { phase: DemoPhase }) {
  const visible = phase === "calendar" || phase === "morph";

  return (
    <div
      className={`absolute left-[20%] right-[4%] top-[10%] rounded-[1.2rem] border border-white/70 bg-white p-3 text-left text-zinc-950 shadow-[0_20px_60px_rgba(0,0,0,0.34)] transition-all duration-300 ease-out sm:left-[23%] sm:p-4 ${
        visible ? "translate-y-0 scale-100 opacity-100" : "-translate-y-2 scale-[0.985] opacity-0"
      } ${phase === "morph" ? "translate-y-1 scale-[0.99] opacity-60 blur-[3px]" : ""}`}
    >
      <div className="flex items-center justify-between text-[0.68rem] font-bold uppercase tracking-[0.16em] text-zinc-500">
        <span>Calendar Event</span>
        <span>Tomorrow</span>
      </div>
      <div className="mt-3 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
          <CalendarGlyph />
        </div>
        <div className="min-w-0">
          <p className="truncate text-base font-black leading-tight sm:text-lg">
            Team Standup
          </p>
          <p className="mt-1 text-xs font-semibold text-zinc-500 sm:text-sm">
            Tomorrow • 9:00 AM
          </p>
        </div>
      </div>
    </div>
  );
}

function OnTimerAlarm({
  phase,
  isPlaying,
}: {
  phase: DemoPhase;
  isPlaying: boolean;
}) {
  const visible = phase === "morph" || phase === "alarm";
  const [stackIndex, setStackIndex] = useState(0);

  useEffect(() => {
    if (phase !== "alarm") {
      setStackIndex(0);
      return undefined;
    }

    const timers = [
      window.setTimeout(() => setStackIndex(1), 560),
      window.setTimeout(() => setStackIndex(2), 1160),
    ];

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [phase]);

  const cards = [
    {
      index: 0,
      title: "Team Standup",
      detail: "Starts in 2m - Tap to Dismiss",
    },
    {
      index: 1,
      title: "Team Standup",
      detail: "Starts in 2m - Tap to Dismiss",
    },
    {
      index: 2,
      title: "Team Standup",
      detail: "Starts in 2m - Tap to Dismiss",
    },
  ];

  return (
    <div
      className={`absolute left-[18%] right-[3%] top-[9%] transition-all duration-300 ease-out sm:left-[21%] ${
        visible ? "translate-y-0 scale-100 opacity-100" : "translate-y-2 scale-[0.985] opacity-0"
      } ${phase === "morph" ? "translate-y-1 scale-[0.992] opacity-75" : ""} ${
        isPlaying ? "animate-[heroDemoAlarmPulse_1s_ease-in-out_infinite]" : ""
      }`}
    >
      <div className="relative h-[7.2rem] sm:h-[7.8rem]">
        {cards.map((card) => {
          const isVisible = phase === "morph" ? card.index === 0 : stackIndex >= card.index;
          const age = stackIndex - card.index;
          const scale = age <= 0 ? 1 : age === 1 ? 0.95 : 0.9;
          const y = age <= 0 ? 0 : age === 1 ? -12 : -22;
          const opacity = !isVisible ? 0 : age <= 0 ? 1 : age === 1 ? 0.78 : 0.58;

          return (
            <div
              key={card.index}
              className="absolute inset-x-0 top-0 rounded-[1.35rem] border border-white/10 bg-zinc-950 p-3 text-left text-white shadow-[0_22px_70px_rgba(0,0,0,0.42)] transition-all duration-300 ease-out sm:p-4"
              style={{
                opacity,
                transform: isVisible
                  ? `translateY(${y}px) scale(${scale})`
                  : "translateY(18px) scale(0.98)",
                zIndex: 10 + card.index,
              }}
            >
              <div className="flex items-start gap-3">
                <img
                  src="/images/ontimer_1024x1024.png"
                  alt=""
                  className="h-10 w-10 rounded-[0.8rem] sm:h-11 sm:w-11"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-black text-zinc-300">OnTimer</p>
                    <p className="text-sm text-zinc-400">now</p>
                  </div>
                  <p className="mt-1 truncate text-base font-black leading-tight sm:text-lg">
                    {card.title}
                  </p>
                  <p className="mt-1 truncate text-[0.8rem] leading-tight text-zinc-300 sm:text-sm">
                    {card.detail}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}

function HearAlarmButton({
  isPlaying,
  onPlay,
}: {
  isPlaying: boolean;
  onPlay: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onPlay}
      className="absolute right-[6%] top-[33%] z-30 inline-flex touch-manipulation items-center gap-2 rounded-full border border-white/10 bg-zinc-950 px-3 py-1.5 text-xs font-black text-white shadow-[0_10px_30px_rgba(0,0,0,0.24)] transition hover:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-white/40"
      aria-label={
        isPlaying
          ? "Stop the OnTimer alarm preview"
          : "Play a three second OnTimer alarm preview"
      }
      aria-pressed={isPlaying}
    >
      <SpeakerGlyph />
      Hear Alarm
    </button>
  );
}

export function HeroAnimationV2() {
  const { phase, rootRef } = useDemoPhase();
  const [isPlaying, setIsPlaying] = useState(false);
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
    setIsPlaying(false);
  };

  const toggleAlarmPreview = async () => {
    if (isPlaying) {
      stopAlarmPreview();
      return;
    }

    stopAlarmPreview();

    const audio = new Audio("/alarm.wav");
    audio.volume = 1;
    audioRef.current = audio;

    try {
      await audio.play();
      setIsPlaying(true);
      stopTimerRef.current = window.setTimeout(stopAlarmPreview, 3000);
    } catch {
      stopAlarmPreview();
    }
  };

  return (
    <div
      ref={rootRef}
      className="relative mx-auto w-full max-w-[34rem] lg:max-w-[29rem]"
    >
      <style jsx global>{`
        @keyframes heroDemoPhoneVibe {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }
          50% {
            transform: translate3d(1px, 0, 0);
          }
        }

        @keyframes heroDemoAlarmPulse {
          0%,
          100% {
            filter: brightness(1);
          }
          50% {
            filter: brightness(1.035);
          }
        }

        @keyframes heroDemoRing {
          0%,
          100% {
            transform: rotate(0deg);
          }
          30% {
            transform: rotate(-8deg);
          }
          70% {
            transform: rotate(8deg);
          }
        }
      `}</style>

      <div className="relative aspect-[0.94] overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-950 shadow-2xl shadow-black/60 sm:aspect-[0.96]">
        <div
          className={`absolute inset-0 ${phase === "alarm" || isPlaying ? "animate-[heroDemoPhoneVibe_0.34s_ease-in-out_2]" : ""}`}
        >
          <img
            src="/images/CantMissAlerts.png"
            alt="OnTimer iPhone screen showing upcoming calendar events"
            className="h-full w-full object-cover object-[56%_43%]"
          />
        </div>

        <div
          aria-hidden="true"
          className="absolute left-[17%] right-[2%] top-[8%] h-[33%] rounded-[1.45rem] bg-black/18"
        />

        <div
          aria-hidden="true"
          className={`absolute left-[18%] right-[2%] top-[8%] h-[33%] rounded-[1.45rem] bg-white/20 backdrop-blur-md transition-opacity duration-200 ${
            phase === "morph" ? "opacity-100" : "opacity-0"
          }`}
        />

        <CalendarEvent phase={phase} />
        <OnTimerAlarm phase={phase} isPlaying={isPlaying} />
        <HearAlarmButton isPlaying={isPlaying} onPlay={toggleAlarmPreview} />

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/10 bg-black/55 px-3 py-1.5 text-[0.68rem] font-black text-zinc-300 shadow-lg backdrop-blur sm:text-xs">
          Calendar Event → Persistent Alarm
        </div>
      </div>
    </div>
  );
}
