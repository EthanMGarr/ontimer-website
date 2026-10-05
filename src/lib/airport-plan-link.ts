/// Versioned, privacy-limited airport-plan links for calendar handoff.
///
/// ## Purpose
/// - Serialize the non-personal inputs needed to recalculate an airport plan.
/// - Parse supported versions without trusting unknown or malformed values.
/// - Keep the website and iOS app on one stable query-string contract.
///
/// ## Don't Include
/// - Origins, addresses, or coordinates
/// - Pickup relationships
/// - Trusted-traveler settings
/// - Manual travel, security, or buffer overrides

export const AIRPORT_PLAN_LINK_VERSION = "1";

const siteOrigin = "https://www.ontimer.app";
const departurePath = "/airport-time-to-leave-calculator";
const spanishDeparturePath = "/es/calculadora-cuando-salir-al-aeropuerto";
const pickupPath = "/airport-pickup-time-calculator";

export type AirportPlanFlightType = "domestic" | "international";
export type AirportPlanArrivalMode = "parking" | "rideshare" | "dropoff" | "transit";
export type AirportPlanMeetMode = "inside" | "curb";

interface AirportIdentity {
  airportCode?: string;
  airportName?: string;
}

export interface DepartureAirportPlanLinkInput extends AirportIdentity {
  kind: "departure";
  departureAt: Date;
  flightType: AirportPlanFlightType;
  checkedBag: boolean;
  arrivalMode: AirportPlanArrivalMode;
  locale?: "en" | "es";
}

export interface PickupAirportPlanLinkInput extends AirportIdentity {
  kind: "pickup";
  landingAt: Date;
  flightType: AirportPlanFlightType;
  checkedBag: boolean;
  meetMode: AirportPlanMeetMode;
}

export type AirportPlanLinkInput = DepartureAirportPlanLinkInput | PickupAirportPlanLinkInput;

export interface ParsedDepartureAirportPlan extends AirportIdentity {
  kind: "departure";
  departureAt?: Date;
  flightType?: AirportPlanFlightType;
  checkedBag?: boolean;
  arrivalMode?: AirportPlanArrivalMode;
}

export interface ParsedPickupAirportPlan extends AirportIdentity {
  kind: "pickup";
  landingAt?: Date;
  flightType?: AirportPlanFlightType;
  checkedBag?: boolean;
  meetMode?: AirportPlanMeetMode;
}

export type ParsedAirportPlan = ParsedDepartureAirportPlan | ParsedPickupAirportPlan;

function formatUtcSeconds(date: Date): string {
  if (Number.isNaN(date.getTime())) throw new TypeError("Airport plan time must be valid");
  return date.toISOString().replace(/\.\d{3}Z$/, "Z");
}

function setAirportIdentity(params: URLSearchParams, input: AirportIdentity): void {
  const code = input.airportCode?.trim().toUpperCase();
  if (code && /^[A-Z]{3}$/.test(code)) {
    params.set("a", code);
    return;
  }

  const name = input.airportName?.trim();
  if (name) params.set("an", name);
}

/** Builds the canonical v1 website URL consumed by the OnTimer iOS app. */
export function buildAirportPlanLink(input: AirportPlanLinkInput): string {
  const path = input.kind === "departure"
    ? input.locale === "es" ? spanishDeparturePath : departurePath
    : pickupPath;
  const url = new URL(path, siteOrigin);
  url.searchParams.set("v", AIRPORT_PLAN_LINK_VERSION);
  url.searchParams.set("k", input.kind === "departure" ? "dep" : "pick");
  setAirportIdentity(url.searchParams, input);

  if (input.kind === "departure") {
    url.searchParams.set("dep", formatUtcSeconds(input.departureAt));
    url.searchParams.set("ft", input.flightType === "domestic" ? "dom" : "intl");
    url.searchParams.set("bag", input.checkedBag ? "1" : "0");
    url.searchParams.set("m", input.arrivalMode);
  } else {
    url.searchParams.set("land", formatUtcSeconds(input.landingAt));
    url.searchParams.set("ft", input.flightType === "domestic" ? "dom" : "intl");
    url.searchParams.set("bag", input.checkedBag ? "1" : "0");
    url.searchParams.set("meet", input.meetMode);
  }

  return url.toString();
}

function parseUtcSeconds(value: string | null): Date | undefined {
  if (!value || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/.test(value)) return undefined;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

function parseAirportIdentity(params: URLSearchParams): AirportIdentity {
  const code = params.get("a")?.trim().toUpperCase();
  if (code && /^[A-Z]{3}$/.test(code)) return { airportCode: code };

  const name = params.get("an")?.trim();
  return name ? { airportName: name.slice(0, 120) } : {};
}

/** Parses recognized v1 values and silently drops invalid or unknown fields. */
export function parseAirportPlanLink(
  input: string | URL | URLSearchParams,
): ParsedAirportPlan | null {
  let params: URLSearchParams;
  try {
    params = input instanceof URLSearchParams
      ? input
      : input instanceof URL
        ? input.searchParams
        : new URL(input, siteOrigin).searchParams;
  } catch {
    return null;
  }

  if (params.get("v") !== AIRPORT_PLAN_LINK_VERSION) return null;
  const kind = params.get("k");
  if (kind !== "dep" && kind !== "pick") return null;

  const identity = parseAirportIdentity(params);
  const flightType = params.get("ft") === "dom"
    ? "domestic"
    : params.get("ft") === "intl" ? "international" : undefined;
  const checkedBag = params.get("bag") === "0"
    ? false
    : params.get("bag") === "1" ? true : undefined;

  if (kind === "dep") {
    const departureAt = parseUtcSeconds(params.get("dep"));
    const mode = params.get("m");
    const arrivalMode = mode === "parking" || mode === "rideshare" || mode === "dropoff" || mode === "transit"
      ? mode
      : undefined;
    return {
      kind: "departure",
      ...identity,
      ...(departureAt ? { departureAt } : {}),
      ...(flightType ? { flightType } : {}),
      ...(checkedBag !== undefined ? { checkedBag } : {}),
      ...(arrivalMode ? { arrivalMode } : {}),
    };
  }

  const landingAt = parseUtcSeconds(params.get("land"));
  const meet = params.get("meet");
  const meetMode = meet === "inside" || meet === "curb" ? meet : undefined;
  return {
    kind: "pickup",
    ...identity,
    ...(landingAt ? { landingAt } : {}),
    ...(flightType ? { flightType } : {}),
    ...(checkedBag !== undefined ? { checkedBag } : {}),
    ...(meetMode ? { meetMode } : {}),
  };
}
