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

- The home page follows the shared book-landing grammar: white canvas, cover fan in the hero, `ALL FREE` badge, and print-led full-width book sections.
- Each `available` edition uses the red `ALL FREE` badge. An `upcoming` edition uses the blue `COMMING SOON` badge and never exposes placeholder files.
- A reviewed `print` image is required for every home-page book section. Prints open in a local lightbox; covers belong to the hero fan and book-detail pages.
- Every item is statically published at `/books/<slug>` with canonical metadata, Open Graph data, JSON-LD, and a sitemap entry.
- Future English editions are catalog additions: supply title/copy, cover, print, hosted formats, related project, and status.

## Publication Rules

- No language switcher or localized routes.
- Do not add investment advice, price forecasts, or return claims.
- Keep the footer ecosystem registry in `data/ecosystem.ts`.
- Publisher: `AMI team`. Developer: `ABVx`. Contact: `abv@mn7r.com`.
