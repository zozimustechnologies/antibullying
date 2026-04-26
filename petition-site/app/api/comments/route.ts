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
  // Strip any unexpected fields — only first name, signature #, comment, anonymous flag, timestamp.
  const items = (data ?? []).map(
    (r: { signature_number?: number; first_name: string | null; comment: string | null; is_anonymous?: boolean; created_at: string }) => ({
      signature_number: r.signature_number ?? null,
      first_name: r.first_name,
      comment: r.comment,
      is_anonymous: r.is_anonymous ?? false,
      created_at: r.created_at,
    }),
  );
  return NextResponse.json({ items });
}
