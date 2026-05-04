import { NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/db'
import { requireAdmin } from '@/lib/auth'

const schema = z.object({
  title: z.string().min(1),
  status: z.string().min(1),
  description: z.string().min(1),
  goals: z.array(z.string()),
  order: z.number().optional(),
})

export async function GET() {
  const { error } = await requireAdmin()
  if (error) return error
  const items = await prisma.campaign.findMany({ orderBy: { order: 'asc' } })
  return NextResponse.json(items)
}

export async function POST(req: Request) {
  const { error } = await requireAdmin()
  if (error) return error
  const body = await req.json()
  const parsed = schema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  const count = await prisma.campaign.count()
  const item = await prisma.campaign.create({ data: { ...parsed.data, order: parsed.data.order ?? count } })
  return NextResponse.json(item, { status: 201 })
}
