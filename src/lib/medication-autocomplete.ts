export interface MedicationNameOption {
  label: string;
  searchText: string;
}

export function filterMedicationOptions(
  options: MedicationNameOption[],
  query: string
): MedicationNameOption[] {
  const tokens = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return [];
  const normalizedQuery = query.trim().toLowerCase();

  return options
    .filter((option) => tokens.every((token) => option.searchText.includes(token)))
    .toSorted((left, right) => {
      const leftStarts = left.searchText.startsWith(normalizedQuery) ? 1 : 0;
      const rightStarts = right.searchText.startsWith(normalizedQuery) ? 1 : 0;
      if (leftStarts !== rightStarts) return rightStarts - leftStarts;

      return left.label.localeCompare(right.label);
    });
}
