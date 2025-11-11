'use client'
import { useState } from 'react'

export default function UsersPage() {
  const [q, setQ] = useState('')
  const [data, setData] = useState<any>(null)
  const [error, setError] = useState<string|null>(null)
  const [loading, setLoading] = useState(false)

  const isFID = (s:string)=> /^\d+$/.test(s.trim())
  const isHandle = (s:string)=> /^@?[a-z0-9_]+$/i.test(s.trim()) && s.trim().replace(/^@/,'').length>0

  async function run() {
    setLoading(true); setError(null); setData(null)
    const raw = q.trim()

    // Free-plan friendly: exact lookup by @handle or FID
    if (isFID(raw) || isHandle(raw)) {
      const params = isFID(raw) ? `fid=${encodeURIComponent(raw)}` :
        `username=${encodeURIComponent(raw.replace(/^@/, ''))}`
      const res = await fetch(`/api/users/get?${params}`)
      if (!res.ok) {
        const text = await res.text().catch(()=> '')
        setError(`Error ${res.status}: ${text || 'lookup failed'}`)
        setLoading(false)
        return
      }
      const json = await res.json()
      setData(json?.user ? { items: [json.user] } : { items: [] })
      setLoading(false)
      return
    }

    // Fallback: full-text search (may 402 on Beginner plan)
    const res = await fetch(`/api/users/search?q=${encodeURIComponent(raw)}`)
    if (!res.ok) {
      const text = await res.text().catch(()=> '')
      setError(`Error ${res.status}: ${text || 'search failed'}`)
      setLoading(false)
      return
    }
    setData(await res.json())
    setLoading(false)
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Find Users</h2>
      <p className="text-sm text-gray-600">
        Tip: try an <b>@handle</b> or a <b>FID</b> for exact lookup (works on the free plan). Full-text search may require a paid tier.
      </p>
      <div className="flex gap-2">
        <input
          value={q}
          onChange={e=>setQ(e.target.value)}
          placeholder="@v  or  2  or  'varun'"
          className="w-full rounded border p-2"
        />
        <button
          onClick={run}
          className="rounded bg-black px-3 py-2 text-white disabled:opacity-50"
          disabled={!q || loading}
        >
          Search
        </button>
      </div>

      {loading && <p>Loading…</p>}

      {error && (
        <div className="rounded border border-yellow-300 bg-yellow-50 p-3 text-sm text-yellow-800">
          {error.includes('402')
            ? 'Full-text search is gated on the current Neynar plan. Exact lookups by @handle or FID still work.'
            : error}
        </div>
      )}

      {data && (
        <ul className="divide-y">
          {data.items?.map((u:any)=> (
            <li key={u.fid} className="py-3">
              <div className="flex items-center gap-3">
                {u.pfpUrl && <img src={u.pfpUrl} alt="" className="h-10 w-10 rounded-full" />}
                <div>
                  <div className="font-medium">{u.displayName || u.username}</div>
                  <div className="text-sm text-gray-600">@{u.username} · fid {u.fid}</div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
