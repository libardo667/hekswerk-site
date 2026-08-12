import {describe, expect, it} from 'vitest';
import {defaultTopic, messageLabelForTopic, payloadFromForm, topicFromSearch} from '../../src/data/contactForm';

function formData(values) {
  return {get: (name) => values[name] ?? null};
}

describe('contact topic selection', () => {
  it.each([
    ['', defaultTopic],
    ['?topic=automation', defaultTopic],
    ['?topic=research', 'Research collaboration'],
    ['?topic=relocation', 'Relocation planning'],
    ['?topic=unknown', defaultTopic],
  ])('maps %s safely', (search, expected) => {
    expect(topicFromSearch(search)).toBe(expected);
  });

  it('selects the prompt that matches the topic', () => {
    expect(messageLabelForTopic(defaultTopic)).toMatch(/^Describe the workflow/);
    expect(messageLabelForTopic('Relocation planning')).toMatch(/^What is the hardest part/);
    expect(messageLabelForTopic('Something else')).toBe('Message');
  });
});

describe('contact payloads', () => {
  it('builds an ordinary contact payload with the honeypot', () => {
    expect(
      payloadFromForm(
        formData({
          name: 'Ada',
          email: 'ada@example.com',
          message: 'A workflow',
          privacy_acknowledged: 'on',
          website: 'leave-me-empty',
        }),
        defaultTopic,
      ),
    ).toEqual({
      form_type: 'contact',
      name: 'Ada',
      email: 'ada@example.com',
      topic: defaultTopic,
      message: 'A workflow',
      privacy_acknowledged: true,
      website: 'leave-me-empty',
    });
  });

  it('builds a relocation payload with its conditional fields', () => {
    expect(
      payloadFromForm(
        formData({
          name: 'Ada',
          email: 'ada@example.com',
          current_location: 'Portland',
          target_location: 'The Hague',
          timeline: 'December',
          household: 'Two people',
          message: 'Housing',
          urgent_or_sensitive: 'None',
          privacy_acknowledged: 'on',
          website: '',
        }),
        'Relocation planning',
      ),
    ).toEqual({
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
});
