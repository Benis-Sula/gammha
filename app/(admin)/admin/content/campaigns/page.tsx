'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import AdminPageHeader from '@/components/admin/AdminPageHeader'
import AdminCard from '@/components/admin/AdminCard'
import AdminFormField from '@/components/admin/AdminFormField'
import AdminArrayField from '@/components/admin/AdminArrayField'
import AdminSaveButton from '@/components/admin/AdminSaveButton'
import AdminDeleteDialog from '@/components/admin/AdminDeleteDialog'
import AdminEmptyState from '@/components/admin/AdminEmptyState'
import AdminListSkeleton from '@/components/admin/AdminListSkeleton'
import AdminStatusBadge from '@/components/admin/AdminStatusBadge'
import { Plus, Pencil, Trash2 } from 'lucide-react'

interface Campaign { id: string; title: string; status: string; description: string; goals: string[]; order: number }
type FormData = { title: string; status: string; description: string }

export default function CampaignsPage() {
  const [items, setItems] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Campaign | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [goals, setGoals] = useState<string[]>([])
  const [deleteTarget, setDeleteTarget] = useState<Campaign | null>(null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>()

  async function load() {
    const res = await fetch('/api/admin/campaigns')
    setItems(await res.json())
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  function openCreate() {
    setEditing(null)
    setGoals([''])
    reset({ title: '', status: 'Active', description: '' })
    setShowForm(true)
  }

  function openEdit(c: Campaign) {
    setEditing(c)
    setGoals(c.goals.length ? c.goals : [''])
    reset({ title: c.title, status: c.status, description: c.description })
    setShowForm(true)
  }

  async function onSubmit(data: FormData) {
    setSaved(false)
    setSaving(true)
    const url = editing ? `/api/admin/campaigns/${editing.id}` : '/api/admin/campaigns'
    const method = editing ? 'PATCH' : 'POST'
    await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...data, goals: goals.filter(Boolean) }) })
    setSaving(false)
    setSaved(true)
    setShowForm(false)
    load()
  }

  async function confirmDelete() {
    if (!deleteTarget) return
    setDeleting(true)
    await fetch(`/api/admin/campaigns/${deleteTarget.id}`, { method: 'DELETE' })
    setDeleting(false)
    setDeleteTarget(null)
    load()
  }

  return (
    <div className="max-w-3xl">
      <AdminPageHeader
        title="Campaigns"
        description="Manage advocacy campaigns shown on the Advocacy page."
        action={
          <button onClick={openCreate} className="inline-flex items-center gap-2 h-10 px-4 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors cursor-pointer">
            <Plus className="w-4 h-4" /> Add campaign
          </button>
        }
      />

      {showForm && (
        <AdminCard title={editing ? 'Edit campaign' : 'Add campaign'} className="mb-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <AdminFormField label="Title" name="title" required register={register('title', { required: 'Required' })} error={errors.title?.message} />
            <AdminFormField
              label="Status"
              name="status"
              type="select"
              options={[{ value: 'Active', label: 'Active' }, { value: 'Ongoing', label: 'Ongoing' }, { value: 'Completed', label: 'Completed' }]}
              register={register('status')}
            />
            <AdminFormField label="Description" name="description" type="textarea" rows={3} required register={register('description', { required: 'Required' })} error={errors.description?.message} />
            <AdminArrayField label="Campaign Goals" items={goals} onChange={setGoals} placeholder="e.g. Increase awareness in 5 regions" />
            <div className="flex justify-end gap-3 pt-2">
              <button type="button" onClick={() => setShowForm(false)} className="h-10 px-4 rounded-lg border border-border text-sm text-text hover:bg-gray-50 transition-colors cursor-pointer">Cancel</button>
              <AdminSaveButton isLoading={saving} saved={saved} />
            </div>
          </form>
        </AdminCard>
      )}

      <AdminCard title="Campaigns" description={`${items.length} campaign${items.length !== 1 ? 's' : ''}`}>
        {loading ? <AdminListSkeleton rows={3} /> : items.length === 0 ? (
          <AdminEmptyState title="No campaigns" description="Add your first campaign above." />
        ) : (
          <ul className="divide-y divide-border/50">
            {items.map((c) => (
              <li key={c.id} className="py-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-medium text-text text-sm">{c.title}</p>
                      <AdminStatusBadge status={c.status} />
                    </div>
                    <p className="text-text-muted text-xs mt-1 line-clamp-2">{c.description}</p>
                    {c.goals.length > 0 && (
                      <p className="text-text-muted text-xs mt-1">{c.goals.length} goal{c.goals.length !== 1 ? 's' : ''}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button onClick={() => openEdit(c)} className="w-9 h-9 rounded-lg border border-border text-text-muted hover:text-primary hover:border-primary/40 transition-colors flex items-center justify-center cursor-pointer" aria-label="Edit"><Pencil className="w-3.5 h-3.5" /></button>
                    <button onClick={() => setDeleteTarget(c)} className="w-9 h-9 rounded-lg border border-border text-text-muted hover:text-red-600 hover:border-red-200 transition-colors flex items-center justify-center cursor-pointer" aria-label="Delete"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </AdminCard>

      <AdminDeleteDialog isOpen={!!deleteTarget} itemName={deleteTarget?.title} onConfirm={confirmDelete} onCancel={() => setDeleteTarget(null)} isLoading={deleting} />
    </div>
  )
}
