# Contributing

## Development

Use Node.js 22 and install the locked dependency graph with `npm ci`. Run one app with its `dev:*` command from the root.

## Required Checks

```bash
npm run verify
npx playwright install chromium
npm run test:parity
```

Keep changes scoped to the relevant app or shared package. Preserve each site's routes, locale behavior, canonical URLs, legal pages, and visual identity. Add or update parity coverage when behavior changes.

Do not commit deployment tokens, private analytics data, unpublished manuscripts, or third-party assets without documented redistribution rights.
