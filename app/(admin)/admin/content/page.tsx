import Link from 'next/link'
import AdminPageHeader from '@/components/admin/AdminPageHeader'
import {
  Home, Users, Megaphone, HeartPulse, BookOpen,
  BarChart2, Heart, Headphones, Scale, Settings,
} from 'lucide-react'

const sections = [
  { href: '/admin/content/hero', label: 'Hero Sections', icon: Home, description: 'Edit the hero title, subtitle, and image for every page' },
  { href: '/admin/content/team', label: 'Team Members', icon: Users, description: 'Add, edit, or remove team members shown on the About page' },
  { href: '/admin/content/campaigns', label: 'Campaigns', icon: Megaphone, description: 'Manage advocacy campaigns and their goals' },
  { href: '/admin/content/conditions', label: 'Health Conditions', icon: HeartPulse, description: 'Update maternal health conditions, signs, and notes' },
  { href: '/admin/content/resources', label: 'Resources & Links', icon: BookOpen, description: 'Manage resource articles and external organization links' },
  { href: '/admin/content/stats', label: 'Statistics', icon: BarChart2, description: 'Edit key statistics shown on the homepage and about page' },
  { href: '/admin/content/donate', label: 'Donation Tiers', icon: Heart, description: 'Configure preset donation amounts and impact descriptions' },
  { href: '/admin/content/homepage', label: 'Focus Areas', icon: Home, description: 'Edit the four focus area cards shown on the homepage' },
  { href: '/admin/content/support', label: 'Support Channels', icon: Headphones, description: 'Manage phone, WhatsApp, and email support channel details' },
  { href: '/admin/content/advocacy', label: 'Advocacy Content', icon: Scale, description: 'Edit involvement options and policy advocacy items' },
  { href: '/admin/content/settings', label: 'Site Settings', icon: Settings, description: 'Update contact information, address, and office hours' },
]

export default function ContentHubPage() {
  return (
    <div className="max-w-4xl">
      <AdminPageHeader title="Content" description="Select a section to update website content." />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {sections.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="bg-white rounded-xl border border-border/50 shadow-card p-5 hover:border-primary/30 hover:shadow-card-hover transition-all group cursor-pointer"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-surface-alt flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                <s.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-text text-sm">{s.label}</p>
                <p className="text-text-muted text-xs mt-1 leading-relaxed">{s.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
