# Hekswerk site baseline

Status: historical evidence captured before the August 2026 public-identity revisions and the later Astro migration.
It records the former WorldWeaver documentation mount and Docusaurus implementation. It is not current route,
framework, or deployment authority.

This document records the site as it existed before public relaunch work began. It complements [CONTRACT_WORK_RELAUNCH.md](./CONTRACT_WORK_RELAUNCH.md), which is authoritative for the current positioning and required route structure. This baseline remains useful historical evidence, not current technical authority.

## Snapshot and evidence

The inventory was taken on August 8, 2026 in `America/Los_Angeles`.

- Hekswerk source: commit `343099a` on clean `main`.
- Local WorldWeaver source: commit `43eae31` on clean `main`.
- Production build: `npm run build`, using the sibling `../worldweaver/docs` directory.
- Built route inventory: files under ignored `build/`, including Docusaurus output and copied static files.
- Live checks: read-only HTTP requests to `https://www.hekswerk.com` after the local inventory.
- Visual checks: the production build rendered through canonical routes in Chrome 151 at exact 1440 by 1000 and 390 by 844 CSS-pixel viewports.

The required historical sources were inspected directly:

```text
git show b1d3992:index.html
git show 0fbc945:the-practice.html
```

Additional evidence came from the current source tree, the deployment workflow, build output, the Git history for `CNAME` and the Docusaurus migration, the pre-migration file trees, and commit `52eb1b0`, which withdrew obsolete exhibits.

## Current system shape

The deployed site is one GitHub Pages artifact assembled from two repositories and one retained static page:

```text
hekswerk-site/src/pages + src/css
                  |
                  | Docusaurus build
                  v
             build/ artifact <--- worldweaver/docs
                  ^
                  |
legacy-static/contact.html + legacy-static/assets
```

- Hekswerk owns the Docusaurus shell, public practice pages, visual system, navigation, footer, deployment workflow, domain files, and contact page.
- WorldWeaver owns the canonical technical manual. Its `docs/` directory is mounted at `/worldweaver` during the Hekswerk build.
- Contact remains a hand-authored static HTML page copied into the same artifact. It does not use the Docusaurus layout or React runtime.
- There is no CMS, blog, analytics package, account system, scheduler, chatbot, database, or site-side application backend.

The current public hierarchy is research-first. The homepage, global description, primary calls to action, navigation order, and About page all put WorldWeaver ahead of contract automation. That is the main content hierarchy the relaunch strategy requires changing. The underlying architecture does not need replacement.

## Current route map

### Hekswerk-owned pages and utility routes

| Canonical URL | Source | Built artifact | Live status | Current role |
| --- | --- | --- | --- | --- |
| `/` | `src/pages/index.jsx` | `index.html` | 200 | Research-first homepage and WorldWeaver front door. |
| `/about` | `src/pages/about.jsx` | `about.html` | 200 | One-person practice description, currently framed around supporting open research. |
| `/research` | `src/pages/research.jsx` | `research.html` | 200 | Dated WorldWeaver research record and evidentiary cautions. |
| `/contact.html` | `legacy-static/contact.html` | `contact.html` | 200 | Contact and relocation-aware intake form. |
| `/404.html` | Docusaurus default | `404.html` | 200 when requested directly | Generic not-found document. GitHub Pages serves it for missing paths with a 404 status. |
| `/robots.txt` | `static/robots.txt` | `robots.txt` | 200 | Allows crawling and points to the sitemap. |
| `/sitemap.xml` | Docusaurus sitemap plugin | `sitemap.xml` | 200 | Lists Docusaurus routes. It does not list the static contact page. |

`/index.html`, `/about.html`, `/research.html`, and `/worldweaver.html` also return 200 on the live site because those are the generated files behind the clean canonical routes. The build emits equivalent `.html` files for every documentation child route; a live check of the architecture alias also returned 200. They are compatibility aliases, not the URLs used in metadata or navigation.

The build also contains `.nojekyll`, `CNAME`, hashed Docusaurus JavaScript and CSS, the aura SVG, and the retained contact assets. Those are deployment artifacts rather than content routes.

### WorldWeaver documentation routes

The following pages are sourced from the sibling `worldweaver/docs/` checkout and built below `routeBasePath: 'worldweaver'`:

| Canonical URL | Public title | Emitted description |
| --- | --- | --- |
| `/worldweaver` | WorldWeaver | WorldWeaver is software for persistent AI residents and the worlds they can inhabit with people. |
| `/worldweaver/tutorials/run-a-local-town` | Run a local town | This tutorial starts Alderbank, opens the public client, and lets you enter the town as a person. It does |
| `/worldweaver/how-to/run-residents` | Run residents safely | Resident commands are deliberately bounded. A check does not wake anyone unless you pass `--wake`, and a |
| `/worldweaver/how-to/build-a-city` | Build and validate a city | A city pack describes a place. A shard is one independently operated server hosting that pack. They have |
| `/worldweaver/how-to/operate-a-local-node` | Operate a local node | This guide covers the supported single-computer development topology. Public federation between independent |
| `/worldweaver/reference/architecture` | Architecture | WorldWeaver has three main runtime parts. |
| `/worldweaver/reference/dependency-atlas` | Dependency atlas and resident gym | This page is a readable map of the important runtime boundaries in WorldWeaver. It is not an attempt to draw |
| `/worldweaver/reference/commands` | Command reference | Run commands from the repository root. |
| `/worldweaver/reference/resident-gym` | Resident gym | The resident gym is a controlled place for testing participants against real WorldWeaver rules. It is not a |
| `/worldweaver/explanation/residents-hearths-and-continuity` | Residents, hearths, and continuity | A resident is not a character record owned by a city and not a process owned by a computer. |
| `/worldweaver/explanation/elective-information-and-privacy` | Elective information and privacy | Residents need enough information to act without receiving a synthetic summary of the whole world on every |
| `/worldweaver/explanation/federation-without-ownership` | Federation without ownership | WorldWeaver is intended to be a network of nodes run by different stewards, not one service that owns every |
| `/worldweaver/explanation/stoops-artifacts-and-consequences` | Stoops, artifacts, and consequences | A stoop is a small, place-specific surface where people and residents deliberately leave something for the |

The descriptions above are recorded exactly as emitted by the current build. Several end at the first source line rather than at a complete sentence. That is current metadata behavior, not editorial ellipsis added by this document.

`sidebars.js` places the landing page, tutorial, three how-to guides, architecture, dependency atlas, commands, and four design explanations in the visible sidebar. The resident-gym page is built and reachable but is not a direct sidebar item; it is linked from the dependency-atlas material.

## Current navigation map

### Docusaurus shell

The homepage, About, Research, and every WorldWeaver documentation page share this shell.

Primary navbar, left to right:

1. Aura mark and **Hekswerk**, linked to `/`.
2. **WorldWeaver docs**, linked to `/worldweaver/`.
3. **Research**, linked to `/research`.
4. **About**, linked to `/about`.
5. **GitHub**, right aligned and linked to the external WorldWeaver repository.

Footer:

- **WorldWeaver:** Documentation and Source code.
- **Hekswerk:** Research record, About, and Contact.
- Copyright line, WorldWeaver license, and a link to the exact manual-source commit when the deployment build supplies `WORLDWEAVER_COMMIT`.

At mobile widths, Docusaurus collapses the navbar behind its menu button. The custom stylesheet also hides right-side navbar items at 760 pixels and below. Documentation pages add their own sidebar on desktop and a compact documentation menu and on-page control on mobile.

### Static contact shell

Contact uses a separate historical navigation implementation.

Primary navbar:

1. Aura mark and **Hekswerk**, linked to `/`.
2. **WorldWeaver**, linked to `/worldweaver`.
3. **Research**, linked to `/research`.
4. **About**, linked to `/about`.
5. **Contact**, linked to `contact.html`.
6. **Read the documentation**, a separate call to action linked to `/worldweaver`.

Footer: Home, WorldWeaver, Research, About, and Contact, plus the current Portland and The Hague relocation line.

Below 940 pixels the contact page hides all text navigation. Below 680 pixels it also hides the documentation call to action, leaving only the brand. This differs from the Docusaurus mobile menu and is visible in the baseline captures.

## Public metadata and descriptions

### Global configuration

| Field | Current value |
| --- | --- |
| Site title | `Hekswerk` |
| Tagline | `Independent research and careful systems work` |
| Base URL | `https://www.hekswerk.com/` |
| Trailing slash policy | `false` |
| Favicon | `/img/logo_aura.svg` |
| Default description | `Hekswerk is an independent research practice building WorldWeaver, open infrastructure for persistent AI residents and shared worlds.` |
| Color mode | Dark only; switch disabled |
| Blog | Disabled |
| Broken links | Build failure |
| Broken Markdown links | Build failure |

Docusaurus generates canonical links, Open Graph metadata, locale metadata, and page titles using each page's `Layout` values or each manual page's front matter and opening text.

### Hekswerk page metadata

| URL | Title | Description | Canonical |
| --- | --- | --- | --- |
| `/` | `Independent AI research | Hekswerk` | `Hekswerk builds WorldWeaver, open infrastructure for persistent AI residents and shared worlds.` | `https://www.hekswerk.com/` |
| `/about` | `About | Hekswerk` | `About Hekswerk and the work supporting WorldWeaver.` | `https://www.hekswerk.com/about` |
| `/research` | `Research | Hekswerk` | `The public research record behind WorldWeaver.` | `https://www.hekswerk.com/research` |
| `/contact.html` | `Contact - Hekswerk` | `Get in touch with Hekswerk about WorldWeaver, independent AI research, or careful systems work.` | None |
| `/404.html` | `Page Not Found | Hekswerk` | Uses the global research-first description. | `https://www.hekswerk.com/404.html` |

Known metadata gaps:

- Contact has no canonical URL, Open Graph metadata, or sitemap entry because it is copied as static HTML.
- The global, homepage, About, Contact, and 404 descriptions all encode the old research-first hierarchy.
- Several WorldWeaver descriptions stop at a Markdown line break and should be reviewed in the source repository if complete search snippets are wanted.

## External network dependencies

### Browser runtime

| Dependency | Used by | Failure behavior or boundary |
| --- | --- | --- |
| `fonts.googleapis.com` | Docusaurus CSS and contact HTML | Supplies the Fraunces and Outfit stylesheet. Local serif and system-sans fallbacks remain if it fails. |
| `fonts.gstatic.com` | Google Fonts stylesheet | Supplies the actual webfont files. Contact preconnects to it explicitly. |
| `hekswerk-intake.levi-020.workers.dev` | Contact form | Receives JSON over HTTPS. It is the only form-processing backend in the site. |
| `github.com/libardo667/worldweaver` | Navigation, footer, Research, manual edit links, and manual-source link | These are outbound user links. A GitHub failure does not prevent the already-built pages from rendering. |
| `mailto:levi@hekswerk.com` | Contact fallback | Opens the visitor's configured mail client. |

There are no analytics, advertising, embedded scheduling, chat, authentication, CMS, or client-account network calls in the tracked source.

### Build and deployment

| Dependency | Purpose |
| --- | --- |
| npm registry | `npm ci` installs the exact locked Docusaurus, React, MDX, and rendering dependencies. |
| `libardo667/worldweaver` on GitHub | GitHub Actions checks out the current manual source for every deployment. |
| GitHub Actions | Runs checkout, Node setup, Pages configuration, artifact upload, and deployment actions. |
| GitHub Pages | Hosts the generated static artifact and applies the repository's Pages environment and custom-domain settings. |

Funding and repository URLs recorded as package metadata in `package-lock.json` are not runtime requests from the site and are not treated as public dependencies.

## Contact form contract

### Endpoint and transport

- Endpoint: `https://hekswerk-intake.levi-020.workers.dev/`
- Source: the form `action` and the JavaScript `fetch` target in `legacy-static/contact.html`.
- Method used by JavaScript: `POST`.
- Request content type: `application/json`.
- Read-only endpoint check: `GET` returned 405 and advertised `POST, OPTIONS`, confirming reachability without creating a submission.
- Success condition: any HTTP `ok` response. The form resets and reports success.
- Failure condition: a non-OK response or fetch exception. The page directs the visitor to `levi@hekswerk.com`.

The live submission path was not POST-tested because a synthetic inquiry would create external state and send email.

### Topic values and query preselection

The visible topic values are:

- `Research collaboration`
- `Quickstart Automation`
- `Relocation planning`
- `Something else`

Query parameters map as follows:

| Query | Selected value |
| --- | --- |
| `?topic=research` | `Research collaboration` |
| `?topic=automation` | `Quickstart Automation` |
| `?topic=relocation` | `Relocation planning` |

Only the relocation value reveals the extra relocation fields and switches the main message label.

### Standard contact payload

All non-relocation topics send this shape:

```json
{
  "form_type": "contact",
  "name": "string",
  "email": "string",
  "topic": "Research collaboration | Quickstart Automation | Something else",
  "message": "string",
  "privacy_acknowledged": true,
  "website": "honeypot string"
}
```

`privacy_acknowledged` is a boolean generated with `FormData.has()`. `website` is the visually hidden honeypot.

### Relocation payload

When `topic` is `Relocation planning`, the page sends:

```json
{
  "form_type": "relocation",
  "name": "string",
  "email": "string",
  "topic": "Relocation planning",
  "current_location": "string",
  "target_location": "string",
  "timeline": "string",
  "household": "string",
  "hardest_part": "string copied from the message field",
  "urgent_or_sensitive": "string",
  "privacy_acknowledged": true,
  "website": "honeypot string"
}
```

Name, email, topic, message, and the privacy checkbox are required in HTML. The extra relocation fields are optional.

One implementation ambiguity should be preserved as a test target: the HTML form has an action and method, but the page's `noscript` message says JavaScript is required. The relaunch should either make non-JavaScript submission genuinely supported or prevent and describe it accurately. Do not change the Worker payload keys without coordinating the endpoint.

## Deployment flow

The GitHub Pages workflow is `.github/workflows/deploy-pages.yml`.

Triggers:

- every push to `main`;
- manual `workflow_dispatch`; and
- `17 */6 * * *`, or minute 17 every six hours in UTC.

Build job:

1. Check out Hekswerk with `actions/checkout@v6`.
2. Check out `libardo667/worldweaver` with `actions/checkout@v6` into `worldweaver-source`.
3. Record the WorldWeaver commit with `git rev-parse HEAD`.
4. Set up Node 24 and the npm cache with `actions/setup-node@v6`.
5. Configure Pages with `actions/configure-pages@v5`.
6. Install exact dependencies with `npm ci`.
7. Run `npm run build` with:
   - `WORLDWEAVER_DOCS_DIR=./worldweaver-source/docs`
   - `WORLDWEAVER_COMMIT=<recorded commit>`
8. Upload `build/` with `actions/upload-pages-artifact@v4`.

Deploy job:

1. Wait for the build job.
2. Deploy the artifact to the `github-pages` environment with `actions/deploy-pages@v4`.
3. Publish the Pages URL from the deployment step.

The workflow has `contents: read`, `pages: write`, and `id-token: write` permissions. Its `pages` concurrency group cancels an older in-progress run when a newer one begins. The six-hour schedule means a WorldWeaver-only documentation change is republished even when Hekswerk has not changed.

## Custom-domain setup

The domain contract is represented in four places:

1. `docusaurus.config.js` sets `url: 'https://www.hekswerk.com'` and `baseUrl: '/'`.
2. `static/CNAME` contains exactly `www.hekswerk.com`.
3. `static/robots.txt` points to `https://www.hekswerk.com/sitemap.xml`.
4. The workflow uses GitHub Pages configuration and deployment actions.

The production build contains both `CNAME` and `.nojekyll`. Read-only live checks confirmed:

- `https://www.hekswerk.com/` returns 200;
- `http://www.hekswerk.com/` redirects to HTTPS on `www`;
- `https://hekswerk.com/` redirects to HTTPS on `www`; and
- the current core routes and clean WorldWeaver documentation paths return 200.

DNS records and the repository's GitHub Pages settings are external to this checkout. The repository proves the intended domain, while the live redirect and route checks prove that the external configuration is currently functioning.

## URLs that must continue working

The relaunch must preserve these existing public contracts:

1. `/`, even though its content hierarchy changes.
2. `/about` and `/research`.
3. `/contact.html`, including the `research`, `automation`, and `relocation` topic query values.
4. `/worldweaver` and every WorldWeaver child route listed above.
5. `/robots.txt` and `/sitemap.xml`.
6. `/index.html`, `/about.html`, `/research.html`, `/worldweaver.html`, and the generated WorldWeaver child `.html` aliases. The four top-level aliases and a representative child alias return 200 on the live site; the local build proves that every child alias is still emitted.
7. Same-origin aura, contact CSS, contact JavaScript, and generated Docusaurus asset paths referenced by the built pages.
8. `www.hekswerk.com` as the canonical host, including HTTP-to-HTTPS and apex-to-`www` redirects.

The new `/automation` route is an addition required by the relaunch strategy. It has no current URL to preserve.

## Historical URL inventory and redirect plan

Before Docusaurus, the root-level site used `index.html`, `contact.html`, `intake.html`, `map.html`, `relocation.html`, `research.html`, and `the-practice.html`. Earlier snapshots lacked some of those pages. The July migration moved them into `legacy-static/`; commit `52eb1b0` then intentionally removed all but Contact from the deployed artifact.

Live checks show that `/the-practice.html`, `/intake.html`, `/relocation.html`, `/map.html`, and `/exhibits/` currently return 404. The relaunch did not cause those breaks, but it is the right point to recover the useful commercial entry paths.

| Historical URL | Current state | Relaunch plan | Reason |
| --- | --- | --- | --- |
| `/index.html` | 200 | Keep working as the generated homepage alias; canonical stays `/`. | Existing public alias with no semantic change. |
| `/about.html` | 200 | Keep working as the generated About alias; canonical stays `/about`. | Existing public alias. |
| `/research.html` | 200 | Keep working as the generated Research alias; canonical stays `/research`. | Existing historical and current public alias. |
| `/worldweaver.html` and manual `.html` paths | Built; landing and architecture alias live at 200 | Keep working; canonical links remain clean extensionless paths. | Existing generated aliases and potentially bookmarked documentation. |
| `/contact.html` | 200 | Preserve exactly. | It is the active form endpoint and the required relaunch contact route. |
| `/intake.html` | 404 | Add an exact static redirect page to `/contact.html`, preserving query and fragment data where possible. | Contact absorbed the old intake function. |
| `/the-practice.html` | 404 | Add an exact static redirect page to `/about`. | The new About page owns the one-person practice and two-lane explanation. It can lead commercial visitors onward to `/automation`. |
| `/relocation.html` | 404 | Add an exact static redirect page to `/contact.html?topic=relocation`. | Relocation is by inquiry and must not regain a public offer page. |
| `/map.html` | 404 | Add an exact static redirect page to `/`. | The old map was a whole-practice front door with no current one-to-one replacement. The homepage is the least misleading destination. |
| `/exhibits/` and every former exhibit path | 404 | Do not redirect or restore. Leave withdrawn URLs unavailable. | Commit `52eb1b0` removed claims and architectural interpretations that exceeded the evidence. Redirecting individual exhibits into current docs could imply continuity that is not warranted. |

GitHub Pages does not provide repository-level per-path HTTP redirects. Implement the four planned redirects as small, accessible static HTML redirect documents at the exact old filenames, with a canonical target, a visible fallback link, a short meta refresh, and JavaScript that preserves useful query or fragment information. These will be client-side redirect pages served with 200, not true HTTP 301 responses. A true status-code redirect would require an external edge or hosting change and is not part of the current architecture.

Former exhibit URLs include:

- `/exhibits/index.html`
- `/exhibits/honesty-machinery.html`
- `/exhibits/the-apothecary.html`
- `/exhibits/the-kitchen.html`
- `/exhibits/topic-monoculture.html`
- `/exhibits/two-weeks.html`
- `/exhibits/why-a-commons.html`
- `/exhibits/workshop/index.html`
- the three former workshop piece URLs below `/exhibits/workshop/pieces/`

If the general 404 page is improved later, it may link broadly to the current manual and research record. It must not identify a withdrawn exhibit as current documentation.

## Useful history to recover

Historical language is source material, not evidence for current commercial claims. Reuse it only where it agrees with the relaunch strategy and current facts.

### June consultancy homepage at `b1d3992:index.html`

Useful language and ideas:

- **“Careful systems work, done out loud.”** This is compact, distinctive practice language. It can support the offer, but it should not replace a plain first-viewport description of operations automation.
- **“Take a complex situation, map what depends on what, build something durable, and hand you documentation you own.”** This is the strongest concise description of the shared craft. Adapt it to the Sprint's exact workflow, build, test, deployment, documentation, training, and ownership promise.
- **“One workflow, built well.”** This remains a strong structural heading for the Operations Automation Sprint.
- **“Start with the shape of the problem.”** This supports a discovery-first process without promising a broad consulting engagement.
- The three-step sequence of tell me what is happening, choose a bounded scope, and leave with artifacts is useful. The relaunch should make the actual Sprint steps more specific.
- The method section's idea that a prospective client can inspect how Levi thinks before paying can connect WorldWeaver to systems depth without turning it into the product.
- The automation card's documentation, walkthrough, and credential-handoff concepts align with client-owned deployment. Use the current strategy's owner training and operating-documentation language as the authority.

Do not recover:

- three equal service doors;
- AI verification and research as a sold service;
- relocation as a homepage offer;
- a generic “systems consultancy” label without the concrete automation offer;
- old privacy, experience, or availability claims without current evidence; or
- em dashes from the old copy.

### Practice page at `0fbc945:the-practice.html`

Useful language and ideas:

- **“The part with clients”** is a plain way to distinguish contract work from open research.
- The visual hierarchy of one primary stream followed by lower-priority by-inquiry cards is useful. For the relaunch, Operations Automation Sprint takes the primary position and relocation alone remains by inquiry.
- **“Tell me what you're trying to do in plain language.”** This is appropriate contact language for a buyer who does not have a technical specification.
- **“I read it myself and reply directly, and I'll say honestly if it isn't something I'm the right person for.”** This accurately expresses a one-person practice and a fit boundary, subject to a final truth and tone check.
- The direct first-person voice and visible distinction between active work and by-inquiry work are both worth retaining.

Do not recover:

- the claim that client work exists to fund research;
- freelance AI evaluation as “the engine” or the primary public identity;
- automation as a secondary by-inquiry stream;
- three commercial streams;
- self-hosting, local AI, or privacy-first implementation as a universal promise; or
- any historical experience claim unless it is independently supported and relevant to the new offer.

The central correction is structural: the old practice page made commercial work subordinate to research funding. The relaunch makes contract operations automation a legitimate client-facing lane in its own right. WorldWeaver remains visible evidence of systems depth, not the reason a client should purchase the Sprint.

## Visual baseline

The checked-in captures show the first 1000 desktop pixels and first 844 mobile pixels of the five current main surfaces. They were captured from the successful production build through canonical routes after fonts and Docusaurus hydration settled.

| Surface | Desktop, 1440 by 1000 | Mobile, 390 by 844 |
| --- | --- | --- |
| Home | [home-desktop.png](./site-baseline/home-desktop.png) | [home-mobile.png](./site-baseline/home-mobile.png) |
| About | [about-desktop.png](./site-baseline/about-desktop.png) | [about-mobile.png](./site-baseline/about-mobile.png) |
| Research | [research-desktop.png](./site-baseline/research-desktop.png) | [research-mobile.png](./site-baseline/research-mobile.png) |
| WorldWeaver | [worldweaver-desktop.png](./site-baseline/worldweaver-desktop.png) | [worldweaver-mobile.png](./site-baseline/worldweaver-mobile.png) |
| Contact | [contact-desktop.png](./site-baseline/contact-desktop.png) | [contact-mobile.png](./site-baseline/contact-mobile.png) |

Visible baseline characteristics:

- Dark inky background, indigo and violet surfaces, gold accents, cyan links, aura mark, Fraunces headings, and Outfit body text.
- Spacious desktop compositions with a maximum content width near 1120 pixels.
- Large serif headings, uppercase eyebrow labels, rounded cards, hairline borders, and pill-shaped calls to action.
- A two-column homepage hero on desktop that becomes a single column on mobile.
- Narrow, text-led About and Research pages.
- Full documentation sidebar and table of contents on desktop, replaced by compact controls on mobile.
- A visually related but separate Contact implementation, with a larger brand header, patterned background, two-column desktop intake, and brand-only mobile header.

The captures are evidence of current appearance, not visual targets that require pixel-for-pixel preservation. The identity should remain recognizable while readability, commercial hierarchy, and navigation consistency improve.

## Reuse and breakage guardrails

### Reuse

- Docusaurus framework, source layout, route generation, and broken-link checks.
- GitHub Pages workflow, custom domain, scheduled WorldWeaver refresh, and exact manual commit link.
- WorldWeaver docs mount, clean documentation routes, edit links, and current evidence cautions.
- Aura mark, Fraunces and Outfit typography, dark palette, gold and cyan accents, rounded surfaces, and restrained systems language.
- Contact Worker endpoint and payload keys, with the current topic preselection contract.
- The one-person voice, bounded-scope structure, client-owned artifacts, and the useful historical phrases identified above.
- `/research` as the separation between dated evidence and the current manual.

### Do not reuse

- The current research-first homepage hierarchy or global metadata.
- The historical three-equal-doors structure.
- The later claim that contract work mainly exists to fund research.
- Quickstart Automation as a separate brand name. The authoritative offer name is Operations Automation Sprint.
- Former relocation landing-page positioning.
- Withdrawn exhibits or their architectural claims.
- Old assertions about clients, experience, privacy, self-hosting, AI, outcomes, or availability without present evidence.
- The contact page's divergent navigation as a reason to create a second site shell.

### Must not break

- Every current canonical and compatibility URL listed above.
- Contact query preselection and both payload shapes.
- The Worker endpoint unless a separately coordinated endpoint change is approved.
- `www.hekswerk.com`, `CNAME`, `.nojekyll`, robots, and sitemap generation.
- Builds from both the sibling local WorldWeaver docs and the GitHub Actions checkout path.
- Exact WorldWeaver source-version reporting in deployed footers.
- Direct access to the manual, repository, dated research, and About page.
- Mobile access to navigation and readable page content.

This is the boundary for implementation: change the public hierarchy and add the Operations Automation Sprint route, while preserving the working system recorded here.
