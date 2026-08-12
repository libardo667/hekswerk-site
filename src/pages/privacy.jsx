import {BoundaryBox, Hero} from '../components/SitePrimitives';
import Layout from '../components/PageContent';
import {contactEmail} from '../data/site';

export default function Privacy() {
  return (
    <Layout
      title="Privacy"
      description="Plain-language privacy and data-handling information for the Hekswerk website and contact form."
    >
      <main>
        <Hero
          compact
          eyebrow="Privacy and data handling"
          title="A small site with a small intake surface."
          lede="This note explains what the Hekswerk website and contact form collect, where information goes, and what not to send."
        />

        <section className="section-block">
          <div className="shell narrow-shell privacy-copy">
            <section>
              <h2>What the form collects</h2>
              <p>
                The contact form asks for your name, email address, and topic. The remaining fields change with the
                topic you choose. An automation inquiry asks about one recurring process, the systems involved, timing,
                and whether the work may involve sensitive or regulated information. Research and general inquiries ask
                for a message. Relocation inquiries offer fields for locations, timeline, household, constraints, and
                the hardest part of the move.
              </p>
            </section>

            <section>
              <h2>Limited inquiry attribution</h2>
              <p>
                The site records the first path you visit in a browser-tab session and, when present, the campaign
                parameters <code>utm_source</code>, <code>utm_medium</code>, and <code>utm_campaign</code>. It keeps
                these values in browser session storage, not cookies, and sends them only if you submit the contact
                form. It does not retain other query parameters for attribution.
              </p>
            </section>

            <section>
              <h2>What happens when you send it</h2>
              <p>
                The form sends those details over HTTPS to a Hekswerk Cloudflare Worker. The Worker validates the
                submission and uses Resend to deliver it to my Hekswerk email so I can understand and reply to your
                inquiry. Submitting the form does not create a user account or add you to a newsletter.
              </p>
            </section>

            <section>
              <h2>Other services used by this site</h2>
              <p>
                The site is published with GitHub Pages. It loads typefaces from Google Fonts and links to public
                repositories on GitHub. Cloudflare Web Analytics measures aggregate visits, page views, referral paths,
                approximate location, and page performance through a JavaScript beacon. Cloudflare describes this
                service as privacy-first and says it does not collect or use visitors' personal data. The beacon does
                not set cookies. The site does not include advertising trackers, a scheduling platform, or a generic
                chatbot.
              </p>
            </section>

            <BoundaryBox title="Keep the first message low-risk">
              <p>
                Do not send passwords, access tokens, production data, medical records, legal files, full financial
                identifiers, confidential datasets, or other secrets through the form. After an initial conversation, I
                can suggest an appropriate way to handle any necessary material.
              </p>
            </BoundaryBox>

            <section>
              <h2>Questions or alternatives</h2>
              <p>
                If you have a question about this note or prefer not to use the form, email{' '}
                <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
              </p>
            </section>
          </div>
        </section>
      </main>
    </Layout>
  );
}
