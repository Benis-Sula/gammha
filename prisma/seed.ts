import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

import {
  teamMembers, campaigns, conditions, resourceArticles,
  focusAreas, problemStats, aboutStats, donateImpactItems,
  warningSigns, alsoSeekHelp, supportChannels, policyItems,
  getInvolvedOptions, externalLinks,
  aboutHero, mentalHealthHero, supportHero, advocacyHero,
  resourcesHero, contactHero, homepageImages,
} from '../lib/content'

import {
  CONTACT_PHONE, CONTACT_EMAIL_INFO, CONTACT_EMAIL_SUPPORT,
  CONTACT_EMAIL_DONATIONS, CONTACT_ADDRESS, CONTACT_ADDRESS_FULL,
  OFFICE_HOURS, OFFICE_HOURS_PHONE, OFFICE_HOURS_WHATSAPP,
} from '../lib/constants'

async function main() {
  console.log('Seeding database…')

  // Hero sections
  const heroes = [
    { pageSlug: 'home', eyebrow: 'GAMMHA', title: 'Supporting Mothers\' Mental Health in The Gambia', description: 'GAMMHA provides free, confidential mental health support, education, and advocacy for mothers across The Gambia.', imageSrc: homepageImages.hero.src, imageAlt: homepageImages.hero.alt },
    { pageSlug: 'about', eyebrow: aboutHero.eyebrow, title: aboutHero.title, description: aboutHero.description, imageSrc: aboutHero.image.src, imageAlt: aboutHero.image.alt },
    { pageSlug: 'mental-health', eyebrow: mentalHealthHero.eyebrow, title: mentalHealthHero.title, description: mentalHealthHero.description, imageSrc: mentalHealthHero.image.src, imageAlt: mentalHealthHero.image.alt },
    { pageSlug: 'support', eyebrow: supportHero.eyebrow, title: supportHero.title, description: supportHero.description, imageSrc: supportHero.image.src, imageAlt: supportHero.image.alt },
    { pageSlug: 'advocacy', eyebrow: advocacyHero.eyebrow, title: advocacyHero.title, description: advocacyHero.description, imageSrc: advocacyHero.image.src, imageAlt: advocacyHero.image.alt },
    { pageSlug: 'resources', eyebrow: resourcesHero.eyebrow, title: resourcesHero.title, description: resourcesHero.description, imageSrc: resourcesHero.image.src, imageAlt: resourcesHero.image.alt },
    { pageSlug: 'contact', eyebrow: contactHero.eyebrow, title: contactHero.title, description: contactHero.description, imageSrc: contactHero.image.src, imageAlt: contactHero.image.alt },
  ]
  for (const h of heroes) {
    await prisma.heroSection.upsert({ where: { pageSlug: h.pageSlug }, update: h, create: h })
  }
  console.log(`  ✓ ${heroes.length} hero sections`)

  // Team members
  for (const [i, m] of teamMembers.entries()) {
    const id = `seed-team-${i}`
    await prisma.teamMember.upsert({ where: { id }, update: { ...m, order: i }, create: { id, ...m, order: i } })
  }
  console.log(`  ✓ ${teamMembers.length} team members`)

  // Campaigns
  for (const [i, c] of campaigns.entries()) {
    const id = `seed-campaign-${i}`
    await prisma.campaign.upsert({ where: { id }, update: { ...c, order: i }, create: { id, ...c, order: i } })
  }
  console.log(`  ✓ ${campaigns.length} campaigns`)

  // Conditions
  for (const [i, c] of conditions.entries()) {
    await prisma.condition.upsert({ where: { slug: c.id }, update: { title: c.title, description: c.description, signs: c.signs, note: c.note, order: i }, create: { slug: c.id, title: c.title, description: c.description, signs: c.signs, note: c.note, order: i } })
  }
  console.log(`  ✓ ${conditions.length} conditions`)

  // Resource articles
  for (const [i, a] of resourceArticles.entries()) {
    const id = `seed-article-${i}`
    await prisma.resourceArticle.upsert({ where: { id }, update: { ...a, order: i }, create: { id, ...a, order: i } })
  }
  console.log(`  ✓ ${resourceArticles.length} resource articles`)

  // External links
  for (const [i, l] of externalLinks.entries()) {
    const id = `seed-extlink-${i}`
    await prisma.externalLink.upsert({ where: { id }, update: { ...l, order: i }, create: { id, ...l, order: i } })
  }
  console.log(`  ✓ ${externalLinks.length} external links`)

  // Statistics — homepage
  for (const [i, s] of problemStats.entries()) {
    const id = `seed-stat-home-${i}`
    await prisma.statistic.upsert({ where: { id }, update: { group: 'homepage', value: s.value, label: s.label, order: i }, create: { id, group: 'homepage', value: s.value, label: s.label, order: i } })
  }
  // Statistics — about
  for (const [i, s] of aboutStats.entries()) {
    const id = `seed-stat-about-${i}`
    await prisma.statistic.upsert({ where: { id }, update: { group: 'about', value: s.stat, label: s.text, order: i }, create: { id, group: 'about', value: s.stat, label: s.text, order: i } })
  }
  console.log(`  ✓ ${problemStats.length + aboutStats.length} statistics`)

  // Donation tiers
  for (const [i, t] of donateImpactItems.entries()) {
    const id = `seed-tier-${i}`
    await prisma.donationTier.upsert({ where: { id }, update: { ...t, order: i }, create: { id, ...t, order: i } })
  }
  console.log(`  ✓ ${donateImpactItems.length} donation tiers`)

  // Focus areas
  for (const [i, f] of focusAreas.entries()) {
    const id = `seed-focus-${i}`
    await prisma.focusArea.upsert({ where: { id }, update: { ...f, order: i }, create: { id, ...f, order: i } })
  }
  console.log(`  ✓ ${focusAreas.length} focus areas`)

  // Warning signs
  for (const [i, text] of warningSigns.entries()) {
    const id = `seed-warn-${i}`
    await prisma.warningSign.upsert({ where: { id }, update: { text, group: 'warning', order: i }, create: { id, text, group: 'warning', order: i } })
  }
  for (const [i, text] of alsoSeekHelp.entries()) {
    const id = `seed-seek-${i}`
    await prisma.warningSign.upsert({ where: { id }, update: { text, group: 'also-seek', order: i }, create: { id, text, group: 'also-seek', order: i } })
  }
  console.log(`  ✓ ${warningSigns.length + alsoSeekHelp.length} warning signs`)

  // Support channels
  for (const [i, c] of supportChannels.entries()) {
    const id = `seed-channel-${i}`
    await prisma.supportChannel.upsert({ where: { id }, update: { ...c, order: i }, create: { id, ...c, order: i } })
  }
  console.log(`  ✓ ${supportChannels.length} support channels`)

  // Involvement options
  for (const [i, o] of getInvolvedOptions.entries()) {
    const id = `seed-involve-${i}`
    await prisma.involvementOption.upsert({ where: { id }, update: { ...o, order: i }, create: { id, ...o, order: i } })
  }
  console.log(`  ✓ ${getInvolvedOptions.length} involvement options`)

  // Policy items
  for (const [i, p] of policyItems.entries()) {
    const id = `seed-policy-${i}`
    await prisma.policyItem.upsert({ where: { id }, update: { ...p, order: i }, create: { id, ...p, order: i } })
  }
  console.log(`  ✓ ${policyItems.length} policy items`)

  // Site settings
  const settings: Record<string, string> = {
    contact_phone: CONTACT_PHONE,
    contact_phone_tel: `tel:${CONTACT_PHONE.replace(/\s/g, '')}`,
    contact_email_info: CONTACT_EMAIL_INFO,
    contact_email_support: CONTACT_EMAIL_SUPPORT,
    contact_email_donations: CONTACT_EMAIL_DONATIONS,
    contact_address: CONTACT_ADDRESS,
    contact_address_full: CONTACT_ADDRESS_FULL,
    office_hours: OFFICE_HOURS,
    office_hours_phone: OFFICE_HOURS_PHONE,
    office_hours_whatsapp: OFFICE_HOURS_WHATSAPP,
  }
  for (const [key, value] of Object.entries(settings)) {
    await prisma.siteSetting.upsert({ where: { key }, update: { value }, create: { key, value } })
  }
  console.log(`  ✓ ${Object.keys(settings).length} site settings`)

  console.log('\nSeed complete.')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
