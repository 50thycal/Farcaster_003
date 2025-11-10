'use client'
import { useState } from 'react'

export default function GraphPage() {
  const [fid, setFid] = useState('')
  const [tab, setTab] = useState<'followers'|'following'>('followers')
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  async function load(cursor = '') {
    setLoading(true)
    const path = tab === 'followers' ? '/api/graph/followers' : '/api/graph/following'
    const url = `${path}?fid=${fid}${cursor ? `&cursor=${cursor}`:''}`
    const res = await fetch(url)
    const json = await res.json()
    setData(json); setLoading(false)
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Social Graph</h2>
      <div className="flex gap-2">
        <input value={fid} onChange={e=>setFid(e.target.value)} placeholder="FID (number)" className="w-full rounded border p-2" />
        <button onClick={()=>load()} className="rounded bg-black px-3 py-2 text-white disabled:opacity-50" disabled={!fid || loading}>Load</button>
      </div>
      <div className="flex gap-3 text-sm">
        <button onClick={()=>setTab('followers')} className={tab==='followers'?'font-semibold underline':''}>Followers</button>
        <button onClick={()=>setTab('following')} className={tab==='following'?'font-semibold underline':''}>Following</button>
      </div>
      {loading && <p>Loading…</p>}
      {data && (
        <>
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
          {data.nextCursor && (
            <button onClick={()=>load(data.nextCursor)} className="mt-3 rounded border px-3 py-2">Load more</button>
          )}
        </>
      )}
    </div>
  )
}
