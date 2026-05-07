'use client'

export const dynamic = "force-dynamic";

import { useEffect, useState, useCallback } from 'react'
import AdminPageHeader from '@/components/admin/AdminPageHeader'
import AdminCard from '@/components/admin/AdminCard'
import AdminFormField from '@/components/admin/AdminFormField'
import AdminSaveButton from '@/components/admin/AdminSaveButton'
import { ExternalLink, ChevronDown } from 'lucide-react'

interface PageBlock { id: string; group: string; key: string; value: string; order: number }

type PageTab = 'homepage' | 'about' | 'mental-health' | 'support' | 'advocacy' | 'resources' | 'donate' | 'contact'

const TABS: { id: PageTab; label: string; href: string }[] = [
  { id: 'homepage', label: 'Home', href: '/' },
  { id: 'about', label: 'About', href: '/about' },
  { id: 'mental-health', label: 'Mental Health', href: '/mental-health' },
  { id: 'support', label: 'Support', href: '/support' },
  { id: 'advocacy', label: 'Advocacy', href: '/advocacy' },
  { id: 'resources', label: 'Resources', href: '/resources' },
  { id: 'donate', label: 'Donate', href: '/donate' },
  { id: 'contact', label: 'Contact', href: '/contact' },
]

type SectionDef = { group: string; title: string; fields: { key: string; label: string; type?: 'textarea'; rows?: number }[] }

const SECTIONS: Record<PageTab, SectionDef[]> = {
  homepage: [
    {
      group: 'homepage_about_preview',
      title: 'About Preview Section',
      fields: [
        { key: 'eyebrow', label: 'Eyebrow text' },
        { key: 'title', label: 'Section title', type: 'textarea', rows: 2 },
        { key: 'description', label: 'Description', type: 'textarea', rows: 3 },
        { key: 'bullet_0', label: 'Bullet 1', type: 'textarea', rows: 2 },
        { key: 'bullet_1', label: 'Bullet 2', type: 'textarea', rows: 2 },
        { key: 'bullet_2', label: 'Bullet 3', type: 'textarea', rows: 2 },
        { key: 'bullet_3', label: 'Bullet 4', type: 'textarea', rows: 2 },
      ],
    },
    {
      group: 'homepage_mission_card',
      title: 'Mission & Vision Card',
      fields: [
        { key: 'mission_eyebrow', label: 'Mission eyebrow' },
        { key: 'mission_text', label: 'Mission statement', type: 'textarea', rows: 3 },
        { key: 'vision_eyebrow', label: 'Vision eyebrow' },
        { key: 'vision_text', label: 'Vision statement', type: 'textarea', rows: 3 },
      ],
    },
    {
      group: 'cta_homepage',
      title: 'CTA Banner',
      fields: [
        { key: 'title', label: 'Banner title' },
        { key: 'description', label: 'Banner description', type: 'textarea', rows: 2 },
        { key: 'primary_label', label: 'Primary button label' },
        { key: 'primary_href', label: 'Primary button URL' },
        { key: 'secondary_label', label: 'Secondary button label' },
        { key: 'secondary_href', label: 'Secondary button URL' },
      ],
    },
  ],
  about: [
    {
      group: 'about_mission',
      title: 'Mission Block',
      fields: [
        { key: 'title', label: 'Title' },
        { key: 'description', label: 'Description', type: 'textarea', rows: 4 },
      ],
    },
    {
      group: 'about_vision',
      title: 'Vision Block',
      fields: [
        { key: 'title', label: 'Title' },
        { key: 'description', label: 'Description', type: 'textarea', rows: 4 },
      ],
    },
    {
      group: 'about_why_it_matters',
      title: '"Why It Matters" Section',
      fields: [
        { key: 'description', label: 'Section description', type: 'textarea', rows: 3 },
      ],
    },
    {
      group: 'about_support_quote',
      title: 'Support Quote Block',
      fields: [
        { key: 'heading', label: 'Heading / quote' },
        { key: 'description', label: 'Supporting description', type: 'textarea', rows: 3 },
      ],
    },
    {
      group: 'cta_about',
      title: 'CTA Banner',
      fields: [
        { key: 'title', label: 'Banner title' },
        { key: 'description', label: 'Banner description', type: 'textarea', rows: 2 },
        { key: 'primary_label', label: 'Primary button label' },
        { key: 'primary_href', label: 'Primary button URL' },
        { key: 'secondary_label', label: 'Secondary button label' },
        { key: 'secondary_href', label: 'Secondary button URL' },
      ],
    },
  ],
  'mental-health': [
    {
      group: 'mh_what_is_it',
      title: '"What Is It?" Section',
      fields: [
        { key: 'description', label: 'Section description', type: 'textarea', rows: 3 },
      ],
    },
    {
      group: 'mh_key_facts',
      title: 'Key Facts List',
      fields: [
        { key: 'fact_0', label: 'Fact 1', type: 'textarea', rows: 2 },
        { key: 'fact_1', label: 'Fact 2', type: 'textarea', rows: 2 },
        { key: 'fact_2', label: 'Fact 3', type: 'textarea', rows: 2 },
        { key: 'fact_3', label: 'Fact 4', type: 'textarea', rows: 2 },
        { key: 'fact_4', label: 'Fact 5', type: 'textarea', rows: 2 },
      ],
    },
    {
      group: 'mh_emotional_support',
      title: 'Emotional Support Block',
      fields: [
        { key: 'heading', label: 'Heading' },
        { key: 'description', label: 'Description', type: 'textarea', rows: 3 },
        { key: 'quote_text', label: 'Testimonial quote', type: 'textarea', rows: 3 },
        { key: 'quote_attribution', label: 'Quote attribution' },
      ],
    },
    {
      group: 'cta_mental_health',
      title: 'CTA Banner',
      fields: [
        { key: 'title', label: 'Banner title' },
        { key: 'description', label: 'Banner description', type: 'textarea', rows: 2 },
        { key: 'primary_label', label: 'Primary button label' },
        { key: 'primary_href', label: 'Primary button URL' },
        { key: 'secondary_label', label: 'Secondary button label' },
        { key: 'secondary_href', label: 'Secondary button URL' },
      ],
    },
  ],
  support: [
    {
      group: 'support_crisis_card',
      title: 'Crisis Card',
      fields: [
        { key: 'heading', label: 'Card heading' },
        { key: 'description', label: 'Card description', type: 'textarea', rows: 3 },
      ],
    },
    {
      group: 'support_anonymous_card',
      title: '"Safe & Anonymous" Card',
      fields: [
        { key: 'heading', label: 'Card heading' },
        { key: 'description', label: 'Card description', type: 'textarea', rows: 3 },
      ],
    },
    {
      group: 'support_how_it_works',
      title: '"How It Works" Intro',
      fields: [
        { key: 'description', label: 'Section description', type: 'textarea', rows: 2 },
      ],
    },
  ],
  advocacy: [
    {
      group: 'advocacy_overlay_quote',
      title: 'Image Overlay Quote',
      fields: [
        { key: 'text', label: 'Quote text', type: 'textarea', rows: 2 },
      ],
    },
    {
      group: 'cta_advocacy',
      title: 'CTA Banner',
      fields: [
        { key: 'title', label: 'Banner title' },
        { key: 'description', label: 'Banner description', type: 'textarea', rows: 2 },
        { key: 'primary_label', label: 'Primary button label' },
        { key: 'primary_href', label: 'Primary button URL' },
        { key: 'secondary_label', label: 'Secondary button label' },
        { key: 'secondary_href', label: 'Secondary button URL' },
      ],
    },
  ],
  resources: [
    {
      group: 'cta_resources',
      title: 'CTA Banner',
      fields: [
        { key: 'title', label: 'Banner title' },
        { key: 'description', label: 'Banner description', type: 'textarea', rows: 2 },
        { key: 'primary_label', label: 'Primary button label' },
        { key: 'primary_href', label: 'Primary button URL' },
        { key: 'secondary_label', label: 'Secondary button label' },
        { key: 'secondary_href', label: 'Secondary button URL' },
      ],
    },
  ],
  donate: [
    {
      group: 'donate_why',
      title: '"Why Donate" Section',
      fields: [
        { key: 'heading_line1', label: 'Heading line 1' },
        { key: 'heading_line2', label: 'Heading line 2' },
        { key: 'description', label: 'Description', type: 'textarea', rows: 3 },
        { key: 'bullet_0', label: 'Bullet 1', type: 'textarea', rows: 2 },
        { key: 'bullet_1', label: 'Bullet 2', type: 'textarea', rows: 2 },
        { key: 'bullet_2', label: 'Bullet 3', type: 'textarea', rows: 2 },
        { key: 'bullet_3', label: 'Bullet 4', type: 'textarea', rows: 2 },
      ],
    },
    {
      group: 'donate_testimonial',
      title: 'Donor Testimonial',
      fields: [
        { key: 'quote_text', label: 'Quote text', type: 'textarea', rows: 3 },
        { key: 'quote_attribution', label: 'Attribution' },
      ],
    },
    {
      group: 'donate_trust_signals',
      title: 'Trust Signals (3 cards)',
      fields: [
        { key: 'signal_0_icon', label: 'Card 1 — Icon name (Lucide)' },
        { key: 'signal_0_label', label: 'Card 1 — Label' },
        { key: 'signal_0_description', label: 'Card 1 — Description', type: 'textarea', rows: 2 },
        { key: 'signal_1_icon', label: 'Card 2 — Icon name (Lucide)' },
        { key: 'signal_1_label', label: 'Card 2 — Label' },
        { key: 'signal_1_description', label: 'Card 2 — Description', type: 'textarea', rows: 2 },
        { key: 'signal_2_icon', label: 'Card 3 — Icon name (Lucide)' },
        { key: 'signal_2_label', label: 'Card 3 — Label' },
        { key: 'signal_2_description', label: 'Card 3 — Description', type: 'textarea', rows: 2 },
      ],
    },
    {
      group: 'donate_success',
      title: 'Success / Thank You State',
      fields: [
        { key: 'heading', label: 'Heading' },
        { key: 'description', label: 'Message', type: 'textarea', rows: 3 },
      ],
    },
  ],
  contact: [
    {
      group: 'contact_urgent_nudge',
      title: 'Urgent Help Nudge',
      fields: [
        { key: 'heading', label: 'Nudge heading' },
        { key: 'description', label: 'Nudge description', type: 'textarea', rows: 2 },
      ],
    },
    {
      group: 'contact_section_heading',
      title: 'Contact Section Heading',
      fields: [
        { key: 'title', label: '"How to Reach GAMMHA" heading' },
      ],
    },
    {
      group: 'contact_success',
      title: 'Success / Confirmation State',
      fields: [
        { key: 'heading', label: 'Heading' },
        { key: 'description', label: 'Message', type: 'textarea', rows: 3 },
      ],
    },
  ],
}

function SectionEditor({ section, blocks, onSaved }: {
  section: SectionDef
  blocks: Record<string, string>
  onSaved: () => void
}) {
  const [values, setValues] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {}
    section.fields.forEach((f) => { init[f.key] = blocks[f.key] ?? '' })
    return init
  })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const init: Record<string, string> = {}
    section.fields.forEach((f) => { init[f.key] = blocks[f.key] ?? '' })
    setValues(init)
  }, [blocks, section.fields])

  async function handleSave() {
    setSaved(false); setSaving(true)
    await Promise.all(
      section.fields.map((f) =>
        fetch('/api/admin/page-blocks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ group: section.group, key: f.key, value: values[f.key] ?? '', order: section.fields.indexOf(f) }),
        })
      )
    )
    setSaving(false); setSaved(true); onSaved()
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-5 py-4 bg-surface-alt hover:bg-gray-50 transition-colors cursor-pointer"
      >
        <span className="font-medium text-text text-sm">{section.title}</span>
        <ChevronDown className={`w-4 h-4 text-text-muted transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="px-5 pb-5 pt-4 space-y-4 border-t border-border">
          {section.fields.map((field) => (
            <div key={field.key}>
              <label className="block text-sm font-medium text-text mb-1.5">{field.label}</label>
              {field.type === 'textarea' ? (
                <textarea
                  rows={field.rows ?? 3}
                  value={values[field.key] ?? ''}
                  onChange={(e) => setValues((v) => ({ ...v, [field.key]: e.target.value }))}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-y"
                />
              ) : (
                <input
                  type="text"
                  value={values[field.key] ?? ''}
                  onChange={(e) => setValues((v) => ({ ...v, [field.key]: e.target.value }))}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                />
              )}
            </div>
          ))}
          <div className="flex justify-end pt-2">
            <AdminSaveButton isLoading={saving} saved={saved} onClick={handleSave} type="button" />
          </div>
        </div>
      )}
    </div>
  )
}

export default function PageContentPage() {
  const [activeTab, setActiveTab] = useState<PageTab>('homepage')
  const [blocks, setBlocks] = useState<PageBlock[]>([])
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    const res = await fetch('/api/admin/page-blocks')
    setBlocks(await res.json())
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  const blockMap = blocks.reduce<Record<string, Record<string, string>>>((acc, b) => {
    if (!acc[b.group]) acc[b.group] = {}
    acc[b.group][b.key] = b.value
    return acc
  }, {})

  const currentTab = TABS.find((t) => t.id === activeTab)!
  const sections = SECTIONS[activeTab]

  return (
    <div className="max-w-3xl">
      <AdminPageHeader
        title="Page Content Blocks"
        description="Edit every text section on every public page — no code changes needed."
        action={
          currentTab && (
            <a
              href={currentTab.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 h-10 px-3 rounded-lg border border-border text-sm text-text-muted hover:text-text hover:bg-gray-50 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              View page
            </a>
          )
        }
      />

      {/* Page tabs */}
      <div className="flex gap-1 flex-wrap mb-6">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
              activeTab === tab.id
                ? 'bg-primary text-white'
                : 'text-text-muted hover:text-text hover:bg-surface-alt border border-border'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {loading ? (
        <AdminCard title="Loading…">
          <div className="space-y-3">
            {[1, 2, 3].map((i) => <div key={i} className="h-12 bg-surface-alt rounded-lg animate-pulse" />)}
          </div>
        </AdminCard>
      ) : (
        <div className="space-y-3">
          {sections.map((section) => (
            <SectionEditor
              key={section.group}
              section={section}
              blocks={blockMap[section.group] ?? {}}
              onSaved={load}
            />
          ))}
        </div>
      )}
    </div>
  )
}
