'use client'

import { useEffect, useRef } from 'react'
import { AlertTriangle } from 'lucide-react'

interface Props {
  isOpen: boolean
  itemName?: string
  onConfirm: () => void
  onCancel: () => void
  isLoading?: boolean
}

export default function AdminDeleteDialog({ isOpen, itemName, onConfirm, onCancel, isLoading }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (isOpen) dialog.showModal()
    else dialog.close()
  }, [isOpen])

  return (
    <dialog
      ref={dialogRef}
      className="rounded-2xl shadow-elevated p-0 w-full max-w-sm border-0 backdrop:bg-black/50"
      onClose={onCancel}
    >
      <div className="p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-text">Delete {itemName ?? 'item'}?</h3>
            <p className="text-text-muted text-sm mt-1">This action cannot be undone.</p>
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-6">
          <button
            type="button"
            onClick={onCancel}
            className="h-9 px-4 rounded-lg border border-border text-sm text-text hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="h-9 px-4 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-medium transition-colors disabled:opacity-60 cursor-pointer"
          >
            {isLoading ? 'Deleting…' : 'Delete'}
          </button>
        </div>
      </div>
    </dialog>
  )
}
