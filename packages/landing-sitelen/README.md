# `@book-landings/landing-sitelen`

Optional helpers for integrating `sitelen-layer-plugin` in toki pona landing apps.

Use this package only when an app has authored toki pona content and wants display modes for:

- Latin toki pona (`TP`)
- sitelen pona (`SP`)
- sitelen emoji (`🙂`)

## What It Does

- Creates shared plugin profiles for `/tp`.
- Mounts controls into `#sitelen-layer-toggle-mount`.
- Provides default labels for `TP`, `SP`, and emoji modes.
- Protects locale controls from transformation.
- Keeps non-TP routes on the Latin-only profile.

## What It Does Not Do

It does not translate content. The `/tp` copy must be authored separately. The plugin only changes display layers for existing toki pona text.

## Typical App Integration

```ts
import { createSitelenLayerProfiles } from "@book-landings/landing-sitelen";

const profiles = createSitelenLayerProfiles({
  storageKey: "my-app:sitelen-layer",
  className: "my-app-sitelen-pona",
  excludeSelectors: ["[data-locale-switcher]", "#sitelen-layer-toggle-mount"]
});
```

Then pass the profiles to `createSitelenLayerPluginFromProfiles` inside a client component.

## Enable Only On `/tp`

The shared helper defaults to:

- enabled profile: `/tp`
- disabled profile: `/en`
- container: `main`

Only render `data-sitelen-layer-scope` on the `/tp` page content. Non-TP pages must not receive that scope.

## Protect Locale Switchers

Locale switchers must include:

```tsx
data-locale-switcher
```

The default exclusion selectors protect:

- `[data-locale-switcher]`
- `#sitelen-layer-toggle-mount`
- `[data-sitelen-layer-ignore]`

## Verification Checklist

- `/en`: only `EN / TP`, no layer controls.
- `/tp`: `EN / TP / SP / 🙂` controls appear in the header.
- `/tp` defaults to Latin toki pona.
- `SP` renders real sitelen pona glyphs through the plugin font.
- Emoji mode transforms authored TP text where appropriate.
- Locale switcher remains readable and untransformed.
- `/en` remains unaffected.
