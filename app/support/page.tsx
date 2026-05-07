import type { Metadata } from "next";

export const dynamic = "force-dynamic";

import Image from "next/image";
import { Phone, MessageCircle, ShieldCheck, AlertTriangle } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import PageHero from "@/components/ui/PageHero";
import SupportContactSection from "@/components/sections/SupportContactSection";
import { supportSectionImage } from "@/lib/content";
import { getHero, getSiteSettings, getProcessSteps, getPageBlockGroup } from "@/lib/data";
import { buildContactLinks } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Get Support",
  description:
    "Find help for maternal mental health in The Gambia. Contact GAMMHA for support, guidance, and care.",
};

export default async function SupportPage() {
  const [hero, settings, processSteps, crisisBlock, anonBlock, hiwBlock] = await Promise.all([
    getHero("support"),
    getSiteSettings(),
    getProcessSteps(),
    getPageBlockGroup('support_crisis_card'),
    getPageBlockGroup('support_anonymous_card'),
    getPageBlockGroup('support_how_it_works'),
  ]);
  const subjectOptions = settings.form_subjects_support
    ? settings.form_subjects_support.split('\n').filter(Boolean)
    : ['General Inquiry', 'Support for Myself', 'Support for Someone I Know', 'Volunteer Opportunities', 'Advocacy Programs']

  const pageHero = hero ?? {
    eyebrow: "Get Support",
    title: "You Are Not Alone — Help is Here",
    description:
      "Reach out to GAMMHA for free, confidential support. We are here to listen, guide, and help you through.",
    image: {
      src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80",
      alt: "Supportive hands",
    },
  };

  const phone = settings.contact_phone || "+220 123 4567";
  const { phoneTel, whatsappUrl } = buildContactLinks(phone);
  const emailSupport = settings.contact_email_support || "support@gammha.org";
  const officeHoursPhone = settings.office_hours_phone || "Mon–Fri, 8am–6pm";
  const address =
    settings.contact_address || "Kairaba Avenue, Banjul, The Gambia";
  const officeHours = settings.office_hours || "Monday – Friday: 8am – 5pm";

  return (
    <>
      {/* ── Hero ── */}
      <PageHero {...pageHero} headingId="support-heading" imagePosition="top" />

      {/* ── Urgent Help Cards ── */}
      <section
        className="section-padding bg-surface"
        aria-labelledby="urgent-heading"
      >
        <div className="container-default">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Crisis card */}
            <div className="lg:col-span-8 bg-red-50 rounded-[32px] p-8 md:p-12 shadow-elevated border border-red-100 flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1">
                <div className="flex items-center gap-3 text-red-600 mb-4">
                  <AlertTriangle
                    className="w-7 h-7 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <h2
                    id="urgent-heading"
                    className="font-heading text-xl font-bold"
                  >
                    {crisisBlock.heading || "Urgent Mental Health Support"}
                  </h2>
                </div>
                <p className="text-text-muted leading-relaxed mb-8">
                  {crisisBlock.description || "If you or a mother you know is in immediate distress, experiencing intrusive thoughts, or feeling overwhelmed, please reach out now. Our trained responders are available."}
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href={phoneTel}
                    className="inline-flex items-center gap-3 bg-red-600 text-white px-7 py-3.5 rounded-full font-bold text-sm hover:bg-red-700 transition-all duration-200 active:scale-95"
                  >
                    <Phone className="w-4 h-4" aria-hidden="true" />
                    {officeHoursPhone}: {phone}
                  </a>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 bg-white text-text px-7 py-3.5 rounded-full font-bold text-sm border border-border hover:border-primary hover:text-primary transition-all duration-200 active:scale-95"
                  >
                    <MessageCircle className="w-4 h-4" aria-hidden="true" />
                    WhatsApp Support
                  </a>
                </div>
              </div>
              <div className="w-full md:w-56 h-56 rounded-2xl overflow-hidden shadow-card flex-shrink-0">
                <Image
                  src={supportSectionImage.src}
                  alt={supportSectionImage.alt}
                  width={224}
                  height={224}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Safe & Anonymous card */}
            <div className="lg:col-span-4 bg-primary rounded-[32px] p-8 text-white shadow-elevated flex flex-col justify-center">
              <ShieldCheck
                className="w-10 h-10 mb-6 opacity-90"
                aria-hidden="true"
              />
              <h3 className="font-heading text-xl font-bold mb-4">
                {anonBlock.heading || "Safe & Anonymous"}
              </h3>
              <p className="text-white/80 text-base leading-relaxed mb-6">
                {anonBlock.description || "Your privacy is our priority. Every conversation is strictly confidential and handled with cultural sensitivity."}
              </p>
              <div
                className="h-1 w-12 bg-white/30 rounded-full"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works — Step Timeline ── */}
      <section
        className="section-padding bg-surface-alt"
        aria-labelledby="how-it-works-heading"
      >
        <div className="container-default">
          <SectionHeader
            eyebrow="How It Works"
            title={hiwBlock.title || "How to take the first step"}
            description={hiwBlock.description || "We've made it as simple and gentle as possible to access the care you deserve."}
            centered
          />
          <div className="mt-16 relative">
            {/* Connecting line — large screens only */}
            <div
              className="hidden lg:block absolute top-8 left-0 w-full h-0.5 bg-border"
              aria-hidden="true"
            />
            <ol
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 relative z-10"
              aria-label="Steps to get support"
            >
              {processSteps.map((step, index) => (
                <li key={step.id} className="group">
                  <div className="w-16 h-16 rounded-full bg-surface border-2 border-border flex items-center justify-center mb-6 mx-auto group-hover:bg-primary group-hover:border-primary transition-all duration-200">
                    <span className="font-heading text-xl font-bold text-primary group-hover:text-white transition-colors duration-200">
                      {index + 1}
                    </span>
                  </div>
                  <div className="text-center bg-white p-7 rounded-2xl shadow-card border border-border">
                    <h3 className="font-heading text-lg font-semibold text-text mb-3">
                      {step.title}
                    </h3>
                    <p className="text-text-muted text-base leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ── Contact Methods — Form + Info ── */}
      <SupportContactSection
        emailSupport={emailSupport}
        phoneTel={phoneTel}
        phone={phone}
        address={address}
        officeHours={officeHours}
        subjectOptions={subjectOptions}
      />
    </>
  );
}
