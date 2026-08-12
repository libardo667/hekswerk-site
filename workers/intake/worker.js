const ALLOWED_ORIGINS = new Set([
  'https://www.hekswerk.com',
  'https://hekswerk.com',
  'http://localhost:4321',
  'http://127.0.0.1:4321',
  'http://localhost:4173',
  'http://127.0.0.1:4173',
]);

const TO_EMAIL = 'levi@hekswerk.com';
const FROM_EMAIL = 'Hekswerk Intake <intake@mail.hekswerk.com>';
const RESEND_ENDPOINT = 'https://api.resend.com/emails';
const MAX_BODY_BYTES = 32_000;
const FORM_TYPES = new Set(['automation', 'research', 'general', 'relocation']);
const FREQUENCY_OPTIONS = new Set([
  '',
  'Several times a day',
  'Daily',
  'Several times a week',
  'Weekly',
  'Monthly',
  'Less often or irregular',
  'Not sure',
]);
const TIMING_OPTIONS = new Set([
  '',
  'As soon as practical',
  'Within one month',
  'Within three months',
  'Later this year',
  'Exploring for now',
]);

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';

    if (request.method === 'OPTIONS') {
      return corsResponse(null, 204, origin);
    }

    if (request.method !== 'POST') {
      return jsonResponse({error: 'Method not allowed'}, 405, origin);
    }

    if (!ALLOWED_ORIGINS.has(origin)) {
      return jsonResponse({error: 'Origin not allowed'}, 403, origin);
    }

    const declaredLength = Number(request.headers.get('Content-Length') || 0);
    if (declaredLength > MAX_BODY_BYTES) {
      return jsonResponse({error: 'Submission is too long'}, 413, origin);
    }

    let payload;
    try {
      const rawBody = await request.text();
      if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_BYTES) {
        return jsonResponse({error: 'Submission is too long'}, 413, origin);
      }
      payload = JSON.parse(rawBody);
    } catch {
      return jsonResponse({error: 'Invalid JSON'}, 400, origin);
    }

    const normalized = normalizeSubmission(payload);
    if (normalized.error) {
      return jsonResponse({error: normalized.error}, 400, origin);
    }

    const {kind, submission} = normalized;

    // A filled honeypot means a bot. Return success without validating or sending.
    if (submission.website) {
      return jsonResponse({ok: true}, 200, origin);
    }

    const problem = validateSubmission(kind, submission);
    if (problem) {
      return jsonResponse({error: problem}, 400, origin);
    }

    if (!env.resend_api_key) {
      console.error('Missing required Resend secret binding');
      return jsonResponse({error: 'Email delivery is not configured'}, 500, origin);
    }

    const email = buildEmail(kind, submission);
    let resendResponse;
    try {
      resendResponse = await fetch(RESEND_ENDPOINT, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${env.resend_api_key}`,
          'Content-Type': 'application/json',
          'User-Agent': 'hekswerk-intake-worker/2.0',
        },
        body: JSON.stringify({
          from: FROM_EMAIL,
          to: [TO_EMAIL],
          reply_to: submission.email,
          subject: email.subject,
          text: email.text,
        }),
      });
    } catch {
      console.error('Resend delivery request failed');
      return jsonResponse({error: 'Email delivery failed'}, 502, origin);
    }

    if (!resendResponse.ok) {
      console.error(`Resend delivery failed with status ${resendResponse.status}`);
      return jsonResponse({error: 'Email delivery failed'}, 502, origin);
    }

    return jsonResponse({ok: true}, 200, origin);
  },
};

function normalizeSubmission(payload) {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    return {error: 'Invalid submission'};
  }

  const formType = clean(payload.form_type);
  if (Number(payload.schema_version) === 2 && FORM_TYPES.has(formType)) {
    return {kind: formType, submission: normalizeVersionTwo(payload, formType)};
  }

  // Accept the pre-versioned public form while the Worker and site are deployed independently.
  if (formType === 'relocation' || (!formType && clean(payload.hardest_part))) {
    return {kind: 'relocation', submission: normalizeLegacyRelocation(payload)};
  }
  if (formType === 'contact' || (!formType && clean(payload.message))) {
    return {kind: 'legacy_contact', submission: normalizeLegacyContact(payload)};
  }

  return {error: 'Unknown form type'};
}

function normalizeShared(payload) {
  return {
    name: clean(payload.name),
    email: clean(payload.email),
    topic: clean(payload.topic),
    privacy_acknowledged: payload.privacy_acknowledged === true,
    website: clean(payload.website),
    utm_source: clean(payload.utm_source),
    utm_medium: clean(payload.utm_medium),
    utm_campaign: clean(payload.utm_campaign),
    initial_landing_path: clean(payload.initial_landing_path),
  };
}

function normalizeVersionTwo(payload, formType) {
  const shared = normalizeShared(payload);

  if (formType === 'automation') {
    return {
      ...shared,
      organization: clean(payload.organization),
      repeating_process: clean(payload.repeating_process),
      systems_involved: clean(payload.systems_involved),
      current_problem: clean(payload.current_problem),
      approximate_frequency: clean(payload.approximate_frequency),
      desired_timing: clean(payload.desired_timing),
      sensitive_or_regulated: clean(payload.sensitive_or_regulated),
    };
  }

  if (formType === 'relocation') {
    return {
      ...shared,
      current_location: clean(payload.current_location),
      target_location: clean(payload.target_location),
      timeline: clean(payload.timeline),
      household: clean(payload.household),
      hardest_part: clean(payload.hardest_part),
      constraints: clean(payload.constraints),
    };
  }

  return {...shared, message: clean(payload.message)};
}

function normalizeLegacyContact(payload) {
  return {...normalizeShared(payload), message: clean(payload.message)};
}

function normalizeLegacyRelocation(payload) {
  return {
    ...normalizeShared(payload),
    engagement_interest: clean(payload.engagement_interest),
    current_location: clean(payload.current_location),
    target_location: clean(payload.target_location),
    timeline: clean(payload.timeline),
    household: clean(payload.household),
    hardest_part: clean(payload.hardest_part),
    constraints: clean(payload.constraints || payload.urgent_or_sensitive),
  };
}

function validateSubmission(kind, submission) {
  const sharedProblem = validateShared(submission);
  if (sharedProblem) return sharedProblem;

  if (kind === 'automation') {
    if (!submission.repeating_process || !submission.sensitive_or_regulated) return 'Missing required fields';
    if (
      !['No', 'Yes', 'Unsure'].includes(submission.sensitive_or_regulated) ||
      !FREQUENCY_OPTIONS.has(submission.approximate_frequency) ||
      !TIMING_OPTIONS.has(submission.desired_timing)
    ) {
      return 'Invalid selection';
    }
    if (
      anyTooLong({
        organization: [submission.organization, 200],
        repeating_process: [submission.repeating_process, 3000],
        systems_involved: [submission.systems_involved, 1000],
        current_problem: [submission.current_problem, 3000],
        approximate_frequency: [submission.approximate_frequency, 120],
        desired_timing: [submission.desired_timing, 120],
        sensitive_or_regulated: [submission.sensitive_or_regulated, 30],
      })
    ) {
      return 'Submission is too long';
    }
    return null;
  }

  if (kind === 'relocation') {
    if (!submission.hardest_part) return 'Missing required fields';
    if (
      anyTooLong({
        engagement_interest: [submission.engagement_interest, 120],
        current_location: [submission.current_location, 200],
        target_location: [submission.target_location, 200],
        timeline: [submission.timeline, 80],
        household: [submission.household, 120],
        hardest_part: [submission.hardest_part, 3000],
        constraints: [submission.constraints, 3000],
      })
    ) {
      return 'Submission is too long';
    }
    return null;
  }

  if (!submission.message) return 'Missing required fields';
  if (anyTooLong({message: [submission.message, 5000]})) return 'Submission is too long';
  return null;
}

function validateShared(submission) {
  if (!submission.name || !submission.email || !submission.privacy_acknowledged) {
    return 'Missing required fields';
  }
  if (!isValidEmail(submission.email)) return 'Invalid email';
  if (
    anyTooLong({
      name: [submission.name, 120],
      email: [submission.email, 200],
      topic: [submission.topic, 120],
      website: [submission.website, 200],
      utm_source: [submission.utm_source, 200],
      utm_medium: [submission.utm_medium, 200],
      utm_campaign: [submission.utm_campaign, 200],
      initial_landing_path: [submission.initial_landing_path, 500],
    })
  ) {
    return 'Submission is too long';
  }
  if (submission.initial_landing_path && !submission.initial_landing_path.startsWith('/')) {
    return 'Invalid attribution';
  }
  return null;
}

function buildEmail(kind, submission) {
  if (kind === 'automation') {
    return {
      subject: `Automation inquiry from ${subjectValue(submission.name)}`,
      text: emailText('New Operations Automation Sprint inquiry', submission, [
        ['Organization', submission.organization],
        ['What process repeats', submission.repeating_process],
        ['Systems involved', submission.systems_involved],
        ['What takes too long, gets missed, or fails', submission.current_problem],
        ['Approximate frequency', submission.approximate_frequency],
        ['Desired timing', submission.desired_timing],
        ['Sensitive or regulated information', submission.sensitive_or_regulated],
      ]),
    };
  }

  if (kind === 'relocation') {
    return {
      subject: `Relocation inquiry from ${subjectValue(submission.name)}`,
      text: emailText('New Hekswerk relocation inquiry', submission, [
        ['Engagement interest', submission.engagement_interest],
        ['Current location', submission.current_location],
        ['Target location', submission.target_location],
        ['Timeline', submission.timeline],
        ['Household', submission.household],
        ['What is hardest right now', submission.hardest_part],
        ['Constraints to account for', submission.constraints],
      ]),
    };
  }

  const heading = kind === 'research' ? 'New Hekswerk research inquiry' : 'New Hekswerk contact message';
  const subjectPrefix = kind === 'research' ? 'Research inquiry' : 'Contact';
  return {
    subject: `${subjectPrefix}${submission.topic ? ` (${subjectValue(submission.topic)})` : ''} from ${subjectValue(submission.name)}`,
    text: emailText(heading, submission, [['Message', submission.message]]),
  };
}

function emailText(heading, submission, fields) {
  const lines = [
    heading,
    '',
    `Name: ${submission.name}`,
    `Email: ${submission.email}`,
    `Topic: ${submission.topic || '(none)'}`,
  ];
  for (const [label, value] of fields) {
    lines.push('', `${label}:`, value || '(not provided)');
  }
  lines.push(
    '',
    `Privacy acknowledgement: ${submission.privacy_acknowledged ? 'Yes' : 'No'}`,
    '',
    'Attribution:',
    `utm_source: ${submission.utm_source || '(not captured)'}`,
    `utm_medium: ${submission.utm_medium || '(not captured)'}`,
    `utm_campaign: ${submission.utm_campaign || '(not captured)'}`,
    `Initial landing path: ${submission.initial_landing_path || '(not captured)'}`,
  );
  return lines.join('\n');
}

function clean(value) {
  return String(value || '').trim();
}

function subjectValue(value) {
  return clean(value).replace(/[\r\n]+/g, ' ');
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function anyTooLong(fields) {
  return Object.values(fields).some(([value, max]) => String(value || '').length > max);
}

function corsResponse(body, status, origin) {
  return new Response(body, {status, headers: corsHeaders(origin)});
}

function jsonResponse(body, status, origin) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders(origin),
      'Content-Type': 'application/json',
    },
  });
}

function corsHeaders(origin) {
  const headers = {
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  };

  if (ALLOWED_ORIGINS.has(origin)) {
    headers['Access-Control-Allow-Origin'] = origin;
    headers.Vary = 'Origin';
  }

  return headers;
}

export {buildEmail, normalizeSubmission, validateSubmission};
