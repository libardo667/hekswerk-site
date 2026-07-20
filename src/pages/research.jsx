import Layout from '@theme/Layout';

export default function Research() {
  return (
    <Layout title="Research" description="The public research record behind WorldWeaver.">
      <main className="plain-page">
        <div className="shell narrow-shell">
          <span className="eyebrow">Research</span>
          <h1>A dated record, separate from the manual.</h1>
          <p className="page-lede">
            WorldWeaver is both software and a research apparatus. Current instructions live in the technical
            manual. Research records what was tested, when it was tested, and what the result did or did not support.
          </p>

          <section className="content-section">
            <h2>How to read it</h2>
            <ul className="plain-list">
              <li>Use the <a href="/worldweaver">manual</a> to understand how the software works now.</li>
              <li>Use the dated repository record to inspect methods, runs, and findings at a specific time.</li>
              <li>Do not treat an old run or interpretation as a description of the current architecture.</li>
            </ul>
            <a className="button button--primary" href="https://github.com/libardo667/worldweaver/tree/main/research">
              Open the research record on GitHub
            </a>
          </section>

          <section className="content-section">
            <h2>Current review</h2>
            <p>
              WorldWeaver is auditing the assumptions behind its resident runtime before treating CognitiveCore as
              a working account of attention, memory, or mind. Earlier public exhibits were withdrawn because they
              presented interpretations of that machinery more confidently than the code and evidence support.
            </p>
            <a className="text-link" href="https://github.com/libardo667/worldweaver/tree/main/research/audits/cognitive-core">
              Read the CognitiveCore audit record
            </a>
          </section>
        </div>
      </main>
    </Layout>
  );
}
