"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Heart } from "lucide-react";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/mental-health", label: "Mental Health" },
  { href: "/support", label: "Get Support" },
  { href: "/advocacy", label: "Advocacy" },
  { href: "/resources", label: "Resources" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close on route change (navigating to a different page)
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Close when viewport expands to desktop width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Lock body scroll while mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  function close() {
    setIsOpen(false);
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled || isOpen
          ? "bg-white shadow-card border-b border-border"
          : "bg-white/95 backdrop-blur-sm"
      }`}
    >
      <nav
        className="container-default flex items-center justify-between h-16"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          onClick={close}
          className="flex items-center"
          aria-label="GAMMHA Home"
        >
          <Image
            src="/brand/gammha.png"
            alt="GAMMHA Logo"
            width={240}
            height={72}
            className="h-12 md:h-14 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-1" role="list">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={close}
                className={`px-3 py-2 rounded text-sm font-medium transition-colors duration-200 ${
                  pathname === link.href
                    ? "text-primary font-semibold bg-surface-alt"
                    : "text-text-muted hover:text-primary hover:bg-surface-alt"
                }`}
                aria-current={pathname === link.href ? "page" : undefined}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTAs */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/support"
            onClick={close}
            className="px-4 py-2 text-sm font-semibold text-primary border-2 border-primary rounded-lg hover:bg-primary hover:text-white transition-all duration-200"
          >
            Get Help
          </Link>
          <Link
            href="/donate"
            onClick={close}
            className="px-4 py-2 text-sm font-semibold text-white bg-accent rounded-lg hover:bg-accent-dark transition-all duration-200"
          >
            Donate
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden p-2 rounded-lg text-text hover:bg-surface-alt transition-colors duration-200 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? (
            <X className="w-5 h-5" aria-hidden="true" />
          ) : (
            <Menu className="w-5 h-5" aria-hidden="true" />
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div
          id="mobile-menu"
          className="lg:hidden bg-white border-t border-border"
        >
          <ul className="container-default py-4 flex flex-col gap-1" role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={close}
                  className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200 ${
                    pathname === link.href
                      ? "text-primary font-semibold bg-surface-alt"
                      : "text-text hover:text-primary hover:bg-surface-alt"
                  }`}
                  aria-current={pathname === link.href ? "page" : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-3 border-t border-border flex flex-col gap-2 mt-2">
              <Link
                href="/support"
                onClick={close}
                className="w-full text-center px-4 py-3 text-base font-semibold text-primary border-2 border-primary rounded-lg hover:bg-primary hover:text-white transition-all duration-200"
              >
                Get Help
              </Link>
              <Link
                href="/donate"
                onClick={close}
                className="w-full text-center px-4 py-3 text-base font-semibold text-white bg-accent rounded-lg hover:bg-accent-dark transition-all duration-200"
              >
                Donate
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
