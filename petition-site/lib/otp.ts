import crypto from 'node:crypto';

const PEPPER = process.env.OTP_PEPPER || 'dev-only-pepper-change-me';

export function generateOtp(): string {
  // 6-digit numeric, leading zeros preserved.
  const n = crypto.randomInt(0, 1_000_000);
  return n.toString().padStart(6, '0');
}

export function hashOtp(code: string): string {
  return crypto.createHash('sha256').update(code + PEPPER).digest('hex');
}

export function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a, 'hex');
  const bb = Buffer.from(b, 'hex');
  if (ab.length !== bb.length) return false;
  return crypto.timingSafeEqual(ab, bb);
}

export function hashIp(ip: string): string {
  // Daily salt: rotates 00:00 UTC, so cross-day correlation is impossible.
  const daySalt = new Date().toISOString().slice(0, 10) + (process.env.OTP_PEPPER || '');
  return crypto.createHash('sha256').update(ip + daySalt).digest('hex');
}
