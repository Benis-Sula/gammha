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

interface Tier { id: string; amount: string; numericAmount: number; headline: string; impact: string; order: number }
type FormData = { amount: string; numericAmount: number; headline: string; impact: string }

export default function DonatePage() {
  const [items, setItems] = useState<Tier[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Tier | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<Tier | null>(null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>()

  async function load() { const res = await fetch('/api/admin/donation-tiers'); setItems(await res.json()); setLoading(false) }
  useEffect(() => { load() }, [])

  function openCreate() { setEditing(null); reset({ amount: '', numericAmount: 0, headline: '', impact: '' }); setShowForm(true) }
  function openEdit(t: Tier) { setEditing(t); reset({ amount: t.amount, numericAmount: t.numericAmount, headline: t.headline, impact: t.impact }); setShowForm(true) }

  async function onSubmit(data: FormData) {
    setSaved(false)
    setSaving(true)
    const url = editing ? `/api/admin/donation-tiers/${editing.id}` : '/api/admin/donation-tiers'
    await fetch(url, { method: editing ? 'PATCH' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...data, numericAmount: Number(data.numericAmount) }) })
    setSaving(false); setSaved(true); setShowForm(false); load()
  }

  async function confirmDelete() {
    if (!deleteTarget) return
    setDeleting(true)
    await fetch(`/api/admin/donation-tiers/${deleteTarget.id}`, { method: 'DELETE' })
    setDeleting(false); setDeleteTarget(null); load()
  }

  return (
    <div className="max-w-3xl">
      <AdminPageHeader title="Donation Tiers" description="Configure preset donation amounts and their impact descriptions."
        action={
          <div className="flex items-center gap-2">
            <a href="/donate" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 h-10 px-3 rounded-lg border border-border text-sm text-text-muted hover:text-text hover:bg-gray-50 transition-colors">
              <ExternalLink className="w-3.5 h-3.5" />
              View page
            </a>
            <button onClick={openCreate} className="inline-flex items-center gap-2 h-10 px-4 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors cursor-pointer"><Plus className="w-4 h-4" /> Add tier</button>
          </div>
        }
      />
      {showForm && (
        <AdminCard title={editing ? 'Edit tier' : 'Add tier'} className="mb-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <AdminFormField label="Display amount (e.g. D100)" name="amount" required register={register('amount', { required: 'Required' })} error={errors.amount?.message} placeholder="D100" />
              <AdminFormField label="Numeric amount" name="numericAmount" type="number" required register={register('numericAmount', { required: 'Required', valueAsNumber: true })} error={errors.numericAmount?.message} placeholder="100" />
            </div>
            <AdminFormField label="Headline" name="headline" required register={register('headline', { required: 'Required' })} error={errors.headline?.message} placeholder="e.g. First steps" />
            <AdminFormField label="Impact description" name="impact" type="textarea" rows={2} required register={register('impact', { required: 'Required' })} error={errors.impact?.message} placeholder="What this donation providesâ€¦" />
            <div className="flex justify-end gap-3 pt-2">
              <button type="button" onClick={() => setShowForm(false)} className="h-10 px-4 rounded-lg border border-border text-sm text-text hover:bg-gray-50 transition-colors cursor-pointer">Cancel</button>
              <AdminSaveButton isLoading={saving} saved={saved} />
            </div>
          </form>
        </AdminCard>
      )}
      <AdminCard title="Donation tiers" description={`${items.length} tier${items.length !== 1 ? 's' : ''}`}>
        {loading ? <AdminListSkeleton rows={3} /> : items.length === 0 ? <AdminEmptyState title="No tiers" /> : (
          <ul className="divide-y divide-border/50">
            {items.map((t) => (
              <li key={t.id} className="flex items-center gap-4 py-3">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex flex-col items-center justify-center shrink-0">
                  <span className="font-bold text-primary text-sm">{t.amount}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-text text-sm">{t.headline}</p>
                  <p className="text-text-muted text-xs mt-0.5 line-clamp-1">{t.impact}</p>
                </div>
                <div className="flex gap-1 shrink-0">
                  <button onClick={() => openEdit(t)} className="w-8 h-8 rounded-lg border border-border text-text-muted hover:text-primary hover:border-primary/40 transition-colors flex items-center justify-center cursor-pointer" aria-label="Edit"><Pencil className="w-3.5 h-3.5" /></button>
                  <button onClick={() => setDeleteTarget(t)} className="w-8 h-8 rounded-lg border border-border text-text-muted hover:text-red-600 hover:border-red-200 transition-colors flex items-center justify-center cursor-pointer" aria-label="Delete"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </AdminCard>
      <AdminDeleteDialog isOpen={!!deleteTarget} itemName={deleteTarget?.headline} onConfirm={confirmDelete} onCancel={() => setDeleteTarget(null)} isLoading={deleting} />
    </div>
  )
}
