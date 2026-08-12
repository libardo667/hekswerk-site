import Link from '../../components/Link';
import Layout from '../../components/PageContent';
import StructuredData from '../../components/StructuredData';
import {offer} from '../../data/offer';

const workflowExamples = [
  {
    title: 'Route new inquiries',
    body: 'Move details from a form or shared inbox into the right tracker or CRM, assign an owner, and create the next step.',
  },
  {
    title: 'Reconcile documents',
    body: 'Extract attachment data, match it against internal records, and flag missing or mismatched items for review.',
  },
  {
    title: 'Build recurring reports',
    body: 'Clean CSV or spreadsheet exports, combine the required sources, and produce a consistent operational report.',
  },
  {
    title: 'Repair brittle automations',
    body: 'Rebuild an unreliable Zapier, Make, or n8n workflow with visible failures, useful logs, and documentation.',
  },
];

const sprintContents = [
  'Map one primary workflow and agree on acceptance criteria.',
  'Build across one to three systems in the ordinary case.',
  'Test the expected path, exceptions, and failure behavior.',
  'Add basic logs or an audit trail appropriate to the scope.',
  'Deploy, write the runbook, and train the workflow owner.',
  'Correct in-scope defects for 30 calendar days after handoff.',
];

export default function WorkBrief() {
  return (
    <Layout title="Referral brief" description="A one-page brief for the Hekswerk Operations Automation Sprint.">
      <StructuredData
        data={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          '@id': 'https://www.hekswerk.com/work/brief#operations-automation-sprint',
          name: offer.name,
          url: 'https://www.hekswerk.com/work/brief',
          serviceType: 'Operations automation',
          description: offer.shortDescription,
          provider: {'@id': 'https://www.hekswerk.com/#organization'},
        }}
      />
      <main className="brief-main">
        <article className="referral-brief" aria-labelledby="brief-title">
          <header className="brief-header">
            <div className="brief-brandline">
              <Link className="brief-brand" to="/">
                <img src="/img/logo_aura.svg" alt="" />
                <span>Hekswerk</span>
              </Link>
              <span className="brief-type">Operations Automation Sprint</span>
            </div>
            <div className="brief-intro">
              <div>
                <span className="brief-kicker">One workflow. A clear handoff.</span>
                <h1 id="brief-title">Make the manual chain reliable.</h1>
                <p className="brief-offer">
                  I turn one repetitive internal workflow into a tested automation that runs in systems your team
                  controls, with documentation and a clean handoff.
                </p>
              </div>
              <aside className="brief-price" aria-label="Starting price">
                <span>Starting price</span>
                <strong>{offer.pricing.standard.price}</strong>
                <p>Most Operations Automation Sprints start here.</p>
              </aside>
            </div>
          </header>

          <section className="brief-section brief-examples" aria-labelledby="brief-examples-title">
            <div className="brief-section-heading">
              <span>Recognizable workflows</span>
              <h2 id="brief-examples-title">Does one of these keep landing back in someone&apos;s hands?</h2>
            </div>
            <div className="brief-example-grid">
              {workflowExamples.map((example, index) => (
                <article className="brief-example" key={example.title}>
                  <span aria-hidden="true">0{index + 1}</span>
                  <div>
                    <h3>{example.title}</h3>
                    <p>{example.body}</p>
                  </div>
                </article>
              ))}
            </div>
            <p className="brief-example-boundary">
              These are representative scopes, not claims about completed Hekswerk client projects.
            </p>
          </section>

          <div className="brief-detail-grid">
            <section className="brief-section brief-contains" aria-labelledby="brief-contains-title">
              <div className="brief-section-heading">
                <span>What the sprint contains</span>
                <h2 id="brief-contains-title">From current process to owned system</h2>
              </div>
              <ul>
                {sprintContents.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <div className="brief-side-stack">
              <section className="brief-section brief-ownership" aria-labelledby="brief-ownership-title">
                <div className="brief-section-heading">
                  <span>Client ownership</span>
                  <h2 id="brief-ownership-title">No dependency hidden in the handoff</h2>
                </div>
                <p>
                  Your accounts, credentials, data, documentation, and resulting system stay yours. Hekswerk is not a
                  required hosting layer, subscription, or permanent operator.
                </p>
              </section>

              <section className="brief-section brief-scoping" aria-labelledby="brief-scoping-title">
                <div className="brief-section-heading">
                  <span>When the workflow needs definition</span>
                  <h2 id="brief-scoping-title">Paid Workflow Scoping is {offer.pricing.scoping.price}</h2>
                </div>
                <p>
                  If a responsible build cannot be quoted from the initial inquiry, scoping maps the workflow and
                  produces a build proposal or a reason to narrow it. The full fee is credited toward an accepted build
                  within 30 days.
                </p>
              </section>
            </div>
          </div>

          <section className="brief-proof" aria-labelledby="brief-proof-title">
            <div className="brief-proof-label">
              <span>Selected-work proof</span>
              <h2 id="brief-proof-title">A real operational workflow, with the claim boundary attached</h2>
            </div>
            <div className="brief-proof-copy">
              <p>
                In a healthcare data-quality role, I designed and wrote a Python workflow that gathered reports from
                separate systems, normalized and reconciled records, and produced an operational report.
              </p>
              <p className="brief-proof-boundary">
                Paid employer work, not a Hekswerk client result. A runnable sanitized reconstruction uses synthetic
                data and validates the method, not a historical business outcome.
              </p>
              <Link className="brief-text-link" to="https://github.com/libardo667/delivery-reconciliation-sample">
                Inspect the sanitized sample
              </Link>
            </div>
          </section>

          <footer className="brief-footer">
            <div>
              <span>Have one workflow in mind?</span>
              <strong>Send where it starts, what systems it crosses, and what keeps going wrong.</strong>
            </div>
            <Link className="brief-contact" to="/contact?topic=automation">
              www.hekswerk.com/contact
            </Link>
          </footer>
        </article>
      </main>
    </Layout>
  );
}
