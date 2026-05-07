import { NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/db'
import { requireAdmin } from '@/lib/auth'
import { revalidatePath } from 'next/cache'

const schema = z.object({
  group: z.enum(['navbar', 'footer_org', 'footer_support', 'social']),
  label: z.string().min(1),
  href: z.string().min(1),
  iconName: z.string().optional(),
  order: z.number().optional(),
})

export async function GET() {
  const { error } = await requireAdmin()
  if (error) return error
  return NextResponse.json(await prisma.navLink.findMany({ orderBy: [{ group: 'asc' }, { order: 'asc' }] }))
}

export async function POST(req: Request) {
  const { error } = await requireAdmin()
  if (error) return error
  const parsed = schema.safeParse(await req.json())
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  const count = await prisma.navLink.count({ where: { group: parsed.data.group } })
  const link = await prisma.navLink.create({ data: { ...parsed.data, order: parsed.data.order ?? count } })
  revalidatePath('/', 'layout')
  return NextResponse.json(link, { status: 201 })
}
