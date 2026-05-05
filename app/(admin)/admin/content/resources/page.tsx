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

interface Article { id: string; tag: string; title: string; description: string; readTime: string; href: string }
interface ExtLink { id: string; name: string; href: string; description: string }
type ArtForm = { tag: string; title: string; description: string; readTime: string; href: string }
type LinkForm = { name: string; href: string; description: string }

export default function ResourcesPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [links, setLinks] = useState<ExtLink[]>([])
  const [editingArt, setEditingArt] = useState<Article | null>(null)
  const [showArtForm, setShowArtForm] = useState(false)
  const [editingLink, setEditingLink] = useState<ExtLink | null>(null)
  const [showLinkForm, setShowLinkForm] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; name: string; type: 'article' | 'link' } | null>(null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [loading, setLoading] = useState(true)

  const artForm = useForm<ArtForm>()
  const linkForm = useForm<LinkForm>()

  async function load() {
    const [a, l] = await Promise.all([fetch('/api/admin/resources'), fetch('/api/admin/external-links')])
    setArticles(await a.json()); setLinks(await l.json()); setLoading(false)
  }
  useEffect(() => { load() }, [])

  async function saveArticle(data: ArtForm) {
    setSaved(false)
    setSaving(true)
    const url = editingArt ? `/api/admin/resources/${editingArt.id}` : '/api/admin/resources'
    await fetch(url, { method: editingArt ? 'PATCH' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
    setSaving(false); setSaved(true); setShowArtForm(false); load()
  }

  async function saveLink(data: LinkForm) {
    setSaved(false)
    setSaving(true)
    const url = editingLink ? `/api/admin/external-links/${editingLink.id}` : '/api/admin/external-links'
    await fetch(url, { method: editingLink ? 'PATCH' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
    setSaving(false); setSaved(true); setShowLinkForm(false); load()
  }

  async function confirmDelete() {
    if (!deleteTarget) return
    setDeleting(true)
    const endpoint = deleteTarget.type === 'article' ? 'resources' : 'external-links'
    await fetch(`/api/admin/${endpoint}/${deleteTarget.id}`, { method: 'DELETE' })
    setDeleting(false); setDeleteTarget(null); load()
  }

  if (loading) return <AdminListSkeleton rows={3} />

  return (
    <div className="max-w-3xl space-y-6">
      <AdminPageHeader title="Resources & Links" description="Manage resource articles and external organization links." />

      {/* Articles */}
      <AdminCard title="Resource Articles" description={`${articles.length} articles`}
        action={<button onClick={() => { setEditingArt(null); artForm.reset(); setShowArtForm(true) }} className="inline-flex items-center gap-2 h-9 px-3 rounded-lg bg-primary text-white text-xs font-medium hover:bg-primary-dark transition-colors cursor-pointer"><Plus className="w-3.5 h-3.5" /> Add</button>}
      >
        {showArtForm && (
          <form onSubmit={artForm.handleSubmit(saveArticle)} className="space-y-3 mb-5 pb-5 border-b border-border">
            <div className="grid grid-cols-2 gap-3">
              <AdminFormField label="Tag" name="tag" required register={artForm.register('tag', { required: 'Required' })} error={artForm.formState.errors.tag?.message} placeholder="Guide" />
              <AdminFormField label="Read time" name="readTime" required register={artForm.register('readTime', { required: 'Required' })} error={artForm.formState.errors.readTime?.message} placeholder="5 min read" />
            </div>
            <AdminFormField label="Title" name="title" required register={artForm.register('title', { required: 'Required' })} error={artForm.formState.errors.title?.message} />
            <AdminFormField label="Description" name="description" type="textarea" rows={2} required register={artForm.register('description', { required: 'Required' })} error={artForm.formState.errors.description?.message} />
            <AdminFormField label="Link URL" name="href" register={artForm.register('href')} placeholder="#" />
            <div className="flex justify-end gap-2"><button type="button" onClick={() => setShowArtForm(false)} className="h-9 px-4 rounded-lg border border-border text-sm text-text hover:bg-gray-50 transition-colors cursor-pointer">Cancel</button><AdminSaveButton isLoading={saving} saved={saved} /></div>
          </form>
        )}
        {articles.length === 0 ? <AdminEmptyState title="No articles" /> : (
          <ul className="divide-y divide-border/50">
            {articles.map((a) => (
              <li key={a.id} className="flex items-start gap-3 py-3">
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded">{a.tag}</span>
                  <p className="font-medium text-text text-sm mt-1">{a.title}</p>
                  <p className="text-text-muted text-xs mt-0.5">{a.readTime}</p>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => { setEditingArt(a); artForm.reset(a); setShowArtForm(true) }} className="w-8 h-8 rounded-lg border border-border text-text-muted hover:text-primary hover:border-primary/40 transition-colors flex items-center justify-center cursor-pointer"><Pencil className="w-3.5 h-3.5" /></button>
                  <button onClick={() => setDeleteTarget({ id: a.id, name: a.title, type: 'article' })} className="w-8 h-8 rounded-lg border border-border text-text-muted hover:text-red-600 hover:border-red-200 transition-colors flex items-center justify-center cursor-pointer"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </AdminCard>

      {/* External Links */}
      <AdminCard title="External Links" description={`${links.length} links`}
        action={<button onClick={() => { setEditingLink(null); linkForm.reset(); setShowLinkForm(true) }} className="inline-flex items-center gap-2 h-9 px-3 rounded-lg bg-primary text-white text-xs font-medium hover:bg-primary-dark transition-colors cursor-pointer"><Plus className="w-3.5 h-3.5" /> Add</button>}
      >
        {showLinkForm && (
          <form onSubmit={linkForm.handleSubmit(saveLink)} className="space-y-3 mb-5 pb-5 border-b border-border">
            <AdminFormField label="Organization name" name="name" required register={linkForm.register('name', { required: 'Required' })} error={linkForm.formState.errors.name?.message} />
            <AdminFormField label="URL" name="href" type="url" required register={linkForm.register('href', { required: 'Required' })} error={linkForm.formState.errors.href?.message} />
            <AdminFormField label="Description" name="description" type="textarea" rows={2} required register={linkForm.register('description', { required: 'Required' })} error={linkForm.formState.errors.description?.message} />
            <div className="flex justify-end gap-2"><button type="button" onClick={() => setShowLinkForm(false)} className="h-9 px-4 rounded-lg border border-border text-sm text-text hover:bg-gray-50 transition-colors cursor-pointer">Cancel</button><AdminSaveButton isLoading={saving} saved={saved} /></div>
          </form>
        )}
        {links.length === 0 ? <AdminEmptyState title="No external links" /> : (
          <ul className="divide-y divide-border/50">
            {links.map((l) => (
              <li key={l.id} className="flex items-start gap-3 py-3">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-text text-sm">{l.name}</p>
                  <p className="text-text-muted text-xs mt-0.5 truncate">{l.href}</p>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => { setEditingLink(l); linkForm.reset(l); setShowLinkForm(true) }} className="w-8 h-8 rounded-lg border border-border text-text-muted hover:text-primary hover:border-primary/40 transition-colors flex items-center justify-center cursor-pointer"><Pencil className="w-3.5 h-3.5" /></button>
                  <button onClick={() => setDeleteTarget({ id: l.id, name: l.name, type: 'link' })} className="w-8 h-8 rounded-lg border border-border text-text-muted hover:text-red-600 hover:border-red-200 transition-colors flex items-center justify-center cursor-pointer"><Trash2 className="w-3.5 h-3.5" /></button>
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
