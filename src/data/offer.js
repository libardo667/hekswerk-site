const workflowScopingPrice = '$750';
const standardSprintPrice = '$3,500';
const customWorkStartingPrice = '$6,500';
const customWorkPrice = `${customWorkStartingPrice}+`;

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
};

pricing.homepageStatement = `${pricing.standard.statement} Paid Workflow Scoping is ${pricing.scoping.price} when the workflow needs more definition, and the scoping fee is credited toward an accepted build.`;

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
