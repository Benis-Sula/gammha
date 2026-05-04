import { ReactNode } from 'react'

interface Props {
  title?: string
  description?: string
  action?: ReactNode
  children: ReactNode
  className?: string
}

export default function AdminCard({ title, description, action, children, className = '' }: Props) {
  return (
    <div className={`bg-white rounded-xl shadow-card border border-border/50 ${className}`}>
      {(title || action) && (
        <div className="flex items-start justify-between gap-4 px-5 py-4 border-b border-border/50">
          <div>
            {title && <h2 className="font-heading font-semibold text-text text-base">{title}</h2>}
            {description && <p className="text-sm text-text-muted mt-0.5">{description}</p>}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}
      <div className="p-5">{children}</div>
    </div>
  )
}
