import { NextResponse } from 'next/server';
import { isSupabaseConfigured, supabaseAdmin } from '@/lib/supabase';
import { generateOtp, hashOtp, hashIp } from '@/lib/otp';
import { sendOtpEmail } from '@/lib/email';
import { clientIp, rateLimit } from '@/lib/ratelimit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const OTP_TTL_MIN = 15;

type Payload = {
  name?: string;
  email?: string;
  city?: string;
  state?: string;
  age?: string | number;
  guardianConsent?: string | boolean;
  comment?: string;
  consent?: string | boolean;
};

export async function POST(req: Request) {
  // ---- Rate limit (per IP, 5 / 10 min) -----------------------------------
  const ip = clientIp(req);
  const rl = rateLimit(`sign-start:${ip}`, { max: 5, windowMs: 10 * 60 * 1000 });
  if (!rl.ok) {
    return NextResponse.json(
      { error: 'Too many attempts. Please try again later.' },
      { status: 429, headers: { 'retry-after': String(Math.ceil(rl.retryAfterMs / 1000)) } }
    );
  }

  // ---- Validate ----------------------------------------------------------
  const body = (await req.json().catch(() => null)) as Payload | null;
  if (!body) return bad('Invalid JSON body.');

  const name = str(body.name, 1, 120);
  const email = str(body.email, 3, 254)?.toLowerCase();
  const city = str(body.city, 1, 80);
  const state = str(body.state, 1, 80);
  const ageNum = Number(body.age);
  const guardianConsent = isTrue(body.guardianConsent);
  const consent = isTrue(body.consent);
  const comment = body.comment ? str(body.comment, 1, 1000) ?? null : null;

  if (!name) return bad('Name is required.');
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return bad('A valid email is required.');
  if (!city) return bad('City is required.');
  if (!state) return bad('State is required.');
  if (!Number.isFinite(ageNum) || ageNum < 5 || ageNum > 120) return bad('Age must be between 5 and 120.');
  if (!consent) return bad('Consent is required.');
  if (ageNum < 18 && !guardianConsent) return bad('Under-18 signatories need a guardian to confirm consent.');

  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: 'Backend is not configured yet. Please try again later.' },
      { status: 503 }
    );
  }

  const sb = supabaseAdmin();
  const ipHash = hashIp(ip);
  const userAgent = (req.headers.get('user-agent') || '').slice(0, 500);

  // ---- Upsert signature row (verified=false) -----------------------------
  const { data: existing } = await sb
    .from('signatures')
    .select('id, verified')
    .eq('email', email)
    .maybeSingle();

  let signatureId: string;
  if (existing?.verified) {
    // Already signed. Don't reveal that fact; just succeed.
    return NextResponse.json({ ok: true });
  }

  if (existing) {
    signatureId = existing.id;
    await sb
      .from('signatures')
      .update({
        name, city, state, age: ageNum,
        guardian_consent: guardianConsent,
        comment, consent,
        ip_hash: ipHash, user_agent: userAgent,
      })
      .eq('id', signatureId);
  } else {
    const { data, error } = await sb
      .from('signatures')
      .insert({
        name, email, city, state, age: ageNum,
        guardian_consent: guardianConsent,
        comment, consent, verified: false,
        ip_hash: ipHash, user_agent: userAgent,
      })
      .select('id')
      .single();
    if (error || !data) {
      console.error('signature insert failed', error);
      return NextResponse.json({ error: 'Could not record signature.' }, { status: 500 });
    }
    signatureId = data.id;
  }

  // ---- Issue an OTP -------------------------------------------------------
  const code = generateOtp();
  const codeHash = hashOtp(code);
  const expiresAt = new Date(Date.now() + OTP_TTL_MIN * 60 * 1000).toISOString();

  await sb
    .from('otp_codes')
    .update({ consumed_at: new Date().toISOString() })
    .eq('signature_id', signatureId)
    .is('consumed_at', null);

  const { error: otpErr } = await sb.from('otp_codes').insert({
    signature_id: signatureId,
    code_hash: codeHash,
    expires_at: expiresAt,
  });
  if (otpErr) {
    console.error('otp insert failed', otpErr);
    return NextResponse.json({ error: 'Could not issue verification code.' }, { status: 500 });
  }

  const sent = await sendOtpEmail({ to: email, name, code });
  if (!sent.ok) {
    console.error('email send failed', sent.error);
  }

  return NextResponse.json({ ok: true, signatureId });
}

function str(v: unknown, min: number, max: number): string | null {
  if (typeof v !== 'string') return null;
  const t = v.trim();
  if (t.length < min || t.length > max) return null;
  return t;
}
function isTrue(v: unknown): boolean {
  return v === true || v === 'true' || v === 'yes' || v === 'on';
}
function bad(message: string) {
  return NextResponse.json({ error: message }, { status: 400 });
}
