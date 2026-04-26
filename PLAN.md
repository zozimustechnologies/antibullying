# Anti-Bullying Edge Extension — Project Plan

## 1. Vision & Goals

Build a Microsoft Edge browser extension that turns passive web browsing moments into active learning about bullying, then channels users into a petition drive to make **anti-bullying a standalone law in India** (rather than a non-binding guideline under the Right to Education Act / CBSE/NCPCR advisories).

### Primary Objectives
1. **Awareness** — Educate users on what bullying is (and isn't) via short interactive quizzes.
2. **Advocacy** — Drive users to a petition; target **100,000 verified signatures** to submit to Parliament.
3. **Comparison** — Surface how anti-bullying law works in Norway, Sweden, USA, UK, Japan, South Korea, Australia, etc.
4. **Amplification** — Host an interview/story library to humanize the cause.

### Success Metrics
| Metric | Target (12 months) |
|---|---|
| Extension installs | 50,000 |
| Quiz completions | 200,000 |
| Petition signatures | 100,000 |
| Press / media mentions | 25 |
| Interviews published | 50+ |

---

## 2. Why an Extension (and the Edge Add-ons Policy Problem)

Edge Add-ons (and Chrome Web Store) **reject extensions whose sole purpose is to open a website**. The extension must deliver standalone, in-browser value. Our solution:

- The **core experience runs inside the extension popup / side panel** — no redirect required to use it.
- The petition link appears **only after the user completes a quiz**, as a contextual call-to-action, not as the product itself.
- Bonus utility features (see §6) make the extension genuinely useful day-to-day.

---

## 3. Core User Flow

```
Install extension
   │
   ▼
Open popup / pinned icon
   │
   ▼
Home screen: "Do you know bullying when you see it?"
   │
   ├─► Take the 7-question quiz  ──► Score + per-question explanation
   │                                       │
   │                                       ▼
   │                              "Help change the law" CTA
   │                                       │
   │                                       ▼
   │                              Petition page (external)
   │
   ├─► Learn: Bullying laws around the world
   ├─► Stories & Interviews
   ├─► Report / Get Help (India helplines)
   └─► Daily tip (notification)
```

---

## 4. Quiz Design (7 Questions)

The quiz is the **emotional and educational core** of the extension. It has three jobs:
1. Make the user **realise they probably don't know what bullying actually is.**
2. **Surprise them** with how India compares to the rest of the world.
3. Move them from "interesting" to "I have to do something" — so the petition CTA at the end feels inevitable, not promotional.

### Format
- Each question = **one scenario or one fact** + 3–4 answer choices.
- After the user picks, an **answer card** opens with:
  - ✅ The correct answer
  - 🧠 **Why** — the underlying definition (Olweus: repetition, intent, power imbalance) or the missing nuance (bullying vs. teasing vs. conflict vs. banter).
  - 🌍 **Around the world** — what Norway / Sweden / USA / Japan / South Korea / UK do.
  - 🇮🇳 **In India today** — almost always: *"There is no national anti-bullying law. Schools are guided, not bound."*
  - 💔 **Impact stat** — one number, one sentence (e.g., "1 in 3 Indian school children report being bullied — UNESCO 2019").

### The 7 Questions (designed to surprise, not to trick)

**Q1. "What is bullying?" — the definition gap**
Pick the option that is **NOT** bullying:
- A) A classmate calls another classmate "mota" every single day for months.
- B) Two friends of the same group tease each other and both laugh.
- C) A senior repeatedly takes a junior's lunch money.
- D) A group of students systematically ignore one girl for an entire term.

→ Correct: **B**. *Mutual, consensual teasing between equals is not bullying. Bullying needs **repetition + intent to harm + a power imbalance.** Most Indian parents and even many teachers cannot name these three ingredients — which is why so much of it goes unaddressed.*

**Q2. Bullying vs. Teasing vs. Banter — the line nobody draws**
A boy is called "chakka" by the same group every PE class. He laughs along because he's scared. Is this:
- A) Just teasing — he's laughing.
- B) Banter — boys will be boys.
- C) Bullying.
- D) Only bullying if he complains.

→ Correct: **C**. *A victim laughing is one of the most common survival responses. The test is not the victim's reaction — it is **whether the target has the power to make it stop.** "Boys will be boys" is the single most damaging phrase in Indian parenting.*

**Q3. The scale shock — how big is this really?**
How many school students in India report being bullied at least once a month?
- A) About 1 in 20
- B) About 1 in 10
- C) About 1 in 4
- D) About 1 in 3

→ Correct: **D** (UNESCO *Behind the Numbers*, 2019, South Asia data). *Now the surprising part: an estimated **over 70% of bullying incidents in Indian schools are never reported** — to teachers, parents, or anyone. Children stay silent because they believe nothing will happen. They are usually right.*

**Q4. The law gap — the question most people get wrong**
Which of these countries has **NO standalone national anti-bullying law**?
- A) Norway
- B) Sweden
- C) Japan
- D) India

→ Correct: **D**. *Surprised? Most people assume India must have one — we have laws for ragging in colleges (UGC, 2009) and POCSO for sexual offences, but **school bullying itself has no binding national statute.** What we have are **CBSE circulars and NCPCR guidelines** — advisory, unenforceable, and easy for schools to ignore.*
Compare:
- 🇳🇴 **Norway** — Education Act §9A: every child has a *legal right* to a safe school. Schools that fail are fined.
- 🇸🇪 **Sweden** — schools must publish an anti-bullying plan every year, by law.
- 🇯🇵 **Japan** — 2013 Act passed after a student's suicide; mandates school committees.
- 🇰🇷 **South Korea** — School Violence Prevention Act; a permanent record on the bully's school file.
- 🇺🇸 **USA** — all 50 states have anti-bullying statutes.
- 🇮🇳 **India** — guidelines.

**Q5. "Should I step in?" — the parent's dilemma**
Your 12-year-old comes home quiet for the third week in a row. You learn a group at school keeps mocking her accent. She begs you not to talk to the school. The *best* first step is:
- A) Respect her wishes; let her handle it — kids must learn resilience.
- B) Go straight to the principal tomorrow.
- C) Listen, validate, document incidents with dates, and *together* decide when to escalate — but do not stay silent.
- D) Tell her to hit back once so they stop.

→ Correct: **C**. *"Let them handle it" is advice built for **conflict between equals** — not for bullying, where the power imbalance means the child cannot resolve it alone. Indian parents are often torn between "don't be soft" and "don't be a complainer." Both extremes fail the child. **Documentation matters** — without a law, your written record is often the only leverage you'll have with a school.*

**Q6. What it actually does to a child — the impact question**
Children who are bullied for prolonged periods are, compared to peers, more likely to experience (pick all that apply — and notice how long the list is):
- A) Clinical depression and anxiety into adulthood
- B) 2–9× higher risk of suicidal ideation (Yale, meta-analyses)
- C) Lower academic performance and school dropout
- D) Chronic physical symptoms — sleep loss, headaches, weakened immunity
- E) Difficulty forming trusting relationships, even decades later

→ Correct: **All of them.** *Bullying is not a "phase." It rewires a developing brain's threat-response system. The trauma outlives the bully, the school, and often the silence around it. **In countries with anti-bullying laws, child suicide rates linked to school violence have measurably dropped** (e.g., South Korea post-2012 reforms).*

**Q7. The cyber question — where Indian law is most silent**
A 14-year-old's morphed photo is circulated on an Instagram group by classmates. Under **current Indian law**, the school is legally required to:
- A) Investigate within 48 hours and report to police.
- B) Suspend the students involved.
- C) Provide mandatory counselling to the victim.
- D) **Nothing specific — there is no binding national rule.** Action depends on the school's own policy.

→ Correct: **D**. *IT Act sections and POCSO can sometimes be invoked **after** harm is done, but there is **no preventive, school-level legal duty.** Compare with the UK's *Education and Inspections Act 2006* which places a statutory duty on head teachers to prevent bullying — including online — among pupils.*

### Scoring & Tone
- We do **not** shame wrong answers. Every wrong answer ends with: *"You're not alone — most people get this wrong. That's exactly why this needs to change."*
- Final score screen leads directly into §4a (the emotional close).

---

## 4a. After the Quiz — The Emotional Close

The score screen is **not** the end. It opens straight into a slow, scrollable sequence we internally call **"The Weight."** No quiz score, no badges, no celebration. Just truth, paced one screen at a time, with soft typography and a single line of text per screen.

### The Sequence (each screen = one beat)

**Screen 1 — Acknowledgement**
> *"You just answered 7 questions about bullying.
> Most people in India have never been asked even one."*

**Screen 2 — The silent scale**
> *"1 in 3 Indian school children are bullied.
> More than 70% of them never tell anyone.
> That is roughly **80 million children carrying it alone.**"*
> Sources: UNESCO, NCERT studies — cited inline.

**Screen 3 — The parent who didn't know**
> *"Somewhere tonight, a parent will tell their child:
> 'Just ignore them.'
> 'Don't be so sensitive.'
> 'Handle it yourself.'
>
> They are not bad parents.
> They were never taught the difference between
> a fight a child can win — and one they cannot."*

**Screen 4 — What it does**
> *"Children who are bullied for years are far more likely
> to live with anxiety, depression, and sleeplessness
> long after school ends.
> The bully often forgets by next semester.
> The child rarely does."*
> *(A heavier-stat version, including suicide-risk research, is available behind a 'Show me the hard numbers' tap — never auto-shown, never shown to under-16 readers by default.)*

**Screen 5 — What India has**
> *"Norway has a law.
> Sweden has a law.
> Japan has a law.
> South Korea has a law.
> The UK has a law. The US has 50 of them.
>
> India has **a guideline.**
> A school can follow it. Or not.
> Most don't."*

**Screen 6 — The cost of silence**
> *"Every year this stays a 'guideline,'
> another generation of children learns
> that adults will not protect them.
>
> That is the lesson they carry into adulthood.
> That is the lesson that becomes the next generation of bullies."*

**Screen 7 — A founder's note (link to §4b)**
> *"This extension was started by a 13-year-old
> who has been bullied for the last three years.
> He is still in school. He is still going through it.
> He decided that waiting until he was an adult to fix this
> was too long for the next kid.
>
> If you have two minutes, please read his story."*
> [ Read his story → ]   [ Skip to the petition → ]

**Screen 8 — The ask**
> *"You cannot un-know what you just learned.
> One signature is one parliamentarian harder to ignore.
> We need 100,000.
>
> **Sign the petition to make anti-bullying a law in India.**"*
> [ Sign now ]   [ Share with one person ]

### Design notes
- Dark, calm background. Serif typography. No stock photos of crying children — that is exploitation, not advocacy.
- Each screen fades in; user taps to advance. **No auto-scroll** — the pace is deliberate.
- A small, persistent **helpline button** (CHILDLINE 1098, iCall) sits at the bottom of every screen. If the content brings something up for the reader, help is one tap away.
- Reviewed by a child psychologist before release (trauma-informed copy, no graphic detail).
- Optional **"Mute the heavy stuff"** toggle in settings — replaces Screens 4 and 6 with gentler versions for younger readers.

---

## 4b. The Founder's Story (a 13-year-old's account)

This section is the emotional anchor of the entire extension. The founder is a **13-year-old child who has been bullied for the past 4 years and is still in school.** That single fact changes everything below — the editorial choices, the safeguards, the legal posture, and the public framing.

> ⚠️ **Read this section before writing a single word of the story.** It exists to protect the child first and the campaign second.

### Placement
- Linked from Screen 7 of "The Weight."
- Permanent entry in the side panel: **"Why a 13-year-old started this."**
- Excerpted (with safeguards below) on the petition site landing page.

### Non-negotiable safeguards (because the founder is a minor)
1. **Guardian consent in writing**, on file, before *anything* is published. Re-confirmed before each new format (text → audio → video).
2. **The child's own informed assent** — explained in age-appropriate language: who will see this, forever, including future schools, employers, partners. He must be able to say no, or pause, at any time, without anyone being upset.
3. **Identity decision is the family's, not the campaign's.** Three options, pick one and stick to it:
   - **Anonymous** — first name only or a pseudonym, no school, no city, no photo, no voice. *(Recommended default.)*
   - **First name + city** — a face-blurred or illustrated avatar; no school named.
   - **Fully named** — only with guardian + legal counsel sign-off, and only if the family has thought through the lifelong implications.
4. **Never name the bullies. Never name the school. Never name teachers.** Defamation risk is real, retaliation risk against the child is realer.
5. **No graphic detail of incidents.** Reference impact, not choreography. ("It happened in the corridor most days" — not a blow-by-blow.)
6. **No imagery of the child in distress.** No tear-stained photos. If a face is shown at all, it is a calm, neutral one — chosen by him.
7. **A licensed child psychologist reviews the final text/video** before publication, specifically for re-traumatisation risk to the founder *and* to child readers.
8. **Helpline strip pinned** to the top and bottom of this screen — for him and for any reader his age who lands here.
9. **Right to withdraw.** A one-tap "take this down" route for the family. The codebase must support unpublishing this section without breaking the rest of the extension.
10. **Press handling protocol.** All media requests routed to a designated adult (parent or trusted guardian-appointed spokesperson). The child does **not** do live, unmoderated interviews. Pre-recorded, edited, with an adult present.

### Structure (to be drafted *with* the founder, in his words, then lightly edited)
1. **Who I am** — age, year in school, what I love (cricket? coding? music?). Establish him as a whole child, not a victim first.
2. **When it started** — roughly, not exactly. Year, not date.
3. **What it has felt like** — emotion-led, not incident-led. ("The worst part isn't the words. It's not knowing if today is one of those days.")
4. **What the adults around me did — and didn't do.** Honest, but no names. This is where the case for a *law* gets made — because a guideline let the adults off the hook.
5. **Why I started this instead of waiting** — *the line that will go viral if anything does.*
6. **What I'm asking you, the person reading this, to do** — sign, share, talk to one child today.

### Format options (pick the lightest one that works)
- **Written, ~400–700 words** in his voice. *(Strongly recommended starting point — easiest to edit, easiest to take down, lowest exposure.)*
- **Audio, 2–4 min**, with a transcript. Voice can be lightly altered if the family prefers.
- **Video, 2–3 min**, only after written + audio have been live for a while and the family is comfortable. Face optional.

### Editorial principles
- **His voice, not an adult's voice pretending to be his.** A 13-year-old does not say "this journey has taught me resilience." He might say "I just wanted one day where I didn't have to plan which corridor to walk down." Keep that.
- **No villainisation, no martyrdom.** He is a kid trying to fix something. That is enough.
- **End with agency.** The last line should be his ask of the reader — not a plea for sympathy.
- **Content note at the top:** *"This is a real account written by a 13-year-old. If you are a young person reading this and any of it feels familiar, you are not alone — CHILDLINE 1098 is free, 24/7."*

### Public framing of the founder
- In all copy: **"started by a 13-year-old"** — never "led by" or "CEO." He is the reason; adults are the operators.
- A named **guardian / mentor adult** is the public point of contact for press, partnerships, and the petition.
- Bylines on interviews and press: family decides per-piece.

### Legal & policy notes
- **POCSO Act** considerations if any incidents touched on physical or sexual harm — those details do **not** go in the public story; they go to the police, with adult support.
- **Juvenile Justice Act** and **DPDP Act 2023** protections for the child's data — the petition site must not collect or display anything tying him to identifiable incidents.
- If the school is identifiable by inference, **legal counsel reviews the text before publication.**
- Consider registering the campaign as a trust or Section 8 company with adult trustees — so the 13-year-old is the **founder and face**, but is **not personally liable** for anything the campaign does.

### Codebase placeholder
- `extension/src/sidepanel/FoundersStory.tsx` ships from day one with:
  - A respectful **"His story is being written — with care"** placeholder.
  - The pinned helpline strip already wired in.
  - A `data/founders-story.json` file gated behind a `published: false` flag, so nothing leaks before sign-off.
  - A documented **takedown switch** (`published: false` → next release pulls the section entirely).

> 📌 When you're ready to share his account, send it to me in whatever form is easiest — voice notes, rough text, bullet points. I'll help shape it into the §4b draft, run it past the safeguards above, and we will not publish a word until you and his guardian have signed off.

---

## 5. Comparative Law Module (Static Content)

Pre-load a researched JSON file with country cards:

| Country | Law | Year | Key Mechanism |
|---|---|---|---|
| Norway | Education Act §9A (right to safe school environment) | 2003, revised 2017 | School duty to act; fines |
| Sweden | Discrimination Act + Education Act Ch. 6 | 2006 | Mandatory anti-bullying plan per school |
| USA | State-level laws (all 50 states) + federal civil-rights overlay | 1999–2015 | Reporting, investigation, discipline |
| UK | Education and Inspections Act 2006 | 2006 | Statutory duty on head teachers |
| Japan | Act for the Promotion of Measures to Prevent Bullying | 2013 | National policy + school committees |
| South Korea | School Violence Prevention Act | 2004 | School Violence Committees |
| Australia | National Safe Schools Framework + state laws | 2011 | Mandatory frameworks |
| **India** | **Only CBSE circulars + UGC anti-ragging regs + NCPCR guidelines** | — | **Non-binding for schools generally** |

---

## 6. Extra In-Extension Utilities (to satisfy store policy & deliver value)

- **"Pause & Reflect"** — when the user types insults/slurs into a textbox on social sites, a gentle in-page nudge appears ("This message may hurt someone — want to rephrase?"). Uses a local word-list; nothing is sent to a server.
- **Daily anti-bullying tip** in the new-tab corner (opt-in).
- **Quick-help panel** — India-specific helplines (CHILDLINE 1098, iCall, Vandrevala Foundation), copy-to-clipboard, one-tap dial on mobile Edge.
- **Bookmarkable resource library** — articles, research, school-policy templates.

---

## 7. Technical Architecture

### Stack
- **Manifest V3** (required by Edge/Chrome).
- **TypeScript + Vite + React** for popup and options page.
- **Tailwind CSS** for styling.
- **chrome.storage.local** for quiz progress, opt-in flags, score history.
- **No backend in v1** — quiz logic and content are bundled. Petition lives on a separate static site (Next.js on Vercel) with signature counter.
- **Content script** (very narrow scope) for the optional "Pause & Reflect" nudge on a small allowlist of domains.

### Repo Layout (proposed)
```
antibullying/
├── extension/
│   ├── src/
│   │   ├── popup/           # React app: home, quiz, results
│   │   ├── sidepanel/       # Learn / Stories / Helplines
│   │   ├── content/         # Pause & Reflect nudge
│   │   ├── background/      # Service worker (notifications, daily tip)
│   │   ├── data/
│   │   │   ├── quiz.json
│   │   │   ├── countries.json
│   │   │   └── helplines.json
│   │   └── lib/
│   ├── public/
│   │   ├── icons/
│   │   └── manifest.json
│   └── vite.config.ts
├── petition-site/           # Separate Next.js app
├── docs/
│   ├── research/            # Sources for country comparisons
│   └── interviews/          # Markdown transcripts
└── PLAN.md
```

### Manifest (sketch)
```json
{
  "manifest_version": 3,
  "name": "StandUp — Anti-Bullying Toolkit",
  "version": "0.1.0",
  "action": { "default_popup": "popup.html" },
  "side_panel": { "default_path": "sidepanel.html" },
  "background": { "service_worker": "background.js" },
  "permissions": ["storage", "notifications", "sidePanel"],
  "host_permissions": [],
  "content_scripts": [],
  "icons": { "16": "icons/16.png", "48": "icons/48.png", "128": "icons/128.png" }
}
```
Keep `host_permissions` empty in v1 to ease review. Add domain-scoped scripts in v1.1.

---

## 8. Petition Site (Separate)

- **Stack:** Next.js + Postgres (Supabase) + Cloudflare Turnstile.
- **Fields:** name, city, state, age-bracket, email (verified), optional comment.
- **Anti-fraud:** Turnstile, rate limit per IP, dedupe by email.
- **Live counter** towards 100,000.
- **Transparency page:** export of aggregated stats; raw data never published.
- **Compliance:** India DPDP Act 2023 — explicit consent, purpose limitation, easy withdrawal.
- **Submission plan:** at 100k, file as a representation to the Ministry of Education + sponsoring MP.

---

## 9. Content & Research Workstream

- Compile primary sources for each country (statute text + secondary analysis). Store under `docs/research/`.
- Legal review of India's current framework: RTE Act 2009, CBSE circular (2015), UGC Anti-Ragging Regulations 2009, NCPCR guidelines, Juvenile Justice Act overlap.
- Draft a one-page **"Why a law" brief** for press and MPs.

---

## 10. Interview Program

- Target: 50 interviews — survivors, parents, teachers, principals, child psychologists, lawyers, MPs.
- Format: 15–25 min video + edited 90-sec clip + written transcript.
- Distribution: extension Stories tab, YouTube, Instagram Reels, petition site.
- Consent forms + minor-protection protocol (guardian consent, anonymization option).

---

## 11. Privacy, Safety, Legal

- **No personal data collected by the extension.** All quiz state local.
- Extension Privacy Policy published before submission.
- "Pause & Reflect" runs entirely on-device.
- Petition site complies with **DPDP Act 2023**; appoint a Data Protection contact.
- Content reviewed by a child psychologist before release.
- Crisis-safety: every screen mentioning self-harm includes helpline numbers.
- **Founder is a minor** — all §4b safeguards apply (guardian consent, takedown switch, no school/bully naming, press protocol via designated adult).

---

## 11a. Canonical Repository

All code, content, petition site, country-comparison data, interview transcripts, and the founder's story live in a single GitHub monorepo:

**🔗 https://github.com/zozimustechnologies/antibullying**

### Repo layout (mapped to this plan)
```
antibullying/                         # github.com/zozimustechnologies/antibullying
├── extension/                        # Edge / Chrome MV3 extension (§7)
│   └── src/
│       ├── popup/                    # Quiz (§4)
│       ├── sidepanel/
│       │   ├── TheWeight.tsx         # Post-quiz emotional close (§4a)
│       │   ├── FoundersStory.tsx     # 13-year-old founder's story (§4b)
│       │   ├── Learn.tsx             # Country comparisons (§5)
│       │   ├── Stories.tsx           # Interview library (§10)
│       │   └── Helplines.tsx         # India crisis numbers
│       └── data/
│           ├── quiz.json             # 7 questions (§4)
│           ├── countries.json        # Comparative law cards (§5)
│           ├── helplines.json
│           └── founders-story.json   # gated: { "published": false } until sign-off
├── petition-site/                    # Next.js + Supabase petition (§8)
│   └── content/
│       └── founders-story.mdx        # mirrored from extension, same gate
├── docs/
│   ├── research/                     # Country statute sources (§9)
│   ├── interviews/                   # Transcripts + consent forms (§10)
│   └── safeguards/
│       └── minor-founder-protocol.md # §4b safeguards as a living checklist
├── PLAN.md                           # This file
└── README.md
```

### Repo policies (set up before any content is pushed)
- **Default branch:** `main`, protected. PR + 1 review required.
- **Private until launch readiness review** — flip to public only after the §4b safeguards checklist is signed off by the guardian and a child psychologist.
- **CODEOWNERS** — `docs/safeguards/`, `extension/src/sidepanel/FoundersStory.tsx`, and `data/founders-story.json` require review by the designated adult guardian-mentor on every change.
- **No PII in commits.** Pre-commit hook scans for the founder's full name, school name, and city. Add a `.gitleaks.toml` with custom rules.
- **Issue templates** — separate templates for: content suggestions, country-law corrections, interview submissions, accessibility issues. *No* public bug-report channel that could surface the child's identity.
- **Discussions disabled** until a moderation policy is in place; harassment toward the founder is a foreseeable risk.
- **Secrets** (Supabase, Turnstile, analytics) live only in GitHub Actions secrets; never in the repo.
- **Takedown drill** — documented in `docs/safeguards/minor-founder-protocol.md`: how to flip `published: false`, ship a release, and pull the petition-site page within 1 hour of a guardian request.
- **License** — code under MIT; written content (story, interviews, country cards) under **CC BY-NC 4.0** so it cannot be repurposed commercially without permission.

---

## 12. Edge Add-ons Submission Checklist

- [ ] Single, clear purpose described in listing.
- [ ] Screenshots of quiz, learn module, helplines (NOT just petition).
- [ ] Privacy policy URL.
- [ ] Minimal permissions; justify each in submission notes.
- [ ] No remote code execution; all logic bundled.
- [ ] Petition CTA framed as "Learn more / Take action," not as the product.
- [ ] Age rating + content disclosure (mentions of bullying/abuse).

---

## 13. Phased Roadmap

### Phase 0 — Foundations (Weeks 1–2)
- Finalize quiz content with a child psychologist.
- Lock country research; write country cards.
- Brand: name, logo, color palette. Working name: **StandUp**.
- Set up monorepo + CI.

### Phase 1 — MVP Extension (Weeks 3–6)
- Popup + 7-question quiz + results + share card.
- Side panel: Learn (countries) + Helplines.
- Bundle content as JSON. No network calls.
- Submit to Edge Add-ons + Chrome Web Store.

### Phase 2 — Petition Site (Weeks 4–7, parallel)
- Next.js site, counter, share tools.
- Legal/privacy review.
- Soft launch with first 10 interviews.

### Phase 3 — Growth (Weeks 7–16)
- Pause & Reflect nudge (v1.1).
- Daily-tip notifications.
- Interview library expansion.
- School outreach kit (PDFs, slide deck).
- Partnerships: NGOs (Bachpan Bachao Andolan, Arpan, Teach For India alumni), influencers, school networks.

### Phase 4 — Parliament Push (Month 6+)
- Hit 100k signatures.
- Press event + draft model bill (with a constitutional lawyer).
- Engage sponsoring MP(s).

---

## 14. Risks & Mitigations

| Risk | Mitigation |
|---|---|
| Edge/Chrome rejects as "redirect-only" | Robust standalone quiz + learn + helplines; petition is secondary CTA. |
| Petition fraud inflates numbers | Turnstile + honeypot + dedupe; publish methodology. |
| Sensitive content triggers users | Trauma-informed copy reviewed by clinician; helplines on every page. |
| Minors' data on petition site | Disallow under-18 sign-ups; or require guardian consent flow. |
| Political neutrality | Frame as child-safety, not partisan; brief MPs across parties. |

---

## 15. Immediate Next Steps

1. Confirm brand name and register domain.
2. Scaffold the `extension/` workspace (Vite + React + TS + MV3).
3. Draft and review the 7 quiz questions with a child psychologist.
4. Compile country research into `data/countries.json`.
5. Draft privacy policy.
6. Begin recruiting first 5 interview subjects.

---

*Document owner: <you>. Last updated: 2026-04-26.*
