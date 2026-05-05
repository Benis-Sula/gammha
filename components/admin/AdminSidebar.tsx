'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import {
  LayoutDashboard, FileText, Users, Megaphone, HeartPulse,
  BookOpen, BarChart2, Heart, Home, Headphones, Scale,
  Settings, Inbox, LogOut, X, ShieldCheck, ChevronLeft, ChevronRight,
  Image as ImageIcon, TriangleAlert,
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
        className={`fixed top-0 left-0 h-full bg-[#1A2E24] z-40 flex flex-col transition-all duration-200 overflow-visible
          ${collapsed ? 'w-16' : 'w-60'}
          ${open ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
        aria-label="Admin navigation"
      >
        {/* Header */}
        <div className={`flex items-center border-b border-white/10 shrink-0 h-14 ${collapsed ? 'justify-center px-0' : 'justify-between px-4'}`}>
          {!collapsed && (
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-primary-light flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-white" />
              </div>
              <span className="font-heading font-bold text-white text-sm">GAMMHA Admin</span>
            </div>
          )}
          {collapsed && (
            <div className="w-8 h-8 rounded-lg bg-primary-light flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-white" />
            </div>
          )}

          {/* Mobile close */}
          {!collapsed && (
            <button
              onClick={onClose}
              className="lg:hidden p-1 rounded text-white/60 hover:text-white transition-colors cursor-pointer"
              aria-label="Close sidebar"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          {/* Desktop collapse toggle */}
          <button
            onClick={onToggleCollapse}
            className={`hidden lg:flex items-center justify-center w-6 h-6 rounded text-white/60 hover:text-white transition-colors cursor-pointer
              ${collapsed ? 'absolute -right-3 top-4 bg-[#1A2E24] border border-white/10 rounded-full w-6 h-6 z-50' : ''}`}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Nav */}
        <nav className={`flex-1 overflow-y-auto py-4 space-y-5 ${collapsed ? 'px-1.5' : 'px-3'}`}>
          {navGroups.map((group) => (
            <div key={group.label}>
              {!collapsed && (
                <p className="text-white/40 text-[10px] font-semibold uppercase tracking-widest px-2 mb-1.5">
                  {group.label}
                </p>
              )}
              {collapsed && <div className="border-t border-white/10 mx-1 mb-2" />}
              <ul className="space-y-0.5">
                {group.items.map((item) => {
                  const active = isActive(item.href, item.exact)
                  return (
                    <li key={item.href} className="relative group/navitem">
                      <Link
                        href={item.href}
                        onClick={onClose}
                        title={collapsed ? item.label : undefined}
                        className={`flex items-center py-2 rounded-lg text-sm transition-colors cursor-pointer relative
                          ${collapsed ? 'justify-center px-0 w-full' : 'gap-3 px-3'}
                          ${active
                            ? 'bg-white/10 text-white font-medium'
                            : 'text-white/60 hover:text-white hover:bg-white/5'
                          }`}
                      >
                        {active && !collapsed && (
                          <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-accent rounded-r-full" />
                        )}
                        <item.icon className="w-4 h-4 shrink-0" />
                        {!collapsed && <span className="truncate">{item.label}</span>}
                        {!collapsed && item.href === '/admin/submissions' && unreadCount > 0 && (
                          <span className="ml-auto bg-accent text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                            {unreadCount > 99 ? '99+' : unreadCount}
                          </span>
                        )}
                        {collapsed && item.href === '/admin/submissions' && unreadCount > 0 && (
                          <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-accent rounded-full" />
                        )}
                      </Link>

                      {/* Tooltip for collapsed state */}
                      {collapsed && (
                        <span className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-2 z-50
                          hidden lg:group-hover/navitem:flex
                          items-center px-2 py-1 rounded-md bg-gray-900 text-white text-xs whitespace-nowrap shadow-lg">
                          {item.label}
                        </span>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className={`border-t border-white/10 shrink-0 ${collapsed ? 'p-1.5' : 'p-3'}`}>
          <div className="relative group/signout">
            <button
              onClick={() => signOut({ callbackUrl: '/login' })}
              className={`flex items-center py-2 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors w-full cursor-pointer
                ${collapsed ? 'justify-center px-0' : 'gap-3 px-3'}`}
            >
              <LogOut className="w-4 h-4 shrink-0" />
              {!collapsed && <span>Sign out</span>}
            </button>
            {collapsed && (
              <span className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-2 z-50
                hidden lg:group-hover/signout:flex
                items-center px-2 py-1 rounded-md bg-gray-900 text-white text-xs whitespace-nowrap shadow-lg">
                Sign out
              </span>
            )}
          </div>
        </div>
      </aside>
    </>
  )
}
