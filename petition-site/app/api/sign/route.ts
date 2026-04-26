import { NextResponse } from 'next/server';
import { isSupabaseConfigured, supabaseAdmin } from '@/lib/supabase';
import { clientIp, hashIp, rateLimit } from '@/lib/ratelimit';
import { isDisposableEmail } from '@/lib/disposable-emails';
import { verifyTurnstile } from '@/lib/turnstile';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Minimum seconds a real human spends on the form before submitting.
// Bots fill instantly. 3s is generous — most humans take 20–60s.
const MIN_FORM_TIME_MS = 3_000;

type Payload = {
  name?: string;
  email?: string;
  city?: string;
  state?: string;
  age?: string | number;
  guardianConsent?: string | boolean;
  comment?: string;
  consent?: string | boolean;
  // Anti-bot fields
  website?: string; // honeypot — must be empty
  formStartedAt?: number | string; // ms since epoch when form was rendered
  turnstileToken?: string;
};

export async function POST(req: Request) {
  // ---- Rate limit (per IP) -----------------------------------------------
  const ip = clientIp(req);
  const rl = rateLimit(`sign:${ip}`, { max: 5, windowMs: 10 * 60 * 1000 });
  if (!rl.ok) {
    return NextResponse.json(
      { error: 'Too many submissions from this network. Please try again later.' },
      { status: 429, headers: { 'retry-after': String(Math.ceil(rl.retryAfterMs / 1000)) } },
    );
  }

  const body = (await req.json().catch(() => null)) as Payload | null;
  if (!body) return bad('Invalid request.');

  // ---- Honeypot ----------------------------------------------------------
  if (typeof body.website === 'string' && body.website.trim().length > 0) {
    // Pretend success so bots don't learn they were caught.
    console.warn('[sign] honeypot triggered', { ip: hashIp(ip).slice(0, 8) });
    return NextResponse.json({ ok: true });
  }

  // ---- Time on form ------------------------------------------------------
  const startedAt = Number(body.formStartedAt);
  if (Number.isFinite(startedAt) && Date.now() - startedAt < MIN_FORM_TIME_MS) {
    console.warn('[sign] too-fast submission', { ip: hashIp(ip).slice(0, 8) });
    // Same silent pass — let attackers waste time.
    return NextResponse.json({ ok: true });
  }

  // ---- Turnstile (optional in dev) ---------------------------------------
  const ts = await verifyTurnstile(body.turnstileToken, ip);
  if (!ts.ok) {
    return NextResponse.json(
      { error: 'Could not verify you are human. Please refresh and try again.' },
      { status: 400 },
    );
  }

  // ---- Validate ----------------------------------------------------------
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
  if (isDisposableEmail(email)) return bad('Please use a real email address (not a disposable one).');
  if (!city) return bad('City is required.');
  if (!state) return bad('State is required.');
  if (!Number.isFinite(ageNum) || ageNum < 5 || ageNum > 120) return bad('Age must be between 5 and 120.');
  if (!consent) return bad('Consent is required.');
  if (ageNum < 18 && !guardianConsent) return bad('Under-18 signatories need a guardian to confirm consent.');

  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: 'Backend is not configured yet. Please try again later.' },
      { status: 503 },
    );
  }

  const sb = supabaseAdmin();
  const ipHash = hashIp(ip);
  const userAgent = (req.headers.get('user-agent') || '').slice(0, 500);
  const nowIso = new Date().toISOString();

  // ---- Upsert signature: counted immediately (verified=true) -------------
  const { data: existing } = await sb
    .from('signatures')
    .select('id, verified')
    .eq('email', email)
    .maybeSingle();

  if (existing?.verified) {
    // Already signed — silent success.
    return NextResponse.json({ ok: true, alreadySigned: true });
  }

  if (existing) {
    const { error } = await sb
      .from('signatures')
      .update({
        name, city, state, age: ageNum,
        guardian_consent: guardianConsent,
        comment, consent,
        verified: true, verified_at: nowIso,
        ip_hash: ipHash, user_agent: userAgent,
      })
      .eq('id', existing.id);
    if (error) {
      console.error('signature update failed', error);
      return NextResponse.json({ error: 'Could not record signature.' }, { status: 500 });
    }
  } else {
    const { error } = await sb.from('signatures').insert({
      name, email, city, state, age: ageNum,
      guardian_consent: guardianConsent,
      comment, consent,
      verified: true, verified_at: nowIso,
      ip_hash: ipHash, user_agent: userAgent,
    });
    if (error) {
      console.error('signature insert failed', error);
      return NextResponse.json({ error: 'Could not record signature.' }, { status: 500 });
    }
  }

  return NextResponse.json({ ok: true });
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
