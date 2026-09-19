export interface CruiseAnswerSeoInput {
  name: string;
  shortName: string;
}

export function buildCruiseAnswerTitle({ shortName }: CruiseAnswerSeoInput): string {
  return `When Should I Leave for ${shortName}? Free Cruise Calculator`;
}

export function buildCruiseSnippetDescription({ shortName }: CruiseAnswerSeoInput): string {
  return `Calculate exactly when to leave for ${shortName}. This free cruise calculator uses your boarding time, starting point, traffic, parking, luggage and terminal access.`;
}

export function buildCruiseSnippetCandidate({ shortName }: CruiseAnswerSeoInput): string {
  return `Enter your boarding time and starting point. This free calculator uses traffic, parking, luggage, check-in and terminal access to give you a specific leave time for ${shortName}.`;
}
