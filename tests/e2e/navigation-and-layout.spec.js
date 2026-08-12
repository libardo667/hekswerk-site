import {expect, test} from '@playwright/test';
import {blockExternalAssets, contrastRatio, expectKeyboardFocus, publicRoutes} from './helpers';

const navDestinations = ['/work', '/work/selected-work', '/research', '/about', '/contact'];
const footerDestinations = ['/work', '/contact', '/work/selected-work', '/about', '/privacy', '/research'];
const repositoryLinks = [
  'https://github.com/libardo667',
  'https://github.com/libardo667/evogen',
  'https://github.com/libardo667/kenshi-agent-env',
  'https://github.com/libardo667/worldweaver',
];

test.beforeEach(async ({page}) => {
  await blockExternalAssets(page);
});

test('each page includes one Cloudflare Web Analytics beacon in static-navigation mode', async ({page}) => {
  await page.goto('/');
  const beacon = page.locator('script[src="https://static.cloudflareinsights.com/beacon.min.js"]');
  await expect(beacon).toHaveCount(1);
  const configuration = JSON.parse(await beacon.getAttribute('data-cf-beacon'));
  expect(configuration).toEqual({token: 'b521818f3dee4549be53db47190f52c2', spa: false});
});

test('homepage commercial and research paths resolve', async ({page}) => {
  await page.goto('/');
  await page.getByRole('link', {name: 'View the Operations Automation Sprint'}).click();
  await expect(page).toHaveURL(/\/work$/);

  await page.goto('/');
  await page.getByRole('link', {name: 'Explore EvoGen and KAE'}).click();
  await expect(page).toHaveURL(/\/#research$/);
  await expect(page.locator('#research')).toBeInViewport();

  await page.getByRole('link', {name: 'Start an automation inquiry'}).click();
  await expect(page).toHaveURL(/\/contact\?topic=automation$/);
});

test('navigation and footer expose every intended internal destination', async ({page, request}, testInfo) => {
  await page.goto('/');
  if (testInfo.project.name.startsWith('mobile')) {
    await page.locator('.navbar__toggle').click();
    await expect(page.locator('.navbar-sidebar')).toBeVisible();
  }

  const navRoot = testInfo.project.name.startsWith('mobile')
    ? page.locator('.navbar-sidebar')
    : page.locator('.navbar');
  const navHrefs = await navRoot
    .locator('a[href]')
    .evaluateAll((links) => [
      ...new Set(links.map((link) => new URL(link.href).pathname).filter((pathname) => pathname !== '/')),
    ]);
  expect(navHrefs).toEqual(navDestinations);

  if (testInfo.project.name.startsWith('mobile')) await page.locator('.navbar-sidebar__close').click();
  const footer = page.locator('footer');
  const footerInternal = await footer
    .locator('a[href^="/"]')
    .evaluateAll((links) => links.map((link) => link.getAttribute('href')));
  expect(footerInternal).toEqual(footerDestinations);

  for (const destination of [...new Set([...navDestinations, ...footerDestinations])]) {
    expect((await request.get(destination)).status(), destination).toBe(200);
  }

  const external = await footer
    .locator('a[href^="https://github.com/"]')
    .evaluateAll((links) => links.map((link) => link.href));
  expect(external).toEqual(repositoryLinks);
});

for (const route of publicRoutes) {
  test(`${route} has a stable responsive document`, async ({page}) => {
    await page.goto(route);
    await expect(page.locator('h1')).toHaveCount(1);
    const layout = await page.evaluate(() => {
      const selectors = ['html', 'body', '#site-root', '.main-wrapper'];
      return {
        scrollWidth: document.documentElement.scrollWidth,
        viewportWidth: document.documentElement.clientWidth,
        backgrounds: selectors.map((selector) => getComputedStyle(document.querySelector(selector)).backgroundColor),
      };
    });
    expect(layout.scrollWidth).toBeLessThanOrEqual(layout.viewportWidth);
    expect(layout.backgrounds).toEqual(['rgb(9, 9, 14)', 'rgb(9, 9, 14)', 'rgb(9, 9, 14)', 'rgb(9, 9, 14)']);
  });
}

test('mobile menu opens with every option visible and usable', async ({page}, testInfo) => {
  test.skip(!testInfo.project.name.startsWith('mobile'), 'mobile-only behavior');
  await page.goto('/');
  await page.locator('.navbar__toggle').click();
  const sidebar = page.locator('.navbar-sidebar');
  await expect(sidebar).toBeVisible();
  await expect.poll(async () => (await sidebar.boundingBox())?.x).toBe(0);
  const box = await sidebar.boundingBox();
  expect(box.width).toBeGreaterThanOrEqual(300);
  for (const label of ['Contract Work', 'Selected Work', 'Engineering & Research', 'About', 'Start a conversation']) {
    const link = sidebar.getByRole('link', {name: label});
    await expect(link).toBeVisible();
    const linkBox = await link.boundingBox();
    expect(linkBox.x).toBeGreaterThanOrEqual(0);
    expect(linkBox.x + linkBox.width).toBeLessThanOrEqual(await page.evaluate(() => window.innerWidth));
  }
});

test('footer keeps the current two-group hierarchy', async ({page}) => {
  await page.goto('/');
  const footer = page.locator('footer');
  await expect(footer.locator('.footer__title')).toHaveText(['Contract work', 'Engineering and research']);
  const engineeringLinks = (
    await footer.locator('.footer__col').nth(1).locator('.footer__link-item').allTextContents()
  ).map((text) => text.trim());
  expect(engineeringLinks).toEqual([
    'Overview',
    'GitHub profile',
    'EvoGen source',
    'Kenshi Agent Environment source',
    'WorldWeaver source',
  ]);
});

test('keyboard focus is visible across navigation, actions, links, and controls', async ({page}, testInfo) => {
  test.skip(testInfo.project.name.startsWith('mobile'), 'desktop keyboard path');
  await page.goto('/');
  await expectKeyboardFocus(page, page.getByRole('link', {name: 'Contract Work'}));
  await page.goto('/');
  await expectKeyboardFocus(page, page.getByRole('link', {name: 'View the Operations Automation Sprint'}));
  await page.goto('/');
  await expectKeyboardFocus(page, page.getByRole('link', {name: 'Review scope, fit, and pricing'}));
  await page.goto('/contact');
  await expectKeyboardFocus(page, page.getByRole('textbox', {name: 'Name'}));
});

test('primary, outline, and text links retain readable interactive states', async ({page}, testInfo) => {
  test.skip(testInfo.project.name.startsWith('mobile'), 'desktop pointer and keyboard states');
  await page.goto('/');
  const targets = [
    page.getByRole('link', {name: 'View the Operations Automation Sprint'}),
    page.getByRole('link', {name: 'Explore EvoGen and KAE'}),
    page.getByRole('link', {name: 'Review scope, fit, and pricing'}),
  ];
  for (const target of targets) {
    expect(await contrastRatio(target)).toBeGreaterThanOrEqual(4.5);
    await target.hover();
    await page.waitForTimeout(250);
    expect(await contrastRatio(target)).toBeGreaterThanOrEqual(4.5);
    await expectKeyboardFocus(page, target);
    expect(await contrastRatio(target)).toBeGreaterThanOrEqual(4.5);
  }
});
