// Single source of truth for every price shown on the site and emitted in structured
// data. Repriced 2026-09-09; see the consolidated business plan section 5.0 for the
// placement argument and the market comparables it was set against.
//
// NO PUBLIC DISCOUNT. Per docs/CONTRACT_WORK_RELAUNCH.md (2026-08-12): "Public pricing is
// no longer conditioned on permission to develop or approve a case study, a testimonial,
// an endorsement, or a launch label. Any future discount is a private proposal-level
// decision, not a public offer." An introductory rate for early engagements may exist as a
// private negotiating position; it must never appear in site copy or in this module.
// scripts/check-built-site.mjs enforces this by failing on retired pricing language.
//
// Two price lists, never a conversion: USD is quoted to US clients and EUR to EU clients,
// each priced to its own market. Dutch B2B convention is to quote excl. BTW. BTW treatment
// (Dutch clients 21%, EU B2B reverse charge, US generally out of scope) must be confirmed
// with the bookkeeper before the first euro invoice.
//
// NO PRICE RANGES. A published price is one number, or a single "from" anchor where scope
// genuinely varies. Two numbers make a reader ask which one applies and start negotiating
// before they have written. The live copy already does this correctly: "Most Operations
// Automation Sprints start at ..." and "generally starts at ...".
const workflowScopingPrice = '$750';
const standardSprintPrice = '$6,000';
const customWorkStartingPrice = '$12,000';
const customWorkPrice = `${customWorkStartingPrice}+`;
const partnershipPrice = '$1,800';
const partnershipHours = 8;

// Not yet displayed. Publishes when the Netherlands price list goes live (business plan
// section 4, phase 2).
export const euroPrices = {
  scoping: '€750',
  sprint: '€5,500',
  customWork: '€11,000',
  partnership: '€1,650',
  note: 'All euro prices exclude BTW.',
};

const pricing = {
  inquiry: {
    name: 'Initial inquiry',
    price: 'Free',
    title: 'Start with the workflow',
    body: 'Sending an initial inquiry remains free. Paid work begins only after scope, responsibilities, and payment are agreed in writing.',
  },
  scoping: {
    name: 'Paid Workflow Scoping',
    price: workflowScopingPrice,
    title: 'Define the work before a build proposal',
    body: 'Workflow Scoping is a paid pre-build engagement used when the initial inquiry does not provide enough information to make a responsible fixed-price build proposal.',
    deliverables: [
      'A map of one recurring workflow.',
      'An inventory of the systems, owners, dependencies, and known constraints involved.',
      'A feasibility assessment.',
      'Draft acceptance criteria.',
      'A recommended implementation approach.',
      'A fixed-price build proposal when a responsible proposal can be made.',
      'A reasoned no-build or narrower-scope recommendation when the proposed automation is not presently responsible or feasible.',
    ],
    implementationBoundary: 'Workflow Scoping does not include implementation.',
    exclusions: [
      'Production deployment or production changes.',
      'Training, post-handoff support, or defect correction.',
    ],
    creditRule: `If the client accepts the resulting build proposal within 30 calendar days, the full ${workflowScopingPrice} scoping fee is credited toward that build.`,
    creditExplanation: `The credit means the client does not pay ${workflowScopingPrice} on top of the accepted build price.`,
    directQuoteBoundary:
      'A sufficiently clear and narrow workflow may be quoted directly without a separate scoping engagement.',
  },
  standard: {
    name: 'Operations Automation Sprint',
    price: standardSprintPrice,
    title: 'Implement one agreed workflow',
    statement: `Most Operations Automation Sprints start at ${standardSprintPrice}.`,
    body: 'The ordinary sprint covers one primary workflow, usually across one to three client-controlled systems, from mapping and acceptance criteria through implementation, testing, deployment, a runbook, one handoff or training session, and 30 calendar days of bounded defect correction. The price is a starting point, not a claim that every project costs the same amount.',
  },
  custom: {
    name: 'Custom integration or system',
    price: customWorkPrice,
    title: 'Scope higher-risk work separately',
    statement: `Work requiring a custom service, database, migration, more than three meaningful systems, complex authentication or permissions, or materially greater implementation risk is separately scoped and generally starts at ${customWorkStartingPrice}.`,
    conditions: [
      'A custom service, database, or migration.',
      'More than three meaningful systems.',
      'Complex authentication or permissions.',
      'Materially greater implementation risk.',
    ],
    otherFactors: [
      'Substantial historical data cleanup.',
      'Several departments or workflow owners.',
      'Many undocumented decision branches or exceptions.',
      'Regulated or unusually sensitive information.',
      'Real-time, high-availability, or ongoing operational expectations.',
      'AI that materially influences consequential decisions.',
    ],
    boundary: 'These examples are scope signals, not an exhaustive rate card.',
  },
  // Not yet published. Opens only after acquisition resumes (business plan section 4,
  // phase 2). Offered only to a client who has already completed a sprint or custom build,
  // never sold to a new prospect: the /work page promises "The sprint ends", and a monthly
  // tier placed carelessly reads as a walk-back of that promise.
  partnership: {
    name: 'Continuity partnership',
    price: `${partnershipPrice} / month`,
    title: 'Ongoing improvement after a completed engagement',
    statement: `A continuity partnership is ${partnershipPrice} per month and covers up to ${partnershipHours} hours of client-specific work.`,
    body: 'Some workflows keep earning attention after handoff. A continuity partnership is a separate monthly engagement, available only after a completed sprint or custom build. Each month begins by agreeing one small improvement or a clearly scoped investigation, and what useful completion means.',
    includes: [
      'A planning and review conversation, or its written equivalent.',
      'Bounded asynchronous communication.',
      'A tested deliverable or an agreed diagnostic result.',
      'An updated handoff record.',
    ],
    boundary:
      'It is not a support contract, an on-call arrangement, or an unlimited-development retainer. Unused capacity does not accumulate. Either side may end it with 30 days notice.',
    separateAgreement:
      'If continuing work turns out to be worthwhile, a continuity partnership is a separate agreement entered deliberately, not an extension of this one.',
  },
};

pricing.homepageStatement = `${pricing.standard.statement} Paid Workflow Scoping is ${pricing.scoping.price} when the workflow needs more definition, and the scoping fee is credited toward an accepted build.`;

// ---------------------------------------------------------------------------------------
// Relocation coordination. NOT PUBLISHED. No route renders this yet.
//
// Held here so the line can go live quickly when it does. Before anything using it ships:
// PUBLIC_CLAIMS_LEDGER.md entries REL-01, REL-07 and REL-08 must move from Hold to Yes, and
// /privacy must cover the consumer service (controller status, lawful basis, retention,
// deletion) with the EU/NL 14-day withdrawal right settled by a Dutch adviser.
//
// REL-03 is the boundary that matters most: Hekswerk plans, researches, screens, explains,
// introduces with consent, routes, and coordinates. It does not act for the client. No
// wording here may imply arranging, registering, filing, submitting, or opening anything.
// ---------------------------------------------------------------------------------------
export const relocationOffer = {
  published: false,
  name: 'Relocation coordination',
  shortDescription:
    'The coordination layer for a household relocation: what is waiting on whom, what is blocked, what has been decided rather than assumed, and what breaks if a date slips.',
  notThese: 'Hekswerk is not a housing agent, an immigration lawyer, a tax adviser, or a moving company.',
  boundaries: [
    'Hekswerk does not make legal, immigration, tax, medical, or financial determinations.',
    'Hekswerk does not submit forms on your behalf, log into your accounts, hold your funds, or make payments for you.',
    'Hekswerk does not act or decide as you. An introduction or a routed question sent with your approval is coordination, not representation.',
    'Hekswerk cannot guarantee approval, timing, cost, or any third party decision.',
  ],
  pricing: {
    controlPlan: {name: 'Relocation Control Plan', price: '€1,500', note: 'Excludes BTW.'},
    coordination: {name: 'Ongoing coordination', price: '€800 / month', note: 'Excludes BTW.'},
  },
  deliverables: [
    'A milestone and dependency map for the whole move.',
    'A 30-day action plan, ranked by what each item blocks.',
    'Every item marked actionable, waiting, conditional, or completed.',
    'An owner and a next action for each critical item, with a date or the trigger it waits on.',
    'Source-linked notes, with uncertainty marked rather than smoothed over.',
    'Open questions routed to the right professional, with introductions made only with your approval.',
    'A handoff you keep, whether or not the engagement continues.',
  ],
};

// Scope facts shared by the full service page and the printable referral brief.
//
// The two pages present these differently on purpose: /work uses a numbered list and
// grouped phases, /work/brief uses title-and-body cards and one-line summaries sized to
// fit a single printed sheet. Both renderings live here, adjacent, so a change to the
// offer cannot update one page and quietly leave the other describing something stale.
//
// `brief: null` means an item is deliberately omitted from the printed brief for space.
// That is a decision recorded as data, not an oversight.
export const sprintScope = {
  examples: [
    {
      title: 'Route new inquiries',
      brief:
        'Move details from a form or shared inbox into the right tracker or CRM, assign an owner, and create the next step.',
      full: 'Form or email intake routed into a tracker or CRM.',
    },
    {
      title: 'Reconcile documents',
      brief:
        'Extract attachment data, match it against internal records, and flag missing or mismatched items for review.',
      full: 'Attachments extracted and reconciled against internal records.',
    },
    {
      title: 'Build recurring reports',
      brief:
        'Clean CSV or spreadsheet exports, combine the required sources, and produce a consistent operational report.',
      full: 'Recurring CSV or spreadsheet exports cleaned into a report.',
    },
    {
      title: 'Create follow-up work',
      brief: null,
      full: 'Deadline or follow-up tasks created from structured records.',
    },
    {
      title: 'Repair brittle automations',
      brief:
        'Rebuild an unreliable Zapier, Make, or n8n workflow with visible failures, useful logs, and documentation.',
      full: 'An unreliable Zapier, Make, or n8n workflow rebuilt with visible failures and documentation.',
    },
  ],
  // Each phase carries the grouped form used by /work and the condensed lines used by the
  // brief. A phase may condense to more than one line where the brief separates concerns.
  phases: [
    {
      eyebrow: 'Define',
      title: 'A workflow with a testable boundary',
      items: ['Workflow mapping', 'Acceptance criteria agreed before implementation'],
      briefLines: ['Map one primary workflow and agree on acceptance criteria.'],
    },
    {
      eyebrow: 'Build',
      title: 'One primary workflow',
      items: ['One to three systems in the ordinary case', 'Implementation of the agreed automation'],
      briefLines: ['Build across one to three systems in the ordinary case.'],
    },
    {
      eyebrow: 'Verify',
      title: 'Expected paths and visible failures',
      items: ['Happy-path and exception testing', 'Basic logs or an audit trail appropriate to the scope'],
      briefLines: [
        'Test the expected path, exceptions, and failure behavior.',
        'Add basic logs or an audit trail appropriate to the scope.',
      ],
    },
    {
      eyebrow: 'Hand off',
      title: 'A system the client can own',
      items: [
        'Deployment into client-owned systems',
        'Written runbook',
        'One handoff or training session',
        '30 calendar days of bounded defect correction',
      ],
      briefLines: [
        'Deploy, write the runbook, and train the workflow owner.',
        'Correct in-scope defects for 30 calendar days after handoff.',
      ],
    },
  ],
};

// Derived views. Pages consume these rather than re-declaring the facts locally.
export const sprintExamplesFull = sprintScope.examples.map((example) => example.full);
export const sprintExamplesBrief = sprintScope.examples
  .filter((example) => example.brief)
  .map(({title, brief}) => ({title, body: brief}));
export const sprintPhases = sprintScope.phases;
export const sprintContentsBrief = sprintScope.phases.flatMap((phase) => phase.briefLines);

export const offer = {
  name: 'Operations Automation Sprint',
  primaryStatement: "The Operations Automation Sprint is Hekswerk's primary commercial offer.",
  shortDescription: 'A bounded build for one recurring internal workflow, deployed into systems the client controls.',
  audience:
    'It is for small, operations-heavy professional-service teams, generally 3 to 25 people, with one recurring internal workflow that can be named, bounded, tested, and handed off.',
  delivery:
    'For one agreed workflow, I map the current process, define the build and acceptance check, build and test the automation, deploy it into client-controlled systems, document it, train its owner, and provide a bounded defect-correction period.',
  ownership:
    'The client keeps control of its accounts, credentials, data, and deployed system. Hekswerk is not a required hosting layer, subscription, or permanent operator.',
  defectCorrection:
    'The default defect-correction period is 30 calendar days after handoff and covers defects against the agreed scope. New integrations, rules, inputs, or branches are new work.',
  pricing,
  process: [
    {
      title: 'Map the workflow',
      body: 'Name the trigger, decisions, handoffs, systems, and intended result for one recurring process.',
    },
    {
      title: 'Define acceptance',
      body: 'Agree on the build boundary, failure cases, and a concrete check for whether the workflow works.',
    },
    {
      title: 'Build and test',
      body: 'Implement the automation and test the expected path, exceptions, and handoff points.',
    },
    {
      title: 'Deploy and hand off',
      body: 'Deploy into client-controlled systems, document the workflow, and train the person who will own it.',
    },
  ],
  fit: [
    'One recurring internal workflow has a clear beginning and end.',
    'An identifiable internal owner can explain the workflow and own it after handoff.',
    'The people who use the workflow can explain its decisions and exceptions.',
    'The necessary accounts and data can remain under client control.',
    'A practical acceptance check can be agreed before the build starts.',
  ],
  nonFit: [
    'A broad digital transformation with no single workflow boundary.',
    'A replacement for a permanent operations role or managed service.',
    'A speculative AI feature without a defined operational need.',
    'Work that requires unsupported access, hidden ownership, or a guaranteed business result.',
  ],
};
