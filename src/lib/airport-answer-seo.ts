export interface AirportAnswerSeoInput {
  shortName: string;
  code: string;
  name: string;
  searchName?: string;
}

export function buildAirportSearchName({ shortName, code, searchName }: AirportAnswerSeoInput): string {
  if (searchName) return searchName;
  if (shortName.toLocaleUpperCase().includes(code.toLocaleUpperCase())) return shortName;
  return `${shortName} (${code})`;
}

export function buildAirportAnswerTitle(input: AirportAnswerSeoInput): string {
  const searchName = buildAirportSearchName(input);
  const calculatorLabel = /airport/i.test(searchName) ? "Free Calculator" : "Free Airport Calculator";
  return `When Should I Leave for ${searchName}? ${calculatorLabel}`;
}

export function buildAirportAnswerDescription(input: AirportAnswerSeoInput): string {
  const searchName = buildAirportSearchName(input);
  return `Calculate exactly when to leave for ${searchName}. This free calculator uses your flight, starting point, traffic, security, baggage and parking to give you a specific leave time.`;
}

export function buildAirportSnippetCandidate(input: AirportAnswerSeoInput): string {
  const searchName = buildAirportSearchName(input);
  return `Enter your flight and starting point. This free calculator uses traffic, security, bags, parking and terminal access to give you a specific leave time for ${searchName}.`;
}

export function buildAirportAnswerApplicationName(input: AirportAnswerSeoInput): string {
  return buildAirportAnswerTitle(input);
}
