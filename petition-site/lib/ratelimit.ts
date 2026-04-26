// Tiny in-memory rate limiter. Replace with Upstash Redis in production
// (multi-instance deploys must use a shared store).

import { createHash } from 'node:crypto';

const buckets = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(
  key: string,
  opts: { max: number; windowMs: number }
): { ok: true } | { ok: false; retryAfterMs: number } {
  const now = Date.now();
  const b = buckets.get(key);
  if (!b || now >= b.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + opts.windowMs });
    return { ok: true };
  }
  if (b.count >= opts.max) {
    return { ok: false, retryAfterMs: b.resetAt - now };
  }
  b.count += 1;
  return { ok: true };
}

export function clientIp(req: Request): string {
  const fwd = req.headers.get('x-forwarded-for');
  if (fwd) return fwd.split(',')[0].trim();
  const real = req.headers.get('x-real-ip');
  if (real) return real;
  return 'unknown';
}

// Daily-rotating salt hash for IPs. Lets us rate-limit and detect abuse
// without storing real addresses.
export function hashIp(ip: string): string {
  const day = new Date().toISOString().slice(0, 10);
  const pepper = process.env.IP_HASH_PEPPER || 'dev-pepper-please-change';
  return createHash('sha256').update(`${ip}:${day}:${pepper}`).digest('hex');
}
