import { NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/db'
import { requireAdmin } from '@/lib/auth'

const schema = z.object({
  iconName: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  order: z.number().optional(),
})

export async function GET() {
  const { error } = await requireAdmin()
  if (error) return error
  return NextResponse.json(await prisma.involvementOption.findMany({ orderBy: { order: 'asc' } }))
}

export async function POST(req: Request) {
  const { error } = await requireAdmin()
  if (error) return error
  const parsed = schema.safeParse(await req.json())
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  const count = await prisma.involvementOption.count()
  return NextResponse.json(await prisma.involvementOption.create({ data: { ...parsed.data, order: parsed.data.order ?? count } }), { status: 201 })
}
