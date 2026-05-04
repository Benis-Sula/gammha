import { ReactNode } from 'react'

interface Props {
  title: string
  description?: string
  action?: ReactNode
}

export default function AdminPageHeader({ title, description, action }: Props) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
      <div>
        <h1 className="font-heading font-bold text-text text-xl">{title}</h1>
        {description && <p className="text-text-muted text-sm mt-0.5">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}
