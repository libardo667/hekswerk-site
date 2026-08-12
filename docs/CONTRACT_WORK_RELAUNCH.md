# Contract work relaunch strategy

Status: authoritative for the August 2026 public-site relaunch.

This document defines the positioning, offer, route structure, and completion standard for the relaunch. It is the authority for this work. If older site copy, retired pages, or prior positioning conflicts with this document, follow this document. The current Docusaurus architecture and the public WorldWeaver manual remain authoritative for how the site and research documentation work.

## The practice

Hekswerk is Levi Banks's one-person systems practice. It has two lanes:

1. **Contract work:** scoped operations automation for small professional-service teams.
2. **Independent engineering and open research:** public systems work, including EvoGen, the Kenshi Agent Environment, and WorldWeaver.

Both lanes are real work. They share a systems discipline, but they have different purposes, evidence, and obligations. Contract work is the primary public commercial offer and the homepage front door. Independent engineering and open research remain serious, visible work, but they are not the service being sold.

The site should speak plainly and use first person where Levi is describing his own work, decisions, or availability. It must not imply a staff, agency, platform, client roster, or operating history that does not exist.

## Primary offer: Operations Automation Sprint

The Operations Automation Sprint is the only primary offer in the August launch.

It is for small, operations-heavy professional-service teams, generally 3 to 25 people, that have a repetitive internal workflow held together by manual copying, follow-up, status checking, or report assembly. The buyer does not need to arrive with a technical specification. They should be able to identify one recurring workflow, the people who own it, and the systems it currently passes through.

Typical inputs include:

- email;
- forms;
- documents;
- spreadsheets;
- customer relationship management systems;
- task systems; and
- recurring reports.

The offer is not limited to these inputs, but public copy should use concrete examples like these instead of generic claims about transformation, efficiency, or artificial intelligence.

### The promise

For one agreed workflow, Levi will:

1. map the current workflow, including its trigger, decisions, handoffs, systems, and intended result;
2. define a bounded build and an acceptance check before implementation begins;
3. build the automation and test it against agreed examples and failure cases;
4. deploy it into systems the client owns or controls;
5. provide operating documentation, including how the workflow runs and what to do when it fails;
6. train the person who will own the workflow; and
7. provide 30 calendar days of bounded defect correction after handoff.

The default defect-correction period is 30 calendar days after handoff. It covers defects where the delivered automation does not behave as documented against the agreed scope. New integrations, changed business rules, expanded inputs, and new workflow branches are new work, not defect correction.

In the ordinary case, the sprint contains one primary workflow across one to three systems. It includes workflow mapping, acceptance criteria, implementation, happy-path and exception testing, basic logs or an audit trail appropriate to the scope, deployment into client-owned systems, a written runbook, and one handoff or training session.

The client keeps control of its accounts, credentials, data, and deployed system. Hekswerk is not a required hosting layer, subscription, or permanent operator. If a build needs a custom service, its ownership, hosting, access, and ongoing maintenance must be explicit in the scope before work begins.

### Scope and pricing

Public pricing must use these tiers without presenting them as an exhaustive rate card:

- **Founding-client price: $750.** This is for an unusually tight first scope: one clear trigger, one primary outcome, no custom service or database, and no more than two client-owned systems. The client must also give permission to develop an anonymized case study. Nothing is published without the client's approval, and a positive testimonial is not required. It is launch pricing for a qualifying workflow, not a claim that every project costs $750.
- **Standard starting price: $1,500.** This is the normal starting point for a scoped Operations Automation Sprint.
- **Complex work: $2,500 and above.** This applies when the agreed solution needs a custom service, a database, or several integrations. The scope and price must be agreed before implementation.

Do not add invented discounts, package levels, urgency, limited-slot language, return-on-investment figures, or savings estimates. Do not imply that price alone establishes fit.

### Fit boundaries

The offer is a fit when one recurring operational workflow can be named, bounded, tested, handed off, and owned by the client.

The offer is not:

- open-ended operations consulting;
- fractional operations staffing;
- indefinite maintenance or support;
- a general software-development retainer;
- a generic AI strategy or chatbot engagement;
- a promise to automate an entire business; or
- a substitute for legal, financial, security, or compliance advice.

A sprint does not hide a custom software-as-a-service product inside a fixed scope. It does not include indefinite maintenance or 24-hour support. Initial discovery must not use sensitive production data. Regulated or unusually sensitive data requires a separate assessment before access or implementation is agreed. The client owns the accounts, credentials, documentation, and resulting system.

Representative projects may include:

- form or email intake routed into a tracker or customer relationship management system;
- attachments extracted and reconciled against internal records;
- recurring CSV or spreadsheet exports cleaned into a report;
- deadline or follow-up tasks created from structured records; and
- an unreliable Zapier, Make, or n8n workflow rebuilt with visible failures and documentation.

These are examples of suitable scopes, not claims that each project has already been delivered for a client.

Artificial intelligence may or may not be useful inside a particular workflow. It is not the category being sold and must not be inserted into the offer merely to make the work sound current.

## Open research lane

WorldWeaver is Hekswerk's open research lane. It is serious, visible work and evidence that Levi can reason about stateful systems, boundaries, documentation, testing, and failure modes. That evidence must remain inspectable through the technical manual, source repository, and dated research record.

WorldWeaver is not:

- the commercial front door;
- an Operations Automation Sprint deliverable;
- a hosted product or service;
- a client platform;
- a source of invented commercial experience; or
- proof of client outcomes it was not designed to measure.

The site may connect the discipline visible in WorldWeaver to the care used in contract work. It must not imply that WorldWeaver itself is being sold or that research results are production-client results.

## Relocation planning

Relocation planning is a secondary, by-inquiry lane. It is not part of the August launch.

For this relaunch:

- do not place relocation planning in the primary navigation or homepage offer hierarchy;
- do not publish or restore a relocation landing page;
- do not advertise relocation pricing, cohorts, launch dates, or availability; and
- keep a relocation topic in the contact form so an existing or referred inquiry can still reach Levi.

Relocation planning must not become a third equal front door. Any later public launch requires a separate strategy decision.

## Required public route structure

The relaunch uses the existing site rather than creating a microsite or parallel application.

| Route | Required role |
| --- | --- |
| `/` | Hekswerk homepage and commercial front door. Lead with the Operations Automation Sprint, its audience, its concrete outcome, starting price, and one primary inquiry action. Introduce Hekswerk as a one-person practice with contract and research lanes. Give WorldWeaver a visible but secondary research section. |
| `/work` | Complete Operations Automation Sprint page. State the workflow problem, audience, promise, process, scope boundaries, price tiers, client ownership, defect-correction boundary, and inquiry action. This is a service page, not an app or product dashboard. |
| `/work/selected-work` | Claims-ledger-controlled evidence page. Separate professional work, independent engineering, and open research. Give paid employer automation visual primacy, identify provenance and limits for every case, and do not present independent projects as commercial deployments. |
| `/research` | Orientation page for independent engineering and open research. Present EvoGen and Kenshi Agent Environment as the current active agent-system work, with their source, verification paths, maturity, and explicit limits. Present WorldWeaver as established open research with its manual and dated research record intact. Keep all three separate from the commercial offer. |
| `/worldweaver/` | Existing Docusaurus integration for the canonical WorldWeaver technical manual. Keep the external docs source, sidebar, edit links, and published commit reference intact. WorldWeaver remains directly reachable from the engineering and research page, project sections, and footer. |
| `/about` | Explain the one-person practice, its two lanes, the working method, and the client-ownership posture without inflating credentials or experience. Link to the primary offer and contact route. |
| `/contact` | Docusaurus contact page using the existing private submission endpoint. Make automation the primary commercial topic and support `/contact?topic=automation` from offer calls to action. Keep research, relocation, and general-contact paths available without presenting them as equal commercial offers. |

The primary navigation should reflect the two lanes rather than elevating one project: **Contract Work**, **Selected Work**, **Engineering & Research**, **About**. A prominent **Start a conversation** action appears separately. Individual projects do not appear in primary navigation. Their repositories belong in Selected Work, Engineering & Research, relevant project sections, and the footer. The general GitHub profile belongs in the footer rather than displacing the commercial action.

There is no August route for a blog, newsletter, client portal, scheduler, chatbot, product application, or relocation landing page. Existing retired URLs need not be restored unless a later implementation discovers a specific redirect requirement.

## Content hierarchy

The homepage must answer these questions in order:

1. What does Hekswerk do for a prospective client?
2. Is the Operations Automation Sprint meant for a team like theirs?
3. What happens during the sprint and what do they own afterward?
4. What does it cost to start?
5. Who is doing the work and how can they inquire?
6. What independent engineering and open research is active, and where can they inspect it?

The first viewport must not require a visitor to understand WorldWeaver before understanding the commercial offer. The site may retain the aura mark, dark indigo and violet palette, gold accents, Fraunces headings, Outfit body copy, rounded cards and buttons, and quiet systems-oriented visual language. Readability takes priority over atmosphere when the two conflict.

Calls to action should describe the next step, such as **Discuss a workflow** or **Ask about an automation sprint**. Do not add a scheduling platform. The contact form and direct email remain the conversion path.

## Claims and voice

Public copy must:

- use plain language;
- use first person when Levi is speaking about his own work;
- refer to Hekswerk as a one-person practice, not as “we” or an agency;
- name concrete systems, artifacts, steps, and boundaries;
- distinguish current capabilities from goals or research direction; and
- contain no em dashes.

Public copy must not invent or imply:

- clients, case studies, testimonials, or logos;
- revenue, time saved, error reduction, conversion, or other outcome metrics;
- certifications, partnerships, audits, or compliance status;
- production experience that has not occurred;
- guaranteed business outcomes; or
- security, privacy, or regulatory claims beyond what the implementation can directly support.

## Architecture and identity invariants

The relaunch must preserve:

- Docusaurus as the site framework;
- the current GitHub Pages build and deployment workflow;
- `www.hekswerk.com` and the existing custom-domain configuration;
- the `/worldweaver` documentation integration with the sibling repository locally and the checked-out repository in GitHub Actions;
- the exact published WorldWeaver commit link in the footer;
- the Docusaurus contact form and its existing submission endpoint unless a separately scoped change is approved; and
- the established aura mark, typography, palette, and overall visual character.

New public pages should live in the current Docusaurus source tree. Do not create a second site, restore the former static homepage, or build on withdrawn research exhibits.

## Explicit non-goals

The August relaunch does not include:

- a content management system;
- a blog or newsletter;
- user accounts or a client portal;
- a scheduling platform;
- a generic chatbot;
- a new product brand;
- a SaaS application or hosted automation platform;
- a research microsite;
- turning WorldWeaver into a product;
- a generic AI consultancy;
- speculative services beyond the Operations Automation Sprint;
- a public relocation campaign;
- invented proof, including clients, metrics, testimonials, certifications, compliance claims, or production experience; or
- a visual rebrand.

## Relaunch completion criteria

The public relaunch is complete only when all of the following are true:

1. The route structure above is implemented in the existing Docusaurus site, with no parallel site or application.
2. The homepage and metadata make contract operations automation the primary commercial front door.
3. The `/work` page states the full promise, audience, process, ownership model, price tiers, and scope boundaries without unsupported claims.
4. The contact form names the Operations Automation Sprint, accepts preselection through `?topic=automation`, and still supports research, relocation, and general inquiries.
5. Independent engineering and open research remain visible through the lane-level navigation, homepage, `/research`, Selected Work, relevant project links, and footer. EvoGen and Kenshi Agent Environment are presented as current agent-system work. WorldWeaver remains visible through the homepage research section, `/research`, and the complete `/worldweaver/` manual integration, but no individual project occupies primary navigation or is framed as the service being sold.
6. Relocation planning is absent from the primary navigation and public offer hierarchy, with no restored landing page or August launch claim.
7. The current Docusaurus framework, GitHub Pages workflow, custom domain, WorldWeaver source integration, published commit reference, and contact submission endpoint remain intact.
8. The existing visual identity is preserved and the changed pages are readable at desktop and mobile widths.
9. All public copy passes a manual claims audit and a repository search for em dashes. It uses one-person language and contains no invented clients, metrics, testimonials, certifications, compliance claims, or production experience.
10. A production build using the real WorldWeaver documentation succeeds with broken-link checks enabled. The built output contains the required routes and retains the custom-domain file.
11. Per-page titles, descriptions, canonical URLs, Open Graph metadata, a Hekswerk social-sharing image, and minimal accurate structured data describe the umbrella practice rather than only WorldWeaver.
12. The implementation is delivered as one coherent relaunch commit after all relevant checks pass.

## Historical context

The June 2026 site made Hekswerk a consultancy umbrella with three equal doors. The July 2026 Docusaurus migration then made WorldWeaver the front door, connected the canonical manual, and later removed obsolete research exhibits and corrected claims that exceeded the evidence.

This strategy keeps the stronger architecture and evidentiary discipline from July while changing the public hierarchy. Hekswerk is again the umbrella, but it has two lanes rather than three equal offers. The Operations Automation Sprint is the commercial front door. WorldWeaver is open research. Relocation planning remains available only by inquiry.
