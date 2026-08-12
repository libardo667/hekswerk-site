# Hekswerk site

This repository builds and deploys `www.hekswerk.com` as a static Astro site.

The site keeps its pages, visual system, and public project orientation here. Project implementation and
technical documentation remain in their respective source repositories rather than being republished as
Hekswerk site sections.

## Local development

Run:

```bash
npm install
npm start
```

Build the complete deployable site with:

```bash
npm run build
npm run serve
```

## Quality checks

Install the Chromium browser used by the production-build browser tests once per machine:

```bash
npx playwright install chromium
```

Run the same deploy-blocking gate used by GitHub Actions with:

```bash
npm run check
```

The gate checks formatting, ESLint rules for React, Hooks, and accessibility, focused form-contract tests,
the intake Worker's contract and deployable bundle, the production Astro build, built metadata and link integrity,
desktop and mobile browser behavior, and automated Axe accessibility results. `npm run audit:languages` remains a
separate content inventory task.

Obsolete exhibits, the former static site, and the former WorldWeaver manual mount remain available through
Git history, not through the deployed public site.

## Deployment

A pull request runs `.github/workflows/check.yml`. A push to `main` runs `.github/workflows/deploy-pages.yml`,
which must pass the same full quality gate before it can upload the GitHub Pages artifact and publish to the
existing custom domain. Both workflows can also be run manually from GitHub Actions.

The contact endpoint is a separate Cloudflare Worker whose source and Wrangler configuration live under
`workers/intake/`. Read `docs/CONTACT_ENDPOINT.md` before deploying it. `npm run worker:deploy` updates that external
Worker and therefore is intentionally not part of the GitHub Pages workflow.
