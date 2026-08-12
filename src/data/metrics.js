export const metricEndpoint = '/_metrics';

export const metricEvents = new Set([
  'work_view',
  'selected_work_view',
  'contact_cta_click',
  'automation_form_started',
  'automation_form_submitted',
]);

const trackedPages = new Set([
  '/',
  '/work',
  '/work/brief',
  '/work/selected-work',
  '/research',
  '/about',
  '/contact',
  '/privacy',
]);
const topics = new Set(['none', 'automation', 'research', 'general', 'relocation']);
const carriedSourcePattern =
  /^(?:direct|internal|outreach\.[a-z0-9][a-z0-9._-]{0,47}|referrer\.[a-z0-9][a-z0-9.-]{0,62})$/;
const outreachPattern = /^[a-z0-9][a-z0-9._-]{0,47}$/;

export function normalizePage(pathname) {
  const page = pathname !== '/' ? pathname.replace(/\/$/, '') : pathname;
  return trackedPages.has(page) ? page : 'other';
}

export function sourceFromContext({search = '', referrer = '', origin = ''} = {}) {
  const parameters = new URLSearchParams(search);
  const carried = parameters.get('source')?.toLowerCase() || '';
  if (carriedSourcePattern.test(carried)) return carried;

  const outreach = parameters.get('utm_source')?.trim().toLowerCase() || '';
  if (outreach) return outreachPattern.test(outreach) ? `outreach.${outreach}` : 'outreach.other';

  if (!referrer) return 'direct';
  try {
    const referringUrl = new URL(referrer);
    if (referringUrl.origin === origin) return 'internal';
    const hostname = referringUrl.hostname.toLowerCase();
    if (/^[a-z0-9][a-z0-9.-]{0,62}$/.test(hostname)) return `referrer.${hostname}`;
  } catch {
    // A malformed referrer is treated as unknown instead of being transmitted.
  }
  return 'referrer.other';
}

export function currentMetricContext() {
  if (typeof window === 'undefined') return {page: 'other', source: 'direct'};
  return {
    page: normalizePage(window.location.pathname),
    source: sourceFromContext({
      search: window.location.search,
      referrer: document.referrer,
      origin: window.location.origin,
    }),
  };
}

export function metricPayload(event, {page, source, topic = 'none'} = {}) {
  if (!metricEvents.has(event)) return null;
  if (!trackedPages.has(page) && page !== 'other') return null;
  if (!carriedSourcePattern.test(source) && source !== 'referrer.other' && source !== 'outreach.other') return null;
  if (!topics.has(topic)) return null;
  return {event, page, source, topic};
}

export function sendMetric(event, {topic = 'none'} = {}) {
  if (typeof window === 'undefined') return;
  const payload = metricPayload(event, {...currentMetricContext(), topic});
  if (!payload) return;
  void fetch(metricEndpoint, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(payload),
    credentials: 'omit',
    keepalive: true,
  }).catch(() => {});
}

function contactTopic(url) {
  const topic = url.searchParams.get('topic') || 'automation';
  return topics.has(topic) && topic !== 'none' ? topic : 'automation';
}

function contactUrl(anchor) {
  try {
    const url = new URL(anchor.href, window.location.href);
    return url.origin === window.location.origin && url.pathname.replace(/\/$/, '') === '/contact' ? url : null;
  } catch {
    return null;
  }
}

export function installMetrics() {
  if (typeof window === 'undefined') return;
  const context = currentMetricContext();

  for (const anchor of document.querySelectorAll('a[href]')) {
    const url = contactUrl(anchor);
    if (!url) continue;
    url.searchParams.set('source', context.source);
    anchor.href = `${url.pathname}${url.search}${url.hash}`;
  }

  document.addEventListener('click', (event) => {
    const anchor = event.target.closest?.('a[href]');
    if (!anchor) return;
    const url = contactUrl(anchor);
    if (url) sendMetric('contact_cta_click', {topic: contactTopic(url)});
  });

  if (context.page === '/work') sendMetric('work_view');
  if (context.page === '/work/selected-work') sendMetric('selected_work_view');
}
