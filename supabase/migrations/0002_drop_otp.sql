-- Migration 0002: remove OTP-based verification.
-- The petition flow now records signatures immediately on submit, with bot
-- protection via Cloudflare Turnstile + honeypot + rate limiting + disposable
-- email blocking + time-on-form check.
--
-- Run in Supabase SQL editor.

-- Drop the OTP table (and its FK back to signatures).
drop table if exists public.otp_codes cascade;

-- (Optional) backfill: any signatures left as verified=false from the OTP era
-- can be either purged or marked verified. We purge — those users never
-- completed the flow and shouldn't be counted.
delete from public.signatures where verified = false;
