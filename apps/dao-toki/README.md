# dao-toki

**Chinese Wisdom in toki pona**  
Bilingual landing for a book series that brings classical Chinese philosophy into toki pona reading formats.

Live site: https://dao-toki.abvx.xyz/

## About

This repository contains the landing page for **Chinese Wisdom in toki pona** — a bilingual (EN / TP) series site built on the same landing architecture as the Stoic series.

The project presents classical Chinese texts through compact reading editions that combine:

- Traditional Chinese
- English
- toki pona
- sitelen pona and sitelen emoji display layers on the toki pona route

The site currently launches with three books:

1. **Dao De Jing**
2. **Sunzi: The Art of War in toki pona**
3. **Mozi — Universal Love** *(free preview edition)*

## Languages

- English: `/en`
- toki pona: `/tp`

Root redirect:

- `/` → `/en`

## toki pona display layers

This site uses `sitelen-layer-plugin` on the `/tp` route.

- Plugin: https://github.com/markoblogo/sitelen-layer-plugin
- Live TP: https://dao-toki.abvx.xyz/tp

Modes on `/tp`:

- `TP`: Latin toki pona
- `SP`: sitelen pona through a ligature font
- `🙂`: sitelen emoji

Behavior:

- `/en` opens as the regular English version and only shows `EN / TP`.
- `/tp` opens as Latin toki pona by default.
- On `/tp`, the header also includes `SP` and emoji layer controls.
- The sitelen emoji layer renders the existing toki pona copy as emoji.
- The sitelen pona layer renders real sitelen pona glyphs via a ligature-capable font.
- The `EN / TP` locale switcher remains untransformed.

The plugin does not translate English into toki pona. The TP copy is authored separately; the plugin only provides display layers for existing toki pona content. The `/en` route remains unaffected.

## Launch books

### Dao De Jing
A visual edition pairing the classical Chinese text with toki pona in a sitelen-pona–ready layout, plus an English foreword and reading guide.

### Sunzi: The Art of War in toki pona
A multilingual study-friendly edition with Traditional Chinese, English, toki pona, and sitelen-pona–ready parallel reading.

### Mozi — Universal Love
A free preview-format volume introducing the series through a full toki pona edition of *Universal Love*.

## Tech stack

- Next.js (App Router)
- TypeScript
- CSS Modules
- Dictionary-based EN / TP content
- Vercel deployment

## Project structure

- `src/app/[lang]/page.tsx` — main landing pages
- `src/app/[lang]/books/[id]/page.tsx` — book detail / learn more pages
- `src/app/[lang]/legal/page.tsx` — legal page
- `src/app/[lang]/privacy/page.tsx` — privacy page
- `src/dictionaries/en.json` — English UI/content
- `src/dictionaries/tp.json` — toki pona UI/content
- `src/data/books.ts` — book metadata, links, flags
- `public/assets/books/<book-slug>/` — covers and promo images

## Content editing

### Dictionaries
Edit visible copy here:

- `apps/dao-toki/src/dictionaries/en.json`
- `apps/dao-toki/src/dictionaries/tp.json`

### Books dataset
Edit book metadata and links here:

- `apps/dao-toki/src/data/books.ts`

### Book assets
Store assets here:

- `apps/dao-toki/public/assets/books/dao-de-jing/`
- `apps/dao-toki/public/assets/books/sunzi/`
- `apps/dao-toki/public/assets/books/mozi-universal-love/`

Site config lives here:

- `apps/dao-toki/src/site.config.ts`

## Route map

- `/` -> `/en`
- `/kit` -> `/en/kit` because locale middleware redirects bare paths before `src/app/kit/page.tsx` can run.
- `/en`, `/tp`
- `/en/books/dao-de-jing`, `/tp/books/dao-de-jing`
- `/en/books/sunzi`, `/tp/books/sunzi`
- `/en/books/mozi-universal-love`, `/tp/books/mozi-universal-love`
- `/en/legal`, `/tp/legal`
- `/en/privacy`, `/tp/privacy`

Follow-up: `src/app/kit/page.tsx` still contains an external redirect to `https://toki-free.abvx.xyz/`, but it is unreachable while locale proxy handles `/kit` first. Preserve this runtime behavior unless a routing cleanup task intentionally changes it.

## Sitelen verification

- Open `/en`: only `EN / TP` should be visible.
- Open `/tp`: `EN / TP / SP / 🙂` controls should appear in the header.
- Confirm `/tp` defaults to Latin toki pona.
- Toggle `SP`: text should render with real sitelen pona ligature glyphs.
- Toggle `🙂`: existing toki pona copy should render as emoji.
- Confirm the locale switcher remains readable and untransformed.
- Confirm `/en` is not transformed by the plugin.

## Monorepo notes

- Visual components remain app-specific to preserve the Chinese Wisdom design.
- Shared sitelen profile defaults live in `packages/landing-sitelen`.
- Shared canonical/OpenGraph URL helpers live in `packages/landing-seo`.
- This app remains independently deployable and separate from `stoic-wisdom-series` and `toki-free-kit`.

## Development

```bash
npm install
npm run dev:dao-toki
npm run build --workspace @book-landings/dao-toki
```

Run from the monorepo root:

```bash
npm run lint
npm run typecheck
npm run build
```

## Related projects

- Toki Pona Translator — https://toki.abvx.xyz/
- Toki Pona Free Kit — https://toki-free.abvx.xyz/
- Stoic Wisdom in Toki Pona — https://stoic.abvx.xyz/

## License

MIT
