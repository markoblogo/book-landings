# Dependency Audit

Audit date: 2026-07-03

## Initial Findings

Command:

```bash
npm audit --json
npm audit
```

The initial audit reported 2 vulnerabilities:

| Package | Severity | Direct | Dependency path | Affected surface | Fix availability |
| --- | --- | --- | --- | --- | --- |
| `next@16.1.1` | High | Yes | root `dependencies.next` | Production framework runtime/build for all apps | Non-major upgrade available: `next@16.2.10` |
| `postcss@8.4.31` | Moderate | No | `next -> postcss` | Transitive CSS tooling used by Next | No clean direct npm-audit fix after Next upgrade; npm suggested a breaking downgrade to `next@9.3.3` |

The Next advisory group included multiple DoS, proxy/middleware bypass, request smuggling, SSRF, XSS, and cache-related advisories affecting `next` versions in the `16.1.x` range. The PostCSS advisory was:

- `GHSA-qx2v-qp2m-jg93`: PostCSS XSS via unescaped `</style>` in CSS stringify output, affecting `<8.5.10`.

## Chosen Fix

1. Upgraded direct dependency `next` from `16.1.1` to `16.2.10`.
   - Same major version.
   - Avoids React or broad framework churn.
   - Clears the high-severity Next advisory group.

2. Added a targeted npm override:

```json
"overrides": {
  "postcss": "8.5.10"
}
```

Reason: `next@16.2.10` still declares `postcss@8.4.31`, while the advisory requires `>=8.5.10`. npm audit suggested `next@9.3.3`, which would be a major framework downgrade and is not acceptable for this migrated Next 16 monorepo. The override is narrower and only changes the vulnerable transitive package.

## Packages Changed

- `next`: `16.1.1` -> `16.2.10`
- `postcss`: resolved via override to `8.5.10`

Changed dependency files:

- `package.json`
- `package-lock.json`

Related app config change:

- Added `allowedDevOrigins: ["127.0.0.1"]` to each app `next.config.ts`.

Reason: after the Next 16.2 upgrade, Playwright parity tests running apps on `127.0.0.1` hit Next's stricter dev resource origin checks for `/_next/webpack-hmr`. This is a development-server allowance only and does not change production routing or metadata.

## Result

After reinstall:

```bash
npm audit
```

Result: `found 0 vulnerabilities`

`npm explain postcss` confirms:

```text
postcss@8.5.10 overridden
overridden postcss@"8.5.10" (was "8.4.31") from next@16.2.10
```

## Remaining Risk

The PostCSS override should be revisited when Next publishes a release that depends on `postcss >=8.5.10` directly. Until then, keep the override to avoid reintroducing the advisory. No production-only vulnerability remains in `npm audit`.
