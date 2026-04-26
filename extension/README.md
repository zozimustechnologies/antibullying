# StandUp — Edge/Chrome Extension

## Develop

```pwsh
cd extension
npm install
npm run dev
```

Then in Edge:

1. Open `edge://extensions`
2. Enable **Developer mode**
3. Click **Load unpacked** → select `extension/dist`

In Chrome the path is `chrome://extensions`.

## Build for store submission

```pwsh
npm run build
# upload extension/dist/ as the unpacked package
```

## Structure

```
src/
├── popup/         # Quiz host (toolbar popup, 380px)
├── sidepanel/     # The Weight, Learn, Founder's Story, Helplines
├── components/    # Quiz, HelplineStrip
├── data/          # quiz.json, countries.json, helplines.json,
│                  # the-weight.json, founders-story.json
├── lib/           # sidepanel.ts (open helper)
├── background/    # MV3 service worker
└── styles.css     # Tailwind entry
```

## Founder's story is gated

`src/data/founders-story.json` ships with `published: false`. Do not flip this without:
- Guardian written consent
- Child-psychologist content review
- Legal review (school identifiability)
- CODEOWNER PR review

See [`../docs/safeguards/minor-founder-protocol.md`](../docs/safeguards/minor-founder-protocol.md).
