# toki pona free kit + free translations

Live: https://toki-free.abvx.xyz/en (EN) · https://toki-free.abvx.xyz/tp (TP)

A small bilingual landing page that collects free toki pona reader kits and free translations, with direct downloads, teasers, and “learn more” pages for SEO.

## What’s included

- **The Toki Pona Reader’s Kit** — a free starter kit built from texts used in the Stoic Wisdom in toki pona project (includes *The Golden Verses of Pythagoras*).
- **Chinese Wisdom in toki pona (Free Kit)** — a free entry kit that previews the Chinese Wisdom in toki pona series (includes *Mozi: Universal Love*).
- **Heart Sutra in toki pona (Free Translation)** — a free bonus translation edition (Chinese original + English reference + toki pona + sitelen-ready layout).

## Languages

- English: `/en`
- toki pona: `/tp`

## toki pona display layers

This site uses `sitelen-layer-plugin` on the toki pona route:

- Live TP route: <https://toki-free.abvx.xyz/tp>
- Plugin repository: <https://github.com/markoblogo/sitelen-layer-plugin>

Available display modes on `/tp`:

- `TP`: Latin toki pona
- `SP`: sitelen pona via ligature font
- `🙂`: sitelen emoji

Behavior:

- `/en` opens as normal English and only shows `EN / TP`.
- `/tp` opens as Latin toki pona by default and shows `EN / TP / SP / 🙂` in the header.
- The `EN / TP` locale switcher is not transformed.
- The emoji layer renders the existing toki pona text as emoji according to the plugin mapping.
- The sitelen pona layer renders real glyphs through a ligature-capable sitelen pona font.

This is not machine translation. The TP copy is authored separately; the plugin only changes display layers for existing toki pona content.

### Runtime verification on live `/tp`

Use these fingerprints after deployment to confirm the newest integration bundle is active:

- `/en`: only `EN / TP`, no layer controls
- `/tp`: `EN / TP / SP / 🙂` controls in the header
- Emoji mode: header/main/footer TP text transforms where appropriate
- SP mode: real sitelen pona glyphs render
- Locale switcher remains `EN / TP`
- Toggle class includes `slp-toggle--size-lg`
- Diagnostics overlay shows `Toggle mode: inline` and `Container: main`

In this monorepo, keep the deploy checklist in:

- `apps/toki-free-kit/docs/RUNTIME_VERIFICATION.md`

## Tech stack

- Next.js (App Router) + TypeScript
- CSS Modules
- Dictionary-based i18n (JSON)
- Hosted on Vercel

## Project structure

- `src/app/[lang]/page.tsx` — main landing per language
- `src/app/[lang]/books/[slug]/page.tsx` — “learn more” pages per book
- `src/app/[lang]/legal/page.tsx` / `privacy/page.tsx` — legal pages
- `src/dictionaries/en.json` / `tp.json` — all visible copy (hero, sections, FAQ, book texts)
- `src/data/books.ts` — book metadata (slugs, links, assets)
- `public/books/<slug>/...` — book assets (covers, promo images, PDFs)

## Content editing

### Update texts
Edit:
- `apps/toki-free-kit/src/dictionaries/en.json`
- `apps/toki-free-kit/src/dictionaries/tp.json`

### Update books / links
Edit:
- `apps/toki-free-kit/src/data/books.ts`

### Update images / PDFs
Put assets in:
- `apps/toki-free-kit/public/books/<slug>/`

Recommended naming:
- `cover.png`
- `promo.jpg`
- `<slug>.pdf`

## Development

```bash
npm install
npm run dev:toki-free-kit
npm run build --workspace @book-landings/toki-free-kit
```

Run from the monorepo root:

```bash
npm run lint
npm run typecheck
npm run build
```

## Monorepo notes

- Site config lives in `apps/toki-free-kit/src/site.config.ts`.
- Visual components remain app-specific to preserve the current landing design.
- Shared sitelen profile defaults live in `packages/landing-sitelen`.
- Shared canonical/OpenGraph URL helpers live in `packages/landing-seo`.
- This app remains independently deployable and separate from `stoic-wisdom-series`.

## **License**
MIT (see LICENSE).
