# Features

## Book Catalog

Displays a curated collection of books or editorial editions. Metadata usually lives in `src/data/books.ts`; visible labels and descriptions usually live in locale dictionaries.

## Book Details

Localized detail or learn-more pages for each book. Route shape is app-specific:

- Ukrainian Modernism: `/{locale}/book/[id]`
- Toki/Dao/Stoic apps: `/{locale}/books/[id]`

## Legal And Privacy Pages

Localized legal/privacy pages under each locale. Do not collapse these to only `/legal` or `/privacy` unless a site explicitly changes its route design.

## Related Projects

External project links used for cross-navigation between ABVX projects, for example Toki Pona Translator, Toki Free Kit, Dao Toki, and Stoic Wisdom Series.

## PDF / Free Downloads

Links to local or remote PDF files. Local PDFs must remain in the app's `public/` directory and be verified by `npm run check:assets`.

## Demo Video Block

YouTube teaser or walkthrough links. Ukrainian Modernism has a README demo video; migrated book apps also use book teaser IDs.

## Sitelen Layers

Optional toki pona display layers using `sitelen-layer-plugin`.

Enabled apps:

- `toki-free-kit`
- `dao-toki`
- `stoic-wisdom-series`

Disabled apps:

- `ukrainian-modernism`

The feature changes display layers for authored toki pona content. It does not translate English, French, Ukrainian, or any other language.

## Cultural Editorial Variant

Used by Ukrainian Modernism. This preserves a magazine-style cultural presentation rather than forcing shared generic UI.

## Amazon / KDP Links

External purchase links for Kindle and print editions. Keep these as explicit outbound links and verify they remain unchanged during migration.

## External CTA Links

External CTAs include YouTube teasers, read-online links, related project links, and hosted download targets. Local asset checks skip remote URLs, but route and launch QA should still manually verify important outbound CTAs.
