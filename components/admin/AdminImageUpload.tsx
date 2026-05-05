'use client'

import { useState, useRef } from 'react'
import { Upload, Link, X, ImageIcon, Loader2, AlertCircle } from 'lucide-react'
import { useUploadThing } from '@/lib/uploadthing'

interface Props {
  value?: string | null
  onChange: (url: string | null) => void
  label?: string
  required?: boolean
}

type Mode = 'url' | 'upload'

// ─── Upload zone ─────────────────────────────────────────────────────────────
// Lives in its own component so `useUploadThing` only executes when the user
// has switched to upload mode. Crashing here does not affect URL mode.

function UploadZone({ onSuccess, currentValue }: { onSuccess: (url: string) => void; currentValue?: string | null }) {
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const { startUpload, isUploading } = useUploadThing('imageUploader', {
    onClientUploadComplete: (res) => {
      const url = res?.[0]?.ufsUrl ?? res?.[0]?.url
      if (url) { onSuccess(url); setError(null) }
    },
    onUploadError: (err) => {
      setError(
        err.message?.includes('UPLOADTHING_TOKEN') || err.message?.includes('Invalid token') || err.code === 'MISSING_ENV'
          ? 'File upload is not configured yet. Add UPLOADTHING_TOKEN to your environment variables (Vercel → Settings → Environment Variables), then redeploy. Use the URL tab below to paste an image link for now.'
          : `Upload failed: ${err.message}. Try the URL tab instead.`
      )
    },
  })

  function handleFiles(files: FileList | null) {
    if (!files?.length) return
    const file = files[0]
    if (!file.type.startsWith('image/')) { setError('Please select an image file (JPG, PNG, WebP, etc.).'); return }
    if (file.size > 4 * 1024 * 1024) { setError('Image must be under 4 MB.'); return }
    setError(null)
    startUpload([file])
  }

  return (
    <div className="space-y-2">
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleFiles(e.dataTransfer.files) }}
        onClick={() => !isUploading && inputRef.current?.click()}
        className={`flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-8 text-center transition-colors
          ${isUploading ? 'cursor-wait border-primary/40 bg-primary/5' : 'cursor-pointer hover:border-primary/60 hover:bg-gray-50'}
          ${isDragging ? 'border-primary bg-primary/5' : 'border-border bg-white'}`}
      >
        <input ref={inputRef} type="file" accept="image/*" className="sr-only" onChange={(e) => handleFiles(e.target.files)} />

        {isUploading ? (
          <>
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
            <div>
              <p className="text-sm font-semibold text-text">Uploading…</p>
              <p className="text-xs text-text-muted mt-1">Please wait, do not close this page</p>
            </div>
          </>
        ) : (
          <>
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Upload className="w-7 h-7 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-text">
                {currentValue ? 'Replace image' : 'Upload image'}
              </p>
              <p className="text-xs text-text-muted mt-1">
                Drag & drop or <span className="text-primary font-medium underline underline-offset-2">click to browse</span>
              </p>
              <p className="text-xs text-text-muted mt-0.5">PNG, JPG, WebP — max 4 MB</p>
            </div>
          </>
        )}
      </div>

      {error && (
        <div className="flex items-start gap-2.5 rounded-lg border border-amber-200 bg-amber-50 p-3">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 leading-relaxed">{error}</p>
        </div>
      )}
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function AdminImageUpload({ value, onChange, label = 'Image', required }: Props) {
  const [mode, setMode] = useState<Mode>('url')
  const [urlInput, setUrlInput] = useState(value ?? '')

  function commitUrl() {
    const trimmed = urlInput.trim()
    onChange(trimmed || null)
  }

  return (
    <div className="space-y-2">

      {/* Label + mode toggle */}
      <div className="flex items-center justify-between gap-2">
        <label className="text-sm font-medium text-text">
          {label}{required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
        <div className="flex rounded-lg border border-border overflow-hidden text-[11px] font-semibold">
          <button
            type="button"
            onClick={() => setMode('url')}
            className={`px-3 py-1.5 flex items-center gap-1.5 transition-colors cursor-pointer
              ${mode === 'url' ? 'bg-primary text-white' : 'bg-white text-text-muted hover:bg-gray-50 hover:text-text'}`}
          >
            <Link className="w-3 h-3" /> Enter URL
          </button>
          <button
            type="button"
            onClick={() => setMode('upload')}
            className={`px-3 py-1.5 flex items-center gap-1.5 transition-colors cursor-pointer border-l border-border
              ${mode === 'upload' ? 'bg-primary text-white' : 'bg-white text-text-muted hover:bg-gray-50 hover:text-text'}`}
          >
            <Upload className="w-3 h-3" /> Upload file
          </button>
        </div>
      </div>

      {/* Current image preview */}
      {value && (
        <div className="flex items-center gap-3 p-3 rounded-xl border border-border bg-surface">
          <img
            src={value}
            alt="Current image"
            className="w-20 h-14 rounded-lg object-cover shrink-0 bg-gray-100 border border-border"
          />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-text">Current image</p>
            <p className="text-[11px] text-text-muted mt-0.5 break-all line-clamp-2">{value}</p>
          </div>
          <button
            type="button"
            title="Remove image"
            onClick={() => { onChange(null); setUrlInput('') }}
            className="p-1.5 rounded-lg text-text-muted hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* URL mode */}
      {mode === 'url' && (
        <div className="space-y-1.5">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
              <input
                type="url"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                onBlur={commitUrl}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); commitUrl() } }}
                placeholder="https://images.unsplash.com/… or any public image URL"
                className="w-full rounded-lg border border-border bg-white pl-9 pr-3 h-10 text-sm text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
              />
            </div>
            <button
              type="button"
              onClick={commitUrl}
              className="h-10 px-4 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-colors cursor-pointer shrink-0"
            >
              Set image
            </button>
          </div>
          <p className="text-[11px] text-text-muted">
            Paste a public image URL. <span className="font-medium">Unsplash, Cloudinary, or any CDN URL works.</span>
          </p>
        </div>
      )}

      {/* Upload mode — UploadZone only mounts here, keeping the hook isolated */}
      {mode === 'upload' && (
        <UploadZone
          currentValue={value}
          onSuccess={(url) => onChange(url)}
        />
      )}
    </div>
  )
}
