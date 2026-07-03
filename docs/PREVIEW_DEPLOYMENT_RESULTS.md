# Preview Deployment Results

Date: 2026-07-03

Purpose: validate monorepo preview deployments before production domain cutover. No production custom domains were switched during this pass.

## Summary

| App | Platform | App path | Preview URL | Deployment | Build status | Browser check | Cutover status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Stoic Wisdom Series | Vercel | `apps/stoic-wisdom-series` | https://stoic-wisdom-series-5spxxcjab-abvcreative.vercel.app | `dpl_4izVHEXRqjHgWpJ8s7zxgM9ckGPH` | Ready | Failed: proxy route runtime 500 | Not approved |
| Toki Free Kit | Vercel | `apps/toki-free-kit` | https://toki-free-nuob5mu5s-abvcreative.vercel.app | `dpl_3w9nUWYbUHFYQUcVRxjiYtsyETeV` | Ready | Failed: proxy route runtime 500 | Not approved |
| Dao Toki | Vercel | `apps/dao-toki` | https://dao-toki-ll5yo8ez3-abvcreative.vercel.app | `dpl_Gzy8WUwedXrGC6ZS1P1n1nk6HMNP` | Ready | Failed: proxy route runtime 500 | Not approved |
| Ukrainian Modernism | Railway | `apps/ukrainian-modernism` | https://ukrainian-modernism-monorepo-preview.up.railway.app | `9f34da74-1858-4df4-9ed8-9b62cceb7d59` | Success | Passed smoke and parity checks | Preview approved, pending owner visual review |

## Vercel Preview Notes

The three Vercel apps were deployed as separate projects from the monorepo app paths. The builds completed and the deployments reached the Vercel `READY` state.

The Vercel team has deployment protection enabled for non-custom deployment URLs. Automation bypass was enabled for browser checks, but the bypass secret is intentionally not stored in this repository.

After bypassing deployment protection, the preview URLs returned `500` with `x-vercel-error: MIDDLEWARE_INVOCATION_FAILED` on locale routes. Playwright parity therefore failed for the Vercel apps before route-level assertions could pass.

Current assessment: the Vercel app-root/prebuilt preview flow is not yet equivalent to the intended Git-connected monorepo deployment for these proxy-backed Next.js apps. Do not cut over the production domains for Stoic Wisdom Series, Toki Free Kit, or Dao Toki until Vercel project root/build settings are corrected and parity tests pass.

Recommended next action:

- Confirm each Vercel project is connected to `markoblogo/book-landings`.
- Set Root Directory to the matching `apps/<app-name>` path in the Vercel dashboard.
- Keep the install/build commands workspace-compatible.
- Redeploy from Git rather than relying on local app-root prebuilt output.
- Re-run preview parity with deployment-protection bypass headers.

## Railway Preview Notes

Ukrainian Modernism was deployed to a new Railway environment named `monorepo-preview` under the existing `ukrmodernism` project.

The first Railway attempt failed because the detected Node.js version was 18.20.5. Next.js requires Node.js 20.9.0 or newer. The monorepo now declares `node >=22.13.0`, and the second deployment succeeded.

Railway preview checks:

| Route | Result |
| --- | --- |
| `/` | `307`, expected locale redirect |
| `/fr` | `200` |
| `/uk` | `200` |
| `/fr/legal` | `200` |
| `/uk/privacy` | `200` |
| `/fr/book/kosynka-gift` | `200` |
| `/robots.txt` | `200` |
| `/sitemap.xml` | `200` |

Playwright preview parity for Ukrainian Modernism passed all covered checks.

## Preview Parity Status

Environment variables supported by `playwright.config.ts`:

- `STOIC_PREVIEW_URL`
- `TOKI_FREE_KIT_PREVIEW_URL`
- `DAO_TOKI_PREVIEW_URL`
- `UKRAINIAN_MODERNISM_PREVIEW_URL`
- `VERCEL_PROTECTION_BYPASS`

Result from the preview run:

- Ukrainian Modernism: passed.
- Stoic Wisdom Series: failed due Vercel runtime 500.
- Toki Free Kit: failed due Vercel runtime 500.
- Dao Toki: failed due Vercel runtime 500.

## Cutover Decision

| App | Approved for production domain cutover? | Reason |
| --- | --- | --- |
| Stoic Wisdom Series | No | Preview build is ready, but runtime routes fail on Vercel. |
| Toki Free Kit | No | Preview build is ready, but runtime routes fail on Vercel. |
| Dao Toki | No | Preview build is ready, but runtime routes fail on Vercel. |
| Ukrainian Modernism | Not yet final; preview approved | Railway preview works. Complete owner visual, mobile, OG, and DNS review before switching production. |

