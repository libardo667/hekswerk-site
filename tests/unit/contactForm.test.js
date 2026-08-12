import {describe, expect, it} from 'vitest';
import {
  attributionFromLocation,
  attributionStorageKey,
  captureAttribution,
  readAttribution,
} from '../../src/data/contactAttribution';
import {defaultTopic, payloadFromForm, topicFromSearch} from '../../src/data/contactForm';

function formData(values) {
  return {get: (name) => values[name] ?? null};
}

const attribution = {
  utm_source: 'directory',
  utm_medium: 'profile',
  utm_campaign: 'august',
  initial_landing_path: '/work',
};

describe('contact topic selection', () => {
  it.each([
    ['', defaultTopic],
    ['?topic=automation', 'automation'],
    ['?topic=research', 'research'],
    ['?topic=relocation', 'relocation'],
    ['?topic=unknown', defaultTopic],
  ])('maps %s safely', (search, expected) => {
    expect(topicFromSearch(search)).toBe(expected);
  });
});

describe('contact attribution', () => {
  it('captures only the allowed campaign fields and the pathname', () => {
    expect(
      attributionFromLocation({
        pathname: '/work',
        search: '?utm_source=directory&utm_medium=profile&utm_campaign=august&private=value',
      }),
    ).toEqual(attribution);
  });

  it('keeps the initial landing attribution for the browser session', () => {
    const values = new Map();
    const storage = {
      getItem: (key) => values.get(key) ?? null,
      setItem: (key, value) => values.set(key, value),
    };
    captureAttribution(
      {pathname: '/work', search: '?utm_source=directory&utm_medium=profile&utm_campaign=august'},
      storage,
    );
    captureAttribution({pathname: '/contact', search: '?utm_source=other'}, storage);
    expect(readAttribution({pathname: '/contact', search: ''}, storage)).toEqual(attribution);
    expect(JSON.parse(values.get(attributionStorageKey))).toEqual(attribution);
  });

  it('falls back to the current page when session storage is unavailable', () => {
    const unavailableStorage = {
      getItem() {
        throw new Error('unavailable');
      },
    };
    expect(readAttribution({pathname: '/contact', search: '?utm_source=direct'}, unavailableStorage)).toEqual({
      utm_source: 'direct',
      utm_medium: '',
      utm_campaign: '',
      initial_landing_path: '/contact',
    });
  });
});

describe('contact payloads', () => {
  it('builds the versioned automation payload with attribution and the honeypot', () => {
    expect(
      payloadFromForm(
        formData({
          name: 'Ada',
          email: 'ada@example.com',
          organization: 'Example practice',
          repeating_process: 'Intake arrives by email and gets copied into three systems.',
          systems_involved: 'Email, Sheets, and a CRM',
          current_problem: 'Follow-ups get missed.',
          approximate_frequency: 'Daily',
          desired_timing: 'Within one month',
          sensitive_or_regulated: 'Unsure',
          privacy_acknowledged: 'on',
          website: 'leave-me-empty',
        }),
        'automation',
        attribution,
      ),
    ).toEqual({
      schema_version: 2,
      form_type: 'automation',
      name: 'Ada',
      email: 'ada@example.com',
      topic: 'Operations Automation Sprint',
      privacy_acknowledged: true,
      website: 'leave-me-empty',
      ...attribution,
      organization: 'Example practice',
      repeating_process: 'Intake arrives by email and gets copied into three systems.',
      systems_involved: 'Email, Sheets, and a CRM',
      current_problem: 'Follow-ups get missed.',
      approximate_frequency: 'Daily',
      desired_timing: 'Within one month',
      sensitive_or_regulated: 'Unsure',
    });
  });

  it('builds a relocation payload without automation fields', () => {
    expect(
      payloadFromForm(
        formData({
          name: 'Ada',
          email: 'ada@example.com',
          message: 'Housing',
          privacy_acknowledged: 'on',
          website: '',
        }),
        'relocation',
        attribution,
      ),
    ).toEqual({
      schema_version: 2,
      form_type: 'relocation',
      name: 'Ada',
      email: 'ada@example.com',
      topic: 'Relocation planning',
      privacy_acknowledged: true,
      website: '',
      ...attribution,
      hardest_part: 'Housing',
    });
  });

  it('builds a short research payload', () => {
    expect(
      payloadFromForm(
        formData({
          name: 'Ada',
          email: 'ada@example.com',
          message: 'A research question',
          privacy_acknowledged: 'on',
          website: '',
        }),
        'research',
        attribution,
      ),
    ).toEqual({
      schema_version: 2,
      form_type: 'research',
      name: 'Ada',
      email: 'ada@example.com',
      topic: 'Research collaboration',
      privacy_acknowledged: true,
      website: '',
      ...attribution,
      message: 'A research question',
    });
  });
});
