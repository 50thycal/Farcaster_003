import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white">
            Farcaster003
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Explore the Farcaster social graph
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <FeatureCard
            title="User Search"
            description="Find Farcaster users by handle or display name"
            href="/users"
            icon="👤"
          />
          <FeatureCard
            title="Cast Lookup"
            description="Retrieve casts by hash or Warpcast URL"
            href="/cast"
            icon="📝"
          />
          <FeatureCard
            title="Social Graph"
            description="View followers and following lists"
            href="/graph"
            icon="🔗"
          />
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Built with Next.js 15 + TypeScript + TailwindCSS
          </p>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({
  title,
  description,
  href,
  icon,
}: {
  title: string;
  description: string;
  href: string;
  icon: string;
}) {
  return (
    <Link
      href={href}
      className="block p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h2>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </Link>
  );
}
