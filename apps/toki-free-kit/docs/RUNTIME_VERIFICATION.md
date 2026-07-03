# Runtime Verification: toki-free-kit

Run these checks after local build, preview deploy, and production deploy.

## Routes

- `/en`: opens regular English.
- `/tp`: opens authored Latin toki pona by default.
- `/en/books/readers-kit`, `/en/books/chinese-wisdom`, `/en/books/heart-sutra`: render book detail pages.
- `/tp/books/readers-kit`, `/tp/books/chinese-wisdom`, `/tp/books/heart-sutra`: render localized book detail pages.
- `/en/legal`, `/tp/legal`, `/en/privacy`, `/tp/privacy`: render legal/privacy pages.

## Download Assets

- `/books/reader-kit/reader-kit.pdf`
- `/books/chinese-wisdom/chinese-wisdom.pdf`
- `/books/heart-sutra/heart-sutra.pdf`

Do not rename files under `public/books/<slug>/` without updating `src/data/books.ts`.

## Sitelen Layer Checks

- `/en`: only `EN / TP`, no layer controls.
- `/tp`: `EN / TP / SP / 🙂` controls in the header.
- `/tp` default mode: Latin toki pona.
- Emoji mode: header/main/footer TP text transforms where appropriate.
- SP mode: real sitelen pona glyphs render through the ligature-capable font from `sitelen-layer-plugin/sitelen-pona-font.css`.
- Locale switcher remains `EN / TP` and is not transformed.
- `/en` is not transformed by the plugin.

## Diagnostics / Fingerprints

- Toggle root is mounted at `#sitelen-layer-toggle-mount`.
- Toggle class includes `slp-toggle--size-lg`.
- Development mode enables plugin diagnostics overlay.
- Diagnostics should report `Container: main`.
- Source README historically notes `Toggle mode: inline`; current integration keeps `toggleMode: auto`, which resolves through the plugin while preserving the header-mounted toggle behavior.
