import Layout from '@theme/Layout';
import {BoundaryBox, CallToAction, Hero, ProofCards} from '../components/SitePrimitives';
import {offer} from '../data/offer';

export default function About() {
  return (
    <Layout title="About" description="About Levi Banks and Hekswerk, a one-person systems practice.">
      <main>
        <Hero
          compact
          eyebrow="About Hekswerk"
          title="A one-person systems practice."
          lede="Hekswerk is Levi Banks's one-person systems practice. Hekswerk has two lanes: contract operations automation and open research. I founded Hekswerk in January 2026."
        />

        <section className="section-block">
          <div className="shell">
            <div className="section-heading">
              <span className="eyebrow">Relevant background</span>
              <h2>Technical work grounded in review and operations</h2>
            </div>
            <ProofCards items={[
              {
                title: 'AI evaluation',
                body: 'I have done paid AI-evaluation work since April 2024. That work has included reviewing model responses for correctness and following detailed evaluation guidelines.',
              },
              {
                title: 'Python review',
                body: 'It has also included debugging and revising AI-generated Python.',
              },
              {
                title: 'Operations data',
                body: 'In a healthcare data-quality role, I used Python and Excel VBA to automate part of an internal workflow. In that role, I also used Power BI to analyze operational data.',
              },
              {
                title: 'Working tools',
                body: 'I use Python and JavaScript in my technical work. I use n8n for self-hosted workflow automation. I use Excel and Google Sheets for operational data work.',
              },
            ]} />
          </div>
        </section>

        <section className="section-block section-soft">
          <div className="shell split-section">
            <div className="section-heading">
              <span className="eyebrow">Two lanes</span>
              <h2>Contract work and open research</h2>
              <p>
                {offer.primaryStatement} WorldWeaver is part of
                Hekswerk's open research lane. It is visible evidence of systems work, not the service being sold.
              </p>
            </div>
            <BoundaryBox title="A deliberately small practice">
              <p>
                Public pages distinguish paid background, independent technical work, current offer terms, and
                research. They do not turn those categories into invented clients, outcomes, or credentials.
              </p>
            </BoundaryBox>
          </div>
        </section>

        <section className="section-block">
          <div className="shell">
            <CallToAction
              title="Have a bounded operations problem?"
              body="The most useful first note describes the workflow and the person who needs to own it after handoff."
              label="Contact Hekswerk"
              to="/contact"
            />
          </div>
        </section>
      </main>
    </Layout>
  );
}
