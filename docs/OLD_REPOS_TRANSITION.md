# Old Repository Transition Plan

Do not delete old repositories immediately. Keep them available as archives and rollback references until production traffic is safely served from this monorepo.

## Global Steps

1. Keep the old repo public or archived, not deleted.
2. Add a README notice: migrated to `https://github.com/markoblogo/book-landings`.
3. Keep old deployments live until the matching monorepo app is deployed and verified.
4. Compare production screenshots, routes, assets, downloads, metadata, legal/privacy pages, and outbound links.
5. Cut over one domain at a time.
6. After cutover, either point deployment source to the monorepo app or add stable redirects.
7. Keep old Git history where possible. If not possible, document migration date and source commit.

## `ukrainian-modernism`

- Recommendation: keep as public archive or mark as migrated.
- Old live URL: `https://ukrmodernism.abvx.xyz`
- New app: `apps/ukrainian-modernism`
- Keep Railway/Cloudflare configuration live until monorepo deployment is verified.
- Preserve README demo video and cultural positioning in archive notice.

## `toki-free-kit`

- Recommendation: keep as public archive or mark as migrated.
- Old live URL: `https://toki-free.abvx.xyz`
- New app: `apps/toki-free-kit`
- Keep old deployment live until PDFs, book pages, sitelen modes, and sitemap are verified.
- Fix or regenerate sitemap during cutover because the source audit found host mismatch risk.

## `dao-toki`

- Recommendation: keep as public archive or mark as migrated.
- Old live URL: `https://dao-toki.abvx.xyz`
- New app: `apps/dao-toki`
- Verify `/kit` desired behavior before cutover.
- Keep related project links stable.

## `stoic-wisdom-series`

- Recommendation: keep as public archive or mark as migrated.
- Old live URL: `https://stoic.abvx.xyz`
- New app: `apps/stoic-wisdom-series`
- Verify sitelen modes, reader-kit flow, Amazon links, and related book assets before cutover.

## README Notice Template

```md
# Migrated

This repository has been migrated into the `book-landings` monorepo:

https://github.com/markoblogo/book-landings

The old repository remains available as an archive and rollback reference.
```
