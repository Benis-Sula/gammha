'use client'

import { useEffect } from 'react'

export default function GlobalError({
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
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif', background: '#FAFAF8', color: '#1A2E24' }}>
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
          <div style={{ textAlign: 'center', maxWidth: '400px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '12px' }}>
              Something went wrong
            </h2>
            <p style={{ color: '#4A6558', marginBottom: '32px', lineHeight: 1.6 }}>
              A critical error occurred. Please refresh the page.
            </p>
            <button
              onClick={reset}
              style={{
                padding: '12px 28px',
                background: '#1B6B4E',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 600,
                fontSize: '1rem',
                cursor: 'pointer',
              }}
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}
