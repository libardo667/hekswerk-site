import AxeBuilder from '@axe-core/playwright';
import {expect, test} from '@playwright/test';

test('the relocation page describes the service and links to an email draft', async ({page}) => {
  const url = process.env.PLAYWRIGHT_MOVE_URL || 'http://127.0.0.1:4174/';
  await page.goto(url);
  await expect(page.getByRole('heading', {level: 1})).toHaveText('Relocation planning and coordination');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://move.hekswerk.com/');
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', await page.title());
  await expect(page.locator('meta[property="og:description"]')).toHaveAttribute('content', /Planning a move abroad/);
  await expect(page.locator('body')).toHaveCSS('border-top-width', '6px');
  expect(
    await page.evaluate(async () => {
      const faces = await document.fonts.load('540 44px Fraunces');
      return faces[0]?.status;
    }),
  ).toBe('loaded');
  const email = page.getByRole('link', {name: 'Email Levi'});
  await page.keyboard.press('Tab');
  await expect(email).toBeFocused();
  await expect(email).toHaveAttribute('href', 'mailto:levi@hekswerk.com?subject=Relocation%20inquiry');
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
    page.viewportSize().width,
  );
  expect((await new AxeBuilder({page}).analyze()).violations).toEqual([]);
});
