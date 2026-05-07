"use client";

import { useState } from "react";
import { Mail, MapPin, Clock, CheckCircle, Phone } from "lucide-react";

interface SupportContactSectionProps {
  emailSupport: string;
  phoneTel: string;
  phone: string;
  address: string;
  officeHours: string;
  subjectOptions?: string[];
}

const defaultSubjects = [
  "General Inquiry",
  "Support for Myself",
  "Support for Someone I Know",
  "Volunteer Opportunities",
  "Advocacy Programs",
];

export default function SupportContactSection({
  emailSupport,
  phoneTel,
  phone,
  address,
  officeHours,
  subjectOptions,
}: SupportContactSectionProps) {
  const subjects = subjectOptions?.length ? subjectOptions : defaultSubjects;
  const [status, setStatus] = useState<
    "idle" | "submitting" | "submitted" | "error"
  >("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const fd = new FormData(e.currentTarget);
    const fullName = (fd.get("fullName") as string).trim();
    const spaceIdx = fullName.indexOf(" ");
    const body = {
      firstName: spaceIdx >= 0 ? fullName.slice(0, spaceIdx) : fullName,
      lastName:
        spaceIdx >= 0 ? fullName.slice(spaceIdx + 1) : undefined,
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
    <section
      className="bg-surface-alt section-padding"
      aria-label="Send GAMMHA a message"
    >
      <div className="container-default">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* ── Form side ── */}
          <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-elevated border border-border">
            {status === "submitted" ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle
                    className="w-8 h-8 text-primary"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="font-heading text-xl font-bold text-text mb-2">
                  Message Received
                </h3>
                <p className="text-text-muted leading-relaxed mb-6">
                  Thank you. A real person on our team will read your message
                  and respond within one working day.
                </p>
                <a
                  href={phoneTel}
                  className="inline-flex items-center gap-2 px-5 py-3 bg-primary text-white rounded-xl font-semibold text-sm hover:bg-primary-dark transition-colors duration-200"
                >
                  <Phone className="w-4 h-4" aria-hidden="true" />
                  Or call us: {phone}
                </a>
              </div>
            ) : (
              <>
                <h3 className="font-heading text-2xl font-bold text-text mb-8">
                  Send us a message
                </h3>
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-5"
                  noValidate
                  aria-label="Support contact form"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="sup-fullName"
                        className="block text-xs font-semibold uppercase tracking-widest text-text-muted mb-2"
                      >
                        Full Name
                      </label>
                      <input
                        id="sup-fullName"
                        name="fullName"
                        type="text"
                        required
                        autoComplete="name"
                        placeholder="Aminata Bah"
                        className="input-base"
                        aria-required="true"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="sup-email"
                        className="block text-xs font-semibold uppercase tracking-widest text-text-muted mb-2"
                      >
                        Email Address
                      </label>
                      <input
                        id="sup-email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        placeholder="aminata@example.com"
                        className="input-base"
                        aria-required="true"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="sup-subject"
                      className="block text-xs font-semibold uppercase tracking-widest text-text-muted mb-2"
                    >
                      Subject
                    </label>
                    <select
                      id="sup-subject"
                      name="subject"
                      className="input-base bg-white cursor-pointer"
                    >
                      <option value="">General Inquiry</option>
                      <option value="support">Support for Myself</option>
                      <option value="support-other">
                        Support for Someone I Know
                      </option>
                      <option value="volunteer">Volunteer Opportunities</option>
                      <option value="advocacy">Advocacy Programs</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="sup-message"
                      className="block text-xs font-semibold uppercase tracking-widest text-text-muted mb-2"
                    >
                      Your Message
                    </label>
                    <textarea
                      id="sup-message"
                      name="message"
                      rows={5}
                      required
                      placeholder="How can we help you today?"
                      className="input-base resize-y"
                      aria-required="true"
                    />
                  </div>

                  {status === "error" && (
                    <p className="text-sm text-red-600" role="alert">
                      Something went wrong. Please try again or call us
                      directly.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full py-4 px-6 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-all duration-200 active:scale-95 disabled:opacity-60"
                  >
                    {status === "submitting" ? "Sending…" : "Send Message"}
                  </button>
                </form>
              </>
            )}
          </div>

          {/* ── Info side ── */}
          <div>
            <h3 className="font-heading text-2xl font-bold text-text mb-8">
              Get in touch directly
            </h3>
            <div className="flex flex-col gap-6">
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-full bg-surface flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-heading font-semibold text-text">Email</p>
                  <a
                    href={`mailto:${emailSupport}`}
                    className="text-text-muted hover:text-primary transition-colors duration-200"
                  >
                    {emailSupport}
                  </a>
                  <p className="text-sm text-text-muted mt-0.5">
                    Expected response: within 24 hours
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-full bg-surface flex items-center justify-center flex-shrink-0">
                  <MapPin
                    className="w-6 h-6 text-primary"
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <p className="font-heading font-semibold text-text">
                    Office Address
                  </p>
                  <address className="not-italic text-text-muted">
                    {address}
                  </address>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-full bg-surface flex items-center justify-center flex-shrink-0">
                  <Clock
                    className="w-6 h-6 text-primary"
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <p className="font-heading font-semibold text-text">
                    Office Hours
                  </p>
                  <p className="text-text-muted">{officeHours}</p>
                  <p className="text-sm text-text-muted mt-0.5">
                    Closed on public holidays
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
