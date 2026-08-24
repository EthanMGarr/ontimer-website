export interface AirportAutocompleteOption {
  code: string;
  name: string;
  city: string;
  location: string;
  searchText: string;
}

interface AirportLocationInput {
  code: string;
  name: string;
  city: string;
}

export function buildAirportCalendarLocation({ code, name, city }: AirportLocationInput): string {
  const normalizedCode = code.trim().toUpperCase();
  const codePattern = new RegExp(`\\s*\\(${normalizedCode}\\)\\s*`, "gi");
  const normalizedName = name.replace(codePattern, " ").replace(/\\s+/g, " ").trim();
  return `${normalizedName} (${normalizedCode}), ${city}`;
}

export function filterAirportOptions(
  options: AirportAutocompleteOption[],
  query: string
): AirportAutocompleteOption[] {
  const tokens = query.trim().toLowerCase().split(/\\s+/).filter(Boolean);
  if (tokens.length === 0) return [];

  return options
    .filter((option) => tokens.every((token) => option.searchText.includes(token)))
    .toSorted((left, right) => {
      const normalizedQuery = query.trim().toLowerCase();
      const leftCodeMatch = left.code.toLowerCase() === normalizedQuery ? 1 : 0;
      const rightCodeMatch = right.code.toLowerCase() === normalizedQuery ? 1 : 0;
      if (leftCodeMatch !== rightCodeMatch) return rightCodeMatch - leftCodeMatch;

      const leftStarts = left.searchText.startsWith(normalizedQuery) ? 1 : 0;
      const rightStarts = right.searchText.startsWith(normalizedQuery) ? 1 : 0;
      if (leftStarts !== rightStarts) return rightStarts - leftStarts;

      return left.name.localeCompare(right.name);
    });
}
