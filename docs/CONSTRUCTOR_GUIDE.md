# Constructor Guide

Use this guide to create a new editorial/book landing app in this monorepo.

## 1. Create The App

Start from the closest migrated app, not from a blank framework template.

- For a content-first English/toki pona app with sitelen layers, start from `apps/stoic-wisdom-series`.
- For a free-download/PDF app, start from `apps/toki-free-kit`.
- For a multilingual classical text catalog, start from `apps/dao-toki`.
- For a cultural editorial app with no sitelen features, start from `apps/ukrainian-modernism`.

Copy into `apps/<new-app-id>` and update package name, routes, and config.

## 2. Define `site.config.ts`

Every app should have:

- `id`
- `name`
- `baseUrl`
- `defaultLocale`
- `locales`
- `assetBasePath`
- `features`
- `legal`
- optional `relatedProjects`

Use `SiteConfig` from `@book-landings/landing-core`.

## 3. Add Dictionaries

Place visible copy in:

```text
apps/<app>/src/dictionaries/<locale>.json
```

Keep locale-authored content separate. Do not rely on runtime translation for published copy.

## 4. Add Book Dataset

Place book metadata in:

```text
apps/<app>/src/data/books.ts
```

Include stable IDs/slugs, titles, authors, descriptions, asset paths, CTA links, download links, status flags, and external purchase links.

## 5. Add Assets

Put public assets under the app's own `public/` directory.

Common paths:

- `public/assets/books/<book-id>/cover.*`
- `public/assets/books/<book-id>/promo.*`
- `public/books/<slug>/<slug>.pdf`
- `public/og/*`

Run:

```bash
npm run check:assets
```

## 6. Enable Features

Use feature flags in `site.config.ts`:

- `bookDetails`
- `legalPages`
- `localizedLegalPages`
- `freeDownloads`
- `pdfAssets`
- `epubDownloads`
- `demoVideo`
- `demoVideos`
- `relatedProjects`
- `sitelenLayers`
- `culturalEditorial`
- `multilingualClassicalText`
- `runtimeVerificationDocs`

Keep disabled features absent from the UI.

## 7. Add Legal And Privacy Pages

Every public landing should include localized legal/privacy pages when the site has localized routes.

Preserve source copy when migrating. For new apps, add dictionary-backed legal/privacy copy before launch.

## 8. Configure SEO

Use `packages/landing-seo` for:

- canonical URLs
- OpenGraph image URLs
- Twitter image URLs
- hreflang alternates
- JSON-LD helpers where appropriate

Hard-coded domains should live in `site.config.ts`, not scattered through page files.

## 9. Deploy

Deploy each app independently.

Before domain cutover:

- build app
- open every locale
- open every book detail page
- open legal/privacy pages
- verify assets and downloads
- verify canonical/OG metadata
- compare screenshots against the source or design target

Keep old deployments live until the new app passes verification.
