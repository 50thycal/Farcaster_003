import { searchUsers } from '@/lib/fetchers';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q') || '';
  const cursor = searchParams.get('cursor') || undefined;
  if (!q) return Response.json({ items: [], nextCursor: null });
  try {
    const data = await searchUsers(q, cursor);
    return Response.json(data, { headers: { 'cache-control': 'no-store' } });
  } catch (e: any) {
    const status = e?.status || 500;
    return Response.json({ error: e?.message || 'Search failed' }, { status });
  }
}
