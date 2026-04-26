// Cloudflare Turnstile verification.
// If TURNSTILE_SECRET_KEY isn't set we skip verification (dev mode).
// Get a free key at https://dash.cloudflare.com/?to=/:account/turnstile

export async function verifyTurnstile(
  token: string | undefined,
  remoteIp?: string,
): Promise<{ ok: true } | { ok: false; reason: string }> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    // Dev mode — skip verification, but log so we know.
    console.warn('[turnstile] TURNSTILE_SECRET_KEY not set; skipping verification');
    return { ok: true };
  }
  if (!token) return { ok: false, reason: 'missing-token' };

  try {
    const params = new URLSearchParams();
    params.set('secret', secret);
    params.set('response', token);
    if (remoteIp) params.set('remoteip', remoteIp);

    const res = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      { method: 'POST', body: params },
    );
    const data = (await res.json()) as { success: boolean; 'error-codes'?: string[] };
    if (data.success) return { ok: true };
    return { ok: false, reason: (data['error-codes'] || ['failed']).join(',') };
  } catch (err) {
    console.error('[turnstile] verify failed', err);
    return { ok: false, reason: 'network-error' };
  }
}
