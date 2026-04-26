import { NextResponse } from 'next/server';
import { isSupabaseConfigured, supabaseAdmin } from '@/lib/supabase';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 60;

export async function GET(req: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ items: [], configured: false });
  }
  const url = new URL(req.url);
  const limit = Math.min(200, Math.max(1, Number(url.searchParams.get('limit')) || 50));
  const sb = supabaseAdmin();
  const { data, error } = await sb.rpc('get_public_comments', { limit_count: limit });
  if (error) {
    console.error('comments rpc failed', error);
    return NextResponse.json({ items: [], error: 'rpc' });
  }
  // Strip location fields — only first name + comment + timestamp are public.
  const items = (data ?? []).map((r: { first_name: string; comment: string; created_at: string }) => ({
    first_name: r.first_name,
    comment: r.comment,
    created_at: r.created_at,
  }));
  return NextResponse.json({ items });
}
