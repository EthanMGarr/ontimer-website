/// Reusable address autocomplete input backed by Google Places API.
///
/// ## Purpose
/// Drop-in replacement for a plain text input wherever address suggestions improve UX.
/// All API calls are proxied through /api/places-autocomplete (key stays server-side).
///
/// ## Include
/// - Debounced autocomplete (300ms, min 3 chars)
/// - Session token lifecycle (create on first keystroke, reset on selection)
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

import { useCallback, useEffect, useRef, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Prediction {
  placeId: string;
  description: string;
  mainText: string;
  secondaryText: string;
}

interface PlaceAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  inputClassName?: string;
  id?: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function newToken(): string {
  return typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2) + Date.now().toString(36);
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function PlaceAutocomplete({
  value,
  onChange,
  placeholder = "Start typing an address or city",
  inputClassName = "",
  id,
}: PlaceAutocompleteProps) {
  const [suggestions, setSuggestions] = useState<Prediction[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);

  // Session token: created on first keystroke, cleared after selection (billing boundary)
  const sessionTokenRef = useRef<string>("");
  // Dedup: avoid re-fetching identical input
  const lastFetchedRef = useRef<string>("");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // ── Close on click outside ──────────────────────────────────────────────────
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setSuggestions([]);
        setIsOpen(false);
        setActiveIndex(-1);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ── Fetch suggestions ───────────────────────────────────────────────────────
  const fetchSuggestions = useCallback(async (input: string) => {
    if (input.length < 3) {
      setSuggestions([]);
      setIsOpen(false);
      return;
    }

    // Dedup: skip if this exact input was already fetched
    if (input === lastFetchedRef.current) return;
    lastFetchedRef.current = input;

    try {
      const params = new URLSearchParams({
        input,
        sessiontoken: sessionTokenRef.current,
      });
      const res = await fetch(`/api/places-autocomplete?${params}`);
      if (!res.ok) return;
      const data: { predictions: Prediction[] } = await res.json();
      const preds = data.predictions ?? [];
      setSuggestions(preds);
      setIsOpen(preds.length > 0);
      setActiveIndex(-1);
    } catch {
      // Fail silently — manual text entry still works
      setSuggestions([]);
      setIsOpen(false);
    }
  }, []);

  // ── Input change handler ────────────────────────────────────────────────────
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      onChange(val);

      // Init session token on first keystroke of a new session
      if (!sessionTokenRef.current) {
        sessionTokenRef.current = newToken();
      }

      // Reset dedup when user keeps typing
      if (val !== lastFetchedRef.current) {
        lastFetchedRef.current = "";
      }

      // Clear pending debounce
      if (debounceRef.current) clearTimeout(debounceRef.current);

      if (val.length < 3) {
        setSuggestions([]);
        setIsOpen(false);
        return;
      }

      debounceRef.current = setTimeout(() => {
        fetchSuggestions(val);
      }, 300);
    },
    [onChange, fetchSuggestions]
  );

  // ── Selection ───────────────────────────────────────────────────────────────
  const handleSelect = useCallback(
    (prediction: Prediction) => {
      onChange(prediction.description);
      setSuggestions([]);
      setIsOpen(false);
      setActiveIndex(-1);
      // End the billing session; next typing creates a fresh token
      sessionTokenRef.current = "";
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
        setSuggestions([]);
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
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        autoComplete="off"
        className={inputClassName}
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      />

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
              className={`cursor-pointer px-3 py-2.5 transition-colors ${
                i === activeIndex ? "bg-zinc-700" : "hover:bg-zinc-700/60"
              } ${i > 0 ? "border-t border-zinc-700/50" : ""}`}
            >
              <p className="truncate text-sm text-white">{pred.mainText}</p>
              {pred.secondaryText && (
                <p className="truncate text-xs text-zinc-500">
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
