"use client";

import { useDeferredValue, useId, useMemo, useState } from "react";
import {
  filterAirportOptions,
  type AirportAutocompleteOption,
} from "@/lib/airport-autocomplete";

interface AirportAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  options: AirportAutocompleteOption[];
  placeholder?: string;
  inputClassName?: string;
}

export default function AirportAutocomplete({
  value,
  onChange,
  options,
  placeholder = "Airport name or IATA code",
  inputClassName = "",
}: AirportAutocompleteProps) {
  const listboxId = useId();
  const deferredValue = useDeferredValue(value);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const matches = useMemo(
    () => filterAirportOptions(options, deferredValue),
    [deferredValue, options]
  );

  function selectOption(option: AirportAutocompleteOption) {
    onChange(option.location);
    setIsOpen(false);
    setActiveIndex(0);
  }

  return (
    <div className="relative">
      <input
        type="text"
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={isOpen && matches.length > 0}
        aria-controls={listboxId}
        aria-activedescendant={
          isOpen && matches[activeIndex]
            ? `${listboxId}-${matches[activeIndex].code}`
            : undefined
        }
        autoComplete="off"
        value={value}
        placeholder={placeholder}
        className={inputClassName}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
        onChange={(event) => {
          onChange(event.target.value);
          setIsOpen(true);
          setActiveIndex(0);
        }}
        onKeyDown={(event) => {
          if (!isOpen || matches.length === 0) return;
          if (event.key === "ArrowDown") {
            event.preventDefault();
            setActiveIndex((index) => Math.min(index + 1, matches.length - 1));
          } else if (event.key === "ArrowUp") {
            event.preventDefault();
            setActiveIndex((index) => Math.max(index - 1, 0));
          } else if (event.key === "Enter") {
            event.preventDefault();
            selectOption(matches[activeIndex]);
          } else if (event.key === "Escape") {
            setIsOpen(false);
          }
        }}
      />

      {isOpen && value.trim() && (
        <div
          id={listboxId}
          role="listbox"
          className="absolute z-30 mt-2 max-h-72 w-full overflow-y-auto rounded-xl border border-zinc-700 bg-zinc-900 p-1.5 shadow-2xl shadow-black/40"
        >
          {matches.length > 0 ? matches.map((option, index) => (
            <button
              key={`${option.code}-${option.location}`}
              id={`${listboxId}-${option.code}`}
              type="button"
              role="option"
              aria-selected={index === activeIndex}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => selectOption(option)}
              className={`flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${
                index === activeIndex ? "bg-zinc-800" : "hover:bg-zinc-800/70"
              }`}
            >
              <span className="mt-0.5 min-w-10 rounded-md bg-green-500/15 px-1.5 py-0.5 text-center text-xs font-bold text-green-400">
                {option.code}
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-white">{option.name}</span>
                <span className="block text-xs text-zinc-400">{option.city}</span>
              </span>
            </button>
          )) : (
            <p className="px-3 py-3 text-xs leading-relaxed text-zinc-400">
              No matching airport found. You can still use the airport text you entered.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
