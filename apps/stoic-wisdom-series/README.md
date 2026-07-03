# Stoic Wisdom Series — Landing

[![Live](https://img.shields.io/badge/Live-stoic.abvx.xyz-2ea44f)](https://stoic.abvx.xyz)
![Next.js](https://img.shields.io/badge/Next.js-App%20Router-black)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

## Live
https://stoic.abvx.xyz

**License:** MIT. See [LICENSE](LICENSE).

Bilingual landing page (**English / toki pona**) for the *Stoic Wisdom Series*: classic Stoic texts reimagined in **toki pona**, with **sitelen pona** alongside Latin script.

Current catalog on the landing:
- **Meditations of Marcus Aurelius — in Toki Pona** (Kindle + paperback)
- **The Toki Pona Reader’s Kit** (free PDF)

---

## ✦ About

This project is intentionally **content-first**:
- editorial layout
- strong typography
- simple structure
- easy reuse for future book-series landings

Texts live in JSON dictionaries; book links and images are kept in a single place.

---

## toki pona display layers

This site uses `sitelen-layer-plugin` on the `/tp` route.

- Plugin: https://github.com/markoblogo/sitelen-layer-plugin
- Live TP: https://stoic.abvx.xyz/tp

Available modes on `/tp`:

- `TP`: Latin toki pona
- `SP`: sitelen pona through a ligature font
- `🙂`: sitelen emoji

Behavior:

- `/en` opens as the regular English version and only shows `EN / TP`.
- `/tp` opens as Latin toki pona by default and shows `EN / TP / SP / 🙂` in the header.
- The `EN / TP` locale switcher remains untransformed.
- The sitelen emoji layer renders the existing toki pona copy as emoji.
- The sitelen pona layer renders real sitelen pona glyphs via a ligature-capable font.

The plugin does not translate English into toki pona. The TP copy is authored separately; the plugin only provides display layers for existing toki pona content.

---

## 🧱 Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** CSS Modules
- **i18n:** Dictionary-based JSON (`/en` and `/tp` routes)
- **Hosting:** Vercel

---

## 📁 Project Structure

```
src/
├── app/
│   └── [lang]/           # Localized routes (/en, /tp)
│       ├── page.tsx      # Main landing
│       ├── legal/
│       └── privacy/
├── components/
│   ├── Hero.tsx          # Book stack hero
│   ├── WhySection.tsx    # Why-this-series section
│   ├── BookSection.tsx   # Book blocks with CTAs
│   └── Footer.tsx
├── data/
│   └── books.ts          # Book metadata & links
└── dictionaries/
    ├── en.json
    └── tp.json

public/
└── assets/books/
    ├── marcus-meditations/
    └── readers-kit/
```

---

## ✍️ Content Editing

### Dictionaries
All visible text lives in:
- `apps/stoic-wisdom-series/src/dictionaries/en.json`
- `apps/stoic-wisdom-series/src/dictionaries/tp.json`

### Books
Book entries and outgoing links:
- `apps/stoic-wisdom-series/src/data/books.ts`

Images:
- `apps/stoic-wisdom-series/public/assets/books/{book-id}/`

Site-level config:
- `apps/stoic-wisdom-series/src/site.config.ts`

Shared sitelen profile defaults:
- `packages/landing-sitelen/src/index.ts`

### How this app differs

- It is bilingual English / toki pona.
- `/tp` is authored toki pona text, not translated at runtime.
- `sitelen-layer-plugin` only changes display layers for existing toki pona copy.
- It has commercial Amazon CTAs plus a free reader-kit CTA.
- Its visual rhythm is still app-owned CSS Modules; shared UI primitives are not forced onto this migrated app.

---

## 🚀 Development

```bash
npm install
npm run dev:stoic-wisdom-series
npm run build --workspace @book-landings/stoic-wisdom-series
```

Run from the monorepo root:

```bash
npm run lint
npm run typecheck
npm run build
```

## Sitelen verification

- Open `/en`: only `EN / TP` should be visible.
- Open `/tp`: `EN / TP / SP / 🙂` controls should be visible.
- Confirm `/tp` defaults to Latin toki pona.
- Toggle `SP`: text should render with real sitelen pona ligature glyphs.
- Toggle `🙂`: existing toki pona copy should render as emoji.
- Confirm the locale switcher remains readable and untransformed.
- Confirm `/en` is not transformed by the plugin.

---

## © License

© 2026 ABVX.xyz. All rights reserved.
