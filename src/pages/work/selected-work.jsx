import Layout from '@theme/Layout';
import {BoundaryBox, CallToAction, Hero, ProofCards} from '../../components/SitePrimitives';

export default function SelectedWork() {
  return (
    <Layout title="Selected work" description="Professional background and independent technical evidence relevant to Hekswerk.">
      <main>
        <Hero
          compact
          eyebrow="Selected work"
          title="Evidence, separated by what it supports."
          lede="This page combines relevant paid background with inspectable independent projects. It does not present either category as a Hekswerk client case study."
        />

        <section className="section-block">
          <div className="shell">
            <div className="section-heading">
              <span className="eyebrow">Professional background</span>
              <h2>Paid technical work</h2>
              <p>I have done paid technical evaluation work for AI systems.</p>
            </div>
            <ProofCards items={[
              {
                title: 'AI-output evaluation',
                body: 'I have done paid AI-evaluation work since April 2024. That work has included reviewing model responses for correctness and following detailed evaluation guidelines.',
              },
              {
                title: 'Python code review',
                body: 'It has also included debugging and revising AI-generated Python.',
              },
              {
                title: 'Operations data work',
                body: 'In a healthcare data-quality role, I used Python and Excel VBA to automate part of an internal workflow. In that role, I also used Power BI to analyze operational data.',
              },
            ]} />
          </div>
        </section>

        <section className="section-block section-soft">
          <div className="shell">
            <div className="section-heading">
              <span className="eyebrow">Independent technical work</span>
              <h2>Public systems you can inspect</h2>
            </div>
            <ProofCards items={[
              {
                eyebrow: 'Open research',
                title: 'WorldWeaver',
                body: 'WorldWeaver uses a Python and FastAPI world engine with React and TypeScript browser clients. Its source code is available under the AGPL-3.0-or-later license.',
                link: {label: 'Read the documentation', to: '/worldweaver/'},
              },
              {
                eyebrow: 'Experimental software',
                title: 'Kenshi Agent Environment',
                body: "Kenshi Agent Environment lets a language model play a supervised game of Kenshi. It is experimental software for supervised runs with disposable saves, not a general-purpose Kenshi bot.",
                link: {label: 'Inspect the repository', to: 'https://github.com/libardo667/kenshi-agent-env'},
              },
            ]} />
          </div>
        </section>

        <section className="section-block">
          <div className="shell split-section">
            <BoundaryBox title="What professional background supports">
              <p>
                It supports a concise account of evaluation, code review, automation, and operational data work.
                It does not establish Hekswerk client outcomes or permission to disclose employers, platforms, or
                confidential workflows.
              </p>
            </BoundaryBox>
            <BoundaryBox title="What public projects support">
              <p>
                They make architecture, documentation, source, and stated experimental boundaries inspectable.
                WorldWeaver remains open research. Kenshi Agent Environment is an unofficial open-source project
                licensed under GPL-3.0-or-later. It does not include Kenshi game assets or game binaries.
              </p>
            </BoundaryBox>
          </div>
        </section>

        <section className="section-block section-soft">
          <div className="shell">
            <CallToAction
              title="The commercial offer is still one bounded workflow."
              body="Selected work provides context for how I approach systems. The sprint page defines what I am offering now."
              label="Review the sprint"
              to="/work"
            />
          </div>
        </section>
      </main>
    </Layout>
  );
}
