"use client";

import Link from "next/link";
import { useState } from "react";

export default function GraphPage() {
  const [input, setInput] = useState("");
  const [activeTab, setActiveTab] = useState<"followers" | "following">(
    "followers"
  );

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
              Social Graph
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              View followers and following lists
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-4">
            <input
              type="text"
              placeholder="Enter FID or @username"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
            />

            <div className="flex gap-2 border-b border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setActiveTab("followers")}
                className={`px-4 py-2 font-medium transition-colors ${
                  activeTab === "followers"
                    ? "text-purple-600 dark:text-purple-400 border-b-2 border-purple-600 dark:border-purple-400"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
              >
                Followers
              </button>
              <button
                onClick={() => setActiveTab("following")}
                className={`px-4 py-2 font-medium transition-colors ${
                  activeTab === "following"
                    ? "text-purple-600 dark:text-purple-400 border-b-2 border-purple-600 dark:border-purple-400"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
              >
                Following
              </button>
            </div>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              🚧 Social graph functionality will be implemented in PR-002 with
              Neynar SDK integration
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
