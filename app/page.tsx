import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  Shield,
  BookOpen,
  Users,
  ArrowRight,
  Phone,
  MessageCircle,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import IconBox from "@/components/ui/IconBox";
import SectionHeader from "@/components/ui/SectionHeader";
import CTABanner from "@/components/sections/CTABanner";
import { homepageImages } from "@/lib/content";
import { getFocusAreas, getStatsByGroup, getHero, getSiteSettings, type HeroData } from "@/lib/data";
import { buildContactLinks } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Home",
  description:
    "GAMMHA supports mothers' mental health in The Gambia through awareness, advocacy, and community care.",
};

const iconMap: Record<string, LucideIcon> = { Shield, Heart, BookOpen, Users };

export default async function HomePage() {
  const [focusAreas, problemStats, homeHero, settings] = await Promise.all([
    getFocusAreas(),
    getStatsByGroup('homepage'),
    getHero('home'),
    getSiteSettings(),
  ])
  return (
    <>
      <HeroSection hero={homeHero} settings={settings} />
      <ProblemSection problemStats={problemStats} />
      <FocusAreasSection focusAreas={focusAreas} />
      <AboutPreviewSection />
      <ResourcesPreviewSection />
      <CTABanner
        title="Join the Movement for Mothers"
        description="Every mother deserves to feel well. Your support helps us reach more mothers across The Gambia."
        primaryLabel="Donate Today"
        primaryHref="/donate"
        secondaryLabel="Get Involved"
        secondaryHref="/advocacy"
      />
    </>
  );
}

function HeroSection({ hero, settings }: { hero: HeroData; settings: Record<string, string> }) {
  const phone = settings.contact_phone || "+220 123 4567";
  const { phoneTel, whatsappUrl } = buildContactLinks(phone);
  const eyebrow = hero?.eyebrow || "Gambia Alliance for Maternal Mental Health & Advocacy";
  const rawTitle = hero?.title || "No Mother Should Face This Alone";
  const titleWords = rawTitle.split(' ');
  const mid = Math.max(2, Math.floor(titleWords.length / 3));
  const titleLine1 = titleWords.slice(0, mid).join(' ');
  const titleLine2 = titleWords.slice(mid).join(' ');
  const description = hero?.description || "Every year, thousands of mothers in The Gambia struggle silently with depression, anxiety, and fear — with nowhere to turn. GAMMHA is changing that, one mother at a time.";
  const imageSrc = hero?.image?.src || homepageImages.hero.src;
  const imageAlt = hero?.image?.alt || homepageImages.hero.alt;

  return (
    <section
      className="bg-surface pt-12 md:pt-20 overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <div className="container-default">
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-10 lg:gap-16 items-end">
          {/* Text */}
          <div className="pb-12 lg:pb-16 order-2 lg:order-1">
            <p className="eyebrow text-primary mb-4">{eyebrow}</p>
            <h1
              id="hero-heading"
              className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-4xl font-bold text-text leading-tight"
            >
              <span className="block">{titleLine1}</span>
              {titleLine2 && <span className="block">{titleLine2}</span>}
            </h1>
            <p className="mt-6 text-lg md:text-xl text-text-muted leading-relaxed max-w-xl">
              {description}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button href={phoneTel} variant="primary" size="lg" className="shadow-elevated">
                <Phone className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                Get Help Now — Call Us
              </Button>
              <Button href="/donate" variant="accent" size="lg">
                <Heart className="w-5 h-5" aria-hidden="true" />
                Donate
              </Button>
              <Button href="/about" variant="ghost" size="lg">
                Our Story
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Button>
            </div>

            <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row gap-4 text-sm text-text-muted">
              <span className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" aria-hidden="true" />
                <a href={phoneTel} className="font-semibold text-primary hover:underline">
                  {phone}
                </a>
                <span>— Free, confidential helpline</span>
              </span>
              <span className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-primary flex-shrink-0" aria-hidden="true" />
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-primary hover:underline"
                >
                  WhatsApp us
                </a>
              </span>
            </div>
          </div>

          {/* Image */}
          <div className="relative aspect-[4/3] lg:aspect-auto lg:h-[480px] rounded-t-2xl overflow-hidden shadow-elevated order-1 lg:order-2">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function ProblemSection({ problemStats }: { problemStats: { value: string; label: string }[] }) {
  return (
    <section
      className="section-padding bg-surface-alt"
      aria-labelledby="problem-heading"
    >
      <div className="container-default">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-card">
            <Image
              src={homepageImages.problem.src}
              alt={homepageImages.problem.alt}
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-text/40 via-transparent to-transparent"
              aria-hidden="true"
            />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-white font-heading text-lg font-semibold leading-snug drop-shadow-sm">
                &ldquo;I did not know what was wrong with me. I thought I was a bad mother.&rdquo;
              </p>
              <p className="text-white/80 text-sm mt-2 drop-shadow-sm">— A mother helped by GAMMHA</p>
            </div>
          </div>

          {/* Content */}
          <div>
            <SectionHeader
              eyebrow="The Reality"
              title="Millions of Mothers Are Suffering in Silence"
              description="Postpartum depression, perinatal anxiety, and maternal mental health conditions are among the most common health complications mothers face. Yet in The Gambia — as in most of sub-Saharan Africa — the vast majority of mothers receive no help at all."
            />

            <ul className="mt-8 flex flex-col gap-4" role="list">
              {problemStats.map(({ value, label }) => (
                <li
                  key={value}
                  className="flex items-start gap-4 p-4 rounded-xl bg-white border border-border"
                >
                  <span className="font-heading text-2xl font-bold text-primary flex-shrink-0 leading-none whitespace-nowrap min-w-[4rem]">
                    {value}
                  </span>
                  <p className="text-text-muted leading-relaxed text-base">{label}</p>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button href="/mental-health" variant="primary" size="md">
                Learn About the Conditions
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Button>
              <Button href="/support" variant="outline" size="md">
                Find Support
              </Button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

function FocusAreasSection({ focusAreas }: { focusAreas: { iconName: string; title: string; description: string; href: string }[] }) {
  return (
    <section
      className="section-padding bg-surface"
      aria-labelledby="focus-heading"
    >
      <div className="container-default">
        <SectionHeader
          eyebrow="What We Do"
          title="Our Four Pillars of Action"
          description="GAMMHA works on four core areas to ensure every mother in The Gambia has access to mental health awareness, support, and care."
          centered
        />

        <ul
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          role="list"
        >
          {focusAreas.map((area) => {
            const Icon = iconMap[area.iconName];
            return (
              <li key={area.title}>
                <Card hover className="h-full flex flex-col">
                  <IconBox className="mb-4">
                    {Icon && <Icon className="w-6 h-6 text-primary" aria-hidden="true" />}
                  </IconBox>
                  <h3 className="font-heading text-xl font-semibold text-text mb-2">
                    {area.title}
                  </h3>
                  <p className="text-text-muted text-base leading-relaxed flex-1">
                    {area.description}
                  </p>
                  <Link
                    href={area.href}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary-light transition-colors duration-200"
                    aria-label={`Learn more about ${area.title}`}
                  >
                    Learn more
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                </Card>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function AboutPreviewSection() {
  return (
    <section
      className="section-padding bg-surface-alt"
      aria-labelledby="about-preview-heading"
    >
      <div className="container-default">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeader
              eyebrow="About GAMMHA"
              title="Championing Mothers' Mental Health Since Day One"
              description="GAMMHA was founded to address a critical gap — maternal mental health conditions in The Gambia are common, but support is rare. We are changing that."
            />
            <ul className="mt-8 flex flex-col gap-4" role="list">
              {[
                "Raising awareness in communities and health facilities",
                "Training health workers to identify and support mothers",
                "Advocating for national mental health policies",
                "Providing a safe space for mothers to seek help",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <div
                    className="w-5 h-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-0.5"
                    aria-hidden="true"
                  >
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-text-muted text-base">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Button href="/about" variant="primary" size="md">
                Our Full Story
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Button>
            </div>
          </div>

          <div className="bg-primary rounded-2xl p-8 md:p-10 text-white">
            <p className="eyebrow text-white/70 mb-4">Our Mission</p>
            <blockquote className="font-heading text-2xl md:text-3xl font-semibold leading-snug text-balance">
              &ldquo;To ensure every mother in The Gambia has access to mental
              health awareness, support, and the care she deserves.&rdquo;
            </blockquote>
            <div className="mt-8 pt-6 border-t border-white/20">
              <p className="eyebrow text-white/70 mb-4">Our Vision</p>
              <p className="text-white/85 leading-relaxed">
                A Gambia where maternal mental health is understood, valued, and
                prioritised by families, communities, and government alike.
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-white/20 flex flex-col sm:flex-row gap-3">
              <Button href="/donate" variant="accent" size="md">
                <Heart className="w-4 h-4" aria-hidden="true" />
                Donate Now
              </Button>
              <Button href="/support" variant="ghost" size="md">
                Get Help
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ResourcesPreviewSection() {
  const resources = [
    {
      title: "What is Postpartum Depression?",
      description:
        "Learn about the signs, symptoms, and how to get help if you or someone you know is affected.",
      tag: "Guide",
      href: "/mental-health#postpartum",
    },
    {
      title: "Supporting a Mother with Anxiety",
      description:
        "Practical advice for family members and caregivers on how to provide meaningful support.",
      tag: "Article",
      href: "/resources",
    },
    {
      title: "When to Seek Professional Help",
      description:
        "A clear guide on when symptoms require professional mental health support and how to access it.",
      tag: "Guide",
      href: "/mental-health#seek-help",
    },
  ];

  return (
    <section
      className="section-padding bg-surface"
      aria-labelledby="resources-heading"
    >
      <div className="container-default">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <SectionHeader
            eyebrow="Resources"
            title="Learn & Understand"
            description="Clear, simple guides to help you and those around you."
          />
          <Button href="/resources" variant="outline" size="sm" className="flex-shrink-0">
            All Resources
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Button>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6" role="list">
          {resources.map((resource) => (
            <li key={resource.title}>
              <Card hover className="h-full flex flex-col">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-surface-alt text-primary border border-primary/20 w-fit mb-4">
                  {resource.tag}
                </span>
                <h3 className="font-heading text-lg font-semibold text-text mb-2">
                  {resource.title}
                </h3>
                <p className="text-text-muted text-base leading-relaxed flex-1">
                  {resource.description}
                </p>
                <Link
                  href={resource.href}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary-light transition-colors duration-200"
                  aria-label={`Read: ${resource.title}`}
                >
                  Read more
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
