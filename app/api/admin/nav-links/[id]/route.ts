import { NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/db'
import { requireAdmin } from '@/lib/auth'
import { revalidatePath } from 'next/cache'

const schema = z.object({
  label: z.string().min(1).optional(),
  href: z.string().min(1).optional(),
  iconName: z.string().optional(),
  order: z.number().optional(),
})

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { error } = await requireAdmin()
  if (error) return error
  const { id } = await params
  const parsed = schema.safeParse(await req.json())
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  const link = await prisma.navLink.update({ where: { id }, data: parsed.data })
  revalidatePath('/', 'layout')
  return NextResponse.json(link)
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { error } = await requireAdmin()
  if (error) return error
  const { id } = await params
  await prisma.navLink.delete({ where: { id } })
  revalidatePath('/', 'layout')
  return NextResponse.json({ ok: true })
}
