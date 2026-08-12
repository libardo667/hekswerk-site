import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import {CallToAction, Hero, ProcessSteps} from '../components/SitePrimitives';
import {offer} from '../data/offer';

const workflowProblems = [
  {
    title: 'Intake gets copied by hand',
    body: 'Details arrive through email or forms, then get re-entered into documents, spreadsheets, or task systems.',
  },
  {
    title: 'Follow-ups live in memory',
    body: 'Reminders, status checks, and routine handoffs depend on someone remembering what should happen next.',
  },
  {
    title: 'Documents need the same assembly',
    body: 'The same information gets gathered, reformatted, and checked every time a document or report is due.',
  },
  {
    title: 'Status is scattered',
    body: 'The current state of the work has to be reconstructed from inboxes, spreadsheets, and task systems.',
  },
];

export default function Home() {
  return (
    <Layout
      title="Operations automation for professional-service teams"
      description={`${offer.primaryStatement} ${offer.shortDescription}`}
    >
      <main>
        <Hero
          eyebrow="Hekswerk · Operations automation for small professional-service teams"
          title="Turn one messy workflow into a reliable system."
          lede={`This is for recurring operational work spread across email, forms, documents, spreadsheets, and follow-ups. ${offer.delivery}`}
          actions={[
            {label: 'View the Operations Automation Sprint', to: '/work', primary: true},
            {label: 'Explore EvoGen and KAE', href: '#research'},
          ]}
          aside={(
            <div className="aura-panel" aria-label="How the sprint works">
              <img src="/img/logo_aura.svg" alt="" />
              <span>Map the current process</span>
              <span>Build and test one workflow</span>
              <span>Document and hand it back</span>
            </div>
          )}
        />

        <section className="section-block">
          <div className="shell">
            <div className="section-heading">
              <span className="eyebrow">Recognize the workflow?</span>
              <h2>The work is repeatable. The process around it is not.</h2>
              <p>{offer.audience}</p>
            </div>
            <div className="problem-grid">
              {workflowProblems.map((problem) => (
                <article className="proof-card" key={problem.title}>
                  <h3>{problem.title}</h3>
                  <p>{problem.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-block section-soft">
          <div className="shell">
            <div className="section-heading">
              <span className="eyebrow">The Operations Automation Sprint</span>
              <h2>One bounded build, from map to handoff</h2>
              <p>{offer.delivery}</p>
              <Link className="text-link" to="/work">Review scope, fit, and pricing</Link>
            </div>
            <ProcessSteps steps={offer.process} />
          </div>
        </section>

        <section className="section-block">
          <div className="shell">
            <div className="section-heading">
              <span className="eyebrow">Selected work</span>
              <h2>Relevant paid work and inspectable systems</h2>
              <p>
                The offer terms describe the work I am offering. They are not a claim about completed Hekswerk
                client projects, outcome metrics, or a production automation track record.
              </p>
            </div>
            <div className="lane-grid selected-preview">
              <article className="lane-card">
                <span className="eyebrow">Paid technical work</span>
                <h2>Evaluation, code review, and operations data</h2>
                <p>
                  My paid technical work has included AI-output evaluation, Python code review, and operations
                  data work.
                </p>
              </article>
              <article className="lane-card">
                <span className="eyebrow">Internal workflow work</span>
                <h2>Python, Excel VBA, and Power BI</h2>
                <p>
                  In a healthcare data-quality role, I used Python and Excel VBA to automate part of an internal
                  workflow. In that role, I also used Power BI to analyze operational data.
                </p>
              </article>
            </div>
            <Link className="text-link section-link" to="/work/selected-work">Review selected work</Link>
          </div>
        </section>

        <section className="section-block section-research-work" id="research">
          <div className="shell">
            <div className="section-heading">
              <span className="eyebrow">Research at Hekswerk</span>
              <h2>EvoGen and Kenshi Agent Environment</h2>
              <p>
                EvoGen and Kenshi Agent Environment are the agent-system projects I am actively working on. They
                are public repositories, not products included in the Operations Automation Sprint.
              </p>
            </div>
            <div className="lane-grid agent-project-grid">
              <article className="lane-card lane-card--commercial">
                <span className="eyebrow">Outer-loop engineering</span>
                <h2>EvoGen</h2>
                <p>
                  EvoGen is an outer-loop capability engineering harness for autonomous agents. The repository is
                  a runnable alpha with one deterministic end-to-end prototype.
                </p>
                <p className="project-boundary">
                  It does not yet prove a real game integration or model-generated diagnosis.
                </p>
                <Link className="button button--primary" to="https://github.com/libardo667/evogen">
                  Explore EvoGen
                </Link>
              </article>
              <article className="lane-card">
                <span className="eyebrow">Supervised game agent</span>
                <h2>Kenshi Agent Environment</h2>
                <p>
                  Kenshi Agent Environment lets a language model play a supervised game of Kenshi. It is
                  experimental software for supervised runs with disposable saves, not a general-purpose Kenshi
                  bot.
                </p>
                <p className="project-boundary">
                  EvoGen includes a small KAE JSONL normalization adapter. KAE is not yet registered as a complete
                  EvoGen subject, and its production trajectory exporter is not complete.
                </p>
                <Link className="button button--outline" to="https://github.com/libardo667/kenshi-agent-env">
                  Explore Kenshi Agent Environment
                </Link>
              </article>
            </div>
            <Link className="text-link section-link" to="https://github.com/libardo667">
              See all public repositories
            </Link>
            <article className="research-continuation">
              <div>
                <span className="eyebrow">Also in the research lane</span>
                <h3>WorldWeaver</h3>
                <p>
                  WorldWeaver is software for persistent AI residents and the worlds they can inhabit with people.
                  It remains visible evidence of systems work, not the service being sold.
                </p>
              </div>
              <div>
                <p>
                  The engine records concrete world facts. A language model can choose what a resident tries to do,
                  but it does not decide whether the action worked.
                </p>
                <div className="link-row">
                  <Link className="button button--outline" to="/worldweaver/">Read the manual</Link>
                  <Link className="text-link" to="/research">WorldWeaver orientation</Link>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section className="section-block">
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
