export interface AirportAnswerSeoInput {
  shortName: string;
  code: string;
  name: string;
}

export function buildAirportSearchName({ shortName, code }: AirportAnswerSeoInput): string {
  const codeSuffix = new RegExp(`\\s*\\(${code}\\)\\s*$`, "i");
  return `${shortName.replace(codeSuffix, "").trim()} (${code})`;
}

export function buildAirportDepartureHeading(input: AirportAnswerSeoInput): string {
  return `Find out exactly when to leave for ${buildAirportSearchName(input)}`;
}

export function buildAirportPickupHeading(input: AirportAnswerSeoInput): string {
  return `Find out exactly when to leave for a pickup at ${buildAirportSearchName(input)}`;
}

export function buildAirportAnswerTitle(input: AirportAnswerSeoInput): string {
  return `${buildAirportDepartureHeading(input)} — Free Calculator`;
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
  return buildAirportDepartureHeading(input);
}
