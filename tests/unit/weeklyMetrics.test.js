import {describe, expect, it, vi} from 'vitest';
import {fetchReport, reportingDays, reportTables, weeklyQuery} from '../../scripts/weekly-metrics.mjs';

describe('weekly metrics report', () => {
  it('uses seven days by default and permits a bounded override', () => {
    expect(reportingDays([])).toBe(7);
    expect(reportingDays(['--days=30'])).toBe(30);
    expect(() => reportingDays(['--days=0'])).toThrow('--days must be a whole number from 1 through 90.');
    expect(() => reportingDays(['--days=91'])).toThrow('--days must be a whole number from 1 through 90.');
    expect(() => reportingDays(['--days=1;DROP TABLE'])).toThrow('--days must be a whole number from 1 through 90.');
  });

  it('queries every conversion event with sampling-aware counts', () => {
    const query = weeklyQuery(7);
    for (const event of [
      'work_view',
      'selected_work_view',
      'contact_cta_click',
      'automation_form_started',
      'automation_form_submitted',
    ]) {
      expect(query).toContain(`blob1 = '${event}'`);
    }
    expect(query).toContain('SUM(if(');
    expect(query).toContain('_sample_interval');
    expect(query).toContain("INTERVAL '7' DAY");
    expect(query).toContain('FORMAT JSON');
  });

  it('builds totals, source rows, and directional ratios', () => {
    const report = reportTables(
      [
        {
          source: 'outreach.linkedin',
          work_views: 8,
          selected_work_views: 3,
          contact_clicks: 4,
          automation_intake_reaches: 2,
          successful_inquiries: 1,
        },
        {
          source: 'direct',
          work_views: 2,
          selected_work_views: 1,
          contact_clicks: 1,
          automation_intake_reaches: 1,
          successful_inquiries: 0,
        },
      ],
      7,
    );
    expect(report.totals).toEqual([
      {
        'Work views': 10,
        'Selected work': 4,
        'Contact clicks': 5,
        'Intake reached': 3,
        'Successful inquiries': 1,
      },
    ]);
    expect(report.rates).toEqual([
      {'Work to contact': '50.0%', 'Contact to intake': '60.0%', 'Intake to success': '33.3%'},
    ]);
  });

  it('keeps credentials in request configuration and out of errors', async () => {
    const request = vi
      .fn()
      .mockResolvedValue(
        new Response(JSON.stringify({data: []}), {status: 200, headers: {'Content-Type': 'application/json'}}),
      );
    await fetchReport({
      days: 7,
      environment: {CLOUDFLARE_ACCOUNT_ID: 'account-id', CLOUDFLARE_ANALYTICS_TOKEN: 'secret-token'},
      fetchImplementation: request,
    });
    expect(request).toHaveBeenCalledWith(
      'https://api.cloudflare.com/client/v4/accounts/account-id/analytics_engine/sql',
      expect.objectContaining({
        method: 'POST',
        headers: {Authorization: 'Bearer secret-token'},
      }),
    );

    const rejected = vi.fn().mockResolvedValue(new Response('', {status: 403}));
    await expect(
      fetchReport({
        days: 7,
        environment: {CLOUDFLARE_ACCOUNT_ID: 'account-id', CLOUDFLARE_ANALYTICS_TOKEN: 'secret-token'},
        fetchImplementation: rejected,
      }),
    ).rejects.toThrow('Cloudflare metrics query failed with HTTP 403.');
  });

  it('gives an actionable error when local configuration is absent', async () => {
    await expect(fetchReport({days: 7, environment: {}, fetchImplementation: vi.fn()})).rejects.toThrow(
      'Copy .env.example to .env',
    );
  });
});
