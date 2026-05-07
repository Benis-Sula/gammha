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
  aboutValues as fallbackAboutValues,
  howToSteps as fallbackHowToSteps,
  donateTrustSignals as fallbackTrustSignals,
  mentalHealthKeyFacts as fallbackKeyFacts,
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

// ─── Page blocks ──────────────────────────────────────────────────────────────

export async function getPageBlockGroup(group: string): Promise<Record<string, string>> {
  try {
    const rows = await prisma.pageBlock.findMany({ where: { group }, orderBy: { order: 'asc' } })
    if (rows.length > 0) return Object.fromEntries(rows.map((r) => [r.key, r.value]))
  } catch {}
  return {}
}

// ─── Value cards (About page values section) ──────────────────────────────────

export async function getValueCards() {
  try {
    const rows = await prisma.valueCard.findMany({ orderBy: { order: 'asc' } })
    if (rows.length > 0) return rows
  } catch {}
  return fallbackAboutValues
}

// ─── Process steps (Support page How It Works) ───────────────────────────────

export async function getProcessSteps() {
  try {
    const rows = await prisma.processStep.findMany({ orderBy: { order: 'asc' } })
    if (rows.length > 0) return rows
  } catch {}
  return fallbackHowToSteps.map((s) => ({ id: s.step, title: s.title, description: s.description, order: 0, updatedAt: new Date() }))
}

// ─── Nav links (Navbar + Footer) ─────────────────────────────────────────────

const fallbackNavLinks: Record<string, { id: string; group: string; label: string; href: string; iconName: string | null; order: number }[]> = {
  navbar: [
    { id: 'nav-about', group: 'navbar', label: 'About', href: '/about', iconName: null, order: 0 },
    { id: 'nav-mental', group: 'navbar', label: 'Mental Health', href: '/mental-health', iconName: null, order: 1 },
    { id: 'nav-support', group: 'navbar', label: 'Get Support', href: '/support', iconName: null, order: 2 },
    { id: 'nav-advocacy', group: 'navbar', label: 'Advocacy', href: '/advocacy', iconName: null, order: 3 },
    { id: 'nav-resources', group: 'navbar', label: 'Resources', href: '/resources', iconName: null, order: 4 },
    { id: 'nav-contact', group: 'navbar', label: 'Contact', href: '/contact', iconName: null, order: 5 },
  ],
  footer_org: [
    { id: 'forg-0', group: 'footer_org', label: 'About GAMMHA', href: '/about', iconName: null, order: 0 },
    { id: 'forg-1', group: 'footer_org', label: 'Advocacy & Campaigns', href: '/advocacy', iconName: null, order: 1 },
    { id: 'forg-2', group: 'footer_org', label: 'Resources', href: '/resources', iconName: null, order: 2 },
    { id: 'forg-3', group: 'footer_org', label: 'Contact Us', href: '/contact', iconName: null, order: 3 },
  ],
  footer_support: [
    { id: 'fsup-0', group: 'footer_support', label: 'Maternal Mental Health', href: '/mental-health', iconName: null, order: 0 },
    { id: 'fsup-1', group: 'footer_support', label: 'Get Support', href: '/support', iconName: null, order: 1 },
    { id: 'fsup-2', group: 'footer_support', label: 'Crisis Help', href: '/support#crisis', iconName: null, order: 2 },
    { id: 'fsup-3', group: 'footer_support', label: 'Donate', href: '/donate', iconName: null, order: 3 },
  ],
  social: [
    { id: 'soc-0', group: 'social', label: 'Facebook', href: '#', iconName: 'Facebook', order: 0 },
    { id: 'soc-1', group: 'social', label: 'Twitter', href: '#', iconName: 'Twitter', order: 1 },
    { id: 'soc-2', group: 'social', label: 'Instagram', href: '#', iconName: 'Instagram', order: 2 },
  ],
}

export async function getNavLinks(group: string) {
  try {
    const rows = await prisma.navLink.findMany({ where: { group }, orderBy: { order: 'asc' } })
    if (rows.length > 0) return rows
  } catch {}
  return fallbackNavLinks[group] ?? []
}

// ─── Featured resource articles (Homepage preview) ────────────────────────────

export async function getFeaturedResourceArticles() {
  try {
    const rows = await prisma.resourceArticle.findMany({ where: { featured: true }, orderBy: { order: 'asc' }, take: 3 })
    if (rows.length > 0) return rows
  } catch {}
  return fallbackArticles.slice(0, 3)
}

// ─── Re-export fallbacks for use in page components ──────────────────────────

export { fallbackKeyFacts, fallbackTrustSignals }
