export default function AdminListSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <ul className="divide-y divide-border/50">
      {Array.from({ length: rows }).map((_, i) => (
        <li key={i} className="py-4 animate-pulse space-y-2">
          <div className="h-3.5 bg-border/60 rounded w-2/5" />
          <div className="h-3 bg-border/40 rounded w-3/5" />
        </li>
      ))}
    </ul>
  )
}
