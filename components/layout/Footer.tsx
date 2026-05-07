import Link from "next/link";
import Image from "next/image";
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from "lucide-react";
import {
  CONTACT_PHONE,
  CONTACT_PHONE_TEL,
  CONTACT_EMAIL_INFO,
  CONTACT_ADDRESS,
} from "@/lib/constants";

const footerLinks = {
  organization: [
    { href: "/about", label: "About GAMMHA" },
    { href: "/advocacy", label: "Advocacy & Campaigns" },
    { href: "/resources", label: "Resources" },
    { href: "/contact", label: "Contact Us" },
  ],
  support: [
    { href: "/mental-health", label: "Maternal Mental Health" },
    { href: "/support", label: "Get Support" },
    { href: "/support#crisis", label: "Crisis Help" },
    { href: "/donate", label: "Donate" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-primary text-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>

      <div className="container-default py-12 md:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="inline-flex items-center mb-6"
              aria-label="GAMMHA Home"
            >
              <div className="bg-white p-2 md:p-3 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
                <Image
                  src="/brand/gammha.png"
                  alt="GAMMHA Logo"
                  width={320}
                  height={96}
                  className="h-16 md:h-20 w-auto object-contain"
                />
              </div>
            </Link>
            <p className="mt-4 text-white/80 text-base leading-relaxed max-w-sm">
              Gambia Alliance for Maternal Mental Health &amp; Advocacy.
              Supporting mothers through awareness, care, and community.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <a
                href={`mailto:${CONTACT_EMAIL_INFO}`}
                className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm transition-colors duration-200"
              >
                <Mail className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                {CONTACT_EMAIL_INFO}
              </a>
              <a
                href={CONTACT_PHONE_TEL}
                className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm transition-colors duration-200"
              >
                <Phone className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                {CONTACT_PHONE}
              </a>
              <span className="inline-flex items-center gap-2 text-white/80 text-sm">
                <MapPin className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                {CONTACT_ADDRESS}
              </span>
            </div>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-base text-white mb-4">
              Organisation
            </h3>
            <ul className="flex flex-col gap-2" role="list">
              {footerLinks.organization.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/75 hover:text-white text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-base text-white mb-4">
              Support
            </h3>
            <ul className="flex flex-col gap-2" role="list">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/75 hover:text-white text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <h3 className="font-heading font-semibold text-base text-white mb-4">
                Follow Us
              </h3>
              <div className="flex gap-3">
                <a
                  href="#"
                  aria-label="GAMMHA on Facebook"
                  className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors duration-200"
                >
                  <Facebook className="w-4 h-4" aria-hidden="true" />
                </a>
                <a
                  href="#"
                  aria-label="GAMMHA on Twitter / X"
                  className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors duration-200"
                >
                  <Twitter className="w-4 h-4" aria-hidden="true" />
                </a>
                <a
                  href="#"
                  aria-label="GAMMHA on Instagram"
                  className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors duration-200"
                >
                  <Instagram className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/20 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-white/60">
          <p>
            &copy; {new Date().getFullYear()} GAMMHA. All rights reserved.
          </p>
          <p className="flex items-center gap-1">
            Made with{" "}
            <Heart
              className="w-3.5 h-3.5 text-accent inline"
              aria-hidden="true"
            />{" "}
            for mothers in The Gambia
          </p>
        </div>
      </div>
    </footer>
  );
}
