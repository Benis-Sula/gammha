import { NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/db'
import { requireAdmin } from '@/lib/auth'
import { revalidatePath } from 'next/cache'

const schema = z.object({
  iconName: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  order: z.number().optional(),
})

export async function GET() {
  const { error } = await requireAdmin()
  if (error) return error
  return NextResponse.json(await prisma.valueCard.findMany({ orderBy: { order: 'asc' } }))
}

export async function POST(req: Request) {
  const { error } = await requireAdmin()
  if (error) return error
  const parsed = schema.safeParse(await req.json())
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  const count = await prisma.valueCard.count()
  const card = await prisma.valueCard.create({ data: { ...parsed.data, order: parsed.data.order ?? count } })
  revalidatePath('/about')
  return NextResponse.json(card, { status: 201 })
}
