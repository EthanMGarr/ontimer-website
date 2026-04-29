import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  let body: { endpoint: string; apiKey: string; params?: Record<string, string> };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const { endpoint, apiKey, params } = body;
  if (!endpoint || !apiKey) {
    return NextResponse.json({ error: 'Missing endpoint or apiKey' }, { status: 400 });
  }

  const url = new URL(`https://api.revenuecat.com/v2/${endpoint}`);
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      url.searchParams.set(k, v);
    }
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    const upstream = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'X-Platform': 'web',
      },
      signal: controller.signal,
    });

    clearTimeout(timeout);
    const data = await upstream.json();

    if (!upstream.ok) {
      return NextResponse.json({ error: data, status: upstream.status }, { status: upstream.status });
    }

    return NextResponse.json(data);
  } catch (err: unknown) {
    clearTimeout(timeout);
    if (err instanceof Error && err.name === 'AbortError') {
      return NextResponse.json({ error: 'Request timed out' }, { status: 504 });
    }
    return NextResponse.json({ error: 'Proxy fetch failed' }, { status: 502 });
  }
}
