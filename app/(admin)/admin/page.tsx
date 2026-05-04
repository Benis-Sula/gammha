import Link from 'next/link'
import type { ContactSubmission } from '@prisma/client'
import { prisma } from '@/lib/db'
import {
  Users, Megaphone, HeartPulse, BookOpen, Home,
  Headphones, Scale, Settings, Inbox, BarChart2, Heart, FileText,
  ArrowRight, TrendingUp,
} from 'lucide-react'

const contentSections = [
  { href: '/admin/content/hero', label: 'Hero Sections', icon: Home, description: 'Edit page hero content & images', countKey: 'heroSections' },
  { href: '/admin/content/team', label: 'Team Members', icon: Users, description: 'Manage the team on the About page', countKey: 'teamMembers' },
  { href: '/admin/content/campaigns', label: 'Campaigns', icon: Megaphone, description: 'Advocacy campaigns and goals', countKey: 'campaigns' },
  { href: '/admin/content/conditions', label: 'Health Conditions', icon: HeartPulse, description: 'Maternal health conditions info', countKey: 'conditions' },
  { href: '/admin/content/resources', label: 'Resources', icon: BookOpen, description: 'Articles and external links', countKey: 'resources' },
  { href: '/admin/content/stats', label: 'Statistics', icon: BarChart2, description: 'Key statistics across pages', countKey: 'stats' },
  { href: '/admin/content/donate', label: 'Donation Tiers', icon: Heart, description: 'Impact amounts for the donate page', countKey: 'donationTiers' },
  { href: '/admin/content/homepage', label: 'Focus Areas', icon: Home, description: 'Homepage feature cards', countKey: 'focusAreas' },
  { href: '/admin/content/support', label: 'Support Channels', icon: Headphones, description: 'Phone, WhatsApp, email channels', countKey: 'supportChannels' },
  { href: '/admin/content/advocacy', label: 'Advocacy', icon: Scale, description: 'Involvement options and policy items', countKey: 'policyItems' },
  { href: '/admin/content/settings', label: 'Site Settings', icon: Settings, description: 'Contact info and office hours', countKey: null },
]

export default async function AdminDashboard() {
  const [
    totalSubmissions,
    unreadCount,
    heroSections,
    teamMembers,
    campaigns,
    conditions,
    resourceArticles,
    stats,
    donationTiers,
    focusAreas,
    supportChannels,
    policyItems,
    recentSubmissions,
  ] = await Promise.all([
    prisma.contactSubmission.count(),
    prisma.contactSubmission.count({ where: { read: false } }),
    prisma.heroSection.count(),
    prisma.teamMember.count(),
    prisma.campaign.count(),
    prisma.condition.count(),
    prisma.resourceArticle.count(),
    prisma.statistic.count(),
    prisma.donationTier.count(),
    prisma.focusArea.count(),
    prisma.supportChannel.count(),
    prisma.policyItem.count(),
    prisma.contactSubmission.findMany({ orderBy: { createdAt: 'desc' }, take: 5 }),
  ])

  const counts: Record<string, number> = {
    heroSections, teamMembers, campaigns, conditions,
    resources: resourceArticles, stats, donationTiers,
    focusAreas, supportChannels, policyItems,
  }

  return (
    <div className="max-w-5xl space-y-8">

      {/* ── Top stats ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard label="Total Submissions" value={totalSubmissions} icon={<Inbox className="w-5 h-5" />} />
        <StatCard
          label="Unread"
          value={unreadCount}
          icon={<TrendingUp className="w-5 h-5" />}
          highlight={unreadCount > 0}
          href="/admin/submissions"
        />
        <StatCard label="Content Sections" value={contentSections.length} icon={<FileText className="w-5 h-5" />} />
        <StatCard label="Team Members" value={teamMembers} icon={<Users className="w-5 h-5" />} href="/admin/content/team" />
      </div>

      {/* ── Content sections grid ── */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading font-semibold text-text">Content Sections</h2>
          <Link href="/admin/content" className="text-sm text-primary hover:underline flex items-center gap-1">
            View all <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {contentSections.map((section) => {
            const count = section.countKey ? counts[section.countKey] : null
            return (
              <Link
                key={section.href}
                href={section.href}
                className="bg-white rounded-xl border border-border/50 shadow-card p-4 hover:border-primary/30 hover:shadow-card-hover transition-all group cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-surface-alt flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                    <section.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-medium text-text text-sm">{section.label}</p>
                      {count !== null && (
                        <span className="text-xs font-semibold text-primary bg-primary/10 rounded-full px-2 py-0.5 shrink-0">
                          {count}
                        </span>
                      )}
                    </div>
                    <p className="text-text-muted text-xs mt-0.5 truncate">{section.description}</p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* ── Recent submissions ── */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading font-semibold text-text">Recent Submissions</h2>
          <Link href="/admin/submissions" className="text-sm text-primary hover:underline flex items-center gap-1">
            View all <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="bg-white rounded-xl border border-border/50 shadow-card overflow-hidden">
          {recentSubmissions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Inbox className="w-8 h-8 text-text-muted mb-3" />
              <p className="text-text-muted text-sm font-medium">No submissions yet</p>
              <p className="text-text-muted text-xs mt-1">Contact form submissions will appear here</p>
            </div>
          ) : (
            <ul className="divide-y divide-border/50">
              {recentSubmissions.map((s: ContactSubmission) => (
                <li key={s.id}>
                  <Link
                    href={`/admin/submissions/${s.id}`}
                    className="flex items-center gap-3 px-5 py-3.5 hover:bg-surface-alt transition-colors cursor-pointer"
                  >
                    <div className={`w-2 h-2 rounded-full shrink-0 ${!s.read ? 'bg-accent' : 'bg-transparent'}`} aria-label={!s.read ? 'Unread' : undefined} />
                    <div className="min-w-0 flex-1">
                      <p className={`text-sm truncate ${!s.read ? 'font-semibold text-text' : 'text-text-muted'}`}>
                        {s.firstName} {s.lastName} — {s.subject ?? 'General enquiry'}
                      </p>
                      <p className="text-xs text-text-muted mt-0.5">{s.email}</p>
                    </div>
                    <time className="text-xs text-text-muted shrink-0">
                      {new Date(s.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                    </time>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  )
}

function StatCard({
  label,
  value,
  icon,
  highlight,
  href,
}: {
  label: string
  value: number
  icon: React.ReactNode
  highlight?: boolean
  href?: string
}) {
  const content = (
    <div className={`bg-white rounded-xl border shadow-card p-5 transition-all ${href ? 'hover:border-primary/30 hover:shadow-card-hover cursor-pointer' : ''} ${highlight ? 'border-accent/40' : 'border-border/50'}`}>
      <div className="flex items-center justify-between mb-3">
        <p className="text-text-muted text-xs font-medium uppercase tracking-wide">{label}</p>
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${highlight ? 'bg-accent/10 text-accent' : 'bg-surface-alt text-primary'}`}>
          {icon}
        </div>
      </div>
      <p className={`font-heading font-bold text-3xl ${highlight ? 'text-accent' : 'text-text'}`}>{value}</p>
    </div>
  )
  return href ? <Link href={href}>{content}</Link> : <div>{content}</div>
}
