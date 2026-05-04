// ─────────────────────────────────────────────────────────────────────────────
// Centralised page content — source of truth for all page text and images.
// Replace `src` values with CMS asset URLs when integrating a headless CMS.
// All images are free under the Unsplash License (unsplash.com/license).
// ─────────────────────────────────────────────────────────────────────────────

export interface PageImage {
  src: string;
  alt: string;
}

export interface HeroContent {
  eyebrow: string;
  title: string;
  description: string;
  image: PageImage;
}

// ─── Homepage ─────────────────────────────────────────────────────────────────

export const homepageImages = {
  // Julie Pittevils — mother carrying child in Mozambique (Unsplash)
  hero: {
    src: "https://images.unsplash.com/photo-1724491801484-efca6936866a?auto=format&fit=crop&w=1200&q=80",
    alt: "A joyful African mother carrying her young child on her back in Mozambique, both smiling",
  },
  // Annie Spratt — portrait of a young girl in Sierra Leone (Unsplash)
  problem: {
    src: "https://images.unsplash.com/photo-1509099955921-f0b4ed0c175c?auto=format&fit=crop&w=900&q=80",
    alt: "A contemplative young woman in Sierra Leone — representing the silent struggle many mothers face without support",
  },
} satisfies Record<string, PageImage>;

// ─── About ────────────────────────────────────────────────────────────────────

export const aboutHero: HeroContent = {
  eyebrow: "Our Story",
  title: "A Sanctuary for Every Mother",
  description:
    "Founded with the belief that no mother should walk the journey of mental health alone. We are a collective dedicated to uplifting, supporting, and advocating for maternal well-being across the Gambia.",
  image: {
    src: "https://images.unsplash.com/photo-1740741704998-8074200ce5d6?auto=format&fit=crop&w=1400&q=80",
    alt: "An African mother tenderly cradling her young child — the bond at the heart of GAMMHA's work",
  },
};

// Abo Ngalonkulu — mother and child, Port Elizabeth, South Africa (Unsplash)
export const aboutSectionImage: PageImage = {
  src: "https://images.unsplash.com/photo-1557927755-7ce043096949?auto=format&fit=crop&w=900&q=80",
  alt: "A mother and her child sharing a tender moment in South Africa — every mother deserves to be well",
};

export const aboutValues = [
  {
    iconName: "Heart",
    title: "Empathy",
    description:
      "We lead with a soft heart, understanding the unique challenges of motherhood without judgment.",
  },
  {
    iconName: "Megaphone",
    title: "Advocacy",
    description:
      "We are the voice for those who feel silenced, fighting for better systemic support and policy change.",
  },
  {
    iconName: "Users",
    title: "Community",
    description:
      "We believe healing happens in circles. Together, we create a network of collective strength.",
  },
  {
    iconName: "Award",
    title: "Integrity",
    description:
      "Our commitment is unwavering. We act with transparency, honesty, and professional excellence.",
  },
];

export const teamMembers = [
  {
    name: "Fatima Bah",
    role: "Executive Director & Founder",
    description:
      "A dedicated maternal health specialist with over 15 years of experience in community mental health advocacy across West Africa.",
    image:
      "https://images.unsplash.com/photo-1638727295415-286409421143?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Dr. Aminata Jallow",
    role: "Clinical Advisor",
    description:
      "Board-certified psychiatrist specialising in perinatal mood disorders and cultural psychology within the Gambian context.",
    image:
      "https://images.unsplash.com/photo-1662850886700-4ec19bd30d11?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Binta Touray",
    role: "Community Coordinator",
    description:
      "Lived-experience advocate leading our peer-support circles and grassroots community outreach programmes.",
    image:
      "https://images.unsplash.com/photo-1508002366005-75a695ee2d17?auto=format&fit=crop&w=600&q=80",
  },
];

export const aboutStats = [
  {
    stat: "1 in 5",
    text: "mothers will experience a mental health condition during pregnancy or after birth",
  },
  {
    stat: "72%",
    text: "of affected mothers in low-income countries receive no treatment at all",
  },
  {
    stat: "100%",
    text: "of these conditions are treatable — with the right awareness and support",
  },
];

// ─── Mental Health ────────────────────────────────────────────────────────────

export const mentalHealthHero: HeroContent = {
  eyebrow: "Maternal Mental Health",
  title: "Understanding Maternal Mental Health",
  description:
    "Mental health conditions during and after pregnancy are very common. You are not alone, and you are not to blame. With the right support, you can recover.",
  // Annie Spratt — woman carrying baby on back, Sierra Leone (Unsplash)
  image: {
    src: "https://images.unsplash.com/photo-1487546331507-fcf8a5d27ab3?auto=format&fit=crop&w=1200&q=80",
    alt: "An African mother carrying her baby on her back in Sierra Leone — a symbol of resilience, love, and the need for maternal support",
  },
};

// Vitaly Gariev — two women talking in a therapy session (Unsplash)
export const mentalHealthSectionImage: PageImage = {
  src: "https://images.unsplash.com/photo-1758273241078-8eec353836be?auto=format&fit=crop&w=900&q=80",
  alt: "Two women in a supportive conversation during a therapy session — seeking help is a sign of strength",
};

export const mentalHealthKeyFacts = [
  "These conditions are very common — 1 in 5 mothers is affected",
  "They are not a sign of weakness or bad mothering",
  "They can happen to any mother, anywhere, at any time",
  "They can be treated — and most mothers fully recover",
  "Getting help early makes recovery faster and easier",
];

export const conditions = [
  {
    id: "postpartum",
    title: "Postpartum Depression (PPD)",
    description:
      "A common condition affecting mothers after birth. It is more than just feeling sad — it can make it hard to care for yourself and your baby.",
    signs: [
      "Feeling very sad, hopeless, or empty",
      "Losing interest in things you used to enjoy",
      "Feeling disconnected from your baby",
      "Difficulty sleeping even when your baby sleeps",
      "Feeling worthless or like a bad mother",
      "Having dark or frightening thoughts",
    ],
    note: "PPD is not a sign of weakness. It is a medical condition that can be treated.",
  },
  {
    id: "anxiety",
    title: "Perinatal Anxiety",
    description:
      "Anxiety during and after pregnancy is very common but often goes unrecognised. It can appear during pregnancy or after birth.",
    signs: [
      "Constant worry that feels out of control",
      "Racing thoughts, especially about your baby's safety",
      "Feeling on edge or very irritable",
      "Physical symptoms: fast heartbeat, sweating, shaking",
      "Avoiding people or situations",
      "Difficulty making decisions",
    ],
    note: "Anxiety is treatable. Reaching out early leads to faster recovery.",
  },
];

export const warningSigns = [
  "You feel like you might hurt yourself or your baby",
  "You are hearing or seeing things that others cannot",
  "You feel completely unable to care for yourself or your baby",
  "You have gone several days without sleeping",
  "You feel completely out of touch with reality",
];

export const alsoSeekHelp = [
  "Your symptoms have lasted more than two weeks",
  "Your feelings are getting in the way of daily life or caring for your baby",
  "You feel like things are not going to get better",
  "Your family or friends are worried about you",
];

// ─── Support ──────────────────────────────────────────────────────────────────

export const supportHero: HeroContent = {
  eyebrow: "Get Support",
  title: "You Deserve Help. We Are Here.",
  description:
    "Reaching out is the bravest thing you can do. GAMMHA provides safe, confidential support for mothers dealing with mental health challenges — at no cost.",
  // Free — woman in striped shirt carrying baby (Unsplash)
  image: {
    src: "https://images.unsplash.com/photo-1596510914914-e14c6f59f925?auto=format&fit=crop&w=1200&q=80",
    alt: "A mother lovingly carrying her baby — every mother deserves care and support",
  },
};

// Vitaly Gariev — therapist listens to patient in counselling session (Unsplash)
export const supportSectionImage: PageImage = {
  src: "https://images.unsplash.com/photo-1758273241086-f3585ef8c2f8?auto=format&fit=crop&w=900&q=80",
  alt: "A GAMMHA support worker listening attentively to a mother during a confidential counselling session",
};

export const supportChannels = [
  {
    iconName: "Phone",
    title: "Phone Support",
    description:
      "Speak directly with a trained support worker who understands what you are going through.",
    action: "Call +220 123 4567",
    href: "tel:+2201234567",
    availability: "Monday – Friday, 8am – 6pm",
  },
  {
    iconName: "MessageCircle",
    title: "WhatsApp Support",
    description:
      "Message us on WhatsApp. Share as much or as little as you feel comfortable with.",
    action: "Message on WhatsApp",
    href: "https://wa.me/2201234567",
    availability: "Monday – Saturday, 8am – 8pm",
  },
  {
    iconName: "Mail",
    title: "Email Us",
    description:
      "Send us an email and we will respond within one working day.",
    action: "support@gammha.org",
    href: "mailto:support@gammha.org",
    availability: "Response within 24 hours",
  },
];

export const howToSteps = [
  {
    step: "1",
    title: "Reach Out",
    description:
      "Contact us by phone, WhatsApp, or email. You do not need to explain everything at once.",
  },
  {
    step: "2",
    title: "Talk With Us",
    description:
      "A trained support worker will listen to you without judgement and help you understand your options.",
  },
  {
    step: "3",
    title: "Get a Plan",
    description:
      "Together we will find the right support for your situation — whether that is local resources, professional referral, or ongoing peer support.",
  },
  {
    step: "4",
    title: "You Are Not Alone",
    description:
      "We will stay in touch as long as you need us. Recovery is possible, and we are with you every step.",
  },
];

export const officeInfo = {
  address: "GAMMHA Office, Kairaba Avenue, Banjul, The Gambia",
  hours: "Open: Monday – Friday, 8am – 5pm",
};

// ─── Advocacy ─────────────────────────────────────────────────────────────────

export const advocacyHero: HeroContent = {
  eyebrow: "Advocacy & Campaigns",
  title: "Changing Systems. Changing Lives.",
  description:
    "Awareness alone is not enough. GAMMHA actively advocates for policy change, health system reform, and community transformation to ensure mothers receive the mental health support they need and deserve.",
  // Free — wide-angle outdoor community gathering (Unsplash)
  image: {
    src: "https://images.unsplash.com/photo-1579283135011-0974a412341a?auto=format&fit=crop&w=1200&q=80",
    alt: "A community gathering outdoors — the kind of grassroots connection that drives GAMMHA's advocacy work",
  },
};

// Toluwaseun Olaleye — educational charity event in Port Harcourt, Nigeria (Unsplash)
export const advocacySectionImage: PageImage = {
  src: "https://images.unsplash.com/photo-1632215861513-130b66fe97f4?auto=format&fit=crop&w=1400&q=80",
  alt: "GAMMHA volunteers conducting a community education event in Nigeria — training the next generation of maternal health advocates",
};

export const campaigns = [
  {
    title: "Break the Silence Campaign",
    status: "Active",
    description:
      "A nationwide awareness campaign challenging the stigma around maternal mental health. We are bringing conversations about mental health into homes, clinics, and communities.",
    goals: [
      "Reach 50,000 mothers with mental health information",
      "Train 500 community health workers",
      "Engage 200 religious and community leaders",
    ],
  },
  {
    title: "Policy Reform Initiative",
    status: "Active",
    description:
      "Working with government and health institutions to ensure maternal mental health is included in national health policy and integrated into routine antenatal care.",
    goals: [
      "Advocate for maternal mental health screening in all health facilities",
      "Push for dedicated mental health budget in the Ministry of Health",
      "Establish national guidelines for maternal mental health care",
    ],
  },
  {
    title: "Health Worker Training Programme",
    status: "Ongoing",
    description:
      "Building the capacity of midwives, nurses, and community health workers to identify and support mothers with mental health conditions.",
    goals: [
      "Train 1,000 health workers by end of year",
      "Develop Gambia-specific training materials",
      "Partner with all regional health districts",
    ],
  },
];

export const policyItems = [
  {
    title: "National Health Policy",
    text: "Advocating for maternal mental health to be formally included in The Gambia's National Health Policy.",
  },
  {
    title: "Routine Screening",
    text: "Pushing for mental health screening to become a standard part of antenatal and postnatal care in all facilities.",
  },
  {
    title: "Training Standards",
    text: "Working to ensure all midwives and nurses receive mental health training as part of their professional development.",
  },
  {
    title: "Funding Allocation",
    text: "Engaging government to dedicate a specific budget line for maternal mental health services.",
  },
];

export const getInvolvedOptions = [
  {
    iconName: "Megaphone",
    title: "Spread Awareness",
    description:
      "Share GAMMHA's message on social media, in your community, or at your workplace. Every voice counts.",
  },
  {
    iconName: "Users",
    title: "Volunteer",
    description:
      "Join our team of volunteers and help with events, outreach, community education, and support programmes.",
  },
  {
    iconName: "FileText",
    title: "Partner With Us",
    description:
      "If you represent an organisation, clinic, NGO, or government body, let's work together to reach more mothers.",
  },
  {
    iconName: "Globe",
    title: "Advocate Publicly",
    description:
      "Use your platform — whether it's a blog, radio, or community group — to champion maternal mental health.",
  },
];

// ─── Resources ────────────────────────────────────────────────────────────────

export const resourcesHero: HeroContent = {
  eyebrow: "Resources",
  title: "Learn, Understand, and Share",
  description:
    "Clear guides and articles on maternal mental health — written in simple language, for mothers, families, and health workers.",
  // JALO HOTEL — community gathering in circular formation, Shashamene, Ethiopia (Unsplash)
  image: {
    src: "https://images.unsplash.com/photo-1680686096565-7ff0998b1df4?auto=format&fit=crop&w=1200&q=80",
    alt: "A health educator facilitating a community learning session with a group of African women seated in a circle",
  },
};

// ─── Donate ───────────────────────────────────────────────────────────────────

// Free — pregnant woman cradling her belly (Unsplash)
export const donateHeroImage: PageImage = {
  src: "https://images.unsplash.com/photo-1493894473891-10fc1e5dbd22?auto=format&fit=crop&w=1200&q=80",
  alt: "A pregnant mother tenderly cradling her baby bump — representing the hope your donation protects",
};

// ─── Homepage data ────────────────────────────────────────────────────────────

export const focusAreas = [
  {
    iconName: "Shield",
    title: "Advocacy",
    description:
      "We champion policy changes that protect mothers' mental health rights and ensure proper care across The Gambia.",
    href: "/advocacy",
  },
  {
    iconName: "Heart",
    title: "Support",
    description:
      "Connecting mothers with the help they need — from peer support to professional guidance and crisis care.",
    href: "/support",
  },
  {
    iconName: "BookOpen",
    title: "Education",
    description:
      "Providing clear, simple resources to help mothers, families, and health workers understand maternal mental health.",
    href: "/resources",
  },
  {
    iconName: "Users",
    title: "Community",
    description:
      "Building a network of care where no mother feels alone — strengthening families and communities together.",
    href: "/about",
  },
];

export const problemStats = [
  {
    value: "1 in 5",
    label: "mothers experiences a mental health condition during or after pregnancy",
  },
  {
    value: "72%",
    label: "of affected mothers in low-income countries never receive any help",
  },
  {
    value: "80%",
    label: "of cases are treatable — but only if the mother is reached in time",
  },
];

// ─── Resources data ───────────────────────────────────────────────────────────

export const resourceArticles = [
  {
    tag: "Guide",
    title: "What is Postpartum Depression?",
    description:
      "A clear, simple explanation of postpartum depression — what it is, why it happens, and what you can do.",
    readTime: "5 min read",
    href: "/mental-health#postpartum",
  },
  {
    tag: "Article",
    title: "Supporting a Mother With Anxiety",
    description:
      "Practical, compassionate advice for partners, family members, and friends on how to truly help.",
    readTime: "6 min read",
    href: "/mental-health",
  },
  {
    tag: "Guide",
    title: "When to Seek Professional Help",
    description:
      "How to know when you or someone you care about needs more than peer support.",
    readTime: "4 min read",
    href: "/mental-health#seek-help",
  },
  {
    tag: "Article",
    title: "Talking to Your Partner About How You Feel",
    description:
      "Opening up about mental health can be hard. This guide helps you find the words.",
    readTime: "5 min read",
    href: "/mental-health",
  },
  {
    tag: "Guide",
    title: "What Health Workers Should Know",
    description:
      "Key information for midwives, nurses, and health workers on identifying and supporting affected mothers.",
    readTime: "8 min read",
    href: "/mental-health",
  },
  {
    tag: "Article",
    title: "Looking After Yourself as a New Mother",
    description:
      "Simple, evidence-based self-care strategies that genuinely help with mental wellbeing.",
    readTime: "5 min read",
    href: "/mental-health",
  },
];

export const externalLinks = [
  {
    name: "World Health Organization — Maternal Mental Health",
    href: "https://www.who.int/teams/mental-health-and-substance-use/promotion-prevention/maternal-mental-health",
    description: "WHO resources and global research on maternal mental health.",
  },
  {
    name: "Postpartum Support International",
    href: "https://www.postpartum.net",
    description:
      "International organisation dedicated to support for perinatal mental health.",
  },
  {
    name: "UNICEF — Maternal Mental Health",
    href: "https://www.unicef.org",
    description:
      "UNICEF resources on maternal wellbeing and child development.",
  },
];

// ─── Donate data ──────────────────────────────────────────────────────────────

export const donatePresetAmounts = [100, 250, 500, 1000];

export const donateImpactItems = [
  {
    amount: "D100",
    numericAmount: 100,
    headline: "Inform 10 Mothers",
    impact:
      "Provides maternal mental health information to 10 mothers in a community awareness session.",
  },
  {
    amount: "D250",
    numericAmount: 250,
    headline: "3 Peer Support Sessions",
    impact:
      "Supports one mother through three one-to-one peer support sessions with a trained volunteer.",
  },
  {
    amount: "D500",
    numericAmount: 500,
    headline: "Train a Health Worker",
    impact:
      "Fully trains one community health worker in recognising and supporting maternal mental health conditions.",
  },
  {
    amount: "D1,000",
    numericAmount: 1000,
    headline: "One Week of Rural Outreach",
    impact:
      "Funds a full week of outreach in a rural community — reaching mothers who have no other access to support.",
  },
];

export const donateTrustSignals = [
  {
    iconName: "ShieldCheck",
    label: "Secure & Transparent",
    description:
      "100% of your donation goes directly to our programmes. We publish annual impact reports.",
  },
  {
    iconName: "Users",
    label: "Community-Led",
    description:
      "Founded and run by Gambians, for Gambians. We understand the mothers we serve.",
  },
  {
    iconName: "TrendingUp",
    label: "Proven Impact",
    description:
      "Since founding, we have reached over 5,000 mothers with awareness, support, and training.",
  },
];

// ─── Contact ──────────────────────────────────────────────────────────────────

// Vitaly Gariev — two women in a warm, supportive conversation (Unsplash)
export const contactHero: HeroContent = {
  eyebrow: "Contact Us",
  title: "We Are Here to Listen",
  description:
    "Whether you are searching for support, seeking to partner with us, or simply need someone to talk to — every message matters. Reach out and a real person will respond.",
  image: {
    src: "https://images.unsplash.com/photo-1758273241086-f3585ef8c2f8?auto=format&fit=crop&w=1200&q=80",
    alt: "A GAMMHA support worker listening warmly to a mother — no mother should face her struggles alone",
  },
};
