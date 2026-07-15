# Old Repository Transition Plan

Production traffic for all four domains is now served from `markoblogo/book-landings` `main`. Keep the old repositories only as short-lived rollback references until the owner completes the visual review; they are no longer deployment sources.

## Global Steps

1. Keep the old repo public or archived, not deleted.
2. Keep its README migration notice pointing to `https://github.com/markoblogo/book-landings`.
3. Confirm owner visual approval in `docs/OWNER_VISUAL_REVIEW.md`.
4. Delete the old repo only after that approval; no DNS or deployment source points to it.

## `ukrainian-modernism`

- Recommendation: keep as public archive or mark as migrated.
- Old live URL: `https://ukrmodernism.abvx.xyz`
- New app: `apps/ukrainian-modernism`
- Railway production source is `markoblogo/book-landings` `main`.
- Preserve README demo video and cultural positioning in archive notice.

## `toki-free-kit`

- Recommendation: keep as public archive or mark as migrated.
- Old live URL: `https://toki-free.abvx.xyz`
- New app: `apps/toki-free-kit`
- Vercel production source is `markoblogo/book-landings` `main`; PDF, route, sitelen, and sitemap checks passed.

## `dao-toki`

- Recommendation: keep as public archive or mark as migrated.
- Old live URL: `https://dao-toki.abvx.xyz`
- New app: `apps/dao-toki`
- Vercel production source is `markoblogo/book-landings` `main`; `/kit` and related project links passed live parity.

## `stoic-wisdom-series`

- Recommendation: keep as public archive or mark as migrated.
- Old live URL: `https://stoic.abvx.xyz`
- New app: `apps/stoic-wisdom-series`
- Vercel production source is `markoblogo/book-landings` `main`; reader-kit routes, sitelen modes, and assets passed live parity.

## README Notice Template

```md
# Migrated

This repository has been migrated into the `book-landings` monorepo:

https://github.com/markoblogo/book-landings

The old repository remains available as an archive and rollback reference.
```
