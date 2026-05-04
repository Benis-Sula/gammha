import { ReactNode } from 'react'
import { Inbox } from 'lucide-react'

interface Props {
  title: string
  description?: string
  action?: ReactNode
}

export default function AdminEmptyState({ title, description, action }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
        <Inbox className="w-6 h-6 text-text-muted" />
      </div>
      <h3 className="font-heading font-semibold text-text text-base">{title}</h3>
      {description && <p className="text-text-muted text-sm mt-1 max-w-xs">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}
