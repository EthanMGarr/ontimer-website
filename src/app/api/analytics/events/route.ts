/**
 * Retired on 2026-11-18. A 410 intentionally makes older cached browser bundles
 * use their built-in gtag fallback instead of creating synthetic GA4 sessions.
 */
export async function POST() {
  return Response.json(
    { error: "analytics_relay_retired" },
    {
      status: 410,
      headers: { "Cache-Control": "no-store" },
    },
  );
}
