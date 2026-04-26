# Supabase

This folder holds the database schema for the petition backend.

## Setup

1. Create a project at https://supabase.com (Free tier is fine to start).
2. **Project Settings → API** — copy:
   - `URL` → `SUPABASE_URL`
   - `anon` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY` *(server-only, never expose to the browser)*
3. **SQL Editor** → paste [`migrations/0001_init.sql`](migrations/0001_init.sql) → Run.
4. Add the keys to `petition-site/.env.local`:
   ```
   SUPABASE_URL=...
   SUPABASE_SERVICE_ROLE_KEY=...
   NEXT_PUBLIC_SUPABASE_URL=...           # same as SUPABASE_URL
   NEXT_PUBLIC_SUPABASE_ANON_KEY=...
   RESEND_API_KEY=...                     # for notification emails
   RESEND_FROM=StandUp <noreply@your-domain>
   IP_HASH_PEPPER=long-random-string       # min 32 chars
   ```

## Schema at a glance

| Table | Purpose |
|---|---|
| `signatures` | One row per signatory. Email is `citext` (case-insensitive unique). |

| View / RPC | Purpose |
|---|---|
| `get_signature_count()` | Public counter. SECURITY DEFINER; anon can call. |
| `get_public_comments(limit)` | Anonymised first-name + city + comment feed for the landing page. |

### RLS

- Base tables: **RLS on, no policies for anon** → only the server (service-role) writes/reads.
- Views/RPCs above are the only public read surface. Email is **never** exposed.

### Privacy

- Email is hashed before any logging.
- IP is stored as `sha256(ip + daily_salt)` for rate-limit only — never the raw IP.
- A user can request deletion: server runs `delete from signatures where email = $1`.

## CLI alternative

If you use the Supabase CLI:

```pwsh
supabase init
supabase link --project-ref <your-ref>
supabase db push
```
