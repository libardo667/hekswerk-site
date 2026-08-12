# Website privacy and data-flow audit

Status: implementation authority for public privacy copy.

Last checked: 2026-08-12.

This document covers the public website and initial inquiry path. Later client work requires a separate scope using
`docs/PRIVACY_AND_AI_SCOPING.md`.

## Controller and scope

Levi Banks, operating Hekswerk as a one-person practice, determines the purpose and means of the website and inquiry
path and is the controller where European data-protection law applies. The public contact is `levi@hekswerk.com`.

The public form's privacy checkbox is an acknowledgement that the notice was presented. It is not marketing consent
and is not treated as the legal basis for processing.

## Browser data flows

| Trigger                              | Recipient or storage               | Data involved                                                                                                                                                                                                                | Current boundary                                                                                                                                                                                                            |
| ------------------------------------ | ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Page or asset request                | Cloudflare Workers Static Assets   | Requested address, IP address, and ordinary HTTP, TLS, and connection information needed to serve and protect the site                                                                                                       | Cloudflare-controlled platform processing. The asset-only site Worker has no application logs or storage binding.                                                                                                           |
| Aggregate traffic reporting          | Cloudflare zone analytics          | Requests, bandwidth, page views, visits, and broad country-level measures derived from edge traffic. Cloudflare says visit and country measures use IP information.                                                          | Hekswerk sees aggregate dashboard measures, not raw request logs. No client-side analytics beacon is installed. Provider retention is not asserted.                                                                         |
| Browser encounters a network failure | Cloudflare Network Error Logging   | Supporting browsers may report the failed address, referrer, request method, timing, protocol, status, error type, and network connection. Cloudflare uses the connection IP to derive the network, country, and metro area. | Cloudflare says the IP exists only in volatile memory during processing, personal data is then purged, and reports are not shared with third parties. This is a provider-added response-header path, not a Hekswerk script. |
| Page asset loading                   | Hekswerk site origin               | Astro JavaScript, CSS, images, and locally bundled Fraunces and Outfit WOFF2 files                                                                                                                                           | Normal browser and hosting caches. No Google Fonts request.                                                                                                                                                                 |
| Visitor chooses an external link     | Chosen destination, usually GitHub | Ordinary connection information needed to serve the destination                                                                                                                                                              | Hekswerk links use `noreferrer`; no request occurs merely because the page contains the link.                                                                                                                               |

The site sets no cookies and writes nothing to `localStorage` or `sessionStorage`. During successful page loads, browser
tests observe no automatic cross-origin request. A failure-triggered Network Error Logging report remains possible
because Cloudflare currently adds the governing response headers. The built-artifact gate fails if a Cloudflare Web
Analytics beacon, browser-storage use, Google Fonts, or another unapproved third-party path returns in site source.

Provider evidence:

- Cloudflare analytics types: <https://developers.cloudflare.com/analytics/types-of-analytics/>
- Cloudflare zone analytics: <https://developers.cloudflare.com/analytics/account-and-zone-analytics/zone-analytics/>
- Cloudflare explanation of visits and unique visitors:
  <https://developers.cloudflare.com/analytics/faq/about-analytics/>
- Cloudflare Network Error Logging and its privacy statement:
  <https://developers.cloudflare.com/network-error-logging/>
- Cloudflare Workers Logs behavior: <https://developers.cloudflare.com/workers/observability/logs/workers-logs/>

## Inquiry data flow

```text
browser form
  -> Hekswerk Cloudflare Worker
  -> Resend email API
  -> Hekswerk Microsoft 365 mailbox
```

Every inquiry sends schema and topic identifiers, name, email, privacy acknowledgement, the hidden honeypot value, and
the visible topic-specific answers. It does not send a first-touch path, UTM parameters, cookies, or browser-storage
identifiers.

Automation asks for a high-level repeating process and sensitive-or-regulated classification. Organization, systems,
current failure points, frequency, and desired timing are optional. Research and general inquiries contain one message.
Relocation contains one high-level note. The form does not ask separately for household, street address, documents, or
detailed constraints.

### Cloudflare intake Worker

The Worker:

- accepts only JSON with the exact version 2 schema and a known form type;
- gives CORS permission only to the named production, review, and local-development origins;
- limits the request body and individual values;
- validates required fields, email shape, and select values;
- silently discards a filled honeypot submission;
- ignores retired attribution fields rather than placing them in the email;
- has no KV, D1, R2, Durable Object, queue, analytics, or other persistence binding;
- does not log request bodies or normalized submissions;
- disables automatic invocation logs; and
- emits only content-free configuration or delivery errors.

CORS is a cooperating-browser boundary, not client authentication. Validation and the honeypot reduce malformed input
and simple form spam; they do not make the initial form a confidential client channel.

### Resend and destination mailbox

For an accepted inquiry, Resend receives the accepted form fields as a plain-text email request. Resend's dashboard can
display sent-message contents, and its API request log can include the full request body. Resend currently states that
it retains email data for 30 days. Its public documentation does not identify a separate request-log retention period.
Hekswerk has no Resend audience, contact list, webhook store, or marketing automation for this form.

The delivered copy goes to the Hekswerk mailbox hosted by Microsoft 365. That mailbox is the working copy used to read
and reply. There is no additional Hekswerk-owned contact database.

Provider evidence:

- Resend sent messages: <https://resend.com/docs/dashboard/emails/introduction>
- Resend request logs: <https://resend.com/docs/dashboard/logs/introduction>
- Resend 30-day email-data statement: <https://resend.com/docs/dashboard/webhooks/how-to-store-webhooks-data>

## Purposes and legal bases

Hekswerk uses an inquiry to understand the question, assess fit, reply, and keep necessary business correspondence. It
does not create an account, schedule a meeting, subscribe anyone to a list, or trigger advertising.

Where the GDPR applies:

- requested steps before a possible contract are the basis for handling a service inquiry; and
- legitimate interests are the basis for answering genuine research or general inquiries, securing the form,
  diagnosing site availability, maintaining necessary business correspondence, and understanding aggregate traffic.

The legitimate interests are limited to operating and protecting a small practice. Inquiry information is not reused
for unrelated advertising. A later client engagement requires its own role, purpose, lawful-basis, notice, access,
retention, and contract decisions.

## International processing and providers

Cloudflare, Resend, and Microsoft provide services internationally and may process information outside the EEA,
including in the United States. Their published data-protection terms use contractual transfer safeguards, including
European Commission standard contractual clauses where required. Exact routing and storage depend on provider and
account configuration and are not asserted here.

- Cloudflare Data Processing Addendum: <https://www.cloudflare.com/cloudflare-customer-dpa/>
- Resend Data Processing Addendum: <https://resend.com/legal/dpa>
- Microsoft Products and Services Data Protection Addendum:
  <https://www.microsoft.com/licensing/docs/view/Microsoft-Products-and-Services-Data-Protection-Addendum-DPA>

## Retention and rights operations

Hekswerk keeps inquiry correspondence while needed to reply, assess fit, continue a requested conversation, meet an
agreed or legal record-keeping duty, or handle a possible claim. At least once each calendar year, unconverted inquiries
must be reviewed and active-mailbox copies that are no longer needed deleted. A later client agreement and applicable
financial or legal duties govern records for work that proceeds.

A person may email `levi@hekswerk.com` to request access, correction, deletion, restriction, objection, or portability
where applicable. The response procedure is:

1. use the least additional information reasonably needed to verify the requester;
2. locate the inquiry without asking the person to resend its contents;
3. act on Hekswerk-controlled copies unless a documented legal duty or claim requires retention;
4. ask the provider about a provider-held copy when appropriate; and
5. explain what was done and what provider-controlled backup, log, or retention could not be directly verified.

Where European law applies, a person may also complain to the authority where they live or work. The intended
post-move supervisory authority is the Dutch Data Protection Authority: <https://autoriteitpersoonsgegevens.nl/en>.

## Automated-decision boundary

The website has no chatbot, advertising profile, or automated acceptance or rejection of inquiries. Client-side form
validation and the Worker honeypot are mechanical checks. Levi reviews delivered inquiries. An AI-enabled client scope
is assessed separately under `docs/PRIVACY_AND_AI_SCOPING.md`.

## Unknowns that must remain qualified

- Cloudflare's platform retention outside the disabled Workers Logs surface, documented Network Error Logging path,
  and aggregate dashboard was not established.
- Resend's separate API request-log retention period was not established.
- The Microsoft 365 mailbox's backup and administrative retention timing was not established.
- Provider backup deletion timing, exact data locations, and legal-retention exceptions were not established.
- An HTTP success from the Worker proves provider acceptance, not guaranteed inbox delivery.
- No general security, confidentiality, compliance, AI Act, or privacy certification follows from this implementation.
