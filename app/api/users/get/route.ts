import { hub } from '@/lib/neynar';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const username = (searchParams.get('username') || '').trim().replace(/^@/, '');
  const fid = (searchParams.get('fid') || '').trim();

  try {
    if (username) {
      const r = await hub(`farcaster/user-by-username?username=${encodeURIComponent(username)}`);
      const j = await r.json();
      const u = j.result?.user;
      return Response.json({
        user: u && {
          fid: u.fid,
          username: u.username,
          displayName: u.display_name,
          pfpUrl: u.pfp_url,
          followerCount: u.follower_count,
          followingCount: u.following_count,
          bio: u.profile?.bio?.text
        }
      }, { headers: { 'cache-control': 'no-store' } });
    }

    if (fid) {
      const r = await hub(`farcaster/user?fid=${encodeURIComponent(fid)}`);
      const j = await r.json();
      const u = j.result?.user;
      return Response.json({
        user: u && {
          fid: u.fid,
          username: u.username,
          displayName: u.display_name,
          pfpUrl: u.pfp_url,
          followerCount: u.follower_count,
          followingCount: u.following_count,
          bio: u.profile?.bio?.text
        }
      }, { headers: { 'cache-control': 'no-store' } });
    }

    return new Response('Provide ?username=@handle or ?fid=123', { status: 400 });
  } catch (e: any) {
    const status = e?.status || 500;
    const msg = e?.message || 'Lookup failed';
    return new Response(msg, { status });
  }
}
