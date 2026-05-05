'use client'

export const dynamic = "force-dynamic";


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
import { Plus, Pencil, Trash2, ExternalLink } from 'lucide-react'

interface Condition { id: string; slug: string; title: string; description: string; signs: string[]; note: string; order: number }
type FormData = { slug: string; title: string; description: string; note: string }

export default function ConditionsPage() {
  const [items, setItems] = useState<Condition[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Condition | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [signs, setSigns] = useState<string[]>([''])
  const [deleteTarget, setDeleteTarget] = useState<Condition | null>(null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>()

  async function load() { const res = await fetch('/api/admin/conditions'); setItems(await res.json()); setLoading(false) }
  useEffect(() => { load() }, [])

  function openCreate() { setEditing(null); setSigns(['']); reset({ slug: '', title: '', description: '', note: '' }); setShowForm(true) }
  function openEdit(c: Condition) { setEditing(c); setSigns(c.signs.length ? c.signs : ['']); reset({ slug: c.slug, title: c.title, description: c.description, note: c.note }); setShowForm(true) }

  async function onSubmit(data: FormData) {
    setSaved(false)
    setSaving(true)
    const url = editing ? `/api/admin/conditions/${editing.id}` : '/api/admin/conditions'
    await fetch(url, { method: editing ? 'PATCH' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...data, signs: signs.filter(Boolean) }) })
    setSaving(false); setSaved(true); setShowForm(false); load()
  }

  async function confirmDelete() {
    if (!deleteTarget) return
    setDeleting(true)
    await fetch(`/api/admin/conditions/${deleteTarget.id}`, { method: 'DELETE' })
    setDeleting(false); setDeleteTarget(null); load()
  }

  return (
    <div className="max-w-3xl">
      <AdminPageHeader title="Health Conditions" description="Manage maternal health conditions shown on the Mental Health page."
        action={
          <div className="flex items-center gap-2">
            <a href="/mental-health" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 h-10 px-3 rounded-lg border border-border text-sm text-text-muted hover:text-text hover:bg-gray-50 transition-colors">
              <ExternalLink className="w-3.5 h-3.5" />
              View page
            </a>
            <button onClick={openCreate} className="inline-flex items-center gap-2 h-10 px-4 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors cursor-pointer"><Plus className="w-4 h-4" /> Add condition</button>
          </div>
        }
      />
      {showForm && (
        <AdminCard title={editing ? 'Edit condition' : 'Add condition'} className="mb-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <AdminFormField label="Slug" name="slug" required register={register('slug', { required: 'Required' })} error={errors.slug?.message} placeholder="postpartum-depression" />
              <AdminFormField label="Title" name="title" required register={register('title', { required: 'Required' })} error={errors.title?.message} placeholder="Postpartum Depression" />
            </div>
            <AdminFormField label="Description" name="description" type="textarea" rows={3} required register={register('description', { required: 'Required' })} error={errors.description?.message} />
            <AdminArrayField label="Signs & Symptoms" items={signs} onChange={setSigns} placeholder="e.g. Persistent sadness or low mood" />
            <AdminFormField label="Note / Advisory" name="note" type="textarea" rows={2} register={register('note')} placeholder="Additional guidanceâ€¦" />
            <div className="flex justify-end gap-3 pt-2">
              <button type="button" onClick={() => setShowForm(false)} className="h-10 px-4 rounded-lg border border-border text-sm text-text hover:bg-gray-50 transition-colors cursor-pointer">Cancel</button>
              <AdminSaveButton isLoading={saving} saved={saved} />
            </div>
          </form>
        </AdminCard>
      )}
      <AdminCard title="Conditions" description={`${items.length} condition${items.length !== 1 ? 's' : ''}`}>
        {loading ? <AdminListSkeleton rows={3} /> : items.length === 0 ? <AdminEmptyState title="No conditions" /> : (
          <ul className="divide-y divide-border/50">
            {items.map((c) => (
              <li key={c.id} className="flex items-start gap-4 py-4">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-text text-sm">{c.title}</p>
                  <p className="text-text-muted text-xs mt-0.5">{c.signs.length} signs listed</p>
                  <p className="text-text-muted text-xs mt-1 line-clamp-2">{c.description}</p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button onClick={() => openEdit(c)} className="w-9 h-9 rounded-lg border border-border text-text-muted hover:text-primary hover:border-primary/40 transition-colors flex items-center justify-center cursor-pointer" aria-label="Edit"><Pencil className="w-3.5 h-3.5" /></button>
                  <button onClick={() => setDeleteTarget(c)} className="w-9 h-9 rounded-lg border border-border text-text-muted hover:text-red-600 hover:border-red-200 transition-colors flex items-center justify-center cursor-pointer" aria-label="Delete"><Trash2 className="w-3.5 h-3.5" /></button>
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
