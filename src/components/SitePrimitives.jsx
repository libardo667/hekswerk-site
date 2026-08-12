import Link from './Link';

export function Hero({eyebrow, title, lede, actions = [], aside, compact = false}) {
  return (
    <section className={`page-hero${compact ? ' page-hero--compact' : ''}`}>
      <div className={`shell page-hero__grid${aside ? '' : ' page-hero__grid--single'}`}>
        <div>
          <span className="eyebrow">{eyebrow}</span>
          <h1>{title}</h1>
          <p className="hero-lede">{lede}</p>
          {actions.length > 0 && (
            <div className="hero-actions">
              {actions.map((action) =>
                action.href ? (
                  <a
                    key={action.label}
                    className={`button ${action.primary ? 'button--primary' : 'button--outline'} button--lg`}
                    href={action.href}
                  >
                    {action.label}
                  </a>
                ) : (
                  <Link
                    key={action.label}
                    className={`button ${action.primary ? 'button--primary' : 'button--outline'} button--lg`}
                    to={action.to}
                  >
                    {action.label}
                  </Link>
                ),
              )}
            </div>
          )}
        </div>
        {aside}
      </div>
    </section>
  );
}

export function ProofCards({items}) {
  return (
    <div className="proof-grid">
      {items.map((item) => (
        <article className="proof-card" key={item.title}>
          {item.eyebrow && <span className="eyebrow">{item.eyebrow}</span>}
          <h3>{item.title}</h3>
          <p>{item.body}</p>
          {item.link && (
            <Link className="text-link" to={item.link.to}>
              {item.link.label}
            </Link>
          )}
        </article>
      ))}
    </div>
  );
}

export function ProcessSteps({steps}) {
  return (
    <ol className="process-grid">
      {steps.map((step, index) => (
        <li className="process-step" key={step.title}>
          <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
          <h3>{step.title}</h3>
          <p>{step.body}</p>
        </li>
      ))}
    </ol>
  );
}

export function FitLists({fit, nonFit}) {
  return (
    <div className="fit-grid">
      <section className="fit-panel">
        <span className="eyebrow">Good fit</span>
        <h3>A bounded operational problem</h3>
        <ul>
          {fit.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
      <section className="fit-panel fit-panel--not">
        <span className="eyebrow">Not a fit</span>
        <h3>Open-ended or unsupported work</h3>
        <ul>
          {nonFit.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export function PricingCards({items}) {
  return (
    <div className="pricing-grid">
      {items.map((item) => (
        <article className={`pricing-card${item.featured ? ' pricing-card--featured' : ''}`} key={item.name}>
          <span className="eyebrow">{item.name}</span>
          <strong>{item.price}</strong>
          <p>{item.body}</p>
          {item.requirements && (
            <ul className="pricing-requirements">
              {item.requirements.map((requirement) => (
                <li key={requirement}>{requirement}</li>
              ))}
            </ul>
          )}
        </article>
      ))}
    </div>
  );
}

export function CallToAction({eyebrow = 'Start with the workflow', title, body, label, to}) {
  return (
    <section className="site-cta">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
        <p>{body}</p>
      </div>
      <Link className="button button--primary button--lg" to={to}>
        {label}
      </Link>
    </section>
  );
}

export function BoundaryBox({eyebrow = 'Boundary', title, children}) {
  return (
    <aside className="boundary-box">
      <span className="eyebrow">{eyebrow}</span>
      <h3>{title}</h3>
      <div>{children}</div>
    </aside>
  );
}
