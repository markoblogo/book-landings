# Parity Matrix

## Ukrainian Modernism

- Original repo: `https://github.com/markoblogo/ukrainian-modernism`
- New app path: `apps/ukrainian-modernism`
- Original live URL: `https://ukrmodernism.abvx.xyz`
- Expected routes: `/`, `/fr`, `/uk`, `/{fr,uk}/book/[id]`, `/{fr,uk}/gift`, `/{fr,uk}/legal`, `/{fr,uk}/privacy`
- Migration status: migrated
- Build status: passed
- Manual verification status: local route, asset, gift PDF/EPUB, OG, demo video, no-sitelen checks passed
- Known differences: metadata domain values now come from `src/site.config.ts`
- Follow-up tasks: visual screenshot comparison against production; deployment cutover planning

## Toki Free Kit

- Original repo: `https://github.com/markoblogo/toki-free-kit`
- New app path: `apps/toki-free-kit`
- Original live URL: `https://toki-free.abvx.xyz`
- Expected routes: `/`, `/en`, `/tp`, `/kit`, `/{en,tp}/kit`, `/{en,tp}/books/[id]`, `/{en,tp}/legal`, `/{en,tp}/privacy`
- Migration status: migrated
- Build status: passed
- Manual verification status: local route, PDF, image, book detail, legal/privacy, TP scope, and Playwright browser parity checks passed
- Known differences: copied sitemap retains source host mismatch risk noted in audit
- Follow-up tasks: fix or regenerate sitemap before production cutover

## Dao Toki

- Original repo: `https://github.com/markoblogo/dao-toki`
- New app path: `apps/dao-toki`
- Original live URL: `https://dao-toki.abvx.xyz`
- Expected routes: `/`, `/en`, `/tp`, `/kit`, `/{en,tp}/kit`, `/{en,tp}/books/[id]`, `/{en,tp}/legal`, `/{en,tp}/privacy`
- Migration status: migrated
- Build status: passed
- Manual verification status: local route, SVG asset, related-link, book detail, legal/privacy, TP scope, and Playwright browser parity checks passed
- Known differences: `/kit` runtime redirects to `/en/kit` because proxy handles bare paths before the external redirect page
- Follow-up tasks: decide whether `/kit` should remain localized or become external

## Stoic Wisdom Series

- Original repo: `https://github.com/markoblogo/stoic-wisdom-series`
- New app path: `apps/stoic-wisdom-series`
- Original live URL: `https://stoic.abvx.xyz`
- Expected routes: `/`, `/en`, `/tp`, `/kit`, `/{en,tp}/kit`, `/{en,tp}/books/[id]`, `/{en,tp}/legal`, `/{en,tp}/privacy`
- Migration status: migrated
- Build status: passed
- Manual verification status: local route, asset, book detail, legal/privacy, TP scope, and Playwright browser parity checks passed
- Known differences: metadata domain values now come from `src/site.config.ts`
- Follow-up tasks: visual screenshot comparison against production
