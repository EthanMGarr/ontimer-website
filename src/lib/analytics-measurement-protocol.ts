type AnalyticsParams = Record<string, string | number>;

const EVENT_NAME_PATTERN = /^[a-z][a-z0-9_]{0,39}$/;
const PARAM_NAME_PATTERN = /^[a-z][a-z0-9_]{0,39}$/;
const MAX_STRING_VALUE_LENGTH = 100;
// Reserve two of GA4's 25 event-parameter slots for the relay's
// engagement_time_msec and transport_source fields.
const MAX_CLIENT_EVENT_PARAMS = 23;

export interface FirstPartyAnalyticsEvent {
  event_name: string;
  client_id: string;
  params: AnalyticsParams;
}

export interface MeasurementProtocolPayload {
  client_id: string;
  events: Array<{
    name: string;
    params: AnalyticsParams;
  }>;
}

function sanitizedValue(value: string | number): string | number | null {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : null;
  }
  return value.slice(0, MAX_STRING_VALUE_LENGTH);
}

export function sanitizeAnalyticsParams(params: unknown): AnalyticsParams {
  if (!params || typeof params !== "object" || Array.isArray(params)) return {};

  const sanitized: AnalyticsParams = {};
  for (const [key, value] of Object.entries(params)) {
    if (Object.keys(sanitized).length >= MAX_CLIENT_EVENT_PARAMS) break;
    if (!PARAM_NAME_PATTERN.test(key)) continue;
    if (typeof value !== "string" && typeof value !== "number") continue;
    const nextValue = sanitizedValue(value);
    if (nextValue !== null) sanitized[key] = nextValue;
  }
  return sanitized;
}

export function parseFirstPartyAnalyticsEvent(value: unknown): FirstPartyAnalyticsEvent | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const candidate = value as Record<string, unknown>;
  if (typeof candidate.event_name !== "string" || !EVENT_NAME_PATTERN.test(candidate.event_name)) {
    return null;
  }
  if (typeof candidate.client_id !== "string" || candidate.client_id.length < 8 || candidate.client_id.length > 128) {
    return null;
  }

  return {
    event_name: candidate.event_name,
    client_id: candidate.client_id,
    params: sanitizeAnalyticsParams(candidate.params),
  };
}

export function measurementProtocolPayload(
  event: FirstPartyAnalyticsEvent,
): MeasurementProtocolPayload {
  const sessionId = event.params.session_id;
  return {
    client_id: event.client_id,
    events: [{
      name: event.event_name,
      params: {
        ...event.params,
        session_id: typeof sessionId === "number" ? sessionId : Date.now(),
        engagement_time_msec: 1,
        transport_source: "first_party",
      },
    }],
  };
}
