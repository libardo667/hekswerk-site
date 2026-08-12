import {describe, expect, it} from 'vitest';
import {metricPayload, normalizePage, sourceFromContext} from '../../src/data/metrics';

describe('cookieless metric dimensions', () => {
  it('reduces outreach parameters to a bounded source label', () => {
    expect(sourceFromContext({search: '?utm_source=linkedin', origin: 'https://www.hekswerk.com'})).toBe(
      'outreach.linkedin',
    );
    expect(sourceFromContext({search: '?utm_source=Ada%40example.com', origin: 'https://www.hekswerk.com'})).toBe(
      'outreach.other',
    );
  });

  it('carries only a source label produced by the site', () => {
    expect(sourceFromContext({search: '?source=referrer.example.com', origin: 'https://www.hekswerk.com'})).toBe(
      'referrer.example.com',
    );
    expect(sourceFromContext({search: '?source=someone%40example.com', origin: 'https://www.hekswerk.com'})).toBe(
      'direct',
    );
  });

  it('keeps only the external referrer hostname', () => {
    expect(
      sourceFromContext({
        referrer: 'https://example.com/private/path?email=ada@example.com',
        origin: 'https://www.hekswerk.com',
      }),
    ).toBe('referrer.example.com');
    expect(sourceFromContext({referrer: 'https://www.hekswerk.com/about', origin: 'https://www.hekswerk.com'})).toBe(
      'internal',
    );
  });

  it('uses direct when no attribution exists', () => {
    expect(sourceFromContext({origin: 'https://www.hekswerk.com'})).toBe('direct');
  });

  it('maps unknown paths to a non-identifying bucket', () => {
    expect(normalizePage('/work/')).toBe('/work');
    expect(normalizePage('/private-looking-value')).toBe('other');
  });

  it('constructs only the fixed metric schema', () => {
    expect(
      metricPayload('automation_form_submitted', {
        page: '/contact',
        source: 'outreach.linkedin',
        topic: 'automation',
      }),
    ).toEqual({
      event: 'automation_form_submitted',
      page: '/contact',
      source: 'outreach.linkedin',
      topic: 'automation',
    });
    expect(metricPayload('message_contents', {page: '/contact', source: 'direct', topic: 'automation'})).toBeNull();
  });
});
