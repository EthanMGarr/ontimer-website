/// Reusable address autocomplete input backed by Google Places API.
///
/// ## Purpose
/// Drop-in replacement for a plain text input wherever address suggestions improve UX.
/// All API calls are proxied through /api/places-autocomplete (key stays server-side).
///
/// ## Include
/// - Responsive debounced Google autocomplete (350ms, min 4 chars)
/// - Optional immediate airport matching by IATA code or name from the local directory
/// - Requests only while the field is focused and actively edited
/// - Slightly longer pause after pasted text so complete addresses can be used as-is
/// - Immediate stale-request cancellation and visible searching feedback
/// - Dedup guard (skip fetch if input unchanged since last request)
/// - Keyboard navigation (↑ ↓ Enter Escape)
/// - Click-outside to dismiss
/// - Graceful fallback to plain text entry on any API failure
///
/// ## Don't Include
/// - Place Details API calls (description string is enough for routing)
/// - Any server-side logic (proxy is in /api/places-autocomplete)
///
/// ## Lifecycle & Usage
/// <PlaceAutocomplete value={origin} onChange={setOrigin} inputClassName={inputClass} />
/// value/onChange mirror a plain controlled input.

"use client";

import { useCallback, useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import {
  buildAirportCalendarLocation,
  filterAirportOptions,
  type AirportAutocompleteOption,
} from "@/lib/airport-autocomplete";
import {
  loadAirportDirectoryOptions,
  resetAirportDirectoryOptionsForRetry,
} from "@/lib/airport-directory-options";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Prediction {
  placeId: string;
  description: string;
  mainText: string;
  secondaryText: string;
  kind?: "airport" | "place";
}

interface PlaceAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  inputClassName?: string;
  id?: string;
  types?: string;
  includeAirports?: boolean;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function PlaceAutocomplete({
  value,
  onChange,
  placeholder = "Start typing an address or city",
  inputClassName = "",
  id,
  types = "geocode",
  includeAirports = false,
}: PlaceAutocompleteProps) {
  const [placeSuggestions, setPlaceSuggestions] = useState<Prediction[]>([]);
  const [airportOptions, setAirportOptions] = useState<AirportAutocompleteOption[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const minimumCharacters = types === "airport" ? 2 : 4;
  const deferredValue = useDeferredValue(value);
  const airportSuggestions = useMemo<Prediction[]>(() => {
    if (!includeAirports || deferredValue.trim().length < 2) return [];

    return filterAirportOptions(airportOptions, deferredValue)
      .slice(0, 6)
      .map((option) => ({
        placeId: `airport-directory-${option.code}`,
        description: buildAirportCalendarLocation(option),
        mainText: `${option.code} · ${option.name}`,
        secondaryText: option.city,
        kind: "airport",
      }));
  }, [airportOptions, deferredValue, includeAirports]);
  const suggestions = useMemo(() => {
    const airportDescriptions = new Set(
      airportSuggestions.map(({ description }) => description.toLocaleLowerCase())
    );
    return [
      ...airportSuggestions,
      ...placeSuggestions
        .filter(({ description }) => !airportDescriptions.has(description.toLocaleLowerCase()))
        .map((prediction) => ({ ...prediction, kind: "place" as const })),
    ].slice(0, 8);
  }, [airportSuggestions, placeSuggestions]);

  // Dedup: avoid re-fetching identical input
  const lastFetchedRef = useRef<string>("");
  const requestIdRef = useRef(0);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const requestRef = useRef<AbortController | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const focusedRef = useRef(false);
  const valueRef = useRef(value);
  const directoryLoadStartedRef = useRef(false);
  valueRef.current = value;

  const hasAirportMatches = useCallback(
    (input: string, options = airportOptions) =>
      includeAirports && input.trim().length >= 2 && filterAirportOptions(options, input).length > 0,
    [airportOptions, includeAirports]
  );

  const ensureAirportDirectoryLoaded = useCallback(() => {
    if (!includeAirports || directoryLoadStartedRef.current) return;
    directoryLoadStartedRef.current = true;
    void loadAirportDirectoryOptions()
      .then((options) => {
        setAirportOptions(options);
        if (focusedRef.current && hasAirportMatches(valueRef.current, options)) {
          setIsOpen(true);
          setActiveIndex(-1);
        }
      })
      .catch(() => {
        resetAirportDirectoryOptionsForRetry();
        directoryLoadStartedRef.current = false;
        setAirportOptions([]);
      });
  }, [hasAirportMatches, includeAirports]);

  // ── Close on click outside ──────────────────────────────────────────────────
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setPlaceSuggestions([]);
        setIsOpen(false);
        setActiveIndex(-1);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ── Fetch suggestions ───────────────────────────────────────────────────────
  const fetchSuggestions = useCallback(async (input: string, requestId: number) => {
    if (
      requestId !== requestIdRef.current ||
      !focusedRef.current ||
      input.trim().length < minimumCharacters
    ) {
      setPlaceSuggestions([]);
      setIsOpen(hasAirportMatches(input));
      if (requestId === requestIdRef.current) setIsSearching(false);
      return;
    }

    // Dedup: skip if this exact input was already fetched
    if (input === lastFetchedRef.current) {
      setIsSearching(false);
      return;
    }
    lastFetchedRef.current = input;

    try {
      const params = new URLSearchParams({
        input,
        types,
      });
      requestRef.current?.abort();
      const controller = new AbortController();
      requestRef.current = controller;
      const res = await fetch(`/api/places-autocomplete?${params}`, {
        signal: controller.signal,
      });
      if (!res.ok) return;
      const data: { predictions: Prediction[] } = await res.json();
      if (
        requestId !== requestIdRef.current ||
        valueRef.current !== input ||
        !focusedRef.current
      ) return;
      const preds = data.predictions ?? [];
      setPlaceSuggestions(preds);
      setIsOpen(preds.length > 0 || hasAirportMatches(input));
      setActiveIndex(-1);
    } catch (error) {
      if (
        requestId !== requestIdRef.current ||
        (error instanceof DOMException && error.name === "AbortError")
      ) return;
      // Fail silently — manual text entry still works
      setPlaceSuggestions([]);
      setIsOpen(hasAirportMatches(input));
    } finally {
      if (requestId === requestIdRef.current) {
        requestRef.current = null;
        setIsSearching(false);
      }
    }
  }, [hasAirportMatches, minimumCharacters, types]);

  // ── Input change handler ────────────────────────────────────────────────────
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      onChange(val);
      if (includeAirports) ensureAirportDirectoryLoaded();

      // Reset dedup when user keeps typing
      if (val !== lastFetchedRef.current) {
        lastFetchedRef.current = "";
      }

      // Clear pending debounce
      if (debounceRef.current) clearTimeout(debounceRef.current);
      requestRef.current?.abort();
      requestRef.current = null;
      const requestId = ++requestIdRef.current;
      setPlaceSuggestions([]);

      if (val.trim().length < minimumCharacters) {
        setIsSearching(false);
        setIsOpen(hasAirportMatches(val));
        return;
      }

      if (!focusedRef.current) {
        setIsSearching(false);
        return;
      }
      setIsSearching(true);
      setIsOpen(hasAirportMatches(val));

      const isPaste = (e.nativeEvent as InputEvent).inputType === "insertFromPaste";
      debounceRef.current = setTimeout(() => {
        fetchSuggestions(val, requestId);
      }, isPaste ? 600 : 350);
    },
    [ensureAirportDirectoryLoaded, fetchSuggestions, hasAirportMatches, includeAirports, minimumCharacters, onChange]
  );

  // ── Selection ───────────────────────────────────────────────────────────────
  const handleSelect = useCallback(
    (prediction: Prediction) => {
      onChange(prediction.description);
      setPlaceSuggestions([]);
      setIsOpen(false);
      setIsSearching(false);
      setActiveIndex(-1);
      requestIdRef.current += 1;
      requestRef.current?.abort();
      requestRef.current = null;
      lastFetchedRef.current = prediction.description;
    },
    [onChange]
  );

  // ── Keyboard navigation ─────────────────────────────────────────────────────
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!isOpen || suggestions.length === 0) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, suggestions.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, -1));
      } else if (e.key === "Enter" && activeIndex >= 0) {
        e.preventDefault();
        handleSelect(suggestions[activeIndex]);
      } else if (e.key === "Escape") {
        setPlaceSuggestions([]);
        setIsOpen(false);
        setActiveIndex(-1);
      }
    },
    [isOpen, suggestions, activeIndex, handleSelect]
  );

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div ref={containerRef} className="relative">
      <input
        id={id}
        type="text"
        value={value}
        onChange={handleChange}
        onFocus={() => {
          focusedRef.current = true;
          ensureAirportDirectoryLoaded();
          if (suggestions.length > 0) setIsOpen(true);
        }}
        onBlur={() => {
          focusedRef.current = false;
          if (debounceRef.current) clearTimeout(debounceRef.current);
          requestIdRef.current += 1;
          requestRef.current?.abort();
          requestRef.current = null;
          setIsSearching(false);
        }}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        autoComplete="off"
        className={inputClassName}
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-busy={isSearching}
      />

      {isSearching && (
        <span
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
          role="status"
          aria-live="polite"
        >
          <span
            className="block size-4 animate-spin rounded-full border-2 border-zinc-500 border-t-zinc-200"
            aria-hidden="true"
          />
          <span className="sr-only">Searching addresses…</span>
        </span>
      )}

      {isOpen && suggestions.length > 0 && (
        <ul
          role="listbox"
          className="absolute z-50 mt-1 w-full overflow-hidden rounded-lg border border-zinc-700 bg-zinc-800 shadow-xl"
        >
          {suggestions.map((pred, i) => (
            <li
              key={pred.placeId}
              role="option"
              aria-selected={i === activeIndex}
              // onMouseDown instead of onClick: fires before input blur,
              // so the dropdown doesn't close before the click registers
              onMouseDown={(e) => {
                e.preventDefault();
                handleSelect(pred);
              }}
              className={`min-h-12 cursor-pointer px-3 py-3 transition-colors ${
                i === activeIndex ? "bg-zinc-700" : "hover:bg-zinc-700/60"
              } ${i > 0 ? "border-t border-zinc-700/50" : ""}`}
            >
              <p className="truncate text-sm text-white">{pred.mainText}</p>
              {pred.secondaryText && (
                <p className="truncate text-xs text-zinc-400">
                  {pred.secondaryText}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
