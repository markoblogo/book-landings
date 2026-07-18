# AMI Team Publishing

`apps/agro-library` is the English-language publishing surface for free professional editions for physical commodity markets.

## Catalog Contract

Add reviewed books to `data/catalog.ts`.

- `englishBooks` contains English-language cards and copy.
- `ukrainianBooks` is displayed under the English heading `Books in Ukrainian`; every card must use Ukrainian title, summary, and download label, with `contentLanguage: "uk"`.
- Every item must have an existing cover and hosted download URL before its status becomes `available`.

## Publication Rules

- No language switcher or localized routes.
- Do not add investment advice, price forecasts, or return claims.
- Keep the footer ecosystem registry in `data/ecosystem.ts`; the owner supplies its links separately.
- Publisher: `AMI team`. Developer: `ABVx`. Contact: `abv@mn7r.com`.
