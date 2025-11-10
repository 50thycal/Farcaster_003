# farcaster003 — Farcaster Mini App

A minimal Farcaster mini-app for exploring the social graph. Built with Next.js 15, TypeScript, and TailwindCSS.

## Features

- **User Search** — Find Farcaster users by handle or display name
- **Cast Lookup** — Retrieve casts by hash or Warpcast URL
- **Social Graph** — View followers and following lists with pagination

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** TailwindCSS
- **API:** Neynar SDK
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Neynar API key (get one at [neynar.com](https://neynar.com))

### Installation

```bash
# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Add your Neynar API key to .env
NEYNAR_API_KEY=your_api_key_here
```

### Development

```bash
# Run development server
npm run dev

# Open http://localhost:3000
```

### Build

```bash
# Production build
npm run build

# Start production server
npm run start
```

## Project Structure

```
/app
  /page.tsx              # Landing page
  /users/page.tsx        # User search
  /cast/page.tsx         # Cast lookup
  /graph/page.tsx        # Social graph viewer
  /api/                  # API routes
/lib
  neynar.ts              # Neynar client
  fetchers.ts            # Data fetching utilities
  normalizers.ts         # Data normalization
  backoff.ts             # Retry logic
/types
  user.ts                # User type definitions
  cast.ts                # Cast type definitions
  graph.ts               # Graph type definitions
```

## API Routes

- `GET /api/users/search?q=` — Search users
- `GET /api/casts/[hash]` — Fetch cast by hash
- `GET /api/graph/followers?fid=` — Get followers
- `GET /api/graph/following?fid=` — Get following

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEYNAR_API_KEY` | Neynar API key for Farcaster data | Yes |

## Deployment

Deploy to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

Or manually:

```bash
vercel --prod
```

Remember to add `NEYNAR_API_KEY` in Vercel environment variables.

## Development Roadmap

- [x] **PR-001:** Project bootstrap and routing skeleton
- [ ] **PR-002:** Neynar SDK integration and data contracts
- [ ] **PR-003:** User search implementation
- [ ] **PR-004:** Cast lookup implementation
- [ ] **PR-005:** Social graph implementation

## License

MIT

## Contributing

This is a minimal MVP. Contributions welcome after initial release!
