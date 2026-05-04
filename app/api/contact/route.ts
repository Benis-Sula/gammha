import { NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/db'

const schema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().optional(),
  email: z.string().email(),
  subject: z.string().optional(),
  message: z.string().min(10),
})

export async function POST(req: Request) {
  const parsed = schema.safeParse(await req.json())
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  await prisma.contactSubmission.create({ data: parsed.data })
  return NextResponse.json({ ok: true }, { status: 201 })
}
