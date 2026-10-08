"use client";

import { useDeferredValue, useId, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  filterAirportOptions,
  type AirportAutocompleteOption,
} from "@/lib/airport-autocomplete";
import {
  loadAirportDirectoryOptions,
  resetAirportDirectoryOptionsForRetry,
} from "@/lib/airport-directory-options";

export interface AirportDirectoryGuide {
  code: string;
  name: string;
  city: string;
  href: string;
}

const genericCalculatorPath = "/airport-time-to-leave-calculator";
const maxResults = 8;

/** Opens the all-airport planner with only the airport filled in (plan link v1). */
function genericCalculatorHref(code: string): string {
  return `${genericCalculatorPath}?v=1&k=dep&a=${encodeURIComponent(code)}`;
}

/**
 * "Find your airport" search for the airport directory. Matches locally against
 * the reviewed airport guides first, then the scheduled-service IATA directory
 * (no paid autocomplete). Guides open their airport page; any other airport
 * opens the all-airport calculator with that airport prefilled.
 */
export default function AirportDirectorySearch({ guides }: { guides: AirportDirectoryGuide[] }) {
  const router = useRouter();
  const inputId = useId();
  const listboxId = useId();
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [directoryOptions, setDirectoryOptions] = useState<AirportAutocompleteOption[]>([]);
  const [isDirectoryLoading, setIsDirectoryLoading] = useState(false);
  const directoryLoadStartedRef = useRef(false);

  const guideOptions = useMemo<AirportAutocompleteOption[]>(
    () => guides.map((guide) => ({
      code: guide.code,
      name: guide.name,
      city: guide.city,
      detailPageHref: guide.href,
    })),
    [guides],
  );

  const matches = useMemo(() => {
    if (!deferredQuery.trim()) return [];
    const guideCodes = new Set(guideOptions.map((option) => option.code));
    const guideMatches = filterAirportOptions(guideOptions, deferredQuery);
    const otherMatches = filterAirportOptions(
      directoryOptions.filter((option) => !guideCodes.has(option.code)),
      deferredQuery,
    );
    // An exact code match always leads, even when it has no guide page.
    const exactOther = otherMatches.filter(
      (option) => option.code.toLowerCase() === deferredQuery.trim().toLowerCase(),
    );
    const exactGuide = guideMatches.filter(
      (option) => option.code.toLowerCase() === deferredQuery.trim().toLowerCase(),
    );
    const ordered = exactGuide.length || !exactOther.length
      ? [...guideMatches, ...otherMatches]
      : [...exactOther, ...guideMatches, ...otherMatches.filter((option) => !exactOther.includes(option))];
    return ordered.slice(0, maxResults);
  }, [deferredQuery, directoryOptions, guideOptions]);

  function ensureDirectoryLoaded() {
    if (directoryLoadStartedRef.current) return;
    directoryLoadStartedRef.current = true;
    setIsDirectoryLoading(true);
    void loadAirportDirectoryOptions()
      .then(setDirectoryOptions)
      .catch(() => {
        resetAirportDirectoryOptionsForRetry();
        directoryLoadStartedRef.current = false;
        setDirectoryOptions([]);
      })
      .finally(() => setIsDirectoryLoading(false));
  }

  function open(option: AirportAutocompleteOption) {
    setIsOpen(false);
    router.push(option.detailPageHref ?? genericCalculatorHref(option.code));
  }

  const showList = isOpen && query.trim().length > 0;

  return (
    <div className="site-airport-search">
      <label htmlFor={inputId} className="site-airport-search__label">
        Find your airport
      </label>
      <div className="site-airport-search__field">
        <input
          id={inputId}
          type="search"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={showList && matches.length > 0}
          aria-controls={listboxId}
          aria-activedescendant={
            showList && matches[activeIndex] ? `${listboxId}-${matches[activeIndex].code}` : undefined
          }
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          enterKeyHint="go"
          value={query}
          placeholder="Airport, city or code (e.g. JFK)"
          className="site-airport-search__input"
          onFocus={() => {
            setIsOpen(true);
            ensureDirectoryLoaded();
          }}
          onBlur={() => setIsOpen(false)}
          onChange={(event) => {
            setQuery(event.target.value);
            setIsOpen(true);
            setActiveIndex(0);
            ensureDirectoryLoaded();
          }}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              setIsOpen(false);
              return;
            }
            if (!showList || matches.length === 0) return;
            if (event.key === "ArrowDown") {
              event.preventDefault();
              setActiveIndex((index) => Math.min(index + 1, matches.length - 1));
            } else if (event.key === "ArrowUp") {
              event.preventDefault();
              setActiveIndex((index) => Math.max(index - 1, 0));
            } else if (event.key === "Enter") {
              event.preventDefault();
              open(matches[Math.min(activeIndex, matches.length - 1)]);
            }
          }}
        />
        {showList ? (
          <div id={listboxId} role="listbox" className="site-airport-search__results">
            {matches.length > 0 ? matches.map((option, index) => (
              <button
                key={option.code}
                id={`${listboxId}-${option.code}`}
                type="button"
                role="option"
                aria-selected={index === activeIndex}
                className="site-airport-search__option"
                data-active={index === activeIndex || undefined}
                onMouseDown={(event) => event.preventDefault()}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => open(option)}
              >
                <span className="site-airport-search__code">{option.code}</span>
                <span className="site-airport-search__text">
                  <strong>{option.name}</strong>
                  <span>{option.city}</span>
                </span>
                <span className="site-airport-search__kind">
                  {option.detailPageHref ? "Airport guide" : "Calculator"}
                </span>
              </button>
            )) : (
              <p className="site-airport-search__empty">
                {isDirectoryLoading
                  ? "Searching airports…"
                  : "No matching airport. Try the city or the 3-letter code."}
              </p>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}
