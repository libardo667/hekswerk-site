import Layout from '@theme/Layout';
import ContactForm from '../components/ContactForm';
import {BoundaryBox, Hero} from '../components/SitePrimitives';
import {contactEmail} from '../data/site';

export default function Contact() {
  return (
    <Layout
      title="Contact"
      description="Contact Hekswerk about an Operations Automation Sprint, research, or another inquiry."
    >
      <main>
        <Hero
          compact
          eyebrow="Contact Hekswerk"
          title="Start with the actual problem."
          lede="For an automation inquiry, describe the recurring workflow, who touches it, what systems it crosses, and what a successful handoff would look like."
        />

        <section className="section-block contact-section">
          <div className="shell contact-grid">
            <div>
              <span className="eyebrow">Private inquiry</span>
              <h2>Send a short first note</h2>
              <p className="section-copy">
                You do not need a technical specification. A concrete account of the current workflow is more useful.
              </p>
              <BoundaryBox title="Do not send secrets">
                <p>
                  Please do not include passwords, access tokens, full financial identifiers, health records, or other
                  sensitive records in this first message.
                </p>
              </BoundaryBox>
              <p className="contact-alternative">
                Prefer email? Write to <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
              </p>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>
    </Layout>
  );
}
