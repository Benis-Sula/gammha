'use client'

import { usePathname } from 'next/navigation'
import { Menu } from 'lucide-react'

const breadcrumbs: Record<string, string> = {
  '/admin': 'Dashboard',
  '/admin/submissions': 'Submissions',
  '/admin/content': 'Content',
  '/admin/content/hero': 'Hero Sections',
  '/admin/content/team': 'Team Members',
  '/admin/content/campaigns': 'Campaigns',
  '/admin/content/conditions': 'Health Conditions',
  '/admin/content/resources': 'Resources',
  '/admin/content/stats': 'Statistics',
  '/admin/content/donate': 'Donation Tiers',
  '/admin/content/homepage': 'Focus Areas',
  '/admin/content/support': 'Support Channels',
  '/admin/content/advocacy': 'Advocacy',
  '/admin/content/settings': 'Site Settings',
}

interface Props {
  onMenuClick: () => void
  unreadCount?: number
}

export default function AdminTopbar({ onMenuClick, unreadCount = 0 }: Props) {
  const pathname = usePathname()
  const title = breadcrumbs[pathname] ?? 'Admin'

  return (
    <header className="h-14 bg-white border-b border-border flex items-center gap-3 px-4 lg:px-6 shrink-0">
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 rounded-lg text-text-muted hover:text-text hover:bg-gray-100 transition-colors cursor-pointer"
        aria-label="Open sidebar"
      >
        <Menu className="w-5 h-5" />
      </button>

      <h1 className="font-heading font-semibold text-text text-sm sm:text-base flex-1 truncate">
        {title}
      </h1>

      {unreadCount > 0 && (
        <span className="text-xs text-accent font-semibold">
          {unreadCount} unread
        </span>
      )}
    </header>
  )
}
