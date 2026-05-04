'use client'

import { CheckCircle, Save } from 'lucide-react'
import { useEffect, useState } from 'react'

interface Props {
  isLoading?: boolean
  saved?: boolean
  label?: string
  className?: string
}

export default function AdminSaveButton({ isLoading, saved, label = 'Save changes', className = '' }: Props) {
  const [showCheck, setShowCheck] = useState(false)

  useEffect(() => {
    if (saved) {
      setShowCheck(true)
      const t = setTimeout(() => setShowCheck(false), 3000)
      return () => clearTimeout(t)
    }
  }, [saved])

  return (
    <button
      type="submit"
      disabled={isLoading}
      className={`inline-flex items-center justify-center gap-2 h-10 px-5 rounded-lg text-sm font-medium transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer
        ${showCheck
          ? 'bg-emerald-600 hover:bg-emerald-700 text-white ring-2 ring-emerald-600/30'
          : 'bg-primary hover:bg-primary-dark text-white'
        } ${className}`}
    >
      {isLoading ? (
        <>
          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          Saving…
        </>
      ) : showCheck ? (
        <>
          <CheckCircle className="w-4 h-4" />
          Saved!
        </>
      ) : (
        <>
          <Save className="w-4 h-4" />
          {label}
        </>
      )}
    </button>
  )
}
