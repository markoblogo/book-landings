# AMI Books Work Log

## 2026-07-20

### Badge label consistency on homepage and print cards

- Commit: [`9280e97`](https://github.com/markoblogo/book-landings/commit/9280e97)
- Scope: `apps/agro-library`
- What changed:
  - Kept the hero badge text as `ALL FREE`.
  - Switched book card/print badges from `ALL FREE` to `FREE` for available items.
  - Preserved `COMMING SOON` for upcoming items.
- Deployment:
  - Vercel deployment: `dpl_Dwh31C3p1eoVMxechDti1ApVUWHg`
  - Production alias: [books.1d3x.com](https://books.1d3x.com)
- Note:
  - README contract text in `apps/agro-library/README.md` updated to match the behavior.

### Alias drift guard

- Implemented:
  - `scripts/verify-books-alias.sh`
  - `.github/workflows/verify-books-alias.yml`
- Contract:
  - In future production deploys, compare alias target from Vercel CLI with `VERIFY_EXPECTED_DEPLOYMENT_ID`.
  - Fail deployment check if `books.1d3x.com` points to another deployment.
