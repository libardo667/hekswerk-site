import {afterEach, describe, expect, it, vi} from 'vitest';
import worker from '../../workers/intake/worker';

const origin = 'https://www.hekswerk.com';
const endpoint = 'https://hekswerk-intake.levi-020.workers.dev/';

function workerRequest(payload, options = {}) {
  return new Request(endpoint, {
    method: options.method || 'POST',
    headers: {
      Origin: options.origin || origin,
      'Content-Type': 'application/json',
    },
    body: options.method === 'OPTIONS' ? undefined : JSON.stringify(payload),
  });
}

function automationPayload(overrides = {}) {
  return {
    schema_version: 2,
    form_type: 'automation',
    name: 'Ada',
    email: 'ada@example.com',
    topic: 'Operations Automation Sprint',
    organization: 'Example practice',
    repeating_process: 'Intake gets copied by hand.',
    systems_involved: 'Email and Sheets',
    current_problem: 'Follow-ups get missed.',
    approximate_frequency: 'Daily',
    desired_timing: 'Within one month',
    sensitive_or_regulated: 'No',
    privacy_acknowledged: true,
    website: '',
    utm_source: 'directory',
    utm_medium: 'profile',
    utm_campaign: 'august',
    initial_landing_path: '/work',
    ...overrides,
  };
}

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('intake Worker boundary', () => {
  it('answers preflight requests for an allowed origin', async () => {
    const response = await worker.fetch(workerRequest(null, {method: 'OPTIONS'}), {});
    expect(response.status).toBe(204);
    expect(response.headers.get('Access-Control-Allow-Origin')).toBe(origin);
  });

  it('rejects a disallowed browser origin before delivery', async () => {
    const delivery = vi.fn();
    vi.stubGlobal('fetch', delivery);
    const response = await worker.fetch(workerRequest(automationPayload(), {origin: 'https://example.com'}), {
      resend_api_key: 'withheld-test-value',
    });
    expect(response.status).toBe(403);
    expect(await response.json()).toEqual({error: 'Origin not allowed'});
    expect(delivery).not.toHaveBeenCalled();
  });

  it('silently accepts a filled honeypot without delivery', async () => {
    const delivery = vi.fn();
    vi.stubGlobal('fetch', delivery);
    const response = await worker.fetch(workerRequest(automationPayload({website: 'bot'})), {
      resend_api_key: 'withheld-test-value',
    });
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ok: true});
    expect(delivery).not.toHaveBeenCalled();
  });

  it('validates and delivers the complete automation contract', async () => {
    const delivery = vi.fn().mockResolvedValue(new Response('{}', {status: 200}));
    vi.stubGlobal('fetch', delivery);
    const response = await worker.fetch(workerRequest(automationPayload()), {
      resend_api_key: 'withheld-test-value',
    });
    expect(response.status).toBe(200);
    const [url, request] = delivery.mock.calls[0];
    expect(url).toBe('https://api.resend.com/emails');
    expect(request.headers.Authorization).toBe('Bearer withheld-test-value');
    const email = JSON.parse(request.body);
    expect(email.reply_to).toBe('ada@example.com');
    expect(email.subject).toBe('Automation inquiry from Ada');
    expect(email.text).toContain('What process repeats:\nIntake gets copied by hand.');
    expect(email.text).toContain('utm_campaign: august');
    expect(email.text).toContain('Initial landing path: /work');
  });

  it('accepts the previous contact payload during a staged deployment', async () => {
    const delivery = vi.fn().mockResolvedValue(new Response('{}', {status: 200}));
    vi.stubGlobal('fetch', delivery);
    const response = await worker.fetch(
      workerRequest({
        form_type: 'contact',
        name: 'Ada',
        email: 'ada@example.com',
        topic: 'Quickstart Automation',
        message: 'A workflow',
        privacy_acknowledged: true,
        website: '',
      }),
      {resend_api_key: 'withheld-test-value'},
    );
    expect(response.status).toBe(200);
    expect(JSON.parse(delivery.mock.calls[0][1].body).text).toContain('Message:\nA workflow');
  });

  it.each([
    ['research', 'Research collaboration', 'Research inquiry (Research collaboration) from Ada'],
    ['general', 'Something else', 'Contact (Something else) from Ada'],
  ])('delivers a versioned %s message', async (formType, topic, expectedSubject) => {
    const delivery = vi.fn().mockResolvedValue(new Response('{}', {status: 200}));
    vi.stubGlobal('fetch', delivery);
    const response = await worker.fetch(
      workerRequest({
        schema_version: 2,
        form_type: formType,
        name: 'Ada',
        email: 'ada@example.com',
        topic,
        message: 'A bounded question',
        privacy_acknowledged: true,
        website: '',
        initial_landing_path: '/contact',
      }),
      {resend_api_key: 'withheld-test-value'},
    );
    expect(response.status).toBe(200);
    expect(JSON.parse(delivery.mock.calls[0][1].body)).toMatchObject({
      subject: expectedSubject,
      reply_to: 'ada@example.com',
    });
  });

  it('delivers versioned relocation and accepts its previous contract', async () => {
    const delivery = vi.fn().mockResolvedValue(new Response('{}', {status: 200}));
    vi.stubGlobal('fetch', delivery);
    const versioned = await worker.fetch(
      workerRequest({
        schema_version: 2,
        form_type: 'relocation',
        name: 'Ada',
        email: 'ada@example.com',
        topic: 'Relocation planning',
        current_location: 'Portland',
        target_location: 'The Hague',
        timeline: 'December',
        household: 'Two people',
        hardest_part: 'Housing',
        constraints: 'A fixed arrival date',
        privacy_acknowledged: true,
        website: '',
      }),
      {resend_api_key: 'withheld-test-value'},
    );
    expect(versioned.status).toBe(200);
    expect(JSON.parse(delivery.mock.calls[0][1].body).text).toContain('What is hardest right now:\nHousing');

    const legacy = await worker.fetch(
      workerRequest({
        form_type: 'relocation',
        name: 'Ada',
        email: 'ada@example.com',
        topic: 'Relocation',
        hardest_part: 'Paperwork',
        urgent_or_sensitive: 'A fixed deadline',
        privacy_acknowledged: true,
        website: '',
      }),
      {resend_api_key: 'withheld-test-value'},
    );
    expect(legacy.status).toBe(200);
    expect(JSON.parse(delivery.mock.calls[1][1].body).text).toContain('Constraints to account for:\nA fixed deadline');
  });

  it('rejects incomplete or malformed versioned submissions', async () => {
    const delivery = vi.fn();
    vi.stubGlobal('fetch', delivery);
    const missing = await worker.fetch(workerRequest(automationPayload({repeating_process: ''})), {
      resend_api_key: 'withheld-test-value',
    });
    expect(missing.status).toBe(400);
    expect(await missing.json()).toEqual({error: 'Missing required fields'});

    const invalidAttribution = await worker.fetch(
      workerRequest(automationPayload({initial_landing_path: 'https://example.com/private'})),
      {resend_api_key: 'withheld-test-value'},
    );
    expect(invalidAttribution.status).toBe(400);
    expect(await invalidAttribution.json()).toEqual({error: 'Invalid attribution'});

    const invalidSelect = await worker.fetch(
      workerRequest(automationPayload({approximate_frequency: 'Continuously'})),
      {resend_api_key: 'withheld-test-value'},
    );
    expect(invalidSelect.status).toBe(400);
    expect(await invalidSelect.json()).toEqual({error: 'Invalid selection'});
    expect(delivery).not.toHaveBeenCalled();
  });

  it('returns a legible gateway error without exposing the provider response', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('provider detail', {status: 503})));
    const response = await worker.fetch(workerRequest(automationPayload()), {
      resend_api_key: 'withheld-test-value',
    });
    expect(response.status).toBe(502);
    expect(await response.json()).toEqual({error: 'Email delivery failed'});
  });

  it('returns the same bounded error when the provider request throws', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('provider detail')));
    const response = await worker.fetch(workerRequest(automationPayload()), {
      resend_api_key: 'withheld-test-value',
    });
    expect(response.status).toBe(502);
    expect(await response.json()).toEqual({error: 'Email delivery failed'});
  });
});
