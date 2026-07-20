# Hekswerk site

This repository builds and deploys `www.hekswerk.com` with Docusaurus.

The site keeps its own pages and visual system here. WorldWeaver's technical manual remains canonical in
the sibling `worldweaver/docs/` directory and is read directly during a local build. GitHub Actions checks
out WorldWeaver into the site workspace before publishing.

## Local development

Keep the repositories beside each other:

```text
personal-projects/
  hekswerk-site/
  worldweaver/
```

Then run:

```bash
npm install
npm start
```

Build the complete deployable site with:

```bash
npm run build
npm run serve
```

The build copies only the retained static contact form and its supporting assets. Obsolete exhibits and the
former static site remain available through Git history, not through the deployed public site.

## Deployment

A push to `main` runs `.github/workflows/deploy-pages.yml`. The workflow builds Docusaurus, includes the
current WorldWeaver manual, uploads the result as a GitHub Pages artifact, and publishes it to the existing
custom domain.
