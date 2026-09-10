// DRAFT, NOT ROUTED, NOT PUBLISHED.
//
// There is deliberately no `site/pages/relocation/brief.astro`, so Astro never builds this.
// Astro routes only from srcDir (`./site`); a component here is unreachable. Shipping it is
// a twelve-line shell, which is the point: the line can go live at short notice.
//
// BEFORE SHIPPING, all of these must be true:
//   1. PUBLIC_CLAIMS_LEDGER.md REL-01, REL-07 and REL-08 move from Hold to Yes.
//   2. /relocation exists. A referral brief for a page that does not exist is worse than none.
//   3. /privacy covers the consumer service: controller status, lawful basis, retention,
//      deletion route, and the EU/NL 14-day withdrawal right, settled with a Dutch adviser.
//   4. `relocationOffer.published` flips to true and prices are actually offered.
//   5. Add the route to `routes` in scripts/check-built-site.mjs with its title and
//      description, and register '/relocation/brief' in forbiddenByRoute so the
//      direct-action rules apply to it.
//
// REL-03 is the boundary that governs every sentence here: Hekswerk plans, researches,
// screens, explains, introduces with consent, routes, and coordinates. It does not act for
// the client. No copy may imply arranging, registering, filing, submitting, or opening
// anything. A proposed "DAFT Programme" breached exactly this on 2026-09-09.

import Link from '../../components/Link';
import Layout from '../../components/PageContent';
import {relocationOffer} from '../../data/offer';

export default function RelocationBrief() {
  const {pricing, boundaries, deliverables} = relocationOffer;

  return (
    <Layout title="Relocation brief" description="A one-page brief for Hekswerk relocation coordination.">
      <main className="brief-main">
        <article className="referral-brief" aria-labelledby="relocation-brief-title">
          <header className="brief-header">
            <div className="brief-brandline">
              <Link className="brief-brand" to="/">
                Hekswerk
              </Link>
              <span className="brief-type">Relocation coordination</span>
            </div>
            <div className="brief-intro">
              <div>
                <span className="brief-kicker">One plan. Every open question owned.</span>
                <h1 id="relocation-brief-title">Keep the move honest.</h1>
                <p className="brief-offer">{relocationOffer.shortDescription}</p>
              </div>
              <aside className="brief-price" aria-label="Starting price">
                <strong>{pricing.controlPlan.price}</strong>
                <span>{pricing.controlPlan.name}</span>
              </aside>
            </div>
          </header>

          <section className="brief-section" aria-labelledby="relocation-brief-what-title">
            <div className="brief-section-heading">
              <h2 id="relocation-brief-what-title">What you get</h2>
            </div>
            <ul className="brief-list">
              {deliverables.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="brief-section" aria-labelledby="relocation-brief-limits-title">
            <div className="brief-section-heading">
              <h2 id="relocation-brief-limits-title">What this is not</h2>
            </div>
            <p className="brief-offer">{relocationOffer.notThese}</p>
            <ul className="brief-list">
              {boundaries.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <footer className="brief-footer">
            <p>
              {pricing.controlPlan.name} is {pricing.controlPlan.price}. {pricing.coordination.name} is{' '}
              {pricing.coordination.price} afterwards, if it is useful. {pricing.controlPlan.note}
            </p>
            <Link to="/contact?topic=relocation&amp;source=direct">www.hekswerk.com/contact</Link>
          </footer>
        </article>
      </main>
    </Layout>
  );
}
