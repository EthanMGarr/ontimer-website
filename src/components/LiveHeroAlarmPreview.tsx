"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const eventNames = ["Team Standup", "Job Interview", "1-on-1 Meeting"];
const tilesPerCascade = 3;

function ArrowRight() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="h-4 w-4 text-emerald-300"
    >
      <path
        fillRule="evenodd"
        d="M3 10a.75.75 0 0 1 .75-.75h10.69l-4.22-4.22a.75.75 0 1 1 1.06-1.06l5.5 5.5a.75.75 0 0 1 0 1.06l-5.5 5.5a.75.75 0 1 1-1.06-1.06l4.22-4.22H3.75A.75.75 0 0 1 3 10Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function tileStyle(age: number, isVisible: boolean) {
  if (!isVisible) {
    return {
      opacity: 0,
      transform: "translateY(22px) scale(0.98)",
      zIndex: 0,
    };
  }

  const scale = age === 0 ? 1 : age === 1 ? 0.94 : 0.88;
  const y = age === 0 ? 0 : age === 1 ? -14 : -26;
  const opacity = age === 0 ? 1 : age === 1 ? 0.62 : 0.36;

  return {
    opacity,
    transform: `translateY(${y}px) scale(${scale})`,
    zIndex: tilesPerCascade - age,
  };
}

function NotificationTile({
  age,
  isVisible,
  label,
  isPlaying,
}: {
  age: number;
  isVisible: boolean;
  label: string;
  isPlaying: boolean;
}) {
  const isFront = age === 0 && isVisible;

  return (
    <div
      className={`absolute left-[28%] right-[3%] top-[12%] transition-all duration-500 ease-out ${
        isFront && isPlaying ? "animate-[liveHeroAlarmPulse_1s_ease-in-out_infinite]" : ""
      }`}
      style={tileStyle(age, isVisible)}
    >
      <div className="mx-auto flex max-w-[24rem] items-start gap-3 rounded-[1.05rem] border border-white/25 bg-white/90 p-3 text-left shadow-[0_18px_50px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:p-4">
        <img
          src="/images/ontimer_1024x1024.png"
          alt=""
          className="h-9 w-9 rounded-[0.7rem] sm:h-10 sm:w-10"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-bold text-zinc-500 sm:text-sm">
              OnTimer
            </p>
            <p className="text-xs text-zinc-500 sm:text-sm">now</p>
          </div>
          <p className="mt-1 truncate text-sm font-black leading-tight text-zinc-950 sm:text-base">
            {label}
          </p>
          <p className="mt-1 truncate text-xs leading-tight text-zinc-500 sm:text-sm">
            Meeting in 2m · Tap to dismiss
          </p>
        </div>
      </div>
    </div>
  );
}

export function LiveHeroAlarmPreview() {
  const [stackIndex, setStackIndex] = useState(-1);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const stopTimerRef = useRef<number | null>(null);

  const currentEvent = eventNames[currentEventIndex];
  const notificationTiles = useMemo(
    () =>
      Array.from({ length: tilesPerCascade }, (_, index) => ({
        index,
        age: stackIndex - index,
        isVisible: stackIndex >= index,
      })),
    [stackIndex],
  );

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      setStackIndex(tilesPerCascade - 1);
      return undefined;
    }

    let cancelled = false;
    let timers: number[] = [];

    const schedule = (callback: () => void, delay: number) => {
      const timer = window.setTimeout(() => {
        if (!cancelled) callback();
      }, delay);
      timers.push(timer);
    };

    const runCascade = () => {
      setStackIndex(-1);
      schedule(() => setStackIndex(0), 500);
      schedule(() => setStackIndex(1), 1200);
      schedule(() => setStackIndex(2), 1900);
      schedule(() => {
        setCurrentEventIndex((index) => (index + 1) % eventNames.length);
        runCascade();
      }, 4900);
    };

    runCascade();

    return () => {
      cancelled = true;
      timers.forEach((timer) => window.clearTimeout(timer));
      timers = [];
    };
  }, []);

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

  const playAlarmPreview = async () => {
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
    <div className="relative mx-auto w-full max-w-[34rem] lg:max-w-[29rem]">
      <style jsx global>{`
        @keyframes liveHeroAlarmPulse {
          0%,
          100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(0) scale(1.018);
          }
        }
      `}</style>
      <div className="relative aspect-[0.92] overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-950 shadow-2xl shadow-black/60">
        <img
          src="/images/CantMissAlerts.png"
          alt="OnTimer iPhone screen showing upcoming calendar events"
          className="absolute inset-0 h-full w-full object-cover object-[56%_44%]"
        />

        <div
          aria-hidden="true"
          className="absolute left-[27%] right-[2%] top-[11%] h-[26%] rounded-[1.25rem] bg-black/30 backdrop-blur-[2px]"
        />

        {notificationTiles.map((tile) => (
          <NotificationTile
            key={`${currentEvent}-${tile.index}`}
            age={tile.age}
            isVisible={tile.isVisible}
            label={currentEvent}
            isPlaying={isPlaying}
          />
        ))}
      </div>

      <div className="absolute -bottom-5 left-5 right-5 rounded-2xl border border-zinc-800 bg-black/90 px-5 py-4 shadow-xl backdrop-blur">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 text-left">
          <p className="text-sm font-semibold text-white">Calendar event</p>
          <ArrowRight />
          <p className="text-sm font-semibold text-white">Real alarm</p>
        </div>
        <p className="mt-2 text-xs leading-5 text-zinc-500">
          The difference is not another reminder. It is an alert you have to
          acknowledge.
        </p>
        <button
          type="button"
          onClick={playAlarmPreview}
          className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm font-black text-zinc-100 transition hover:border-zinc-500 hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-emerald-300"
          aria-label="Play a three second OnTimer alarm preview"
        >
          <span aria-hidden="true">🔊</span>
          {isPlaying ? "Playing the alarm" : "Tap to hear the alarm"}
        </button>
      </div>
    </div>
  );
}
