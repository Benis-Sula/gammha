import type { Metadata } from "next";

export const dynamic = "force-dynamic";

import Link from "next/link";
import { BookOpen, ArrowRight, ExternalLink } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import CTABanner from "@/components/sections/CTABanner";
import PageHero from "@/components/ui/PageHero";
import { getResourceArticles, getExternalLinks, getHero } from "@/lib/data";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Guides, articles, and educational materials on maternal mental health from GAMMHA.",
};

export default async function ResourcesPage() {
  const [resourceArticles, externalLinks, hero] = await Promise.all([
    getResourceArticles(),
    getExternalLinks(),
    getHero('resources'),
  ])
  const pageHero = hero ?? { eyebrow: 'Resources', title: 'Guides and Information for Mothers and Families', description: 'Educational materials written in plain English to help you understand maternal mental health and find support.', image: { src: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80', alt: 'Books and resources' } }
  return (
    <>
      <PageHero {...pageHero} headingId="resources-heading" />

      <section
        className="section-padding bg-surface"
        aria-labelledby="articles-heading"
      >
        <div className="container-default">
          <SectionHeader
            eyebrow="Guides &amp; Articles"
            title="Educational Resources"
            description="Everything here is written in plain English and reviewed for accuracy."
          />
          <ul
            className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            role="list"
          >
            {resourceArticles.map((article) => (
              <li key={article.title}>
                <Card hover className="h-full flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="default">{article.tag}</Badge>
                    <span className="text-xs text-text-muted flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
                      {article.readTime}
                    </span>
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-text mb-2">
                    {article.title}
                  </h3>
                  <p className="text-text-muted text-base leading-relaxed flex-1">
                    {article.description}
                  </p>
                  <Link
                    href={article.href}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary-light transition-colors duration-200"
                    aria-label={`Read: ${article.title}`}
                  >
                    Read article
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                </Card>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        className="section-padding bg-surface-alt"
        aria-labelledby="external-heading"
      >
        <div className="container-default">
          <SectionHeader
            eyebrow="External Resources"
            title="Further Reading"
            description="Trusted international organisations with additional information on maternal mental health."
          />
          <ul className="mt-10 flex flex-col gap-4" role="list">
            {externalLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start justify-between gap-4 p-5 bg-white rounded-xl border border-border hover:border-primary/30 hover:shadow-card-hover transition-all duration-200"
                  aria-label={`${link.name} — opens in new tab`}
                >
                  <div>
                    <p className="font-semibold text-text group-hover:text-primary transition-colors duration-200">
                      {link.name}
                    </p>
                    <p className="text-text-muted text-sm mt-1">
                      {link.description}
                    </p>
                  </div>
                  <ExternalLink
                    className="w-5 h-5 text-text-muted group-hover:text-primary transition-colors duration-200 flex-shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTABanner
        title="Have a Resource to Share?"
        description="If you know of a guide, article, or tool that could help mothers in The Gambia, we'd love to hear about it."
        primaryLabel="Contact Us"
        primaryHref="/contact"
        secondaryLabel="Get Support"
        secondaryHref="/support"
      />
    </>
  );
}
