# Deployment Matrix

This matrix prepares production deployment from the monorepo without switching domains yet. Keep old deployments live until preview parity is verified app by app.

## Common Commands

Run from the repository root:

```bash
npm install
npm run build
npm run lint
npm run typecheck
npm run check:assets
npm run test:parity
```

Local production smoke pattern:

```bash
npm run build
npm run start:<app>
```

The `start:<app>` scripts assume the matching app has already been built.

## Apps

| App | App path | Intended production domain | Current old deployment source | Platform target | Monorepo build command | Start command | Output directory | Static export | Next server runtime | Env vars | Sitemap URL | Smoke-test URLs |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Stoic Wisdom Series | `apps/stoic-wisdom-series` | `https://stoic.abvx.xyz` | Old `markoblogo/stoic-wisdom-series` repo, documented as Vercel | Vercel | `npm run build --workspace @book-landings/stoic-wisdom-series` after `npm run build:packages` | `npm run start:stoic-wisdom-series` | `apps/stoic-wisdom-series/.next` | No | Yes: Next App Router, proxy redirects, metadata routes | None currently required | `https://stoic.abvx.xyz/sitemap.xml` | `/`, `/en`, `/tp`, `/en/kit`, `/tp/kit`, `/en/legal`, `/en/privacy`, `/en/books/marcus-meditations`, `/tp/books/marcus-meditations`, `/robots.txt`, `/sitemap.xml` |
| Toki Free Kit | `apps/toki-free-kit` | `https://toki-free.abvx.xyz` | Old `markoblogo/toki-free-kit` repo, documented as Vercel | Vercel | `npm run build --workspace @book-landings/toki-free-kit` after `npm run build:packages` | `npm run start:toki-free-kit` | `apps/toki-free-kit/.next` | No | Yes: Next App Router, kit routes, metadata routes | None currently required | `https://toki-free.abvx.xyz/sitemap.xml` | `/`, `/en`, `/tp`, `/en/kit`, `/tp/kit`, `/en/legal`, `/en/privacy`, `/en/books/readers-kit`, `/tp/books/readers-kit`, `/robots.txt`, `/sitemap.xml`, local PDF/download links |
| Dao Toki | `apps/dao-toki` | `https://dao-toki.abvx.xyz` | Old `markoblogo/dao-toki` repo, documented as Vercel | Vercel | `npm run build --workspace @book-landings/dao-toki` after `npm run build:packages` | `npm run start:dao-toki` | `apps/dao-toki/.next` | No | Yes: Next App Router, proxy redirects, metadata routes | None currently required | `https://dao-toki.abvx.xyz/sitemap.xml` | `/`, `/en`, `/tp`, `/en/kit`, `/tp/kit`, `/en/legal`, `/en/privacy`, `/en/books/dao-de-jing`, `/tp/books/dao-de-jing`, `/en/books/sunzi`, `/tp/books/mozi-universal-love`, `/robots.txt`, `/sitemap.xml` |
| Ukrainian Modernism | `apps/ukrainian-modernism` | `https://ukrmodernism.abvx.xyz` | Old `markoblogo/ukrainian-modernism` repo, documented as Railway with Cloudflare DNS | Railway plus Cloudflare DNS | `npm run build --workspace @book-landings/ukrainian-modernism` after `npm run build:packages` | `npm run start:ukrainian-modernism` | `apps/ukrainian-modernism/.next` | No | Yes: Next App Router, proxy redirects, metadata routes | None currently required | `https://ukrmodernism.abvx.xyz/sitemap.xml` | `/`, `/fr`, `/uk`, `/fr/gift`, `/uk/gift`, `/fr/legal`, `/uk/legal`, `/fr/privacy`, `/uk/privacy`, `/fr/book/kosynka-gift`, `/uk/book/kosynka-gift`, `/robots.txt`, `/sitemap.xml` |

## Vercel Targets

Applies to:

- `apps/stoic-wisdom-series`
- `apps/toki-free-kit`
- `apps/dao-toki`

Recommended project settings:

- Root Directory: `apps/<app-name>`
- Framework Preset: Next.js
- Install Command: `npm install`
- Build Command: `npm run build:packages && npm run build --workspace @book-landings/<app-package>`
- Output Directory: leave empty for Next.js managed output

No app-specific `vercel.json` is currently required. The apps use ordinary Next.js App Router builds and keep canonical domains in `src/site.config.ts`.

Owner decision before cutover: confirm Vercel installs from the repository root when Root Directory is set to `apps/<app-name>`. If the preview cannot resolve workspace packages, use repository root as the Vercel project root and set the build command to the app-specific workspace command above.

## Railway Target

Applies to:

- `apps/ukrainian-modernism`

Recommended service settings:

- Service root path: repository root, unless Railway workspace detection is confirmed with `apps/ukrainian-modernism`.
- Install Command: `npm install`
- Build Command: `npm run build:packages && npm run build --workspace @book-landings/ukrainian-modernism`
- Start Command: `npm run start:ukrainian-modernism`
- Public domain: keep Cloudflare DNS pointed at the old deployment until preview verification passes.

Ukrainian Modernism intentionally keeps the Railway/Cloudflare deployment path documented in its app README. Do not move it to Vercel just for consistency unless the owner explicitly chooses that platform.

## Cloudflare Pages

No migrated app is currently targeted at Cloudflare Pages. These apps do not use `output: "export"` and should be treated as Next server-runtime deployments unless a Cloudflare-compatible Next adapter is introduced and verified.

## Domain Cutover Rule

Do not switch DNS or production aliases until:

1. The app has a green preview deployment.
2. `npm run build`, `npm run lint`, `npm run typecheck`, `npm run check:assets`, and `npm run test:parity` pass from the monorepo.
3. Preview smoke URLs match the current production site.
4. Sitemap, robots, canonical URLs, OG previews, downloads, and sitelen controls are verified on the preview hostname.
