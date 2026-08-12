# Hekswerk DNS cutover inventory

Status: authoritative DNS and website traffic cut over to Cloudflare. The application, authoritative mail records, and
one non-sensitive intake delivery were verified before GitHub Pages retirement.

Observed: 2026-08-12.

The complete GoDaddy BIND export was read from its private local location on 2026-08-12. It contained one SOA record,
two GoDaddy NS records, and 18 user-zone records. The source file is not copied into this repository. Its SHA-256 is
`a54dde59659a028004df4e3109a55f7fd1c44f956910056b30570787008a4bc0`, which identifies the reviewed snapshot without
publishing its opaque verification and DKIM values.

Never paste API tokens, account identifiers, private keys, mailbox contents, or secret values here. DNS verification
tokens and DKIM public keys are public by design, but copy them from an authoritative provider dashboard during a
controlled recovery rather than from screenshots or chat.

## Current authority and website state

| Name | Type | Production observation |
| --- | --- | --- |
| `hekswerk.com` | NS | `duke.ns.cloudflare.com`, `kiki.ns.cloudflare.com` |
| `hekswerk.com` | SOA | Cloudflare authority |
| `hekswerk.com` | A and AAAA | Cloudflare proxy addresses; apex redirect handled at Cloudflare |
| `www.hekswerk.com` | A and AAAA | Cloudflare Worker custom domain |

The parent `.com` delegation and public resolvers at Cloudflare, Google, and Quad9 all observed the Cloudflare
nameservers after cutover. Cloudflare reported the zone active at `2026-08-12T16:19:24Z`.

Direct HTTPS checks against both Cloudflare edge addresses observed `www` returning HTTP 200 with Cloudflare response
headers. Apex HTTP and HTTPS requests returned HTTP 301 to `www`, preserving the tested path and query string. The old
`www` CNAME to `libardo667.github.io` was deleted after the Worker custom domain was attached.

## Cached-delegation outage and temporary fallback

The initial GitHub Pages retirement was too early for the delegation change. The parent `.com` delegation has a
one-day TTL. Both former GoDaddy nameservers also continued to answer their retained zone with a one-hour `www` CNAME
to `libardo667.github.io` and the four GitHub Pages apex addresses. A recursive resolver that cached the old delegation
therefore continued sending visitors to GitHub after Pages had been disabled, producing the GitHub Pages 404 reported
on 2026-08-12. At the same time, resolvers using the new authority correctly reached Cloudflare. This was a split-view
DNS propagation failure, not a missing Cloudflare Worker deployment.

GitHub Pages is temporarily enabled again with `www.hekswerk.com` as its repository-level custom domain.
`.github/workflows/deploy-pages-fallback.yml` deploys the same checked Astro artifact on pushes to `main`. Cloudflare's
nameservers, Worker custom domain, apex redirect, proxy records, and mail records remain unchanged and authoritative.

Do not remove the fallback before all of these conditions hold:

1. It is later than `2026-08-14T16:20:00Z`, providing a full extra day beyond the observed one-day parent NS TTL.
2. Cloudflare, Google, Quad9, and the operator's affected resolver all return only the Cloudflare delegation and edge
   addresses for apex and `www`.
3. `www` returns the Cloudflare Worker, apex redirects to `www`, TLS is valid, and the production browser suite passes.
4. Mail and verification records still match on both Cloudflare nameservers.

After the gate passes, remove the fallback workflow in one commit, disable the repository Pages service, and verify
that GitHub reports Pages disabled while production continues to return Cloudflare responses. The old GoDaddy zone is
not a valid rollback source even though it may still answer direct, non-delegated queries.

The final production browser suite passed 81 of 84 desktop and mobile cases, with 3 project-specific cases intentionally
skipped. Every public route then matched the checked local build byte for byte. Cloudflare, Google, and Quad9 resolvers
returned the Cloudflare delegation. The `.com` RDAP service continued to identify GoDaddy.com, LLC as the registrar.

Levi reported that GoDaddy DNSSEC was off before cutover and did not enable it. A parent-zone DS query returned no
record. Domain and subdomain forwarding were also absent. DNSSEC can be considered later as its own controlled change.

## Email and verification records

The following 14 non-website records were copied from the private export, compared against the original GoDaddy
authority, and then compared directly against both assigned Cloudflare nameservers before activation.

| Name | Type | Count | Value, target, or fingerprint | Purpose | Production handling |
| --- | --- | ---: | --- | --- | --- |
| `@` | MX | 1 | priority 0, `hekswerk-com.mail.protection.outlook.com` | Microsoft 365 inbound mail | DNS only |
| `@` | TXT | 1 | `v=spf1 include:spf.protection.outlook.com -all` | Microsoft 365 SPF | DNS only |
| `@` | TXT | 1 | SHA-256 `0116f840...0502d` | Google site verification | DNS only |
| `_dmarc` | TXT | 1 | `v=DMARC1; p=none; adkim=r; aspf=r; rua=mailto:dmarc_rua@onsecureserver.net;` | DMARC | DNS only |
| `autodiscover` | CNAME | 1 | `autodiscover.outlook.com` | Microsoft 365 discovery | DNS only |
| `selector1._domainkey` | CNAME | 1 | Microsoft 365 selector 1 target | Microsoft 365 DKIM | DNS only |
| `selector2._domainkey` | CNAME | 1 | Microsoft 365 selector 2 target | Microsoft 365 DKIM | DNS only |
| `pay` | CNAME | 1 | `paylinks.commerce.godaddy.com` | GoDaddy payment link | DNS only |
| `_domainconnect` | CNAME | 1 | `_domainconnect.gd.domaincontrol.com` | GoDaddy Domain Connect | DNS only |
| `send.mail` | MX | 1 | priority 10, `feedback-smtp.us-east-1.amazonses.com` | Resend return path | DNS only |
| `send.mail` | TXT | 1 | `v=spf1 include:dc-fd741b8612._spfm.send.mail.hekswerk.com ~all` | Resend SPF indirection | DNS only |
| `dc-fd741b8612._spfm.send.mail` | TXT | 1 | `v=spf1 include:amazonses.com ~all` | Resend SPF source | DNS only |
| `resend._domainkey.mail` | TXT | 1 | SHA-256 `3edce2fd...4d27e` | Resend DKIM public key | DNS only |

The source zone also contained four apex GitHub Pages A records and one `www` GitHub Pages CNAME. Cloudflare initially
received exact copies for safe pre-cutover comparison. The apex records were proxied to activate the redirect rule. The
`www` CNAME was deleted and replaced by the Worker-managed custom domain. Provider-generated SOA and NS records were
not imported.

After activation, both authoritative Cloudflare nameservers returned matching non-empty answers for the apex MX and
TXT records, DMARC, Autodiscover, both Microsoft 365 DKIM selectors, the Resend return-path MX and SPF records, and the
Resend DKIM record. The production intake Worker returned HTTP 200 for one disclosed non-sensitive message after
cutover. Receipt confirmation is operator evidence and is not stored in this repository.

The export contains no record at bare `mail.hekswerk.com`, but it does contain the three Resend records beneath it. It
contains no `_mta-sts`, `_smtp._tls`, CAA, SRV, wildcard, or subdomain NS record.

## Reproduction rules

- Keep mail discovery, mail authentication, MX, and verification records DNS only.
- Do not merge TXT records, alter SPF mechanisms, invent TTLs, or normalize provider-generated DKIM targets.
- Keep one effective SPF record at the apex unless Microsoft explicitly instructs otherwise.
- Preserve opaque verification and DKIM values from the private export or provider dashboard. The fingerprints here
  are verification aids, not recovery values.
- Do not treat successful website routing as evidence that email works. Verify the mail records and a non-sensitive
  delivery independently.
- Keep the Worker custom domain and apex redirect separate from the mail record set.

## Recovery references

The original authority was `ns35.domaincontrol.com` and `ns36.domaincontrol.com`. That fact is retained only for an
emergency authority recovery. The signed-off private export and the inventory above are the source for reconstructing
mail records. After GitHub Pages is retired, the old GitHub website records are not a functioning website rollback.

For a website-only problem, leave DNS authority and all mail records in place. Roll back or redeploy the site Worker,
then verify `www`, apex, TLS, and contact behavior separately.
