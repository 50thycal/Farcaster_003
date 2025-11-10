import { getCastByHash } from '@/lib/fetchers';

export async function GET(_req: Request, props: { params: Promise<{ hash: string }> }) {
  const params = await props.params;
  try {
    const cast = await getCastByHash(params.hash.replace(/^0x/, ''));
    if (!cast) return new Response('Not found', { status: 404 });
    return Response.json(cast, { headers: { 'cache-control': 'no-store' } });
  } catch (e: any) {
    const status = e?.status || 500;
    return new Response(e?.message || 'Failed to fetch cast', { status });
  }
}
