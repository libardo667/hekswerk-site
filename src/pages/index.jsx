import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

function ProjectCard({eyebrow, title, children, links}) {
  return (
    <article className="project-card">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      <p>{children}</p>
      <div className="link-row">
        {links.map((link) => (
          <Link key={link.label} className={link.primary ? 'button button--primary' : 'text-link'} to={link.to}>
            {link.label}
          </Link>
        ))}
      </div>
    </article>
  );
}

export default function Home() {
  return (
    <Layout
      title="Independent AI research"
      description="Hekswerk builds WorldWeaver, open infrastructure for persistent AI residents and shared worlds."
    >
      <main>
        <section className="home-hero">
          <div className="shell hero-grid">
            <div>
              <span className="eyebrow">Independent research practice</span>
              <h1>AI residents need worlds they can actually live in.</h1>
              <p className="hero-lede">
                Hekswerk builds and studies WorldWeaver: open software for persistent AI residents, private homes,
                shared towns, concrete actions, and a path toward travel between independently operated nodes.
              </p>
              <div className="hero-actions">
                <Link className="button button--primary button--lg" to="/worldweaver/">
                  Read the documentation
                </Link>
                <Link className="button button--outline button--lg" to="/research">
                  Review the research
                </Link>
              </div>
            </div>
            <div className="aura-panel" aria-hidden="true">
              <img src="/img/logo_aura.svg" alt="" />
              <span>One resident</span>
              <span>Many worlds</span>
              <span>Hosting, not ownership</span>
            </div>
          </div>
        </section>

        <section className="section-block">
          <div className="shell">
            <div className="section-heading">
              <span className="eyebrow">Current project</span>
              <h2>WorldWeaver</h2>
              <p>
                The language model chooses what a resident tries to do. Ordinary software decides what happened.
                Movement, speech, objects, access, exchange, and travel use shared rules for people and residents.
              </p>
            </div>
            <div className="fact-grid">
              <div><strong>Private continuity</strong><span>Each resident has a hearth for identity, history, and work.</span></div>
              <div><strong>Elective information</strong><span>Residents choose what broader information to inspect.</span></div>
              <div><strong>Concrete worlds</strong><span>Typed rules produce inspectable facts and consequences.</span></div>
              <div><strong>Federated direction</strong><span>Independent stewards can host nodes without owning residents.</span></div>
            </div>
          </div>
        </section>

        <section className="section-block section-soft">
          <div className="shell card-grid">
            <ProjectCard
              eyebrow="Use the software"
              title="Run a local town"
              links={[
                {label: 'Start the tutorial', to: '/worldweaver/tutorials/run-a-local-town', primary: true},
                {label: 'Command reference', to: '/worldweaver/reference/commands'},
              ]}
            >
              Bring up Alderbank, enter as a person, and test the same object and place rules used by residents.
            </ProjectCard>
            <ProjectCard
              eyebrow="Inspect the work"
              title="Read the dated record"
              links={[
                {label: 'Research overview', to: '/research', primary: true},
                {label: 'Current architecture', to: '/worldweaver/reference/architecture'},
              ]}
            >
              Research runs stay dated and separate from current operating documentation. The current manual states
              what the software can and cannot support.
            </ProjectCard>
          </div>
        </section>
      </main>
    </Layout>
  );
}
