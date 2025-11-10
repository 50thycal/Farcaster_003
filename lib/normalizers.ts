/**
 * Data normalization utilities
 * To be implemented in PR-002
 */

/**
 * Extract cast hash from Warpcast URL
 * Example: https://warpcast.com/username/0x123abc -> 0x123abc
 */
export function extractCastHash(input: string): string {
  // If it's already a hash, return it
  if (input.startsWith("0x")) {
    return input;
  }

  // Try to extract from Warpcast URL
  const match = input.match(/warpcast\.com\/[^\/]+\/(0x[a-fA-F0-9]+)/);
  if (match) {
    return match[1];
  }

  throw new Error("Invalid cast hash or URL");
}
