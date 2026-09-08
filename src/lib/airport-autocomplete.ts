export interface AirportAutocompleteOption {
  code: string;
  name: string;
  city: string;
  aliases?: string[];
  planningJurisdiction?: "us" | "international";
}

interface AirportLocationInput {
  code: string;
  name: string;
  city: string;
}

export function airportPlanningJurisdictionForCountry(
  country: string
): "us" | "international" {
  return country.trim() === "United States" ? "us" : "international";
}

export function buildAirportCalendarLocation({ code, name, city }: AirportLocationInput): string {
  const normalizedCode = code.trim().toUpperCase();
  const codePattern = new RegExp(`\\s*\\(${normalizedCode}\\)\\s*`, "gi");
  const normalizedName = name.replace(codePattern, " ").replace(/\s+/g, " ").trim();
  return `${normalizedName} (${normalizedCode}), ${city}`;
}

export function filterAirportOptions(
  options: AirportAutocompleteOption[],
  query: string
): AirportAutocompleteOption[] {
  const normalize = (value: string) => value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
  const normalizedQuery = normalize(query.trim());
  const tokens = normalizedQuery.split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return [];

  return options
    .filter((option) => {
      const searchText = normalize([
        option.code,
        option.name,
        option.city,
        ...(option.aliases ?? []),
      ].join(" "));
      return tokens.every((token) => searchText.includes(token));
    })
    .toSorted((left, right) => {
      const leftCodeMatch = left.code.toLowerCase() === normalizedQuery ? 1 : 0;
      const rightCodeMatch = right.code.toLowerCase() === normalizedQuery ? 1 : 0;
      if (leftCodeMatch !== rightCodeMatch) return rightCodeMatch - leftCodeMatch;

      const leftStarts = normalize(`${left.name} ${left.city}`).startsWith(normalizedQuery) ? 1 : 0;
      const rightStarts = normalize(`${right.name} ${right.city}`).startsWith(normalizedQuery) ? 1 : 0;
      if (leftStarts !== rightStarts) return rightStarts - leftStarts;

      return left.name.localeCompare(right.name);
    })
    .slice(0, 50);
}
