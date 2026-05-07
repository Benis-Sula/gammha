import type { Metadata } from "next";

export const dynamic = "force-dynamic";

import Image from "next/image";
import Link from "next/link";
import { AlertCircle, ArrowRight, CheckCircle, Info } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import BulletList from "@/components/ui/BulletList";
import CTABanner from "@/components/sections/CTABanner";
import PageHero from "@/components/ui/PageHero";
import { mentalHealthSectionImage } from "@/lib/content";
import { getConditions, getWarningSigns, getHero, getSiteSettings, getPageBlockGroup } from "@/lib/data";
import { buildContactLinks } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Maternal Mental Health",
  description:
    "Learn about maternal mental health conditions, their signs, symptoms, and when to seek help.",
};

export default async function MentalHealthPage() {
  const [conditions, warningSigns, alsoSeekHelp, hero, settings, whatIsItBlock, keyFactsBlock, emotionalBlock, ctaBlock] = await Promise.all([
    getConditions(),
    getWarningSigns('warning'),
    getWarningSigns('also-seek'),
    getHero('mental-health'),
    getSiteSettings(),
    getPageBlockGroup('mh_what_is_it'),
    getPageBlockGroup('mh_key_facts'),
    getPageBlockGroup('mh_emotional_support'),
    getPageBlockGroup('cta_mental_health'),
  ])
  const keyFacts = [0, 1, 2, 3, 4].map((i) => keyFactsBlock[`fact_${i}`]).filter(Boolean)
  const pageHero = hero ?? { eyebrow: 'Mental Health', title: 'Understanding Maternal Mental Health', description: 'Learn about the conditions that affect mothers during and after pregnancy, and how to get the support you need.', image: { src: 'https://images.unsplash.com/photo-1576765608866-5b51046452be?w=800&q=80', alt: 'Mother and child' } }
  const phone = settings.contact_phone || "+220 123 4567";
  const { phoneTel } = buildContactLinks(phone);
  return (
    <>
      <PageHero {...pageHero} headingId="mh-heading" />

      <section
        className="section-padding bg-surface-alt"
        aria-labelledby="what-is-heading"
      >
        <div className="container-default">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="flex flex-col gap-8">
              <SectionHeader
                eyebrow="What Is It?"
                title="Mental Health During Pregnancy and After Birth"
                description={whatIsItBlock.description || "Maternal mental health refers to how a mother feels emotionally and psychologically during pregnancy and in the year after giving birth."}
              />
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-card">
                <Image
                  src={mentalHealthSectionImage.src}
                  alt={mentalHealthSectionImage.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div className="bg-primary rounded-2xl p-8 text-white">
                <div className="flex items-start gap-3 mb-4">
                  <Info
                    className="w-5 h-5 text-white/70 flex-shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <p className="text-sm font-semibold uppercase tracking-wide text-white/70">
                    Important to Know
                  </p>
                </div>
                <ul className="flex flex-col gap-4" role="list">
                  {keyFacts.map((point) => (
                    <li key={point} className="flex items-start gap-3">
                      <CheckCircle
                        className="w-5 h-5 text-white/70 flex-shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <span className="text-white/90 leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Emotional support block */}
              <div className="rounded-2xl border border-border bg-white p-8 flex flex-col gap-6">
                <div>
                  <p className="font-heading text-xl font-bold text-text mb-2 text-balance">
                    {emotionalBlock.heading || "You are not broken. You are not a bad mother."}
                  </p>
                  <p className="text-text-muted leading-relaxed">
                    {emotionalBlock.description || "What you are feeling has a name, a cause, and — most importantly — a solution. Thousands of mothers have walked this path before you, and they recovered. With the right support, so can you."}
                  </p>
                </div>

                <blockquote className="border-l-4 border-primary pl-5">
                  <p className="text-text-muted italic leading-relaxed">
                    &ldquo;{emotionalBlock.quote_text || "I was ashamed to tell anyone what I was going through. When I finally reached out to GAMMHA, I realised I was not alone — and that was the beginning of my recovery."}&rdquo;
                  </p>
                  <footer className="mt-3 text-sm font-semibold text-primary">
                    — {emotionalBlock.quote_attribution || "Aminata, mother of two, Banjul"}
                  </footer>
                </blockquote>

                <Button href="/support" variant="primary" size="md" className="w-full justify-center rounded-xl">
                  Talk to Someone Today
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="section-padding bg-surface"
        aria-labelledby="conditions-heading"
      >
        <div className="container-default">
          <SectionHeader
            eyebrow="Common Conditions"
            title="Conditions That Affect Mothers"
            description="These are the most common maternal mental health conditions. Learning to recognise them is the first step to getting help."
            centered
          />
          <div className="mt-12 flex flex-col gap-10">
            {conditions.map((condition) => (
              <div key={condition.id} id={condition.id} className="scroll-mt-24">
                <Card>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h3 className="font-heading text-2xl font-bold text-text mb-3">
                        {condition.title}
                      </h3>
                      <p className="text-text-muted leading-relaxed mb-6">
                        {condition.description}
                      </p>
                      <div className="p-4 rounded-xl bg-surface-alt border border-border">
                        <p className="text-sm font-semibold text-primary">
                          {condition.note}
                        </p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-heading text-base font-semibold text-text mb-4">
                        Signs to look for:
                      </h4>
                      <BulletList items={condition.signs} />
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="seek-help"
        className="section-padding bg-surface-alt scroll-mt-24"
        aria-labelledby="seek-help-heading"
      >
        <div className="container-default">
          <div className="max-w-3xl mx-auto">
            <SectionHeader
              eyebrow="When to Seek Help"
              title="Please Reach Out If You Notice These Signs"
              description="Some signs need immediate attention. If you or someone you know is experiencing any of the following, please seek help right away."
              centered
            />

            <div className="mt-10 bg-white rounded-xl border-2 border-red-200 p-6 md:p-8">
              <div className="flex items-start gap-3 mb-6">
                <AlertCircle
                  className="w-6 h-6 text-red-500 flex-shrink-0"
                  aria-hidden="true"
                />
                <h3 className="font-heading text-lg font-semibold text-text">
                  Seek immediate help if you or a mother you know:
                </h3>
              </div>
              <BulletList
                items={warningSigns}
                dotClass="bg-red-400"
                textClass="text-text text-base"
                className="mb-6"
              />
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
                <Button href="/support" variant="primary" size="md">
                  Get Help Now
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Button>
                <Button href={phoneTel} variant="accent" size="md">
                  Call: {phone}
                </Button>
              </div>
            </div>

            <div className="mt-8 p-6 rounded-xl bg-surface-alt border border-border">
              <h3 className="font-heading text-lg font-semibold text-text mb-3">
                Also Consider Getting Help If:
              </h3>
              <BulletList items={alsoSeekHelp} className="gap-2" />
            </div>
          </div>
        </div>
      </section>

      <CTABanner
        title={ctaBlock.title || "You Do Not Have to Face This Alone"}
        description={ctaBlock.description || "GAMMHA is here to help. Reach out today and take the first step toward feeling better."}
        primaryLabel={ctaBlock.primary_label || "Get Support"}
        primaryHref={ctaBlock.primary_href || "/support"}
        secondaryLabel={ctaBlock.secondary_label || "Read Resources"}
        secondaryHref={ctaBlock.secondary_href || "/resources"}
      />
    </>
  );
}
