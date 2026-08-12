const EVENTS = new Set([
  'work_view',
  'selected_work_view',
  'contact_cta_click',
  'automation_form_started',
  'automation_form_submitted',
]);
const PAGES = new Set([
  '/',
  '/work',
  '/work/brief',
  '/work/selected-work',
  '/research',
  '/about',
  '/contact',
  '/privacy',
  'other',
]);
const TOPICS = new Set(['none', 'automation', 'research', 'general', 'relocation']);
const SOURCE_PATTERN =
  /^(?:direct|internal|outreach\.(?:[a-z0-9][a-z0-9._-]{0,47}|other)|referrer\.(?:[a-z0-9][a-z0-9.-]{0,62}|other))$/;
const MAX_BODY_BYTES = 512;
const PAYLOAD_KEYS = ['event', 'page', 'source', 'topic'];

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname !== '/_metrics') return env.ASSETS.fetch(request);
    return recordMetric(request, env, url);
  },
};

export async function recordMetric(request, env, url = new URL(request.url)) {
  if (request.method !== 'POST') return metricResponse(405);
  if (request.headers.get('Origin') !== url.origin) return metricResponse(403);
  if ((request.headers.get('Content-Type') || '').split(';', 1)[0].trim().toLowerCase() !== 'application/json') {
    return metricResponse(415);
  }

  const declaredLength = Number(request.headers.get('Content-Length') || 0);
  if (declaredLength > MAX_BODY_BYTES) return metricResponse(413);

  let payload;
  try {
    const body = await request.text();
    if (new TextEncoder().encode(body).byteLength > MAX_BODY_BYTES) return metricResponse(413);
    payload = JSON.parse(body);
  } catch {
    return metricResponse(400);
  }

  if (!validMetric(payload)) return metricResponse(400);
  if (!env.METRICS) return metricResponse(503);

  env.METRICS.writeDataPoint({
    indexes: [payload.event],
    blobs: [payload.event, payload.page, payload.source, payload.topic],
    doubles: [1],
  });
  return metricResponse(204);
}

export function validMetric(payload) {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) return false;
  const keys = Object.keys(payload).sort();
  if (keys.length !== PAYLOAD_KEYS.length || keys.some((key, index) => key !== [...PAYLOAD_KEYS].sort()[index])) {
    return false;
  }
  return (
    EVENTS.has(payload.event) &&
    PAGES.has(payload.page) &&
    typeof payload.source === 'string' &&
    SOURCE_PATTERN.test(payload.source) &&
    TOPICS.has(payload.topic)
  );
}

function metricResponse(status) {
  return new Response(null, {
    status,
    headers: {
      'Cache-Control': 'no-store',
      'Content-Security-Policy': "default-src 'none'",
      'X-Content-Type-Options': 'nosniff',
    },
  });
}
