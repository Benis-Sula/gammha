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

interface ValueCard { id: string; iconName: string; title: string; description: string; order: number }
type FormData = { iconName: string; title: string; description: string }

export default function ValueCardsPage() {
  const [items, setItems] = useState<ValueCard[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<ValueCard | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<ValueCard | null>(null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>()

  async function load() { const res = await fetch('/api/admin/value-cards'); setItems(await res.json()); setLoading(false) }
  useEffect(() => { load() }, [])

  function openCreate() { setEditing(null); reset({ iconName: '', title: '', description: '' }); setShowForm(true) }
  function openEdit(v: ValueCard) { setEditing(v); reset({ iconName: v.iconName, title: v.title, description: v.description }); setShowForm(true) }

  async function onSubmit(data: FormData) {
    setSaved(false); setSaving(true)
    const url = editing ? `/api/admin/value-cards/${editing.id}` : '/api/admin/value-cards'
    await fetch(url, { method: editing ? 'PATCH' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
    setSaving(false); setSaved(true); setShowForm(false); load()
  }

  async function confirmDelete() {
    if (!deleteTarget) return
    setDeleting(true)
    await fetch(`/api/admin/value-cards/${deleteTarget.id}`, { method: 'DELETE' })
    setDeleting(false); setDeleteTarget(null); load()
  }

  return (
    <div className="max-w-3xl">
      <AdminPageHeader
        title="Value Cards"
        description="Manage the 'Our Values' cards on the About page (Empathy, Advocacy, Community, Integrity)."
        action={
          <div className="flex items-center gap-2">
            <a href="/about" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 h-10 px-3 rounded-lg border border-border text-sm text-text-muted hover:text-text hover:bg-gray-50 transition-colors">
              <ExternalLink className="w-3.5 h-3.5" />
              View page
            </a>
            <button onClick={openCreate} className="inline-flex items-center gap-2 h-10 px-4 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors cursor-pointer">
              <Plus className="w-4 h-4" /> Add card
            </button>
          </div>
        }
      />

      {showForm && (
        <AdminCard title={editing ? 'Edit value card' : 'Add value card'} className="mb-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <AdminFormField label="Icon name (Lucide)" name="iconName" required register={register('iconName', { required: 'Required' })} error={errors.iconName?.message} placeholder="Heart" />
              <AdminFormField label="Title" name="title" required register={register('title', { required: 'Required' })} error={errors.title?.message} />
            </div>
            <AdminFormField label="Description" name="description" type="textarea" rows={2} required register={register('description', { required: 'Required' })} error={errors.description?.message} />
            <div className="flex justify-end gap-3 pt-2">
              <button type="button" onClick={() => setShowForm(false)} className="h-10 px-4 rounded-lg border border-border text-sm text-text hover:bg-gray-50 transition-colors cursor-pointer">Cancel</button>
              <AdminSaveButton isLoading={saving} saved={saved} />
            </div>
          </form>
        </AdminCard>
      )}

      <AdminCard title="Value Cards" description={`${items.length} card${items.length !== 1 ? 's' : ''}`}>
        {loading ? <AdminListSkeleton rows={4} /> : items.length === 0 ? <AdminEmptyState title="No value cards" /> : (
          <ul className="divide-y divide-border/50">
            {items.map((v) => (
              <li key={v.id} className="flex items-start gap-4 py-3">
                <div className="w-9 h-9 rounded-lg bg-surface-alt flex items-center justify-center text-xs font-mono text-text-muted shrink-0">{v.iconName.slice(0, 2)}</div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-text text-sm">{v.title}</p>
                  <p className="text-text-muted text-xs mt-0.5 line-clamp-2">{v.description}</p>
                </div>
                <div className="flex gap-1 shrink-0">
                  <button onClick={() => openEdit(v)} className="w-8 h-8 rounded-lg border border-border text-text-muted hover:text-primary hover:border-primary/40 transition-colors flex items-center justify-center cursor-pointer" aria-label="Edit"><Pencil className="w-3.5 h-3.5" /></button>
                  <button onClick={() => setDeleteTarget(v)} className="w-8 h-8 rounded-lg border border-border text-text-muted hover:text-red-600 hover:border-red-200 transition-colors flex items-center justify-center cursor-pointer" aria-label="Delete"><Trash2 className="w-3.5 h-3.5" /></button>
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
