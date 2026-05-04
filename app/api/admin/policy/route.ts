import { NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/db'
import { requireAdmin } from '@/lib/auth'

const schema = z.object({ title: z.string().min(1), text: z.string().min(1), order: z.number().optional() })

export async function GET() {
  const { error } = await requireAdmin()
  if (error) return error
  return NextResponse.json(await prisma.policyItem.findMany({ orderBy: { order: 'asc' } }))
}

export async function POST(req: Request) {
  const { error } = await requireAdmin()
  if (error) return error
  const parsed = schema.safeParse(await req.json())
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  const count = await prisma.policyItem.count()
  return NextResponse.json(await prisma.policyItem.create({ data: { ...parsed.data, order: parsed.data.order ?? count } }), { status: 201 })
}
