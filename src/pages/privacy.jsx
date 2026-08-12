import Link from '../components/Link';
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
          title="What this site sends, and where."
          lede="This is a factual map of the current public site and initial inquiry path. It is not a generic policy for practices or systems that do not exist."
        />

        <section className="section-block">
          <div className="shell narrow-shell privacy-copy">
            <p className="privacy-reviewed">Implementation and provider documentation last checked August 12, 2026.</p>

            <section>
              <h2>When you browse the site</h2>
              <p>
                Cloudflare Workers Static Assets serves the site at <code>www.hekswerk.com</code>. Cloudflare processes
                the network request, requested path, and ordinary connection metadata needed to return the page. The
                same build may also be available at a <code>workers.dev</code> review address, which is marked not to be
                indexed.
              </p>
              <p>
                The site&apos;s styles, images, scripts, and two typefaces are served with the page by its current host.
                The typefaces are bundled locally under the SIL Open Font License, so a page view does not contact
                Google Fonts.
              </p>
              <p>
                One Cloudflare Web Analytics script measures page views and page performance. Cloudflare receives the
                site host and path, referring site, country, device and browser categories, and performance timing. Its
                current documentation says Web Analytics does not log query strings, use cookies or browser storage, or
                collect or use visitors&apos; personal data. Cloudflare keeps unsampled beacon data for seven days and
                then retains aggregated data; its dashboard exposes the previous six months.
              </p>
              <p>
                External project links do not send the Hekswerk page as a referrer. If you choose one, the destination,
                usually GitHub, still receives the ordinary connection information needed to serve its page.
              </p>
              <ul className="plain-list privacy-sources">
                <li>
                  <Link to="https://developers.cloudflare.com/web-analytics/data-metrics/data-origin-and-collection/">
                    Cloudflare Web Analytics collection
                  </Link>
                </li>
                <li>
                  <Link to="https://developers.cloudflare.com/web-analytics/faq/">
                    Cloudflare Web Analytics retention and query-string behavior
                  </Link>
                </li>
              </ul>
            </section>

            <section>
              <h2>What the contact form collects</h2>
              <p>
                Every inquiry asks for a name, email address, and topic. Automation inquiries ask for a high-level
                description of one repeating process and whether it may involve sensitive or regulated information.
                Organization, systems involved, current failure points, frequency, and desired timing are optional.
                Research and general inquiries ask for a message. Relocation asks for one high-level note rather than
                separate household, address, or document details.
              </p>
              <p>
                The form also includes a hidden <code>website</code> field as a spam trap. If it is filled, the Worker
                returns success without sending an email. Do not put passwords, access tokens, production data, medical
                records, legal files, financial identifiers, identity documents, or other secrets in any field.
              </p>
            </section>

            <section>
              <h2>Limited inquiry attribution</h2>
              <p>
                The site records the first path you visit in a browser-tab session and, when present, the campaign
                parameters <code>utm_source</code>, <code>utm_medium</code>, and <code>utm_campaign</code>. These values
                stay in that tab&apos;s session storage and are sent only if you submit the form. The site does not
                retain other query parameters for attribution. The browser normally clears this copy when that tab
                session ends.
              </p>
            </section>

            <section>
              <h2>Where an inquiry goes and what is retained</h2>
              <p>
                The browser sends the form over HTTPS to a Hekswerk Cloudflare Worker. The Worker validates and limits
                the payload, but its origin check is a browser boundary rather than proof of identity. It has no
                database, storage bucket, customer list, or analytics binding. The code does not write form contents to
                logs, and automatic invocation logs are disabled. It emits only content-free error messages when email
                delivery is unavailable or rejected.
              </p>
              <p>
                Cloudflare still processes the network request. For a valid submission, the Worker sends the form fields
                and limited attribution to Resend as a plain-text email. Resend&apos;s dashboard exposes the sent
                message and API request log, and its current documentation says it retains email data for 30 days. The
                destination is my Hekswerk mailbox hosted by Microsoft 365, where the message remains subject to that
                mailbox&apos;s deletion, recovery, and retention settings. There is no additional Hekswerk-owned contact
                database.
              </p>
              <p>
                <Link to="https://resend.com/docs/dashboard/webhooks/how-to-store-webhooks-data">
                  Resend&apos;s current email-retention statement
                </Link>
              </p>
            </section>

            <section>
              <h2>How I use an inquiry</h2>
              <p>
                I use the message to understand the question, assess whether the work appears to fit, reply, and keep
                the resulting conversation in my business mailbox. Submitting does not create an account, schedule a
                meeting, or add anyone to a newsletter or marketing list.
              </p>
            </section>

            <section>
              <h2>Requesting deletion</h2>
              <p>
                To request deletion of an inquiry, email <a href={`mailto:${contactEmail}`}>{contactEmail}</a>, ideally
                from the address used in the form, and include the approximate submission date. I can remove copies I
                control from my mailbox and ask Resend about a provider-held copy that is still within its retention
                period. I will tell you what I removed and identify any provider-controlled logs, backups, or retention
                that I cannot directly erase or verify.
              </p>
            </section>

            <section>
              <h2>An inquiry is not a client relationship</h2>
              <p>
                Sending a form or receiving a reply does not by itself establish a client relationship or agreement to
                perform work. Do not treat the initial message as a confidential client channel. A working relationship
                begins only after scope, responsibilities, data handling, and terms are agreed in writing.
              </p>
            </section>

            <BoundaryBox title="Keep the first message low-risk">
              <p>
                The safest initial note names the process and problem without including real records or credentials. If
                later work needs sensitive material, the appropriate access and handling method should be agreed first.
              </p>
            </BoundaryBox>

            <section>
              <h2>Questions or alternatives</h2>
              <p>
                If you have a question about this note or prefer not to use the form, email{' '}
                <a href={`mailto:${contactEmail}`}>{contactEmail}</a>. Ordinary email uses the same Microsoft 365
                mailbox but does not use the Hekswerk contact Worker or its Resend delivery step.
              </p>
            </section>
          </div>
        </section>
      </main>
    </Layout>
  );
}
