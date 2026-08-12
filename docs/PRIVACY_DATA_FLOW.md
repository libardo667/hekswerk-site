# Website privacy and data-flow audit

Status: implementation authority for public privacy copy.

Last checked: 2026-08-12.

This document describes the current public website and initial inquiry path. It is not a generic privacy policy and
does not cover data handling for a later client engagement. Recheck the implementation and cited provider behavior
before reusing a claim after either changes.

## Browser data flows

| Trigger                             | Recipient or storage                   | Data involved                                                                                                                                                                                                                                               | Current retention evidence                                                                                                               |
| ----------------------------------- | -------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Canonical `www.hekswerk.com` page view or `workers.dev` review-page view | Cloudflare Workers Static Assets | The HTTP request, asset path, and ordinary connection metadata needed to serve the deployment. The review hostname sends `X-Robots-Tag: noindex, nofollow`. | Cloudflare controls platform processing and service retention. Automatic Worker invocation logs are disabled in repository configuration. |
| Any page view                       | Cloudflare Web Analytics               | Host, path, referrer, country, browser and device categories, navigation and performance metrics. Cloudflare says it does not log query strings, use cookies or browser storage, fingerprint individuals, or collect or use personal data for this product. | Cloudflare says unsampled beacon data is retained for seven days and then aggregated, and its dashboard exposes the previous six months. |
| First page in a browser-tab session | Browser `sessionStorage`               | Initial same-site path and optional `utm_source`, `utm_medium`, and `utm_campaign`. No other query parameters.                                                                                                                                              | Browser-controlled tab session. The values are sent to Hekswerk only with an inquiry.                                                    |
| Page asset loading                  | Hekswerk site origin                   | Astro JavaScript, CSS, images, and locally bundled Fraunces and Outfit WOFF2 files.                                                                                                                                                                         | Normal browser and hosting caches. No Google Fonts request remains.                                                                      |
| Visitor chooses an external link    | The chosen destination, usually GitHub | Ordinary connection metadata required to serve the destination. Hekswerk external links use `noreferrer`, so they do not send the Hekswerk page as the referring URL.                                                                                       | Controlled by the destination provider. No request occurs merely because the Hekswerk page contains the link.                            |

The only automatic cross-origin page requests are the explicitly installed Cloudflare Web Analytics script at
`static.cloudflareinsights.com` and its report to `cloudflareinsights.com`. A browser test and built-artifact check fail
if Google Fonts or an unapproved automatic third-party request returns.

### Provider evidence

- Cloudflare Workers Logs behavior:
  <https://developers.cloudflare.com/workers/observability/logs/workers-logs/>
- Cloudflare data origin and collection:
  <https://developers.cloudflare.com/web-analytics/data-metrics/data-origin-and-collection/>
- Cloudflare dimensions:
  <https://developers.cloudflare.com/web-analytics/data-metrics/dimensions/>
- Cloudflare cookie, query-string, and retention details:
  <https://developers.cloudflare.com/web-analytics/faq/>
- Cloudflare client-state and fingerprinting statement:
  <https://developers.cloudflare.com/web-analytics/data-metrics/core-web-vitals/>

## Inquiry data flow

```text
browser form
  -> Hekswerk Cloudflare Worker
  -> Resend email API
  -> Hekswerk Microsoft 365 mailbox
```

The Microsoft 365 destination is identified by the public `hekswerk.com` MX record. No private account record or
message content is needed to establish that routing.

### Browser form

Every inquiry sends:

- schema and topic identifiers;
- name and email address;
- privacy acknowledgement and the hidden honeypot value;
- the initial same-site path and the three allowed UTM values, when present; and
- topic-specific answers.

Automation asks for a high-level repeating process and sensitive-or-regulated classification. Organization, systems,
current failure points, frequency, and desired timing are optional. Research and general inquiries contain one message.
Relocation contains one high-level note. The public form no longer asks separately for household, street address,
documents, or detailed constraints.

### Cloudflare intake Worker

The Worker:

- accepts only JSON with the exact version 2 schema and a known form type;
- gives CORS permission only to the two production origins, the named static-site review Worker, and the documented
  local development origins;
- limits the request body to 32,000 bytes and bounds individual values;
- validates required fields, email shape, select values, and same-site attribution paths;
- silently discards a filled honeypot submission;
- has no KV, D1, R2, Durable Object, queue, analytics, or other persistence binding;
- does not log request bodies or normalized submissions;
- disables automatic invocation logs; and
- emits only content-free configuration or delivery errors.

CORS is a cooperating-browser boundary, not client authentication. Validation and the honeypot reduce malformed input
and simple form spam; they are not a promise that abuse is impossible.

Cloudflare necessarily processes the HTTPS request and platform metadata to run the Worker. The repository does not
claim that Cloudflare retains nothing internally. Workers Logs documentation says default invocation logs include
request and response metadata, which is why this Worker's configuration disables them:
<https://developers.cloudflare.com/workers/observability/logs/workers-logs/>.

### Resend and destination mailbox

For an accepted inquiry, Resend receives the submitter's name, email address, form answers, and limited attribution as
a plain-text email request. Resend's dashboard can display sent message contents, and its API request logs can include
the full request body. Resend currently states that it retains email data for 30 days. Hekswerk does not configure a
separate webhook store, audience, contact list, or marketing automation for this form.

The delivered copy goes to the Hekswerk mailbox hosted by Microsoft 365. That mailbox is the durable working copy used
to understand and reply to the inquiry. Its exact deleted-item, backup, and administrative retention configuration has
not been verified, so the public site does not promise an automatic mailbox deletion schedule.

Provider evidence:

- Resend sent-message contents and logs: <https://resend.com/docs/dashboard/emails/introduction>
- Resend full request-log behavior: <https://resend.com/docs/dashboard/logs/introduction>
- Resend 30-day email-data retention statement:
  <https://resend.com/docs/dashboard/webhooks/how-to-store-webhooks-data>

## Deletion requests

A person can request deletion by emailing `levi@hekswerk.com`, preferably from the submitted address, with the
approximate submission date. The practical response is to:

1. identify the inquiry without asking the person to resend its sensitive contents;
2. delete the copies under Hekswerk's control from the active mailbox and recoverable mail folders as available;
3. ask Resend about a provider-held copy if it may still be inside its retention period; and
4. reply with what was removed and what provider-controlled logs, backups, or retention could not be directly erased or
   verified.

Do not promise deletion from GitHub, Cloudflare, Resend, Microsoft, or their backups unless the specific provider action
has been completed and observed.

## Working practice after initial inquiry

The public form is not the right channel for passwords, access tokens, production data, health information, legal
files, financial identifiers, identity records, or confidential datasets. If later work may require non-public data:

1. stop collecting details through the initial form or ordinary email;
2. name the systems, data categories, owner, purpose, and minimum access required before access is granted;
3. prefer synthetic or redacted examples when they can prove the workflow;
4. use client-owned accounts and client-created, narrowly scoped credentials;
5. do not copy secret values into source control, tickets, runbooks, screenshots, logs, or chat transcripts;
6. agree on where working data may be stored and how it will be removed before receiving it; and
7. revoke or transfer access at handoff and record that disposition.

These are operating boundaries for future work, not claims of certification, regulatory compliance, or prior client
experience.

## Unknowns that must remain qualified

- The current Resend key was operator-verified on 2026-08-12 as sending-only and restricted to `mail.hekswerk.com`. The
  prior key was revoked. This establishes the configured scope, not a general security or delivery guarantee.
- Cloudflare's internal platform processing outside the configured Workers Logs surface was not established.
- The Microsoft 365 mailbox's administrative retention and backup policy was not established.
- Provider backup deletion timing and legal-retention exceptions were not established.
- An HTTP success from the Worker proves provider acceptance, not guaranteed inbox delivery.
- No general security, confidentiality, compliance, or privacy certification follows from this implementation.
