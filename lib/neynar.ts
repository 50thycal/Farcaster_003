// Thin wrapper around Neynar API v2
// Note: server-only; do not import in client components.
export async function hub(path: string, init?: RequestInit) {
  const key = process.env.NEYNAR_API_KEY;
  if (!key) throw new Error("Missing NEYNAR_API_KEY");
  const res = await fetch(`https://api.neynar.com/v2/${path}`, {
    ...init,
    headers: {
      'x-api-key': key,
      'content-type': 'application/json',
      ...(init?.headers || {})
    },
    // Helpful on Vercel to avoid stale edges for live queries:
    cache: 'no-store',
    next: { revalidate: 0 }
  });
  if (!res.ok) {
    // Bubble up basic info for route handlers
    const text = await res.text().catch(()=>'');
    const err = new Error(`Neynar ${res.status} ${res.statusText}: ${text.slice(0,200)}`);
    // Attach status for caller to handle
    // @ts-ignore
    err.status = res.status;
    throw err;
  }
  return res;
}
