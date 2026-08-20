export interface AirportAnswerSeoInput {
  shortName: string;
  code: string;
  name: string;
}

export function buildAirportAnswerTitle({ shortName, code }: AirportAnswerSeoInput): string {
  return `When Should I Leave for ${shortName} (${code})?`;
}

export function buildAirportAnswerDescription({ name }: AirportAnswerSeoInput): string {
  return `Calculate what time to leave for ${name} based on your flight time, starting point, travel, security, bags, parking and terminal access.`;
}

export function buildAirportSnippetCandidate({ name, code }: AirportAnswerSeoInput): string {
  return `Calculate when to leave for ${name} (${code}) based on your flight time, starting location, traffic-aware travel, security, bags, parking and terminal access—not a generic rule of thumb.`;
}

export function buildAirportAnswerApplicationName({ shortName, code }: AirportAnswerSeoInput): string {
  return `When to Leave for ${shortName} (${code})`;
}
