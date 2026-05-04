import { NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/db'
import { requireAdmin } from '@/lib/auth'
import { revalidatePath } from 'next/cache'

const PAGE_PATHS: Record<string, string> = {
  home: '/', about: '/about', 'mental-health': '/mental-health',
  support: '/support', advocacy: '/advocacy', resources: '/resources',
  donate: '/donate', contact: '/contact',
}

const schema = z.object({
  pageSlug: z.string().min(1),
  eyebrow: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  imageSrc: z.string().url(),
  imageAlt: z.string().min(1),
})

export async function GET() {
  const { error } = await requireAdmin()
  if (error) return error
  return NextResponse.json(await prisma.heroSection.findMany({ orderBy: { pageSlug: 'asc' } }))
}

export async function POST(req: Request) {
  const { error } = await requireAdmin()
  if (error) return error
  const parsed = schema.safeParse(await req.json())
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  const item = await prisma.heroSection.upsert({
    where: { pageSlug: parsed.data.pageSlug },
    update: parsed.data,
    create: parsed.data,
  })
  revalidatePath(PAGE_PATHS[item.pageSlug] ?? '/')
  return NextResponse.json(item, { status: 201 })
}
