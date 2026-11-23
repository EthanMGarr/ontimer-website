type AnalyticsParams = Record<string, string | number>;

const EVENT_NAME_PATTERN = /^[a-z][a-z0-9_]{0,39}$/;
const PARAM_NAME_PATTERN = /^[a-z][a-z0-9_]{0,39}$/;
const MAX_STRING_VALUE_LENGTH = 100;
const MAX_EVENTS_PER_REQUEST = 10;
// Reserve one of GA4's 25 event-parameter slots for the transport marker.
const MAX_CLIENT_EVENT_PARAMS = 24;

export interface FirstPartyAnalyticsEvent {
  event_name: string;
  client_id: string;
  params: AnalyticsParams;
}

export interface MeasurementProtocolPayload {
  client_id: string;
  user_agent?: string;
  events: Array<{
    name: string;
    params: AnalyticsParams;
  }>;
}

function validClientId(value: unknown): value is string {
  return typeof value === "string" && /^\d{1,20}\.\d{1,20}$/.test(value);
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
  if (!validClientId(candidate.client_id)) {
    return null;
  }

  const params = sanitizeAnalyticsParams(candidate.params);
  if (
    !Number.isSafeInteger(params.session_id) ||
    Number(params.session_id) <= 0 ||
    !Number.isSafeInteger(params.engagement_time_msec) ||
    Number(params.engagement_time_msec) <= 0
  ) {
    return null;
  }

  return {
    event_name: candidate.event_name,
    client_id: candidate.client_id,
    params,
  };
}

/**
 * Dormant safety contract for a future genuine server-side supplement. The
 * public browser relay is retired; any future caller must supply native GA
 * identity plus measured session engagement instead of generated substitutes.
 */
export function parseFirstPartyAnalyticsEvents(value: unknown): FirstPartyAnalyticsEvent[] | null {
  const single = parseFirstPartyAnalyticsEvent(value);
  if (single) return [single];
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;

  const candidate = value as Record<string, unknown>;
  if (!validClientId(candidate.client_id) || !Array.isArray(candidate.events)) return null;
  if (candidate.events.length < 1 || candidate.events.length > MAX_EVENTS_PER_REQUEST) return null;

  const events = candidate.events.map((event) => parseFirstPartyAnalyticsEvent({
    ...(event && typeof event === "object" && !Array.isArray(event) ? event : {}),
    client_id: candidate.client_id,
  }));
  return events.every((event): event is FirstPartyAnalyticsEvent => event !== null)
    ? events
    : null;
}

export function measurementProtocolPayload(
  event: FirstPartyAnalyticsEvent,
  userAgent?: string | null,
): MeasurementProtocolPayload {
  return {
    client_id: event.client_id,
    ...(userAgent ? { user_agent: userAgent.slice(0, 512) } : {}),
    events: [{
      name: event.event_name,
      params: {
        ...event.params,
        transport_source: "server_supplement",
      },
    }],
  };
}

export function measurementProtocolBatchPayload(
  events: FirstPartyAnalyticsEvent[],
  userAgent?: string | null,
): MeasurementProtocolPayload {
  const [first] = events;
  if (!first) throw new Error("At least one analytics event is required");
  return {
    client_id: first.client_id,
    ...(userAgent ? { user_agent: userAgent.slice(0, 512) } : {}),
    events: events.map((event) => {
      return {
        name: event.event_name,
        params: {
          ...event.params,
          transport_source: "server_supplement",
        },
      };
    }),
  };
}
