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
          lede="This notice covers the public Hekswerk site and the first inquiry. Any later client work gets its own scope, responsibilities, and data-handling terms."
        />

        <section className="section-block">
          <div className="shell narrow-shell privacy-copy">
            <p className="privacy-reviewed">Implementation and provider documentation last checked August 12, 2026.</p>

            <section>
              <h2>Who is responsible</h2>
              <p>
                Levi Banks operates Hekswerk as a one-person practice. For this website and its inquiry path, I decide
                why and how personal information is handled and am the data controller where that term applies. You can
                reach me at <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
              </p>
            </section>

            <section>
              <h2>When you browse the site</h2>
              <p>
                Cloudflare Workers Static Assets serves the site at <code>www.hekswerk.com</code>. Cloudflare processes
                the network request, including the requested address, IP address, and ordinary connection information
                needed to return the page and protect the service. The same build may also be available at a{' '}
                <code>workers.dev</code> review address, which is marked not to be indexed.
              </p>
              <p>
                I use Cloudflare&apos;s aggregate traffic dashboard to understand requests, page views, visits, and
                broad country-level traffic. Cloudflare derives some of these measures from network information such as
                IP addresses. I do not receive raw request logs. Worker invocation logs are disabled.
              </p>
              <p>
                The site also sends five bounded conversion events to its own <code>/_metrics</code> path: views of the
                work and selected-work pages, contact-link clicks, automation-intake reaches, and successful automation
                submissions. The site Worker stores the event time and name, a fixed page and topic, and a source bucket
                in Cloudflare Workers Analytics Engine for three months. A source is direct, internal, a short outreach
                label, or an external referrer&apos;s hostname. It never includes a referrer path or full address.
              </p>
              <p>
                Cloudflare currently adds Network Error Logging instructions to its responses. If a supporting browser
                encounters a network failure, it may send Cloudflare a diagnostic report describing the failed address,
                referrer, request method, timing, protocol, status, error type, and network connection. Cloudflare says
                it uses the connection IP to derive the network, country, and metro area, keeps the IP only in volatile
                memory while processing the report, purges personal data afterward, and does not share the reports with
                third parties.
              </p>
              <p>
                This site sets no cookies and writes nothing to local storage or session storage. It has no visitor or
                session identifier and loads no third-party analytics script. Its styles, images, scripts, and two
                typefaces are served with the page. The typefaces are bundled locally, so a page view does not contact
                Google Fonts.
              </p>
              <p>
                External project links do not send the Hekswerk page as a referrer. If you choose one, the destination,
                usually GitHub, still receives the ordinary connection information needed to serve its page.
              </p>
              <ul className="plain-list privacy-sources">
                <li>
                  <Link to="https://developers.cloudflare.com/analytics/account-and-zone-analytics/zone-analytics/">
                    Cloudflare zone analytics
                  </Link>
                </li>
                <li>
                  <Link to="https://developers.cloudflare.com/analytics/faq/about-analytics/">
                    Cloudflare&apos;s explanation of visits and unique visitors
                  </Link>
                </li>
                <li>
                  <Link to="https://developers.cloudflare.com/network-error-logging/">
                    Cloudflare Network Error Logging and privacy details
                  </Link>
                </li>
                <li>
                  <Link to="https://developers.cloudflare.com/analytics/analytics-engine/limits/">
                    Workers Analytics Engine retention
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
              <p>
                The required privacy checkbox records that you saw this notice. It is not consent to marketing and is
                not the legal basis for handling the inquiry.
              </p>
              <p>
                Analytics and inquiry contents are separate. The metrics endpoint never receives a name, email address,
                organization, message, workflow description, form answer, or sensitive-information selection. A
                successful automation submission with an empty spam trap records only the fixed success event after the
                intake endpoint accepts the form.
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
                Cloudflare still processes the network request. For a valid submission, the Worker sends only the
                accepted form fields to Resend as a plain-text email. Resend&apos;s dashboard exposes the sent message
                and API request log, and its current documentation says it retains email data for 30 days. Its public
                documentation does not state a separate retention period for the request log. The destination is my
                Hekswerk mailbox hosted by Microsoft 365, where the message remains subject to that mailbox&apos;s
                deletion, recovery, and retention settings. There is no additional Hekswerk-owned contact database.
              </p>
              <p>
                <Link to="https://resend.com/docs/dashboard/webhooks/how-to-store-webhooks-data">
                  Resend&apos;s current email-retention statement
                </Link>
              </p>
            </section>

            <section>
              <h2>Why I use an inquiry</h2>
              <p>
                I use the message to understand the question, assess whether the work appears to fit, reply, and keep
                the resulting conversation in my business mailbox. Submitting does not create an account, schedule a
                meeting, or add anyone to a newsletter or marketing list.
              </p>
              <p>
                Where European data-protection law applies, I rely on steps requested before a possible contract for a
                service inquiry. I rely on legitimate interests to answer genuine research or general inquiries, secure
                the form, diagnose site availability, maintain necessary business correspondence, and understand
                aggregate site traffic. Those interests are limited to operating and protecting this small practice, and
                I do not use an inquiry for unrelated advertising.
              </p>
            </section>

            <section>
              <h2>International processing</h2>
              <p>
                Cloudflare, Resend, and Microsoft provide services internationally and may process information outside
                the European Economic Area, including in the United States. Their published data-protection terms use
                contractual transfer safeguards, including the European Commission&apos;s standard contractual clauses,
                where required. Exact routing and storage can change with provider configuration, so the linked provider
                terms are the current source for those safeguards.
              </p>
              <ul className="plain-list privacy-sources">
                <li>
                  <Link to="https://www.cloudflare.com/cloudflare-customer-dpa/">
                    Cloudflare Data Processing Addendum
                  </Link>
                </li>
                <li>
                  <Link to="https://resend.com/legal/dpa">Resend Data Processing Addendum</Link>
                </li>
                <li>
                  <Link to="https://www.microsoft.com/licensing/docs/view/Microsoft-Products-and-Services-Data-Protection-Addendum-DPA">
                    Microsoft Products and Services Data Protection Addendum
                  </Link>
                </li>
              </ul>
            </section>

            <section>
              <h2>How long I keep an inquiry</h2>
              <p>
                I keep inquiry correspondence while it is needed to reply, assess fit, continue a conversation you
                requested, meet an agreed or legal record-keeping duty, or handle a possible claim. At least once each
                calendar year, I review inquiries that did not lead to work and delete active-mailbox copies that are no
                longer needed. If an inquiry leads to client work, the later agreement and applicable financial or legal
                duties determine the relevant records and retention.
              </p>
            </section>

            <section>
              <h2>Your data-protection rights</h2>
              <p>
                Depending on the law that applies, you may ask for access, correction, deletion, restriction, or a
                portable copy of your personal information, or object to its use. Email{' '}
                <a href={`mailto:${contactEmail}`}>{contactEmail}</a>, ideally from the address used in the inquiry, and
                include the approximate date. I will use the least additional information reasonably needed to verify
                the request. Some records may need to be kept for legal duties or claims, and provider-controlled
                backups or logs may not be directly erasable.
              </p>
              <p>
                If European data-protection law applies, you may also complain to the authority where you live or work.
                Hekswerk&apos;s intended post-move supervisory authority is the{' '}
                <Link to="https://autoriteitpersoonsgegevens.nl/en">Dutch Data Protection Authority</Link>.
              </p>
            </section>

            <section>
              <h2>No automated decision about your inquiry</h2>
              <p>
                This site has no chatbot, advertising profile, or automated acceptance or rejection of inquiries. The
                form performs ordinary field validation and a spam-trap check. I review delivered inquiries myself.
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
