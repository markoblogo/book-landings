# Book Landings

[![CI](https://github.com/markoblogo/book-landings/actions/workflows/ci.yml/badge.svg)](https://github.com/markoblogo/book-landings/actions/workflows/ci.yml)
[![Live sites](https://github.com/markoblogo/book-landings/actions/workflows/live-sites.yml/badge.svg)](https://github.com/markoblogo/book-landings/actions/workflows/live-sites.yml)
[![Release](https://img.shields.io/github/v/release/markoblogo/book-landings)](https://github.com/markoblogo/book-landings/releases)
[![License: MIT](https://img.shields.io/badge/code-MIT-blue.svg)](LICENSE)

Five independently deployed publishing sites, one tested Next.js monorepo.

`book-landings` provides reusable content, SEO, locale, UI, and sitelen-layer packages while each site keeps its own routes, visual identity, assets, legal pages, domain, and deployment target. It is useful when several small editorial sites need shared engineering without becoming one generic template.

The shared packages provide reusable constructor pieces without forcing one design system across every landing.

## Quick Start

Requirements: Node.js 22 and npm.

```bash
git clone https://github.com/markoblogo/book-landings.git
cd book-landings
npm ci
npm run dev:agro-library
```

Open `http://localhost:3000`. Replace the final command with `dev:ukrainian-modernism`, `dev:toki-free-kit`, `dev:dao-toki`, or `dev:stoic-wisdom-series` to run another site.

Before opening a pull request:

```bash
npm run verify
npx playwright install chromium
npm run test:parity
```

## Apps

| App | Path | Live URL | Locales | Key features | Dev command | Status |
| --- | --- | --- | --- | --- | --- | --- |
| Ukrainian Modernism | `apps/ukrainian-modernism` | `https://ukrmodernism.abvx.xyz` | `fr`, `uk` | book catalog, singular book detail routes, localized legal/privacy, gift PDF/EPUB, demo video, cultural editorial variant | `npm run dev:ukrainian-modernism` | migrated |
| Toki Free Kit | `apps/toki-free-kit` | `https://toki-free.abvx.xyz` | `en`, `tp` | free PDFs, book detail routes, localized legal/privacy, sitelen layers, runtime verification docs | `npm run dev:toki-free-kit` | migrated |
| Dao Toki | `apps/dao-toki` | `https://dao-toki.abvx.xyz` | `en`, `tp` | Chinese Wisdom catalog, book detail routes, related projects, localized legal/privacy, sitelen layers | `npm run dev:dao-toki` | migrated |
| Stoic Wisdom Series | `apps/stoic-wisdom-series` | `https://stoic.abvx.xyz` | `en`, `tp` | Stoic catalog, book detail routes, reader kit flow, localized legal/privacy, sitelen layers | `npm run dev:stoic-wisdom-series` | migrated |
| AMI Team Publishing | `apps/agro-library` | `https://books.1d3x.com` | `en` shell; Ukrainian book cards | Free professional books for physical commodity markets, with a headerless animated English cover fan, print-led book sections, individual SEO book pages, English/Ukrainian catalog sections, downloads, FAQ, and legal/privacy pages | `npm run dev:agro-library` | production matrix complete; future editions are data additions |

## Shared Packages

| Package | Purpose |
| --- | --- |
| `packages/landing-core` | Site config, locale config, book/link/asset/legal types, feature flags, common URL/locale helpers. |
| `packages/landing-content` | Dictionary lookup, locale fallback, and book dataset helpers. |
| `packages/landing-ui` | Generic minimally styled editorial primitives for new apps when visual parity allows reuse. |
| `packages/landing-seo` | Canonical URL, OpenGraph, metadata, hreflang, and JSON-LD helpers. |
| `packages/landing-sitelen` | Optional `sitelen-layer-plugin` profile helpers for toki pona apps only. |

## Root Commands

```bash
npm install
npm run lint
npm run typecheck
npm run build
npm run check:assets
```

Targeted app commands:

```bash
npm run build --workspace @book-landings/ukrainian-modernism
npm run build --workspace @book-landings/toki-free-kit
npm run build --workspace @book-landings/dao-toki
npm run build --workspace @book-landings/stoic-wisdom-series
npm run build --workspace @book-landings/agro-library
```

## Route Summary

| App | Important routes |
| --- | --- |
| Ukrainian Modernism | `/` -> `/fr`, `/fr`, `/uk`, `/{fr,uk}/book/[id]`, `/{fr,uk}/gift`, `/{fr,uk}/legal`, `/{fr,uk}/privacy` |
| Toki Free Kit | `/` -> `/en`, `/kit` -> `/en/kit`, `/{en,tp}`, `/{en,tp}/kit`, `/{en,tp}/books/[id]`, legal/privacy |
| Dao Toki | `/` -> `/en`, `/kit` -> `/en/kit`, `/{en,tp}`, `/{en,tp}/kit`, `/{en,tp}/books/[id]`, legal/privacy |
| Stoic Wisdom Series | `/` -> `/en`, `/kit` -> `/en/kit`, `/{en,tp}`, `/{en,tp}/kit`, `/{en,tp}/books/[id]`, legal/privacy |

## Deployment Notes

- Keep each app independently deployable. Do not collapse migrated sites into a single dynamic `[site]` app.
- Configure production domains per app from `src/site.config.ts`.
- Ukrainian Modernism was documented on Railway with Cloudflare DNS.
- Toki Free Kit, Dao Toki, and Stoic Wisdom Series were documented on Vercel.
- All five production domains deploy from this monorepo. The previous standalone repositories remain rollback references where they still exist.
- AMI books alias check: after each production deploy, run Vercel alias verification so stale aliases are blocked before merge. Use `scripts/verify-books-alias.sh` with `VERIFY_EXPECTED_DEPLOYMENT_ID` and the `VERCEL_TOKEN`/`VERCEL_SCOPE_ID` secrets (or call `.github/workflows/verify-books-alias.yml` with the deployment id).
- `npm run verify:live` checks all five public roots, redirects, titles, canonicals, robots files, and sitemaps. GitHub Actions repeats this check every Monday.

## Contributing and License

See [CONTRIBUTING.md](CONTRIBUTING.md) for the validation workflow and [SECURITY.md](SECURITY.md) for private vulnerability reporting. Source code is MIT licensed. Book files, cover art, illustrations, videos, and editorial content remain under their respective rights; see [LICENSE_SCOPE.md](LICENSE_SCOPE.md).

## Documentation

- [Migration audit](docs/MIGRATION_AUDIT.md)
- [Migration plan](docs/MIGRATION_PLAN.md)
- [Constructor guide](docs/CONSTRUCTOR_GUIDE.md)
- [Feature flags and capabilities](docs/FEATURES.md)
- [Parity matrix](docs/PARITY_MATRIX.md)
- [Old repository transition plan](docs/OLD_REPOS_TRANSITION.md)

<!-- ABVX:ECOSYSTEM:BEGIN -->
## ABVX ecosystem

- [AGENTS.md_generator](https://agentsmd.abvx.xyz/) — Keeps repository guidance and machine-readable context current. Current release: `v0.5.1`.
- [abvx-shortener](https://go.abvx.xyz/) — Uses stable short links for public campaigns and QR destinations. Current release: `v0.3.1`.
- [abvx-agent-skills](https://abvx.xyz/work/abvx-agent-skills) — Uses shared, reviewable agent capabilities during maintenance. Current release: `v0.15.0`.

_This block is generated from the reviewed ABVX ecosystem registry._
<!-- ABVX:ECOSYSTEM:END -->
