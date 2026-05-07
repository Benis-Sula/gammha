'use client'

export const dynamic = "force-dynamic";


import { useEffect, useState } from 'react'
import { ExternalLink, Phone, Mail, MapPin, Clock, Navigation, Globe, AlignLeft } from 'lucide-react'
import AdminPageHeader from '@/components/admin/AdminPageHeader'
import AdminCard from '@/components/admin/AdminCard'
import AdminSaveButton from '@/components/admin/AdminSaveButton'

const FIELD_GROUPS = [
  {
    title: 'Contact',
    icon: Phone,
    description: 'Phone number and office address shown on the Contact and Support pages.',
    fields: [
      { key: 'contact_phone', label: 'Phone number', placeholder: '+220 123 4567', type: 'tel' },
      { key: 'contact_address', label: 'Short address', placeholder: 'Kairaba Avenue, Banjul' },
      { key: 'contact_address_full', label: 'Full address', placeholder: 'GAMMHA Office, Kairaba Avenue, Banjul, The Gambia' },
    ],
  },
  {
    title: 'Email Addresses',
    icon: Mail,
    description: 'Email addresses displayed across the website.',
    fields: [
      { key: 'contact_email_info', label: 'General email', placeholder: 'info@gammha.org', type: 'email' },
      { key: 'contact_email_support', label: 'Support email', placeholder: 'support@gammha.org', type: 'email' },
      { key: 'contact_email_donations', label: 'Donations email', placeholder: 'donations@gammha.org', type: 'email' },
    ],
  },
  {
    title: 'Office Hours',
    icon: Clock,
    description: 'Opening hours shown on Contact, Support, and the homepage.',
    fields: [
      { key: 'office_hours', label: 'General office hours', placeholder: 'Monday – Friday: 8am – 5pm' },
      { key: 'office_hours_phone', label: 'Phone support hours', placeholder: 'Mon–Fri, 8am–6pm' },
      { key: 'office_hours_whatsapp', label: 'WhatsApp hours', placeholder: '24/7 (responses within 2 hours)' },
    ],
  },
  {
    title: 'Navbar Labels',
    icon: Navigation,
    description: 'Text labels for the logo and CTA buttons in the navigation bar.',
    fields: [
      { key: 'navbar_logo_text', label: 'Logo text', placeholder: 'GAMMHA' },
      { key: 'navbar_cta_help_label', label: '”Get Help” button label', placeholder: 'Get Help' },
      { key: 'navbar_cta_donate_label', label: '”Donate” button label', placeholder: 'Donate' },
    ],
  },
  {
    title: 'Footer Text',
    icon: AlignLeft,
    description: 'Text shown in the footer branding area.',
    fields: [
      { key: 'footer_branding_description', label: 'Branding description (below logo)', placeholder: 'Gambia Alliance for Maternal Mental Health & Advocacy...' },
      { key: 'footer_tagline', label: 'Footer tagline (after heart icon)', placeholder: 'for mothers in The Gambia' },
    ],
  },
  {
    title: 'Contact Form Subject Options',
    icon: Globe,
    description: 'Dropdown options for the contact forms. Enter one option per line.',
    fields: [
      { key: 'form_subjects_support', label: 'Support page form subjects (one per line)', placeholder: 'General Inquiry\nSupport for Myself\n...', type: 'textarea' },
      { key: 'form_subjects_contact', label: 'Contact page form subjects (one per line)', placeholder: 'I need support\nI want to volunteer\n...', type: 'textarea' },
    ],
  },
]

function FieldSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i}>
          <div className="h-3.5 w-28 bg-border rounded animate-pulse mb-2" />
          <div className="h-10 bg-border/60 rounded-lg animate-pulse" />
        </div>
      ))}
    </div>
  )
}

export default function SettingsPage() {
  const [values, setValues] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    fetch('/api/admin/settings')
      .then((r) => r.json())
      .then((data) => { setValues(data); setLoading(false) })
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setSaved(false)
    const payload = Object.entries(values).map(([key, value]) => ({ key, value }))
    await fetch('/api/admin/settings', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    setSaving(false)
    setSaved(true)
  }

  return (
    <div className="max-w-2xl">
      <AdminPageHeader
        title="Site Settings"
        description="Update contact information shown across the website."
      />

      <form onSubmit={handleSubmit} className="space-y-6">
        {FIELD_GROUPS.map((group) => (
          <AdminCard
            key={group.title}
            title={group.title}
            description={group.description}
          >
            {loading ? (
              <FieldSkeleton />
            ) : (
              <div className="space-y-4">
                {group.fields.map((f) => (
                  <div key={f.key}>
                    <label htmlFor={f.key} className="block text-sm font-medium text-text mb-1.5">
                      {f.label}
                    </label>
                    {f.type === 'textarea' ? (
                      <textarea
                        id={f.key}
                        rows={5}
                        value={values[f.key] ?? ''}
                        onChange={(e) => setValues({ ...values, [f.key]: e.target.value })}
                        placeholder={f.placeholder}
                        className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors text-sm resize-y"
                      />
                    ) : (
                      <input
                        id={f.key}
                        type={f.type ?? 'text'}
                        value={values[f.key] ?? ''}
                        onChange={(e) => setValues({ ...values, [f.key]: e.target.value })}
                        placeholder={f.placeholder}
                        className="w-full h-10 rounded-lg border border-border bg-surface px-3 text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors text-sm"
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
          </AdminCard>
        ))}

        {/* Preview link + save */}
        <div className="flex items-center justify-between pt-2">
          <a
            href="/contact"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-primary transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Preview contact page
          </a>
          <AdminSaveButton isLoading={saving} saved={saved} />
        </div>
      </form>
    </div>
  )
}
