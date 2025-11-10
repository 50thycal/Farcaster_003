export async function withBackoff<T>(fn: () => Promise<T>, attempts = 4): Promise<T> {
  let delay = 250
  let lastErr: any
  for (let i = 0; i < attempts; i++) {
    try { return await fn() } catch (e) { lastErr = e }
    await new Promise(r => setTimeout(r, delay))
    delay *= 2
  }
  throw lastErr
}
