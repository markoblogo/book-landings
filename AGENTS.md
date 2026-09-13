# Book Landings Agent Guide

## Repository Map

- `apps/*`: independently deployed Next.js publishing sites.
- `packages/*`: reusable content, configuration, SEO, UI, and sitelen helpers.
- `tests/parity`: browser contracts that preserve routes, locale behavior, downloads, images, and canonical metadata.
- `docs/DEPLOYMENT_MATRIX.md`: current hosting and domain contract.

## Working Rules

- Keep app-specific visual identity and content inside its app.
- Read the matching current guide in `node_modules/next/dist/docs/` before changing Next.js APIs or conventions.
- Put shared behavior in a package only when at least two apps use the same contract.
- Do not move domains or hosting platforms without explicit owner direction.
- Treat book files and visual assets according to `LICENSE_SCOPE.md`.

## Closeout

Run `npm run verify` and `npm run test:parity`. For deployment changes, also run `npm run verify:live` and report build, deployment, alias, and public-domain evidence separately.
