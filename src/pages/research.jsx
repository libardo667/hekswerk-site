import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

const exhibits = [
  ['Two Weeks', 'https://www.hekswerk.com/exhibits/two-weeks.html', 'A counted view of an intensive build period.'],
  ['Fifteen Strangers', 'https://www.hekswerk.com/exhibits/topic-monoculture.html', 'A failed topic-diversity result kept in public.'],
  ['The Honesty Machinery', 'https://www.hekswerk.com/exhibits/honesty-machinery.html', 'How contrary reviews and provenance are retained.'],
  ['Why a Commons', 'https://www.hekswerk.com/exhibits/why-a-commons.html', 'The case for federation and accessible infrastructure.'],
];

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
              <li>Use the <Link to="/worldweaver/">manual</Link> to understand how the software works now.</li>
              <li>Use the dated repository record to inspect methods, runs, and findings at a specific time.</li>
              <li>Treat exhibits as selected public explanations, not a replacement for source evidence.</li>
            </ul>
            <a className="button button--primary" href="https://github.com/libardo667/worldweaver/tree/main/research">
              Open the research record on GitHub
            </a>
          </section>

          <section className="content-section">
            <h2>Selected exhibits</h2>
            <div className="exhibit-list">
              {exhibits.map(([title, href, description]) => (
                <a key={title} href={href} className="exhibit-item">
                  <strong>{title}</strong>
                  <span>{description}</span>
                </a>
              ))}
            </div>
            <a className="text-link" href="https://www.hekswerk.com/exhibits/">Browse every preserved exhibit</a>
          </section>
        </div>
      </main>
    </Layout>
  );
}
