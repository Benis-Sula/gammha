import type { Metadata } from "next";

export const dynamic = "force-dynamic";

import Image from "next/image";
import { Megaphone, Users, FileText, ArrowRight, Globe } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import IconBox from "@/components/ui/IconBox";
import BulletList from "@/components/ui/BulletList";
import CTABanner from "@/components/sections/CTABanner";
import PageHero from "@/components/ui/PageHero";
import {
  advocacySectionImage,
} from "@/lib/content";
import { getCampaigns, getPolicyItems, getInvolvementOptions, getHero } from "@/lib/data";

export const metadata: Metadata = {
  title: "Advocacy & Campaigns",
  description:
    "GAMMHA's advocacy work to improve maternal mental health policies and awareness across The Gambia.",
};

const iconMap: Record<string, LucideIcon> = { Megaphone, Users, FileText, Globe };

export default async function AdvocacyPage() {
  const [campaigns, policyItems, getInvolvedOptions, hero] = await Promise.all([
    getCampaigns(),
    getPolicyItems(),
    getInvolvementOptions(),
    getHero('advocacy'),
  ])
  const pageHero = hero ?? { eyebrow: 'Advocacy', title: 'Changing the Conversation on Maternal Mental Health', description: 'GAMMHA leads campaigns, policy work, and community engagement to create lasting change for mothers across The Gambia.', image: { src: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80', alt: 'Community advocacy' } }
  return (
    <>
      <PageHero {...pageHero} headingId="advocacy-heading" />

      <section
        className="section-padding bg-surface"
        aria-labelledby="campaigns-heading"
      >
        <div className="container-default">
          <SectionHeader
            eyebrow="Our Campaigns"
            title="What We Are Working On"
            description="These campaigns are making a direct difference in the lives of mothers across The Gambia."
          />

          <div className="mt-10 relative aspect-[21/9] rounded-2xl overflow-hidden shadow-card">
            <Image
              src={advocacySectionImage.src}
              alt={advocacySectionImage.alt}
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div
              className="absolute inset-0 bg-gradient-to-r from-primary/60 to-transparent flex items-end p-8"
              aria-hidden="true"
            >
              <p className="text-white font-heading text-xl font-semibold max-w-sm leading-snug">
                Building a healthier future — one community at a time.
              </p>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-8">
            {campaigns.map((campaign) => (
              <Card key={campaign.title}>
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <h3 className="font-heading text-xl font-bold text-text">
                        {campaign.title}
                      </h3>
                      <Badge variant="default">{campaign.status}</Badge>
                    </div>
                    <p className="text-text-muted leading-relaxed mb-6">
                      {campaign.description}
                    </p>
                    <div>
                      <h4 className="text-sm font-semibold text-text mb-3">
                        Campaign Goals:
                      </h4>
                      <BulletList items={campaign.goals} className="gap-2" />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section
        className="section-padding bg-surface-alt"
        aria-labelledby="policy-heading"
      >
        <div className="container-default">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <SectionHeader
              eyebrow="Policy Advocacy"
              title="Why Policy Change Matters"
              description="Without policy, even the best awareness efforts are limited. GAMMHA works at every level — from communities to Parliament — to create systemic change."
            />
            <div className="flex flex-col gap-4">
              {policyItems.map(({ title, text }) => (
                <div
                  key={title}
                  className="flex items-start gap-4 p-4 bg-white rounded-xl border border-border"
                >
                  <div
                    className="w-2 h-2 rounded-full bg-accent flex-shrink-0 mt-2"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-semibold text-text text-sm mb-1">
                      {title}
                    </p>
                    <p className="text-text-muted text-sm leading-relaxed">
                      {text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        className="section-padding bg-surface"
        aria-labelledby="get-involved-heading"
      >
        <div className="container-default">
          <SectionHeader
            eyebrow="Get Involved"
            title="Join the Movement"
            description="There are many ways to support GAMMHA's advocacy work. Every contribution matters."
            centered
          />
          <ul
            className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            role="list"
          >
            {getInvolvedOptions.map((option) => {
              const Icon = iconMap[option.iconName];
              return (
                <li key={option.title}>
                  <Card hover className="h-full text-center">
                    <IconBox className="mx-auto mb-4">
                      {Icon && (
                        <Icon
                          className="w-6 h-6 text-primary"
                          aria-hidden="true"
                        />
                      )}
                    </IconBox>
                    <h3 className="font-heading text-lg font-semibold text-text mb-2">
                      {option.title}
                    </h3>
                    <p className="text-text-muted text-sm leading-relaxed">
                      {option.description}
                    </p>
                  </Card>
                </li>
              );
            })}
          </ul>
          <div className="mt-10 text-center">
            <Button href="/contact" variant="primary" size="lg">
              Contact Us to Get Involved
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </section>

      <CTABanner
        title="Support Our Advocacy Work"
        description="Your donation helps fund campaigns, training, and policy efforts that change lives."
        primaryLabel="Donate"
        primaryHref="/donate"
        secondaryLabel="Contact Us"
        secondaryHref="/contact"
      />
    </>
  );
}
