# StandUp — Petition Site

Next.js 14 (App Router) + Tailwind. Deploy to Vercel.

## Develop

```pwsh
cd petition-site
npm install
npm run dev
```

http://localhost:3000

## Pages

- `/` — landing + signature counter
- `/sign` — petition form (name, email, city, state, age, consent, optional comment)
- `/about` — why a law, not a guideline
- `/world` — country comparison (sources `extension/src/data/countries.json`)
- `/founder` — the 13-year-old founder's story (gated by `content/founders-story.json` `published` flag)
- `/privacy` — DPDP-Act-aligned privacy policy
- `/api/count` — current signature count
- `/api/comments` — anonymised public comments feed
- `/api/sign` — single-step signature submission (POST)

## Backend (Supabase)

`/api/sign`, `/api/count`, and `/api/comments` are wired to Supabase Postgres. Signatures are recorded immediately on submit — no OTP step. Bot abuse is blocked by a layered defense:

1. **Cloudflare Turnstile** — invisible challenge, free, unlimited.
2. **Honeypot field** — hidden `website` input bots fill, humans don't.
3. **Time-on-form check** — submissions <3 sec are silently dropped.
4. **IP rate limit** — 5 signatures per IP per 10 min (in-memory; swap for Upstash in prod).
5. **Disposable-email blocklist** — `mailinator.com`, `tempmail.com`, etc. rejected.
6. **DB unique email constraint** — one signature per email.

### One-time setup

1. Create a Supabase project, run [`../supabase/migrations/0001_init.sql`](../supabase/migrations/0001_init.sql) (and `0002_drop_otp.sql` if upgrading) in the SQL editor. See [`../supabase/README.md`](../supabase/README.md).
2. Get a Cloudflare Turnstile site/secret key (free) at https://dash.cloudflare.com/?to=/:account/turnstile.
3. Copy `.env.example` → `.env.local` and fill in:

   | Var | Notes |
   |---|---|
   | `SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY` | Server-side only — bypasses RLS. |
   | `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public, reads via SECURITY DEFINER RPCs only. |
   | `NEXT_PUBLIC_TURNSTILE_SITE_KEY` / `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile keys. |
   | `OTP_PEPPER` | 32+ random chars. Used for daily-rotating IP hashes. |

### Dev fallback

If `TURNSTILE_SECRET_KEY` is unset, the server logs a warning and skips the challenge — handy for local testing without a Cloudflare account. **Always set it in production.**

### Still TODO for production

- Swap in-memory rate limiter for Upstash Redis (env vars in `.env.example`).
- Wire an email provider (AWS SES / Brevo) for petition update broadcasts.

## Deploy to GitHub Pages

The repo includes [`/.github/workflows/pages.yml`](../.github/workflows/pages.yml). Pushing to `main` builds a static export and publishes to:

**https://zozimustechnologies.github.io/antibullying/**

Setup once in GitHub:
1. **Settings → Pages → Build and deployment → Source:** GitHub Actions.
2. (Optional) Add a repo variable / secret `NEXT_PUBLIC_SIGN_ENDPOINT` pointing to a serverless function (Cloudflare Worker, Vercel Function, AWS Lambda) that exposes the `/api/sign` POST. Without it, the static site queues signatures in `localStorage` and shows the success screen — useful for early visitors but not a real backend.

The workflow:
- Sets `GITHUB_PAGES=true` so `next.config.mjs` switches to `output: 'export'` with `basePath: '/antibullying'`.
- Strips `app/api/sign/`, `app/api/count/`, `app/api/comments/` (dynamic routes can't be statically exported).
- Uploads `petition-site/out/` as the Pages artifact.

## Founder's story

`content/founders-story.json` ships with `published: false`. Same gate as the extension.
See [`../docs/safeguards/minor-founder-protocol.md`](../docs/safeguards/minor-founder-protocol.md).
