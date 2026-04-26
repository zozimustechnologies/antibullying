-- Petition database schema
-- Run in Supabase SQL editor (or `supabase db push` with the CLI).
-- Order matters: extensions → tables → indexes → RLS → policies → views/functions.

create extension if not exists "pgcrypto";
create extension if not exists "citext";

-- ---------------------------------------------------------------------------
-- signatures
-- One row per (verified) signature. Email is stored as citext for case-
-- insensitive dedupe, and never exposed via the public API surface.
-- ---------------------------------------------------------------------------
create table if not exists public.signatures (
  id              uuid          primary key default gen_random_uuid(),
  name            text          not null check (char_length(name) between 1 and 120),
  email           citext        not null unique,
  city            text          not null check (char_length(city) between 1 and 80),
  state           text          not null check (char_length(state) between 1 and 80),
  country         text          not null default 'India' check (char_length(country) between 1 and 80),
  age             smallint      not null check (age between 5 and 120),
  guardian_consent boolean      not null default false,
  comment         text          check (comment is null or char_length(comment) <= 1000),
  consent         boolean       not null default false,
  verified        boolean       not null default false,
  verified_at     timestamptz,
  ip_hash         text,                       -- sha256(ip + daily salt) for rate-limit only
  user_agent      text,
  created_at      timestamptz   not null default now()
);

create index if not exists signatures_verified_idx on public.signatures (verified) where verified;
create index if not exists signatures_created_idx  on public.signatures (created_at desc);

-- ---------------------------------------------------------------------------
-- otp_codes
-- Short-lived 6-digit codes for verifying email ownership.
-- ---------------------------------------------------------------------------
create table if not exists public.otp_codes (
  id              uuid          primary key default gen_random_uuid(),
  signature_id    uuid          not null references public.signatures(id) on delete cascade,
  code_hash       text          not null,        -- sha256 of the 6-digit code
  expires_at      timestamptz   not null,
  attempts        smallint      not null default 0,
  consumed_at     timestamptz,
  created_at      timestamptz   not null default now()
);

create index if not exists otp_codes_sig_idx on public.otp_codes (signature_id, expires_at desc);

-- ---------------------------------------------------------------------------
-- public_count: a safe view exposing only what the front-end needs.
-- ---------------------------------------------------------------------------
create or replace view public.signature_count as
  select count(*)::int as count
  from public.signatures
  where verified = true;

-- ---------------------------------------------------------------------------
-- public_comments: anonymised feed for the petition page.
-- Only first name + city, plus the comment, of verified signatures.
-- ---------------------------------------------------------------------------
create or replace view public.public_comments as
  select
    split_part(name, ' ', 1)            as first_name,
    city,
    state,
    country,
    comment,
    created_at
  from public.signatures
  where verified = true
    and comment is not null
    and char_length(trim(comment)) > 0
  order by created_at desc;

-- ---------------------------------------------------------------------------
-- Row-Level Security
-- The anon key (used by the browser, if ever) gets ZERO direct table access.
-- All writes must go through the service-role key on the server (API routes).
-- The two views above are exposed read-only to anon for the public counter
-- and comment feed.
-- ---------------------------------------------------------------------------
alter table public.signatures enable row level security;
alter table public.otp_codes  enable row level security;

-- No policies = no anon access to the base tables. Service role bypasses RLS.

-- Allow anon to read the aggregate views (Postgres views inherit RLS from base
-- tables; we expose a SECURITY DEFINER function instead so callers don't need
-- direct table access).
create or replace function public.get_signature_count()
returns int
language sql
security definer
set search_path = public
as $$
  select count(*)::int from public.signatures where verified = true;
$$;

revoke all on function public.get_signature_count() from public;
grant execute on function public.get_signature_count() to anon, authenticated;

create or replace function public.get_public_comments(limit_count int default 50)
returns table (first_name text, city text, state text, country text, comment text, created_at timestamptz)
language sql
security definer
set search_path = public
as $$
  select split_part(name, ' ', 1), city, state, country, comment, created_at
  from public.signatures
  where verified = true and comment is not null and char_length(trim(comment)) > 0
  order by created_at desc
  limit greatest(1, least(limit_count, 200));
$$;

revoke all on function public.get_public_comments(int) from public;
grant execute on function public.get_public_comments(int) to anon, authenticated;
