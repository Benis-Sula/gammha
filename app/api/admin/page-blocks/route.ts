import { NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/db'
import { requireAdmin } from '@/lib/auth'
import { revalidatePath } from 'next/cache'

const schema = z.object({
  group: z.string().min(1),
  key: z.string().min(1),
  value: z.string(),
  order: z.number().optional(),
})

const GROUP_PATHS: Record<string, string[]> = {
  homepage_about_preview: ['/'],
  homepage_mission_card: ['/'],
  cta_homepage: ['/'],
  about_mission: ['/about'],
  about_vision: ['/about'],
  about_why_it_matters: ['/about'],
  about_support_quote: ['/about'],
  cta_about: ['/about'],
  mh_what_is_it: ['/mental-health'],
  mh_key_facts: ['/mental-health'],
  mh_emotional_support: ['/mental-health'],
  cta_mental_health: ['/mental-health'],
  support_crisis_card: ['/support'],
  support_anonymous_card: ['/support'],
  support_how_it_works: ['/support'],
  advocacy_overlay_quote: ['/advocacy'],
  cta_advocacy: ['/advocacy'],
  cta_resources: ['/resources'],
  donate_why: ['/donate'],
  donate_testimonial: ['/donate'],
  donate_trust_signals: ['/donate'],
  donate_success: ['/donate'],
  contact_urgent_nudge: ['/contact'],
  contact_section_heading: ['/contact'],
  contact_success: ['/contact'],
}

export async function GET() {
  const { error } = await requireAdmin()
  if (error) return error
  return NextResponse.json(await prisma.pageBlock.findMany({ orderBy: [{ group: 'asc' }, { order: 'asc' }] }))
}

export async function POST(req: Request) {
  const { error } = await requireAdmin()
  if (error) return error
  const parsed = schema.safeParse(await req.json())
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  const { group, key, value, order } = parsed.data
  const block = await prisma.pageBlock.upsert({
    where: { group_key: { group, key } },
    update: { value, ...(order !== undefined ? { order } : {}) },
    create: { group, key, value, order: order ?? 0 },
  })
  const paths = GROUP_PATHS[group] ?? ['/']
  paths.forEach((p) => revalidatePath(p))
  return NextResponse.json(block, { status: 201 })
}
