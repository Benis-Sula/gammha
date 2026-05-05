import { createUploadthing, type FileRouter } from 'uploadthing/next'
import { requireAdmin } from '@/lib/auth'

const f = createUploadthing()

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: '4MB', maxFileCount: 1 } })
    .middleware(async () => {
      const { error } = await requireAdmin()
      if (error) throw new Error('Unauthorized')
      return {}
    })
    .onUploadComplete(async ({ file }) => {
      return { url: file.ufsUrl }
    }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
