import { NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/db'
import { requireAdmin } from '@/lib/auth'

const schema = z.object({
  name: z.string().min(1),
  role: z.string().min(1),
  description: z.string().min(1),
  order: z.number().optional(),
})

export async function GET() {
  const { error } = await requireAdmin()
  if (error) return error
  const members = await prisma.teamMember.findMany({ orderBy: { order: 'asc' } })
  return NextResponse.json(members)
}

export async function POST(req: Request) {
  const { error } = await requireAdmin()
  if (error) return error
  const body = await req.json()
  const parsed = schema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  const count = await prisma.teamMember.count()
  const member = await prisma.teamMember.create({ data: { ...parsed.data, order: parsed.data.order ?? count } })
  return NextResponse.json(member, { status: 201 })
}
