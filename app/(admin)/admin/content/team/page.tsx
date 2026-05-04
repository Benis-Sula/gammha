'use client'

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

interface Member { id: string; name: string; role: string; description: string; order: number }
type FormData = { name: string; role: string; description: string }

export default function TeamPage() {
  const [members, setMembers] = useState<Member[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Member | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<Member | null>(null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>()

  async function load() {
    const res = await fetch('/api/admin/team')
    setMembers(await res.json())
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  function openCreate() {
    setEditing(null)
    reset({ name: '', role: '', description: '' })
    setShowForm(true)
  }

  function openEdit(m: Member) {
    setEditing(m)
    reset({ name: m.name, role: m.role, description: m.description })
    setShowForm(true)
  }

  async function onSubmit(data: FormData) {
    setSaved(false)
    setSaving(true)
    const url = editing ? `/api/admin/team/${editing.id}` : '/api/admin/team'
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
    await fetch(`/api/admin/team/${deleteTarget.id}`, { method: 'DELETE' })
    setDeleting(false)
    setDeleteTarget(null)
    load()
  }

  return (
    <div className="max-w-3xl">
      <AdminPageHeader
        title="Team Members"
        description="Manage the team shown on the About page."
        action={
          <button onClick={openCreate} className="inline-flex items-center gap-2 h-10 px-4 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors cursor-pointer">
            <Plus className="w-4 h-4" /> Add member
          </button>
        }
      />

      {/* Form */}
      {showForm && (
        <AdminCard title={editing ? 'Edit member' : 'Add member'} className="mb-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <AdminFormField label="Name" name="name" required register={register('name', { required: 'Required' })} error={errors.name?.message} placeholder="Dr. Fatou Jallow" />
            <AdminFormField label="Role / Title" name="role" required register={register('role', { required: 'Required' })} error={errors.role?.message} placeholder="Executive Director" />
            <AdminFormField label="Bio" name="description" type="textarea" rows={4} required register={register('description', { required: 'Required' })} error={errors.description?.message} placeholder="Brief description of their role and background…" />
            <div className="flex items-center justify-end gap-3 pt-2">
              <button type="button" onClick={() => setShowForm(false)} className="h-10 px-4 rounded-lg border border-border text-sm text-text hover:bg-gray-50 transition-colors cursor-pointer">Cancel</button>
              <AdminSaveButton isLoading={saving} saved={saved} />
            </div>
          </form>
        </AdminCard>
      )}

      {/* List */}
      <AdminCard title="Members" description={`${members.length} team member${members.length !== 1 ? 's' : ''}`}>
        {loading ? (
          <AdminListSkeleton rows={3} />
        ) : members.length === 0 ? (
          <AdminEmptyState title="No team members" description="Add your first team member above." />
        ) : (
          <ul className="divide-y divide-border/50">
            {members.map((m) => (
              <li key={m.id} className="flex items-start gap-4 py-4">
                <div className="w-10 h-10 rounded-full bg-surface-alt flex items-center justify-center text-primary font-semibold text-sm shrink-0">
                  {m.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-text text-sm">{m.name}</p>
                  <p className="text-text-muted text-xs mt-0.5">{m.role}</p>
                  <p className="text-text-muted text-xs mt-1 line-clamp-2">{m.description}</p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button onClick={() => openEdit(m)} className="w-9 h-9 rounded-lg border border-border text-text-muted hover:text-primary hover:border-primary/40 transition-colors flex items-center justify-center cursor-pointer" aria-label="Edit">
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => setDeleteTarget(m)} className="w-9 h-9 rounded-lg border border-border text-text-muted hover:text-red-600 hover:border-red-200 transition-colors flex items-center justify-center cursor-pointer" aria-label="Delete">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </AdminCard>

      <AdminDeleteDialog
        isOpen={!!deleteTarget}
        itemName={deleteTarget?.name}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
        isLoading={deleting}
      />
    </div>
  )
}
