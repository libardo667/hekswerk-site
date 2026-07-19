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

The build copies the preserved static exhibits and old `.html` pages to their existing public URLs. The
former homepage is retained at `/former-homepage.html`.

## Deployment

A push to `main` runs `.github/workflows/deploy-pages.yml`. The workflow builds Docusaurus, includes the
current WorldWeaver manual, uploads the result as a GitHub Pages artifact, and publishes it to the existing
custom domain.
