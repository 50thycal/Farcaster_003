import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get('title') || 'Caster';
  const subtitle = searchParams.get('subtitle') || '';

  return new ImageResponse(
    (
      <div
        style={{
          height: '630px',
          width: '1200px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          background: '#0b0b0b',
          color: '#fff',
          padding: '64px',
          fontSize: 48
        }}
      >
        <div style={{ fontWeight: 700 }}>{title}</div>
        <div style={{ marginTop: 24, fontSize: 32, color: '#ccc', whiteSpace: 'pre-wrap' }}>
          {subtitle}
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
