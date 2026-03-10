import { NextRequest, NextResponse } from "next/server";

/// Server-side proxy to Google Maps Distance Matrix API.
///
/// ## Purpose
/// Keeps the GOOGLE_MAPS_API_KEY server-only — never exposed to the browser.
/// Called by the airport calculator client component.
///
/// ## Include
/// - Distance Matrix API call with traffic-aware routing
/// - Input validation and error normalization
///
/// ## Don't Include
/// - Auth logic
/// - Caching (handled by Next.js fetch or edge layer if needed later)
///
/// ## Lifecycle & Usage
/// GET /api/travel-time?origin=...&destination=...&departureTime=...
/// Returns { durationMinutes: number, hasTrafficData: boolean }

interface DistanceMatrixElement {
  status: string;
  duration?: { value: number; text: string };
  duration_in_traffic?: { value: number; text: string };
  distance?: { value: number; text: string };
}

interface DistanceMatrixResponse {
  status: string;
  rows?: { elements: DistanceMatrixElement[] }[];
  error_message?: string;
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const origin = searchParams.get("origin")?.trim();
  const destination = searchParams.get("destination")?.trim();
  const departureTime = searchParams.get("departureTime"); // Unix timestamp string

  if (!origin || !destination) {
    return NextResponse.json(
      { error: "Missing required params: origin, destination" },
      { status: 400 }
    );
  }

  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    console.error("[travel-time] GOOGLE_MAPS_API_KEY not set");
    return NextResponse.json(
      { error: "Travel time service not configured" },
      { status: 503 }
    );
  }

  const params = new URLSearchParams({
    origins: origin,
    destinations: destination,
    mode: "driving",
    key: apiKey,
  });

  // Use departure_time for traffic-aware routing when provided.
  // Must be a future Unix timestamp; "now" also accepted by the API.
  if (departureTime) {
    params.set("departure_time", departureTime);
  }

  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?${params}`;

  let data: DistanceMatrixResponse;
  try {
    const res = await fetch(url, { next: { revalidate: 0 } }); // never cache — traffic data is live
    data = await res.json();
  } catch (err) {
    console.error("[travel-time] fetch failed:", err);
    return NextResponse.json(
      { error: "Failed to reach Maps API" },
      { status: 502 }
    );
  }

  if (data.status !== "OK") {
    console.error("[travel-time] Maps API status:", data.status, data.error_message);
    return NextResponse.json(
      { error: "Maps API error", details: data.status },
      { status: 502 }
    );
  }

  const element = data.rows?.[0]?.elements?.[0];
  if (!element || element.status !== "OK") {
    return NextResponse.json(
      { error: "Route not found between origin and destination" },
      { status: 404 }
    );
  }

  // Prefer traffic-aware duration when available (requires future departure_time)
  const durationSeconds =
    element.duration_in_traffic?.value ?? element.duration?.value ?? 0;
  const durationMinutes = Math.ceil(durationSeconds / 60);
  const hasTrafficData = !!element.duration_in_traffic;

  return NextResponse.json({ durationMinutes, hasTrafficData });
}
