export interface AirportAnswerSeoInput {
  shortName: string;
  code: string;
  name: string;
}

export function buildAirportAnswerTitle({ shortName, code }: AirportAnswerSeoInput): string {
  return `When Should I Leave for ${shortName} (${code})?`;
}

export function buildAirportAnswerDescription({ name }: AirportAnswerSeoInput): string {
  return `Find out what time to leave for ${name}. Enter your flight time and starting point for an answer that accounts for travel, security, bags, parking and terminal access.`;
}

export function buildAirportAnswerApplicationName({ shortName, code }: AirportAnswerSeoInput): string {
  return `When to Leave for ${shortName} (${code})`;
}
