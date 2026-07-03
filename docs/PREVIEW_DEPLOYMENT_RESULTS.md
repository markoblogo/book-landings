# Preview Deployment Results

Date: 2026-07-03

Purpose: validate monorepo preview deployments before production domain cutover. No production custom domains were switched during this pass.

## Summary

| App | Platform | App path | Preview URL | Deployment | Build status | Browser check | Cutover status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Stoic Wisdom Series | Vercel | `apps/stoic-wisdom-series` | `https://stoic-wisdom-series-6ystmwep3-abvcreative.vercel.app` | `dpl_4p8HwQc9srbqXSohKYGnirXjj2b1` | Ready | Passed smoke and Playwright preview parity | Preview approved |
| Toki Free Kit | Vercel | `apps/toki-free-kit` | `https://toki-free-gmi3n0j9f-abvcreative.vercel.app` | `dpl_4yZXwK3CN3vQ4oop3aSGrRQEJrEM` | Ready | Passed smoke and Playwright preview parity | Preview approved |
| Dao Toki | Vercel | `apps/dao-toki` | `https://dao-toki-f6jzqr8ok-abvcreative.vercel.app` | `dpl_CYbH8gJG7HcGXedTuzZpvp6cjSsB` | Ready | Passed smoke and Playwright preview parity | Preview approved |
| Ukrainian Modernism | Railway | `apps/ukrainian-modernism` | `https://ukrainian-modernism-monorepo-preview.up.railway.app` | `9f34da74-1858-4df4-9ed8-9b62cceb7d59` | Success | Passed smoke and Playwright preview parity | Preview approved |

## Corrected Vercel Settings

The first Vercel preview attempt used app-root/prebuilt local output. Those previews reached `READY`, but locale routes failed at runtime with `x-vercel-error: MIDDLEWARE_INVOCATION_FAILED`.

Corrected project settings for each Vercel app:

| Project | Git repository | Root Directory | Install Command | Build Command | Node | Outside root files |
| --- | --- | --- | --- | --- | --- | --- |
| `stoic-wisdom-series` | `markoblogo/book-landings` | `apps/stoic-wisdom-series` | `cd ../.. && npm install` | `cd ../.. && npm run build:packages && npm run build --workspace @book-landings/stoic-wisdom-series` | `22.x` | Enabled |
| `toki-free-kit` | `markoblogo/book-landings` | `apps/toki-free-kit` | `cd ../.. && npm install` | `cd ../.. && npm run build:packages && npm run build --workspace @book-landings/toki-free-kit` | `22.x` | Enabled |
| `dao-toki` | `markoblogo/book-landings` | `apps/dao-toki` | `cd ../.. && npm install` | `cd ../.. && npm run build:packages && npm run build --workspace @book-landings/dao-toki` | `22.x` | Enabled |

The corrected previews were deployed with remote Vercel builds, not prebuilt local output. Vercel deployment protection remains enabled for preview URLs; browser checks use an automation bypass header supplied from local environment only.

## Previous Broken Preview URLs

These deployments are superseded and are not approved:

| App | Broken preview | Issue |
| --- | --- | --- |
| Stoic Wisdom Series | `https://stoic-wisdom-series-5spxxcjab-abvcreative.vercel.app` | Runtime `MIDDLEWARE_INVOCATION_FAILED` |
| Toki Free Kit | `https://toki-free-nuob5mu5s-abvcreative.vercel.app` | Runtime `MIDDLEWARE_INVOCATION_FAILED` |
| Dao Toki | `https://dao-toki-ll5yo8ez3-abvcreative.vercel.app` | Runtime `MIDDLEWARE_INVOCATION_FAILED` |

## Smoke Results

Representative route smoke checks returned `200` on the corrected previews.

| App | Checked routes |
| --- | --- |
| Stoic Wisdom Series | `/`, `/en`, `/tp`, `/en/legal`, `/en/privacy`, `/en/books/marcus-meditations`, `/robots.txt`, `/sitemap.xml` |
| Toki Free Kit | `/`, `/en`, `/tp`, `/en/legal`, `/en/privacy`, `/en/books/readers-kit`, `/en/kit`, `/robots.txt`, `/sitemap.xml` |
| Dao Toki | `/`, `/en`, `/tp`, `/en/legal`, `/en/privacy`, `/en/books/dao-de-jing`, `/tp/books/sunzi`, `/robots.txt`, `/sitemap.xml` |
| Ukrainian Modernism | `/`, `/fr`, `/uk`, `/fr/legal`, `/uk/privacy`, `/fr/book/kosynka-gift`, `/robots.txt`, `/sitemap.xml` |

## Preview Parity Status

Environment variables supported by `playwright.config.ts`:

- `STOIC_PREVIEW_URL`
- `TOKI_FREE_KIT_PREVIEW_URL`
- `DAO_TOKI_PREVIEW_URL`
- `UKRAINIAN_MODERNISM_PREVIEW_URL`
- `VERCEL_PROTECTION_BYPASS`

Latest preview parity result:

```text
13 passed
```

Covered checks include locale routes, book detail routes, legal/privacy pages, image loading, local downloads for Toki Free Kit, sitelen controls on `/tp`, no sitelen controls on `/en`, and Ukrainian Modernism without sitelen controls.

## Cutover Decision

| App | Approved for production domain cutover? | Reason |
| --- | --- | --- |
| Stoic Wisdom Series | Yes, after owner visual review | Corrected Vercel preview builds and passes parity. |
| Toki Free Kit | Yes, after owner visual review | Corrected Vercel preview builds and passes parity, including download checks. |
| Dao Toki | Yes, after owner visual review | Corrected Vercel preview builds and passes parity, including book detail routes. |
| Ukrainian Modernism | Yes, after owner visual review | Railway preview builds and passes parity. |

Production cutover should still happen one app at a time with immediate production verification and rollback readiness.
