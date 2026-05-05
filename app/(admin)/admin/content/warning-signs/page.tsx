'use client'

export const dynamic = "force-dynamic";

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import AdminPageHeader from '@/components/admin/AdminPageHeader'
import AdminCard from '@/components/admin/AdminCard'
import AdminFormField from '@/components/admin/AdminFormField'
import AdminSaveButton from '@/components/admin/AdminSaveButton'
import AdminDeleteDialog from '@/components/admin/AdminDeleteDialog'
import AdminEmptyState from '@/components/admin/AdminEmptyState'
import AdminListSkeleton from '@/components/admin/AdminListSkeleton'
import { Plus, Pencil, Trash2, ExternalLink } from 'lucide-react'

interface WarnSign { id: string; text: string; group: 'warning' | 'also-seek'; order: number }
type FormData = { text: string; group: 'warning' | 'also-seek' }

const GROUP_LABELS: Record<string, string> = {
  warning: 'Warning Signs',
  'also-seek': 'Also Seek Help',
}

export default function WarningSigns() {
  const [items, setItems] = useState<WarnSign[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<WarnSign | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<WarnSign | null>(null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    defaultValues: { text: '', group: 'warning' },
  })

  async function load() {
    const res = await fetch('/api/admin/warning-signs')
    setItems(await res.json())
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  function openCreate() {
    setEditing(null)
    reset({ text: '', group: 'warning' })
    setShowForm(true)
  }

  function openEdit(s: WarnSign) {
    setEditing(s)
    reset({ text: s.text, group: s.group })
    setShowForm(true)
  }

  async function onSubmit(data: FormData) {
    setSaved(false)
    setSaving(true)
    const url = editing ? `/api/admin/warning-signs/${editing.id}` : '/api/admin/warning-signs'
    const method = editing ? 'PATCH' : 'POST'
    await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
    setSaving(false)
    setSaved(true)
    setShowForm(false)
    load()
  }

  async function confirmDelete() {
    if (!deleteTarget) return
    setDeleting(true)
    await fetch(`/api/admin/warning-signs/${deleteTarget.id}`, { method: 'DELETE' })
    setDeleting(false)
    setDeleteTarget(null)
    load()
  }

  const warningItems = items.filter((s) => s.group === 'warning')
  const alsoSeekItems = items.filter((s) => s.group === 'also-seek')

  function SignList({ signs, group }: { signs: WarnSign[]; group: string }) {
    if (signs.length === 0) {
      return <AdminEmptyState title={`No ${GROUP_LABELS[group].toLowerCase()} yet`} description="Add signs using the form above." />
    }
    return (
      <ul className="divide-y divide-border/50">
        {signs.map((s) => (
          <li key={s.id} className="flex items-center gap-4 py-3">
            <div className="flex-1 min-w-0">
              <p className="text-sm text-text">{s.text}</p>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={() => openEdit(s)}
                className="w-9 h-9 rounded-lg border border-border text-text-muted hover:text-primary hover:border-primary/40 transition-colors flex items-center justify-center cursor-pointer"
                aria-label="Edit"
              >
                <Pencil className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setDeleteTarget(s)}
                className="w-9 h-9 rounded-lg border border-border text-text-muted hover:text-red-600 hover:border-red-200 transition-colors flex items-center justify-center cursor-pointer"
                aria-label="Delete"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <div className="max-w-3xl">
      <AdminPageHeader
        title="Warning Signs"
        description="Manage warning signs displayed on the Mental Health page."
        action={
          <div className="flex items-center gap-2">
            <a
              href="/mental-health"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 h-10 px-3 rounded-lg border border-border text-sm text-text-muted hover:text-text hover:bg-gray-50 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              View page
            </a>
            <button
              onClick={openCreate}
              className="inline-flex items-center gap-2 h-10 px-4 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Add sign
            </button>
          </div>
        }
      />

      {/* Form */}
      {showForm && (
        <AdminCard title={editing ? 'Edit sign' : 'Add sign'} className="mb-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <AdminFormField
              label="Sign text"
              name="text"
              type="textarea"
              rows={2}
              required
              register={register('text', { required: 'Required' })}
              error={errors.text?.message}
              placeholder="e.g. Persistent sadness lasting more than two weeks"
            />
            <AdminFormField
              label="Group"
              name="group"
              type="select"
              required
              register={register('group', { required: 'Required' })}
              options={[
                { value: 'warning', label: 'Warning Signs' },
                { value: 'also-seek', label: 'Also Seek Help' },
              ]}
            />
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="h-10 px-4 rounded-lg border border-border text-sm text-text hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <AdminSaveButton isLoading={saving} saved={saved} />
            </div>
          </form>
        </AdminCard>
      )}

      {/* Two group sections */}
      {loading ? (
        <AdminListSkeleton rows={4} />
      ) : (
        <div className="space-y-6">
          <AdminCard
            title="Warning Signs"
            description={`${warningItems.length} sign${warningItems.length !== 1 ? 's' : ''} — shown in the red alert box`}
          >
            <SignList signs={warningItems} group="warning" />
          </AdminCard>

          <AdminCard
            title="Also Seek Help"
            description={`${alsoSeekItems.length} sign${alsoSeekItems.length !== 1 ? 's' : ''} — shown in the secondary box`}
          >
            <SignList signs={alsoSeekItems} group="also-seek" />
          </AdminCard>
        </div>
      )}

      <AdminDeleteDialog
        isOpen={!!deleteTarget}
        itemName={deleteTarget ? deleteTarget.text.slice(0, 60) : undefined}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
        isLoading={deleting}
      />
    </div>
  )
}
