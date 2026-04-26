import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const TARGET = 100_000;

export async function GET() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    return NextResponse.json(
      { count: 0, target: TARGET, configured: false },
      { headers: { 'Cache-Control': 'no-store' } },
    );
  }
  try {
    // Direct PostgREST call — no client caching, no connection pooling.
    const res = await fetch(`${url}/rest/v1/rpc/get_signature_count`, {
      method: 'POST',
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });
    const data = await res.json();
    // The RPC returns a bare integer.
    const count = typeof data === 'number' ? data : 0;
    return NextResponse.json(
      { count, target: TARGET, configured: true },
      { headers: { 'Cache-Control': 'no-store' } },
    );
  } catch (err) {
    console.error('count query failed', err);
    return NextResponse.json(
      { count: 0, target: TARGET, configured: true, error: 'query' },
      { headers: { 'Cache-Control': 'no-store' } },
    );
  }
}
