import type { Metadata } from "next";

export const dynamic = "force-dynamic";

import Image from "next/image";
import { Target, Eye, Heart, Users, Award, ArrowRight, Megaphone } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Button from "@/components/ui/Button";
import SectionHeader from "@/components/ui/SectionHeader";
import Card from "@/components/ui/Card";
import IconBox from "@/components/ui/IconBox";
import CTABanner from "@/components/sections/CTABanner";
import {
  aboutSectionImage,
  aboutValues,
  teamMembers,
} from "@/lib/content";
import { getStatsByGroup, getHero } from "@/lib/data";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about GAMMHA — our mission, vision, and commitment to maternal mental health in The Gambia.",
};

const iconMap: Record<string, LucideIcon> = { Heart, Users, Award, Target, Megaphone };

export default async function AboutPage() {
  const [aboutStats, hero] = await Promise.all([
    getStatsByGroup("about"),
    getHero("about"),
  ]);

  const pageHero = hero ?? {
    eyebrow: "Our Story",
    title: "A Sanctuary for Every Mother",
    description:
      "Founded with the belief that no mother should walk the journey of mental health alone. We are a collective dedicated to uplifting, supporting, and advocating for maternal well-being across the Gambia.",
    image: {
      src: "https://images.unsplash.com/photo-1740741704998-8074200ce5d6?auto=format&fit=crop&w=1400&q=80",
      alt: "An African mother tenderly cradling her young child — the bond at the heart of GAMMHA's work",
    },
  };

  return (
    <>
      {/* Hero — full-bleed with gradient overlay */}
      <section
        className="relative min-h-[600px] lg:min-h-[700px] flex items-center overflow-hidden"
        aria-labelledby="about-heading"
      >
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-gradient-to-r from-text/90 via-text/65 to-text/10 z-10"
            aria-hidden="true"
          />
          <Image
            src={pageHero.image.src}
            alt={pageHero.image.alt}
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
        </div>

        <div className="container-default relative z-10 py-20">
          <div className="max-w-2xl">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 text-white text-xs font-semibold uppercase tracking-widest mb-6">
              {pageHero.eyebrow}
            </span>
            <h1
              id="about-heading"
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 text-balance leading-tight"
            >
              {pageHero.title}
            </h1>
            <p className="text-lg text-white/85 leading-relaxed max-w-xl">
              {pageHero.description}
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section
        className="section-padding bg-surface-alt"
        aria-labelledby="mission-vision-heading"
      >
        <div className="container-default">
          <h2 id="mission-vision-heading" className="sr-only">
            Mission and Vision
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-20">
            <div className="space-y-5">
              <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center">
                <Target className="w-6 h-6 text-primary" aria-hidden="true" />
              </div>
              <h3 className="font-heading text-2xl font-semibold text-primary">
                Our Mission
              </h3>
              <p className="text-text-muted leading-relaxed">
                To provide accessible, culturally-competent mental health
                resources and support systems for mothers and families in the
                Gambia. We aim to break the silence surrounding maternal mental
                health through education, community engagement, and direct
                intervention.
              </p>
            </div>

            <div className="space-y-5">
              <div className="w-12 h-12 rounded-xl bg-accent/15 flex items-center justify-center">
                <Eye className="w-6 h-6 text-accent" aria-hidden="true" />
              </div>
              <h3 className="font-heading text-2xl font-semibold text-accent">
                Our Vision
              </h3>
              <p className="text-text-muted leading-relaxed">
                A nation where every mother is seen, heard, and supported in
                her mental health journey. We envision a future where maternal
                mental health services are integrated into every level of
                healthcare and community support is a standard for all families.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why It Matters */}
      <section
        className="section-padding bg-surface"
        aria-labelledby="mhimportance-heading"
      >
        <div className="container-default flex flex-col gap-10">
          <SectionHeader
            eyebrow="Why It Matters"
            title="Maternal Mental Health is a Health Emergency"
            description="Conditions like postpartum depression and anxiety during pregnancy are among the most common health complications mothers face — yet most women never receive any help."
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-card">
              <Image
                src={aboutSectionImage.src}
                alt={aboutSectionImage.alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="flex flex-col gap-6">
              <div className="p-5 rounded-xl bg-primary/5 border border-primary/15 flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Heart className="w-5 h-5 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-heading text-base font-semibold text-text leading-snug">
                    No mother should face this alone.
                  </p>
                  <p className="mt-1 text-sm text-text-muted leading-relaxed">
                    GAMMHA provides free, confidential support to mothers across
                    The Gambia — through counselling, community networks, and
                    trained health workers.
                  </p>
                  <Button
                    href="/support"
                    variant="ghost"
                    size="sm"
                    className="mt-3 px-0 hover:no-underline hover:text-primary-dark"
                  >
                    Find support near you
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Button>
                </div>
              </div>
              {aboutStats.map(({ value, label }) => (
                <div
                  key={value}
                  className="flex items-start gap-4 p-4 rounded-xl bg-surface-alt border border-border"
                >
                  <span className="font-heading text-3xl font-bold text-primary flex-shrink-0 leading-none">
                    {value}
                  </span>
                  <p className="text-text-muted leading-relaxed">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section
        className="section-padding bg-surface-alt"
        aria-labelledby="values-heading"
      >
        <div className="container-default">
          <SectionHeader
            eyebrow="Our Values"
            title="The Pillars of Our Care"
            description="Our values guide every interaction, resource, and policy we build."
            centered
          />
          <ul
            className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            role="list"
          >
            {aboutValues.map((value) => {
              const Icon = iconMap[value.iconName];
              return (
                <li key={value.title}>
                  <Card className="h-full text-center hover:shadow-card-hover transition-shadow duration-300">
                    <IconBox className="mx-auto mb-4">
                      {Icon && (
                        <Icon
                          className="w-6 h-6 text-primary"
                          aria-hidden="true"
                        />
                      )}
                    </IconBox>
                    <h3 className="font-heading text-lg font-semibold text-text mb-2">
                      {value.title}
                    </h3>
                    <p className="text-text-muted text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </Card>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Team */}
      <section
        className="section-padding bg-surface"
        aria-labelledby="team-heading"
      >
        <div className="container-default">
          <SectionHeader
            eyebrow="Our Team"
            title="Voices of the Alliance"
            description="Meet the passionate advocates working behind the scenes."
          />
          <ul
            className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14"
            role="list"
          >
            {teamMembers.map((member) => (
              <li key={member.name} className="group">
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-4 bg-surface-alt">
                  {member.image ? (
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Users
                        className="w-16 h-16 text-primary/25"
                        aria-hidden="true"
                      />
                    </div>
                  )}
                </div>
                <h3 className="font-heading text-lg font-semibold text-text">
                  {member.name}
                </h3>
                <p className="text-sm font-semibold text-primary mt-1 mb-3">
                  {member.role}
                </p>
                <p className="text-text-muted text-sm leading-relaxed">
                  {member.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTABanner
        title="Be Part of the Change"
        description="Support GAMMHA's work and help us reach more mothers across The Gambia."
        primaryLabel="Donate"
        primaryHref="/donate"
        secondaryLabel="Get Involved"
        secondaryHref="/advocacy"
      />
    </>
  );
}
