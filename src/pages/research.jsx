import Layout from '@theme/Layout';
import {BoundaryBox, Hero, ProofCards} from '../components/SitePrimitives';

export default function Research() {
  return (
    <Layout title="Research" description="Research orientation for Hekswerk and WorldWeaver.">
      <main>
        <Hero
          compact
          eyebrow="Open research"
          title="Research stays visible, and separate from the offer."
          lede="WorldWeaver is part of Hekswerk's open research lane. It is visible evidence of systems work, not the service being sold."
          actions={[
            {label: 'Read the WorldWeaver manual', to: '/worldweaver/', primary: true},
            {label: 'Open the research record', to: 'https://github.com/libardo667/worldweaver/tree/main/research'},
          ]}
        />

        <section className="section-block">
          <div className="shell">
            <div className="section-heading">
              <span className="eyebrow">WorldWeaver</span>
              <h2>Persistent residents in concrete worlds</h2>
              <p>
                WorldWeaver is software for persistent AI residents and the worlds they can inhabit with people.
              </p>
            </div>
            <ProofCards items={[
              {
                title: 'Continuity',
                body: 'A resident keeps one continuous identity, private history, and working space while moving between a private hearth and local shared cities.',
              },
              {
                title: 'Concrete consequences',
                body: 'The engine records concrete world facts. A language model can choose what a resident tries to do, but it does not decide whether the action worked.',
              },
              {
                title: 'Open source',
                body: "WorldWeaver's source code is available under the AGPL-3.0-or-later license.",
                link: {label: 'Open the source', to: 'https://github.com/libardo667/worldweaver'},
              },
            ]} />
          </div>
        </section>

        <section className="section-block section-soft">
          <div className="shell split-section">
            <div className="section-heading">
              <span className="eyebrow">How to read the work</span>
              <h2>Manual for the present, records for a dated result</h2>
              <ul className="plain-list">
                <li>Use the <a href="/worldweaver/">manual</a> to understand the documented software.</li>
                <li>Use the repository research record to inspect a dated method, run, or interpretation.</li>
                <li>Do not treat an older research record as a current capability claim.</li>
              </ul>
            </div>
            <BoundaryBox title="Current limits">
              <p>
                Travel between independently operated computers is a goal, not a completed claim. WorldWeaver is
                open research, not a hosted product or an Operations Automation Sprint deliverable.
              </p>
            </BoundaryBox>
          </div>
        </section>
      </main>
    </Layout>
  );
}
