import {describe, expect, it} from 'vitest';
import {defaultTopic, payloadFromForm, topicFromSearch} from '../../src/data/contactForm';

function formData(values) {
  return {get: (name) => values[name] ?? null};
}

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

describe('contact payloads', () => {
  it('builds the versioned automation payload with the honeypot', () => {
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
      ),
    ).toEqual({
      schema_version: 2,
      form_type: 'automation',
      name: 'Ada',
      email: 'ada@example.com',
      topic: 'Operations Automation Sprint',
      privacy_acknowledged: true,
      website: 'leave-me-empty',
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
      ),
    ).toEqual({
      schema_version: 2,
      form_type: 'relocation',
      name: 'Ada',
      email: 'ada@example.com',
      topic: 'Relocation planning',
      privacy_acknowledged: true,
      website: '',
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
      ),
    ).toEqual({
      schema_version: 2,
      form_type: 'research',
      name: 'Ada',
      email: 'ada@example.com',
      topic: 'Research collaboration',
      privacy_acknowledged: true,
      website: '',
      message: 'A research question',
    });
  });
});
