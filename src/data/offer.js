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
  standardPriceStatement: 'Most Operations Automation Sprints start at $1,500.',
  pricingSummary:
    "Most Operations Automation Sprints start at $1,500. A qualifying founding-client scope is $750 and must have one clear trigger, one primary outcome, no custom service or database, no more than two client-owned systems, and permission to develop an anonymized case study. Nothing is published without the client's approval, and a positive testimonial is not required. Work needing a custom service, database, or more complex integration starts at $2,500.",
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
  pricing: [
    {
      name: 'Standard sprint',
      price: '$1,500',
      body: 'The normal starting point for one primary workflow. The ordinary case spans one to three systems and includes testing, deployment, documentation, training, and handoff.',
      featured: true,
    },
    {
      name: 'Founding-client sprint',
      price: '$750',
      body: 'A tightly bounded exception. Every requirement below must be met.',
      requirements: [
        'One clear trigger',
        'One primary outcome',
        'No custom service or database',
        'No more than two client-owned systems',
        'Permission to develop an anonymized case study',
        'Client approval before anything is published',
        'No positive testimonial required',
      ],
    },
    {
      name: 'Custom system',
      price: '$2,500+',
      body: 'Starting point for work that needs a custom service, a database, or more complex integration.',
    },
  ],
};
