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
- `/sign` — petition form (name, email, city, state, age, consent) → OTP → confirm
- `/about` — why a law, not a guideline
- `/world` — country comparison (sources `extension/src/data/countries.json`)
- `/founder` — the 13-year-old founder's story (gated by `content/founders-story.json` `published` flag)
- `/privacy` — DPDP-Act-aligned privacy policy
- `/api/count` — current verified signature count
- `/api/sign/start` — accept signature, send OTP (stub)
- `/api/sign/verify` — verify OTP, mark verified (stub)

## Backend (Supabase + Resend)

The API routes (`/api/sign/start`, `/api/sign/verify`, `/api/count`, `/api/comments`) are wired to Supabase Postgres with hashed-OTP email verification via Resend.

### One-time setup

1. Create a Supabase project, run [`../supabase/migrations/0001_init.sql`](../supabase/migrations/0001_init.sql) in the SQL editor. See [`../supabase/README.md`](../supabase/README.md) for the full walkthrough.
2. Create a Resend account, verify a sending domain, generate an API key.
3. Copy `.env.example` → `.env.local` and fill in:

   | Var | Notes |
   |---|---|
   | `SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY` | Server-side only — bypasses RLS. |
   | `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public, reads via SECURITY DEFINER RPCs only. |
   | `RESEND_API_KEY` / `RESEND_FROM` | Sending account + verified `From:` address. |
   | `OTP_PEPPER` | 32+ random chars. **Rotate = invalidates all in-flight OTPs.** |

### Dev fallback

If `RESEND_API_KEY` is unset, `/api/sign/start` logs the OTP to the server console instead of emailing it — handy for local testing without a Resend account.

### Still TODO for production

- reCAPTCHA v3 on `/api/sign/start` (env vars in `.env.example`).
- Swap in-memory rate limiter for Upstash Redis (env vars in `.env.example`).

## Deploy to GitHub Pages

The repo includes [`/.github/workflows/pages.yml`](../.github/workflows/pages.yml). Pushing to `main` builds a static export and publishes to:

**https://zozimustechnologies.github.io/antibullying/**

Setup once in GitHub:
1. **Settings → Pages → Build and deployment → Source:** GitHub Actions.
2. (Optional) Add a repo variable / secret `NEXT_PUBLIC_SIGN_ENDPOINT` pointing to a serverless function (Cloudflare Worker, Vercel Function, AWS Lambda) that handles real signature collection + OTP. Without it, the static site queues signatures in `localStorage` and shows the success screen — useful for early visitors but not a real backend.

The workflow:
- Sets `GITHUB_PAGES=true` so `next.config.mjs` switches to `output: 'export'` with `basePath: '/antibullying'`.
- Strips `app/api/sign/`, `app/api/count/`, `app/api/comments/` (dynamic routes can't be statically exported).
- Uploads `petition-site/out/` as the Pages artifact.

## Founder's story

`content/founders-story.json` ships with `published: false`. Same gate as the extension.
See [`../docs/safeguards/minor-founder-protocol.md`](../docs/safeguards/minor-founder-protocol.md).
