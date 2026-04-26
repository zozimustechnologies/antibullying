-- Migration 0004:
--   * add comment_public flag so signers can opt their comment out of the wall
--   * expose a signature_number (rank by created_at asc) in get_public_comments

alter table public.signatures
  add column if not exists comment_public boolean not null default true;

-- View no longer used by the app; keep it in sync for ad-hoc queries.
drop view if exists public.public_comments;
create or replace view public.public_comments as
  select
    split_part(name, ' ', 1) as first_name,
    comment,
    created_at
  from public.signatures
  where verified = true
    and comment is not null
    and char_length(trim(comment)) > 0
    and comment_public = true
  order by created_at desc;

drop function if exists public.get_public_comments(int);

create or replace function public.get_public_comments(limit_count int default 50)
returns table (
  signature_number int,
  first_name text,
  comment text,
  created_at timestamptz
)
language sql
security definer
set search_path = public
as $$
  with ranked as (
    select
      id,
      name,
      comment,
      comment_public,
      created_at,
      row_number() over (order by created_at asc) as signature_number
    from public.signatures
    where verified = true
  )
  select
    signature_number::int,
    split_part(name, ' ', 1) as first_name,
    comment,
    created_at
  from ranked
  where comment is not null
    and char_length(trim(comment)) > 0
    and comment_public = true
  order by created_at desc
  limit greatest(1, least(limit_count, 200));
$$;

revoke all on function public.get_public_comments(int) from public;
grant execute on function public.get_public_comments(int) to anon, authenticated;
