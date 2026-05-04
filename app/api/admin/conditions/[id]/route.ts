import { NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/db'
import { requireAdmin } from '@/lib/auth'
import { revalidatePath } from 'next/cache'

const schema = z.object({
  slug: z.string().min(1).optional(),
  title: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  signs: z.array(z.string()).optional(),
  note: z.string().optional(),
  order: z.number().optional(),
})

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { error } = await requireAdmin()
  if (error) return error
  const { id } = await params
  const parsed = schema.safeParse(await req.json())
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  const item = await prisma.condition.update({ where: { id }, data: parsed.data })
  revalidatePath('/mental-health')
  return NextResponse.json(item)
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { error } = await requireAdmin()
  if (error) return error
  const { id } = await params
  await prisma.condition.delete({ where: { id } })
  revalidatePath('/mental-health')
  return NextResponse.json({ ok: true })
}
