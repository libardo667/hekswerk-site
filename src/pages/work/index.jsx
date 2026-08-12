import Layout from '@theme/Layout';
import {
  BoundaryBox,
  CallToAction,
  FitLists,
  Hero,
  PricingCards,
  ProcessSteps,
  ProofCards,
} from '../../components/SitePrimitives';
import {offer} from '../../data/offer';

export default function Work() {
  return (
    <Layout title={offer.name} description={`${offer.name}: ${offer.shortDescription}`}>
      <main>
        <Hero
          eyebrow="Primary commercial offer"
          title={offer.name}
          lede={offer.audience}
          actions={[
            {label: 'Discuss a workflow', to: '/contact?topic=automation', primary: true},
            {label: 'Share the short brief', to: '/work/brief'},
          ]}
          aside={(
            <div className="offer-summary">
              <span className="eyebrow">The shape of the work</span>
              <strong>One workflow</strong>
              <p>Mapped, bounded, built, tested, deployed, documented, and handed off.</p>
              <a className="text-link" href="#pricing">{offer.standardPriceStatement} See pricing.</a>
            </div>
          )}
        />

        <section className="section-block">
          <div className="shell">
            <div className="section-heading">
              <span className="eyebrow">What I deliver</span>
              <h2>A working handoff, not an indefinite dependency</h2>
              <p>{offer.delivery}</p>
            </div>
            <ProofCards items={[
              {
                title: 'Workflow map',
                body: 'A shared account of the trigger, rules, people, systems, exceptions, and expected result.',
              },
              {
                title: 'Acceptance check',
                body: 'A concrete way to decide whether the agreed workflow behaves as intended.',
              },
              {
                title: 'Deployed automation',
                body: 'The agreed build in client-controlled systems, tested against the defined scope.',
              },
              {
                title: 'Documentation and training',
                body: 'The information an owner needs to understand, operate, and maintain the handed-off workflow.',
              },
            ]} />
          </div>
        </section>

        <section className="section-block section-soft">
          <div className="shell">
            <div className="section-heading">
              <span className="eyebrow">Process</span>
              <h2>Four stages with an agreed boundary</h2>
            </div>
            <ProcessSteps steps={offer.process} />
          </div>
        </section>

        <section className="section-block">
          <div className="shell">
            <div className="section-heading">
              <span className="eyebrow">Fit</span>
              <h2>The best first scope is narrow enough to test</h2>
            </div>
            <FitLists fit={offer.fit} nonFit={offer.nonFit} />
          </div>
        </section>

        <section className="section-block section-soft" id="pricing">
          <div className="shell">
            <div className="section-heading">
              <span className="eyebrow">Pricing</span>
              <h2>The normal starting price is $1,500</h2>
              <p>{offer.pricingSummary}</p>
            </div>
            <PricingCards items={offer.pricing} />
          </div>
        </section>

        <section className="section-block">
          <div className="shell split-section">
            <BoundaryBox eyebrow="Ownership" title="The deployed system stays with the client">
              <p>{offer.ownership}</p>
            </BoundaryBox>
            <BoundaryBox eyebrow="After handoff" title="A bounded bug-fix period">
              <p>{offer.bugFix}</p>
            </BoundaryBox>
          </div>
        </section>

        <section className="section-block section-soft">
          <div className="shell">
            <CallToAction
              title="Name the workflow you want to hand off."
              body="A useful first message describes the trigger, current steps, people involved, systems touched, and the result you need."
              label="Discuss the sprint"
              to="/contact?topic=automation"
            />
          </div>
        </section>
      </main>
    </Layout>
  );
}
