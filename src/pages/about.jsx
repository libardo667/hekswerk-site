import Link from '../components/Link';
import Layout from '../components/PageContent';
import {BoundaryBox, CallToAction, Hero, ProcessSteps} from '../components/SitePrimitives';
import StructuredData from '../components/StructuredData';
import {projectLanguageSnapshot} from '../data/projectLanguageSnapshot';

export default function About() {
  return (
    <Layout
      title="About"
      description="About Levi Banks, the working method behind Hekswerk, and the practice's contract and public systems work."
    >
      <StructuredData
        data={{
          '@context': 'https://schema.org',
          '@type': 'Person',
          '@id': 'https://www.hekswerk.com/about#levi-banks',
          name: 'Levi Banks',
          url: 'https://www.hekswerk.com/about',
          jobTitle: 'Founder',
          worksFor: {
            '@id': 'https://www.hekswerk.com/#organization',
          },
        }}
      />
      <main>
        <Hero
          compact
          eyebrow="About Levi Banks"
          title="Careful systems work, with a clear handoff."
          lede="Hekswerk is Levi Banks's one-person systems practice. My professional background spans operations, data analysis, automation, AI evaluation, and software systems."
          actions={[
            {label: 'Discuss a workflow', to: '/contact?topic=automation', primary: true},
            {label: 'See the sprint', to: '/work'},
          ]}
          aside={
            <aside className="about-profile">
              <span className="eyebrow">Practice profile</span>
              <h2>Levi Banks</h2>
              <p>I am currently based in Portland, Oregon, and I am relocating to The Hague in December 2026.</p>
              <dl>
                <div>
                  <dt>Practice</dt>
                  <dd>One person</dd>
                </div>
                <div>
                  <dt>Commercial offer</dt>
                  <dd>Operations Automation Sprint</dd>
                </div>
                <div>
                  <dt>Working posture</dt>
                  <dd>Bounded, documented, client-owned</dd>
                </div>
              </dl>
            </aside>
          }
        />

        <section className="section-block" id="background">
          <div className="shell">
            <div className="section-heading">
              <span className="eyebrow">Relevant background</span>
              <h2>Operations experience alongside software work</h2>
              <p>
                My paid technical work has included AI-output evaluation, Python code review, and operations data work.
                The public examples below stay within what the underlying records and repositories support.
              </p>
            </div>
            <div className="about-background-grid">
              <article className="about-background-card">
                <span>Operations and data</span>
                <h3>Work close to the process</h3>
                <p>
                  In a healthcare data-quality role, I used Python and Excel VBA to automate part of an internal
                  workflow. In that role, I also used Power BI to analyze operational data.
                </p>
              </article>
              <article className="about-background-card">
                <span>Automation</span>
                <h3>Reconcile scattered records</h3>
                <p>
                  I designed and wrote a Python workflow that gathered reports from separate systems, normalized them
                  into tabular records, reconciled records by shared identifiers, and produced an operational report.
                </p>
              </article>
              <article className="about-background-card">
                <span>AI evaluation</span>
                <h3>Review against explicit criteria</h3>
                <p>
                  I have done paid AI-evaluation work since April 2024. That work has included reviewing model responses
                  for correctness and following detailed evaluation guidelines. It has also included debugging and
                  revising AI-generated Python.
                </p>
              </article>
              <article className="about-background-card">
                <span>Software systems</span>
                <h3>Build in public where I can</h3>
                <p>The selected-work page separates inspectable public systems from commercial experience.</p>
                <Link className="text-link" to="/work/selected-work">
                  Inspect selected work
                </Link>
              </article>
            </div>
          </div>
        </section>

        <section className="section-block section-soft" id="lanes">
          <div className="shell">
            <div className="section-heading">
              <span className="eyebrow">Two lanes</span>
              <h2>Different work, held to the evidence it actually has</h2>
              <p>
                The contract lane and the independent engineering and open research lane are both real work. The
                contract lane solves a bounded operational problem for a client. The engineering and research lane
                develops and tests public systems. They require different evidence and carry different obligations.
                Neither exists merely to validate the other.
              </p>
            </div>
            <div className="lane-grid about-lane-grid">
              <article className="lane-card lane-card--commercial">
                <span className="eyebrow">Contract operations automation</span>
                <h2>A practical commercial offer</h2>
                <p>The Operations Automation Sprint is Hekswerk's primary commercial offer.</p>
                <p>
                  For one agreed workflow, I map the current process, define the build and acceptance check, build and
                  test the automation, deploy it into client-controlled systems, document it, train its owner, and
                  provide a bounded defect-correction period.
                </p>
                <Link className="text-link" to="/work">
                  Read the full offer
                </Link>
              </article>
              <article className="lane-card">
                <span className="eyebrow">Independent engineering and open research</span>
                <h2>Inspectable systems work</h2>
                <p>
                  EvoGen and Kenshi Agent Environment are the agent-system projects I am actively working on. They are
                  public repositories, not products included in the Operations Automation Sprint.
                </p>
                <p>
                  WorldWeaver is part of Hekswerk's open research lane. It is visible evidence of systems work, not the
                  service being sold.
                </p>
                <Link className="text-link" to="/work/selected-work">
                  See the evidence and its limits
                </Link>
              </article>
            </div>
          </div>
        </section>

        <section className="section-block" id="method">
          <div className="shell">
            <div className="section-heading">
              <span className="eyebrow">Working method</span>
              <h2>Start with the real process, not the tool</h2>
              <p>
                I start by understanding the real process, including its owner, dependencies, exceptions, and intended
                result. I define a bounded solution and acceptance check, build it, verify it against expected paths and
                known failures, document it, and hand it back to the client.
              </p>
            </div>
            <ProcessSteps
              steps={[
                {
                  title: 'Understand',
                  body: 'Name the trigger, intended result, owner, and the way the work actually moves today.',
                },
                {
                  title: 'Bound',
                  body: 'Identify dependencies, systems, handoffs, exceptions, and the acceptance check before building.',
                },
                {
                  title: 'Build',
                  body: 'Implement the agreed solution inside systems the client owns or controls.',
                },
                {
                  title: 'Verify and hand back',
                  body: 'Test expected paths and known failures, write the operating artifacts, and train the owner.',
                },
              ]}
            />
          </div>
        </section>

        <section className="section-block section-soft" id="ownership">
          <div className="shell split-section about-handoff">
            <div className="section-heading">
              <span className="eyebrow">Scope and artifacts</span>
              <h2>The handoff is part of the build</h2>
              <p>
                A clear scope states what will be built, how it will be accepted, and what counts as a later change.
                Written process maps, acceptance criteria, tests, logs or an audit trail, and a runbook make the work
                inspectable and usable after handoff.
              </p>
            </div>
            <BoundaryBox eyebrow="Client ownership" title="The system should remain yours">
              <p>
                The client keeps control of its accounts, credentials, data, and deployed system. Hekswerk is not a
                required hosting layer, subscription, or permanent operator.
              </p>
            </BoundaryBox>
          </div>
        </section>

        <section className="section-block" id="technologies">
          <div className="shell">
            <div className="section-heading">
              <span className="eyebrow">Current working mix</span>
              <h2>One evidence-based view of the technologies</h2>
              <p>
                My current local project checkouts are Python-heavy. TypeScript and JavaScript form the next-largest
                source-file groups, with smaller project-specific work in HTML and CSS, GDScript, shell and PowerShell,
                C and C++, Rust, and SQL.
              </p>
            </div>
            <section className="language-snapshot" aria-labelledby="language-snapshot-title">
              <div className="language-snapshot__header">
                <div>
                  <span className="eyebrow">Tracked source snapshot</span>
                  <h3 id="language-snapshot-title">Repository footprint by file ending</h3>
                  <p>
                    Measured {projectLanguageSnapshot.measuredOn}. This shows the shape of the current checkouts, not
                    expertise, effort, client use, or production experience.
                  </p>
                </div>
                <div className="language-snapshot__total">
                  <strong>{projectLanguageSnapshot.sourceFiles.toLocaleString('en-US')}</strong>
                  <span>source files across {projectLanguageSnapshot.projectCheckouts} project checkouts</span>
                </div>
              </div>
              <ol className="language-bars">
                {projectLanguageSnapshot.groups.map((group) => {
                  const percentage = (group.files / projectLanguageSnapshot.sourceFiles) * 100;
                  return (
                    <li
                      key={group.label}
                      aria-label={`${group.label}: ${group.files} tracked source files, ${percentage.toFixed(1)} percent`}
                    >
                      <div className="language-bar__label">
                        <span>{group.label}</span>
                        <b>{percentage.toFixed(1)}%</b>
                      </div>
                      <div className="language-bar__track" aria-hidden="true">
                        <span style={{'--language-share': `${percentage}%`}} />
                      </div>
                    </li>
                  );
                })}
              </ol>
              <p className="language-snapshot__method">
                Generated from Git-tracked filenames in locally owned or local-only repositories. Dependency, generated,
                cache, build, and third-party upstream paths are excluded. The inventory reads filenames only and copies
                no private source content.
              </p>
            </section>
            <div className="capability-grid">
              <article className="capability-card">
                <h3>Workflow automation</h3>
                <p>I use n8n for self-hosted workflow automation. I use Python and JavaScript in my technical work.</p>
              </article>
              <article className="capability-card">
                <h3>Web and application systems</h3>
                <p>
                  My public systems work includes FastAPI, React, TypeScript, Python runtimes, and native integrations.
                </p>
              </article>
              <article className="capability-card">
                <h3>Operational data</h3>
                <p>
                  I use Excel and Google Sheets for operational data work. In a healthcare data-quality role, I used
                  Python, Excel VBA, and Power BI.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="section-block section-block--closing">
          <div className="shell">
            <CallToAction
              title="Bring me one operational problem."
              body="The most useful first note describes the workflow, where it gets stuck, and the person who should own it after handoff."
              label="Discuss a workflow"
              to="/contact?topic=automation"
            />
          </div>
        </section>
      </main>
    </Layout>
  );
}
