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

type NavGroup = 'navbar' | 'footer_org' | 'footer_support' | 'social'
interface NavLink { id: string; group: NavGroup; label: string; href: string; iconName: string | null; order: number }
type FormData = { label: string; href: string; iconName?: string }

const GROUP_LABELS: Record<NavGroup, string> = {
  navbar: 'Navbar Links',
  footer_org: 'Footer — Organisation Column',
  footer_support: 'Footer — Support Column',
  social: 'Social Media Links',
}

const GROUP_DESCRIPTIONS: Record<NavGroup, string> = {
  navbar: 'Links shown in the main navigation bar.',
  footer_org: 'Links in the Organisation column in the footer.',
  footer_support: 'Links in the Support column in the footer.',
  social: 'Social media icons in the footer. Use iconName: Facebook, Twitter, Instagram.',
}

export default function NavLinksPage() {
  const [allLinks, setAllLinks] = useState<NavLink[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<NavLink | null>(null)
  const [activeGroup, setActiveGroup] = useState<NavGroup | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<NavLink | null>(null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>()

  async function load() { const res = await fetch('/api/admin/nav-links'); setAllLinks(await res.json()); setLoading(false) }
  useEffect(() => { load() }, [])

  function openCreate(group: NavGroup) {
    setActiveGroup(group)
    setEditing(null)
    reset({ label: '', href: '', iconName: '' })
    setShowForm(true)
  }

  function openEdit(link: NavLink) {
    setActiveGroup(link.group)
    setEditing(link)
    reset({ label: link.label, href: link.href, iconName: link.iconName ?? '' })
    setShowForm(true)
  }

  async function onSubmit(data: FormData) {
    setSaved(false); setSaving(true)
    const payload = { ...data, group: activeGroup }
    const url = editing ? `/api/admin/nav-links/${editing.id}` : '/api/admin/nav-links'
    await fetch(url, { method: editing ? 'PATCH' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    setSaving(false); setSaved(true); setShowForm(false); load()
  }

  async function confirmDelete() {
    if (!deleteTarget) return
    setDeleting(true)
    await fetch(`/api/admin/nav-links/${deleteTarget.id}`, { method: 'DELETE' })
    setDeleting(false); setDeleteTarget(null); load()
  }

  const groups: NavGroup[] = ['navbar', 'footer_org', 'footer_support', 'social']

  return (
    <div className="max-w-3xl space-y-6">
      <AdminPageHeader
        title="Navigation & Footer Links"
        description="Manage the links in the navbar, footer columns, and social media icons."
      />

      {showForm && activeGroup && (
        <AdminCard title={editing ? `Edit ${GROUP_LABELS[activeGroup]} link` : `Add link to ${GROUP_LABELS[activeGroup]}`} className="mb-2">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <AdminFormField label="Label" name="label" required register={register('label', { required: 'Required' })} error={errors.label?.message} placeholder="About" />
              <AdminFormField label="URL / href" name="href" required register={register('href', { required: 'Required' })} error={errors.href?.message} placeholder="/about" />
            </div>
            {activeGroup === 'social' && (
              <AdminFormField label="Icon name (Facebook, Twitter, Instagram)" name="iconName" register={register('iconName')} placeholder="Facebook" />
            )}
            <div className="flex justify-end gap-3 pt-2">
              <button type="button" onClick={() => setShowForm(false)} className="h-10 px-4 rounded-lg border border-border text-sm text-text hover:bg-gray-50 transition-colors cursor-pointer">Cancel</button>
              <AdminSaveButton isLoading={saving} saved={saved} />
            </div>
          </form>
        </AdminCard>
      )}

      {groups.map((group) => {
        const links = allLinks.filter((l) => l.group === group)
        return (
          <AdminCard
            key={group}
            title={GROUP_LABELS[group]}
            description={GROUP_DESCRIPTIONS[group]}
          >
            {loading ? <AdminListSkeleton rows={3} /> : (
              <>
                {links.length === 0 ? (
                  <AdminEmptyState title="No links" />
                ) : (
                  <ul className="divide-y divide-border/50 mb-4">
                    {links.map((link) => (
                      <li key={link.id} className="flex items-center gap-4 py-2.5">
                        {group === 'social' && link.iconName && (
                          <div className="w-8 h-8 rounded-lg bg-surface-alt flex items-center justify-center text-xs font-mono text-text-muted shrink-0">{link.iconName.slice(0, 2)}</div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-text text-sm">{link.label}</p>
                          <p className="text-text-muted text-xs mt-0.5">{link.href}</p>
                        </div>
                        <div className="flex gap-1 shrink-0">
                          <button onClick={() => openEdit(link)} className="w-8 h-8 rounded-lg border border-border text-text-muted hover:text-primary hover:border-primary/40 transition-colors flex items-center justify-center cursor-pointer" aria-label="Edit"><Pencil className="w-3.5 h-3.5" /></button>
                          <button onClick={() => setDeleteTarget(link)} className="w-8 h-8 rounded-lg border border-border text-text-muted hover:text-red-600 hover:border-red-200 transition-colors flex items-center justify-center cursor-pointer" aria-label="Delete"><Trash2 className="w-3.5 h-3.5" /></button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
                <button onClick={() => openCreate(group)} className="inline-flex items-center gap-2 h-9 px-3 rounded-lg border border-dashed border-border text-sm text-text-muted hover:text-primary hover:border-primary/40 transition-colors cursor-pointer">
                  <Plus className="w-4 h-4" /> Add link
                </button>
              </>
            )}
          </AdminCard>
        )
      })}

      <AdminDeleteDialog isOpen={!!deleteTarget} itemName={deleteTarget?.label} onConfirm={confirmDelete} onCancel={() => setDeleteTarget(null)} isLoading={deleting} />
    </div>
  )
}
