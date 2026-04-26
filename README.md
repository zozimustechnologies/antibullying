# StandUp — Anti-Bullying Toolkit

Edge/Chrome extension + petition site campaigning to make **anti-bullying a national law in India**, not just a non-binding guideline.

> Started by a 13-year-old who has been bullied for the last 2–3 years and decided that waiting until he was an adult to fix this was too long for the next kid.

🌐 **Live site:** https://zozimustechnologies.github.io/antibullying/
🎯 **Goal:** 100,000 verified signatures to Parliament
📜 **The seven asks:** [`petition-site/content/seven-asks.json`](petition-site/content/seven-asks.json)

---

## Why a law, not a guideline

India's current framework (CBSE 2015 guidelines, UGC 2012 anti-ragging regs, POCSO/IT Act fragments) is advisory for schools and reactive for cyberbullying. Norway (§9A), Japan (2013 Bullying Prevention Act), South Korea, and the UK all moved from guidance to statute and saw measurable drops in incidence + faster school response. We want the same — written down, enforceable, with an independent escalation route.

Full comparative research: [`docs/`](docs/) and the extension's `/world` page.

---

## Repo

| Folder | What it is |
|---|---|
| [`extension/`](extension/) | Edge/Chrome MV3 extension. 7-question self-quiz → motivational close → petition link. Side panel with country comparison + helplines + founder's story. |
| [`petition-site/`](petition-site/) | Next.js 14 App Router petition site. OTP-verified signing, live counter, public comments, 7 asks. |
| [`supabase/`](supabase/) | Postgres schema (`signatures`, `otp_codes`) + RLS + SECURITY DEFINER RPCs. |
| [`docs/`](docs/) | Country-law research, interview transcripts, **safeguards for the minor founder**. |
| [`.github/workflows/`](.github/workflows/) | GitHub Pages deploy + gitleaks PII scan. |
| [`PLAN.md`](PLAN.md) | Full project plan — read this first. |

---

## Tech stack

**Extension** — Manifest V3, Vite 5 + React 18 + TypeScript 5 + Tailwind 3 via `@crxjs/vite-plugin`. Permissions: `storage`, `sidePanel` only. No host permissions, no content scripts.

**Petition site** — Next.js 14 (App Router) + Tailwind + TypeScript. Dual-mode build: dynamic on Vercel/Node, static export on GitHub Pages (`GITHUB_PAGES=true`).

**Backend** — Supabase Postgres with row-level security. Email OTP via Resend (SHA-256 hashed + 32-char pepper, 15-min TTL, 5-attempt cap, constant-time compare). In-memory rate limiter (Upstash-ready).

---

## Getting started

```pwsh
# Extension
cd extension
npm install
npm run dev          # then in Edge: edge://extensions → "Load unpacked" → extension/dist

# Petition site
cd petition-site
npm install
cp .env.example .env.local   # fill in Supabase + Resend keys (see below)
npm run dev                  # http://localhost:3000
```

### Backend setup (one-time)

1. Create a Supabase project, run [`supabase/migrations/0001_init.sql`](supabase/migrations/0001_init.sql) in the SQL editor.
2. Create a Resend account, verify a sending domain, generate an API key.
3. Fill in `petition-site/.env.local` with `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `RESEND_API_KEY`, `RESEND_FROM`, `OTP_PEPPER`.

Full walkthrough: [`supabase/README.md`](supabase/README.md) and [`petition-site/README.md`](petition-site/README.md).

> **Dev fallback:** without `RESEND_API_KEY` set, OTPs print to the server console instead of emailing — handy for local testing.

---

## Deploy

- **GitHub Pages** (static, no backend) — push to `main` and the [pages workflow](.github/workflows/pages.yml) builds + publishes. Without `NEXT_PUBLIC_SIGN_ENDPOINT` set, the form queues signatures in `localStorage`.
- **Vercel / Node host** (full backend) — set the env vars above, deploy. API routes use `runtime: 'nodejs'`, `dynamic: 'force-dynamic'`.
- **Edge add-on store** — extension is store-ready; pending listing.

---

## Founder safeguards

The founder is a **minor still being bullied**. Before you contribute, read [`docs/safeguards/minor-founder-protocol.md`](docs/safeguards/minor-founder-protocol.md). The non-negotiables:

- Never name the founder, his school, or anyone involved in the bullying — anywhere, ever.
- The founder's story (`petition-site/content/founders-story.json`, `extension/src/data/founders-story.json`, `petition-site/components/FoundersStory.tsx`) ships with `published: false` and stays gated until guardian + clinician + legal sign-off.
- Founder-touching files are `CODEOWNERS`-protected and scanned by [gitleaks](.gitleaks.toml) on every push.
- Takedown drill: any PII leak → file removed within 1 hour, force-purged from history within 24.

---

## Contributing

Issues + PRs welcome. Before opening a PR:

1. Read [`PLAN.md`](PLAN.md) and [`docs/safeguards/minor-founder-protocol.md`](docs/safeguards/minor-founder-protocol.md).
2. `npm run build` passes in both `extension/` and `petition-site/`.
3. No founder PII, no real signature data, no API keys in commits.

---

## License

- **Code:** MIT — see [`LICENSE`](LICENSE)
- **Written content** (story, interviews, country cards, the 7 asks): **CC BY-NC 4.0**

