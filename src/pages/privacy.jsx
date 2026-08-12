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
                The contact form asks for your name, email address, topic, and message. If you choose relocation
                planning, it also offers fields for locations, timeline, household, and urgent or sensitive context.
              </p>
            </section>

            <section>
              <h2>What happens when you send it</h2>
              <p>
                The form sends those details over HTTPS to Hekswerk's intake endpoint so I can understand and reply to
                your inquiry. Submitting the form does not create a user account or add you to a newsletter.
              </p>
            </section>

            <section>
              <h2>Other services used by this site</h2>
              <p>
                The site is published with GitHub Pages. It loads typefaces from Google Fonts and links to public
                repositories on GitHub. The site does not include advertising trackers, a scheduling platform, or a
                generic chatbot.
              </p>
            </section>

            <BoundaryBox title="Keep the first message low-risk">
              <p>
                Do not send passwords, access tokens, full financial identifiers, health records, or confidential
                datasets through the form. After an initial conversation, I can suggest an appropriate way to handle any
                necessary material.
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
