# Deployment Matrix

This matrix records the deployment contract for the monorepo. The "Pre-cutover source" column preserves migration provenance; all four production domains now run from `markoblogo/book-landings` on `main`.

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

| App | App path | Intended production domain | Pre-cutover source | Platform target | Monorepo build command | Start command | Output directory | Static export | Next server runtime | Env vars | Sitemap URL | Smoke-test URLs |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Stoic Wisdom Series | `apps/stoic-wisdom-series` | `https://stoic.abvx.xyz` | Old `markoblogo/stoic-wisdom-series` repo, documented as Vercel | Vercel | `cd ../.. && npm run build:packages && npm run build --workspace @book-landings/stoic-wisdom-series` | `npm run start:stoic-wisdom-series` | Next.js default | No | Yes: Next App Router, proxy redirects, metadata routes | None currently required | `https://stoic.abvx.xyz/sitemap.xml` | `/`, `/en`, `/tp`, `/en/kit`, `/tp/kit`, `/en/legal`, `/en/privacy`, `/en/books/marcus-meditations`, `/tp/books/marcus-meditations`, `/robots.txt`, `/sitemap.xml` |
| Toki Free Kit | `apps/toki-free-kit` | `https://toki-free.abvx.xyz` | Old `markoblogo/toki-free-kit` repo, documented as Vercel | Vercel | `cd ../.. && npm run build:packages && npm run build --workspace @book-landings/toki-free-kit` | `npm run start:toki-free-kit` | Next.js default | No | Yes: Next App Router, kit routes, metadata routes | None currently required | `https://toki-free.abvx.xyz/sitemap.xml` | `/`, `/en`, `/tp`, `/en/kit`, `/tp/kit`, `/en/legal`, `/en/privacy`, `/en/books/readers-kit`, `/tp/books/readers-kit`, `/robots.txt`, `/sitemap.xml`, local PDF/download links |
| Dao Toki | `apps/dao-toki` | `https://dao-toki.abvx.xyz` | Old `markoblogo/dao-toki` repo, documented as Vercel | Vercel | `cd ../.. && npm run build:packages && npm run build --workspace @book-landings/dao-toki` | `npm run start:dao-toki` | Next.js default | No | Yes: Next App Router, proxy redirects, metadata routes | None currently required | `https://dao-toki.abvx.xyz/sitemap.xml` | `/`, `/en`, `/tp`, `/en/kit`, `/tp/kit`, `/en/legal`, `/en/privacy`, `/en/books/dao-de-jing`, `/tp/books/dao-de-jing`, `/en/books/sunzi`, `/tp/books/mozi-universal-love`, `/robots.txt`, `/sitemap.xml` |
| Ukrainian Modernism | `apps/ukrainian-modernism` | `https://ukrmodernism.abvx.xyz` | Old `markoblogo/ukrainian-modernism` repo, documented as Railway with Cloudflare DNS | Railway plus Cloudflare DNS | `npm run build --workspace @book-landings/ukrainian-modernism` after `npm run build:packages` | `npm run start:ukrainian-modernism` | `apps/ukrainian-modernism/.next` | No | Yes: Next App Router, proxy redirects, metadata routes | None currently required | `https://ukrmodernism.abvx.xyz/sitemap.xml` | `/`, `/fr`, `/uk`, `/fr/gift`, `/uk/gift`, `/fr/legal`, `/uk/legal`, `/fr/privacy`, `/uk/privacy`, `/fr/book/kosynka-gift`, `/uk/book/kosynka-gift`, `/robots.txt`, `/sitemap.xml` |

## Vercel Targets

Applies to:

- `apps/stoic-wisdom-series`
- `apps/toki-free-kit`
- `apps/dao-toki`

Working project settings:

- Git repository: `markoblogo/book-landings`
- Root Directory: `apps/<app-name>`
- Framework Preset: Next.js
- Install Command: `cd ../.. && npm install`
- Build Command: `cd ../.. && npm run build:packages && npm run build --workspace @book-landings/<app-package>`
- Output Directory: leave empty for Next.js managed output
- Node.js Version: `22.x`
- Include source files outside the Root Directory in the Build Step: enabled

No app-specific `vercel.json` is currently required. The apps use ordinary Next.js App Router builds and keep canonical domains in `src/site.config.ts`.

Latest verified preview URLs:

- Stoic Wisdom Series: `https://stoic-wisdom-series-6ystmwep3-abvcreative.vercel.app`
- Toki Free Kit: `https://toki-free-gmi3n0j9f-abvcreative.vercel.app`
- Dao Toki: `https://dao-toki-f6jzqr8ok-abvcreative.vercel.app`

The old app-root prebuilt flow produced `MIDDLEWARE_INVOCATION_FAILED`. The verified configuration above uses remote Vercel builds with app root directories and root workspace commands.

## Railway Target

Applies to:

- `apps/ukrainian-modernism`

Recommended service settings:

- Service root path: repository root, unless Railway workspace detection is confirmed with `apps/ukrainian-modernism`.
- Install Command: `npm install`
- Build Command: `npm run build:packages && npm run build --workspace @book-landings/ukrainian-modernism`
- Start Command: `npm run start:ukrainian-modernism`
- Public domain: `ukrmodernism.abvx.xyz` is attached to this Railway service and deploys from `markoblogo/book-landings` `main`.

Ukrainian Modernism intentionally keeps the Railway/Cloudflare deployment path documented in its app README. Do not move it to Vercel just for consistency unless the owner explicitly chooses that platform.

## Cloudflare Pages

No migrated app is currently targeted at Cloudflare Pages. These apps do not use `output: "export"` and should be treated as Next server-runtime deployments unless a Cloudflare-compatible Next adapter is introduced and verified.

## Cutover Record

The Vercel production aliases and the Railway custom domain were switched to monorepo deployments on 2026-07-15. Live Playwright parity passed for all 13 checks, and each production `robots.txt` and `sitemap.xml` returns `200`.

Keep the old repositories only as rollback references until the owner completes [the visual review](OWNER_VISUAL_REVIEW.md). Do not use them as deployment sources.
