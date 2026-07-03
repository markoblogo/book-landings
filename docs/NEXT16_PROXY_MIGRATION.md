# Next 16 Proxy Migration

Next.js 16 deprecates the `middleware` file convention in favor of `proxy`. This inventory records the migrated locale-routing files and the route behavior that must remain stable.

## Inventory

| App | Previous file | New file | Purpose | Locale redirects | Rewrites | Relative redirect/rewrite URLs | Edge runtime dependency | Safe to migrate |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `apps/dao-toki` | `src/middleware.ts` | `src/proxy.ts` | Adds default locale prefix for non-localized page URLs. | Yes: `/` -> `/en`; `/kit` -> `/en/kit`; bare non-file paths -> `/en/*`. | No. | No relative string redirects; migrated code uses `request.nextUrl.clone()` and redirects with an absolute `NextURL`. | No explicit Edge runtime and no Edge-only APIs. | Yes. |
| `apps/stoic-wisdom-series` | `src/middleware.ts` | `src/proxy.ts` | Adds default locale prefix for non-localized page URLs. | Yes: `/` -> `/en`; `/kit` -> `/en/kit`; bare non-file paths -> `/en/*`. | No. | No relative string redirects; migrated code uses `request.nextUrl.clone()` and redirects with an absolute `NextURL`. | No explicit Edge runtime and no Edge-only APIs. | Yes. |
| `apps/ukrainian-modernism` | `src/middleware.ts` | `src/proxy.ts` | Adds default locale prefix and preserves `x-lang` request header for localized page requests. | Yes: `/` -> `/fr`; bare non-file paths -> `/fr/*`. | No. | No relative string redirects; migrated code uses `request.nextUrl.clone()` and redirects with an absolute `NextURL`. | No explicit Edge runtime and no Edge-only APIs. | Yes. |

No `middleware.js` files were present. `apps/toki-free-kit` and `apps/agro-library` did not have middleware files at migration time.

## Route Behavior Before/After

Expected behavior is unchanged:

- Dao Toki: `/` redirects to `/en`; `/en`, `/tp`, book detail, legal/privacy routes render; `/kit` redirects to `/en/kit`.
- Stoic Wisdom Series: `/` redirects to `/en`; `/en`, `/tp`, book detail, legal/privacy routes render; `/kit` redirects to `/en/kit`.
- Ukrainian Modernism: `/` redirects to `/fr`; `/fr`, `/uk`, book, gift, legal/privacy routes render.

## Special `/kit` Note

`/kit` behavior was intentionally preserved. In `dao-toki` and `stoic-wisdom-series`, the proxy adds the default locale before app route resolution, so `/kit` becomes `/en/kit`. This matches the documented post-migration behavior and was not changed in this task.

If owners want `dao-toki /kit` to use the older external redirect page instead, that should be handled as a separate routing decision because it changes current runtime parity.

## Verification

Run after any proxy change:

```bash
npm run lint
npm run typecheck
npm run build
npm run check:assets
npm run test:parity
```

The parity suite covers default-locale redirects indirectly through localized routes and app behavior. For production cutover, also spot-check the bare redirects (`/`, `/kit`) against the deployed preview URL.
