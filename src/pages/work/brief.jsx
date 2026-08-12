import Layout from '@theme/Layout';
import {BoundaryBox, CallToAction, Hero, PricingCards, ProcessSteps} from '../../components/SitePrimitives';
import {offer} from '../../data/offer';

export default function WorkBrief() {
  return (
    <Layout title="Operations Automation Sprint brief" description="A compact, referral-friendly overview of Hekswerk's Operations Automation Sprint.">
      <main>
        <Hero
          compact
          eyebrow="Shareable brief"
          title="One workflow, built and handed off."
          lede={`${offer.primaryStatement} ${offer.audience}`}
          actions={[
            {label: 'Start an inquiry', to: '/contact?topic=automation', primary: true},
            {label: 'Read the full offer', to: '/work'},
          ]}
        />

        <div className="shell brief-sheet">
          <section>
            <span className="eyebrow">The offer</span>
            <h2>What is included</h2>
            <p>{offer.delivery}</p>
          </section>

          <section>
            <span className="eyebrow">The process</span>
            <ProcessSteps steps={offer.process} />
          </section>

          <section>
            <span className="eyebrow">Pricing by scope</span>
            <h2>{offer.standardPriceStatement}</h2>
            <p>{offer.pricingSummary}</p>
            <PricingCards items={offer.pricing} />
          </section>

          <div className="split-section">
            <BoundaryBox title="Client ownership"><p>{offer.ownership}</p></BoundaryBox>
            <BoundaryBox title="Bug-fix boundary"><p>{offer.bugFix}</p></BoundaryBox>
          </div>

          <CallToAction
            eyebrow="Referral note"
            title="Send the workflow, owner, and current systems."
            body="That is enough for an initial fit conversation. No polished requirements document is needed."
            label="Contact Hekswerk"
            to="/contact?topic=automation"
          />
        </div>
      </main>
    </Layout>
  );
}
