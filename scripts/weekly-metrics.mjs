const dataset = 'hekswerk_conversion_metrics';
const requiredEnvironment = ['CLOUDFLARE_ACCOUNT_ID', 'CLOUDFLARE_ANALYTICS_TOKEN'];

export function reportingDays(argumentsList) {
  const argument = argumentsList.find((value) => value.startsWith('--days='));
  if (!argument) return 7;
  const value = Number(argument.slice('--days='.length));
  if (!Number.isInteger(value) || value < 1 || value > 90) {
    throw new Error('--days must be a whole number from 1 through 90.');
  }
  return value;
}

export function weeklyQuery(days) {
  return `SELECT
  blob3 AS source,
  SUM(if(blob1 = 'work_view', _sample_interval, 0)) AS work_views,
  SUM(if(blob1 = 'selected_work_view', _sample_interval, 0)) AS selected_work_views,
  SUM(if(blob1 = 'contact_cta_click', _sample_interval, 0)) AS contact_clicks,
  SUM(if(blob1 = 'automation_form_started', _sample_interval, 0)) AS automation_intake_reaches,
  SUM(if(blob1 = 'automation_form_submitted', _sample_interval, 0)) AS successful_inquiries
FROM ${dataset}
WHERE timestamp >= NOW() - INTERVAL '${days}' DAY
GROUP BY source
ORDER BY work_views DESC
FORMAT JSON`;
}

function count(value) {
  const parsed = Number(value || 0);
  return Number.isFinite(parsed) ? parsed : 0;
}

function total(rows, field) {
  return rows.reduce((sum, row) => sum + count(row[field]), 0);
}

function percentage(numerator, denominator) {
  return denominator > 0 ? `${((numerator / denominator) * 100).toFixed(1)}%` : 'n/a';
}

export function reportTables(rows, days) {
  const normalized = rows.map((row) => ({
    Source: String(row.source || 'unknown'),
    'Work views': count(row.work_views),
    'Selected work': count(row.selected_work_views),
    'Contact clicks': count(row.contact_clicks),
    'Intake reached': count(row.automation_intake_reaches),
    'Successful inquiries': count(row.successful_inquiries),
  }));
  const workViews = total(normalized, 'Work views');
  const selectedWorkViews = total(normalized, 'Selected work');
  const contactClicks = total(normalized, 'Contact clicks');
  const intakeReaches = total(normalized, 'Intake reached');
  const successfulInquiries = total(normalized, 'Successful inquiries');

  return {
    title: `Hekswerk conversion events, trailing ${days} day${days === 1 ? '' : 's'} (UTC)`,
    totals: [
      {
        'Work views': workViews,
        'Selected work': selectedWorkViews,
        'Contact clicks': contactClicks,
        'Intake reached': intakeReaches,
        'Successful inquiries': successfulInquiries,
      },
    ],
    sources: normalized,
    rates: [
      {
        'Work to contact': percentage(contactClicks, workViews),
        'Contact to intake': percentage(intakeReaches, contactClicks),
        'Intake to success': percentage(successfulInquiries, intakeReaches),
      },
    ],
  };
}

export function printReport(report, output = console) {
  output.log(`\n${report.title}\n`);
  output.table(report.totals);
  output.log('\nBy source\n');
  if (report.sources.length > 0) output.table(report.sources);
  else output.log('No measured conversion events in this period.');
  output.log('\nDirectional event ratios\n');
  output.table(report.rates);
  output.log('\nAdd outreach sent, replies, conversations, proposals, and signed projects from your business tracker.');
}

function requireEnvironment(environment) {
  const missing = requiredEnvironment.filter((name) => !environment[name]?.trim());
  if (missing.length > 0) {
    throw new Error(`Missing ${missing.join(' and ')}. Copy .env.example to .env and add the read-only values.`);
  }
  return {
    accountId: environment.CLOUDFLARE_ACCOUNT_ID.trim(),
    token: environment.CLOUDFLARE_ANALYTICS_TOKEN.trim(),
  };
}

export async function fetchReport({days, environment = process.env, fetchImplementation = fetch}) {
  const {accountId, token} = requireEnvironment(environment);
  const response = await fetchImplementation(
    `https://api.cloudflare.com/client/v4/accounts/${encodeURIComponent(accountId)}/analytics_engine/sql`,
    {
      method: 'POST',
      headers: {Authorization: `Bearer ${token}`},
      body: weeklyQuery(days),
    },
  );
  if (!response.ok) {
    throw new Error(`Cloudflare metrics query failed with HTTP ${response.status}.`);
  }
  const result = await response.json();
  if (!Array.isArray(result.data)) throw new Error('Cloudflare returned an unexpected metrics response.');
  return reportTables(result.data, days);
}

async function main() {
  try {
    const days = reportingDays(process.argv.slice(2));
    printReport(await fetchReport({days}));
  } catch (error) {
    console.error(`Metrics report failed: ${error.message}`);
    process.exitCode = 1;
  }
}

const invokedFile = process.argv[1] ? new URL(process.argv[1], 'file:').href : '';
if (import.meta.url === invokedFile) await main();
