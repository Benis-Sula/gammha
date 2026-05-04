import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { requireAdmin } from '@/lib/auth'

export async function GET(req: Request) {
  const { error } = await requireAdmin()
  if (error) return error
  const { searchParams } = new URL(req.url)
  const page = Math.max(1, Number(searchParams.get('page') ?? 1))
  const limit = 20
  const [items, total] = await Promise.all([
    prisma.contactSubmission.findMany({
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.contactSubmission.count(),
  ])
  return NextResponse.json({ items, total, page, pages: Math.ceil(total / limit) })
}
