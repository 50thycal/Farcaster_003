'use client'
import { useState } from 'react'

export default function UsersPage() {
  const [q, setQ] = useState('')
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  async function search() {
    setLoading(true)
    const res = await fetch(`/api/users/search?q=${encodeURIComponent(q)}`)
    const json = await res.json()
    setData(json); setLoading(false)
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Find Users</h2>
      <div className="flex gap-2">
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="@handle or name" className="w-full rounded border p-2" />
        <button onClick={search} className="rounded bg-black px-3 py-2 text-white disabled:opacity-50" disabled={!q || loading}>Search</button>
      </div>
      {loading && <p>Loading…</p>}
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
