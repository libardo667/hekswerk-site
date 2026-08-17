# Intuit production app setup

This checklist describes the private, read-only Hekswerk accounting integration. It contains no client credentials,
OAuth tokens, company records, public IP addresses, or other financial data.

The public pages below are local drafts until the site is deliberately deployed and the live URLs are verified.

## App identity

- App name: `Hekswerk Ledger Review`
- Operator: `Hekswerk`, operated by Levi Banks
- Description: `Private read-only accounting reconciliation for Hekswerk's own books.`

Do not name the app `QuickBooks Private` or put `QuickBooks`, `QBO`, `QB`, or `Intuit` in the app name or branding.
Intuit permits factual plain-text descriptions of interoperability but prohibits its brands in an application name.

## Required policy URLs

- End-user license agreement: `https://www.hekswerk.com/ledger-review/terms`
- Privacy policy: `https://www.hekswerk.com/ledger-review/privacy`

The EULA is a narrow owner-use draft, not a substitute for legal review. The privacy page documents the actual
read-only scope, local token and evidence storage, Cloudflare callback transport, sharing boundary, and retention.

## Required app URLs

- Host domain: `www.hekswerk.com`
- Launch URL: `https://www.hekswerk.com/ledger-review`
- Disconnect URL: `https://www.hekswerk.com/ledger-review/disconnected`
- Connect/reconnect URL: `https://www.hekswerk.com/ledger-review/connect`

The connect page truthfully explains the private owner-only flow. It does not publish a reusable OAuth URL because the
authorization request requires a fresh anti-forgery state value and a running local callback listener.

## Category and regulated industries

- Category: `Business Insights`
- Regulated industries: `None of the above`

Do not select payments or money movement. The connector reads accounting data and cannot initiate a payment, transfer,
invoice, payroll action, loan, insurance transaction, or investment action.

## Hosting location

- Country: `United States`
- IP address: leave blank if the portal permits it

Intuit's app-settings documentation says the IP address is optional. The site uses Cloudflare's global edge and the
OAuth callback reaches an outbound-only local tunnel, so inventing a static origin IP or entering all Cloudflare edge
ranges would be misleading. If the current portal makes an IP mandatory, stop and resolve that field from the current
hosting design before submitting.

## OAuth callback

Trademark-neutral production redirect URI:

`https://ledger-auth.hekswerk.com/callback`

The `hekswerk-ledger-auth` tunnel and DNS route were created under the `hekswerk.com` Cloudflare zone on August 17, 2026. DNS and edge routing returned the expected fallback response, and a temporary loopback-only responder confirmed
the complete public HTTPS-to-WSL callback path with HTTP 204. The redirect URI entered in Intuit and the URI sent by the
connector must match exactly. Remove the superseded WorldWeaver-hosted route after the Hekswerk route has completed a
successful authorization.

## Capabilities represented by this application

- Reads the connected Hekswerk company identity, chart of accounts, transaction details, and accounting reports.
- Reconciles source receipts and transfers and prepares a proposed correction ledger for owner or bookkeeper review.
- Does not write, categorize, approve, or delete QuickBooks records.
- Does not move money or provide tax, legal, lending, insurance, investment, or financial-planning advice.
- Stores credentials, tokens, and working evidence in owner-controlled local storage rather than a public database.

## Release gate

Before copying these values into the production form:

1. Review the local pages for factual and legal wording.
2. Run the complete site check.
3. Obtain explicit approval immediately before public deployment.
4. Deploy the site and verify all five URLs over HTTPS.
5. Create and verify the trademark-neutral OAuth DNS route.
6. Enter the production form values and exact redirect URI.
7. Start a fresh local authorization session and approve access in Intuit.
8. Verify private token storage, connection status, and one narrow read-only company call.
