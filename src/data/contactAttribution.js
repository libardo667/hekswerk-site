export const attributionStorageKey = 'hekswerk_contact_attribution_v1';

const attributionFields = ['utm_source', 'utm_medium', 'utm_campaign', 'initial_landing_path'];

function bounded(value, maxLength) {
  return String(value || '')
    .trim()
    .slice(0, maxLength);
}

export function attributionFromLocation(location) {
  const parameters = new URLSearchParams(location.search || '');
  return {
    utm_source: bounded(parameters.get('utm_source'), 200),
    utm_medium: bounded(parameters.get('utm_medium'), 200),
    utm_campaign: bounded(parameters.get('utm_campaign'), 200),
    initial_landing_path: bounded(location.pathname || '/', 500) || '/',
  };
}

function normalizeAttribution(value) {
  if (!value || typeof value !== 'object') return null;
  const normalized = Object.fromEntries(
    attributionFields.map((field) => [field, bounded(value[field], field === 'initial_landing_path' ? 500 : 200)]),
  );
  if (!normalized.initial_landing_path.startsWith('/')) return null;
  return normalized;
}

export function captureAttribution(location, storage) {
  const current = attributionFromLocation(location);
  try {
    const existing = normalizeAttribution(JSON.parse(storage.getItem(attributionStorageKey)));
    if (existing) return existing;
    storage.setItem(attributionStorageKey, JSON.stringify(current));
  } catch {
    return current;
  }
  return current;
}

export function readAttribution(location, storage) {
  try {
    return (
      normalizeAttribution(JSON.parse(storage.getItem(attributionStorageKey))) || attributionFromLocation(location)
    );
  } catch {
    return attributionFromLocation(location);
  }
}
