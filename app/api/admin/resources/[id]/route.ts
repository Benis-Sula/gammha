import { NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/db'
import { requireAdmin } from '@/lib/auth'
import { revalidatePath } from 'next/cache'

const schema = z.object({
  tag: z.string().min(1).optional(),
  title: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  readTime: z.string().min(1).optional(),
  href: z.string().optional(),
  order: z.number().optional(),
})

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { error } = await requireAdmin()
  if (error) return error
  const { id } = await params
  const parsed = schema.safeParse(await req.json())
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  const item = await prisma.resourceArticle.update({ where: { id }, data: parsed.data })
  revalidatePath('/resources')
  return NextResponse.json(item)
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { error } = await requireAdmin()
  if (error) return error
  const { id } = await params
  await prisma.resourceArticle.delete({ where: { id } })
  revalidatePath('/resources')
  return NextResponse.json({ ok: true })
}
