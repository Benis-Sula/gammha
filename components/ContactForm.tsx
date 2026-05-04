"use client";

import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  CheckCircle,
  MessageCircle,
  ArrowRight,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import Card from "@/components/ui/Card";
import SectionHeader from "@/components/ui/SectionHeader";

interface ContactDetails {
  phone: string;
  phoneTel: string;
  whatsappUrl: string;
  emailInfo: string;
  address: string;
  officeHours: string;
}

export default function ContactForm({ details }: { details: ContactDetails }) {
  const { phone, phoneTel, whatsappUrl, emailInfo, address, officeHours } = details;
  const [status, setStatus] = useState<"idle" | "submitting" | "submitted" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const fd = new FormData(e.currentTarget);
    const body = {
      firstName: fd.get("firstName") as string,
      lastName: (fd.get("lastName") as string) || undefined,
      email: fd.get("email") as string,
      subject: (fd.get("subject") as string) || undefined,
      message: fd.get("message") as string,
    };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      setStatus(res.ok ? "submitted" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      {/* ── Urgent help nudge ── */}
      <div className="bg-surface-alt border-b border-border">
        <div className="container-default py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="flex items-center gap-2 flex-shrink-0">
              <AlertCircle className="w-4 h-4 text-accent" aria-hidden="true" />
              <p className="text-sm font-semibold text-text">Need urgent help?</p>
            </div>
            <p className="text-sm text-text-muted flex-1">
              If you or someone is in distress, don&rsquo;t wait for a reply — reach out directly.
            </p>
            <a
              href="/support"
              className="flex-shrink-0 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-dark transition-colors duration-200"
            >
              Go to Support
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      <section className="section-padding bg-surface" aria-label="Contact details and form">
        <div className="container-default">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

            {/* ── Contact details ── */}
            <div>
              <SectionHeader eyebrow="Contact Details" title="How to Reach GAMMHA" />
              <ul className="mt-8 flex flex-col gap-4" role="list">
                <li>
                  <a
                    href={phoneTel}
                    className="group flex items-start gap-4 p-5 rounded-xl border border-border bg-white hover:border-primary/30 hover:shadow-card transition-all duration-200"
                  >
                    <div className="w-12 h-12 rounded-xl bg-surface-alt flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-primary" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-semibold text-text group-hover:text-primary transition-colors duration-200">
                        Phone
                      </p>
                      <p className="text-text-muted text-base mt-0.5">{phone}</p>
                      <p className="text-sm text-text-muted mt-1">Monday – Friday, 8am – 6pm</p>
                    </div>
                  </a>
                </li>

                <li>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-4 p-5 rounded-xl border border-border bg-white hover:border-[#25D366]/40 hover:shadow-card transition-all duration-200"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#25D366]/10 flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-6 h-6 text-[#25D366]" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-semibold text-text group-hover:text-[#25D366] transition-colors duration-200">
                        WhatsApp
                      </p>
                      <p className="text-text-muted text-base mt-0.5">Message us on WhatsApp</p>
                      <p className="text-sm text-text-muted mt-1">Monday – Saturday, 8am – 8pm</p>
                    </div>
                  </a>
                </li>

                <li>
                  <a
                    href={`mailto:${emailInfo}`}
                    className="group flex items-start gap-4 p-5 rounded-xl border border-border bg-white hover:border-primary/30 hover:shadow-card transition-all duration-200"
                  >
                    <div className="w-12 h-12 rounded-xl bg-surface-alt flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-primary" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-semibold text-text group-hover:text-primary transition-colors duration-200">
                        Email
                      </p>
                      <p className="text-text-muted text-base mt-0.5">{emailInfo}</p>
                      <p className="text-sm text-text-muted mt-1">We respond within one working day</p>
                    </div>
                  </a>
                </li>

                <li>
                  <div className="flex items-start gap-4 p-5 rounded-xl border border-border bg-white">
                    <div className="w-12 h-12 rounded-xl bg-surface-alt flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-primary" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-semibold text-text">Office Location</p>
                      <address className="not-italic text-text-muted text-base mt-0.5">{address}</address>
                    </div>
                  </div>
                </li>

                <li>
                  <div className="flex items-start gap-4 p-5 rounded-xl border border-border bg-white">
                    <div className="w-12 h-12 rounded-xl bg-surface-alt flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-primary" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-semibold text-text">Office Hours</p>
                      <p className="text-text-muted text-base mt-0.5">{officeHours}</p>
                      <p className="text-text-muted text-sm mt-0.5">Closed on public holidays</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            {/* ── Contact form ── */}
            <Card>
              {status === "submitted" ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-primary" aria-hidden="true" />
                  </div>
                  <h2 className="font-heading text-xl font-bold text-text mb-2">Message Received</h2>
                  <p className="text-text-muted leading-relaxed mb-6">
                    Thank you for reaching out. A real person on our team will read your message and get back to you within one working day.
                  </p>
                  <div className="flex flex-col gap-3 pt-6 border-t border-border">
                    <p className="text-sm font-semibold text-text">While you wait, you can also:</p>
                    <Link
                      href="/mental-health"
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-primary rounded-xl hover:bg-primary-dark transition-all duration-200"
                    >
                      Read our mental health guides
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </Link>
                    <a
                      href={phoneTel}
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-primary border-2 border-primary rounded-xl hover:bg-surface-alt transition-all duration-200"
                    >
                      <Phone className="w-4 h-4" aria-hidden="true" />
                      Call us: {phone}
                    </a>
                  </div>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <h2 className="font-heading text-2xl font-bold text-text mb-1">Send Us a Message</h2>
                    <p className="text-sm text-text-muted">
                      All messages are read by a real person. We never share your information.
                    </p>
                  </div>
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate aria-label="Contact form">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="first-name" className="block text-sm font-medium text-text mb-1.5">
                          First Name <span aria-hidden="true">*</span>
                        </label>
                        <input
                          id="first-name"
                          name="firstName"
                          type="text"
                          required
                          autoComplete="given-name"
                          className="w-full px-4 py-3 border-2 border-border rounded-lg text-text text-base focus:outline-none focus:border-primary transition-colors duration-200"
                          aria-required="true"
                        />
                      </div>
                      <div>
                        <label htmlFor="last-name" className="block text-sm font-medium text-text mb-1.5">
                          Last Name
                        </label>
                        <input
                          id="last-name"
                          name="lastName"
                          type="text"
                          autoComplete="family-name"
                          className="w-full px-4 py-3 border-2 border-border rounded-lg text-text text-base focus:outline-none focus:border-primary transition-colors duration-200"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-text mb-1.5">
                        Email Address <span aria-hidden="true">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        className="w-full px-4 py-3 border-2 border-border rounded-lg text-text text-base focus:outline-none focus:border-primary transition-colors duration-200"
                        aria-required="true"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-text mb-1.5">
                        What is your message about?
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        className="w-full px-4 py-3 border-2 border-border rounded-lg text-text text-base focus:outline-none focus:border-primary transition-colors duration-200 bg-white cursor-pointer"
                      >
                        <option value="">Select a subject</option>
                        <option value="support">I need support for myself or someone I know</option>
                        <option value="volunteer">I want to volunteer</option>
                        <option value="partner">Partnership enquiry</option>
                        <option value="donation">Donation enquiry</option>
                        <option value="media">Media enquiry</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-text mb-1.5">
                        Message <span aria-hidden="true">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        required
                        placeholder="You don't need to explain everything. You can just say 'I need help' and we'll take it from there."
                        className="w-full px-4 py-3 border-2 border-border rounded-lg text-text text-base focus:outline-none focus:border-primary transition-colors duration-200 resize-y placeholder:text-text-muted/60"
                        aria-required="true"
                      />
                    </div>
                    {status === "error" && (
                      <p className="text-sm text-red-600" role="alert">
                        Something went wrong. Please try again or call us directly.
                      </p>
                    )}
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="w-full py-3.5 px-6 bg-primary text-white font-semibold text-base rounded-xl hover:bg-primary-dark transition-all duration-200 cursor-pointer disabled:opacity-60"
                    >
                      {status === "submitting" ? "Sending…" : "Send Message"}
                    </button>
                  </form>
                </>
              )}
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
