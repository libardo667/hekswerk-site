export default function StructuredData({data}) {
  return <script type="application/ld+json">{JSON.stringify(data)}</script>;
}
