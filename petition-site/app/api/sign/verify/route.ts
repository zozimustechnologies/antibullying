import { NextResponse } from 'next/server';
import { isSupabaseConfigured, supabaseAdmin } from '@/lib/supabase';
import { hashOtp, safeEqual } from '@/lib/otp';
import { clientIp, rateLimit } from '@/lib/ratelimit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_ATTEMPTS = 5;

export async function POST(req: Request) {
  const ip = clientIp(req);
  const rl = rateLimit(`sign-verify:${ip}`, { max: 10, windowMs: 10 * 60 * 1000 });
  if (!rl.ok) {
    return NextResponse.json({ error: 'Too many attempts. Please try again later.' }, { status: 429 });
  }

  const body = (await req.json().catch(() => null)) as
    | { code?: string; signatureId?: string; email?: string }
    | null;
  if (!body) return bad('Invalid JSON body.');
  const code = typeof body.code === 'string' ? body.code.trim() : '';
  if (!/^\d{6}$/.test(code)) return bad('Enter the 6-digit code.');

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: 'Backend not configured.' }, { status: 503 });
  }

  const sb = supabaseAdmin();

  let signatureId: string | null = body.signatureId ?? null;
  if (!signatureId && body.email) {
    const { data } = await sb
      .from('signatures')
      .select('id')
      .eq('email', body.email.toLowerCase())
      .maybeSingle();
    signatureId = data?.id ?? null;
  }
  if (!signatureId) return bad('We could not find a pending signature for that code.');

  const { data: otp, error } = await sb
    .from('otp_codes')
    .select('id, code_hash, attempts, consumed_at, expires_at')
    .eq('signature_id', signatureId)
    .is('consumed_at', null)
    .gt('expires_at', new Date().toISOString())
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error || !otp) return bad('That code has expired. Please request a new one.');
  if (otp.attempts >= MAX_ATTEMPTS) {
    await sb.from('otp_codes').update({ consumed_at: new Date().toISOString() }).eq('id', otp.id);
    return bad('Too many wrong attempts. Please request a new code.');
  }

  const ok = safeEqual(otp.code_hash, hashOtp(code));
  if (!ok) {
    await sb.from('otp_codes').update({ attempts: otp.attempts + 1 }).eq('id', otp.id);
    return bad('That code did not match. Try again.');
  }

  const nowIso = new Date().toISOString();
  await sb.from('otp_codes').update({ consumed_at: nowIso }).eq('id', otp.id);
  const { error: updErr } = await sb
    .from('signatures')
    .update({ verified: true, verified_at: nowIso })
    .eq('id', signatureId);
  if (updErr) {
    console.error('signature verify update failed', updErr);
    return NextResponse.json({ error: 'Could not finalise your signature.' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

function bad(message: string) {
  return NextResponse.json({ error: message }, { status: 400 });
}
