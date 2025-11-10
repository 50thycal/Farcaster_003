'use client'
import { useState } from 'react'

function castUrlToHash(input: string) {
  const m = input.trim().match(/([a-f0-9]{40})$/i)
  return m ? m[1] : input.trim().replace(/^0x/, '')
}

export default function CastPage() {
  const [val, setVal] = useState('')
  const [cast, setCast] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState<string| null>(null)

  async function fetchCast() {
    setErr(null); setLoading(true); setCast(null)
    const hash = castUrlToHash(val)
    const res = await fetch(`/api/casts/${hash}`)
    if (!res.ok) { setErr('Not found'); setLoading(false); return }
    const json = await res.json()
    setCast(json); setLoading(false)
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Fetch Cast</h2>
      <div className="flex gap-2">
        <input value={val} onChange={e=>setVal(e.target.value)} placeholder="Warpcast URL or hash" className="w-full rounded border p-2" />
        <button onClick={fetchCast} className="rounded bg-black px-3 py-2 text-white disabled:opacity-50" disabled={!val || loading}>Fetch</button>
      </div>
      {loading && <p>Loading…</p>}
      {err && <p className="text-red-600">{err}</p>}
      {cast && (
        <article className="rounded border p-4">
          <header className="mb-2 flex items-center gap-3">
            {cast.author?.pfpUrl && <img src={cast.author.pfpUrl} className="h-10 w-10 rounded-full" alt="" />}
            <div>
              <div className="font-medium">{cast.author?.displayName || cast.author?.username}</div>
              <div className="text-sm text-gray-600">@{cast.author?.username} · fid {cast.author?.fid}</div>
            </div>
          </header>
          <p className="whitespace-pre-wrap">{cast.text}</p>
          <footer className="mt-3 text-sm text-gray-600">
            <span>♥ {cast.likes ?? 0}</span>
            <span className="mx-2">↻ {cast.recasts ?? 0}</span>
            <span>💬 {cast.replies ?? 0}</span>
          </footer>
        </article>
      )}
    </div>
  )
}
