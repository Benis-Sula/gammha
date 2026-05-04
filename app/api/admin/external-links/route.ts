import { NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/db'
import { requireAdmin } from '@/lib/auth'

const schema = z.object({ name: z.string().min(1), href: z.string().url(), description: z.string().min(1), order: z.number().optional() })

export async function GET() {
  const { error } = await requireAdmin()
  if (error) return error
  return NextResponse.json(await prisma.externalLink.findMany({ orderBy: { order: 'asc' } }))
}

export async function POST(req: Request) {
  const { error } = await requireAdmin()
  if (error) return error
  const parsed = schema.safeParse(await req.json())
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  const count = await prisma.externalLink.count()
  return NextResponse.json(await prisma.externalLink.create({ data: { ...parsed.data, order: parsed.data.order ?? count } }), { status: 201 })
}
