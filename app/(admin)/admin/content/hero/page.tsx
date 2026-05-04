'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import AdminPageHeader from '@/components/admin/AdminPageHeader'
import AdminCard from '@/components/admin/AdminCard'
import AdminFormField from '@/components/admin/AdminFormField'
import AdminSaveButton from '@/components/admin/AdminSaveButton'

const PAGES = ['home', 'about', 'mental-health', 'support', 'advocacy', 'resources', 'donate', 'contact']

interface Hero { id: string; pageSlug: string; eyebrow: string; title: string; description: string; imageSrc: string; imageAlt: string }
type FormData = { eyebrow: string; title: string; description: string; imageSrc: string; imageAlt: string }

export default function HeroPage() {
  const [heroes, setHeroes] = useState<Hero[]>([])
  const [activeSlug, setActiveSlug] = useState(PAGES[0])
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>()

  async function load() {
    const res = await fetch('/api/admin/hero')
    const data: Hero[] = await res.json()
    setHeroes(data)
    const active = data.find((h) => h.pageSlug === PAGES[0])
    if (active) reset({ eyebrow: active.eyebrow, title: active.title, description: active.description, imageSrc: active.imageSrc, imageAlt: active.imageAlt })
  }

  useEffect(() => { load() }, [])

  useEffect(() => {
    const hero = heroes.find((h) => h.pageSlug === activeSlug)
    if (hero) reset({ eyebrow: hero.eyebrow, title: hero.title, description: hero.description, imageSrc: hero.imageSrc, imageAlt: hero.imageAlt })
    else reset({ eyebrow: '', title: '', description: '', imageSrc: '', imageAlt: '' })
  }, [activeSlug, heroes])

  async function onSubmit(data: FormData) {
    setSaved(false)
    setSaving(true)
    const existing = heroes.find((h) => h.pageSlug === activeSlug)
    if (existing) {
      await fetch(`/api/admin/hero/${existing.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
    } else {
      await fetch('/api/admin/hero', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...data, pageSlug: activeSlug }) })
    }
    setSaving(false)
    setSaved(true)
    load()
  }

  return (
    <div className="max-w-3xl">
      <AdminPageHeader title="Hero Sections" description="Edit the hero banner for each page." />

      {/* Page tabs */}
      <div className="flex gap-1 flex-wrap mb-6 bg-white rounded-xl border border-border/50 p-1.5 shadow-card">
        {PAGES.map((slug) => (
          <button
            key={slug}
            onClick={() => setActiveSlug(slug)}
            className={`h-8 px-3 rounded-lg text-xs font-medium transition-colors cursor-pointer capitalize
              ${activeSlug === slug ? 'bg-primary text-white' : 'text-text-muted hover:text-text hover:bg-gray-100'}`}
          >
            {slug}
          </button>
        ))}
      </div>

      <AdminCard title={`Editing: ${activeSlug}`}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <AdminFormField label="Eyebrow text" name="eyebrow" register={register('eyebrow')} placeholder="e.g. Our Mission" />
          <AdminFormField label="Title" name="title" required register={register('title', { required: 'Required' })} error={errors.title?.message} placeholder="Main heading of the hero section" />
          <AdminFormField label="Description" name="description" type="textarea" rows={3} required register={register('description', { required: 'Required' })} error={errors.description?.message} />
          <AdminFormField label="Image URL" name="imageSrc" type="url" required register={register('imageSrc', { required: 'Required' })} error={errors.imageSrc?.message} placeholder="https://images.unsplash.com/…" />
          <AdminFormField label="Image alt text" name="imageAlt" required register={register('imageAlt', { required: 'Required' })} error={errors.imageAlt?.message} placeholder="Descriptive text for screen readers" />
          <div className="flex justify-end pt-2">
            <AdminSaveButton isLoading={saving} saved={saved} />
          </div>
        </form>
      </AdminCard>
    </div>
  )
}
