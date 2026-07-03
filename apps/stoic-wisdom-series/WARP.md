# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Development commands

This is a Next.js App Router project living under `src/app`.

Use npm as the primary package manager (a `package-lock.json` is present):

- **Start dev server**: `npm run dev`
- **Build for production**: `npm run build`
- **Run production server** (after build): `npm start`
- **Run linting** (ESLint with Next.js rules): `npm run lint`

There is currently **no test script or test setup** defined in `package.json`.

## High-level architecture

- **App entry & routing**
  - Root layout at `src/app/layout.tsx` wires global fonts (Geist) and `globals.css` and renders children.
  - `src/app/page.tsx` immediately redirects to `/fr`, so all user-facing content lives under the language-prefixed segment.
  - The main localized route is `src/app/[lang]/page.tsx`, which is an async server component that:
    - Reads `lang` from route params and normalizes it to `"fr" | "uk"`.
    - Loads the localized dictionary via `getDictionary`.
    - Composes the page from presentational sections: `Header`, `Hero`, `About`, `BookGrid`, `LeadMagnet`, and `Footer`.

- **Localized layout & metadata**
  - `src/app/[lang]/layout.tsx` is responsible for per-locale HTML shell:
    - Applies Inter and Playfair fonts via CSS variables.
    - Uses `generateMetadata` to build localized `<title>`, `<meta>`, Open Graph, and Twitter card data from the dictionaries, including canonical URLs and language-specific alternate links.

- **Middleware-driven locale routing**
  - `src/middleware.ts` enforces language prefixes:
    - Supported locales are defined in a `locales` array (`["fr", "uk"]`), with `defaultLocale = "fr"`.
    - For any path that does not already start with a supported locale (and is not an internal path like `_next`, `images`, `favicon.ico`, or `api`), it redirects to the same path prefixed with `/fr`.
    - When adding a new language, you must update this file, the dictionaries, and the `[lang]` route logic together.

- **Dictionaries and i18n**
  - `src/get-dictionary.ts` is a **server-only** helper that lazily imports JSON dictionaries:
    - Uses `dictionaries = { fr: () => import('./dictionaries/fr.json'), uk: () => import('./dictionaries/uk.json') }`.
    - `getDictionary(locale)` returns the matching dictionary, falling back to French if the locale is unknown.
  - Dictionaries live in `src/dictionaries/fr.json` and `src/dictionaries/uk.json` and share the same nested shape (keys like `meta`, `hero`, `why`, `collection`, `gift`, `contact`, `partners`, etc.).
  - Several components type `dict` as `any` but rely on specific keys from these JSON files; changes to dictionary structure must be kept in sync with usages in `Hero`, `About`, `BookGrid`, `LeadMagnet`, `Footer`, and related components.

- **Data model: books collection**
  - `src/data/books.ts` centralizes book metadata:
    - Defines `LocalizedString` and `Book` TypeScript interfaces.
    - Exports a `books: Book[]` array with localized titles, authors, descriptions, Amazon URLs, and optional YouTube teaser IDs.
  - This data is consumed by:
    - `Hero` and `HeroCoverGrid` to render the interactive 3D covers and detail modal.
    - `BookGrid` and `BookCard` to display the collection grid and book detail accordions.
  - When adding a new book, update this array and ensure corresponding assets exist under `public/images/...`.

- **Components and composition**
  - Components live in `src/components` and are mostly presentational, with some client-side interactivity:
    - **Layout & navigation**: `Header` (logo and language switcher) and `Footer` (contact form and partner block).
    - **Hero & spotlight**: `Hero` (main marketing copy and CTA), `HeroCoverGrid` (3D-style cover layout), and `VideoModal` (YouTube iframe overlay).
    - **Collection**: `BookGrid` (section wrapper) and `BookCard` (individual book cards with expandable long description and purchase links).
    - **Context sections**: `About` (contextual explanation) and `LeadMagnet` (upcoming digital gift placeholder).
  - Client components (`'use client'`) are used where React state, event listeners, or browser APIs are required (e.g., `Hero`, `BookCard`, `LanguageSwitch`, `VideoModal`, `Footer`).

- **Styling & assets**
  - Styling is handled primarily via CSS Modules:
    - Page-level styles in `src/app/[lang]/page.module.css`.
    - Component-scoped styles in `src/components/*/*.module.css`.
    - A global stylesheet `src/app/globals.css` defines shared utilities like the `.container` class and button styles.
  - Static assets (book covers, logos) live under `public/` and are imported either via `next/image` module imports or by string paths (e.g., `/images/cover-...jpg`).

## Linting configuration

- ESLint is configured in `eslint.config.mjs` using Next.js presets:
  - Starts from `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`.
  - Uses `globalIgnores` to ignore build artifacts like `.next/**`, `out/**`, `build/**`, and `next-env.d.ts`.
- Run `npm run lint` to check code against these rules.

## TypeScript configuration

- TypeScript options are defined in `tsconfig.json`:
  - Uses `"paths": { "@/*": ["./src/*"] }` so imports like `@/components/Hero` and `@/data/books` resolve to the `src` tree.
  - Targets `ES2017`, uses `moduleResolution: "bundler"`, and enables `strict` type checking with `noEmit: true`.
- When moving files or renaming directories under `src`, keep the `@/*` alias and import paths consistent.