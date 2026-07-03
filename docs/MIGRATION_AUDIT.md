# Migration Audit: Existing Book Landing Repositories

Audited source repositories:

- `markoblogo/ukrainian-modernism`
- `markoblogo/toki-free-kit`
- `markoblogo/dao-toki`
- `markoblogo/stoic-wisdom-series`

Target repository: `markoblogo/book-landings`

This document is an inventory only. Do not migrate code until routes, assets, SEO, legal/privacy pages, plugin behavior, and external links below are preserved or intentionally changed.

## 1. Repository Summary

| Source repo | Live URL | Framework / version | Package manager | Deployment | Locales / routes | Book detail pages | Legal / privacy | Dictionaries | Book metadata | Assets | Special plugins / runtime | Downloads / purchases / media | Build commands | Known risks |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `ukrainian-modernism` | `https://ukrmodernism.abvx.xyz` | Next.js App Router `16.1.1`, React `19.2.3`, TypeScript | npm (`package-lock.json`) | README says Railway; Node-compatible | `fr`, `uk`; `/` redirects to `/fr`; localized home, book, legal, privacy, gift pages | Yes: `/{lang}/book/[id]` | Yes: `/{lang}/legal`, `/{lang}/privacy` | `src/dictionaries/fr.json`, `src/dictionaries/uk.json`; loader in `src/get-dictionary.ts` | `src/data/books.ts` | `public/assets/books`, `public/images`, `public/og`, `public/downloads`, partner assets | JSON-LD helpers in `src/lib/jsonld.ts`; video modal; no sitelen plugin | Amazon FR Kindle/print links, YouTube teaser IDs, gift PDF/EPUB downloads | `npm run dev`, `npm run build`, `npm run start`, `npm run lint` | Preserve singular `/book/` route, `/gift`, Railway deployment assumptions, `public/og/books/*.png`, duplicate gift files under `public/downloads` and book asset folder. |
| `toki-free-kit` | `https://toki-free.abvx.xyz/en`, `https://toki-free.abvx.xyz/tp` | Next.js App Router `16.1.1`, React `19.2.3`, TypeScript | npm (`package-lock.json`) | README says Vercel | `en`, `tp`; `/` redirects to `/en`; `/kit` redirects to `/en/kit`; localized home, kit, book, legal, privacy pages | Yes: `/{lang}/books/[id]` | Yes: `/{lang}/legal`, `/{lang}/privacy` | `src/dictionaries/en.json`, `src/dictionaries/tp.json`; loader in `src/get-dictionary.ts` | `src/data/books.ts`, `src/data/kits.ts`, `src/data/moreBooks.ts` | `public/books`, `public/assets/books`, `public/assets/kits`, OG/Twitter images | `sitelen-layer-plugin` from `vendor/sitelen-layer-plugin-0.1.1.tgz`; TP-only scope; header toggle; locale-switcher exclusions | Free PDF downloads, kit downloads, YouTube teaser links, related series links, related commercial books | `npm run dev`, `npm run build`, `npm run start`, `npm run lint` | `public/sitemap.xml` appears to contain `stoic.abvx.xyz` URLs despite app metadata using `toki-free.abvx.xyz`; preserve plugin vendor tarball and font CSS imports; ensure `/en` is unaffected. |
| `dao-toki` | `https://dao-toki.abvx.xyz/` | Next.js App Router `16.1.1`, React `19.2.3`, TypeScript | npm (`package-lock.json`) | README says Vercel | `en`, `tp`; `/` redirects to `/en`; `/kit` redirects externally to `https://toki-free.abvx.xyz/`; localized home, kit, book, legal, privacy pages | Yes: `/{lang}/books/[id]` | Yes: `/{lang}/legal`, `/{lang}/privacy` | `src/dictionaries/en.json`, `src/dictionaries/tp.json`; loader in `src/get-dictionary.ts` | `src/data/books.ts`, `src/data/kits.ts`, `src/data/moreBooks.ts` | `public/assets/books`, `public/assets/kits`, OG/Twitter images | `sitelen-layer-plugin` from `vendor/sitelen-layer-plugin-0.1.1.tgz`; TP-only scope; header toggle; locale-switcher and ignored link exclusions | Amazon US Kindle/print links, YouTube teasers, kit PDF links, related projects | `npm run dev`, `npm run build`, `npm run start`, `npm run lint` | Preserve SVG cover/promo assets for Chinese books, external `/kit` redirect semantics, `tok` + `tp` hreflang tags, plugin storage key. |
| `stoic-wisdom-series` | `https://stoic.abvx.xyz` | Next.js App Router `16.1.1`, React `19.2.3`, TypeScript | npm (`package-lock.json`) | README says Vercel | `en`, `tp`; `/` redirects to `/en`; `/kit` redirects to `/en/kit`; localized home, kit, book, legal, privacy pages | Yes: `/{lang}/books/[id]` | Yes: `/{lang}/legal`, `/{lang}/privacy` | `src/dictionaries/en.json`, `src/dictionaries/tp.json`; loader in `src/get-dictionary.ts` | `src/data/books.ts`, `src/data/kits.ts`, `src/data/moreBooks.ts` | `public/assets/books`, `public/assets/kits`, OG/Twitter images | `sitelen-layer-plugin` from `vendor/sitelen-layer-plugin-0.1.1.tgz`; TP-only scope; header toggle; locale-switcher and ignored link exclusions | Amazon US Kindle/print links, free reader-kit link to `toki-free`, YouTube teaser links, kit PDF links | `npm run dev`, `npm run build`, `npm run start`, `npm run lint` | Preserve TP plugin behavior, `/en/kit`, external reader-kit download URL, related book assets reused from other series. |

## 2. Route Inventory

### `ukrainian-modernism`

- `/` -> redirects to `/fr`
- `/fr`
- `/uk`
- `/fr/book/khvylovy-sanatorium`
- `/uk/book/khvylovy-sanatorium`
- `/fr/book/ianovski-maitre-du-navire`
- `/uk/book/ianovski-maitre-du-navire`
- `/fr/book/johansen-leonardo`
- `/uk/book/johansen-leonardo`
- `/fr/book/pidmohylny-la-ville`
- `/uk/book/pidmohylny-la-ville`
- `/fr/book/kosynka-gift`
- `/uk/book/kosynka-gift`
- `/fr/gift`
- `/uk/gift`
- `/fr/legal`
- `/uk/legal`
- `/fr/privacy`
- `/uk/privacy`
- Static SEO/assets: `/robots.txt`, `/sitemap.xml`, `/og/*`, `/assets/*`, `/images/*`, `/downloads/*`

### `toki-free-kit`

- `/` -> redirects to `/en`
- `/kit` -> redirects to `/en/kit`
- `/en`
- `/tp`
- `/en/kit`
- `/tp/kit`
- `/en/books/readers-kit`
- `/tp/books/readers-kit`
- `/en/books/chinese-wisdom`
- `/tp/books/chinese-wisdom`
- `/en/books/heart-sutra`
- `/tp/books/heart-sutra`
- `/en/legal`
- `/tp/legal`
- `/en/privacy`
- `/tp/privacy`
- Static SEO/assets: `/robots.txt`, `/sitemap.xml`, `/og-image.jpg`, `/twitter-card.jpg`, `/books/*`, `/assets/*`

### `dao-toki`

- `/` -> redirects to `/en`
- `/kit` -> redirects to `https://toki-free.abvx.xyz/`
- `/en`
- `/tp`
- `/en/kit`
- `/tp/kit`
- `/en/books/dao-de-jing`
- `/tp/books/dao-de-jing`
- `/en/books/sunzi`
- `/tp/books/sunzi`
- `/en/books/mozi-universal-love`
- `/tp/books/mozi-universal-love`
- `/en/legal`
- `/tp/legal`
- `/en/privacy`
- `/tp/privacy`
- Static SEO/assets: `/robots.txt`, `/sitemap.xml`, `/og-image.jpg`, `/twitter-card.jpg`, `/assets/*`

### `stoic-wisdom-series`

- `/` -> redirects to `/en`
- `/kit` -> redirects to `/en/kit`
- `/en`
- `/tp`
- `/en/kit`
- `/tp/kit`
- `/en/books/marcus-meditations`
- `/tp/books/marcus-meditations`
- `/en/books/epictetus-enchiridion`
- `/tp/books/epictetus-enchiridion`
- `/en/books/seneca-shortness-of-life`
- `/tp/books/seneca-shortness-of-life`
- `/en/books/cicero-on-duties`
- `/tp/books/cicero-on-duties`
- `/en/books/readers-kit`
- `/tp/books/readers-kit`
- `/en/legal`
- `/tp/legal`
- `/en/privacy`
- `/tp/privacy`
- Static SEO/assets: `/robots.txt`, `/sitemap.xml`, `/og-image.jpg`, `/twitter-card.jpg`, `/assets/*`

## 3. Content Inventory

### `ukrainian-modernism`

- Dictionaries: `src/dictionaries/fr.json`, `src/dictionaries/uk.json`.
- Book metadata: `src/data/books.ts`.
- Legal/privacy copy: implemented in `src/app/[lang]/legal/page.tsx` and `src/app/[lang]/privacy/page.tsx`; localized labels/back links come from dictionaries.
- README content to preserve: live URL badge, YouTube walkthrough link, Railway deployment note, project structure, content-update instructions, bilingual French/Ukrainian positioning.
- Special copy blocks: gift book copy under dictionary `gift`, Amazon showcase copy, FAQ/about/why sections, book title/summary/alt text blocks keyed by book ID.

### `toki-free-kit`

- Dictionaries: `src/dictionaries/en.json`, `src/dictionaries/tp.json`.
- Book metadata: `src/data/books.ts`; kit metadata in `src/data/kits.ts`; related commercial books in `src/data/moreBooks.ts`.
- Legal/privacy copy: dictionary sections plus `src/app/[lang]/legal/page.tsx` and `src/app/[lang]/privacy/page.tsx`.
- README content to preserve: plugin verification checklist/fingerprints, TP route behavior, Vercel hosting note, free-download positioning.
- Special copy blocks: FAQ, learn-more page text, kit page content, related series links, TP-authored copy. Contact URL currently points to `mailto:todo@example.com` in dictionaries.

### `dao-toki`

- Dictionaries: `src/dictionaries/en.json`, `src/dictionaries/tp.json`.
- Book metadata: `src/data/books.ts`; kit metadata in `src/data/kits.ts`; `src/data/moreBooks.ts` exists but appears empty/unused.
- Legal/privacy copy: dictionary sections plus `src/app/[lang]/legal/page.tsx` and `src/app/[lang]/privacy/page.tsx`.
- README content to preserve: launch book descriptions, root redirect notes, plugin route behavior, related project links.
- Special copy blocks: Chinese philosophy launch copy, book detail copy, kit page educational copy, related projects (`toki`, `toki-free`, `stoic`).

### `stoic-wisdom-series`

- Dictionaries: `src/dictionaries/en.json`, `src/dictionaries/tp.json`.
- Book metadata: `src/data/books.ts`; kit metadata in `src/data/kits.ts`; related books in `src/data/moreBooks.ts`.
- Legal/privacy copy: dictionary sections plus `src/app/[lang]/legal/page.tsx` and `src/app/[lang]/privacy/page.tsx`.
- README content to preserve: live URL, App Router/TypeScript badges, plugin route behavior, Vercel hosting note, reusable book-series landing structure.
- Special copy blocks: Stoic series positioning, reader-kit copy, related books, FAQ, kit page copy, TP-authored copy.

## 4. Asset Inventory

### `ukrainian-modernism`

- Cover/promo images: `public/assets/books/{khvylovy-sanatorium,ianovski-maitre-du-navire,johansen-leonardo,pidmohylny-la-ville,kosynka-gift}/` with `.jpg`, `.png`, `.webp` variants.
- PDFs/EPUBs: `public/assets/books/kosynka-gift/files/kosynka-gift.pdf`, `kosynka-gift.epub`; also `public/downloads/book-free.pdf`, `book-free.epub`.
- Promo/illustration images: `public/images/*`.
- Partner assets: `public/assets/partners/arkushi/*`, `public/arkushi-logo.png`.
- OpenGraph: `public/og/og-fr.jpg`, `og-uk.jpg`, `og-x.jpg`, `og-series.{fr,uk}.png`, and per-book `public/og/books/*.{fr,uk}.png`.
- Fonts/plugin/vendor assets: none found.

### `toki-free-kit`

- Cover/promo images: free books under `public/books/{reader-kit,chinese-wisdom,heart-sutra}/`; reused/related books under `public/assets/books/*`.
- PDFs: `public/books/reader-kit/reader-kit.pdf`, `public/books/chinese-wisdom/chinese-wisdom.pdf`, `public/books/heart-sutra/heart-sutra.pdf`, plus `public/assets/kits/stoicKit.pdf`, `public/assets/kits/chineseKit.pdf`.
- Kit assets: `public/assets/kits/*` (`.png`, `.jpg`, `.svg`).
- OpenGraph/Twitter: `public/og-image.jpg`, `public/twitter-card.jpg`.
- Fonts/plugin/vendor assets: `vendor/sitelen-layer-plugin-0.1.1.tgz`; plugin font CSS imported from package via `sitelen-layer-plugin/sitelen-pona-font.css`. Keep vendor tarball in repo and let font files remain exposed only through normal bundled/public asset paths.

### `dao-toki`

- Cover/promo images: launch books under `public/assets/books/{dao-de-jing,sunzi,mozi-universal-love}/` as SVG cover/promo assets; related/shared books under `public/assets/books/*`.
- PDFs: `public/assets/kits/stoicKit.pdf`, `public/assets/kits/chineseKit.pdf`.
- Kit assets: `public/assets/kits/*`.
- OpenGraph/Twitter: `public/og-image.jpg`, `public/twitter-card.jpg`.
- Fonts/plugin/vendor assets: `vendor/sitelen-layer-plugin-0.1.1.tgz`; plugin font CSS imported from package. Keep vendor tarball in repo and do not extract fonts outside normal asset usage.

### `stoic-wisdom-series`

- Cover/promo images: `public/assets/books/{marcus-meditations,epictetus-enchiridion,seneca-shortness-of-life,cicero-on-duties,readers-kit}/`; related books under `public/assets/books/other-books`.
- PDFs: `public/assets/kits/stoicKit.pdf`, `public/assets/kits/chineseKit.pdf`.
- Kit assets: `public/assets/kits/*`.
- OpenGraph/Twitter: `public/og-image.jpg`, `public/twitter-card.jpg`.
- Fonts/plugin/vendor assets: `vendor/sitelen-layer-plugin-0.1.1.tgz`; plugin font CSS imported from package. Keep vendor tarball in repo and do not extract fonts outside normal asset usage.

## 5. Feature Inventory

### Common features

- Editorial hero / book-stack hero.
- Book cards, book grids/lists, book sections.
- Book detail pages.
- Language switcher.
- Legal/privacy pages.
- Footer with legal/privacy/contact/project links.
- SEO metadata via Next Metadata API.
- Explicit hreflang alternates; TP sites include both `tok` and `tp`.
- JSON-LD for organization, website, series, and books.
- JSON dictionaries loaded by locale.
- Book metadata dataset in TypeScript.
- Static `robots.txt` and `sitemap.xml`.
- Video teaser links or modal behavior.

### Optional / repo-specific features

- `sitelen-layer-plugin`: `toki-free-kit`, `dao-toki`, `stoic-wisdom-series`.
- Sitelen pona / sitelen emoji display layers: TP routes only via `data-sitelen-layer-scope`.
- Locale switcher protection: `data-locale-switcher` excluded from plugin transforms.
- Ignored content protection: `data-sitelen-layer-ignore` used on footer/contact/project links in TP plugin repos.
- Header-mounted sitelen toggle: `#sitelen-layer-toggle-mount`, rendered only when `lang === 'tp'`.
- Demo video blocks: YouTube teaser IDs or URLs in all four repos.
- Free PDF download: `toki-free-kit`, `dao-toki` kit page, `stoic-wisdom-series` kit/reader-kit flow, `ukrainian-modernism` gift book.
- EPUB download: `ukrainian-modernism` gift book.
- Amazon/KDP links: `ukrainian-modernism`, `dao-toki`, `stoic-wisdom-series`, related books in `toki-free-kit`.
- Related projects/books links: TP-family repos via `moreBooks.ts`, `kits.ts`, and README related-project sections.
- Runtime verification diagnostics: README plugin fingerprints/checks in `toki-free-kit`; manual verification notes in TP plugin READMEs.

No ASCII/theme toggle was found in the audited files.

## 6. Proposed Package Extraction

### `packages/landing-core`

- Locale routing conventions, route helpers, default-locale redirects.
- Shared dictionary loading interface.
- Shared book/kit metadata types.
- Shared JSON-LD data shape builders where host/site URL is injectable.
- Common guards for static asset paths in middleware.

### `packages/landing-ui`

- Reusable visual components: `Header`, `Footer`, `LanguageSwitch`, `Hero`, `BookCard`, `BookGrid`, `BookSection`, `FAQ`, `Badge`, `GiftBadge`, `LeadMagnet`, `VideoModal`, `MoreBooks`.
- Shared interaction classes and accessibility states.
- Site theme tokens, while allowing per-app CSS/theme overrides to avoid visual regressions.

### `packages/landing-seo`

- Metadata builders for home, book detail, kit, gift, legal/privacy.
- Canonical and hreflang generation, including `tok`/`tp` compatibility for toki pona.
- OpenGraph/Twitter image helpers.
- Sitemap/robots generation or validation helpers.
- JSON-LD helpers for organization, website, book series, and books.

### `packages/landing-sitelen`

- Client wrapper around `sitelen-layer-plugin`.
- Shared plugin profile config for sitelen pona and sitelen emoji.
- TP-only scoping helpers and toggle mount conventions.
- Exclusion selectors for locale switcher, plugin UI, ignored links, and legal/contact text.
- Storage-key namespacing by app.

### `packages/landing-content`

- Shared content schemas and validation for dictionaries, books, kits, and related books.
- Optional per-site content registry that keeps each app's source copy separate.
- Asset manifest helpers that map book IDs/slugs to cover, promo, PDF, EPUB, OG, and teaser assets.
- Migration checks for missing assets and broken external links.

## 7. Migration Risk List

- Route breakage: `ukrainian-modernism` uses singular `/book/[id]`; the other repos use plural `/books/[id]`.
- Route breakage: root redirect defaults differ (`/fr` for Ukrainian Modernism, `/en` for TP-family repos).
- Route breakage: `/kit` is internal for `toki-free-kit` and `stoic-wisdom-series`, but external to `https://toki-free.abvx.xyz/` in `dao-toki`.
- Legal/privacy path changes: all legal/privacy pages are localized; do not collapse only to `/legal` or `/privacy`.
- CSS visual regressions: similar components have site-specific CSS modules and global CSS; extracting UI too aggressively may flatten distinct editorial styles.
- `sitelen-layer-plugin` not initializing on `/tp`: plugin depends on client component, `data-sitelen-layer-scope`, global CSS imports, and header toggle mount.
- `/en` affected by sitelen plugin: plugin scope must be absent outside `/tp`.
- Locale switcher transformed by plugin: preserve `data-locale-switcher` and exclusion selectors.
- Footer/contact/legal text transformed by plugin: preserve `data-sitelen-layer-ignore` where present.
- Missing PDFs/assets: copy both `public/books/*` and `public/assets/*`; `ukrainian-modernism` also has `public/downloads/*`.
- Font/plugin assets: preserve `vendor/sitelen-layer-plugin-0.1.1.tgz` and package CSS imports; do not expose extracted font files outside normal public/bundled paths.
- Metadata/canonical issues: hard-coded site bases exist in layouts and `src/lib/jsonld.ts`; migration needs app-specific host config.
- Sitemap issue: `toki-free-kit/public/sitemap.xml` currently lists `stoic.abvx.xyz` routes; decide whether to preserve as known source state or correct during migration.
- OpenGraph image loss: `ukrainian-modernism` has per-book localized OG images; TP-family repos have `og-image.jpg` and `twitter-card.jpg`.
- Broken external purchase/download links: preserve Amazon FR/US links, YouTube IDs, YouTube teaser URLs, and cross-site links to `toki-free`, `dao-toki`, `stoic`, and `toki`.
- Deployment differences: `ukrainian-modernism` documents Railway; the other three document Vercel. New monorepo deployment config must map each app/site to its expected host and route base.

## 8. Verification Checklist

Run this checklist for each migrated app/site:

- [ ] Install dependencies with npm.
- [ ] Run `npm run lint`.
- [ ] Run TypeScript typecheck if configured, or add an equivalent `tsc --noEmit` check.
- [ ] Run `npm run build`.
- [ ] Open the default locale route.
- [ ] Open every locale route.
- [ ] Open legal pages for every locale.
- [ ] Open privacy pages for every locale.
- [ ] Open book detail routes for every book in every locale.
- [ ] Open kit/gift routes where present.
- [ ] Verify root redirects and `/kit` redirect behavior.
- [ ] Verify PDF/download links and `download` behavior where used.
- [ ] Verify EPUB links for `ukrainian-modernism`.
- [ ] Verify cover, promo, partner, kit, and OpenGraph images render.
- [ ] Verify SEO metadata: canonical URL, alternates/hreflang, OpenGraph, Twitter card, robots, sitemap.
- [ ] Verify JSON-LD is present and uses the migrated app's correct host.
- [ ] Verify sitelen layer controls on `/tp` only for apps that enable them.
- [ ] Verify `/en` is not affected by `sitelen-layer-plugin`.
- [ ] Verify locale switcher text remains `EN / TP` and is not transformed by the plugin.
- [ ] Verify footer/contact/legal links are not transformed by the plugin.
- [ ] Compare desktop and mobile screenshots against the original live site.

## Recommended Migration Order

1. `stoic-wisdom-series`: representative TP plugin app with commercial books, free reader-kit flow, `/en/kit`, and related books.
2. `dao-toki`: same TP/plugin foundation but with SVG book assets, Chinese series content, and an external `/kit` redirect.
3. `toki-free-kit`: free-download focused site; migrate after shared kit/download and sitelen behavior is stable. Also address the checked-in sitemap host mismatch.
4. `ukrainian-modernism`: migrate last because it differs most: French/Ukrainian locales, singular `/book`, `/gift`, Railway note, localized per-book OG images, and PDF/EPUB gift downloads.
