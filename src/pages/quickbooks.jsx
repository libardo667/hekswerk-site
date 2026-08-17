import Link from '../components/Link';
import Layout from '../components/PageContent';
import {BoundaryBox, Hero} from '../components/SitePrimitives';
import {contactEmail} from '../data/site';

const quickBooksHome = '/ledger-review';

function QuickBooksLayout({title, lede, children, actions = []}) {
  return (
    <Layout>
      <main>
        <Hero compact eyebrow="Private Hekswerk integration" title={title} lede={lede} actions={actions} />
        <section className="section-block">
          <div className="shell narrow-shell privacy-copy">
            {children}
            <p className="privacy-reviewed">
              Intuit and QuickBooks are registered trademarks of Intuit Inc. Used with permission.
            </p>
          </div>
        </section>
      </main>
    </Layout>
  );
}

function ContactLine() {
  return (
    <p>
      Questions about this integration can be sent to <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
    </p>
  );
}

export function QuickBooksOverview() {
  return (
    <QuickBooksLayout
      title="A read-only connection for Hekswerk's own books."
      lede="Hekswerk Ledger Review is an internal tool used by Levi Banks to review Hekswerk accounting records and prepare evidence for reconciliation. It is not offered as a customer-facing service."
      actions={[
        {label: 'Connection instructions', to: '/ledger-review/connect', primary: true},
        {label: 'Privacy notice', to: '/ledger-review/privacy'},
      ]}
    >
      <section>
        <h2>What it does</h2>
        <p>
          The integration requests QuickBooks Online Accounting access so its owner can read company information,
          accounts, transactions, and accounting reports. It is used to compare source records, identify possible
          double-counting, distinguish business income from transfers between owned accounts, and prepare a reviewable
          packet for a bookkeeper.
        </p>
      </section>

      <section>
        <h2>What it does not do</h2>
        <p>
          The integration does not create, edit, categorize, approve, or delete QuickBooks records. It does not send
          invoices, run payroll, initiate payments, move money, offer financial products, or make tax, legal,
          investment, or lending decisions.
        </p>
      </section>

      <BoundaryBox title="Private owner-operated access">
        <p>
          There is no public account registration or shared hosted dashboard. Authorization and use happen only in an
          owner-controlled local environment. These pages document the integration and its data practices.
        </p>
      </BoundaryBox>

      <section>
        <h2>Policies and connection status</h2>
        <ul>
          <li>
            <Link to="/ledger-review/privacy">Integration privacy notice</Link>
          </li>
          <li>
            <Link to="/ledger-review/terms">Integration terms</Link>
          </li>
          <li>
            <Link to="/ledger-review/connect">Connect or reconnect instructions</Link>
          </li>
          <li>
            <Link to="/ledger-review/disconnected">Disconnected status and next steps</Link>
          </li>
        </ul>
      </section>

      <ContactLine />
    </QuickBooksLayout>
  );
}

export function QuickBooksPrivacy() {
  return (
    <QuickBooksLayout
      title="QuickBooks integration privacy notice"
      lede="This notice covers the private QuickBooks Online connector used for Hekswerk's own accounting review. It supplements the general Hekswerk website privacy notice."
      actions={[
        {label: 'Integration overview', to: quickBooksHome, primary: true},
        {label: 'General site privacy', to: '/privacy'},
      ]}
    >
      <p className="privacy-reviewed">Effective August 17, 2026.</p>

      <section>
        <h2>Who is responsible</h2>
        <p>
          Levi Banks operates Hekswerk and controls this private integration. It connects only to Hekswerk&apos;s own
          QuickBooks Online company. Contact: <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
        </p>
      </section>

      <section>
        <h2>QuickBooks data the integration can read</h2>
        <p>
          The integration may read company identity, chart-of-accounts information, transaction details, and accounting
          reports such as the profit and loss, balance sheet, and general ledger. It requests the QuickBooks Online
          Accounting scope because those records are needed for reconciliation.
        </p>
        <p>
          The integration is deliberately read-only. It has no function that creates, changes, categorizes, approves, or
          deletes QuickBooks records, and it does not initiate payments or other money movement.
        </p>
      </section>

      <section>
        <h2>Why the data is used</h2>
        <p>
          Data is used to review Hekswerk&apos;s bookkeeping, compare QuickBooks entries with payment-platform and bank
          evidence, identify possible duplicates or misclassified transfers, and prepare proposed corrections and
          supporting records for owner or bookkeeper review. No automated result is posted back to QuickBooks.
        </p>
      </section>

      <section>
        <h2>Where credentials and working records are kept</h2>
        <p>
          Client credentials and OAuth tokens are stored in a restricted configuration directory in the owner&apos;s
          local computing environment. Reconciliation snapshots and evidence are stored in owner-controlled local files
          and may be moved into an encrypted archive. They are not placed in a public repository or public analytics
          service.
        </p>
        <p>
          A dedicated Cloudflare Tunnel carries the temporary HTTPS OAuth callback to a listener bound only to the local
          loopback interface. Cloudflare processes the network request and ordinary connection information needed to
          deliver it. The connector does not use Cloudflare as a database for QuickBooks records or OAuth tokens.
        </p>
      </section>

      <section>
        <h2>Sharing and sale</h2>
        <p>
          Hekswerk does not sell QuickBooks data or use it for advertising. The owner may deliberately share selected
          accounting evidence with a chosen bookkeeper, accountant, tax professional, government authority, or other
          adviser when needed for business administration, legal duties, or the owner&apos;s relocation. The connector
          does not make those disclosures automatically.
        </p>
      </section>

      <section>
        <h2>Retention and disconnection</h2>
        <p>
          OAuth tokens remain until they expire, are replaced, or access is revoked. Local accounting evidence remains
          until the owner deletes it or retains it for an applicable bookkeeping, tax, legal, or relocation purpose.
          Disconnecting ends future API access but does not automatically delete records already exported to local
          files.
        </p>
      </section>

      <section>
        <h2>Service providers and international processing</h2>
        <p>
          Intuit provides QuickBooks Online and its API. Cloudflare provides the public site, DNS, TLS termination, and
          OAuth callback transport. Their current privacy and data-protection terms govern their processing and may
          involve processing in the United States and other countries.
        </p>
        <ul>
          <li>
            <Link to="https://www.intuit.com/privacy/statement/">Intuit privacy statement</Link>
          </li>
          <li>
            <Link to="https://www.cloudflare.com/cloudflare-customer-dpa/">Cloudflare Data Processing Addendum</Link>
          </li>
        </ul>
      </section>

      <section>
        <h2>Questions, access, and deletion</h2>
        <p>
          This is a single-owner internal integration rather than a service collecting records from public users. A
          person whose information appears in Hekswerk&apos;s accounting records may contact Hekswerk about access,
          correction, or deletion. Some records may need to be retained for bookkeeping, tax, legal, or claims purposes.
        </p>
      </section>

      <ContactLine />
    </QuickBooksLayout>
  );
}

export function QuickBooksTerms() {
  return (
    <QuickBooksLayout
      title="Hekswerk Ledger Review end-user license agreement"
      lede="This agreement governs the private, owner-operated integration used for Hekswerk's internal bookkeeping review."
      actions={[
        {label: 'Integration overview', to: quickBooksHome, primary: true},
        {label: 'Privacy notice', to: '/ledger-review/privacy'},
      ]}
    >
      <p className="privacy-reviewed">Effective August 17, 2026.</p>

      <section>
        <h2>License grant</h2>
        <p>
          Hekswerk grants its authorized operator a limited, revocable, non-transferable license to run Hekswerk Ledger
          Review solely for Hekswerk&apos;s internal accounting reconciliation and supporting record preparation. No
          right is granted to distribute, sublicense, resell, or provide the integration to another business or public
          user.
        </p>
      </section>

      <section>
        <h2>Purpose and permitted use</h2>
        <p>
          Hekswerk Ledger Review may be used by Levi Banks for Hekswerk&apos;s own accounting reconciliation and
          supporting record preparation. It is not licensed or offered to customers, clients, or the public, and it is
          not a substitute for professional bookkeeping, accounting, tax, legal, or financial advice.
        </p>
      </section>

      <section>
        <h2>Read-only boundary</h2>
        <p>
          The integration is designed to retrieve and analyze authorized QuickBooks Online records. It does not provide
          functions to modify the books or initiate transactions. Any proposed bookkeeping correction must be reviewed
          and entered separately by the owner or an authorized professional.
        </p>
      </section>

      <section>
        <h2>Authorization and account control</h2>
        <p>
          Use requires authorization by an administrator of the connected QuickBooks Online company. The owner is
          responsible for protecting the local environment and credentials, reviewing any generated analysis, and
          revoking access when the integration is no longer needed.
        </p>
      </section>

      <section>
        <h2>Availability and warranties</h2>
        <p>
          The integration is maintained for internal use and may be changed, interrupted, or withdrawn. To the extent
          permitted by applicable law, it is provided without warranties of uninterrupted availability, completeness, or
          fitness for a particular accounting, tax, legal, or financial purpose.
        </p>
      </section>

      <section>
        <h2>Third-party services</h2>
        <p>
          QuickBooks Online and Intuit&apos;s APIs are provided by Intuit under Intuit&apos;s own terms. Cloudflare
          provides supporting site and callback infrastructure under Cloudflare&apos;s terms. Hekswerk is independent of
          and is not endorsed or sponsored by Intuit. QuickBooks and Intuit are trademarks of Intuit Inc.
        </p>
      </section>

      <section>
        <h2>Termination</h2>
        <p>
          Use may be ended at any time by disconnecting the app in QuickBooks Online, revoking its OAuth token, and
          removing the local credentials and working records that are no longer required.
        </p>
      </section>

      <ContactLine />
    </QuickBooksLayout>
  );
}

export function QuickBooksConnect() {
  return (
    <QuickBooksLayout
      title="Connect or reconnect Hekswerk Ledger Review"
      lede="This private integration can be authorized only by the owner of the Hekswerk QuickBooks Online company from the owner-controlled local environment."
      actions={[{label: 'Integration overview', to: quickBooksHome, primary: true}]}
    >
      <section>
        <h2>Owner connection procedure</h2>
        <ol>
          <li>Start the private local OAuth listener and its HTTPS callback tunnel.</li>
          <li>Open the one-time Intuit authorization link generated for that session.</li>
          <li>Sign in to Intuit, select the Hekswerk company, and approve access.</li>
          <li>Confirm locally that the token was stored and make one narrow read-only connection check.</li>
        </ol>
        <p>
          The authorization link includes a short-lived security state value, so this public page does not publish or
          cache a reusable connection link. There is no public Hekswerk account or sign-in form for this integration.
        </p>
      </section>

      <BoundaryBox title="If the app was disconnected">
        <p>
          Start a new local authorization session and complete the Intuit consent screen again. Old authorization links
          should not be reused.
        </p>
      </BoundaryBox>

      <ContactLine />
    </QuickBooksLayout>
  );
}

export function QuickBooksDisconnected() {
  return (
    <QuickBooksLayout
      title="Hekswerk Ledger Review is disconnected"
      lede="The connection between QuickBooks Online and this private Hekswerk integration has ended."
      actions={[
        {label: 'Reconnect instructions', to: '/ledger-review/connect', primary: true},
        {label: 'Integration overview', to: quickBooksHome},
      ]}
    >
      <section>
        <h2>What disconnection means</h2>
        <p>
          The connector can no longer make new QuickBooks Online API requests with the revoked authorization. Local
          reports or reconciliation records created before disconnection are not automatically removed.
        </p>
      </section>

      <section>
        <h2>Reconnect if the disconnection was unintentional</h2>
        <p>
          The owner can start a fresh authorization session from the owner-controlled local environment and approve the
          connection again in Intuit. A new session is required because prior state values and authorization codes
          cannot be reused.
        </p>
      </section>

      <ContactLine />
    </QuickBooksLayout>
  );
}
