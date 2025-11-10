import { hub } from './neynar';
import { z } from 'zod';
import {
  UsersSearchResponseZ,
  CastResponseZ,
  GraphListResponseZ
} from './schemas';

// Normalize to our app's light profile
function toProfileLite(u: z.infer<typeof UsersSearchResponseZ>['result'] extends infer R ? any : any) {
  return {
    fid: u.fid,
    username: u.username,
    displayName: u.display_name,
    pfpUrl: u.pfp_url,
    followerCount: u.follower_count,
    followingCount: u.following_count,
    bio: u.profile?.bio?.text
  };
}

export async function searchUsers(q: string, cursor?: string) {
  const url = `farcaster/user/search?q=${encodeURIComponent(q)}&limit=25${cursor ? `&cursor=${encodeURIComponent(cursor)}` : ''}`;
  const res = await hub(url);
  const json = await res.json();
  const parsed = UsersSearchResponseZ.parse(json);
  const users = (parsed.result?.users || []).map(toProfileLite);
  return { items: users, nextCursor: parsed.next?.cursor ?? null };
}

export async function getCastByHash(hash: string) {
  const res = await hub(`farcaster/cast?identifier=${hash}&type=hash`);
  const json = await res.json();
  const parsed = CastResponseZ.parse(json);
  const c = parsed.cast ?? parsed.result?.cast;
  if (!c) return null;
  return {
    hash: c.hash,
    text: c.text ?? '',
    author: {
      fid: c.author?.fid!,
      username: c.author?.username!,
      displayName: c.author?.display_name,
      pfpUrl: c.author?.pfp_url
    },
    embeds: c.embeds,
    replies: c.replies_count ?? 0,
    recasts: c.recasts_count ?? 0,
    likes: c.reactions?.likes_count ?? 0,
    timestamp: c.timestamp ?? ''
  };
}

export async function getFollowers(fid: string, cursor?: string) {
  const res = await hub(`farcaster/user/followers?fid=${encodeURIComponent(fid)}&limit=50${cursor ? `&cursor=${encodeURIComponent(cursor)}` : ''}`);
  const json = await res.json();
  const parsed = GraphListResponseZ.parse(json);
  const users = (parsed.result?.users || []).map(toProfileLite);
  return { items: users, nextCursor: parsed.next?.cursor ?? null };
}

export async function getFollowing(fid: string, cursor?: string) {
  const res = await hub(`farcaster/user/following?fid=${encodeURIComponent(fid)}&limit=50${cursor ? `&cursor=${encodeURIComponent(cursor)}` : ''}`);
  const json = await res.json();
  const parsed = GraphListResponseZ.parse(json);
  const users = (parsed.result?.users || []).map(toProfileLite);
  return { items: users, nextCursor: parsed.next?.cursor ?? null };
}
