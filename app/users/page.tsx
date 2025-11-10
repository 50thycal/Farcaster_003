"use client";

import Link from "next/link";
import { useState } from "react";

export default function UsersPage() {
  const [query, setQuery] = useState("");

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link
            href="/"
            className="text-purple-600 dark:text-purple-400 hover:underline"
          >
            ← Back to Home
          </Link>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              User Search
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Find Farcaster users by handle or display name
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <input
              type="text"
              placeholder="Search by username or display name..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              🚧 Search functionality will be implemented in PR-002 with Neynar
              SDK integration
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
