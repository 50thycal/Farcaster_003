import Link from 'next/link'

const Card = ({ href, title, desc }: { href: string; title: string; desc: string }) => (
  <Link href={href} className="block rounded-lg border border-gray-200 p-5 shadow-sm transition hover:shadow-md">
    <h2 className="text-lg font-semibold">{title}</h2>
    <p className="mt-1 text-sm text-gray-600">{desc}</p>
  </Link>
)

export default function Page() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold">caster-001</h1>
        <p className="text-sm text-gray-600">Read-only Farcaster mini app (MVP)</p>
      </header>
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card href="/users" title="Users" desc="Search Farcaster users" />
        <Card href="/cast" title="Cast" desc="Fetch a cast by URL/hash" />
        <Card href="/graph" title="Graph" desc="Explore followers/following" />
      </section>
    </div>
  )
}
