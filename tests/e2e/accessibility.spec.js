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
  expect((await request.get('/worldweaver')).status()).toBe(404);
  expect((await request.get('/worldweaver/reference/architecture')).status()).toBe(404);
});
