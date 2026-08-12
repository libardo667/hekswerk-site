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

A pull request runs `.github/workflows/check.yml`. A push to `main` runs
`.github/workflows/deploy-cloudflare.yml`, which must pass the same full quality gate before it can deploy the
Cloudflare Static Assets Worker serving `www.hekswerk.com`. During the documented DNS-cutover safety window, the same
push also updates a temporary GitHub Pages fallback for resolvers that cached the former GoDaddy authority. Cloudflare
remains authoritative. Read `docs/CLOUDFLARE_HOSTING.md` and `docs/DNS_CUTOVER.md` before changing hosting or DNS.

The contact endpoint is a separate Cloudflare Worker whose source and Wrangler configuration live under
`workers/intake/`. Read `docs/CONTACT_ENDPOINT.md` before deploying it. `npm run worker:deploy` updates that external
Worker and therefore is intentionally not part of the static-site workflow.

The site bundles its fonts locally. `docs/PRIVACY_DATA_FLOW.md` is the implementation authority for browsing and
initial-inquiry data flows, provider boundaries, retention, and rights handling. `docs/PRIVACY_AND_AI_SCOPING.md` is
the operating gate for later access, privacy scoping, and AI-enabled contract work.
