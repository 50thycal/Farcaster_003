/**
 * Neynar client configuration
 * To be implemented in PR-002
 */

export function getNeynarClient() {
  const apiKey = process.env.NEYNAR_API_KEY;

  if (!apiKey) {
    throw new Error("NEYNAR_API_KEY is not configured");
  }

  // TODO: Initialize Neynar SDK client
  return {
    apiKey,
  };
}
