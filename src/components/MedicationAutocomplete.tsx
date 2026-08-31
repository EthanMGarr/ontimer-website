"use client";

import { useDeferredValue, useId, useMemo, useState } from "react";
import { filterMedicationOptions, type MedicationNameOption } from "@/lib/medication-autocomplete";

interface MedicationAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  options: MedicationNameOption[];
  placeholder?: string;
  className?: string;
}

export default function MedicationAutocomplete({
  value,
  onChange,
  options,
  placeholder = "e.g. Metformin",
  className = "",
}: MedicationAutocompleteProps) {
  const listboxId = useId();
  const deferredValue = useDeferredValue(value);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const matches = useMemo(() => filterMedicationOptions(options, deferredValue), [deferredValue, options]);

  function selectOption(option: MedicationNameOption) {
    onChange(option.label);
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
        aria-activedescendant={isOpen && matches[activeIndex] ? `${listboxId}-${activeIndex}` : undefined}
        autoComplete="off"
        value={value}
        placeholder={placeholder}
        className={className}
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
          {matches.length > 0 ? (
            matches.map((option, index) => (
              <button
                key={option.label}
                id={`${listboxId}-${index}`}
                type="button"
                role="option"
                aria-selected={index === activeIndex}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => selectOption(option)}
                className={`block w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors ${
                  index === activeIndex ? "bg-zinc-800 text-white" : "text-zinc-300 hover:bg-zinc-800/70"
                }`}
              >
                {option.label}
              </button>
            ))
          ) : (
            <p className="px-3 py-3 text-xs leading-relaxed text-zinc-400">
              No matching medication found. You can still use the name you typed.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
