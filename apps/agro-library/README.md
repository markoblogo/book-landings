# AMI Team Publishing

`apps/agro-library` is the English-language publishing surface for free professional editions for physical commodity markets at `books.1d3x.com`.

## Catalog Contract

Add reviewed books to `data/catalog.ts`.

- `englishBooks` contains English-language cards and copy. New planned editions are English by default unless their source material explicitly says otherwise.
- `ukrainianBooks` is displayed under the English heading `Books in Ukrainian`; every card must use Ukrainian title, summary, and download label, with `contentLanguage: "uk"`.
- English publications are grouped into `product-guides` and `professional-guides`, so future books do not require a page redesign.
- Every available item must have an existing cover and hosted download URL. `upcoming` items may have a cover but must not expose placeholder downloads.
- Downloads remain on existing hosts; do not mirror them without an explicit publishing decision.

## Presentation And SEO Contract

- This is the completed production matrix for `books.1d3x.com`. Preserve its white canvas, headerless hero, single `ALL FREE` badge beside the hero copy, English-only animated cover fan, print-led full-width book sections, FAQ, and compact footer.
- The hero fan contains English editions only. Ukrainian editions remain in their dedicated catalog section.
- Each `available` edition uses the red `ALL FREE` badge. An `upcoming` edition uses the blue `COMMING SOON` badge and never exposes placeholder files.
- A reviewed `print` image is required for every home-page book section. Prints open in a local lightbox; covers belong to the hero fan and book-detail pages.
- Every item is statically published at `/books/<slug>` with canonical metadata, Open Graph data, JSON-LD, and a sitemap entry.
- Future editions are catalog additions, not redesigns: supply title/copy, cover, print, hosted formats, related project, group, language, and status in `data/catalog.ts`.

## Publication Rules

- No language switcher or localized routes.
- Do not add investment advice, price forecasts, or return claims.
- Keep the footer ecosystem registry in `data/ecosystem.ts`.
- Publisher: `AMI team`. Developer: `ABVx`. Contact: `abv@mn7r.com`.
