# caster-001 — Farcaster Mini App (MVP)

## Overview
A minimal Farcaster mini-app that tests core social graph functionality — user discovery, cast lookup, and follower/following relationships.
The goal is to validate API reliability, data modeling, and user experience flow before expanding into write or frame features.

**Primary Objective:**
Enable quick read-only exploration of Farcaster's network via a simple web interface.

**Audience:**
Developers, DAO community members, and Farcaster explorers who want a lightweight visualization or lookup tool.

**Success Criteria**
- Can search users by handle or display name.
- Can retrieve a specific cast by hash or Warpcast URL.
- Can view a user's followers and following lists (paginated).
- All actions complete with clear feedback and < 2 s response under normal load.

---

## Requirements

| Feature | Description | API Endpoint | Output |
|----------|--------------|--------------|---------|
| User Search | Find users by query string | `/api/users/search?q=` | List of profile cards |
| Cast Lookup | Fetch cast by hash or Warpcast URL | `/api/casts/[hash]` | Cast card (text, author, metrics) |
| Social Graph | Get followers / following for user | `/api/graph/followers?fid=` / `/api/graph/following?fid=` | Paginated lists |

### Functional Details
- **Search:** Partial and exact username matches.
- **Normalization:** Accept Warpcast URLs → extract cast hash automatically.
- **Pagination:** Infinite scroll with `cursor` support.
- **Error Handling:** Explicit messages for 404, rate-limit, and empty results.
- **Security:** No client exposure of API keys.
- **Caching:** Client-side cache (React Query optional).
- **Rate-limit resilience:** Exponential backoff (2× up to 4 attempts).

### Non-Goals (MVP)
- Write actions (casts, reactions, follows).
- Auth or personalization.
- Graph visualizations beyond list form.
- Persistent DB or analytics.

---

## Architecture

**Stack:**
Next.js 15 (App Router) + TypeScript + TailwindCSS
Vercel serverless deployment
Neynar SDK for Farcaster Hub API access
Zod schemas for contract validation

```
/app
  /page.tsx
  /users/page.tsx
  /cast/page.tsx
  /graph/page.tsx
  /api/...
/lib
  neynar.ts
  fetchers.ts
  normalizers.ts
  backoff.ts
/types
  user.ts
  cast.ts
  graph.ts
```

### API Routes
| Route | Method | Description |
|-------|---------|-------------|
| `/api/users/search` | GET | Search Farcaster users |
| `/api/casts/[hash]` | GET | Fetch cast by hash |
| `/api/graph/followers` | GET | Followers list |
| `/api/graph/following` | GET | Following list |

All routes proxy to Neynar endpoints using `NEYNAR_API_KEY` stored in env variables.

---

## UX Outline
**Landing:** 3 cards — Users / Cast / Graph
**Users Tab:** Search input, list of results → mini profile view
**Cast Tab:** Paste Warpcast URL → normalized → cast card display
**Graph Tab:** Input fid/@username → followers / following tabs

UI emphasizes speed and clarity over decoration.
Copy buttons for fid / cast hash / deep links.
Loading and error states for all views.

---

## Data Models
```ts
type ProfileLite = {
  fid: number;
  username: string;
  displayName?: string;
  pfpUrl?: string;
  followerCount?: number;
  followingCount?: number;
  bio?: string;
};

type Cast = {
  hash: string;
  text: string;
  author: ProfileLite;
  embeds?: { url?: string; image?: string }[];
  replies?: number;
  recasts?: number;
  likes?: number;
  timestamp: string;
};

type GraphList = {
  items: ProfileLite[];
  nextCursor?: string;
};
```

---

## Testing
- **Unit:** normalizers, zod schemas.
- **Integration:** API routes via mock Neynar responses.
- **Manual E2E:** verify user search, cast lookup, and graph pagination.

---

## Deployment
**Platform:** Vercel
**Env Var:** `NEYNAR_API_KEY` (Server Only)
**Command:** `npm run build && npm run start`
Auto-deploy from `main` branch.

---

## Risks / Mitigation
| Risk | Mitigation |
|------|-------------|
| Hub downtime | Fallback to cached responses |
| API rate-limit | Exponential backoff + retry |
| Data shape change | Strict Zod validation |
| SDK breakage | Wrap in / lib client abstraction |

---

## Roadmap
**v0.1** — MVP complete (user, cast, graph)
**v0.2** — Graph visualization + mutual followers
**v0.3** — Recent casts by user
**v0.4** — Sign-in With Farcaster + personalized feed
