/**
 * Exponential backoff retry utility
 * To be implemented in PR-002
 */

export async function withRetry<T>(
  fn: () => Promise<T>,
  maxAttempts = 4,
  baseDelay = 1000
): Promise<T> {
  let lastError: Error;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;

      // Don't retry on last attempt
      if (attempt === maxAttempts - 1) {
        break;
      }

      // Exponential backoff: 2^attempt * baseDelay
      const delay = Math.pow(2, attempt) * baseDelay;
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw lastError!;
}
