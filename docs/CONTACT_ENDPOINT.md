# Hekswerk contact endpoint

Status: repository authority for the contact-form payload and the external Worker dependency.

Last verified: 2026-08-12.

## System boundary

The public `/contact` page posts JSON over HTTPS to:

`https://hekswerk-intake.levi-020.workers.dev/`

Cloudflare Workers runs the endpoint. A Secret binding named `resend_api_key` authorizes a request to Resend, which
delivers a plain-text email to the public Hekswerk contact address. The form does not create an account, schedule a
meeting, subscribe anyone to a list, or write to a site-owned database.

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
- Workers Logs and invocation logs enabled
- Connected Git repository or external build configuration: none

The repository-managed Worker was deployed with Wrangler 4.121.0 on 2026-08-12. Cloudflare reports version
`69743eb4-2b6e-4cff-9dd0-46346a27434e`, created at `2026-08-12T13:42:59.276Z`, receiving 100 percent of traffic. The
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
| `current_location` | Optional, at most 200 characters |
| `target_location` | Optional, at most 200 characters |
| `timeline` | Optional, at most 80 characters |
| `household` | Optional, at most 120 characters |
| `hardest_part` | Required, at most 3,000 characters |
| `constraints` | Optional, at most 3,000 characters |

Research and general submissions have one required `message` of at most 5,000 characters.

## Attribution and browser storage

The first Hekswerk page loaded in a browser-tab session records only its pathname and the optional campaign parameters
`utm_source`, `utm_medium`, and `utm_campaign`. These values are placed in `sessionStorage`, not cookies. They are sent
to the Worker only if the visitor submits the contact form. Other query parameters are not retained for attribution.
If session storage is unavailable, submission still works and uses the current page's allowed attribution values.

## Compatibility behavior

The Worker accepts the pre-versioned `contact` and `relocation` payloads that the public site used before version 2.
This permits a safe deployment order: deploy the backward-compatible Worker first, then deploy the new site. The
browser-generated `/contact.html` route redirects to `/contact` while preserving its query string and fragment.

Compatibility is not permission to add new legacy clients. New integrations must use version 2.

## Validation, abuse boundary, and responses

- Only the two Hekswerk production origins and the documented Astro development or preview origins receive CORS
  permission.
- Requests other than `POST` and `OPTIONS` are rejected.
- JSON bodies larger than 32,000 bytes are rejected.
- A filled `website` honeypot receives a successful response but causes no email delivery.
- Required fields, email shape, enumerated selections, lengths, and attribution path shape are checked at the Worker.
- Provider response bodies are not returned to visitors or written to logs by this source.

Expected JSON responses:

| Situation | HTTP status | Body |
| --- | --- | --- |
| Accepted or honeypot submission | 200 | `{"ok":true}` |
| Successful preflight | 204 | Empty |
| Invalid origin | 403 | `{"error":"Origin not allowed"}` |
| Invalid JSON or payload | 400 | A bounded public error message |
| Oversized body | 413 | `{"error":"Submission is too long"}` |
| Missing Secret binding | 500 | `{"error":"Email delivery is not configured"}` |
| Resend failure | 502 | `{"error":"Email delivery failed"}` |

The public form announces success and failure in an ARIA live region. Failure copy gives the public Hekswerk email as a
direct fallback.

## Evidence levels

- **Source-verified:** normalization, validation, honeypot handling, CORS, Resend request construction, payload limits,
  compatibility behavior, and public responses in `workers/intake/worker.js`.
- **Test-verified:** form payload construction, attribution lifetime and fallback, Worker success and failure paths,
  prior-payload compatibility, conditional fields, browser success and failure, keyboard behavior, and automated
  accessibility.
- **Dashboard-verified:** the recovered active version, compatibility settings, route state, Secret binding type,
  deployment source, and observability state listed above.
- **Externally observed:** the public endpoint resolves and currently enforces the production-origin boundary.
- **Delivery-observed:** after the repository-managed deployment, one non-sensitive version 2 smoke inquiry received an
  HTTP 200 response and Levi confirmed it arrived in the destination inbox. This was a one-time deployment check, not
  an assertion of guaranteed future delivery or of a particular destination mail provider.
- **Not asserted:** Resend retention beyond its role as the delivery provider, Cloudflare internal retention beyond
  visible dashboard settings, guaranteed message delivery, or any compliance property.

## Deployment procedure

1. Run `npm run check` from the repository root.
2. Confirm `npx wrangler whoami` names the intended Cloudflare account.
3. Run `npm run worker:deploy`.
4. Record the new version ID, deployment time, and source in the dashboard inventory.
5. Exercise preflight, rejected-origin, validation, honeypot, and one authorized delivery smoke test without using real
   sensitive information.
6. Deploy the site only after the Worker accepts both the previous contract and version 2.

Never commit the Resend API key, Cloudflare API tokens, account IDs, contact submissions, or logs containing personal
information.
