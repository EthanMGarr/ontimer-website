export type TravelTimeErrorCode = "invalid_location" | "service_unavailable";

export interface TravelTimeErrorPayload {
  error?: string;
  code?: TravelTimeErrorCode;
}

export class TravelTimeRequestError extends Error {
  readonly code: TravelTimeErrorCode;

  constructor(message: string, code: TravelTimeErrorCode = "service_unavailable") {
    super(message);
    this.name = "TravelTimeRequestError";
    this.code = code;
  }
}

export function travelTimeErrorCodeFromMessage(message: string): TravelTimeErrorCode {
  return /no routes?|no route|invalid argument|not found|zero results/i.test(message)
    ? "invalid_location"
    : "service_unavailable";
}

export async function readTravelTimeResponse<T>(response: Response): Promise<T> {
  const body = await response.json() as T & TravelTimeErrorPayload;
  if (!response.ok) {
    throw new TravelTimeRequestError(
      body.error ?? `Travel time request failed (${response.status})`,
      body.code ?? "service_unavailable"
    );
  }
  return body;
}

export function isInvalidTravelTimeLocation(error: unknown): boolean {
  return error instanceof TravelTimeRequestError && error.code === "invalid_location";
}

export function invalidAddressMessage(locale: "en" | "es" = "en"): string {
  return locale === "es" ? "Introduce una dirección válida." : "Enter a valid address.";
}
