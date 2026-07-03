# Parity Testing

The browser parity suite checks the migrated book landing apps against the runtime behaviors that are most likely to regress during monorepo cutover.

## Commands

```bash
npm run test:parity
npm run test:parity:headed
```

Both commands build shared packages first, then start one Next dev server per app on fixed local ports:

- Stoic Wisdom Series: `4301`
- Toki Free Kit: `4302`
- Dao Toki: `4303`
- Ukrainian Modernism: `4304`
- Agro Library placeholder: `4305`

## Covered Apps

- `apps/stoic-wisdom-series`
- `apps/toki-free-kit`
- `apps/dao-toki`
- `apps/ukrainian-modernism`
- `apps/agro-library` placeholder smoke check only

## What The Tests Cover

- default localized routes render in a browser;
- legal/privacy pages render;
- book detail pages render where present;
- local image assets load;
- local PDF/EPUB download links return HTTP 200 where present;
- canonical paths match the route being tested;
- sitelen controls appear on `/tp` routes only;
- `/en` routes do not show sitelen controls;
- locale switchers stay readable after SP/emoji toggles;
- severe browser console errors and page errors fail the test.

## Intentional Limits

- The first implementation is not pixel-perfect screenshot testing.
- External purchase links are not fetched, because Amazon/KDP and other remote services can rate-limit or redirect by region.
- Static sitemap host checks are not enforced yet. Sitemap regeneration should be handled as part of production deployment cutover.
- The tests verify that SP/emoji mode toggles activate without crashing; they do not validate glyph-by-glyph rendering.

## Adding A New App

1. Add the app dev server to `playwright.config.ts`.
2. Add a Playwright project with a dedicated port and `baseURL`.
3. Create `tests/parity/<app-name>.spec.ts`.
4. Reuse helpers from `tests/parity/shared.ts`.
5. Cover localized routes, legal/privacy routes, book detail routes, local assets/downloads, feature flags, and console errors.
