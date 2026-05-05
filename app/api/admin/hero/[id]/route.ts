import { NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/db'
import { requireAdmin } from '@/lib/auth'
import { revalidatePath } from 'next/cache'

const schema = z.object({
  eyebrow: z.string().min(1).optional(),
  title: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  imageSrc: z.string().min(1).optional(),
  imageAlt: z.string().min(1).optional(),
})

const PAGE_PATHS: Record<string, string> = {
  home: '/', about: '/about', 'mental-health': '/mental-health',
  support: '/support', advocacy: '/advocacy', resources: '/resources',
  donate: '/donate', contact: '/contact',
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { error } = await requireAdmin()
  if (error) return error
  const { id } = await params
  const parsed = schema.safeParse(await req.json())
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  const item = await prisma.heroSection.update({ where: { id }, data: parsed.data })
  const path = PAGE_PATHS[item.pageSlug] ?? '/'
  revalidatePath(path)
  return NextResponse.json(item)
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { error } = await requireAdmin()
  if (error) return error
  const { id } = await params
  await prisma.heroSection.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
