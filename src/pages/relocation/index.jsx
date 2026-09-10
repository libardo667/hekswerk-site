// DRAFT. Routed by site/pages/relocation.astro as noindex, for preview and iteration.
//
// Every factual claim on this page maps to PUBLIC_CLAIMS_LEDGER.md. As of 2026-09-09:
//   Yes:  REL-02 (not the other professionals), REL-03 (no direct action), REL-04 (no
//         determinations), REL-05 (no guarantees), REL-06 (own DAFT move), AI-01, AI-02, AI-03.
//   Hold: REL-01 (the offer itself), REL-07 ("opening to a small number of households"),
//         REL-08 (control-panel figures; none used here).
// The page may not lose noindex, enter the sitemap, or be linked from navigation until the
// Hold entries read Yes and /privacy covers the consumer service.
//
// REL-03 governs every sentence: Hekswerk plans, researches, screens, explains, introduces
// with consent, routes, and coordinates. It does not act for the client. The built-site
// check applies the direct-action rules to this route.

import Link from '../../components/Link';
import Layout from '../../components/PageContent';
import {BoundaryBox, CallToAction, Hero} from '../../components/SitePrimitives';
import {relocationOffer} from '../../data/offer';

const recognizeThis = [
  {
    title: 'The record is scattered',
    body: 'Passports, IND correspondence, lease documents, bank forms, insurance paperwork, medical continuity records, and pet import paperwork are spread across email threads, PDFs, and downloads folders. No one file shows what is current.',
  },
  {
    title: 'Every professional has their own view',
    body: 'An immigration lawyer, a relocation agent, a tax adviser, a bank, an insurer, two governments. Each one knows their own piece. None of them is watching the whole sequence, and none of them is responsible for telling you what the others are waiting on.',
  },
  {
    title: 'Dates depend on other people',
    body: 'A filing has to clear before a lease can be signed. A bank account has to exist before a registration can complete. When one link moves, you find out by noticing something else has gone quiet.',
  },
  {
    title: 'Status lives in a spreadsheet and memory',
    body: "What is done, what is blocked, what you assumed and never actually confirmed. The information exists. It exists in a lawyer's inbox, an agency's portal, a spreadsheet you update when you remember to, and your own memory, and none of those agree.",
  },
];

export default function Relocation() {
  const {boundaries, deliverables} = relocationOffer;

  return (
    <Layout title="Relocation coordination" description={relocationOffer.shortDescription}>
      <Hero
        eyebrow="Relocation coordination"
        title="Moving to the Netherlands, and the plan is bigger than your spreadsheet"
        lede={relocationOffer.shortDescription}
        aside={
          <div className="offer-summary">
            <span className="eyebrow">My own move</span>
            <p>
              I am completing this exact move myself, from Oregon to the Netherlands under the Dutch-American Friendship
              Treaty. What follows is the same discipline I am using on my own household, offered to yours.
            </p>
          </div>
        }
      />

      <section className="section-block section-soft">
        <div className="shell">
          <div className="section-heading">
            <span className="eyebrow">Recognize this?</span>
            <h2>A cross-border move is several processes running at once</h2>
            <p>
              They are owned by different people, on different timelines, with no single place that shows the whole
              picture.
            </p>
          </div>
          <div className="project-example-grid">
            {recognizeThis.map((item, index) => (
              <article className="project-example-card" key={item.title}>
                <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="shell">
          <div className="section-heading">
            <span className="eyebrow">What the Relocation Control Plan is</span>
            <h2>The layer none of the other professionals sell</h2>
            <p>{relocationOffer.notThese} Your household hires those separately.</p>
            <p>
              What Hekswerk provides is a sourced, current, honest picture of the whole move, and the coordination that
              keeps it honest as things change.
            </p>
          </div>
          <ul className="plain-list">
            {deliverables.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-block section-soft">
        <div className="shell">
          <div className="section-heading">
            <span className="eyebrow">Built on a DAFT move</span>
            <h2>Depth from having run the whole stack, not a boundary on who it is for</h2>
            <p>
              My own relocation is under the Dutch-American Friendship Treaty: business registration, KVK, Dutch
              banking, tax residency questions across two countries, housing without a Dutch income history, and health
              insurance and pet logistics on top of the immigration process itself. By the time this is a paid service,
              I will have run that entire stack personally, with the documentation to show for it.
            </p>
            <p>
              That is where the depth comes from, and Americans relocating under DAFT are who I understand best. The
              coordination approach is not specific to DAFT, or to the Netherlands. If your move has a different shape,
              say so in an inquiry and I will tell you honestly whether it is a fit.
            </p>
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="shell">
          <div className="section-heading">
            <span className="eyebrow">What Hekswerk does not do</span>
            <h2>Stated here, not in a footer</h2>
            <p>These limits define the service as much as what it delivers.</p>
          </div>
          <ul className="plain-list">
            {boundaries.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>
            What Hekswerk does do: research, screen, explain, introduce with your consent, route, and coordinate, so the
            professionals you hire get clean questions and you are never the one holding the whole picture alone.
          </p>
        </div>
      </section>

      <section className="section-block section-soft">
        <div className="shell">
          <BoundaryBox eyebrow="How AI is used" title="AI assists. I am accountable.">
            <p>
              AI assists with parts of the delivery, such as drafting, organizing, and checking the plan, under my
              direction and review. I am accountable for whether the result is correct, not the model.
            </p>
            <p>
              The system I run your plan in sends nothing anywhere by default. Its shipping configuration has outbound
              network access switched off and no model connected at all. Anything that leaves the machine leaves because
              someone deliberately turned it on for a stated reason.
            </p>
            <p>
              Identifiable client data is not sent to third-party AI. The model can run locally, on the same machine as
              your material, which does not reduce the risk of sending your records to an outside provider so much as
              remove the question. Where a third-party model is used at all, it is on pseudonymized material only. This
              is a condition of the service, not a preference, and it is confirmed with you before any real case is
              opened.
            </p>
          </BoundaryBox>
        </div>
      </section>

      <CallToAction
        eyebrow="Where this stands"
        title="Opening to a small number of households"
        body="Pricing is not published yet. If you want to be on the short list, or just want an honest read on whether this fits your situation, start with a conversation. No documents are needed for that first conversation."
        label="Start a conversation about your move"
        to="/contact?topic=relocation&source=direct"
      />

      <section className="section-block">
        <div className="shell">
          <p>
            A service-specific privacy notice and the consumer right of withdrawal apply to this service. See{' '}
            <Link to="/privacy">the privacy page</Link> for details before any paid engagement begins.
          </p>
        </div>
      </section>
    </Layout>
  );
}
