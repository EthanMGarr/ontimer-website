"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const eventNames = ["Team Standup", "Job Interview", "1-on-1 Meeting"];
const tilesPerCascade = 3;

function BellIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5">
      <path
        fill="currentColor"
        d="M12 22a2.6 2.6 0 0 0 2.45-1.75h-4.9A2.6 2.6 0 0 0 12 22Zm7.25-6.1-1.5-1.52V10a5.76 5.76 0 0 0-4.35-5.58V3.8a1.4 1.4 0 1 0-2.8 0v.62A5.76 5.76 0 0 0 6.25 10v4.38l-1.5 1.52a1.43 1.43 0 0 0 1.02 2.43h12.46a1.43 1.43 0 0 0 1.02-2.43Z"
      />
    </svg>
  );
}

function AlarmIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5">
      <path
        fill="currentColor"
        d="M7.88 3.39 4.6 6.12a1 1 0 0 1-1.28-1.54L6.6 1.85a1 1 0 0 1 1.28 1.54Zm8.24 0a1 1 0 0 1 1.28-1.54l3.28 2.73a1 1 0 1 1-1.28 1.54l-3.28-2.73ZM12 6a7 7 0 1 0 0 14 7 7 0 0 0 0-14Zm1 7.59 2.2 2.2a1 1 0 0 1-1.4 1.42l-2.5-2.5A1 1 0 0 1 11 14V9.5a1 1 0 1 1 2 0v4.09Z"
      />
    </svg>
  );
}

function TapIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5">
      <path
        fill="currentColor"
        d="M9 2a1 1 0 0 1 1 1v8.07l.85-.48a2.3 2.3 0 0 1 2.43.12l4.04 2.7a3.75 3.75 0 0 1 1.56 4.1l-.83 2.9A2.18 2.18 0 0 1 15.95 22H10.4a4 4 0 0 1-3.2-1.6L3.85 16a1.85 1.85 0 0 1 2.72-2.47L8 14.82V3a1 1 0 0 1 1-1Zm4.95 3.88a1 1 0 0 1 1.4-.18 5.78 5.78 0 0 1 2.15 4.48 1 1 0 1 1-2 0 3.78 3.78 0 0 0-1.37-2.9 1 1 0 0 1-.18-1.4Zm3.8-2.14a1 1 0 0 1 1.4-.16A8.48 8.48 0 0 1 22.25 10a1 1 0 1 1-2 0 6.48 6.48 0 0 0-2.33-4.85 1 1 0 0 1-.17-1.41Z"
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
  const opacity = age === 0 ? 1 : age === 1 ? 0.64 : 0.36;

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
}: {
  age: number;
  isVisible: boolean;
  label: string;
}) {
  return (
    <div
      className="absolute inset-x-0 top-10 transition-all duration-500 ease-out"
      style={tileStyle(age, isVisible)}
    >
      <div className="mx-auto flex max-w-[24rem] items-start gap-3 rounded-[1.35rem] border border-white/70 bg-white/95 p-4 text-left shadow-[0_18px_50px_rgba(0,0,0,0.22)] backdrop-blur-xl">
        <img
          src="/images/ontimer_1024x1024.png"
          alt=""
          className="h-11 w-11 rounded-[0.85rem]"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-bold text-zinc-500">OnTimer</p>
            <p className="text-sm text-zinc-500">now</p>
          </div>
          <p className="mt-1 truncate text-lg font-black leading-tight text-zinc-950">
            {label}
          </p>
          <p className="mt-1 truncate text-base leading-tight text-zinc-500">
            Meeting in 2m · Tap to dismiss
          </p>
        </div>
      </div>
    </div>
  );
}

export function AlarmHeroPreview() {
  const [stackIndex, setStackIndex] = useState(-1);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const stopTimerRef = useRef<number | null>(null);
  const vibrationTimerRef = useRef<number | null>(null);

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
      if (vibrationTimerRef.current) {
        window.clearInterval(vibrationTimerRef.current);
      }
      audioRef.current?.pause();
    };
  }, []);

  const stopAlarmPreview = () => {
    if (stopTimerRef.current) window.clearTimeout(stopTimerRef.current);
    if (vibrationTimerRef.current) {
      window.clearInterval(vibrationTimerRef.current);
    }
    stopTimerRef.current = null;
    vibrationTimerRef.current = null;
    audioRef.current?.pause();
    if (audioRef.current) audioRef.current.currentTime = 0;
    setIsPlaying(false);
  };

  const playAlarmPreview = async () => {
    stopAlarmPreview();

    const audio = new Audio("/alarm.wav");
    audio.volume = 1;
    audioRef.current = audio;

    if ("vibrate" in navigator) {
      navigator.vibrate(140);
      vibrationTimerRef.current = window.setInterval(() => {
        navigator.vibrate(140);
      }, 1000);
    }

    try {
      await audio.play();
      setIsPlaying(true);
      stopTimerRef.current = window.setTimeout(stopAlarmPreview, 3000);
    } catch {
      stopAlarmPreview();
    }
  };

  return (
    <div className="relative mx-auto w-full max-w-[35rem] overflow-hidden rounded-[1.5rem] border border-zinc-800 bg-zinc-950 shadow-2xl shadow-black/60">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#155e75_0%,transparent_45%),linear-gradient(180deg,#111827_0%,#09090b_72%)] opacity-80" />

      <div className="relative px-5 py-5 sm:px-7 sm:py-7">
        <div className="rounded-[1.25rem] border border-zinc-800 bg-black/60 p-4 text-left backdrop-blur">
          <div className="flex items-center justify-between text-xs font-semibold text-zinc-500">
            <span>Calendar event</span>
            <span>2 min before start</span>
          </div>
          <div className="mt-3 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-300">
              <BellIcon />
            </div>
            <div>
              <p className="text-sm font-bold text-white">{currentEvent}</p>
              <p className="text-xs text-zinc-500">
                OnTimer creates the alarm automatically.
              </p>
            </div>
          </div>
        </div>

        <div className="relative mt-5 h-48">
          {notificationTiles.map((tile) => (
            <NotificationTile
              key={`${currentEvent}-${tile.index}`}
              age={tile.age}
              isVisible={tile.isVisible}
              label={currentEvent}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={playAlarmPreview}
          className="mx-auto flex items-center justify-center gap-3 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-5 py-3 text-sm font-black text-cyan-200 transition hover:border-cyan-300/60 hover:bg-cyan-400/15 focus:outline-none focus:ring-2 focus:ring-cyan-300"
          aria-label="Play a three second OnTimer alarm preview"
        >
          <span aria-hidden="true">🔊</span>
          {isPlaying ? "Playing the alarm" : "Tap to hear the alarm"}
        </button>

        <div className="mt-6 grid gap-3 text-sm text-zinc-200 sm:grid-cols-3">
          <div className="flex items-center gap-2">
            <span className="text-cyan-300">
              <BellIcon />
            </span>
            <span>Fires when the app is closed</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-cyan-300">
              <AlarmIcon />
            </span>
            <span>Audible alarm repeats</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-cyan-300">
              <TapIcon />
            </span>
            <span>Requires a tap to stop</span>
          </div>
        </div>
      </div>
    </div>
  );
}
