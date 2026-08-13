# Conversion measurement

Status: implementation and weekly operating authority for the Hekswerk offer funnel.

Last checked: 2026-08-12.

## What this measures

The site records a small set of cookieless events through the same Hekswerk origin. The site Worker validates each
event and writes its approved dimensions to the `hekswerk_conversion_metrics` Cloudflare Workers Analytics Engine
dataset. There is no visitor ID, session ID, cookie, local storage, session storage, fingerprint, advertising tag, or
bespoke analytics dashboard.

The event contract is:

| Event                       | When it is recorded                                                                    | What it answers                                              |
| --------------------------- | -------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| `work_view`                 | The `/work` page runs its checked site script                                          | How many measured page views reached the offer               |
| `selected_work_view`        | The `/work/selected-work` page runs its checked site script                            | How many measured page views reached the evidence page       |
| `contact_cta_click`         | A visitor activates an internal link to `/contact`                                     | How many measured calls to action led toward contact         |
| `automation_form_started`   | The automation intake is rendered on `/contact`                                        | How many measured visits reached the automation intake       |
| `automation_form_submitted` | The intake Worker returns success for an automation submission whose honeypot is empty | How many automation inquiries the delivery provider accepted |

The submitted event is recorded only after the intake endpoint returns a successful HTTP response and the browser's
honeypot value is empty. That proves provider acceptance for a non-honeypot submission, not guaranteed mailbox delivery
or a qualified sales opportunity.

These are event and page-view counts, not unique people. A reload can produce another view, blockers can suppress a
browser event, and public clients can imitate requests. Because the implementation deliberately has no visitor or
session identifier, it supports aggregate funnel diagnosis but does not reconstruct an individual's journey.

## Fixed data contract

Every browser request to `POST /_metrics` contains exactly four strings:

| Field    | Allowed value                                                                                |
| -------- | -------------------------------------------------------------------------------------------- |
| `event`  | One of the five event names above                                                            |
| `page`   | A fixed public route or the `other` bucket                                                   |
| `source` | `direct`, `internal`, `outreach.<label>`, `referrer.<hostname>`, or a bounded `other` bucket |
| `topic`  | `none`, `automation`, `research`, `general`, or `relocation`                                 |

The Worker rejects extra keys, unknown values, cross-origin browser writes, non-JSON bodies, and bodies over 512
bytes. It writes the dimensions in this order:

| Analytics Engine column | Meaning                              |
| ----------------------- | ------------------------------------ |
| `index1`                | Event name, used as the sampling key |
| `blob1`                 | Event name                           |
| `blob2`                 | Public page bucket                   |
| `blob3`                 | Source bucket                        |
| `blob4`                 | Topic bucket                         |
| `double1`               | The value `1`                        |
| `timestamp`             | Event time, assigned by Cloudflare   |
| `_sample_interval`      | Cloudflare's sampling weight         |
| `dataset`               | The configured dataset name          |

Apart from Cloudflare's dataset name, event time, and sampling metadata, no other field is added. Names, email
addresses, organizations, message contents, workflow descriptions, form answers, full URLs, query strings, referrer
paths, IP addresses, user agents, and sensitive or regulated classifications are never written to the analytics
dataset. Analytics events and contact submissions use separate endpoints and payloads.

## Source attribution

Attribution uses the first available value on the current page:

1. a validated `source` label already carried by an internal contact link;
2. a validated `utm_source`, reduced to `outreach.<label>`;
3. the hostname only of an external referrer;
4. `internal` for a Hekswerk referrer; or
5. `direct` when no source is available.

The label is limited to lowercase letters, numbers, periods, underscores, and hyphens. Invalid or overlong values go
to `outreach.other` instead of being stored. Outreach links should use non-personal channel labels such as
`?utm_source=linkedin`, `?utm_source=referral`, or `?utm_source=directory`. Never put a person's name, email address,
company-confidential value, message, or workflow detail in an attribution parameter.

When a visitor follows an internal contact link, the site carries only the normalized source bucket in a `source`
parameter. It does not use browser storage. The contact form does not include that source in the inquiry email.

## Reading the weekly site counts

Cloudflare creates the dataset on the first valid event after the site Worker is deployed. Workers Analytics Engine
retains data for three months. Read it through Cloudflare's SQL API with a token limited to Account Analytics Read.
The account identifier and API token must stay outside the repository and command output shared with others.

For regular use, create the local environment file once:

```bash
cp .env.example .env
```

Fill in `CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_ANALYTICS_TOKEN` in `.env`. The token needs only **Account Analytics:
Read** for the intended Cloudflare account. `.env` and all other `.env.*` files are ignored; `.env.example` is the
only tracked template. Keep another copy of the token in a password manager.

Then run:

```bash
npm run metrics:weekly
```

The command prints trailing-seven-day totals, a source breakdown, and directional event ratios. To inspect another
bounded window, use, for example:

```bash
npm run metrics:weekly -- --days=30
```

The accepted range is 1 through 90 days because Analytics Engine retains this dataset for three months.

### Automatic private Windows report

On the primary Windows and WSL workstation, Task Scheduler runs the same seven-day report every Monday at 9:00 AM in
the Windows local timezone. The task is named `Hekswerk Weekly Metrics`. If the scheduled time is missed, Windows starts
it when the task next becomes available. It runs for at most 15 minutes and does not start a second copy while one is
already active. It may start and continue on battery power, but it does not wake a sleeping computer; a missed run is
picked up after Windows and Task Scheduler are available again.

The task invokes this checkout through `Ubuntu-22.04` and runs:

```bash
npm run metrics:weekly:save
```

Task Scheduler launches `%LOCALAPPDATA%\Hekswerk\run-weekly-metrics.ps1`, which the installer generates without any
credential values. That Windows-side wrapper starts WSL and replaces `%LOCALAPPDATA%\Hekswerk\weekly-metrics-task.log`
on each run with exit diagnostics only. The metrics table itself is not written to the Windows log.

Successful reports are stored as `.metrics-reports/weekly-<UTC timestamp>.txt`. Failed attempts store a similarly
private `failed-<UTC timestamp>.txt` diagnostic. The directory is ignored by Git, has mode `0700`, and report files
have mode `0600`. The task command contains no credential values; the report process reads the ignored `.env` file at
runtime. Do not copy reports into a tracked directory or attach them to this public repository's Actions runs.

Reinstall or update the task from WSL with:

```bash
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "$(wslpath -w scripts/install-windows-metrics-task.ps1)"
```

The installer is idempotent. Its optional `-DayOfWeek` and `-At` arguments can change the default Monday 09:00
schedule. Task Scheduler reports the task result separately from the saved report; a successful run has result code
`0`.

This query returns the last seven days by event and source while accounting for Analytics Engine sampling:

```sql
SELECT
  blob1 AS event,
  blob3 AS source,
  SUM(_sample_interval) AS measured_events
FROM hekswerk_conversion_metrics
WHERE timestamp >= NOW() - INTERVAL '7' DAY
GROUP BY event, source
ORDER BY event, measured_events DESC
```

This narrower query returns the core automation funnel by source:

```sql
SELECT
  blob3 AS source,
  SUM(if(blob1 = 'work_view', _sample_interval, 0)) AS work_views,
  SUM(if(blob1 = 'contact_cta_click', _sample_interval, 0)) AS contact_clicks,
  SUM(if(blob1 = 'automation_form_started', _sample_interval, 0)) AS automation_intake_reaches,
  SUM(if(blob1 = 'automation_form_submitted', _sample_interval, 0)) AS successful_automation_inquiries
FROM hekswerk_conversion_metrics
WHERE timestamp >= NOW() - INTERVAL '7' DAY
GROUP BY source
ORDER BY work_views DESC
```

The command runs the query above through Cloudflare's SQL API. It never prints the account identifier or token. Do not
redirect its output into the repository because the aggregate business funnel is operational data rather than public
site content.

## Weekly funnel

Use one plain spreadsheet or the existing business tracker. Do not build a dashboard. Record the reporting week and
these counts:

| Funnel measure       | Source of truth                                         |
| -------------------- | ------------------------------------------------------- |
| Outreach sent        | Manual outreach log                                     |
| Replies              | Manual inbox or outreach log review                     |
| Conversations        | Manual count using one consistent definition            |
| Proposals            | Manual proposal log                                     |
| Signed projects      | Manual contract or project log                          |
| Work-page visits     | `work_view` total from Analytics Engine                 |
| Successful inquiries | `automation_form_submitted` total from Analytics Engine |

Also keep the three intermediate site counts, `contact_cta_click`, `automation_form_started`, and
`selected_work_view`, by source. Record the exact date window and do not force delayed replies or signed work into the
week of the original page view.

The weekly readout distinguishes the core failure modes:

- Outreach sent with zero or very few `work_view` events means the offer was not seen, the link or channel failed, or
  measurement was blocked.
- `work_view` events without contact clicks or intake reaches means people saw the offer but did not move toward a
  response.
- Intake reaches without successful submissions means the form, request, or fit created friction before provider
  acceptance.
- Successful inquiries without proposals or signed projects means people responded but did not buy, subject to the
  normal delay between an inquiry and a decision.

Counts are directional evidence. They should be read alongside replies and conversations, not treated as precise
person-level conversion rates.

## Verification and operations

Repository gates prove the following before deployment:

- browser code emits the fixed event schema and carries only a normalized source;
- the Worker rejects extra or sensitive-looking dimensions;
- successful-form instrumentation does not receive or copy form contents;
- no cookie or browser-storage state is created;
- the site Worker dry run includes the Analytics Engine binding; and
- build and browser tests retain the site's existing privacy, accessibility, and route contracts.

After deployment, verify without submitting personal data:

1. Open `/work?utm_source=deployment-check` in a browser with developer tools.
2. Confirm one same-origin `POST /_metrics` returns 204 and its body contains only the four documented fields.
3. Follow an automation contact link and confirm its normalized source is carried to `/contact`.
4. Confirm `automation_form_started` returns 204.
5. Query the dataset after Cloudflare's ingestion delay and confirm the test source appears.

Do not perform a production form submission solely to test analytics. A disclosed, non-sensitive intake smoke test is
a separate contact-delivery operation governed by [`CONTACT_ENDPOINT.md`](./CONTACT_ENDPOINT.md).

Provider references:

- Workers Analytics Engine setup: <https://developers.cloudflare.com/analytics/analytics-engine/get-started/>
- SQL API and sampling: <https://developers.cloudflare.com/analytics/analytics-engine/sql-api/>
- Three-month retention: <https://developers.cloudflare.com/analytics/analytics-engine/limits/>
