import { z } from 'zod';

export const ProfileLiteZ = z.object({
  fid: z.number(),
  username: z.string(),
  display_name: z.string().optional(),
  pfp_url: z.string().url().optional(),
  follower_count: z.number().optional(),
  following_count: z.number().optional(),
  profile: z.object({
    bio: z.object({ text: z.string().optional() }).optional()
  }).optional()
});

export const UsersSearchResponseZ = z.object({
  result: z.object({
    users: z.array(ProfileLiteZ)
  }).optional(),
  next: z.object({
    cursor: z.string().optional()
  }).optional()
});

export const CastZ = z.object({
  hash: z.string(),
  text: z.string().default(''),
  timestamp: z.string().optional(),
  author: z.object({
    fid: z.number().optional(),
    username: z.string().optional(),
    display_name: z.string().optional(),
    pfp_url: z.string().optional()
  }).optional(),
  // some payloads have embeds array with url/image; keep loose
  embeds: z.array(z.any()).optional(),
  replies_count: z.number().optional(),
  recasts_count: z.number().optional(),
  reactions: z.object({
    likes_count: z.number().optional()
  }).optional()
});

export const CastResponseZ = z.object({
  // Some endpoints return { cast }, others { result: { cast } }
  cast: CastZ.optional(),
  result: z.object({ cast: CastZ.optional() }).optional()
});

export const GraphListResponseZ = z.object({
  result: z.object({
    users: z.array(ProfileLiteZ)
  }).optional(),
  next: z.object({
    cursor: z.string().optional()
  }).optional()
});
