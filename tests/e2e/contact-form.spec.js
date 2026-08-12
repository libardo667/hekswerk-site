import {expect, test} from '@playwright/test';
import {blockExternalAssets} from './helpers';

const endpoint = 'https://hekswerk-intake.levi-020.workers.dev/';

test.beforeEach(async ({page}) => {
  await blockExternalAssets(page);
  await page.route(endpoint, (route) => route.abort('blockedbyclient'));
});

for (const [query, topic] of [
  ['', 'automation'],
  ['?topic=automation', 'automation'],
  ['?topic=research', 'research'],
  ['?topic=relocation', 'relocation'],
  ['?topic=unknown', 'automation'],
]) {
  test(`contact topic ${query || 'defaults safely'}`, async ({page}) => {
    await page.goto(`/contact${query}`);
    await expect(page.getByLabel('What is this about?')).toHaveValue(topic);
  });
}

test('each topic reveals only its intended fields', async ({page}) => {
  await page.goto('/contact?topic=automation');
  for (const label of [
    'Organization Optional',
    'What process repeats?',
    'What tools or systems are involved? Optional',
    'What currently takes too long, gets missed, or fails? Optional',
    'Approximate frequency Optional',
    'Desired timing Optional',
    'Does this workflow involve sensitive or regulated information?',
  ]) {
    await expect(page.getByLabel(label)).toBeVisible();
  }
  await expect(page.getByLabel('What would you like to explore or discuss?')).toHaveCount(0);

  await page.getByLabel('What is this about?').selectOption('research');
  await expect(page.getByLabel('What would you like to explore or discuss?')).toBeVisible();
  await expect(page.getByLabel('What process repeats?')).toHaveCount(0);

  await page.getByLabel('What is this about?').selectOption('general');
  await expect(page.getByLabel('What would you like to ask or tell me?')).toBeVisible();

  await page.getByLabel('What is this about?').selectOption('relocation');
  await expect(page.getByLabel('What would you like help with?')).toBeVisible();
  await expect(page.getByText('Do not include an address, identity number')).toBeVisible();
  await expect(page.getByLabel('What would you like to ask or tell me?')).toHaveCount(0);
});

test('native validation protects the shared and automation-required fields', async ({page}) => {
  await page.goto('/contact?topic=automation');
  const form = page.locator('form.contact-form');
  await expect(form).not.toHaveJSProperty('noValidate', true);
  for (const control of [
    page.getByLabel('Name'),
    page.getByLabel('Email'),
    page.getByLabel('What process repeats?'),
    page.getByLabel('Does this workflow involve sensitive or regulated information?'),
    page.getByRole('checkbox'),
  ]) {
    await expect(control).toHaveAttribute('required', '');
  }

  await page.getByLabel('Name').fill('Ada');
  await page.getByLabel('Email').fill('not-an-email');
  await page.getByLabel('What process repeats?').fill('A workflow');
  await page.getByLabel('Does this workflow involve sensitive or regulated information?').selectOption('No');
  await page.getByRole('checkbox').check();
  await page.getByRole('button', {name: 'Send inquiry'}).click();
  const emailValidity = await page
    .getByLabel('Email')
    .evaluate((input) => ({valid: input.validity.valid, message: input.validationMessage}));
  expect(emailValidity.valid).toBe(false);
  expect(emailValidity.message.length).toBeGreaterThan(0);
});

test('automation submission carries its fields, honeypot, and initial-session attribution', async ({page}) => {
  let payload;
  await page.route(endpoint, async (route) => {
    payload = route.request().postDataJSON();
    await route.fulfill({status: 200, contentType: 'application/json', body: JSON.stringify({ok: true})});
  });
  await page.goto('/work?utm_source=directory&utm_medium=profile&utm_campaign=august&private=discard-me');
  await page.goto('/contact?topic=automation');
  const honeypot = page.locator('input[name="website"]');
  await expect(honeypot).toHaveCount(1);
  await expect(honeypot).toHaveAttribute('tabindex', '-1');
  await honeypot.evaluate((input) => {
    input.value = 'bot-value';
  });
  await page.getByLabel('Name').fill('Ada');
  await page.getByLabel('Email').fill('ada@example.com');
  await page.getByLabel('Organization Optional').fill('Example practice');
  await page.getByLabel('What process repeats?').fill('Intake gets copied by hand.');
  await page.getByLabel('What tools or systems are involved? Optional').fill('Email and Sheets');
  await page
    .getByLabel('What currently takes too long, gets missed, or fails? Optional')
    .fill('Follow-ups get missed.');
  await page.getByLabel('Approximate frequency Optional').selectOption('Daily');
  await page.getByLabel('Desired timing Optional').selectOption('Within one month');
  await page.getByLabel('Does this workflow involve sensitive or regulated information?').selectOption('Unsure');
  await page.getByRole('checkbox').check();
  await page.getByRole('button', {name: 'Send inquiry'}).click();
  await expect(page.getByRole('status')).toHaveText('Thank you. Your inquiry has been sent.');
  expect(payload).toEqual({
    schema_version: 2,
    form_type: 'automation',
    name: 'Ada',
    email: 'ada@example.com',
    topic: 'Operations Automation Sprint',
    privacy_acknowledged: true,
    website: 'bot-value',
    utm_source: 'directory',
    utm_medium: 'profile',
    utm_campaign: 'august',
    initial_landing_path: '/work',
    organization: 'Example practice',
    repeating_process: 'Intake gets copied by hand.',
    systems_involved: 'Email and Sheets',
    current_problem: 'Follow-ups get missed.',
    approximate_frequency: 'Daily',
    desired_timing: 'Within one month',
    sensitive_or_regulated: 'Unsure',
  });
  await expect(page.getByLabel('Name')).toHaveValue('');
  await expect(page.getByLabel('What is this about?')).toHaveValue('automation');
});

test('switching topics excludes stale conditional fields from the payload', async ({page}) => {
  let payload;
  await page.route(endpoint, async (route) => {
    payload = route.request().postDataJSON();
    await route.fulfill({status: 200, contentType: 'application/json', body: JSON.stringify({ok: true})});
  });
  await page.goto('/contact?topic=automation');
  await page.getByLabel('What process repeats?').fill('This must not leak');
  await page.getByLabel('What is this about?').selectOption('research');
  await page.getByLabel('Name').fill('Ada');
  await page.getByLabel('Email').fill('ada@example.com');
  await page.getByLabel('What would you like to explore or discuss?').fill('A research question');
  await page.getByRole('checkbox').check();
  await page.getByRole('button', {name: 'Send inquiry'}).click();
  expect(payload.form_type).toBe('research');
  expect(payload.message).toBe('A research question');
  expect(payload).not.toHaveProperty('repeating_process');
  expect(payload).not.toHaveProperty('current_location');
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
  await page.getByLabel('What would you like help with?').fill('Housing near The Hague around December.');
  await page.getByRole('checkbox').check();
  await page.getByRole('button', {name: 'Send inquiry'}).click();
  await expect(page.getByRole('status')).toHaveText('Thank you. Your inquiry has been sent.');
  expect(payload).toMatchObject({
    schema_version: 2,
    form_type: 'relocation',
    name: 'Ada',
    email: 'ada@example.com',
    topic: 'Relocation planning',
    hardest_part: 'Housing near The Hague around December.',
    privacy_acknowledged: true,
    website: '',
  });
  expect(payload).not.toHaveProperty('repeating_process');
  expect(payload).not.toHaveProperty('current_location');
  expect(payload).not.toHaveProperty('household');
});

test('the form states the relationship boundary before submission', async ({page}) => {
  await page.goto('/contact');
  await expect(page.getByText('Sending an inquiry does not establish a client relationship.')).toBeVisible();
});

test('submission falls back safely when session storage is unavailable', async ({page}) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, 'sessionStorage', {
      configurable: true,
      get() {
        throw new DOMException('Storage unavailable', 'SecurityError');
      },
    });
  });
  let payload;
  await page.route(endpoint, async (route) => {
    payload = route.request().postDataJSON();
    await route.fulfill({status: 200, contentType: 'application/json', body: JSON.stringify({ok: true})});
  });
  await page.goto('/contact?topic=research&utm_source=direct');
  await page.getByLabel('Name').fill('Ada');
  await page.getByLabel('Email').fill('ada@example.com');
  await page.getByLabel('What would you like to explore or discuss?').fill('A question');
  await page.getByRole('checkbox').check();
  await page.getByRole('button', {name: 'Send inquiry'}).click();
  expect(payload.utm_source).toBe('direct');
  expect(payload.initial_landing_path).toBe('/contact');
});

test('mocked failure is announced with the email fallback', async ({page}) => {
  await page.route(endpoint, (route) =>
    route.fulfill({status: 503, contentType: 'application/json', body: JSON.stringify({error: 'Please try again.'})}),
  );
  await page.goto('/contact?topic=research');
  await page.getByLabel('Name').fill('Ada');
  await page.getByLabel('Email').fill('ada@example.com');
  await page.getByLabel('What would you like to explore or discuss?').fill('A question');
  await page.getByRole('checkbox').check();
  await page.getByRole('button', {name: 'Send inquiry'}).click();
  await expect(page.getByRole('status')).toContainText('Please try again. You can also email');
  await expect(page.getByRole('status')).toContainText('levi@hekswerk.com');
});

test('/contact.html redirects while preserving query and hash', async ({page}) => {
  await page.goto('/contact.html?topic=relocation#intake');
  await expect(page).toHaveURL(/\/contact\?topic=relocation#intake$/);
  await expect(page.getByLabel('What is this about?')).toHaveValue('relocation');
});
