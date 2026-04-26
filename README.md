# StandUp — Anti-Bullying Toolkit

Edge/Chrome extension + petition site campaigning to make **anti-bullying a national law in India**, not just a non-binding guideline.

> Started by a 13-year-old who has been bullied for the last 2–3 years and decided that waiting until he was an adult to fix this was too long for the next kid.

## Goal

Reach **100,000 verified petition signatures** to submit to Parliament.

## Repo

| Folder | What it is |
|---|---|
| [`extension/`](extension/) | Edge/Chrome MV3 extension. 7-question quiz + comparative law module + helplines + founder's story. |
| [`petition-site/`](petition-site/) | Next.js petition site with OTP verification + live signature counter. |
| [`supabase/`](supabase/) | Database schema and setup notes for the petition backend. |
| [`docs/`](docs/) | Country-law research, interview transcripts, **safeguards for the minor founder**. |
| [`PLAN.md`](PLAN.md) | Full project plan — read this first. |

## Getting started

```pwsh
# Extension
cd extension
npm install
npm run dev          # then in Edge: edge://extensions → "Load unpacked" → extension/dist

# Petition site
cd petition-site
npm install
npm run dev          # http://localhost:3000
```

## Founder safeguards

The founder is a **minor**. Before you contribute, read [`docs/safeguards/minor-founder-protocol.md`](docs/safeguards/minor-founder-protocol.md). Anything touching the founder's story is gated behind `published: false` and CODEOWNERS review.

## License

- Code: MIT — see [`LICENSE`](LICENSE)
- Written content (story, interviews, country cards): **CC BY-NC 4.0**

