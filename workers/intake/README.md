# Hekswerk intake Worker

This directory holds the source and deployment authority for the external contact-form Worker currently reached at
`https://hekswerk-intake.levi-020.workers.dev/`.

- `worker.js` began from the script recovered from the active Cloudflare deployment on 2026-08-12. The repository
  version was deployed that day as Cloudflare version `69743eb4-2b6e-4cff-9dd0-46346a27434e`.
- `CLOUDFLARE_DASHBOARD_INVENTORY.md` records the recovered deployment and should be updated after each production
  deployment without adding any secret values.

Do not add the Resend API key, Cloudflare API tokens, account credentials, or copied log contents containing contact
submissions. Secret names and binding types are safe and useful.
