import { NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/db'
import { requireAdmin } from '@/lib/auth'
import { revalidatePath } from 'next/cache'

const schema = z.object({
  name: z.string().min(1).optional(),
  role: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  order: z.number().optional(),
})

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { error } = await requireAdmin()
  if (error) return error
  const { id } = await params
  const member = await prisma.teamMember.findUnique({ where: { id } })
  if (!member) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(member)
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { error } = await requireAdmin()
  if (error) return error
  const { id } = await params
  const body = await req.json()
  const parsed = schema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  const member = await prisma.teamMember.update({ where: { id }, data: parsed.data })
  revalidatePath('/about')
  return NextResponse.json(member)
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { error } = await requireAdmin()
  if (error) return error
  const { id } = await params
  await prisma.teamMember.delete({ where: { id } })
  revalidatePath('/about')
  return NextResponse.json({ ok: true })
}
