-- Migration 0005:
--   Show anonymous placeholder for signers who opted out of public comments.
--   They still get their signature # on the Voices wall.

drop function if exists public.get_public_comments(int);

create or replace function public.get_public_comments(limit_count int default 50)
returns table (
  signature_number int,
  first_name text,
  comment text,
  is_anonymous boolean,
  created_at timestamptz
)
language sql
security definer
set search_path = public
as $$
  with ranked as (
    select id, name, comment, comment_public, created_at,
           row_number() over (order by created_at asc) as signature_number
    from public.signatures
    where verified = true
  )
  select
    signature_number::int,
    case when comment_public then split_part(name, ' ', 1) else null end,
    case when comment_public then comment else null end,
    not comment_public as is_anonymous,
    created_at
  from ranked
  where comment_public = true
     or (comment_public = false)
  order by created_at desc
  limit greatest(1, least(limit_count, 200));
$$;

revoke all on function public.get_public_comments(int) from public;
grant execute on function public.get_public_comments(int) to anon, authenticated;
