# Hekswerk site

This repository builds and deploys `www.hekswerk.com` with Docusaurus.

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

Obsolete exhibits, the former static site, and the former WorldWeaver manual mount remain available through
Git history, not through the deployed public site.

## Deployment

A push to `main` runs `.github/workflows/deploy-pages.yml`. The workflow builds the Hekswerk repository,
uploads the result as a GitHub Pages artifact, and publishes it to the existing custom domain. It can also be
run manually from GitHub Actions.
