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
  const row = await prisma.heroSection.findUnique({ where: { pageSlug } })
  if (row) return { eyebrow: row.eyebrow, title: row.title, description: row.description, image: { src: row.imageSrc, alt: row.imageAlt } }
  const fallbacks: Record<string, typeof aboutHero> = { about: aboutHero, 'mental-health': mentalHealthHero, support: supportHero, advocacy: advocacyHero, resources: resourcesHero, contact: contactHero }
  return fallbacks[pageSlug] ?? null
}

// ─── Team ─────────────────────────────────────────────────────────────────────

export async function getTeamMembers() {
  const rows = await prisma.teamMember.findMany({ orderBy: { order: 'asc' } })
  return rows.length > 0 ? rows : fallbackTeam
}

// ─── Campaigns ────────────────────────────────────────────────────────────────

export async function getCampaigns() {
  const rows = await prisma.campaign.findMany({ orderBy: { order: 'asc' } })
  return rows.length > 0 ? rows : fallbackCampaigns
}

// ─── Mental health conditions ─────────────────────────────────────────────────

export async function getConditions() {
  const rows = await prisma.condition.findMany({ orderBy: { order: 'asc' } })
  return rows.length > 0 ? rows.map((r) => ({ ...r, id: r.slug })) : fallbackConditions
}

// ─── Resources ────────────────────────────────────────────────────────────────

export async function getResourceArticles() {
  const rows = await prisma.resourceArticle.findMany({ orderBy: { order: 'asc' } })
  return rows.length > 0 ? rows : fallbackArticles
}

export async function getExternalLinks() {
  const rows = await prisma.externalLink.findMany({ orderBy: { order: 'asc' } })
  return rows.length > 0 ? rows : fallbackExtLinks
}

// ─── Statistics ───────────────────────────────────────────────────────────────

export async function getStatsByGroup(group: string) {
  const rows = await prisma.statistic.findMany({ where: { group }, orderBy: { order: 'asc' } })
  if (rows.length > 0) return rows.map((r) => ({ value: r.value, label: r.label }))
  if (group === 'homepage') return fallbackStats
  if (group === 'about') return fallbackAboutStats.map((s) => ({ value: s.stat, label: s.text }))
  return []
}

// ─── Donation tiers ───────────────────────────────────────────────────────────

export async function getDonationTiers() {
  const rows = await prisma.donationTier.findMany({ orderBy: { order: 'asc' } })
  return rows.length > 0 ? rows : fallbackTiers
}

// ─── Focus areas ──────────────────────────────────────────────────────────────

export async function getFocusAreas() {
  const rows = await prisma.focusArea.findMany({ orderBy: { order: 'asc' } })
  return rows.length > 0 ? rows : fallbackFocusAreas
}

// ─── Warning signs ────────────────────────────────────────────────────────────

export async function getWarningSigns(group: 'warning' | 'also-seek') {
  const rows = await prisma.warningSign.findMany({ where: { group }, orderBy: { order: 'asc' } })
  if (rows.length > 0) return rows.map((r) => r.text)
  return group === 'warning' ? fallbackWarning : fallbackAlsoSeek
}

// ─── Support channels ─────────────────────────────────────────────────────────

export async function getSupportChannels() {
  const rows = await prisma.supportChannel.findMany({ orderBy: { order: 'asc' } })
  return rows.length > 0 ? rows : fallbackChannels
}

// ─── Involvement options ──────────────────────────────────────────────────────

export async function getInvolvementOptions() {
  const rows = await prisma.involvementOption.findMany({ orderBy: { order: 'asc' } })
  return rows.length > 0 ? rows : fallbackInvolvement
}

// ─── Policy items ─────────────────────────────────────────────────────────────

export async function getPolicyItems() {
  const rows = await prisma.policyItem.findMany({ orderBy: { order: 'asc' } })
  return rows.length > 0 ? rows : fallbackPolicy
}

// ─── Site settings ────────────────────────────────────────────────────────────

export async function getSiteSettings(): Promise<Record<string, string>> {
  const rows = await prisma.siteSetting.findMany()
  return Object.fromEntries(rows.map((r) => [r.key, r.value]))
}
