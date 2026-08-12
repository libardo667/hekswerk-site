import Link from '../components/Link';
import Layout from '../components/PageContent';
import {BoundaryBox, Hero, ProofCards} from '../components/SitePrimitives';

const evogenUrl = 'https://github.com/libardo667/evogen';
const kenshiUrl = 'https://github.com/libardo667/kenshi-agent-env';
const worldweaverDocsUrl =
  'https://github.com/libardo667/worldweaver/blob/43eae31093ac941bc3335d6ab95d3b38409942ea/docs/index.md';

export default function Research() {
  return (
    <Layout
      title="Engineering and research"
      description="Hekswerk's independent engineering and open research, including EvoGen, Kenshi Agent Environment, and WorldWeaver."
    >
      <main>
        <Hero
          compact
          eyebrow="Independent engineering and open research"
          title="Public systems work, with its limits attached."
          lede="EvoGen and Kenshi Agent Environment are the agent-system projects I am actively working on. WorldWeaver remains part of Hekswerk's open research lane. These are public repositories, not products included in the Operations Automation Sprint."
          actions={[
            {label: 'Review selected work', to: '/work/selected-work', primary: true},
            {label: 'Browse my GitHub profile', to: 'https://github.com/libardo667'},
          ]}
        />

        <section className="section-block" id="active-engineering">
          <div className="shell">
            <div className="section-heading">
              <span className="eyebrow">Active agent-system work</span>
              <h2>EvoGen and Kenshi Agent Environment</h2>
              <p>
                Read each repository alongside its validation path and current boundary. The descriptions below stay
                deliberately narrower than the implementation detail in the source.
              </p>
            </div>
            <div className="research-project-grid">
              <article className="research-project-card research-project-card--featured">
                <span className="eyebrow">EvoGen</span>
                <h3>Capability engineering around autonomous agents</h3>
                <p>EvoGen is an outer-loop capability engineering harness for autonomous agents.</p>
                <dl>
                  <div>
                    <dt>Current maturity</dt>
                    <dd>The repository is a runnable alpha with one deterministic end-to-end prototype.</dd>
                  </div>
                  <div>
                    <dt>Current boundary</dt>
                    <dd>It does not yet prove a real game integration or model-generated diagnosis.</dd>
                  </div>
                </dl>
                <Link className="button button--outline" to={evogenUrl}>
                  Inspect EvoGen
                </Link>
              </article>
              <article className="research-project-card">
                <span className="eyebrow">Kenshi Agent Environment</span>
                <h3>A supervised agent inside a concrete game</h3>
                <p>Kenshi Agent Environment lets a language model play a supervised game of Kenshi.</p>
                <dl>
                  <div>
                    <dt>Inspectable boundary</dt>
                    <dd>
                      The public architecture keeps model choice, action validity, game execution, and later evidence
                      separate.
                    </dd>
                  </div>
                  <div>
                    <dt>Current boundary</dt>
                    <dd>
                      It is experimental software for supervised runs with disposable saves, not a general-purpose
                      Kenshi bot.
                    </dd>
                  </div>
                </dl>
                <Link className="button button--outline" to={kenshiUrl}>
                  Inspect Kenshi Agent Environment
                </Link>
              </article>
            </div>
            <BoundaryBox eyebrow="Integration boundary" title="Related work, not a completed integration">
              <p>
                EvoGen includes a small KAE JSONL normalization adapter. KAE is not yet registered as a complete EvoGen
                subject, and its production trajectory exporter is not complete.
              </p>
            </BoundaryBox>
          </div>
        </section>

        <section className="section-block section-soft" id="evidence">
          <div className="shell">
            <div className="section-heading">
              <span className="eyebrow">How to read the work</span>
              <h2>Source, verification, and limits belong together</h2>
              <p>
                A public repository can show architecture and implementation. A verification path can show what a
                particular check exercises. Neither should be stretched into a broader maturity or outcome claim.
              </p>
            </div>
            <ProofCards
              items={[
                {
                  eyebrow: 'EvoGen verification',
                  title: 'A deterministic proof path',
                  body: 'One verification command runs Ruff, strict mypy, schema checks, the full test suite, a deterministic end-to-end proof in a disposable workspace, and a whitespace-error check.',
                  link: {label: 'Read the EvoGen source', to: evogenUrl},
                },
                {
                  eyebrow: 'Kenshi evidence',
                  title: 'Decision and result stay separate',
                  body: "Before dispatch, the runtime checks the model's choice against fresh state. The native mod reports whether Kenshi accepted the action and what happened afterward. The runtime records the observation, decision, command, and result.",
                  link: {label: 'Read the KAE source', to: kenshiUrl},
                },
                {
                  eyebrow: 'Selected work',
                  title: 'Claims stay next to their provenance',
                  body: 'The selected-work record states what is shown, what was verified, and what is not claimed for each public example.',
                  link: {label: 'Review selected work', to: '/work/selected-work'},
                },
              ]}
            />
          </div>
        </section>

        <section className="section-block" id="worldweaver">
          <div className="shell">
            <div className="section-heading">
              <span className="eyebrow">Established open research</span>
              <h2>WorldWeaver remains visible and inspectable</h2>
              <p>
                WorldWeaver is software for persistent AI residents and the worlds they can inhabit with people. It is
                part of Hekswerk's open research lane, not the service being sold.
              </p>
            </div>
            <ProofCards
              items={[
                {
                  title: 'Continuity',
                  body: 'A resident keeps one continuous identity, private history, and working space while moving between a private hearth and local shared cities.',
                },
                {
                  title: 'Concrete consequences',
                  body: 'The engine records concrete world facts. A language model can choose what a resident tries to do, but it does not decide whether the action worked.',
                },
                {
                  title: 'Documentation and source',
                  body: "WorldWeaver's documentation and AGPL-3.0-or-later source are public and inspectable.",
                  link: {label: 'Read the WorldWeaver documentation', to: worldweaverDocsUrl},
                },
              ]}
            />
            <BoundaryBox title="Current limits">
              <p>
                Travel between independently operated computers is a goal, not a completed claim. WorldWeaver is open
                research, not a hosted product or an Operations Automation Sprint deliverable.
              </p>
            </BoundaryBox>
          </div>
        </section>
      </main>
    </Layout>
  );
}
