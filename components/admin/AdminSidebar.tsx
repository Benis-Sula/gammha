'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import {
  LayoutDashboard, FileText, Users, Megaphone, HeartPulse,
  BookOpen, BarChart2, Heart, Home, Headphones, Scale,
  Settings, Inbox, LogOut, X, ShieldCheck,
} from 'lucide-react'

const navGroups = [
  {
    label: 'Overview',
    items: [
      { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
      { href: '/admin/submissions', label: 'Submissions', icon: Inbox },
    ],
  },
  {
    label: 'Content',
    items: [
      { href: '/admin/content', label: 'All Content', icon: FileText, exact: true },
      { href: '/admin/content/hero', label: 'Hero Sections', icon: Home },
      { href: '/admin/content/team', label: 'Team Members', icon: Users },
      { href: '/admin/content/campaigns', label: 'Campaigns', icon: Megaphone },
      { href: '/admin/content/conditions', label: 'Health Conditions', icon: HeartPulse },
      { href: '/admin/content/resources', label: 'Resources', icon: BookOpen },
      { href: '/admin/content/stats', label: 'Statistics', icon: BarChart2 },
      { href: '/admin/content/donate', label: 'Donation Tiers', icon: Heart },
      { href: '/admin/content/homepage', label: 'Focus Areas', icon: Home },
      { href: '/admin/content/support', label: 'Support Channels', icon: Headphones },
      { href: '/admin/content/advocacy', label: 'Advocacy', icon: Scale },
      { href: '/admin/content/settings', label: 'Site Settings', icon: Settings },
    ],
  },
]

interface Props {
  unreadCount?: number
  open: boolean
  onClose: () => void
}

export default function AdminSidebar({ unreadCount = 0, open, onClose }: Props) {
  const pathname = usePathname()

  function isActive(href: string, exact?: boolean) {
    return exact ? pathname === href : pathname.startsWith(href)
  }

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-60 bg-[#1A2E24] z-40 flex flex-col transition-transform duration-200
          ${open ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
        aria-label="Admin navigation"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary-light flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-white" />
            </div>
            <span className="font-heading font-bold text-white text-sm">GAMMHA Admin</span>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-1 rounded text-white/60 hover:text-white transition-colors cursor-pointer"
            aria-label="Close sidebar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-5">
          {navGroups.map((group) => (
            <div key={group.label}>
              <p className="text-white/40 text-[10px] font-semibold uppercase tracking-widest px-2 mb-1.5">
                {group.label}
              </p>
              <ul className="space-y-0.5">
                {group.items.map((item) => {
                  const active = isActive(item.href, item.exact)
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer relative
                          ${active
                            ? 'bg-white/10 text-white font-medium'
                            : 'text-white/60 hover:text-white hover:bg-white/5'
                          }`}
                      >
                        {active && (
                          <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-accent rounded-r-full" />
                        )}
                        <item.icon className="w-4 h-4 shrink-0" />
                        <span className="truncate">{item.label}</span>
                        {item.href === '/admin/submissions' && unreadCount > 0 && (
                          <span className="ml-auto bg-accent text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                            {unreadCount > 99 ? '99+' : unreadCount}
                          </span>
                        )}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-white/10 p-3 shrink-0">
          <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors w-full cursor-pointer"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            <span>Sign out</span>
          </button>
        </div>
      </aside>
    </>
  )
}
