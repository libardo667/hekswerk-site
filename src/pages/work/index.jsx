import Layout from '@theme/Layout';
import {
  CallToAction,
  FitLists,
  Hero,
  PricingCards,
  ProcessSteps,
} from '../../components/SitePrimitives';
import {offer} from '../../data/offer';

const representativeProjects = [
  'Form or email intake routed into a tracker or CRM.',
  'Attachments extracted and reconciled against internal records.',
  'Recurring CSV or spreadsheet exports cleaned into a report.',
  'Deadline or follow-up tasks created from structured records.',
  'An unreliable Zapier, Make, or n8n workflow rebuilt with visible failures and documentation.',
];

const sprintContents = [
  {
    eyebrow: 'Define',
    title: 'A workflow with a testable boundary',
    items: [
      'Workflow mapping',
      'Acceptance criteria agreed before implementation',
    ],
  },
  {
    eyebrow: 'Build',
    title: 'One primary workflow',
    items: [
      'One to three systems in the ordinary case',
      'Implementation of the agreed automation',
    ],
  },
  {
    eyebrow: 'Verify',
    title: 'Expected paths and visible failures',
    items: [
      'Happy-path and exception testing',
      'Basic logs or an audit trail appropriate to the scope',
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
  },
];

export default function Work() {
  return (
    <Layout title={offer.name} description={`${offer.name}: ${offer.shortDescription}`}>
      <main>
        <Hero
          eyebrow="Operations Automation Sprint · Primary commercial offer"
          title="One recurring workflow, made reliable."
          lede="Repetitive operations become fragile when information arrives through one system, gets copied into another, and depends on a person remembering the next step. The Operations Automation Sprint replaces one of those manual chains with a bounded, tested workflow and a client-owned handoff."
          actions={[
            {label: 'Start an automation inquiry', to: '/contact?topic=automation', primary: true},
            {label: 'Check fit and scope', href: '#fit'},
          ]}
          aside={(
            <div className="offer-summary" aria-label="Operations Automation Sprint starting prices">
              <span className="eyebrow">The normal starting point</span>
              <strong>$1,500</strong>
              <p>A standard sprint covers one primary workflow, usually across one to three systems.</p>
              <div className="offer-quick-facts">
                <span><b>$750</b> qualifying founding-client sprint</span>
                <span><b>$2,500+</b> custom system</span>
              </div>
              <a className="text-link" href="#pricing">See the pricing conditions</a>
            </div>
          )}
        />

        <section className="section-block">
          <div className="shell split-section work-intro">
            <div className="section-heading">
              <span className="eyebrow">The problem</span>
              <h2>Manual bridges make repeatable work fragile</h2>
              <p>
                A form arrives. Someone copies its fields into a spreadsheet. An attachment is checked against a
                record. A follow-up depends on memory. None of those steps is unusual, but the chain becomes hard to
                see, hard to test, and easy to interrupt.
              </p>
              <p>
                The sprint starts by making that chain explicit. The build has a named trigger, a primary outcome,
                known exceptions, and an acceptance check that both sides agree on before implementation.
              </p>
            </div>
            <article className="lane-card lane-card--commercial service-audience">
              <span className="eyebrow">Who it is for</span>
              <h2>A small team with a named owner</h2>
              <p>{offer.audience}</p>
              <p>
                An identifiable internal owner should be able to explain the current decisions and take over the
                resulting system after handoff.
              </p>
            </article>
          </div>
        </section>

        <section className="section-block section-soft">
          <div className="shell">
            <div className="section-heading">
              <span className="eyebrow">Representative projects</span>
              <h2>Concrete workflows, not an abstract transformation</h2>
              <p>
                These are examples of suitable sprint scopes. They are not claims that each project has already
                been delivered for a Hekswerk client.
              </p>
            </div>
            <div className="project-example-grid">
              {representativeProjects.map((project, index) => (
                <article className="project-example-card" key={project}>
                  <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                  <p>{project}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-block">
          <div className="shell">
            <div className="section-heading">
              <span className="eyebrow">What the sprint contains</span>
              <h2>The working scope is explicit before implementation</h2>
              <p>
                The ordinary sprint is one primary workflow across one to three systems. The exact boundary and
                acceptance criteria are written down before the build begins.
              </p>
            </div>
            <div className="sprint-scope-grid">
              {sprintContents.map((group) => (
                <article className="sprint-scope-card" key={group.title}>
                  <span className="eyebrow">{group.eyebrow}</span>
                  <h3>{group.title}</h3>
                  <ul>
                    {group.items.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-block section-soft">
          <div className="shell">
            <div className="section-heading">
              <span className="eyebrow">How it runs</span>
              <h2>Four stages from current process to handoff</h2>
            </div>
            <ProcessSteps steps={offer.process} />
          </div>
        </section>

        <section className="section-block" id="fit">
          <div className="shell">
            <div className="section-heading">
              <span className="eyebrow">Fit</span>
              <h2>The best first scope is narrow enough to test and own</h2>
              <p>
                You should be able to decide from the boundaries below whether the sprint is likely to fit before
                sending an inquiry.
              </p>
            </div>
            <FitLists fit={offer.fit} nonFit={offer.nonFit} />
          </div>
        </section>

        <section className="section-block section-soft" id="pricing">
          <div className="shell">
            <div className="section-heading">
              <span className="eyebrow">Pricing</span>
              <h2>Standard work starts at $1,500</h2>
              <p>
                The $750 rate is a tightly bounded founding-client exception. A custom system starts at $2,500.
                Final scope and price are agreed before implementation.
              </p>
            </div>
            <PricingCards items={offer.pricing} />
            <aside className="pricing-note">
              <span className="eyebrow">About the founding-client rate</span>
              <h3>An anonymized case study, never a required endorsement</h3>
              <p>
                The $750 rate requires permission to develop an anonymized case study. Nothing is published without
                the client's approval. The case study can document the scope, approach, build, and acceptance check
                without identifying the client, and no positive testimonial is required.
              </p>
            </aside>
          </div>
        </section>

        <section className="section-block">
          <div className="shell">
            <div className="section-heading">
              <span className="eyebrow">Boundaries and ownership</span>
              <h2>A defined handoff, not an indefinite obligation</h2>
            </div>
            <div className="service-boundary-grid">
              <article className="service-boundary-card">
                <span className="eyebrow">Ownership</span>
                <h3>The resulting system belongs to the client</h3>
                <p>The client owns the accounts, credentials, documentation, and resulting system.</p>
                <p>Hekswerk is not a required hosting layer, subscription, or permanent operator.</p>
              </article>
              <article className="service-boundary-card">
                <span className="eyebrow">Support</span>
                <h3>The sprint ends</h3>
                <p>{offer.defectCorrection}</p>
                <p>There is no indefinite maintenance obligation, 24-hour support, or custom SaaS product hidden inside the sprint.</p>
              </article>
              <article className="service-boundary-card">
                <span className="eyebrow">Data and access</span>
                <h3>Discovery starts without sensitive production data</h3>
                <p>
                  Do not send sensitive production data during initial discovery. Regulated or unusually sensitive
                  data requires a separate assessment before access or implementation is agreed.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="section-block section-soft">
          <div className="shell">
            <CallToAction
              title="Name the workflow you want to make reliable."
              body="Describe where it starts, who owns it, what systems it crosses, what usually goes wrong, and what a successful handoff would look like. No scheduling call is required to send the first note."
              label="Start an automation inquiry"
              to="/contact?topic=automation"
            />
          </div>
        </section>
      </main>
    </Layout>
  );
}
