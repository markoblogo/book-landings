# Migration Plan

This repo uses separate deployable apps in a monorepo, not a single dynamic `[site]` app. Each landing keeps its own route shape, visual direction, static assets, SEO host config, and optional runtime features.

## Migration Order

1. `stoic-wisdom-series`: content-first and already structured for reuse.
2. `toki-free-kit`: validates PDF/download flows and sitelen display layers.
3. `dao-toki`: validates book detail pages, SVG book assets, external `/kit` redirect, and sitelen layers.
4. `ukrainian-modernism`: validates French/Ukrainian locale handling, singular `/book` routes, gift download flow, and non-toki editorial design.
5. `agro-library`: build only after the constructor works across migrated sites.

## Per-Site Acceptance Criteria

### `stoic-wisdom-series`

- `/` redirects to `/en`.
- `/en`, `/tp`, `/en/kit`, `/tp/kit` work.
- Every `/en/books/[id]` and `/tp/books/[id]` route from the audit works.
- `sitelen-layer-plugin` is active only on `/tp`.
- `EN / TP` switcher and ignored footer/contact text are not transformed.
- Amazon links, reader-kit link, YouTube teasers, kit PDFs, OG/Twitter images, JSON-LD, canonical URLs, and hreflang tags match the source behavior.

### `toki-free-kit`

- `/` redirects to `/en`; `/kit` redirects to `/en/kit`.
- `/en`, `/tp`, localized kit, books, legal, and privacy routes work.
- Free PDF downloads work from `public/books/*` and kit PDFs work from `public/assets/kits/*`.
- `sitelen-layer-plugin` is active only on `/tp`.
- Sitemap host mismatch from the source audit is explicitly resolved before launch.
- Related series/book links remain intact.

### `dao-toki`

- `/` redirects to `/en`; `/kit` redirects externally to `https://toki-free.abvx.xyz/`.
- `/en`, `/tp`, localized book detail, legal, privacy, and kit routes work.
- SVG cover/promo assets render for `dao-de-jing`, `sunzi`, and `mozi-universal-love`.
- `sitelen-layer-plugin` is active only on `/tp`.
- Amazon links, YouTube teasers, related project links, OG/Twitter images, JSON-LD, canonical URLs, and `tok`/`tp` hreflang tags are preserved.

### `ukrainian-modernism`

- `/` redirects to `/fr`.
- `/fr`, `/uk`, `/fr/gift`, `/uk/gift`, localized legal/privacy routes work.
- Singular `/fr/book/[id]` and `/uk/book/[id]` routes work for every audited book.
- Gift PDF and EPUB downloads work.
- Per-book localized OG images remain available.
- Amazon FR links, YouTube teasers, partner assets, Railway/Node deployment requirements, JSON-LD, canonical URLs, and hreflang tags are preserved.

### `agro-library`

- Starts from the proven shared constructor only after the four source migrations pass.
- Uses shared types, content helpers, SEO helpers, and generic UI components without weakening older site behavior.
- Adds only app-specific content, assets, routes, and styling needed for the new editorial landing.

## Shared Package Extraction Plan

### `packages/landing-core`

- Keep stable config and metadata types: `SiteConfig`, `LocaleConfig`, `BookItem`, `BookLink`, `LandingFeatureFlags`, `LegalConfig`, `AssetConfig`.
- Add only framework-agnostic helpers here.
- Do not place Next.js, React, or plugin runtime code in core.

### `packages/landing-content`

- Centralize dictionary lookup, locale fallback, and book lookup helpers.
- Add schema validation only after migrated content shape stabilizes.
- Keep per-site dictionaries and datasets app-owned unless content is truly shared.

### `packages/landing-ui`

- Provide unopinionated editorial primitives with `className`, `variant`, and CSS variable escape hatches.
- Do not force the same design on all sites.
- Move source components into this package only when two migrated apps use the same behavior.

### `packages/landing-seo`

- Centralize canonical URL, OpenGraph image, metadata, hreflang, sitemap, and JSON-LD helpers.
- Require site-specific host config so hard-coded source domains do not leak across apps.
- Preserve `tok` and compatibility `tp` alternates for toki pona apps.

### `packages/landing-sitelen`

- Keep the integration optional and feature-flagged.
- Provide TP-only scoping, language-switcher protection, ignored-content protection, and runtime verification notes.
- Do not import or initialize `sitelen-layer-plugin` unless the app enables the feature.

## Rollback Strategy

- Keep each old source repository and deployment live until its migrated app passes acceptance checks and domain cutover is complete.
- Migrate one app at a time; do not batch domain moves.
- Before cutover, compare source and migrated screenshots for default locale, every locale, legal/privacy, book detail pages, and download/kit routes.
- If cutover fails, point DNS/deployment routing back to the old app and keep the monorepo app disabled while fixes are made.
- Preserve old repo commit SHAs used for comparison in migration PR notes.

## Keeping Old Repos And Domains Alive

- Do not archive or delete old repos during migration.
- Do not change old production domains until the matching app is deployed and verified in this monorepo.
- Use preview deployments or temporary hostnames for migrated apps.
- Keep source sitemaps, robots files, OG images, PDFs, EPUBs, and vendor/plugin files available until new assets are verified.
- After domain cutover, monitor canonical URLs, sitemap URLs, download links, and external purchase links before deprecating old deployments.
