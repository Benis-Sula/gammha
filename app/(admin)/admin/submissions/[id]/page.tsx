'use client'

export const dynamic = "force-dynamic";


import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import AdminStatusBadge from '@/components/admin/AdminStatusBadge'
import { ArrowLeft, CheckCircle, Trash2 } from 'lucide-react'

interface Submission {
  id: string; firstName: string; lastName?: string; email: string
  subject?: string; message: string; read: boolean; createdAt: string
}

export default function SubmissionDetailPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [submission, setSubmission] = useState<Submission | null>(null)
  const [loading, setLoading] = useState(true)
  const [marking, setMarking] = useState(false)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    fetch(`/api/admin/submissions/${id}`).then((r) => r.json()).then((data) => {
      setSubmission(data)
      setLoading(false)
    })
  }, [id])

  async function markRead() {
    setMarking(true)
    await fetch(`/api/admin/submissions/${id}`, { method: 'PATCH' })
    setMarking(false)
    setSubmission((s) => s ? { ...s, read: true } : s)
  }

  async function deleteSubmission() {
    if (!confirm('Delete this submission?')) return
    setDeleting(true)
    await fetch(`/api/admin/submissions/${id}`, { method: 'DELETE' })
    router.push('/admin/submissions')
  }

  if (loading) return <p className="text-text-muted text-sm p-6">Loading…</p>
  if (!submission) return <p className="text-text-muted text-sm p-6">Not found</p>

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/submissions" className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text transition-colors cursor-pointer">
          <ArrowLeft className="w-4 h-4" /> Back to submissions
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-border/50 shadow-card p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-5">
          <div>
            <h2 className="font-heading font-bold text-text text-lg">
              {submission.firstName} {submission.lastName}
            </h2>
            <p className="text-text-muted text-sm mt-0.5">{submission.email}</p>
          </div>
          <AdminStatusBadge status={submission.read ? 'Read' : 'Unread'} />
        </div>

        {/* Meta */}
        <dl className="grid grid-cols-2 gap-3 mb-5 text-sm">
          <div>
            <dt className="text-text-muted text-xs uppercase tracking-wide font-medium">Subject</dt>
            <dd className="text-text mt-0.5">{submission.subject ?? 'General enquiry'}</dd>
          </div>
          <div>
            <dt className="text-text-muted text-xs uppercase tracking-wide font-medium">Date</dt>
            <dd className="text-text mt-0.5">{new Date(submission.createdAt).toLocaleString()}</dd>
          </div>
        </dl>

        {/* Message */}
        <div className="bg-surface-alt rounded-xl p-4 mb-6">
          <p className="text-xs text-text-muted uppercase tracking-wide font-medium mb-2">Message</p>
          <p className="text-text text-sm whitespace-pre-wrap leading-relaxed">{submission.message}</p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {!submission.read && (
            <button
              onClick={markRead}
              disabled={marking}
              className="inline-flex items-center gap-2 h-9 px-4 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors disabled:opacity-60 cursor-pointer"
            >
              <CheckCircle className="w-4 h-4" />
              {marking ? 'Marking…' : 'Mark as read'}
            </button>
          )}
          <a
            href={`mailto:${submission.email}`}
            className="inline-flex items-center gap-2 h-9 px-4 rounded-lg border border-border text-sm text-text hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Reply by email
          </a>
          <button
            onClick={deleteSubmission}
            disabled={deleting}
            className="ml-auto inline-flex items-center gap-2 h-9 px-3 rounded-lg border border-border text-sm text-red-600 hover:bg-red-50 hover:border-red-200 transition-colors disabled:opacity-60 cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            {deleting ? 'Deleting…' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  )
}
