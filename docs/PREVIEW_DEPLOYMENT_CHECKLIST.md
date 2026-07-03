# Preview Deployment Checklist

Use this checklist before switching any production domain from the old standalone repo to the monorepo app.

## Global Preflight

- [ ] Confirm the old deployment remains live.
- [ ] Deploy a preview from `markoblogo/book-landings`.
- [ ] Run `npm run build`.
- [ ] Run `npm run lint`.
- [ ] Run `npm run typecheck`.
- [ ] Run `npm run check:assets`.
- [ ] Run `npm run test:parity`.
- [ ] Open `/robots.txt` and verify it points to the production-domain sitemap.
- [ ] Open `/sitemap.xml` and verify only intended page URLs are listed.
- [ ] Check canonical URL and language alternates in page metadata.
- [ ] Check OpenGraph preview image, title, and description.
- [ ] Compare desktop and mobile layouts against current production.

## Stoic Wisdom Series

- [ ] Preview app path: `apps/stoic-wisdom-series`.
- [ ] Compare against current production: `https://stoic.abvx.xyz`.
- [ ] Check `/` redirects to `/en`.
- [ ] Check `/en` and `/tp`.
- [ ] Check `/en/kit` and `/tp/kit`.
- [ ] Check `/en/legal`, `/tp/legal`, `/en/privacy`, `/tp/privacy`.
- [ ] Check book detail routes, including `/en/books/marcus-meditations` and `/tp/books/marcus-meditations`.
- [ ] Verify book covers and promo images load.
- [ ] Verify external Amazon/KDP and related-project links.
- [ ] Verify `/tp` shows TP/SP/emoji controls.
- [ ] Verify `/en` has no sitelen display controls.
- [ ] Verify locale switcher remains readable and untransformed.
- [ ] Verify `/robots.txt`, `/sitemap.xml`, canonical URLs, and OG preview.

## Toki Free Kit

- [ ] Preview app path: `apps/toki-free-kit`.
- [ ] Compare against current production: `https://toki-free.abvx.xyz`.
- [ ] Check `/` redirects to `/en`.
- [ ] Check `/en` and `/tp`.
- [ ] Check `/en/kit`, `/tp/kit`, and bare `/kit` behavior.
- [ ] Check `/en/legal`, `/tp/legal`, `/en/privacy`, `/tp/privacy`.
- [ ] Check localized book detail routes, including `/en/books/readers-kit` and `/tp/books/readers-kit`.
- [ ] Verify PDFs and local download links return HTTP 200.
- [ ] Verify files under `public/books/<slug>/` are reachable.
- [ ] Verify `/tp` shows TP/SP/emoji controls.
- [ ] Verify `/en` has no sitelen display controls.
- [ ] Verify locale switcher remains EN/TP.
- [ ] Verify runtime verification fingerprints from `apps/toki-free-kit/docs/RUNTIME_VERIFICATION.md`.
- [ ] Verify `/robots.txt`, `/sitemap.xml`, canonical URLs, and OG preview.

## Dao Toki

- [ ] Preview app path: `apps/dao-toki`.
- [ ] Compare against current production: `https://dao-toki.abvx.xyz`.
- [ ] Check `/` redirects to `/en`.
- [ ] Check `/en` and `/tp`.
- [ ] Check `/en/kit`, `/tp/kit`, and bare `/kit` behavior.
- [ ] Check `/en/legal`, `/tp/legal`, `/en/privacy`, `/tp/privacy`.
- [ ] Check all migrated book routes:
  - [ ] `/en/books/dao-de-jing`
  - [ ] `/tp/books/dao-de-jing`
  - [ ] `/en/books/sunzi`
  - [ ] `/tp/books/sunzi`
  - [ ] `/en/books/mozi-universal-love`
  - [ ] `/tp/books/mozi-universal-love`
- [ ] Verify related project links: Toki Pona Translator, Toki Pona Free Kit, Stoic Wisdom in Toki Pona.
- [ ] Verify Chinese Wisdom assets and status labels.
- [ ] Verify `/tp` shows TP/SP/emoji controls.
- [ ] Verify `/en` has no sitelen display controls.
- [ ] Verify locale switcher remains readable and untransformed.
- [ ] Verify `/robots.txt`, `/sitemap.xml`, canonical URLs, and OG preview.

## Ukrainian Modernism

- [ ] Preview app path: `apps/ukrainian-modernism`.
- [ ] Compare against current production: `https://ukrmodernism.abvx.xyz`.
- [ ] Check `/` redirects to `/fr`.
- [ ] Check `/fr` and `/uk`.
- [ ] Check `/fr/gift` and `/uk/gift`.
- [ ] Check `/fr/legal`, `/uk/legal`, `/fr/privacy`, `/uk/privacy`.
- [ ] Check book routes, including `/fr/book/kosynka-gift` and `/uk/book/kosynka-gift`.
- [ ] Verify magazine/editorial layout rhythm on desktop and mobile.
- [ ] Verify book images, OG images, gift PDF, and EPUB downloads.
- [ ] Verify demo video block/reference.
- [ ] Verify no sitelen controls appear anywhere.
- [ ] Verify FR/UK language switcher.
- [ ] Verify Railway preview start command and Cloudflare DNS remains pointed at the old deployment until cutover.
- [ ] Verify `/robots.txt`, `/sitemap.xml`, canonical URLs, and OG preview.
