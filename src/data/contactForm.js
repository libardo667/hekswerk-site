export const defaultTopic = 'automation';

export const topicOptions = [
  {label: 'Operations Automation Sprint', value: defaultTopic},
  {label: 'Research collaboration', value: 'research'},
  {label: 'Something else', value: 'general'},
  {label: 'Relocation planning', value: 'relocation'},
];

const topicLabels = Object.fromEntries(topicOptions.map(({label, value}) => [value, label]));

export function topicFromSearch(search) {
  const requestedTopic = new URLSearchParams(search).get('topic');
  return topicLabels[requestedTopic] ? requestedTopic : defaultTopic;
}

export function topicLabel(topic) {
  return topicLabels[topic] || topicLabels[defaultTopic];
}

function sharedPayload(form, topic, attribution) {
  return {
    schema_version: 2,
    form_type: topic,
    name: form.get('name'),
    email: form.get('email'),
    topic: topicLabel(topic),
    privacy_acknowledged: form.get('privacy_acknowledged') === 'on',
    website: form.get('website'),
    utm_source: attribution.utm_source || '',
    utm_medium: attribution.utm_medium || '',
    utm_campaign: attribution.utm_campaign || '',
    initial_landing_path: attribution.initial_landing_path || '',
  };
}

export function payloadFromForm(form, topic, attribution = {}) {
  const shared = sharedPayload(form, topic, attribution);

  if (topic === 'automation') {
    return {
      ...shared,
      organization: form.get('organization'),
      repeating_process: form.get('repeating_process'),
      systems_involved: form.get('systems_involved'),
      current_problem: form.get('current_problem'),
      approximate_frequency: form.get('approximate_frequency'),
      desired_timing: form.get('desired_timing'),
      sensitive_or_regulated: form.get('sensitive_or_regulated'),
    };
  }

  if (topic === 'relocation') {
    return {
      ...shared,
      hardest_part: form.get('message'),
    };
  }

  return {
    ...shared,
    message: form.get('message'),
  };
}
