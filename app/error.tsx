'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <h2 className="font-heading text-2xl font-bold text-text mb-3">
          Something went wrong
        </h2>
        <p className="text-text-muted mb-8">
          We encountered an error loading this page. Please try again or return home.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-colors"
          >
            Try again
          </button>
          <Link
            href="/"
            className="px-6 py-3 border border-border text-text rounded-lg font-semibold hover:bg-surface-alt transition-colors"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  )
}
