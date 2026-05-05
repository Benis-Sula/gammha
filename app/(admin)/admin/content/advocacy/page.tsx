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
import { Plus, Pencil, Trash2 } from 'lucide-react'

interface Option { id: string; iconName: string; title: string; description: string }
interface PolicyItem { id: string; title: string; text: string }
type OptForm = { iconName: string; title: string; description: string }
type PolicyForm = { title: string; text: string }

export default function AdvocacyPage() {
  const [options, setOptions] = useState<Option[]>([])
  const [policies, setPolicies] = useState<PolicyItem[]>([])
  const [loading, setLoading] = useState(true)
  const [editingOpt, setEditingOpt] = useState<Option | null>(null)
  const [showOptForm, setShowOptForm] = useState(false)
  const [editingPolicy, setEditingPolicy] = useState<PolicyItem | null>(null)
  const [showPolicyForm, setShowPolicyForm] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; name: string; type: 'option' | 'policy' } | null>(null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const optForm = useForm<OptForm>()
  const policyForm = useForm<PolicyForm>()

  async function load() {
    const [o, p] = await Promise.all([fetch('/api/admin/involvement'), fetch('/api/admin/policy')])
    setOptions(await o.json()); setPolicies(await p.json()); setLoading(false)
  }
  useEffect(() => { load() }, [])

  async function saveOpt(data: OptForm) {
    setSaved(false)
    setSaving(true)
    const url = editingOpt ? `/api/admin/involvement/${editingOpt.id}` : '/api/admin/involvement'
    await fetch(url, { method: editingOpt ? 'PATCH' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
    setSaving(false); setSaved(true); setShowOptForm(false); load()
  }

  async function savePolicy(data: PolicyForm) {
    setSaved(false)
    setSaving(true)
    const url = editingPolicy ? `/api/admin/policy/${editingPolicy.id}` : '/api/admin/policy'
    await fetch(url, { method: editingPolicy ? 'PATCH' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
    setSaving(false); setSaved(true); setShowPolicyForm(false); load()
  }

  async function confirmDelete() {
    if (!deleteTarget) return
    setDeleting(true)
    const endpoint = deleteTarget.type === 'option' ? 'involvement' : 'policy'
    await fetch(`/api/admin/${endpoint}/${deleteTarget.id}`, { method: 'DELETE' })
    setDeleting(false); setDeleteTarget(null); load()
  }

  if (loading) return <p className="text-text-muted text-sm p-6">Loadingâ€¦</p>

  return (
    <div className="max-w-3xl space-y-6">
      <AdminPageHeader title="Advocacy" description="Manage involvement options and policy items for the Advocacy page." />

      {/* Get Involved */}
      <AdminCard title="Get Involved Options" description={`${options.length} options`}
        action={<button onClick={() => { setEditingOpt(null); optForm.reset(); setShowOptForm(true) }} className="inline-flex items-center gap-2 h-9 px-3 rounded-lg bg-primary text-white text-xs font-medium hover:bg-primary-dark transition-colors cursor-pointer"><Plus className="w-3.5 h-3.5" /> Add</button>}
      >
        {showOptForm && (
          <form onSubmit={optForm.handleSubmit(saveOpt)} className="space-y-3 mb-5 pb-5 border-b border-border">
            <div className="grid grid-cols-2 gap-3">
              <AdminFormField label="Icon (Lucide)" name="iconName" required register={optForm.register('iconName', { required: 'Required' })} error={optForm.formState.errors.iconName?.message} placeholder="Handshake" />
              <AdminFormField label="Title" name="title" required register={optForm.register('title', { required: 'Required' })} error={optForm.formState.errors.title?.message} />
            </div>
            <AdminFormField label="Description" name="description" type="textarea" rows={2} required register={optForm.register('description', { required: 'Required' })} error={optForm.formState.errors.description?.message} />
            <div className="flex justify-end gap-2"><button type="button" onClick={() => setShowOptForm(false)} className="h-9 px-4 rounded-lg border border-border text-sm text-text hover:bg-gray-50 transition-colors cursor-pointer">Cancel</button><AdminSaveButton isLoading={saving} saved={saved} /></div>
          </form>
        )}
        {options.length === 0 ? <AdminEmptyState title="No options" /> : (
          <ul className="divide-y divide-border/50">
            {options.map((o) => (
              <li key={o.id} className="flex items-start gap-3 py-3">
                <div className="flex-1 min-w-0"><p className="font-medium text-text text-sm">{o.title}</p><p className="text-text-muted text-xs mt-0.5 line-clamp-1">{o.description}</p></div>
                <div className="flex gap-1">
                  <button onClick={() => { setEditingOpt(o); optForm.reset(o); setShowOptForm(true) }} className="w-8 h-8 rounded-lg border border-border text-text-muted hover:text-primary hover:border-primary/40 transition-colors flex items-center justify-center cursor-pointer"><Pencil className="w-3.5 h-3.5" /></button>
                  <button onClick={() => setDeleteTarget({ id: o.id, name: o.title, type: 'option' })} className="w-8 h-8 rounded-lg border border-border text-text-muted hover:text-red-600 hover:border-red-200 transition-colors flex items-center justify-center cursor-pointer"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </AdminCard>

      {/* Policy Items */}
      <AdminCard title="Policy Items" description={`${policies.length} items`}
        action={<button onClick={() => { setEditingPolicy(null); policyForm.reset(); setShowPolicyForm(true) }} className="inline-flex items-center gap-2 h-9 px-3 rounded-lg bg-primary text-white text-xs font-medium hover:bg-primary-dark transition-colors cursor-pointer"><Plus className="w-3.5 h-3.5" /> Add</button>}
      >
        {showPolicyForm && (
          <form onSubmit={policyForm.handleSubmit(savePolicy)} className="space-y-3 mb-5 pb-5 border-b border-border">
            <AdminFormField label="Title" name="title" required register={policyForm.register('title', { required: 'Required' })} error={policyForm.formState.errors.title?.message} />
            <AdminFormField label="Text" name="text" type="textarea" rows={3} required register={policyForm.register('text', { required: 'Required' })} error={policyForm.formState.errors.text?.message} />
            <div className="flex justify-end gap-2"><button type="button" onClick={() => setShowPolicyForm(false)} className="h-9 px-4 rounded-lg border border-border text-sm text-text hover:bg-gray-50 transition-colors cursor-pointer">Cancel</button><AdminSaveButton isLoading={saving} saved={saved} /></div>
          </form>
        )}
        {policies.length === 0 ? <AdminEmptyState title="No policy items" /> : (
          <ul className="divide-y divide-border/50">
            {policies.map((p) => (
              <li key={p.id} className="flex items-start gap-3 py-3">
                <div className="flex-1 min-w-0"><p className="font-medium text-text text-sm">{p.title}</p><p className="text-text-muted text-xs mt-0.5 line-clamp-2">{p.text}</p></div>
                <div className="flex gap-1">
                  <button onClick={() => { setEditingPolicy(p); policyForm.reset(p); setShowPolicyForm(true) }} className="w-8 h-8 rounded-lg border border-border text-text-muted hover:text-primary hover:border-primary/40 transition-colors flex items-center justify-center cursor-pointer"><Pencil className="w-3.5 h-3.5" /></button>
                  <button onClick={() => setDeleteTarget({ id: p.id, name: p.title, type: 'policy' })} className="w-8 h-8 rounded-lg border border-border text-text-muted hover:text-red-600 hover:border-red-200 transition-colors flex items-center justify-center cursor-pointer"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </AdminCard>

      <AdminDeleteDialog isOpen={!!deleteTarget} itemName={deleteTarget?.name} onConfirm={confirmDelete} onCancel={() => setDeleteTarget(null)} isLoading={deleting} />
    </div>
  )
}
