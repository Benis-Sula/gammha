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

interface Stat { id: string; group: string; value: string; label: string; order: number }
type FormData = { group: string; value: string; label: string }

export default function StatsPage() {
  const [items, setItems] = useState<Stat[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Stat | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<Stat | null>(null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>()

  async function load() { const res = await fetch('/api/admin/stats'); setItems(await res.json()); setLoading(false) }
  useEffect(() => { load() }, [])

  function openCreate() { setEditing(null); reset({ group: 'homepage', value: '', label: '' }); setShowForm(true) }
  function openEdit(s: Stat) { setEditing(s); reset({ group: s.group, value: s.value, label: s.label }); setShowForm(true) }

  async function onSubmit(data: FormData) {
    setSaved(false)
    setSaving(true)
    const url = editing ? `/api/admin/stats/${editing.id}` : '/api/admin/stats'
    await fetch(url, { method: editing ? 'PATCH' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
    setSaving(false); setSaved(true); setShowForm(false); load()
  }

  async function confirmDelete() {
    if (!deleteTarget) return
    setDeleting(true)
    await fetch(`/api/admin/stats/${deleteTarget.id}`, { method: 'DELETE' })
    setDeleting(false); setDeleteTarget(null); load()
  }

  const grouped = items.reduce<Record<string, Stat[]>>((acc, s) => { (acc[s.group] ??= []).push(s); return acc }, {})

  return (
    <div className="max-w-3xl">
      <AdminPageHeader title="Statistics" description="Edit key statistics shown on the homepage and about page."
        action={<button onClick={openCreate} className="inline-flex items-center gap-2 h-10 px-4 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors cursor-pointer"><Plus className="w-4 h-4" /> Add stat</button>}
      />
      {showForm && (
        <AdminCard title={editing ? 'Edit statistic' : 'Add statistic'} className="mb-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <AdminFormField label="Page group" name="group" type="select"
              options={[{ value: 'homepage', label: 'Homepage' }, { value: 'about', label: 'About page' }]}
              register={register('group')} />
            <div className="grid grid-cols-2 gap-4">
              <AdminFormField label="Value" name="value" required register={register('value', { required: 'Required' })} error={errors.value?.message} placeholder="1 in 5" />
              <AdminFormField label="Label" name="label" required register={register('label', { required: 'Required' })} error={errors.label?.message} placeholder="mothers affected" />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button type="button" onClick={() => setShowForm(false)} className="h-10 px-4 rounded-lg border border-border text-sm text-text hover:bg-gray-50 transition-colors cursor-pointer">Cancel</button>
              <AdminSaveButton isLoading={saving} saved={saved} />
            </div>
          </form>
        </AdminCard>
      )}
      {loading ? <AdminListSkeleton rows={3} /> : Object.keys(grouped).length === 0 ? (
        <AdminCard><AdminEmptyState title="No statistics" description="Add your first statistic above." /></AdminCard>
      ) : (
        Object.entries(grouped).map(([group, stats]) => (
          <AdminCard key={group} title={group === 'homepage' ? 'Homepage' : 'About page'} className="mb-4">
            <ul className="divide-y divide-border/50">
              {stats.map((s) => (
                <li key={s.id} className="flex items-center gap-4 py-3">
                  <div className="flex-1 min-w-0">
                    <span className="font-bold text-primary text-lg">{s.value}</span>
                    <span className="text-text-muted text-sm ml-2">{s.label}</span>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <button onClick={() => openEdit(s)} className="w-8 h-8 rounded-lg border border-border text-text-muted hover:text-primary hover:border-primary/40 transition-colors flex items-center justify-center cursor-pointer" aria-label="Edit"><Pencil className="w-3.5 h-3.5" /></button>
                    <button onClick={() => setDeleteTarget(s)} className="w-8 h-8 rounded-lg border border-border text-text-muted hover:text-red-600 hover:border-red-200 transition-colors flex items-center justify-center cursor-pointer" aria-label="Delete"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </li>
              ))}
            </ul>
          </AdminCard>
        ))
      )}
      <AdminDeleteDialog isOpen={!!deleteTarget} itemName={deleteTarget?.label} onConfirm={confirmDelete} onCancel={() => setDeleteTarget(null)} isLoading={deleting} />
    </div>
  )
}
