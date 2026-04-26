-- Migration 0003: add country to signatures.
-- Defaults to 'India' for backfill (the petition is for an Indian law) but
-- accepts diaspora supporters from anywhere.

alter table public.signatures
  add column if not exists country text not null default 'India'
    check (char_length(country) between 1 and 80);

-- Update the public_comments view + RPC to include country.
drop view if exists public.public_comments;

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

drop function if exists public.get_public_comments(int);

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
