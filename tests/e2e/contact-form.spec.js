import {expect, test} from '@playwright/test';
import {blockExternalAssets} from './helpers';

const endpoint = 'https://hekswerk-intake.levi-020.workers.dev/';

test.beforeEach(async ({page}) => {
  await blockExternalAssets(page);
  await page.route(endpoint, (route) => route.abort('blockedbyclient'));
});

for (const [query, topic] of [
  ['', 'Quickstart Automation'],
  ['?topic=automation', 'Quickstart Automation'],
  ['?topic=research', 'Research collaboration'],
  ['?topic=relocation', 'Relocation planning'],
  ['?topic=unknown', 'Quickstart Automation'],
]) {
  test(`contact topic ${query || 'defaults safely'}`, async ({page}) => {
    await page.goto(`/contact${query}`);
    await expect(page.getByLabel('Topic')).toHaveValue(topic);
  });
}

test('automation prompt and relocation conditions match the selected topic', async ({page}) => {
  await page.goto('/contact?topic=automation');
  await expect(page.getByLabel(/^Describe the workflow/)).toBeVisible();
  await expect(page.locator('.conditional-fields')).toHaveCount(0);

  await page.getByLabel('Topic').selectOption('Relocation planning');
  for (const label of [
    'Current location',
    'Target location',
    'Timeline',
    'Household',
    'Anything urgent or sensitive I should know?',
    'What is the hardest part of the move right now?',
  ]) {
    await expect(page.getByLabel(label)).toBeVisible();
  }
});

test('native validation protects required fields and email format', async ({page}) => {
  await page.goto('/contact');
  const form = page.locator('form.contact-form');
  await expect(form).not.toHaveJSProperty('noValidate', true);
  for (const control of [
    page.getByLabel('Name'),
    page.getByLabel('Email'),
    page.getByLabel(/^Describe the workflow/),
    page.getByRole('checkbox'),
  ]) {
    await expect(control).toHaveAttribute('required', '');
  }

  await page.getByLabel('Name').fill('Ada');
  await page.getByLabel('Email').fill('not-an-email');
  await page.getByLabel(/^Describe the workflow/).fill('A workflow');
  await page.getByRole('checkbox').check();
  await page.getByRole('button', {name: 'Send inquiry'}).click();
  const emailValidity = await page
    .getByLabel('Email')
    .evaluate((input) => ({valid: input.validity.valid, message: input.validationMessage}));
  expect(emailValidity.valid).toBe(false);
  expect(emailValidity.message.length).toBeGreaterThan(0);
});

test('honeypot is present, excluded from tabs, and included in ordinary success payload', async ({page}) => {
  let payload;
  await page.route(endpoint, async (route) => {
    payload = route.request().postDataJSON();
    await route.fulfill({status: 200, contentType: 'application/json', body: JSON.stringify({ok: true})});
  });
  await page.goto('/contact?topic=automation');
  const honeypot = page.locator('input[name="website"]');
  await expect(honeypot).toHaveCount(1);
  await expect(honeypot).toHaveAttribute('tabindex', '-1');
  await honeypot.evaluate((input) => {
    input.value = 'bot-value';
  });
  await page.getByLabel('Name').fill('Ada');
  await page.getByLabel('Email').fill('ada@example.com');
  await page.getByLabel(/^Describe the workflow/).fill('Make intake reliable');
  await page.getByRole('checkbox').check();
  await page.getByRole('button', {name: 'Send inquiry'}).click();
  await expect(page.getByRole('status')).toHaveText('Thank you. Your inquiry has been sent.');
  expect(payload).toEqual({
    form_type: 'contact',
    name: 'Ada',
    email: 'ada@example.com',
    topic: 'Quickstart Automation',
    message: 'Make intake reliable',
    privacy_acknowledged: true,
    website: 'bot-value',
  });
  await expect(page.getByLabel('Name')).toHaveValue('');
  await expect(page.getByLabel('Topic')).toHaveValue('Quickstart Automation');
});

test('relocation submission contains only the intended conditional payload', async ({page}) => {
  let payload;
  await page.route(endpoint, async (route) => {
    payload = route.request().postDataJSON();
    await route.fulfill({status: 200, contentType: 'application/json', body: JSON.stringify({ok: true})});
  });
  await page.goto('/contact?topic=relocation');
  await page.getByLabel('Name').fill('Ada');
  await page.getByLabel('Email').fill('ada@example.com');
  await page.getByLabel('Current location').fill('Portland');
  await page.getByLabel('Target location').fill('The Hague');
  await page.getByLabel('Timeline').fill('December');
  await page.getByLabel('Household').fill('Two people');
  await page.getByLabel('Anything urgent or sensitive I should know?').fill('None');
  await page.getByLabel('What is the hardest part of the move right now?').fill('Housing');
  await page.getByRole('checkbox').check();
  await page.getByRole('button', {name: 'Send inquiry'}).click();
  await expect(page.getByRole('status')).toHaveText('Thank you. Your inquiry has been sent.');
  expect(payload).toEqual({
    form_type: 'relocation',
    name: 'Ada',
    email: 'ada@example.com',
    topic: 'Relocation planning',
    current_location: 'Portland',
    target_location: 'The Hague',
    timeline: 'December',
    household: 'Two people',
    hardest_part: 'Housing',
    urgent_or_sensitive: 'None',
    privacy_acknowledged: true,
    website: '',
  });
});

test('mocked failure is announced with the email fallback', async ({page}) => {
  await page.route(endpoint, (route) =>
    route.fulfill({status: 503, contentType: 'application/json', body: JSON.stringify({error: 'Please try again.'})}),
  );
  await page.goto('/contact');
  await page.getByLabel('Name').fill('Ada');
  await page.getByLabel('Email').fill('ada@example.com');
  await page.getByLabel(/^Describe the workflow/).fill('A workflow');
  await page.getByRole('checkbox').check();
  await page.getByRole('button', {name: 'Send inquiry'}).click();
  await expect(page.getByRole('status')).toContainText('Please try again. You can also email');
  await expect(page.getByRole('status')).toContainText('levi@hekswerk.com');
});

test('/contact.html redirects while preserving query and hash', async ({page}) => {
  await page.goto('/contact.html?topic=relocation#intake');
  await expect(page).toHaveURL(/\/contact\?topic=relocation#intake$/);
  await expect(page.getByLabel('Topic')).toHaveValue('Relocation planning');
});
