import { NextResponse } from 'next/server';
import { isSupabaseConfigured, supabaseAdmin } from '@/lib/supabase';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const TARGET = 100_000;

export async function GET() {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { count: 0, target: TARGET, configured: false },
      { headers: { 'Cache-Control': 'no-store' } },
    );
  }
  const sb = supabaseAdmin();
  // Direct count is more reliable than scalar RPC across Supabase JS versions.
  const { count, error } = await sb
    .from('signatures')
    .select('id', { count: 'exact', head: true })
    .eq('verified', true);
  if (error) {
    console.error('count query failed', error);
    return NextResponse.json(
      { count: 0, target: TARGET, configured: true, error: 'query' },
      { headers: { 'Cache-Control': 'no-store' } },
    );
  }
  return NextResponse.json(
    { count: count ?? 0, target: TARGET, configured: true },
    { headers: { 'Cache-Control': 'no-store' } },
  );
}
