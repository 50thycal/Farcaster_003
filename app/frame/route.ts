import { NextRequest } from 'next/server';

const BASE = process.env.APP_BASE_URL || 'http://localhost:3000';

function html(head: string) {
  return new Response(`<!doctype html><html><head>${head}</head><body></body></html>`, {
    headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' }
  });
}

/** Initial view (GET): prompts for a cast URL/hash. */
export async function GET() {
  const img = `${BASE}/api/og?title=${encodeURIComponent('Cast Lookup Tester')}&subtitle=${encodeURIComponent('Paste a Warpcast URL or 40-char hash and press Submit')}`;
  const head = [
    // Frame v2 meta tags
    `<meta property="fc:frame" content="vNext">`,
    `<meta property="og:title" content="Cast Lookup Tester">`,
    `<meta property="og:image" content="${img}">`,
    `<meta property="fc:frame:image" content="${img}">`,
    `<meta property="fc:frame:input:text" content="Warpcast URL or hash">`,
    `<meta property="fc:frame:button:1" content="Submit">`,
    `<meta property="fc:frame:post_url" content="${BASE}/frame">`
  ].join('');
  return html(head);
}

/** Submission (POST): receives input text, validates using your API, returns result image. */
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  // Warpcast sends input in multiple shapes; try common fields
  const input = body?.untrustedData?.inputText || body?.input_text || '';
  const id = encodeURIComponent((input || '').trim());
  let ok = false, message = 'Not found';
  if (id) {
    const r = await fetch(`${BASE}/api/casts/${id}`, { cache: 'no-store' });
    ok = r.ok;
    if (!ok) {
      const txt = await r.text().catch(()=>'');
      message = `Error ${r.status}${txt ? `: ${txt.slice(0,120)}`:''}`;
    }
  } else {
    message = 'Please paste a Warpcast URL or full hash';
  }

  const title = ok ? '✅ Cast found' : '❌ Cast not found';
  const img = `${BASE}/api/og?title=${encodeURIComponent(title)}&subtitle=${encodeURIComponent(message)}`;

  const head = [
    `<meta property="fc:frame" content="vNext">`,
    `<meta property="og:title" content="${title}">`,
    `<meta property="og:image" content="${img}">`,
    `<meta property="fc:frame:image" content="${img}">`,
    `<meta property="fc:frame:button:1" content="Try another">`,
    `<meta property="fc:frame:post_url" content="${BASE}/frame">`
  ].join('');
  return html(head);
}
