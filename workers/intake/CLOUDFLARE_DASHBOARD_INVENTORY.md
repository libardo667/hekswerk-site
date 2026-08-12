# Cloudflare dashboard inventory for Hekswerk intake

Status: active deployment verified from the Cloudflare dashboard on 2026-08-12.

Captured by: Levi Banks

Captured on: 2026-08-12

Do not paste secret values, API tokens, account credentials, contact submissions, or full logs into this file.
Secret and binding names are wanted. Replace any displayed secret value with `[secret value withheld]`.

## Worker identity

- Worker name: `hekswerk-intake`
- Dashboard URL, optional: `[withheld because it contains the Cloudflare account ID]`
- Is `workers.dev` enabled? `yes`
- Displayed `workers.dev` URL: `https://hekswerk-intake.levi-020.workers.dev/`
- Are preview URLs enabled? `not currently`
- Was `workers/intake/worker.js` copied from the currently active deployment? `yes`
- How was the source copied? `I clicked Edit code and copied the whole worker.js into worker.js in this project's root.`

## Active repository deployment

- Active deployment date and time: `2026-08-12T14:22:45.753Z`
- Active version created: `2026-08-12T14:22:45.304Z`
- Active version ID: `64ea07a6-b02b-4b75-a123-4a6e8dae84fb`
- Traffic percentage for that version: `100%`
- Deployment command: `npm run worker:deploy` with Wrangler 4.121.0 from this repository
- Source shown by `wrangler deployments list`: `Unknown (deployment)`
- Version message or tag: `none`
- Does the active version show the same code as `workers/intake/worker.js`? `yes`
- Other versions currently receiving traffic: `none`

## Recovered predecessor

- Deployment date and time: `2026-06-14T22:42:26.050Z`
- Version ID: `b34b4786-878b-490c-8252-ffefff6fca26`
- Traffic percentage before the repository deployment: `100%`
- Deployment source: `manual Cloudflare dashboard deployment`
- Version message or tag: `Manually deployed`
- Was its source copied into the repository before changes? `yes`

## Runtime settings

- Compatibility date: `2026-05-22`
- Compatibility flags: `none`
- Placement setting: `default`
- Usage model or limits shown: `not shown`

## Domains, routes, and triggers

Copy every entry shown under **Settings > Domains & Routes**.

- `workers.dev` route: `https://hekswerk-intake.levi-020.workers.dev/` is enabled; the custom domains and routes table is empty
- Custom domains: `none`
- Routes: `none`
- Other triggers, including cron schedules: `none`

## Variables, secrets, and bindings

Copy names and types only. Never copy secret values.

| Name             | Dashboard type | Environment or scope | Notes                     |
| ---------------- | -------------- | -------------------- | ------------------------- |
| `resend_api_key` | `Secret`       | `production Worker`  | `[secret value withheld]` |

- Are there any KV, D1, R2, Durable Object, service, queue, Hyperdrive, Vectorize, mTLS, browser, AI, or other bindings? `none`
- Are environment-specific overrides shown? `none`

## Build and deployment connection

- Is a Git repository connected? `no`
- Connected repository and branch, if shown: `none`
- Build command: `none`
- Deploy command: `none`
- Root directory: `none`
- Is a dashboard or Git build pipeline configured? `no; production is now deployed explicitly from this repository with Wrangler`

## Observability

- Workers Logs enabled? `yes, through observability.enabled in the deployed Wrangler configuration`
- Invocation logs enabled? `no, disabled through observability.logs.invocation_logs in the deployed Wrangler configuration`
- Sampling rate: `not shown; "last 1 hour" is the chart time range, not a sampling rate`
- Log retention shown: `not shown`
- Tail Worker configured? `none; hekswerk-intake is the account's only Worker`
- Recent error status, without copying request bodies or personal data: `not rechecked in the dashboard after deployment`

## Remaining uncertainty

- The dashboard did not show an explicit sampling rate, log retention period, usage model, or limits in the inspected views.
- The post-deployment observability state was verified from the deployed repository configuration, not by reopening the
  dashboard settings view.
- The Resend API key's permission scope was not established. Verify it in **Resend > API Keys**. If it has full access,
  replace it with a sending-only key restricted to `mail.hekswerk.com`, update the Cloudflare Secret, verify one
  non-sensitive delivery, and revoke the old key. Record the scope, never the secret value, here.
