import { getFollowing } from '@/lib/fetchers';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const fid = searchParams.get('fid');
  const cursor = searchParams.get('cursor') || undefined;
  if (!fid) return new Response('Missing fid', { status: 400 });
  try {
    const data = await getFollowing(fid, cursor);
    return Response.json(data, { headers: { 'cache-control': 'no-store' } });
  } catch (e: any) {
    const status = e?.status || 500;
    return Response.json({ error: e?.message || 'Following failed' }, { status });
  }
}
