# Hekswerk releases

This file is the operating record for production website releases. Hosting and DNS architecture remain defined in
[`CLOUDFLARE_HOSTING.md`](./CLOUDFLARE_HOSTING.md) and [`DNS_CUTOVER.md`](./DNS_CUTOVER.md). The contact Worker is a
separate deployment governed by [`CONTACT_ENDPOINT.md`](./CONTACT_ENDPOINT.md).

## `contract-work-v1`

Release date: 2026-08-12.

This tag identifies the first client-ready release of the contract-work site. The release keeps the Operations
Automation Sprint as the primary commercial path and keeps EvoGen, Kenshi Agent Environment, and WorldWeaver in a
separate engineering and research lane.

### Release evidence

The release was checked from a clean dependency install and the committed production build:

- `npm ci` completed from `package-lock.json` with no audit findings.
- `npm run check` passed formatting, lint, 22 unit tests, both Worker dry runs, the Astro production build, the
  built-site contract, and the desktop and mobile browser suite.
- The local and production browser runs each completed 86 cases: 83 passed and 3 device-specific cases were
  intentionally skipped. The production run exercised all seven public routes, the opened mobile menu, responsive
  layout, accessibility, contact behavior, redirects, security headers, and the custom 404.
- `www.hekswerk.com` returned the Cloudflare-hosted site over valid HTTPS. Both apex HTTP and apex HTTPS redirected to
  `www` while preserving the tested path and query string.
- `/contact.html?topic=research` redirected to `/contact?topic=research`, `/index.html` redirected to `/`, and an
  unknown path returned the custom page with HTTP 404.
- All seven live HTML routes matched the checked local build. The hydrated contact page differed only in Astro's
  generated island instance identifier, with the same content and asset URLs.
- Every public route supplied canonical, Open Graph, Twitter, and structured metadata. The 1200 by 630 PNG social
  preview returned HTTP 200 with the expected image content type.
- `robots.txt`, `sitemap-index.xml`, and `sitemap-0.xml` returned HTTP 200. The sitemap listed exactly the seven public
  routes and did not restore the retired local WorldWeaver manual.
- The `/research` route exposed a direct link to WorldWeaver's documentation at its verified public commit
  `43eae31093ac941bc3335d6ab95d3b38409942ea`.
- The live form's production endpoint accepted one disclosed, non-sensitive version 2 delivery test with HTTP 200,
  and Levi confirmed that the message arrived in the destination mailbox. The public form and its no-JavaScript and
  failure states also expose `levi@hekswerk.com` as the direct email fallback.

Three independent GPT-5.6 Luna reviewers saw only a fresh 1440 by 900 production homepage image for a five-second
test. All three identified the work as turning recurring operational workflows into reliable automated systems, the
audience as small professional-service teams, and the Operations Automation Sprint as the next click. No
comprehension correction was warranted.

### Production deployment

1. Start from the intended `main` commit and confirm the worktree contains only the release changes.
2. Run `npm ci` and `npm run check`. Do not deploy if either command fails.
3. Run `npx wrangler whoami` and confirm it names the intended Cloudflare account. Do not copy account identifiers or
   credentials into release notes or logs shared outside the operator environment.
4. Push the release commit to `main`. The `Deploy Hekswerk to Cloudflare` workflow runs the full gate and then deploys
   `build/` with `workers/site/wrangler.jsonc`. During the DNS cutover safety window, the temporary Pages workflow must
   also succeed.
5. Watch both workflows to completion. Confirm the Cloudflare workflow deployed the exact release commit.
6. Run `PLAYWRIGHT_BASE_URL=https://www.hekswerk.com npx playwright test` against production.
7. Verify `www`, apex HTTP and HTTPS, `/contact.html`, `/index.html`, the custom 404, the social image, `robots.txt`,
   and both sitemap files with direct HTTP requests. Confirm the response is from Cloudflare and the apex redirects
   preserve a test path and query string.
8. Submit one non-sensitive contact smoke message and confirm both HTTP acceptance and destination-mailbox receipt.
   Do not record the message body or personal data in the repository.
9. Create the annotated release tag only after the deployed commit passes the production checks:

   ```bash
   git tag -a contract-work-v1 -m "Contract work v1"
   git push origin contract-work-v1
   ```

### Website rollback

Use a source rollback when GitHub and the release workflow are healthy:

1. Identify the last known-good commit or release tag and inspect its diff from current `main`.
2. Revert the faulty release with a new commit. Do not rewrite published `main` history.
3. Push the revert to `main`, wait for the Cloudflare deployment workflow, and repeat the production checks above.

Use a Cloudflare version rollback when production must be restored before a source revert can finish:

1. Run `npx wrangler deployments list --config workers/site/wrangler.jsonc` and identify the exact last known-good site
   version.
2. Run:

   ```bash
   npx wrangler rollback <VERSION_ID> --config workers/site/wrangler.jsonc --message "Rollback site regression"
   ```

3. Verify the custom domain, apex redirects, all public routes, headers, and the contact page immediately.
4. Follow with a source revert so the next normal deployment cannot reintroduce the faulty artifact.

Do not roll back `hekswerk-intake` for a static-site regression. Do not change MX, SPF, DKIM, DMARC, nameservers, the
Worker custom-domain mapping, or the apex redirect unless evidence identifies that exact layer as the fault. The
temporary GitHub Pages fallback is governed by the timed removal gate in `DNS_CUTOVER.md`; it is not a substitute for
a normal Cloudflare site rollback.
