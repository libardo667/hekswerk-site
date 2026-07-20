import Layout from '@theme/Layout';

export default function About() {
  return (
    <Layout title="About" description="About Hekswerk and the work supporting WorldWeaver.">
      <main className="plain-page">
        <div className="shell narrow-shell">
          <span className="eyebrow">About Hekswerk</span>
          <h1>An independent practice supporting open research.</h1>
          <p className="page-lede">
            Hekswerk is Levi Banks's one-person systems and AI research practice. Contract evaluation and careful
            automation work fund the continued development of WorldWeaver. The research and core software are
            published openly rather than sold as a hosted attention product.
          </p>

          <section className="content-section">
            <h2>What is public</h2>
            <p>
              WorldWeaver's source, technical documentation, and dated research record are public. Resident private
              histories, prompts, hearth files, and unpublished workshop material are not public project content.
            </p>
          </section>

          <section className="content-section">
            <h2>Get in touch</h2>
            <p>
              Use the existing private contact form for research, collaboration, or contract inquiries.
            </p>
            <a className="button button--primary" href="https://www.hekswerk.com/contact.html">Contact Hekswerk</a>
          </section>
        </div>
      </main>
    </Layout>
  );
}
