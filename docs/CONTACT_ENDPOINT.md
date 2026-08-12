# Hekswerk contact endpoint

Status: repository authority for the contact-form payload and the external Worker dependency.

Last verified: 2026-08-12.

## System boundary

The public `/contact` page posts JSON over HTTPS to:

`https://hekswerk-intake.levi-020.workers.dev/`

Cloudflare Workers runs the endpoint. A Secret binding named `resend_api_key` authorizes a request to Resend, which
delivers a plain-text email to the public Hekswerk contact address hosted by Microsoft 365. The form does not create an
account, schedule a meeting, subscribe anyone to a list, or write to a site-owned database. The complete browser and
provider flow is audited in `docs/PRIVACY_DATA_FLOW.md`.

The Worker source is `workers/intake/worker.js`. Its deploy configuration is `workers/intake/wrangler.jsonc`. The
dashboard evidence recovered on 2026-08-12 is recorded in
`workers/intake/CLOUDFLARE_DASHBOARD_INVENTORY.md` without secret values or Cloudflare account identifiers.

## Deployment authority

The recovered active deployment had these verified properties:

- Worker name: `hekswerk-intake`
- Active version before repository management: `b34b4786`, serving 100 percent of traffic
- Active version deployment time: `2026-06-14T22:42:26.050Z`
- Deployment source: manual Cloudflare dashboard deployment
- Compatibility date: `2026-05-22`
- Compatibility flags: none
- Public `workers.dev` URL enabled
- Preview URLs disabled
- Custom domains, routes, scheduled triggers, and non-secret resource bindings: none
- Required external binding: `resend_api_key`, verified as a Cloudflare Secret
- Workers Logs and invocation logs enabled in the recovered dashboard deployment
- Connected Git repository or external build configuration: none

The audited Worker was deployed with Wrangler 4.121.0 on 2026-08-12. Cloudflare reports version
`64ea07a6-b02b-4b75-a123-4a6e8dae84fb`, created at `2026-08-12T14:22:45.304Z`, receiving 100 percent of traffic. The
Cloudflare deployment listing labels the source `Unknown (deployment)`; the local deployment command and its successful
output are the evidence that it came from `npm run worker:deploy` in this repository.

The repository deliberately preserves the verified compatibility date. Changing that date is a separate runtime
upgrade and requires targeted testing against Cloudflare's compatibility changes.

## Browser contract

The browser sends `schema_version: 2` and one of four `form_type` values:

| `form_type` | Public topic | Required topic-specific fields |
| --- | --- | --- |
| `automation` | Operations Automation Sprint | `repeating_process`, `sensitive_or_regulated` |
| `research` | Research collaboration | `message` |
| `general` | Something else | `message` |
| `relocation` | Relocation planning | `hardest_part` |

Every version 2 payload also includes:

| Field | Type | Requirement and limit |
| --- | --- | --- |
| `schema_version` | number | Must be `2` |
| `form_type` | string | One of the four values above |
| `name` | string | Required, at most 120 characters |
| `email` | string | Required, syntactically validated, at most 200 characters |
| `topic` | string | Public display label, at most 120 characters |
| `privacy_acknowledged` | boolean | Must be exactly `true` |
| `website` | string | Honeypot, at most 200 characters |
| `utm_source` | string | Optional, at most 200 characters |
| `utm_medium` | string | Optional, at most 200 characters |
| `utm_campaign` | string | Optional, at most 200 characters |
| `initial_landing_path` | string | Optional same-site pathname beginning with `/`, at most 500 characters |

### Automation fields

| Field | Requirement and limit |
| --- | --- |
| `organization` | Optional, at most 200 characters |
| `repeating_process` | Required, at most 3,000 characters |
| `systems_involved` | Optional, at most 1,000 characters |
| `current_problem` | Optional, at most 3,000 characters |
| `approximate_frequency` | Optional, at most 120 characters |
| `desired_timing` | Optional, at most 120 characters |
| `sensitive_or_regulated` | Required and exactly `No`, `Yes`, or `Unsure` |

### Relocation fields

| Field | Requirement and limit |
| --- | --- |
| `hardest_part` | Required, at most 3,000 characters |

Research and general submissions have one required `message` of at most 5,000 characters.

## Attribution and browser storage

The first Hekswerk page loaded in a browser-tab session records only its pathname and the optional campaign parameters
`utm_source`, `utm_medium`, and `utm_campaign`. These values are placed in `sessionStorage`, not cookies. They are sent
to the Worker only if the visitor submits the contact form. Other query parameters are not retained for attribution.
If session storage is unavailable, submission still works and uses the current page's allowed attribution values.

## Compatibility behavior

The public `/contact.html` route redirects to `/contact` while preserving its query string and fragment. This is URL
compatibility only. The Worker accepts the exact version 2 contract and rejects the pre-versioned payload shapes that
were retained temporarily during the previous staged deployment.

## Validation, abuse boundary, and responses

- Only the two Hekswerk production origins and the documented Astro development or preview origins receive CORS
  permission.
- Requests other than `POST` and `OPTIONS` are rejected.
- POST requests must declare `application/json`.
- JSON bodies larger than 32,000 bytes are rejected.
- A filled `website` honeypot receives a successful response but causes no email delivery.
- Required fields, email shape, enumerated selections, lengths, and attribution path shape are checked at the Worker.
- Provider response bodies are not returned to visitors or written to logs by this source.
- Automatic invocation logs are disabled. The only application log calls are content-free configuration or delivery
  errors.
- Responses carry `Cache-Control: no-store`.

Expected JSON responses:

| Situation | HTTP status | Body |
| --- | --- | --- |
| Accepted or honeypot submission | 200 | `{"ok":true}` |
| Successful preflight | 204 | Empty |
| Invalid origin | 403 | `{"error":"Origin not allowed"}` |
| Wrong content type | 415 | `{"error":"Content type must be application/json"}` |
| Invalid JSON or payload | 400 | A bounded public error message |
| Oversized body | 413 | `{"error":"Submission is too long"}` |
| Missing Secret binding | 500 | `{"error":"Email delivery is not configured"}` |
| Resend failure | 502 | `{"error":"Email delivery failed"}` |

The public form announces success and failure in an ARIA live region. Failure copy gives the public Hekswerk email as a
direct fallback.

CORS is a browser boundary, not authentication. Validation, size limits, and the honeypot reduce malformed input and
simple spam; they are not a security, abuse-prevention, confidentiality, or compliance guarantee.

## Retention boundary

The Worker has no persistence binding and does not write inquiry contents to logs. Cloudflare still processes the
request and its platform metadata. On successful delivery, Resend receives the full plain-text message and request body;
its current documentation states that email data is retained for 30 days. The delivered message remains in the
Hekswerk Microsoft 365 mailbox under that mailbox's deletion and retention settings. No exact mailbox or provider
backup deletion schedule is asserted.

Deletion requests go to `levi@hekswerk.com`. The handling checklist, provider evidence, and known unknowns are recorded
in `docs/PRIVACY_DATA_FLOW.md`.

## Evidence levels

- **Source-verified:** normalization, validation, honeypot handling, CORS, Resend request construction, payload limits,
  compatibility behavior, and public responses in `workers/intake/worker.js`.
- **Test-verified:** form payload construction, attribution lifetime and fallback, Worker success and failure paths,
  strict version and content-type rejection, conditional fields, browser success and failure, keyboard behavior, and
  automated accessibility.
- **Dashboard-verified:** the recovered active version, compatibility settings, route state, Secret binding type,
  deployment source, and pre-audit observability state listed above.
- **Deployment-verified:** version `64ea07a6-b02b-4b75-a123-4a6e8dae84fb` has the repository compatibility date and
  required Secret binding and was deployed from the configuration that disables automatic invocation logs.
- **Externally observed:** the public endpoint resolves, permits the production origin, requires JSON, rejects a
  retired payload, and silently accepts a synthetic filled-honeypot request without delivery.
- **Delivery-observed:** after the repository-managed deployment, one non-sensitive version 2 smoke inquiry received an
  HTTP 200 response and Levi confirmed it arrived in the destination inbox. This was a one-time deployment check, not
  an assertion of guaranteed future delivery or of a particular destination mail provider.
- **Provider-documented:** Resend displays sent message contents and API request bodies and currently states that email
  data is retained for 30 days. Cloudflare documents the metadata included in automatic invocation logs, which this
  Worker's configuration disables.
- **Not asserted:** Cloudflare internal retention outside configured Workers Logs, Microsoft 365 mailbox or backup
  deletion timing, guaranteed message delivery, or any compliance property.

## Deployment procedure

1. Run `npm run check` from the repository root.
2. Confirm `npx wrangler whoami` names the intended Cloudflare account.
3. Run `npm run worker:deploy`.
4. Record the new version ID, deployment time, and source in the dashboard inventory.
5. Exercise preflight, rejected-origin, validation, honeypot, and one authorized delivery smoke test without using real
   sensitive information.
6. Deploy the site only after the Worker accepts the current public version 2 contract.

Never commit the Resend API key, Cloudflare API tokens, account IDs, contact submissions, or logs containing personal
information.
