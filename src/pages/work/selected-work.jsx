import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import {CallToAction, Hero} from '../../components/SitePrimitives';

function CaseStudy({className = '', evidenceClass, title, summary, fields, sources, featured = false}) {
  return (
    <article className={`case-study${featured ? ' case-study--featured' : ''}${className ? ` ${className}` : ''}`}>
      <header className="case-study__header">
        <div>
          <span className="eyebrow">{evidenceClass}</span>
          <h2>{title}</h2>
        </div>
        <p>{summary}</p>
      </header>
      <dl className="case-study__fields">
        {fields.map(({label, body}) => (
          <div className="case-study__field" key={label}>
            <dt>{label}</dt>
            <dd>{body}</dd>
          </div>
        ))}
      </dl>
      <footer className="case-study__sources">
        <span>Relevant source</span>
        <div>
          {sources.map((source) => (
            <Link className="text-link" key={source.label} to={source.to}>{source.label}</Link>
          ))}
        </div>
      </footer>
    </article>
  );
}

export default function SelectedWork() {
  return (
    <Layout
      title="Selected work"
      description="Professional work, independent engineering, and open research with explicit provenance and limits."
    >
      <main>
        <Hero
          compact
          eyebrow="Selected work"
          title="Technical depth, with provenance attached."
          lede="These cases are separated by what they can prove. Paid employer work shows delivery under external constraints. Public repositories make independent engineering and open research inspectable. None is presented as a Hekswerk client deployment."
        />

        <section className="section-block evidence-key-section">
          <div className="shell">
            <div className="evidence-key" aria-label="Evidence classes">
              <div>
                <span>01</span>
                <h2>Professional work</h2>
                <p>Paid work inside an employer setting, described without confidential operational detail.</p>
              </div>
              <div>
                <span>02</span>
                <h2>Independent engineering</h2>
                <p>Public systems I primarily authored outside a commercial deployment.</p>
              </div>
              <div>
                <span>03</span>
                <h2>Open research</h2>
                <p>Inspectable systems research with documented goals, current boundaries, and source.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section-block selected-work-section selected-work-section--professional">
          <div className="shell">
            <div className="section-heading case-section-heading">
              <span className="eyebrow">Professional work</span>
              <h2>Delivery under external constraints</h2>
              <p>The strongest commercial evidence here is employer work, not a Hekswerk client case study.</p>
            </div>
            <CaseStudy
              featured
              evidenceClass="Professional work · Paid employer work"
              title="Proof-of-delivery automation and operational reporting"
              summary="An employer-neutral account backed by reviewed source, plus a clean public reconstruction you can run."
              fields={[
                {
                  label: 'Situation',
                  body: <>In a healthcare data-quality role, I used Python and Excel VBA to automate part of an internal workflow. In that role, I also used Power BI to analyze operational data.</>,
                },
                {
                  label: 'Constraints',
                  body: <>The underlying source is not linked because it includes employer-specific workflow details and is not confidentiality-safe.</>,
                },
                {
                  label: "Levi's role",
                  body: <>I designed and wrote a Python workflow that gathered reports from separate systems, normalized them into tabular records, reconciled records by shared identifiers, and produced an operational report.</>,
                },
                {
                  label: 'Technical approach',
                  body: <>The public sample loads two CSV exports, validates their schemas, normalizes identifiers, selects the latest matching event, reconciles quantities, and writes explicit review reasons.</>,
                },
                {
                  label: 'How tested and validated',
                  body: <>The public sample is a clean reconstruction with synthetic data. Its tests validate the sample, not the employer system or historical outcome.</>,
                },
                {
                  label: 'Result',
                  body: <>The working portion completed report gathering, normalization, reconciliation, and report generation.</>,
                },
                {
                  label: 'What remains limited or unproven',
                  body: <>A later write-back step was not completed. No time saving, record count, business outcome, or production benchmark is claimed.</>,
                },
              ]}
              sources={[
                {
                  label: 'Inspect the sanitized sample',
                  to: 'https://github.com/libardo667/delivery-reconciliation-sample',
                },
                {
                  label: 'Review its claim boundary',
                  to: 'https://github.com/libardo667/hekswerk-site/blob/main/docs/PUBLIC_CLAIMS_LEDGER.md#providence-automation-and-data-analysis',
                },
              ]}
            />
          </div>
        </section>

        <section className="section-block section-soft selected-work-section">
          <div className="shell">
            <div className="section-heading case-section-heading">
              <span className="eyebrow">Independent engineering</span>
              <h2>Agent systems with inspectable boundaries</h2>
              <p>EvoGen and Kenshi Agent Environment are public repositories, not commercial deployments or sprint products.</p>
            </div>

            <div className="case-study-stack">
              <CaseStudy
                evidenceClass="Independent engineering · Runnable alpha"
                title="EvoGen"
                summary="Outer-loop capability engineering for autonomous agents."
                fields={[
                  {label: 'Situation', body: <>EvoGen is an outer-loop capability engineering harness for autonomous agents.</>},
                  {label: 'Constraints', body: <>Candidate changes are evaluated outside the runtime plane and promoted only through lineage gates.</>},
                  {label: "Levi's role", body: <>I am the primary author of the EvoGen repository at the pinned commit.</>},
                  {label: 'Technical approach', body: <>The repository uses strict Pydantic contracts, append-only JSONL trajectories, a content-addressed artifact store, and a SQLite ledger.</>},
                  {label: 'How tested and validated', body: <>One verification command runs Ruff, strict mypy, schema checks, the full test suite, a deterministic end-to-end proof in a disposable workspace, and a whitespace-error check.</>},
                  {label: 'Result', body: <>The repository is a runnable alpha with one deterministic end-to-end prototype.</>},
                  {label: 'What remains limited or unproven', body: <>It does not yet prove a real game integration or model-generated diagnosis. EvoGen includes a small KAE JSONL normalization adapter. KAE is not yet registered as a complete EvoGen subject, and its production trajectory exporter is not complete.</>},
                ]}
                sources={[
                  {label: 'Inspect EvoGen', to: 'https://github.com/libardo667/evogen'},
                  {label: 'Read the pinned README', to: 'https://github.com/libardo667/evogen/blob/c37147b3120c38c9a979ca8671fcc11c5ab62c6c/README.md'},
                ]}
              />

              <CaseStudy
                evidenceClass="Independent engineering · Experimental system"
                title="Kenshi Agent Environment"
                summary="Supervised game control with explicit evidence boundaries."
                fields={[
                  {label: 'Situation', body: <>Kenshi Agent Environment lets a language model play a supervised game of Kenshi.</>},
                  {label: 'Constraints', body: <>It is experimental software for supervised runs with disposable saves, not a general-purpose Kenshi bot.</>},
                  {label: "Levi's role", body: <>I am the primary author of the Kenshi Agent Environment repository at the pinned commit.</>},
                  {label: 'Technical approach', body: <>A native mod reads game state and performs gameplay actions. A Python runtime captures screenshots, builds the actions that are valid at that moment, checks the model's choice against fresh state, and records what happened.</>},
                  {label: 'How tested and validated', body: <>Before dispatch, the runtime checks the model's choice against fresh state. The native mod reports whether Kenshi accepted the action and what happened afterward. The runtime records the observation, decision, command, and result. Mock and replay runs use the same planner and operation path.</>},
                  {label: 'Result', body: <>The public architecture keeps model choice, action validity, game execution, and later evidence separate.</>},
                  {label: 'What remains limited or unproven', body: <>No claim is made here about current action coverage, live-run results, full autonomy, production readiness, or general game-playing capability.</>},
                ]}
                sources={[
                  {label: 'Inspect Kenshi Agent Environment', to: 'https://github.com/libardo667/kenshi-agent-env'},
                  {label: 'Read the pinned README', to: 'https://github.com/libardo667/kenshi-agent-env/blob/bfaa4d55ae10a34d33e7a06ee3959fc6659eceb4/README.md'},
                ]}
              />
            </div>
          </div>
        </section>

        <section className="section-block selected-work-section selected-work-section--research">
          <div className="shell">
            <div className="section-heading case-section-heading">
              <span className="eyebrow">Open research</span>
              <h2>Persistent worlds, bounded claims</h2>
              <p>WorldWeaver remains visible systems research. It is not the commercial front door.</p>
            </div>
            <CaseStudy
              evidenceClass="Open research · Public manual and source"
              title="WorldWeaver"
              summary="Backend, persistence, event, and distributed-system design for continuous AI residents."
              fields={[
                {label: 'Situation', body: <>WorldWeaver is software for persistent AI residents and the worlds they can inhabit with people.</>},
                {label: 'Constraints', body: <>The engine records concrete world facts. A language model can choose what a resident tries to do, but it does not decide whether the action worked.</>},
                {label: "Levi's role", body: <>I am the primary author of the WorldWeaver repository at the pinned commit.</>},
                {label: 'Technical approach', body: <>WorldWeaver uses a Python and FastAPI world engine with React and TypeScript browser clients. The world engine owns concrete facts and typed consequences. Resident identity and history persist between private and shared spaces. Travel between independently operated computers remains a goal.</>},
                {label: 'How tested and validated', body: <>The repository provides root-level test and check commands. The manual is current operating documentation, while dated research records what was tested at the time.</>},
                {label: 'Result', body: <>A resident keeps one continuous identity, private history, and working space while moving between a private hearth and local shared cities.</>},
                {label: 'What remains limited or unproven', body: <>Travel between independently operated computers is a goal, not a completed claim. WorldWeaver is open research, not a hosted product or an Operations Automation Sprint deliverable.</>},
              ]}
              sources={[
                {label: 'Read the WorldWeaver manual', to: '/worldweaver/'},
                {label: 'Inspect WorldWeaver', to: 'https://github.com/libardo667/worldweaver'},
              ]}
            />
          </div>
        </section>

        <section className="section-block section-soft">
          <div className="shell">
            <CallToAction
              eyebrow="Commercial front door"
              title="Bring one workflow, not a portfolio brief."
              body="These cases show how I handle systems and evidence. The Operations Automation Sprint defines what I am offering now."
              label="Review the sprint"
              to="/work"
            />
          </div>
        </section>
      </main>
    </Layout>
  );
}
