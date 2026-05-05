import { prisma } from './db'
import {
  teamMembers as fallbackTeam,
  campaigns as fallbackCampaigns,
  conditions as fallbackConditions,
  resourceArticles as fallbackArticles,
  externalLinks as fallbackExtLinks,
  focusAreas as fallbackFocusAreas,
  problemStats as fallbackStats,
  aboutStats as fallbackAboutStats,
  donateImpactItems as fallbackTiers,
  warningSigns as fallbackWarning,
  alsoSeekHelp as fallbackAlsoSeek,
  supportChannels as fallbackChannels,
  policyItems as fallbackPolicy,
  getInvolvedOptions as fallbackInvolvement,
  aboutHero, mentalHealthHero, supportHero, advocacyHero,
  resourcesHero, contactHero,
} from './content'

// ─── Hero sections ─────────────────────────────────────────────────────────────

export type HeroData = { eyebrow: string; title: string; description: string; image: { src: string; alt: string } } | null

export async function getHero(pageSlug: string): Promise<HeroData> {
  try {
    const row = await prisma.heroSection.findUnique({ where: { pageSlug } })
    if (row) return { eyebrow: row.eyebrow, title: row.title, description: row.description, image: { src: row.imageSrc, alt: row.imageAlt } }
  } catch {}
  const fallbacks: Record<string, typeof aboutHero> = { about: aboutHero, 'mental-health': mentalHealthHero, support: supportHero, advocacy: advocacyHero, resources: resourcesHero, contact: contactHero }
  return fallbacks[pageSlug] ?? null
}

// ─── Team ─────────────────────────────────────────────────────────────────────

export async function getTeamMembers() {
  try {
    const rows = await prisma.teamMember.findMany({ orderBy: { order: 'asc' } })
    if (rows.length > 0) return rows
  } catch {}
  return fallbackTeam
}

// ─── Campaigns ────────────────────────────────────────────────────────────────

export async function getCampaigns() {
  try {
    const rows = await prisma.campaign.findMany({ orderBy: { order: 'asc' } })
    if (rows.length > 0) return rows
  } catch {}
  return fallbackCampaigns
}

// ─── Mental health conditions ─────────────────────────────────────────────────

export async function getConditions() {
  try {
    const rows = await prisma.condition.findMany({ orderBy: { order: 'asc' } })
    if (rows.length > 0) return rows.map((r) => ({ ...r, id: r.slug }))
  } catch {}
  return fallbackConditions
}

// ─── Resources ────────────────────────────────────────────────────────────────

export async function getResourceArticles() {
  try {
    const rows = await prisma.resourceArticle.findMany({ orderBy: { order: 'asc' } })
    if (rows.length > 0) return rows
  } catch {}
  return fallbackArticles
}

export async function getExternalLinks() {
  try {
    const rows = await prisma.externalLink.findMany({ orderBy: { order: 'asc' } })
    if (rows.length > 0) return rows
  } catch {}
  return fallbackExtLinks
}

// ─── Statistics ───────────────────────────────────────────────────────────────

export async function getStatsByGroup(group: string) {
  try {
    const rows = await prisma.statistic.findMany({ where: { group }, orderBy: { order: 'asc' } })
    if (rows.length > 0) return rows.map((r) => ({ value: r.value, label: r.label }))
  } catch {}
  if (group === 'homepage') return fallbackStats
  if (group === 'about') return fallbackAboutStats.map((s) => ({ value: s.stat, label: s.text }))
  return []
}

// ─── Donation tiers ───────────────────────────────────────────────────────────

export async function getDonationTiers() {
  try {
    const rows = await prisma.donationTier.findMany({ orderBy: { order: 'asc' } })
    if (rows.length > 0) return rows
  } catch {}
  return fallbackTiers
}

// ─── Focus areas ──────────────────────────────────────────────────────────────

export async function getFocusAreas() {
  try {
    const rows = await prisma.focusArea.findMany({ orderBy: { order: 'asc' } })
    if (rows.length > 0) return rows
  } catch {}
  return fallbackFocusAreas
}

// ─── Warning signs ────────────────────────────────────────────────────────────

export async function getWarningSigns(group: 'warning' | 'also-seek') {
  try {
    const rows = await prisma.warningSign.findMany({ where: { group }, orderBy: { order: 'asc' } })
    if (rows.length > 0) return rows.map((r) => r.text)
  } catch {}
  return group === 'warning' ? fallbackWarning : fallbackAlsoSeek
}

// ─── Support channels ─────────────────────────────────────────────────────────

export async function getSupportChannels() {
  try {
    const rows = await prisma.supportChannel.findMany({ orderBy: { order: 'asc' } })
    if (rows.length > 0) return rows
  } catch {}
  return fallbackChannels
}

// ─── Involvement options ──────────────────────────────────────────────────────

export async function getInvolvementOptions() {
  try {
    const rows = await prisma.involvementOption.findMany({ orderBy: { order: 'asc' } })
    if (rows.length > 0) return rows
  } catch {}
  return fallbackInvolvement
}

// ─── Policy items ─────────────────────────────────────────────────────────────

export async function getPolicyItems() {
  try {
    const rows = await prisma.policyItem.findMany({ orderBy: { order: 'asc' } })
    if (rows.length > 0) return rows
  } catch {}
  return fallbackPolicy
}

// ─── Site settings ────────────────────────────────────────────────────────────

export async function getSiteSettings(): Promise<Record<string, string>> {
  try {
    const rows = await prisma.siteSetting.findMany()
    return Object.fromEntries(rows.map((r) => [r.key, r.value]))
  } catch {}
  return {}
}
