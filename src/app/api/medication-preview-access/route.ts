import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const expectedUsername = process.env.MEDICATION_PREVIEW_USERNAME;
  const expectedPassword = process.env.MEDICATION_PREVIEW_PASSWORD;
  if (!expectedUsername || !expectedPassword) {
    return NextResponse.json({ error: "Private preview access is not configured." }, { status: 503 });
  }

  const body = await request.json().catch(() => null) as { password?: unknown } | null;
  if (typeof body?.password !== "string" || body.password !== expectedPassword) {
    return NextResponse.json({ error: "That password is not correct." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set("ontimer_medication_preview", btoa(`${expectedUsername}:${expectedPassword}`), {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
  });
  return response;
}
