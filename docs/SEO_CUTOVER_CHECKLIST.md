# SEO Cutover Checklist

Use this before switching production domains from the old standalone repos to the monorepo apps.

## Shared Rules

- Canonical URLs are generated from each app `site.config.ts` or `site.config.ts` equivalent.
- Sitemaps and robots use Next.js Metadata File routes: `app/sitemap.ts` and `app/robots.ts`.
- Sitemaps list page routes only. PDF, EPUB, image, and other download assets are not listed as page URLs.
- Locale alternates are emitted for localized page groups.
- Preview deployment domains are intentionally not used for canonical or sitemap output.

## Apps

| App | Production domain | Canonical base URL | Sitemap URL | Robots URL | OG image status | Locale alternate status | Known SEO differences |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Stoic Wisdom Series | `https://stoic.abvx.xyz` | `https://stoic.abvx.xyz` | `https://stoic.abvx.xyz/sitemap.xml` | `https://stoic.abvx.xyz/robots.txt` | `/og-image.jpg`, `/twitter-card.jpg`; book pages use promo/cover image URLs | `en`, `tok` for home, kit, legal/privacy, book detail routes | Static sitemap/robots replaced by generated Metadata File routes. |
| Toki Free Kit | `https://toki-free.abvx.xyz` | `https://toki-free.abvx.xyz` | `https://toki-free.abvx.xyz/sitemap.xml` | `https://toki-free.abvx.xyz/robots.txt` | `/og-image.jpg`, `/twitter-card.jpg`; book pages use promo/cover image URLs | `en`, `tok` for home, kit, legal/privacy, book detail routes | Source sitemap host mismatch (`stoic.abvx.xyz`) is fixed; downloads/PDFs are not sitemap page URLs. |
| Dao Toki | `https://dao-toki.abvx.xyz` | `https://dao-toki.abvx.xyz` | `https://dao-toki.abvx.xyz/sitemap.xml` | `https://dao-toki.abvx.xyz/robots.txt` | `/og-image.jpg`, `/twitter-card.jpg`; book pages use promo/cover image URLs | `en`, `tok` for home, kit, legal/privacy, book detail routes | `/kit` remains canonical as localized `/en/kit` and `/tp/kit`; bare `/kit` still redirects to `/en/kit`. |
| Ukrainian Modernism | `https://ukrmodernism.abvx.xyz` | `https://ukrmodernism.abvx.xyz` | `https://ukrmodernism.abvx.xyz/sitemap.xml` | `https://ukrmodernism.abvx.xyz/robots.txt` | `/og/og-fr.jpg`, `/og/og-uk.jpg`, `/og/og-x.jpg`, and per-book `/og/books/*.{fr,uk}.png` | `fr`, `uk` for home, gift, legal/privacy, and book detail routes | Static sitemap/robots replaced by generated Metadata File routes. |
| Agro Library | `https://agro-library.abvx.xyz` | `https://agro-library.abvx.xyz` | `https://agro-library.abvx.xyz/sitemap.xml` | `https://agro-library.abvx.xyz/robots.txt` | Placeholder metadata only | `en` only | Domain requires owner confirmation before real launch. Placeholder app should not be treated as production-ready content. |

## Cutover Checks

1. Deploy each app from the monorepo with the correct app root.
2. Open `/robots.txt` and verify the sitemap URL uses the production domain.
3. Open `/sitemap.xml` and verify no source repo preview/stale host appears.
4. Inspect page source for localized home, legal/privacy, and book detail pages.
5. Verify canonical URLs use production domains and localized paths.
6. Verify OpenGraph images return HTTP 200.
7. Re-run `npm run test:parity` before switching DNS or deployment source.
