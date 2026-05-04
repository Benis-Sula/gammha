import { NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/db'
import { requireAdmin } from '@/lib/auth'
import { revalidatePath } from 'next/cache'

const patchSchema = z.array(z.object({ key: z.string().min(1), value: z.string() }))

export async function GET() {
  const { error } = await requireAdmin()
  if (error) return error
  const rows = await prisma.siteSetting.findMany()
  const map = Object.fromEntries(rows.map((r) => [r.key, r.value]))
  return NextResponse.json(map)
}

export async function PATCH(req: Request) {
  const { error } = await requireAdmin()
  if (error) return error
  const parsed = patchSchema.safeParse(await req.json())
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  await prisma.$transaction(
    parsed.data.map((item) =>
      prisma.siteSetting.upsert({
        where: { key: item.key },
        update: { value: item.value },
        create: { key: item.key, value: item.value },
      })
    )
  )
  revalidatePath('/contact')
  revalidatePath('/support')
  return NextResponse.json({ ok: true })
}
