# Ukrainian Modernism — Landing

[![Live](https://img.shields.io/badge/Live-ukrmodernism.abvx.xyz-2ea44f)](https://ukrmodernism.abvx.xyz)
[![Video](https://img.shields.io/badge/Video-YouTube-red)](https://youtu.be/krXa1OzLVIs)
![Next.js](https://img.shields.io/badge/Next.js-App%20Router-black)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

## Demo video
[![Ukrainian Modernism — site walkthrough](https://img.youtube.com/vi/krXa1OzLVIs/maxresdefault.jpg)](https://youtu.be/krXa1OzLVIs)

## Live
https://ukrmodernism.abvx.xyz

**License:** MIT. See [LICENSE](LICENSE).

A content-driven editorial landing page dedicated to Ukrainian modernist literature of the 1920s, created for a French-speaking audience.

The project presents a curated book collection with a magazine-style layout, bilingual content (French / Ukrainian), and a strong focus on readability, rhythm, and visual hierarchy.

---

## ✦ About the Project

This site was created as a **finished cultural product**, not as a generic UI kit.

It serves two purposes:

1. A public landing page for the *Ukrainian Modernism* book collection  
2. A clean, reusable **editorial structure** for future content-driven projects (by replacing texts and images)

The codebase deliberately avoids over-engineering and focuses on clarity, maintainability, and long-term reuse.

---

## 🧱 Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** CSS Modules (scoped, zero runtime)
- **i18n:** Dictionary-based (JSON)
- **Hosting:** Railway
- **Domain:** Cloudflare DNS

No CMS, no database, no runtime dependencies beyond Node.

---

## 📁 Project Structure

```
src/
├── app/
│   └── [lang]/           # Localized routes (/fr, /uk)
│       ├── page.tsx      # Main landing
│       ├── legal/
│       └── privacy/
├── components/
│   ├── Hero.tsx          # Book stack hero
│   ├── WhySection.tsx    # Editorial context section
│   ├── BookSection.tsx   # Magazine-style book layouts
│   └── Footer.tsx
├── data/
│   └── books.ts          # Book metadata & links
└── dictionaries/
├── fr.json
└── uk.json
```

---

---

## ✍️ Content-First Design

All meaningful content is separated from layout logic.

### Dictionaries
All visible text lives in:
- `apps/ukrainian-modernism/src/dictionaries/fr.json`
- `apps/ukrainian-modernism/src/dictionaries/uk.json`

This includes:
- Headings
- Descriptions
- “Why this collection” texts
- Legal & privacy pages
- Book titles and summaries

### Books
Book structure is defined once in:
- `apps/ukrainian-modernism/src/data/books.ts`

Images are stored in:
- `apps/ukrainian-modernism/public/assets/books/{book-id}/`

Site config lives in:
- `apps/ukrainian-modernism/src/site.config.ts`

## Route map

- `/` -> `/fr`
- `/fr`, `/uk`
- `/fr/book/khvylovy-sanatorium`, `/uk/book/khvylovy-sanatorium`
- `/fr/book/ianovski-maitre-du-navire`, `/uk/book/ianovski-maitre-du-navire`
- `/fr/book/johansen-leonardo`, `/uk/book/johansen-leonardo`
- `/fr/book/pidmohylny-la-ville`, `/uk/book/pidmohylny-la-ville`
- `/fr/book/kosynka-gift`, `/uk/book/kosynka-gift`
- `/fr/gift`, `/uk/gift`
- `/fr/legal`, `/uk/legal`
- `/fr/privacy`, `/uk/privacy`

## Monorepo notes

- This app is French / Ukrainian, not English / toki pona.
- `sitelen-layer-plugin` is intentionally not used.
- The magazine-style editorial components and CSS modules remain app-specific.
- Shared packages are used only for site config types and SEO URL helpers.
- No database and no CMS are introduced.

---

## ♻️ Reusing This Project

This repository **can be reused** for other editorial or cultural projects with similar needs.

Typical reuse flow:

1. Replace images in `public/assets/books/`
2. Update texts in `src/dictionaries/*.json`
3. Adjust book entries in `src/data/books.ts`
4. Deploy

No architectural changes required.

This approach is ideal for:
- Book launches
- Cultural projects
- Essays / long-form editorial content
- Bilingual or multilingual showcases

---

## 🚀 Development

```bash
npm install
npm run dev:ukrainian-modernism
npm run build --workspace @book-landings/ukrainian-modernism
```

Run from the monorepo root:

```bash
npm run lint
npm run typecheck
npm run build
```

### Commands

```bash
# Install dependencies
npm install
```

### Run development server
```npm run dev```

### Build for production
```npm run build```

### Start production server
```npm start```

## 🌍 Deployment

The project is deployed on **Railway** and works out of the box on any Node-based platform.
It can also be exported statically if needed.

The live domain is managed through **Cloudflare DNS**:

- `https://ukrmodernism.abvx.xyz`

Keep Railway/Cloudflare settings app-specific when deploying from the monorepo.

## © License

© 2026 ABVX.xyz. All rights reserved.
Template free for reuse with attribution.
