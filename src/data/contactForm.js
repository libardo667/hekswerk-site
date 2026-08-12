export const defaultTopic = 'Quickstart Automation';

export const topicOptions = [
  {label: 'Operations Automation Sprint', value: defaultTopic},
  {label: 'Research collaboration', value: 'Research collaboration'},
  {label: 'Relocation planning', value: 'Relocation planning'},
  {label: 'Something else', value: 'Something else'},
];

const queryTopics = {
  automation: defaultTopic,
  research: 'Research collaboration',
  relocation: 'Relocation planning',
};

export function topicFromSearch(search) {
  const requestedTopic = new URLSearchParams(search).get('topic');
  return queryTopics[requestedTopic] || defaultTopic;
}

export function messageLabelForTopic(topic) {
  if (topic === 'Relocation planning') {
    return 'What is the hardest part of the move right now?';
  }
  if (topic === defaultTopic) {
    return 'Describe the workflow, the people involved, and the systems it touches';
  }
  return 'Message';
}

export function payloadFromForm(form, topic) {
  const shared = {
    name: form.get('name'),
    email: form.get('email'),
    topic,
  };

  if (topic === 'Relocation planning') {
    return {
      form_type: 'relocation',
      ...shared,
      current_location: form.get('current_location'),
      target_location: form.get('target_location'),
      timeline: form.get('timeline'),
      household: form.get('household'),
      hardest_part: form.get('message'),
      urgent_or_sensitive: form.get('urgent_or_sensitive'),
      privacy_acknowledged: form.get('privacy_acknowledged') === 'on',
      website: form.get('website'),
    };
  }

  return {
    form_type: 'contact',
    ...shared,
    message: form.get('message'),
    privacy_acknowledged: form.get('privacy_acknowledged') === 'on',
    website: form.get('website'),
  };
}
