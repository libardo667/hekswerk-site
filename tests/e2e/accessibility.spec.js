import AxeBuilder from '@axe-core/playwright';
import {expect, test} from '@playwright/test';
import {blockExternalAssets, publicRoutes} from './helpers';

test.beforeEach(async ({page}) => {
  await blockExternalAssets(page);
});

for (const route of publicRoutes) {
  test(`${route} has no automated WCAG A or AA violations`, async ({page}) => {
    await page.goto(route);
    const results = await new AxeBuilder({page}).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
    const summary = results.violations.map((violation) => ({
      id: violation.id,
      impact: violation.impact,
      targets: violation.nodes.map((node) => node.target.join(' ')),
    }));
    expect(summary, JSON.stringify(summary, null, 2)).toEqual([]);
  });
}

test('contact controls and live status expose accessible names and announcements', async ({page}) => {
  await page.goto('/contact');
  for (const name of ['Name', 'Email', 'What is this about?', 'What process repeats?']) {
    await expect(page.getByLabel(name)).toBeVisible();
  }
  await expect(page.getByLabel('Does this workflow involve sensitive or regulated information?')).toBeVisible();
  await expect(page.getByRole('checkbox')).toHaveAccessibleName(/I have read the privacy and data-handling note/);
  await expect(page.getByRole('status')).toHaveAttribute('aria-live', 'polite');
});

test('retired WorldWeaver documentation route returns 404', async ({request}) => {
  for (const route of ['/worldweaver', '/worldweaver/reference/architecture']) {
    const response = await request.get(`${route}?retired-route-check=1`, {
      headers: {'cache-control': 'no-cache'},
    });
    expect(response.status()).toBe(404);
    expect(await response.text()).toContain('There is nothing at this address.');
  }
});

test('custom 404 is styled, noindex, and contains no client-side analytics', async ({page}) => {
  const response = await page.goto('/not-a-real-hekswerk-route?custom-404-check=1');
  expect(response.status()).toBe(404);
  await expect(page.getByRole('heading', {name: 'There is nothing at this address.'})).toBeVisible();
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex');
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
  await expect(page.locator('script[data-cf-beacon]')).toHaveCount(0);
});

test('site responses carry the repository security-header policy', async ({request}) => {
  const response = await request.get('/');
  expect(response.headers()['content-security-policy']).toContain("default-src 'self'");
  expect(response.headers()['x-content-type-options']).toBe('nosniff');
  expect(response.headers()['x-frame-options']).toBe('DENY');
  expect(response.headers()['referrer-policy']).toBe('strict-origin-when-cross-origin');
});
