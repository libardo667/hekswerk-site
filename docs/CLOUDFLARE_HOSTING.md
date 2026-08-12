# Cloudflare static-site hosting

Status: production implementation authority.

Last checked: 2026-08-12.

## Scope and ownership

GitHub remains the source repository. Astro produces the static `build/` artifact. Cloudflare Workers Static Assets
serves that artifact at `https://www.hekswerk.com`. The `hekswerk-intake` Worker remains a separate service with its own
source, configuration, and Resend Secret.

The domain remains registered at GoDaddy. Cloudflare is the authoritative DNS provider and website host. Microsoft 365
and Resend retain their existing email roles. Moving registration or changing the email provider is outside this
migration.

## Repository layout

- `workers/site/wrangler.jsonc`: static-assets, conversion-metrics binding, and the `www.hekswerk.com` custom-domain
  route.
- `workers/site/worker.js`: same-origin `/_metrics` validation and Analytics Engine writes. Other requests pass to
  Static Assets.
- `static/_headers`: response security policy, immutable caching for fingerprinted assets, and no-index behavior on the
  public `workers.dev` review hostname.
- `static/_redirects`: path compatibility redirects, including `/contact.html` to `/contact` with its query string.
- `site/pages/404.astro`: custom not-found document served with HTTP 404 by Static Assets.
- `.github/workflows/deploy-cloudflare.yml`: production workflow. It runs the complete `npm run check` gate before it
  can deploy.
- `.github/workflows/deploy-pages-fallback.yml`: temporary cutover fallback for clients whose recursive resolver still
  uses the former GoDaddy authority. It deploys the same checked build, but it does not make Pages authoritative.

The Worker has a narrow script and a Workers Analytics Engine binding for the fixed conversion-event schema. It has no
secret, database, key-value store, object bucket, session state, or general server-side application state. Cloudflare
serves the built HTML, CSS, JavaScript, images, and locally bundled fonts directly from Static Assets. Only
`/_metrics` runs the Worker script first.

## Local commands

```bash
npm run build
npm run site:check
npm run site:deploy
```

`site:deploy` changes the external site Worker. Run the full check first. The same build is also available for review at
`https://hekswerk-site.levi-020.workers.dev`, where repository headers prevent indexing.

## GitHub Actions configuration

The existing `cloudflare-staging` GitHub environment stores the production deployment credentials. Its original name is
retained so the values do not need to be copied. It needs these secrets:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

Do not put either value in source, workflow YAML, issue text, screenshots, or command output. The token is a dedicated
least-privilege credential with Workers Scripts edit access for the intended account and Workers Routes edit access
scoped to the `hekswerk.com` zone. The workflow does not need DNS editing permission.

A pull request runs `.github/workflows/check.yml`. A push to `main` runs the full gate again and deploys only after it
passes. The check and deployment are in one ordered job, so a failed gate cannot update production.

## Production behavior

- Extensionless routes such as `/work` serve the corresponding generated HTML.
- HTML paths drop trailing slashes.
- `/contact.html?topic=relocation` redirects to `/contact?topic=relocation`.
- `/index.html` redirects to `/`.
- Unknown routes serve the Hekswerk `404.html` with status 404.
- Fingerprinted files under `/_astro/` are cached immutably.
- Every asset sends `Cache-Control: no-transform`. For HTML, this prevents Cloudflare's automatic Web Analytics setup
  from injecting a script even if that account-level setting is enabled.
- The `workers.dev` hostname sends `X-Robots-Tag: noindex, nofollow`.
- HTML routes load no third-party analytics beacon and write no browser storage. A small same-origin client records the
  fixed conversion events documented in `docs/METRICS.md`; aggregate traffic counts also remain available through
  Cloudflare's edge and zone analytics.
- Canonical, social, sitemap, and robots URLs identify `https://www.hekswerk.com`.
- Cloudflare redirects apex HTTP and HTTPS requests to `www`, preserving the path and query string.

## Migration evidence

Before changing nameservers, the site was deployed and exercised at the `workers.dev` hostname. The remote Playwright
run covered 84 desktop and mobile cases: 81 passed and 3 project-specific cases were intentionally skipped. The run
covered navigation, CTA paths, internal links, responsive layout, the opened mobile menu, keyboard-visible focus,
automated WCAG A and AA checks, contact topic preselection and conditional fields, mocked submission success and
failure, the honeypot, redirects, and the custom 404.

On 2026-08-12, authoritative DNS moved to Cloudflare. Both assigned Cloudflare nameservers had already returned the
complete reviewed mail and verification record set. The imported `www` GitHub Pages CNAME was then removed, the Worker
custom domain was attached, and the apex redirect was enabled. Direct checks against both Cloudflare edges observed:

- valid TLS and HTTP 200 from the Worker at `https://www.hekswerk.com/`;
- Cloudflare IPv4 and IPv6 answers for `www`;
- HTTP 301 from apex to `www` with the test path and query string preserved; and
- Cloudflare response headers rather than GitHub Pages headers.

The repository's former GitHub Pages workflow, `CNAME`, and `.nojekyll` marker were removed only after those production
observations. Pages was then disabled. That retirement happened before the old delegation's cached lifetime had
elapsed. The former GoDaddy nameservers still answered `www` with `libardo667.github.io` and the apex with GitHub Pages
addresses, so resolvers retaining that delegation reached the disabled Pages service and received a GitHub 404.

GitHub Pages is temporarily re-enabled as a propagation fallback with `www.hekswerk.com` configured in Pages settings.
The fallback workflow publishes the same checked `build/` artifact on each push to `main`. No `CNAME` or `.nojekyll`
file is added to the source or Cloudflare artifact because custom-domain configuration for an Actions-published Pages
site is repository state, not artifact state. Cloudflare remains the delegated authority and normal production host.
Pages must be retired again only after the removal gate in `docs/DNS_CUTOVER.md` passes.

## Production verification

The checked repository build was deployed to the custom domain and verified on 2026-08-12 before publication. The live
HTML for all seven public routes matched the local build byte for byte. The production Playwright run completed 84
desktop and mobile cases: 81 passed and 3 project-specific cases were intentionally skipped. It covered every route,
navigation, responsive layout, the opened mobile menu, keyboard-visible focus, automated accessibility, contact topic
and conditional-field behavior, mocked success and failure, the honeypot, compatibility redirects, security headers,
and the custom 404.

Additional production checks established:

- canonical, Open Graph, Twitter, Organization, and WebSite metadata on every public route;
- Person metadata on `/about` and Service metadata on `/work` through the built-artifact gate;
- the intended `robots.txt` and sitemap, with no retired WorldWeaver site route;
- no third-party analytics tag, browser-storage write, remote font, or unapproved automatic third-party request;
- `Cache-Control: no-transform` on production responses, preventing Cloudflare's automatic analytics transformation;
- HTTP 404 and the Hekswerk not-found document for unknown, Pages-only, and retired manual paths;
- HTTP 301 for `/contact.html` and `/index.html`, with query and browser fragment behavior covered;
- valid TLS, Cloudflare response headers, and the apex redirect with its test path and query string preserved;
- matching mail and verification answers from both authoritative Cloudflare nameservers;
- live intake responses of 204 for production preflight, 403 for an unrelated origin, 400 for an invalid payload, and
  200 for a filled honeypot; and
- HTTP 200 provider acceptance for one disclosed, non-sensitive delivery test. Destination receipt is operator evidence
  confirmed outside the repository rather than copied into source.

Full-page production captures of the homepage, privacy page, automation form, and custom 404 were inspected at desktop
and Pixel-sized mobile viewports. No width overflow, unreadable control, broken footer, or visual-identity regression
was found.

## Rollback

If a deployment introduces a site regression while DNS and TLS remain healthy, redeploy the last known-good Git commit
or use Wrangler's Worker version rollback. Do not change mail DNS for a website-only failure.

If the Worker custom-domain mapping or apex redirect fails, repair that Cloudflare configuration against
`workers/site/wrangler.jsonc` and `docs/DNS_CUTOVER.md`. Confirm `www`, apex, and mail independently after the repair.

If the Cloudflare zone itself becomes unusable, the original GoDaddy nameservers are recorded in
`docs/DNS_CUTOVER.md`, but switching authority is an emergency operation, not an instant website rollback. Before any
such switch, reproduce the signed-off mail records at the destination and provide a working site origin. The temporary
Pages fallback covers only cached pre-cutover delegation and is not a long-term recovery design.
