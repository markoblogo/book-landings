# Owner Visual Review Checklist

Use this checklist before switching production domains to the monorepo deployments. Technical checks already passed; this review is for visual parity, content confidence, SEO preview checks, and owner approval.

Production cutover remains blocked until each app has an explicit owner approval.

Technical cutover completed on 2026-07-15: all four production domains now deploy from `markoblogo/book-landings` `main`, and the live Playwright parity suite passed 13 checks. This document remains the final owner gate before deleting the old repositories.

## Stoic Wisdom Series

- Preview URL: `https://stoic-wisdom-series-6ystmwep3-abvcreative.vercel.app`
- Current production URL: `https://stoic.abvx.xyz`

Pages to open:

- [ ] `/en`
- [ ] `/tp`
- [ ] `/en/books/marcus-meditations`
- [ ] `/tp/books/marcus-meditations`
- [ ] `/en/legal`
- [ ] `/en/privacy`
- [ ] `/tp/legal`
- [ ] `/tp/privacy`
- [ ] `/robots.txt`
- [ ] `/sitemap.xml`

Visual checks:

- [ ] Hero, typography, spacing, book cards, and visual rhythm match current production closely.
- [ ] Book covers and promo images load and are not cropped unexpectedly.
- [ ] Mobile layout is readable and has no overlaps.
- [ ] Footer links and related project links are present and visually consistent.

Functional checks:

- [ ] Language switcher remains readable.
- [ ] `/en` shows no sitelen display controls.
- [ ] `/tp` shows sitelen controls only where expected.
- [ ] TP, SP, and emoji controls can be toggled without visual breakage.
- [ ] Legal/privacy pages render complete copy.

SEO/preview checks:

- [ ] Canonical tags point to the intended production paths.
- [ ] `robots.txt` loads.
- [ ] `sitemap.xml` loads.
- [ ] OpenGraph title, description, and image look acceptable in a browser/social preview tool.

Approval:

- Owner visual review: approved / not approved
- Notes:
- Date:
- Reviewer:

## Toki Free Kit

- Preview URL: `https://toki-free-gmi3n0j9f-abvcreative.vercel.app`
- Current production URL: `https://toki-free.abvx.xyz`

Pages to open:

- [ ] `/en`
- [ ] `/tp`
- [ ] `/en/books/readers-kit`
- [ ] `/tp/books/readers-kit`
- [ ] `/en/kit`
- [ ] `/tp/kit`
- [ ] `/en/legal`
- [ ] `/en/privacy`
- [ ] `/tp/legal`
- [ ] `/tp/privacy`
- [ ] `/robots.txt`
- [ ] `/sitemap.xml`

Visual checks:

- [ ] Hero, book catalog, kit sections, typography, and spacing match current production closely.
- [ ] Covers, kit images, and promo images load.
- [ ] Mobile layout is readable and has no overlaps.
- [ ] Footer links and related project links are present and visually consistent.

Functional checks:

- [ ] Language switcher remains readable.
- [ ] `/en` shows no sitelen display controls.
- [ ] `/tp` shows sitelen controls only where expected.
- [ ] TP, SP, and emoji controls can be toggled without visual breakage.
- [ ] PDF/download links open or download correctly.
- [ ] Book detail pages render full copy and CTAs.
- [ ] Legal/privacy pages render complete copy.

SEO/preview checks:

- [ ] Canonical tags point to the intended production paths.
- [ ] `robots.txt` loads.
- [ ] `sitemap.xml` loads.
- [ ] OpenGraph title, description, and image look acceptable in a browser/social preview tool.

Approval:

- Owner visual review: approved / not approved
- Notes:
- Date:
- Reviewer:

## Dao Toki

- Preview URL: `https://dao-toki-f6jzqr8ok-abvcreative.vercel.app`
- Current production URL: `https://dao-toki.abvx.xyz`

Pages to open:

- [ ] `/en`
- [ ] `/tp`
- [ ] `/en/books/dao-de-jing`
- [ ] `/tp/books/dao-de-jing`
- [ ] `/en/books/sunzi`
- [ ] `/tp/books/sunzi`
- [ ] `/en/books/mozi-universal-love`
- [ ] `/tp/books/mozi-universal-love`
- [ ] `/en/legal`
- [ ] `/en/privacy`
- [ ] `/tp/legal`
- [ ] `/tp/privacy`
- [ ] `/robots.txt`
- [ ] `/sitemap.xml`

Visual checks:

- [ ] Chinese wisdom/editorial positioning, typography, spacing, and book cards match current production closely.
- [ ] Dao De Jing, Sunzi, and Mozi assets load.
- [ ] Mobile layout is readable and has no overlaps.
- [ ] Related project links are present: Toki Pona Translator, Toki Pona Free Kit, Stoic Wisdom in Toki Pona.

Functional checks:

- [ ] Language switcher remains readable.
- [ ] `/en` shows no sitelen display controls.
- [ ] `/tp` shows sitelen controls only where expected.
- [ ] TP, SP, and emoji controls can be toggled without visual breakage.
- [ ] Book detail pages render full copy and CTAs.
- [ ] Legal/privacy pages render complete copy.

SEO/preview checks:

- [ ] Canonical tags point to the intended production paths.
- [ ] `robots.txt` loads.
- [ ] `sitemap.xml` loads.
- [ ] OpenGraph title, description, and image look acceptable in a browser/social preview tool.

Approval:

- Owner visual review: approved / not approved
- Notes:
- Date:
- Reviewer:

## Ukrainian Modernism

- Preview URL: `https://ukrainian-modernism-monorepo-preview.up.railway.app`
- Current production URL: `https://ukrmodernism.abvx.xyz`

Pages to open:

- [ ] `/fr`
- [ ] `/uk`
- [ ] `/fr/gift`
- [ ] `/uk/gift`
- [ ] `/fr/book/kosynka-gift`
- [ ] `/uk/book/kosynka-gift`
- [ ] `/fr/legal`
- [ ] `/fr/privacy`
- [ ] `/uk/legal`
- [ ] `/uk/privacy`
- [ ] `/robots.txt`
- [ ] `/sitemap.xml`

Visual checks:

- [ ] Magazine/editorial visual identity is preserved.
- [ ] French/Ukrainian cultural positioning and content hierarchy match current production closely.
- [ ] Book images and OpenGraph/media assets load.
- [ ] Demo video block or reference is present if expected.
- [ ] Mobile layout is readable and has no overlaps.
- [ ] No sitelen controls appear anywhere.

Functional checks:

- [ ] FR/UK language switcher works.
- [ ] Gift route works in both locales.
- [ ] Book detail route works in both locales.
- [ ] PDF/EPUB assets open or download correctly.
- [ ] Legal/privacy pages render complete copy.

SEO/preview checks:

- [ ] Canonical tags point to the intended production paths.
- [ ] `robots.txt` loads.
- [ ] `sitemap.xml` loads.
- [ ] OpenGraph title, description, and image look acceptable in a browser/social preview tool.

Approval:

- Owner visual review: approved / not approved
- Notes:
- Date:
- Reviewer:

## Cutover Readiness

| App | Technical preview approved | Owner visual approved | Ready for production cutover |
| --- | --- | --- | --- |
| Stoic Wisdom Series | Yes, live production verified | No | No |
| Toki Free Kit | Yes, live production verified | No | No |
| Dao Toki | Yes, live production verified | No | No |
| Ukrainian Modernism | Yes, live production verified | No | No |

Update the owner visual approval column only after the reviewer signs off above. Switch production domains one app at a time, with immediate production verification and rollback readiness.
