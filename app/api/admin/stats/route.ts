import { NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/db'
import { requireAdmin } from '@/lib/auth'

const schema = z.object({
  group: z.string().min(1),
  value: z.string().min(1),
  label: z.string().min(1),
  order: z.number().optional(),
})

export async function GET() {
  const { error } = await requireAdmin()
  if (error) return error
  return NextResponse.json(await prisma.statistic.findMany({ orderBy: [{ group: 'asc' }, { order: 'asc' }] }))
}

export async function POST(req: Request) {
  const { error } = await requireAdmin()
  if (error) return error
  const parsed = schema.safeParse(await req.json())
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  const count = await prisma.statistic.count({ where: { group: parsed.data.group } })
  return NextResponse.json(await prisma.statistic.create({ data: { ...parsed.data, order: parsed.data.order ?? count } }), { status: 201 })
}
