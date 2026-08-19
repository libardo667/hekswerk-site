import ContactForm from '../components/ContactForm';
import Layout from '../components/PageContent';
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
          title="Start with the work as it happens now."
          lede="For an automation inquiry, describe the recurring process and where it breaks down. You do not need to design the solution before getting in touch."
        />

        <section className="section-block contact-section">
          <div className="shell contact-grid">
            <div>
              <span className="eyebrow">Initial inquiry</span>
              <h2>Send a short first note</h2>
              <p className="section-copy">
                Choose a topic and the form will ask only for the context that fits it. I read every inquiry myself and
                reply directly.
              </p>
              <BoundaryBox title="Do not send secrets">
                <p>
                  Do not include passwords, access tokens, production data, medical records, legal files, full financial
                  identifiers, or other secrets in this first message.
                </p>
              </BoundaryBox>
              <p className="contact-alternative">
                Prefer email? Write to <a href={`mailto:${contactEmail}`}>{contactEmail}</a>. Messages sent from a
                Proton Mail account are end-to-end encrypted automatically. From another provider, keep the first note
                as low-risk as the form.
              </p>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>
    </Layout>
  );
}
