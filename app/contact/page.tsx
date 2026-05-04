import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import ContactForm from "@/components/ContactForm";
import { getHero, getSiteSettings } from "@/lib/data";
import { buildContactLinks } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with GAMMHA. We are here to help and listen.",
};

export default async function ContactPage() {
  const [hero, settings] = await Promise.all([getHero('contact'), getSiteSettings()])
  const pageHero = hero ?? {
    eyebrow: 'Contact Us',
    title: 'We Are Here to Listen and Help',
    description: 'Reach out to GAMMHA anytime. Whether you need support, want to volunteer, or just have a question — we would love to hear from you.',
    image: { src: 'https://images.unsplash.com/photo-1423784346385-c1d4dac9893a?w=800&q=80', alt: 'Person reaching out for help' },
  }

  const phone = settings.contact_phone || "+220 123 4567";
  const { phoneTel, whatsappUrl } = buildContactLinks(phone);
  const emailInfo = settings.contact_email_info || "info@gammha.org";
  const address = settings.contact_address_full || settings.contact_address || "Kairaba Avenue, Banjul, The Gambia";
  const officeHours = settings.office_hours || "Monday – Friday: 8am – 5pm";

  return (
    <>
      <PageHero {...pageHero} headingId="contact-heading" />
      <ContactForm
        details={{ phone, phoneTel, whatsappUrl, emailInfo, address, officeHours }}
      />
    </>
  );
}
