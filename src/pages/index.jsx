import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import {BoundaryBox, CallToAction, Hero, ProofCards} from '../components/SitePrimitives';
import {offer} from '../data/offer';

export default function Home() {
  return (
    <Layout
      title="Operations automation and open research"
      description="Hekswerk is Levi Banks's one-person systems practice. Its primary offer is a bounded Operations Automation Sprint."
    >
      <main>
        <Hero
          eyebrow="Hekswerk · One-person systems practice"
          title="Make one recurring workflow easier to run."
          lede={`${offer.primaryStatement} ${offer.shortDescription}`}
          actions={[
            {label: 'See the sprint', to: '/work', primary: true},
            {label: 'Start an inquiry', to: '/contact?topic=automation'},
          ]}
          aside={(
            <div className="aura-panel" aria-label="Sprint boundaries">
              <img src="/img/logo_aura.svg" alt="" />
              <span>One agreed workflow</span>
              <span>A concrete acceptance check</span>
              <span>{offer.standardPriceStatement}</span>
            </div>
          )}
        />

        <section className="section-block">
          <div className="shell">
            <div className="section-heading">
              <span className="eyebrow">The commercial front door</span>
              <h2>A small, testable operations build</h2>
              <p>{offer.audience}</p>
            </div>
            <ProofCards items={[
              {
                title: 'Bound the work',
                body: 'Start with a workflow that has a recognizable trigger, result, owner, and set of exceptions.',
              },
              {
                title: 'Test before handoff',
                body: 'Define acceptance before the build, then test both the expected path and known failure cases.',
              },
              {
                title: 'Keep control',
                body: offer.ownership,
              },
            ]} />
          </div>
        </section>

        <section className="section-block section-soft">
          <div className="shell lane-grid">
            <article className="lane-card lane-card--commercial">
              <span className="eyebrow">Contract work</span>
              <h2>Operations Automation Sprint</h2>
              <p>{offer.delivery}</p>
              <Link className="button button--primary" to="/work">Review the offer</Link>
            </article>
            <article className="lane-card">
              <span className="eyebrow">Open research</span>
              <h2>WorldWeaver</h2>
              <p>
                WorldWeaver is software for persistent AI residents and the worlds they can inhabit with people.
                It is visible evidence of systems work, not the service being sold.
              </p>
              <div className="link-row">
                <Link className="button button--outline" to="/worldweaver/">Read the manual</Link>
                <Link className="text-link" to="/research">Research orientation</Link>
              </div>
            </article>
          </div>
        </section>

        <section className="section-block">
          <div className="shell split-section">
            <div className="section-heading">
              <span className="eyebrow">Relevant evidence</span>
              <h2>Systems work, with the boundaries left visible</h2>
              <p>
                My paid technical work has included AI-output evaluation, Python code review, and operations data
                work. Independent projects show how I structure software, testing, handoffs, and evidence.
              </p>
              <Link className="text-link" to="/work/selected-work">Review selected work</Link>
            </div>
            <BoundaryBox title="What this does not claim">
              <p>
                The offer terms describe the work I am offering. They are not a claim about completed Hekswerk
                client projects, outcome metrics, or a production automation track record.
              </p>
            </BoundaryBox>
          </div>
        </section>

        <section className="section-block section-soft">
          <div className="shell">
            <CallToAction
              title="Bring one workflow, not a transformation program."
              body="Tell me where the workflow starts, who touches it, what systems it crosses, and what a successful handoff would look like."
              label="Start an automation inquiry"
              to="/contact?topic=automation"
            />
          </div>
        </section>
      </main>
    </Layout>
  );
}
