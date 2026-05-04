const variants: Record<string, string> = {
  Active: 'bg-emerald-100 text-emerald-800',
  Ongoing: 'bg-blue-100 text-blue-800',
  Completed: 'bg-gray-100 text-gray-700',
  Unread: 'bg-accent/10 text-accent',
  Read: 'bg-gray-100 text-gray-500',
}

export default function AdminStatusBadge({ status }: { status: string }) {
  const cls = variants[status] ?? 'bg-gray-100 text-gray-700'
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${cls}`}>
      {status}
    </span>
  )
}
