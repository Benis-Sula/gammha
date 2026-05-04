'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import AdminPageHeader from '@/components/admin/AdminPageHeader'
import AdminEmptyState from '@/components/admin/AdminEmptyState'
import AdminStatusBadge from '@/components/admin/AdminStatusBadge'

interface Submission {
  id: string; firstName: string; lastName?: string; email: string
  subject?: string; message: string; read: boolean; createdAt: string
}

interface Response { items: Submission[]; total: number; page: number; pages: number }

export default function SubmissionsPage() {
  const [data, setData] = useState<Response | null>(null)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)

  async function load(p = 1) {
    setLoading(true)
    const res = await fetch(`/api/admin/submissions?page=${p}`)
    setData(await res.json())
    setLoading(false)
  }

  useEffect(() => { load(page) }, [page])

  return (
    <div className="max-w-3xl">
      <AdminPageHeader title="Submissions" description="Contact form messages from visitors." />

      <div className="bg-white rounded-xl border border-border/50 shadow-card overflow-hidden">
        {loading ? (
          <p className="text-text-muted text-sm p-6">Loading…</p>
        ) : !data || data.items.length === 0 ? (
          <AdminEmptyState title="No submissions yet" description="Contact form submissions will appear here." />
        ) : (
          <>
            <ul className="divide-y divide-border/50">
              {data.items.map((s) => (
                <li key={s.id}>
                  <Link
                    href={`/admin/submissions/${s.id}`}
                    className="flex items-start gap-3 px-5 py-4 hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    {!s.read && <span className="w-2 h-2 rounded-full bg-accent shrink-0 mt-1.5" aria-label="Unread" />}
                    <div className={`flex-1 min-w-0 ${s.read ? 'pl-5' : ''}`}>
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className={`text-sm truncate ${!s.read ? 'font-semibold text-text' : 'text-text'}`}>
                          {s.firstName} {s.lastName}
                        </p>
                        <AdminStatusBadge status={s.read ? 'Read' : 'Unread'} />
                      </div>
                      <p className="text-text-muted text-xs mt-0.5">{s.email}</p>
                      {s.subject && <p className="text-text-muted text-xs mt-0.5 truncate">{s.subject}</p>}
                    </div>
                    <time className="text-xs text-text-muted shrink-0 mt-0.5">
                      {new Date(s.createdAt).toLocaleDateString()}
                    </time>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Pagination */}
            {data.pages > 1 && (
              <div className="flex items-center justify-between px-5 py-3 border-t border-border/50">
                <p className="text-xs text-text-muted">{data.total} total</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPage(page - 1)}
                    disabled={page <= 1}
                    className="h-8 px-3 rounded-lg border border-border text-xs text-text hover:bg-gray-50 transition-colors disabled:opacity-40 cursor-pointer"
                  >
                    Previous
                  </button>
                  <span className="h-8 px-3 flex items-center text-xs text-text-muted">
                    {page} / {data.pages}
                  </span>
                  <button
                    onClick={() => setPage(page + 1)}
                    disabled={page >= data.pages}
                    className="h-8 px-3 rounded-lg border border-border text-xs text-text hover:bg-gray-50 transition-colors disabled:opacity-40 cursor-pointer"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
