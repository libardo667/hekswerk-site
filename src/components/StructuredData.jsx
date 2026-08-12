import Head from '@docusaurus/Head';

export default function StructuredData({data}) {
  return (
    <Head>
      <script type="application/ld+json">{JSON.stringify(data)}</script>
    </Head>
  );
}
