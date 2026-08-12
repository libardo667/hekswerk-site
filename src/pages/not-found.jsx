import {BoundaryBox, Hero} from '../components/SitePrimitives';
import Layout from '../components/PageContent';

export default function NotFound() {
  return (
    <Layout title="Page not found" description="The requested Hekswerk page could not be found.">
      <main>
        <Hero
          compact
          eyebrow="404 · Page not found"
          title="There is nothing at this address."
          lede="The page may have moved, or the address may be incomplete. The main site and current work remain available below."
          actions={[
            {label: 'Return to Hekswerk', to: '/', primary: true},
            {label: 'View contract work', to: '/work'},
          ]}
        />
        <section className="section-block">
          <div className="shell narrow-shell">
            <BoundaryBox title="Looking for a retired page?">
              <p>
                Older exhibits and the former WorldWeaver manual are no longer hosted as Hekswerk site sections. The
                current public projects are linked from Engineering &amp; Research.
              </p>
            </BoundaryBox>
          </div>
        </section>
      </main>
    </Layout>
  );
}
