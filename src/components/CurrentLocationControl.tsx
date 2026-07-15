"use client";

import { useState } from "react";

interface CurrentLocationControlProps {
  active: boolean;
  onLocationChange: (coordinates: string | null) => void;
}

export default function CurrentLocationControl({
  active,
  onLocationChange,
}: CurrentLocationControlProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  function handleUseCurrentLocation() {
    if (!("geolocation" in navigator)) {
      onLocationChange(null);
      setStatus("error");
      setError("Current location is not available in this browser. Enter an address instead.");
      return;
    }

    setStatus("loading");
    setError(null);
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        onLocationChange(`${coords.latitude},${coords.longitude}`);
        setStatus("idle");
        window.gtag?.("event", "current_location_used", {
          page_path: window.location.pathname,
          accuracy_meters: Math.round(coords.accuracy),
        });
      },
      () => {
        onLocationChange(null);
        setStatus("error");
        setError("We couldn’t access your location. Allow location access or enter an address.");
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={handleUseCurrentLocation}
        disabled={status === "loading"}
        className="mt-2 inline-flex min-h-9 items-center gap-2 rounded-lg px-2 text-sm font-semibold text-green-400 transition-colors hover:bg-green-500/10 hover:text-green-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 disabled:cursor-wait disabled:text-zinc-500"
      >
        <LocationIcon />
        {status === "loading" ? "Finding your location…" : "Use my current location"}
      </button>
      {error && (
        <p className="mt-1 text-xs text-amber-400" role="alert">
          {error}
        </p>
      )}
      {active && !error && status !== "loading" && (
        <p className="mt-1 text-xs text-zinc-500" role="status">
          Current location added.
        </p>
      )}
    </>
  );
}

function LocationIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3" />
      <path strokeLinecap="round" d="M12 2v3M12 19v3M2 12h3M19 12h3" />
      <circle cx="12" cy="12" r="8" />
    </svg>
  );
}
