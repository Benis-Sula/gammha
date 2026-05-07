import { NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/db'
import { requireAdmin } from '@/lib/auth'
import { revalidatePath } from 'next/cache'

const schema = z.object({
  value: z.string().optional(),
  order: z.number().optional(),
})

const GROUP_PATHS: Record<string, string[]> = {
  homepage_about_preview: ['/'], homepage_mission_card: ['/'], cta_homepage: ['/'],
  about_mission: ['/about'], about_vision: ['/about'], about_why_it_matters: ['/about'], about_support_quote: ['/about'], cta_about: ['/about'],
  mh_what_is_it: ['/mental-health'], mh_key_facts: ['/mental-health'], mh_emotional_support: ['/mental-health'], cta_mental_health: ['/mental-health'],
  support_crisis_card: ['/support'], support_anonymous_card: ['/support'], support_how_it_works: ['/support'],
  advocacy_overlay_quote: ['/advocacy'], cta_advocacy: ['/advocacy'],
  cta_resources: ['/resources'],
  donate_why: ['/donate'], donate_testimonial: ['/donate'], donate_trust_signals: ['/donate'], donate_success: ['/donate'],
  contact_urgent_nudge: ['/contact'], contact_section_heading: ['/contact'], contact_success: ['/contact'],
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { error } = await requireAdmin()
  if (error) return error
  const { id } = await params
  const parsed = schema.safeParse(await req.json())
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  const block = await prisma.pageBlock.update({ where: { id }, data: parsed.data })
  const paths = GROUP_PATHS[block.group] ?? ['/']
  paths.forEach((p) => revalidatePath(p))
  return NextResponse.json(block)
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { error } = await requireAdmin()
  if (error) return error
  const { id } = await params
  const block = await prisma.pageBlock.delete({ where: { id } })
  const paths = GROUP_PATHS[block.group] ?? ['/']
  paths.forEach((p) => revalidatePath(p))
  return NextResponse.json({ ok: true })
}
