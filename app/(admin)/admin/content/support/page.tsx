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
import { Plus, Pencil, Trash2 } from 'lucide-react'

interface Channel { id: string; iconName: string; title: string; description: string; action: string; href: string; availability: string }
type FormData = { iconName: string; title: string; description: string; action: string; href: string; availability: string }

export default function SupportPage() {
  const [items, setItems] = useState<Channel[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Channel | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<Channel | null>(null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>()

  async function load() { const res = await fetch('/api/admin/support-channels'); setItems(await res.json()); setLoading(false) }
  useEffect(() => { load() }, [])

  function openCreate() { setEditing(null); reset({ iconName: '', title: '', description: '', action: '', href: '', availability: '' }); setShowForm(true) }
  function openEdit(c: Channel) { setEditing(c); reset(c); setShowForm(true) }

  async function onSubmit(data: FormData) {
    setSaved(false)
    setSaving(true)
    const url = editing ? `/api/admin/support-channels/${editing.id}` : '/api/admin/support-channels'
    await fetch(url, { method: editing ? 'PATCH' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
    setSaving(false); setSaved(true); setShowForm(false); load()
  }

  async function confirmDelete() {
    if (!deleteTarget) return
    setDeleting(true)
    await fetch(`/api/admin/support-channels/${deleteTarget.id}`, { method: 'DELETE' })
    setDeleting(false); setDeleteTarget(null); load()
  }

  return (
    <div className="max-w-3xl">
      <AdminPageHeader title="Support Channels" description="Manage phone, WhatsApp, and email support channels."
        action={<button onClick={openCreate} className="inline-flex items-center gap-2 h-10 px-4 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors cursor-pointer"><Plus className="w-4 h-4" /> Add channel</button>}
      />
      {showForm && (
        <AdminCard title={editing ? 'Edit channel' : 'Add channel'} className="mb-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <AdminFormField label="Icon name (Lucide)" name="iconName" required register={register('iconName', { required: 'Required' })} error={errors.iconName?.message} placeholder="Phone" />
              <AdminFormField label="Title" name="title" required register={register('title', { required: 'Required' })} error={errors.title?.message} />
            </div>
            <AdminFormField label="Description" name="description" type="textarea" rows={2} register={register('description')} />
            <div className="grid grid-cols-2 gap-4">
              <AdminFormField label="Button label" name="action" required register={register('action', { required: 'Required' })} error={errors.action?.message} placeholder="Call Now" />
              <AdminFormField label="Link (href)" name="href" register={register('href')} placeholder="tel:+2201234567" />
            </div>
            <AdminFormField label="Availability" name="availability" register={register('availability')} placeholder="Monâ€“Fri, 8amâ€“6pm" />
            <div className="flex justify-end gap-3 pt-2">
              <button type="button" onClick={() => setShowForm(false)} className="h-10 px-4 rounded-lg border border-border text-sm text-text hover:bg-gray-50 transition-colors cursor-pointer">Cancel</button>
              <AdminSaveButton isLoading={saving} saved={saved} />
            </div>
          </form>
        </AdminCard>
      )}
      <AdminCard title="Channels" description={`${items.length} channel${items.length !== 1 ? 's' : ''}`}>
        {loading ? <AdminListSkeleton rows={3} /> : items.length === 0 ? <AdminEmptyState title="No channels" /> : (
          <ul className="divide-y divide-border/50">
            {items.map((c) => (
              <li key={c.id} className="flex items-start gap-4 py-3">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-text text-sm">{c.title}</p>
                  <p className="text-text-muted text-xs mt-0.5">{c.availability}</p>
                </div>
                <div className="flex gap-1 shrink-0">
                  <button onClick={() => openEdit(c)} className="w-8 h-8 rounded-lg border border-border text-text-muted hover:text-primary hover:border-primary/40 transition-colors flex items-center justify-center cursor-pointer" aria-label="Edit"><Pencil className="w-3.5 h-3.5" /></button>
                  <button onClick={() => setDeleteTarget(c)} className="w-8 h-8 rounded-lg border border-border text-text-muted hover:text-red-600 hover:border-red-200 transition-colors flex items-center justify-center cursor-pointer" aria-label="Delete"><Trash2 className="w-3.5 h-3.5" /></button>
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
