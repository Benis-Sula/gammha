'use client'

import { useState } from 'react'
import AdminSidebar from '@/components/admin/AdminSidebar'
import AdminTopbar from '@/components/admin/AdminTopbar'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main content — offset by sidebar width on desktop */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-60">
        <AdminTopbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
