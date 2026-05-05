'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import {
  LayoutDashboard, FileText, Users, Megaphone, HeartPulse,
  BookOpen, BarChart2, Heart, Home, Headphones, Scale,
  Settings, Inbox, LogOut, X, ShieldCheck,
  ChevronLeft, ChevronRight, Image as ImageIcon, TriangleAlert,
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
      { href: '/admin/content/hero', label: 'Hero Sections', icon: ImageIcon },
      { href: '/admin/content/team', label: 'Team Members', icon: Users },
      { href: '/admin/content/campaigns', label: 'Campaigns', icon: Megaphone },
      { href: '/admin/content/conditions', label: 'Health Conditions', icon: HeartPulse },
      { href: '/admin/content/warning-signs', label: 'Warning Signs', icon: TriangleAlert },
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
  collapsed: boolean
  onToggleCollapse: () => void
}

export default function AdminSidebar({ unreadCount = 0, open, onClose, collapsed, onToggleCollapse }: Props) {
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
        className={`fixed top-0 left-0 h-full bg-[#1A2E24] z-40 flex flex-col transition-[width] duration-300 ease-in-out
          ${collapsed ? 'w-16' : 'w-64'}
          ${open ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
        aria-label="Admin navigation"
      >

        {/* ── Header ── */}
        <div className="flex items-center justify-between h-14 px-3 border-b border-white/10 shrink-0">
          {/* Logo + brand */}
          <div className={`flex items-center gap-2.5 overflow-hidden transition-all duration-300 ${collapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>
            <div className="w-8 h-8 rounded-lg bg-primary-light flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4 text-white" />
            </div>
            <span className="font-heading font-bold text-white text-sm whitespace-nowrap">GAMMHA Admin</span>
          </div>

          {/* Collapsed: centered logo only */}
          {collapsed && (
            <div className="flex-1 flex justify-center">
              <div className="w-8 h-8 rounded-lg bg-primary-light flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-white" />
              </div>
            </div>
          )}

          {/* Mobile close button */}
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0"
            aria-label="Close sidebar"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Desktop collapse toggle — always visible, clearly styled */}
          <button
            onClick={onToggleCollapse}
            className="hidden lg:flex items-center justify-center w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer shrink-0"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed
              ? <ChevronRight className="w-4 h-4" />
              : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* ── Nav ── */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden py-3 px-2 space-y-4">
          {navGroups.map((group) => (
            <div key={group.label}>
              {/* Group label — hidden when collapsed */}
              <div className={`overflow-hidden transition-all duration-200 ${collapsed ? 'h-0 opacity-0 mb-0' : 'h-5 opacity-100 mb-1'}`}>
                <p className="text-white/40 text-[10px] font-semibold uppercase tracking-widest px-2">
                  {group.label}
                </p>
              </div>

              <ul className="space-y-0.5">
                {group.items.map((item) => {
                  const active = isActive(item.href, item.exact)
                  return (
                    <li key={item.href} className="relative group/navitem">
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className={`flex items-center gap-3 px-2 py-2 rounded-lg text-sm transition-colors cursor-pointer relative
                          ${collapsed ? 'justify-center' : ''}
                          ${active
                            ? 'bg-white/15 text-white font-medium'
                            : 'text-white/60 hover:text-white hover:bg-white/8'
                          }`}
                      >
                        {/* Active indicator bar */}
                        {active && !collapsed && (
                          <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-accent rounded-r-full" />
                        )}

                        <item.icon className="w-4 h-4 shrink-0" />

                        {/* Label — animated out when collapsed */}
                        <span className={`truncate transition-all duration-200 ${collapsed ? 'w-0 opacity-0 overflow-hidden' : 'w-auto opacity-100'}`}>
                          {item.label}
                        </span>

                        {/* Unread badge */}
                        {item.href === '/admin/submissions' && unreadCount > 0 && (
                          collapsed ? (
                            <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
                          ) : (
                            <span className="ml-auto bg-accent text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                              {unreadCount > 99 ? '99+' : unreadCount}
                            </span>
                          )
                        )}
                      </Link>

                      {/* Tooltip shown when collapsed */}
                      {collapsed && (
                        <div className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-3 z-[60]
                          opacity-0 group-hover/navitem:opacity-100 translate-x-1 group-hover/navitem:translate-x-0
                          transition-all duration-150">
                          <span className="flex items-center px-2.5 py-1.5 rounded-lg bg-gray-900 text-white text-xs whitespace-nowrap shadow-xl">
                            {item.label}
                          </span>
                        </div>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* ── Footer ── */}
        <div className="border-t border-white/10 p-2 shrink-0">
          <div className="relative group/signout">
            <button
              onClick={() => signOut({ callbackUrl: '/login' })}
              className={`flex items-center gap-3 px-2 py-2 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/8 transition-colors w-full cursor-pointer
                ${collapsed ? 'justify-center' : ''}`}
            >
              <LogOut className="w-4 h-4 shrink-0" />
              <span className={`truncate transition-all duration-200 ${collapsed ? 'w-0 opacity-0 overflow-hidden' : 'w-auto opacity-100'}`}>
                Sign out
              </span>
            </button>

            {collapsed && (
              <div className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-3 z-[60]
                opacity-0 group-hover/signout:opacity-100 translate-x-1 group-hover/signout:translate-x-0
                transition-all duration-150">
                <span className="flex items-center px-2.5 py-1.5 rounded-lg bg-gray-900 text-white text-xs whitespace-nowrap shadow-xl">
                  Sign out
                </span>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  )
}
