import {describe, expect, it, vi} from 'vitest';
import siteWorker, {recordMetric, validMetric} from '../../workers/site/worker';

const endpoint = 'https://www.hekswerk.com/_metrics';

function metricRequest(payload, options = {}) {
  return new Request(endpoint, {
    method: options.method || 'POST',
    headers: {
      Origin: options.origin || 'https://www.hekswerk.com',
      'Content-Type': options.contentType || 'application/json',
    },
    body: options.method === 'GET' ? undefined : JSON.stringify(payload),
  });
}

function validPayload(overrides = {}) {
  return {
    event: 'work_view',
    page: '/work',
    source: 'outreach.linkedin',
    topic: 'none',
    ...overrides,
  };
}

describe('site metric Worker boundary', () => {
  it('writes the exact aggregate dimensions to Analytics Engine', async () => {
    const writeDataPoint = vi.fn();
    const response = await recordMetric(metricRequest(validPayload()), {METRICS: {writeDataPoint}});
    expect(response.status).toBe(204);
    expect(response.headers.get('Cache-Control')).toBe('no-store');
    expect(writeDataPoint).toHaveBeenCalledWith({
      indexes: ['work_view'],
      blobs: ['work_view', '/work', 'outreach.linkedin', 'none'],
      doubles: [1],
    });
  });

  it('rejects cross-origin browser writes', async () => {
    const writeDataPoint = vi.fn();
    const response = await recordMetric(metricRequest(validPayload(), {origin: 'https://example.com'}), {
      METRICS: {writeDataPoint},
    });
    expect(response.status).toBe(403);
    expect(writeDataPoint).not.toHaveBeenCalled();
  });

  it('rejects unapproved fields and sensitive-looking source values', async () => {
    expect(validMetric({...validPayload(), email: 'ada@example.com'})).toBe(false);
    expect(validMetric(validPayload({source: 'outreach.ada@example.com'}))).toBe(false);

    const writeDataPoint = vi.fn();
    const response = await recordMetric(metricRequest({...validPayload(), message: 'private workflow'}), {
      METRICS: {writeDataPoint},
    });
    expect(response.status).toBe(400);
    expect(writeDataPoint).not.toHaveBeenCalled();
  });

  it('fails closed when the dataset binding is unavailable', async () => {
    const response = await recordMetric(metricRequest(validPayload()), {});
    expect(response.status).toBe(503);
  });

  it('rejects unsupported methods and content types', async () => {
    expect((await recordMetric(metricRequest(null, {method: 'GET'}), {})).status).toBe(405);
    expect((await recordMetric(metricRequest(validPayload(), {contentType: 'text/plain'}), {})).status).toBe(415);
  });

  it('passes non-metric requests to Static Assets', async () => {
    const fetch = vi.fn().mockResolvedValue(new Response('asset'));
    const request = new Request('https://www.hekswerk.com/work');
    const response = await siteWorker.fetch(request, {ASSETS: {fetch}});
    expect(await response.text()).toBe('asset');
    expect(fetch).toHaveBeenCalledWith(request);
  });
});
