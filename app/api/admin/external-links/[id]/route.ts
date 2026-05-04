import { NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/db'
import { requireAdmin } from '@/lib/auth'
import { revalidatePath } from 'next/cache'

const schema = z.object({ name: z.string().min(1).optional(), href: z.string().url().optional(), description: z.string().min(1).optional(), order: z.number().optional() })

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { error } = await requireAdmin()
  if (error) return error
  const { id } = await params
  const parsed = schema.safeParse(await req.json())
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  const item = await prisma.externalLink.update({ where: { id }, data: parsed.data })
  revalidatePath('/resources')
  return NextResponse.json(item)
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { error } = await requireAdmin()
  if (error) return error
  const { id } = await params
  await prisma.externalLink.delete({ where: { id } })
  revalidatePath('/resources')
  return NextResponse.json({ ok: true })
}
