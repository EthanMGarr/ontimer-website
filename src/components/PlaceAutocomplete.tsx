/// Reusable address autocomplete input backed by Google Places or the Mapbox pilot.
///
/// ## Purpose
/// Drop-in replacement for a plain text input wherever address suggestions improve UX.
/// All API calls are proxied through same-origin routes (provider keys stay server-side).
///
/// ## Include
/// - Responsive debounced Google autocomplete (650ms, min 4 chars)
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
  hasExactAirportIdentifierMatch,
  type AirportAutocompleteOption,
} from "@/lib/airport-autocomplete";
import {
  loadAirportDirectoryOptions,
  resetAirportDirectoryOptionsForRetry,
} from "@/lib/airport-directory-options";
import {
  AUTOCOMPLETE_PASTE_DEBOUNCE_MS,
  AUTOCOMPLETE_TYPING_DEBOUNCE_MS,
} from "@/lib/places-autocomplete";

let pageAutocompleteSessionId: string | null = null;

function autocompleteSessionId(): string {
  if (pageAutocompleteSessionId) return pageAutocompleteSessionId;
  pageAutocompleteSessionId = globalThis.crypto?.randomUUID?.()
    ?? `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
  return pageAutocompleteSessionId;
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface Prediction {
  placeId: string;
  description: string;
  mainText: string;
  secondaryText: string;
  kind?: "airport" | "place";
}

export interface SelectedAutocompletePlace {
  provider: "mapbox";
  placeId: string;
  description: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

interface PlaceAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  inputClassName?: string;
  id?: string;
  ariaDescribedBy?: string;
  types?: string;
  includeAirports?: boolean;
  provider?: "google" | "mapbox";
  locale?: "en" | "es";
  onPlaceSelected?: (place: SelectedAutocompletePlace | null) => void;
  onResolutionChange?: (isResolving: boolean) => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function PlaceAutocomplete({
  value,
  onChange,
  placeholder = "Start typing an address or city",
  inputClassName = "",
  id,
  ariaDescribedBy,
  types = "geocode",
  includeAirports = false,
  provider = "google",
  locale = "en",
  onPlaceSelected,
  onResolutionChange,
}: PlaceAutocompleteProps) {
  const usesAirportDirectory = includeAirports || types === "airport";
  const [placeSuggestions, setPlaceSuggestions] = useState<Prediction[]>([]);
  const [airportOptions, setAirportOptions] = useState<AirportAutocompleteOption[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const minimumCharacters = types === "airport" ? 2 : 4;
  const deferredValue = useDeferredValue(value);
  const airportSuggestions = useMemo<Prediction[]>(() => {
    if (!usesAirportDirectory || deferredValue.trim().length < 2) return [];

    return filterAirportOptions(airportOptions, deferredValue)
      .slice(0, 6)
      .map((option) => ({
        placeId: `airport-directory-${option.code}`,
        description: buildAirportCalendarLocation(option),
        mainText: `${option.code} · ${option.name}`,
        secondaryText: option.city,
        kind: "airport",
      }));
  }, [airportOptions, deferredValue, usesAirportDirectory]);
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
  const finishBulkLookupAfterBlurRef = useRef(false);
  const selectFirstAfterBlurRef = useRef(false);
  const selectionInFlightRef = useRef(false);
  const selectedValueRef = useRef("");
  const valueRef = useRef(value);
  const placeSuggestionsRef = useRef<Prediction[]>([]);
  const directoryLoadStartedRef = useRef(false);
  const mapboxSessionRef = useRef<string | null>(null);
  const handleSelectRef = useRef<(prediction: Prediction) => void>(() => undefined);
  valueRef.current = value;
  placeSuggestionsRef.current = placeSuggestions;

  const mapboxSessionToken = useCallback(() => {
    if (!mapboxSessionRef.current) {
      mapboxSessionRef.current = globalThis.crypto?.randomUUID?.()
        ?? `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
    }
    return mapboxSessionRef.current;
  }, []);

  const hasAirportMatches = useCallback(
    (input: string, options = airportOptions) =>
      usesAirportDirectory && input.trim().length >= 2 && filterAirportOptions(options, input).length > 0,
    [airportOptions, usesAirportDirectory]
  );

  const hasExactAirportMatch = useCallback(
    (input: string) => hasExactAirportIdentifierMatch(airportOptions, input),
    [airportOptions]
  );

  const ensureAirportDirectoryLoaded = useCallback(() => {
    if (!usesAirportDirectory || directoryLoadStartedRef.current) return;
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
  }, [hasAirportMatches, usesAirportDirectory]);

  // ── Close on click outside ──────────────────────────────────────────────────
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        const hasUnresolvedMapboxValue = provider === "mapbox"
          && valueRef.current.trim().length >= minimumCharacters
          && selectedValueRef.current !== valueRef.current;
        const firstPlaceSuggestion = placeSuggestionsRef.current[0];
        const lookupPending = debounceRef.current !== null || requestRef.current !== null;

        // Clicking Calculate, another field, or any control outside the input
        // must not discard a valid Mapbox lookup. Resolve the top suggestion
        // through the same retrieve flow so routing receives coordinates.
        if (hasUnresolvedMapboxValue && (firstPlaceSuggestion || lookupPending)) {
          focusedRef.current = false;
          finishBulkLookupAfterBlurRef.current = true;
          selectFirstAfterBlurRef.current = true;
          onResolutionChange?.(true);
          if (firstPlaceSuggestion) handleSelectRef.current(firstPlaceSuggestion);
          return;
        }

        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = null;
        requestIdRef.current += 1;
        requestRef.current?.abort();
        requestRef.current = null;
        finishBulkLookupAfterBlurRef.current = false;
        selectFirstAfterBlurRef.current = false;
        selectionInFlightRef.current = false;
        onResolutionChange?.(false);
        setIsSearching(false);
        setPlaceSuggestions([]);
        setIsOpen(false);
        setActiveIndex(-1);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [minimumCharacters, onResolutionChange, provider]);

  // ── Fetch suggestions ───────────────────────────────────────────────────────
  const fetchSuggestions = useCallback(async (
    input: string,
    requestId: number,
    allowAfterBlur = false,
    selectFirstResult = false
  ) => {
    let selectionStarted = false;
    if (
      requestId !== requestIdRef.current ||
      (!focusedRef.current && !allowAfterBlur && !selectFirstAfterBlurRef.current) ||
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

    // Airport-only fields can be satisfied entirely by the lazy local
    // directory. General place fields retain Google suggestions unless the
    // visitor entered an exact airport identifier such as JFK or 42W.
    if (
      (types === "airport" && hasAirportMatches(input)) ||
      (includeAirports && hasExactAirportMatch(input))
    ) {
      setPlaceSuggestions([]);
      setIsOpen(true);
      setActiveIndex(-1);
      setIsSearching(false);
      return;
    }

    try {
      requestRef.current?.abort();
      const controller = new AbortController();
      requestRef.current = controller;
      const endpoint = provider === "mapbox" ? "/api/mapbox-search" : "/api/places-autocomplete";
      const googleParams = new URLSearchParams({ input, types });
      const res = await fetch(provider === "mapbox" ? endpoint : `${endpoint}?${googleParams}`, {
        method: provider === "mapbox" ? "POST" : "GET",
        signal: controller.signal,
        headers: {
          ...(provider === "mapbox" ? { "Content-Type": "application/json" } : {}),
          "X-OnTimer-Autocomplete-Session": autocompleteSessionId(),
        },
        body: provider === "mapbox" ? JSON.stringify({
          action: "suggest",
          input,
          sessionToken: mapboxSessionToken(),
          language: locale,
        }) : undefined,
      });
      if (!res.ok) return;
      const data: { predictions: Prediction[] } = await res.json();
      if (
        requestId !== requestIdRef.current ||
        valueRef.current !== input ||
        (!focusedRef.current && !allowAfterBlur && !selectFirstAfterBlurRef.current)
      ) return;
      const preds = data.predictions ?? [];
      if ((selectFirstResult || selectFirstAfterBlurRef.current) && preds[0]) {
        selectionStarted = true;
        handleSelectRef.current(preds[0]);
        return;
      }
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
        finishBulkLookupAfterBlurRef.current = false;
        selectFirstAfterBlurRef.current = false;
        if (!selectionStarted) onResolutionChange?.(false);
        setIsSearching(false);
      }
    }
  }, [hasAirportMatches, hasExactAirportMatch, includeAirports, locale, mapboxSessionToken, minimumCharacters, onResolutionChange, provider, types]);

  // ── Input change handler ────────────────────────────────────────────────────
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      const previousValue = valueRef.current;
      const inputType = (e.nativeEvent as InputEvent).inputType ?? "";
      const isPaste = inputType === "insertFromPaste";
      const isAutoFill = inputType === "insertReplacementText"
        || inputType === "insertFromAutoFill"
        || (!isPaste && val.length - previousValue.length > 1);
      // iOS Contact AutoFill and password-manager address fills commonly
      // replace an empty/partial value in one event, then blur the field. Keep
      // that one lookup alive so the user can choose a normalized place without
      // having to type another character. This path is shared by Google and
      // Mapbox autocomplete.
      const isBulkInsertion = isPaste || isAutoFill;
      onChange(val);
      onPlaceSelected?.(null);
      selectedValueRef.current = "";
      selectionInFlightRef.current = false;
      onResolutionChange?.(isAutoFill && val.trim().length >= minimumCharacters);
      if (usesAirportDirectory) ensureAirportDirectoryLoaded();

      // Reset dedup when user keeps typing
      if (val !== lastFetchedRef.current) {
        lastFetchedRef.current = "";
      }

      // Clear pending debounce
      if (debounceRef.current) clearTimeout(debounceRef.current);
      requestRef.current?.abort();
      requestRef.current = null;
      const requestId = ++requestIdRef.current;
      finishBulkLookupAfterBlurRef.current = isBulkInsertion;
      setPlaceSuggestions([]);

      if (val.trim().length < minimumCharacters) {
        onResolutionChange?.(false);
        setIsSearching(false);
        setIsOpen(hasAirportMatches(val));
        return;
      }

      if (!focusedRef.current) {
        onResolutionChange?.(false);
        setIsSearching(false);
        return;
      }
      setIsSearching(true);
      setIsOpen(hasAirportMatches(val));

      debounceRef.current = setTimeout(() => {
        debounceRef.current = null;
        fetchSuggestions(val, requestId, isBulkInsertion, isAutoFill);
      }, isPaste ? AUTOCOMPLETE_PASTE_DEBOUNCE_MS : AUTOCOMPLETE_TYPING_DEBOUNCE_MS);
    },
    [ensureAirportDirectoryLoaded, fetchSuggestions, hasAirportMatches, minimumCharacters, onChange, onPlaceSelected, onResolutionChange, usesAirportDirectory]
  );

  // ── Selection ───────────────────────────────────────────────────────────────
  const handleSelect = useCallback(
    (prediction: Prediction) => {
      const reviewedDescription = provider === "mapbox" && prediction.kind !== "airport"
        ? [prediction.mainText.trim(), prediction.secondaryText.trim()].filter(Boolean).join(", ")
          || prediction.description
        : prediction.description;
      onChange(reviewedDescription);
      setPlaceSuggestions([]);
      setIsOpen(false);
      setIsSearching(false);
      setActiveIndex(-1);
      requestIdRef.current += 1;
      requestRef.current?.abort();
      requestRef.current = null;
      lastFetchedRef.current = reviewedDescription;
      finishBulkLookupAfterBlurRef.current = false;
      selectFirstAfterBlurRef.current = false;
      selectedValueRef.current = reviewedDescription;

      if (provider !== "mapbox" || prediction.kind === "airport") {
        selectionInFlightRef.current = false;
        onPlaceSelected?.(null);
        onResolutionChange?.(false);
        return;
      }

      onResolutionChange?.(true);
      selectionInFlightRef.current = true;
      const sessionToken = mapboxSessionToken();
      const selectionRequestId = requestIdRef.current;
      // The captured token completes this selection. A subsequent edit must
      // begin a distinct concurrent Mapbox billing session.
      mapboxSessionRef.current = null;
      void fetch("/api/mapbox-search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "retrieve",
          placeId: prediction.placeId,
          sessionToken,
          language: locale,
        }),
      })
        .then(async (response) => {
          if (!response.ok) throw new Error(`Mapbox retrieve failed: ${response.status}`);
          const data = await response.json() as {
            place?: {
              placeId: string;
              description: string;
              coordinates: { latitude: number; longitude: number };
            };
          };
          if (!data.place) throw new Error("Mapbox retrieve returned no place");
          if (
            selectionRequestId !== requestIdRef.current ||
            valueRef.current !== reviewedDescription
          ) return;
          // Keep exactly the main and secondary label shown in the suggestion
          // list. Hidden provider full-address fields can be lower quality even
          // when the visible result and routing coordinates are valid.
          onChange(reviewedDescription);
          lastFetchedRef.current = reviewedDescription;
          onPlaceSelected?.({
            provider: "mapbox",
            ...data.place,
            description: reviewedDescription,
          });
        })
        .catch(() => {
          if (selectionRequestId === requestIdRef.current) onPlaceSelected?.(null);
        })
        .finally(() => {
          if (selectionRequestId === requestIdRef.current) {
            selectionInFlightRef.current = false;
            onResolutionChange?.(false);
          }
        });
    },
    [locale, mapboxSessionToken, onChange, onPlaceSelected, onResolutionChange, provider]
  );
  handleSelectRef.current = handleSelect;

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
        aria-describedby={ariaDescribedBy}
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
          if (finishBulkLookupAfterBlurRef.current || selectionInFlightRef.current) return;
          if (debounceRef.current) clearTimeout(debounceRef.current);
          debounceRef.current = null;
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
          {provider === "mapbox" && placeSuggestions.length > 0 && (
            <li role="presentation" className="border-t border-zinc-700/50 px-3 py-2 text-right text-[11px] text-zinc-400">
              Search results powered by Mapbox
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
