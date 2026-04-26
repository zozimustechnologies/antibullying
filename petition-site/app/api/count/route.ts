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
  const { data, error } = await sb.rpc('get_signature_count');
  if (error) {
    console.error('count rpc failed', error);
    return NextResponse.json(
      { count: 0, target: TARGET, configured: true, error: 'rpc' },
      { headers: { 'Cache-Control': 'no-store' } },
    );
  }
  return NextResponse.json(
    { count: Number(data) || 0, target: TARGET, configured: true },
    { headers: { 'Cache-Control': 'no-store' } },
  );
}
