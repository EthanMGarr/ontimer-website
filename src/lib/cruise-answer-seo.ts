export interface CruiseAnswerSeoInput {
  name: string;
}

export function buildCruiseSnippetDescription({ name }: CruiseAnswerSeoInput): string {
  return `Calculate when to leave for ${name} based on your boarding time, starting location, traffic, parking, terminal access, luggage drop and cruise check-in.`;
}

export function buildCruiseSnippetCandidate({ name }: CruiseAnswerSeoInput): string {
  return `Calculate when to leave for ${name} based on your boarding time, starting location, traffic-aware travel, parking, terminal access, luggage drop and cruise check-in—not a generic rule of thumb.`;
}
