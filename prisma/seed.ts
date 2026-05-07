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
  aboutValues, howToSteps, donateTrustSignals, mentalHealthKeyFacts,
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
    // Navbar & footer text
    navbar_logo_text: 'GAMMHA',
    navbar_cta_help_label: 'Get Help',
    navbar_cta_donate_label: 'Donate',
    footer_branding_description: 'Gambia Alliance for Maternal Mental Health & Advocacy. Supporting mothers through awareness, care, and community.',
    footer_tagline: 'for mothers in The Gambia',
    // Contact form subject options (one per line, stored as newline-separated)
    form_subjects_support: 'General Inquiry\nSupport for Myself\nSupport for Someone I Know\nVolunteer Opportunities\nAdvocacy Programs',
    form_subjects_contact: 'I need support for myself or someone I know\nI want to volunteer\nPartnership enquiry\nDonation enquiry\nMedia enquiry\nOther',
  }
  for (const [key, value] of Object.entries(settings)) {
    await prisma.siteSetting.upsert({ where: { key }, update: { value }, create: { key, value } })
  }
  console.log(`  ✓ ${Object.keys(settings).length} site settings`)

  // Resource articles — mark first 3 as featured for homepage preview
  for (let i = 0; i < Math.min(3, resourceArticles.length); i++) {
    await prisma.resourceArticle.update({ where: { id: `seed-article-${i}` }, data: { featured: true } })
  }
  console.log('  ✓ 3 resource articles marked as featured')

  // Value cards (About page "Our Values" section)
  for (const [i, v] of aboutValues.entries()) {
    const id = `seed-value-${i}`
    await prisma.valueCard.upsert({ where: { id }, update: { ...v, order: i }, create: { id, ...v, order: i } })
  }
  console.log(`  ✓ ${aboutValues.length} value cards`)

  // Process steps (Support page "How It Works")
  for (const [i, s] of howToSteps.entries()) {
    const id = `seed-step-${i}`
    await prisma.processStep.upsert({ where: { id }, update: { title: s.title, description: s.description, order: i }, create: { id, title: s.title, description: s.description, order: i } })
  }
  console.log(`  ✓ ${howToSteps.length} process steps`)

  // Nav links — navbar
  const navbarLinks = [
    { id: 'seed-nav-0', group: 'navbar', label: 'About', href: '/about', order: 0 },
    { id: 'seed-nav-1', group: 'navbar', label: 'Mental Health', href: '/mental-health', order: 1 },
    { id: 'seed-nav-2', group: 'navbar', label: 'Get Support', href: '/support', order: 2 },
    { id: 'seed-nav-3', group: 'navbar', label: 'Advocacy', href: '/advocacy', order: 3 },
    { id: 'seed-nav-4', group: 'navbar', label: 'Resources', href: '/resources', order: 4 },
    { id: 'seed-nav-5', group: 'navbar', label: 'Contact', href: '/contact', order: 5 },
  ]
  // Footer org links
  const footerOrgLinks = [
    { id: 'seed-forg-0', group: 'footer_org', label: 'About GAMMHA', href: '/about', order: 0 },
    { id: 'seed-forg-1', group: 'footer_org', label: 'Advocacy & Campaigns', href: '/advocacy', order: 1 },
    { id: 'seed-forg-2', group: 'footer_org', label: 'Resources', href: '/resources', order: 2 },
    { id: 'seed-forg-3', group: 'footer_org', label: 'Contact Us', href: '/contact', order: 3 },
  ]
  // Footer support links
  const footerSupportLinks = [
    { id: 'seed-fsup-0', group: 'footer_support', label: 'Maternal Mental Health', href: '/mental-health', order: 0 },
    { id: 'seed-fsup-1', group: 'footer_support', label: 'Get Support', href: '/support', order: 1 },
    { id: 'seed-fsup-2', group: 'footer_support', label: 'Crisis Help', href: '/support#crisis', order: 2 },
    { id: 'seed-fsup-3', group: 'footer_support', label: 'Donate', href: '/donate', order: 3 },
  ]
  // Social links
  const socialLinks = [
    { id: 'seed-soc-0', group: 'social', label: 'Facebook', href: '#', iconName: 'Facebook', order: 0 },
    { id: 'seed-soc-1', group: 'social', label: 'Twitter', href: '#', iconName: 'Twitter', order: 1 },
    { id: 'seed-soc-2', group: 'social', label: 'Instagram', href: '#', iconName: 'Instagram', order: 2 },
  ]
  const allNavLinks = [...navbarLinks, ...footerOrgLinks, ...footerSupportLinks, ...socialLinks]
  for (const link of allNavLinks) {
    await prisma.navLink.upsert({ where: { id: link.id }, update: link, create: link })
  }
  console.log(`  ✓ ${allNavLinks.length} nav/footer links`)

  // Page blocks — all hardcoded content indexed by [group, key]
  type PB = { id: string; group: string; key: string; value: string; order: number }
  const pageBlocks: PB[] = [
    // Homepage — About Preview section
    { id: 'pb-hp-about-eyebrow', group: 'homepage_about_preview', key: 'eyebrow', value: 'About GAMMHA', order: 0 },
    { id: 'pb-hp-about-title', group: 'homepage_about_preview', key: 'title', value: "Championing Mothers' Mental Health Since Day One", order: 1 },
    { id: 'pb-hp-about-desc', group: 'homepage_about_preview', key: 'description', value: 'GAMMHA was founded to address a critical gap — maternal mental health conditions in The Gambia are common, but support is rare. We are changing that.', order: 2 },
    { id: 'pb-hp-about-b0', group: 'homepage_about_preview', key: 'bullet_0', value: 'Raising awareness in communities and health facilities', order: 3 },
    { id: 'pb-hp-about-b1', group: 'homepage_about_preview', key: 'bullet_1', value: 'Training health workers to identify and support mothers', order: 4 },
    { id: 'pb-hp-about-b2', group: 'homepage_about_preview', key: 'bullet_2', value: 'Advocating for national mental health policies', order: 5 },
    { id: 'pb-hp-about-b3', group: 'homepage_about_preview', key: 'bullet_3', value: 'Providing a safe space for mothers to seek help', order: 6 },
    // Homepage — Mission card
    { id: 'pb-hp-mission-eyebrow', group: 'homepage_mission_card', key: 'mission_eyebrow', value: 'Our Mission', order: 0 },
    { id: 'pb-hp-mission-text', group: 'homepage_mission_card', key: 'mission_text', value: 'To ensure every mother in The Gambia has access to mental health awareness, support, and the care she deserves.', order: 1 },
    { id: 'pb-hp-vision-eyebrow', group: 'homepage_mission_card', key: 'vision_eyebrow', value: 'Our Vision', order: 2 },
    { id: 'pb-hp-vision-text', group: 'homepage_mission_card', key: 'vision_text', value: 'A Gambia where maternal mental health is understood, valued, and prioritised by families, communities, and government alike.', order: 3 },
    // Homepage — CTA Banner
    { id: 'pb-cta-hp-title', group: 'cta_homepage', key: 'title', value: 'Join the Movement for Mothers', order: 0 },
    { id: 'pb-cta-hp-desc', group: 'cta_homepage', key: 'description', value: 'Every mother deserves to feel well. Your support helps us reach more mothers across The Gambia.', order: 1 },
    { id: 'pb-cta-hp-p1', group: 'cta_homepage', key: 'primary_label', value: 'Donate Today', order: 2 },
    { id: 'pb-cta-hp-p2', group: 'cta_homepage', key: 'primary_href', value: '/donate', order: 3 },
    { id: 'pb-cta-hp-s1', group: 'cta_homepage', key: 'secondary_label', value: 'Get Involved', order: 4 },
    { id: 'pb-cta-hp-s2', group: 'cta_homepage', key: 'secondary_href', value: '/advocacy', order: 5 },
    // About — Mission block
    { id: 'pb-ab-mission-title', group: 'about_mission', key: 'title', value: 'Our Mission', order: 0 },
    { id: 'pb-ab-mission-desc', group: 'about_mission', key: 'description', value: 'To provide accessible, culturally-competent mental health resources and support systems for mothers and families in the Gambia. We aim to break the silence surrounding maternal mental health through education, community engagement, and direct intervention.', order: 1 },
    // About — Vision block
    { id: 'pb-ab-vision-title', group: 'about_vision', key: 'title', value: 'Our Vision', order: 0 },
    { id: 'pb-ab-vision-desc', group: 'about_vision', key: 'description', value: 'A nation where every mother is seen, heard, and supported in her mental health journey. We envision a future where maternal mental health services are integrated into every level of healthcare and community support is a standard for all families.', order: 1 },
    // About — Why it matters
    { id: 'pb-ab-why-desc', group: 'about_why_it_matters', key: 'description', value: 'Conditions like postpartum depression and anxiety during pregnancy are among the most common health complications mothers face — yet most women never receive any help.', order: 0 },
    // About — Support quote block
    { id: 'pb-ab-sq-heading', group: 'about_support_quote', key: 'heading', value: 'No mother should face this alone.', order: 0 },
    { id: 'pb-ab-sq-desc', group: 'about_support_quote', key: 'description', value: 'GAMMHA provides free, confidential support to mothers across The Gambia — through counselling, community networks, and trained health workers.', order: 1 },
    // About — CTA Banner
    { id: 'pb-cta-ab-title', group: 'cta_about', key: 'title', value: 'Be Part of the Change', order: 0 },
    { id: 'pb-cta-ab-desc', group: 'cta_about', key: 'description', value: "Support GAMMHA's work to improve maternal mental health in The Gambia. Every contribution makes a difference.", order: 1 },
    { id: 'pb-cta-ab-p1', group: 'cta_about', key: 'primary_label', value: 'Donate', order: 2 },
    { id: 'pb-cta-ab-p2', group: 'cta_about', key: 'primary_href', value: '/donate', order: 3 },
    { id: 'pb-cta-ab-s1', group: 'cta_about', key: 'secondary_label', value: 'Get Involved', order: 4 },
    { id: 'pb-cta-ab-s2', group: 'cta_about', key: 'secondary_href', value: '/advocacy', order: 5 },
    // Mental Health — What is it section
    { id: 'pb-mh-what-desc', group: 'mh_what_is_it', key: 'description', value: 'Maternal mental health refers to the emotional and psychological wellbeing of women during pregnancy and up to one year after giving birth. Conditions like depression and anxiety are among the most common complications of the perinatal period.', order: 0 },
    // Mental Health — Key facts
    ...mentalHealthKeyFacts.map((fact, i) => ({ id: `pb-mh-fact-${i}`, group: 'mh_key_facts', key: `fact_${i}`, value: fact, order: i })),
    // Mental Health — Emotional support block
    { id: 'pb-mh-es-heading', group: 'mh_emotional_support', key: 'heading', value: 'You are not broken. You are not a bad mother.', order: 0 },
    { id: 'pb-mh-es-desc', group: 'mh_emotional_support', key: 'description', value: 'Feeling this way does not mean you have failed. These conditions are caused by hormonal changes, stress, and lack of support — not by anything you have done wrong. Thousands of mothers in The Gambia have recovered with the right help.', order: 1 },
    { id: 'pb-mh-es-quote', group: 'mh_emotional_support', key: 'quote_text', value: 'I was ashamed to tell anyone. But when I finally spoke to GAMMHA, they made me feel seen and not judged. I am so much better now.', order: 2 },
    { id: 'pb-mh-es-attr', group: 'mh_emotional_support', key: 'quote_attribution', value: 'Aminata, mother of two, Banjul', order: 3 },
    // Mental Health — CTA Banner
    { id: 'pb-cta-mh-title', group: 'cta_mental_health', key: 'title', value: 'You Do Not Have to Face This Alone', order: 0 },
    { id: 'pb-cta-mh-desc', group: 'cta_mental_health', key: 'description', value: 'GAMMHA is here to help. Whether you need information, support, or just someone to talk to — reach out today.', order: 1 },
    { id: 'pb-cta-mh-p1', group: 'cta_mental_health', key: 'primary_label', value: 'Get Support', order: 2 },
    { id: 'pb-cta-mh-p2', group: 'cta_mental_health', key: 'primary_href', value: '/support', order: 3 },
    { id: 'pb-cta-mh-s1', group: 'cta_mental_health', key: 'secondary_label', value: 'Read Resources', order: 4 },
    { id: 'pb-cta-mh-s2', group: 'cta_mental_health', key: 'secondary_href', value: '/resources', order: 5 },
    // Support — Crisis card
    { id: 'pb-sup-crisis-heading', group: 'support_crisis_card', key: 'heading', value: 'Urgent Mental Health Support', order: 0 },
    { id: 'pb-sup-crisis-desc', group: 'support_crisis_card', key: 'description', value: 'If you or a mother you know is in immediate distress, experiencing intrusive thoughts, or feeling overwhelmed, please reach out now. Our trained responders are available.', order: 1 },
    // Support — Anonymous card
    { id: 'pb-sup-anon-heading', group: 'support_anonymous_card', key: 'heading', value: 'Safe & Anonymous', order: 0 },
    { id: 'pb-sup-anon-desc', group: 'support_anonymous_card', key: 'description', value: 'Your privacy is our priority. All conversations are completely confidential. You can remain anonymous if you choose.', order: 1 },
    // Support — How it works
    { id: 'pb-sup-hiw-desc', group: 'support_how_it_works', key: 'description', value: "We've made it as simple and gentle as possible to take the first step toward getting the help you deserve.", order: 0 },
    // Advocacy — Overlay quote
    { id: 'pb-adv-quote', group: 'advocacy_overlay_quote', key: 'text', value: 'Building a healthier future — one community at a time.', order: 0 },
    // Advocacy — CTA Banner
    { id: 'pb-cta-adv-title', group: 'cta_advocacy', key: 'title', value: 'Support Our Advocacy Work', order: 0 },
    { id: 'pb-cta-adv-desc', group: 'cta_advocacy', key: 'description', value: 'Your donation helps fund campaigns, training, and policy efforts that protect mothers across The Gambia.', order: 1 },
    { id: 'pb-cta-adv-p1', group: 'cta_advocacy', key: 'primary_label', value: 'Donate', order: 2 },
    { id: 'pb-cta-adv-p2', group: 'cta_advocacy', key: 'primary_href', value: '/donate', order: 3 },
    { id: 'pb-cta-adv-s1', group: 'cta_advocacy', key: 'secondary_label', value: 'Contact Us', order: 4 },
    { id: 'pb-cta-adv-s2', group: 'cta_advocacy', key: 'secondary_href', value: '/contact', order: 5 },
    // Resources — CTA Banner
    { id: 'pb-cta-res-title', group: 'cta_resources', key: 'title', value: 'Have a Resource to Share?', order: 0 },
    { id: 'pb-cta-res-desc', group: 'cta_resources', key: 'description', value: 'If you know of a guide, article, or tool that could help mothers in The Gambia, we would love to hear from you.', order: 1 },
    { id: 'pb-cta-res-p1', group: 'cta_resources', key: 'primary_label', value: 'Contact Us', order: 2 },
    { id: 'pb-cta-res-p2', group: 'cta_resources', key: 'primary_href', value: '/contact', order: 3 },
    { id: 'pb-cta-res-s1', group: 'cta_resources', key: 'secondary_label', value: 'Get Support', order: 4 },
    { id: 'pb-cta-res-s2', group: 'cta_resources', key: 'secondary_href', value: '/support', order: 5 },
    // Donate — Why donate section
    { id: 'pb-don-why-h1', group: 'donate_why', key: 'heading_line1', value: 'Your Gift Reaches a Mother', order: 0 },
    { id: 'pb-don-why-h2', group: 'donate_why', key: 'heading_line2', value: 'Who Has Nowhere Else to Turn', order: 1 },
    { id: 'pb-don-why-desc', group: 'donate_why', key: 'description', value: 'In The Gambia, 1 in 5 mothers experience a mental health condition — and 72% receive no help at all. Your donation changes that. Every Dalasi you give funds awareness, support, and advocacy for mothers who are suffering in silence.', order: 2 },
    { id: 'pb-don-why-b0', group: 'donate_why', key: 'bullet_0', value: 'Free, confidential support for mothers in crisis', order: 3 },
    { id: 'pb-don-why-b1', group: 'donate_why', key: 'bullet_1', value: 'Training community health workers across all regions', order: 4 },
    { id: 'pb-don-why-b2', group: 'donate_why', key: 'bullet_2', value: 'Policy advocacy to make mental health care a right', order: 5 },
    { id: 'pb-don-why-b3', group: 'donate_why', key: 'bullet_3', value: 'Awareness campaigns that reach thousands of families', order: 6 },
    // Donate — Testimonial
    { id: 'pb-don-test-quote', group: 'donate_testimonial', key: 'quote_text', value: 'I thought no one understood what I was going through. GAMMHA gave me hope.', order: 0 },
    { id: 'pb-don-test-attr', group: 'donate_testimonial', key: 'quote_attribution', value: 'Mother supported by GAMMHA, Banjul', order: 1 },
    // Donate — Trust signals
    ...donateTrustSignals.map((s, i) => [
      { id: `pb-don-ts-${i}-icon`, group: 'donate_trust_signals', key: `signal_${i}_icon`, value: s.iconName, order: i * 3 },
      { id: `pb-don-ts-${i}-label`, group: 'donate_trust_signals', key: `signal_${i}_label`, value: s.label, order: i * 3 + 1 },
      { id: `pb-don-ts-${i}-desc`, group: 'donate_trust_signals', key: `signal_${i}_description`, value: s.description, order: i * 3 + 2 },
    ]).flat(),
    // Donate — Success state
    { id: 'pb-don-suc-heading', group: 'donate_success', key: 'heading', value: 'Thank You for Your Generosity', order: 0 },
    { id: 'pb-don-suc-desc', group: 'donate_success', key: 'description', value: 'Your donation will help us support more mothers across The Gambia. We will be in touch with confirmation details.', order: 1 },
    // Contact — Urgent nudge
    { id: 'pb-con-nudge-heading', group: 'contact_urgent_nudge', key: 'heading', value: 'Need urgent help?', order: 0 },
    { id: 'pb-con-nudge-desc', group: 'contact_urgent_nudge', key: 'description', value: "If you or someone is in distress, don't wait for a reply. Visit our support page for immediate help.", order: 1 },
    // Contact — Section heading
    { id: 'pb-con-sec-title', group: 'contact_section_heading', key: 'title', value: 'How to Reach GAMMHA', order: 0 },
    // Contact — Success state
    { id: 'pb-con-suc-heading', group: 'contact_success', key: 'heading', value: 'Message Received', order: 0 },
    { id: 'pb-con-suc-desc', group: 'contact_success', key: 'description', value: 'Thank you for reaching out. A real person on our team will read your message and respond within one working day.', order: 1 },
  ]

  for (const block of pageBlocks) {
    const { id, ...data } = block
    await prisma.pageBlock.upsert({
      where: { group_key: { group: data.group, key: data.key } },
      update: { value: data.value, order: data.order },
      create: { id, ...data },
    })
  }
  console.log(`  ✓ ${pageBlocks.length} page blocks`)

  console.log('\nSeed complete.')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
