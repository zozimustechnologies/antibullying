# Minor-Founder Safeguards Protocol

The founder of this project is a **13-year-old child** who has been bullied for 2–3 years and is still in school. This document is the operating manual for protecting him while the campaign runs. It is **mandatory reading** for anyone with commit access.

If anything in this document conflicts with another doc, **this document wins.**

---

## 1. Identity disclosure — default is anonymous

Three permitted modes. Pick one per surface (extension / petition site / press) and record it below.

| Mode | What's shown |
|---|---|
| **Anonymous (default)** | First name OR pseudonym only. No school, no city, no photo, no voice. |
| **First name + city** | Illustrated avatar; no school. |
| **Fully named** | Only with written guardian consent + legal counsel sign-off. |

Current mode: **Anonymous** until changed in writing by the guardian.

## 2. Consent ledger

Before publishing anything in the founder's voice or about the founder:

- [ ] Guardian written consent on file (per format: text / audio / video).
- [ ] Child's age-appropriate assent recorded.
- [ ] Date, format, surface (extension / site / press), and content hash logged in `docs/safeguards/consent-ledger.md` (private; never commit real names).

## 3. Hard nevers

- ❌ **Never name the bullies.** Defamation + retaliation risk.
- ❌ **Never name the school or teachers.**
- ❌ **No graphic detail** of incidents. Reference impact, not choreography.
- ❌ **No imagery of the child in distress.**
- ❌ **No live, unmoderated interviews.** Pre-recorded, edited, adult present.
- ❌ **No personal data of the child** in commits, issues, PRs, or analytics.

## 4. Publishing gate

The founder's story is gated by a single flag:

```jsonc
// extension/src/data/founders-story.json
// petition-site/content/founders-story.mdx (frontmatter)
{ "published": false }
```

While `published: false`, the UI shows: *"His story is being written — with care."*

Flipping to `true` requires:
1. Guardian sign-off (consent ledger entry).
2. Child psychologist content review (linked review note).
3. Legal review if the school is identifiable by inference.
4. PR approved by the CODEOWNER for `FoundersStory.tsx`.

## 5. Takedown drill (target: under 1 hour)

If the guardian or child requests removal:

1. Open a PR titled `takedown: founder story` that sets `published: false` in:
   - `extension/src/data/founders-story.json`
   - `petition-site/content/founders-story.mdx` frontmatter
2. Merge with admin-override (bypass normal review SLA).
3. Trigger the `release-extension` and `deploy-petition` workflows.
4. Confirm:
   - Petition-site page returns the placeholder within 5 min of deploy.
   - Extension store update submitted same day; in-app remote-config flag (if added later) flipped immediately.
5. Log incident in `docs/safeguards/takedown-log.md` (private).

## 6. Press protocol

- All media requests → `press@zozimustechnologies.example` (designated adult).
- Interviews are **pre-recorded, edited, and reviewed** before publication.
- The child does not appear live. He may pre-record short statements with the guardian present.
- Adult spokesperson handles Q&A about strategy, partnerships, signature counts.

## 7. Incident response — if the founder is targeted online

1. Screenshot, do not engage.
2. Report to platform; preserve evidence.
3. If credible threat: file complaint with local police + Cyber Crime Cell; invoke POCSO if applicable.
4. Temporarily switch identity mode to **anonymous** across all surfaces.
5. Notify the guardian; assess whether to pause the campaign for a cooling period.

## 8. Repo hygiene

- `.gitleaks.toml` runs in CI on every PR — see `.gitleaks.toml`.
- The actual PII strings live OUT of the repo (in a private CI secret) and are injected into the gitleaks config at runtime.
- Issue template auto-redirects identity-related reports to a private email.
- Public Discussions stay disabled until a moderation policy is in place.

## 9. License of the founder's story

The story is licensed CC BY-NC 4.0. This means: anyone may share/quote with attribution and **non-commercially**. Commercial use (books, films, paid media) requires explicit guardian permission. This is a deliberate brake on exploitation.

---

*Maintainer: designated adult guardian-mentor. Reviewed quarterly.*
