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
const siteOrigin = new URL(process.env.PLAYWRIGHT_BASE_URL || 'http://127.0.0.1:4173').origin;

test.beforeEach(async ({page}) => {
  await blockExternalAssets(page);
});

test('pages install no client-side analytics or browser storage', async ({page}) => {
  for (const route of publicRoutes) {
    await page.goto(`${route}${route.includes('?') ? '&' : '?'}utm_source=discard-me`);
    await expect(page.locator('script[data-cf-beacon]')).toHaveCount(0);
    expect(
      await page.evaluate(() => ({
        cookie: document.cookie,
        localStorage: window.localStorage.length,
        sessionStorage: window.sessionStorage.length,
      })),
      route,
    ).toEqual({cookie: '', localStorage: 0, sessionStorage: 0});
  }
});

test('pages make no unapproved automatic third-party requests', async ({page}) => {
  for (const route of publicRoutes) {
    const externalRequests = [];
    const record = (request) => {
      const url = new URL(request.url());
      if (url.origin !== siteOrigin && url.protocol.startsWith('http')) externalRequests.push(url.href);
    };
    page.on('request', record);
    await page.goto(route);
    await page.waitForLoadState('networkidle');
    page.off('request', record);
    const uniqueRequests = [...new Set(externalRequests)];
    expect(uniqueRequests, route).toEqual([]);
  }
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

test('work pricing distinguishes inquiry, scoping, the sprint, and custom work', async ({page}) => {
  await page.goto('/work');
  const summary = page.locator('.offer-summary');
  await expect(summary.locator('strong')).toHaveText('$3,500');
  await expect(summary.getByText('$750 paid Workflow Scoping')).toBeVisible();
  await expect(summary.getByText('$6,500+ custom integration or system work')).toBeVisible();
  await summary.getByRole('link', {name: 'See how pricing works'}).click();
  await expect(page).toHaveURL(/\/work#pricing$/);

  const pricing = page.locator('#pricing');
  await expect(pricing.locator('.pricing-step .eyebrow')).toHaveText([
    'Initial inquiry',
    'Paid Workflow Scoping',
    'Operations Automation Sprint',
    'Custom integration or system',
  ]);
  await expect(pricing.getByText('Sending an initial inquiry remains free.').first()).toBeVisible();
  await expect(pricing.getByText('Workflow Scoping does not include implementation.')).toBeVisible();
  await expect(pricing.getByText('the full $750 scoping fee is credited toward that build')).toBeVisible();
  await expect(
    pricing.locator('.pricing-step').filter({hasText: 'Operations Automation Sprint'}).locator('strong'),
  ).toHaveText('$3,500');
  await expect(pricing.getByText('generally starts at $6,500.').first()).toBeVisible();

  await page.getByRole('link', {name: 'Start an automation inquiry'}).first().click();
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

test('all external links suppress the referring page', async ({page}) => {
  for (const route of publicRoutes) {
    await page.goto(route);
    const links = page.locator('a[href^="https://"]');
    for (let index = 0; index < (await links.count()); index += 1) {
      await expect(links.nth(index), `${route} external link ${index + 1}`).toHaveAttribute('rel', /noreferrer/);
    }
  }
});

test('privacy page exposes the actual collection, processors, deletion, and relationship boundaries', async ({
  page,
}) => {
  await page.goto('/privacy');
  for (const heading of [
    'Who is responsible',
    'When you browse the site',
    'What the contact form collects',
    'Where an inquiry goes and what is retained',
    'Why I use an inquiry',
    'International processing',
    'How long I keep an inquiry',
    'Your data-protection rights',
    'No automated decision about your inquiry',
    'An inquiry is not a client relationship',
  ]) {
    await expect(page.getByRole('heading', {name: heading})).toBeVisible();
  }
  await expect(page.getByText('Cloudflare Worker', {exact: false}).last()).toBeVisible();
  await expect(page.getByText('Network Error Logging', {exact: false}).first()).toBeVisible();
  await expect(page.getByText('Resend', {exact: false}).first()).toBeVisible();
  await expect(page.getByText('Microsoft 365', {exact: false}).first()).toBeVisible();
});

test('work page states the AI scoping and legal-advice boundaries', async ({page}) => {
  await page.goto('/work#responsible-automation');
  await expect(
    page.getByRole('heading', {name: 'Classify the responsibility before choosing the technology'}),
  ).toBeVisible();
  await expect(page.getByText('The EU AI Act and European data-protection law are separate checks')).toBeVisible();
  await expect(page.getByText('Hekswerk does not certify EU AI Act or privacy compliance')).toBeVisible();
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
