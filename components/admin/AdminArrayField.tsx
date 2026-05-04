'use client'

import { Plus, Trash2 } from 'lucide-react'

interface Props {
  label: string
  items: string[]
  onChange: (items: string[]) => void
  placeholder?: string
}

export default function AdminArrayField({ label, items, onChange, placeholder = 'Add item…' }: Props) {
  function update(index: number, value: string) {
    const next = [...items]
    next[index] = value
    onChange(next)
  }

  function remove(index: number) {
    onChange(items.filter((_, i) => i !== index))
  }

  function add() {
    onChange([...items, ''])
  }

  return (
    <div>
      <p className="block text-sm font-medium text-text mb-1.5">{label}</p>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex gap-2">
            <input
              type="text"
              value={item}
              onChange={(e) => update(i, e.target.value)}
              placeholder={placeholder}
              className="flex-1 h-10 rounded-lg border border-border bg-surface px-3 text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors text-sm"
            />
            <button
              type="button"
              onClick={() => remove(i)}
              className="w-10 h-10 flex items-center justify-center rounded-lg border border-border text-text-muted hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-colors cursor-pointer shrink-0"
              aria-label="Remove item"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={add}
          className="inline-flex items-center gap-2 h-9 px-3 rounded-lg border border-dashed border-border text-text-muted hover:text-text hover:border-primary/50 transition-colors text-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add item
        </button>
      </div>
    </div>
  )
}
