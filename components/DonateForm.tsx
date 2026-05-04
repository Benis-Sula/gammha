"use client";

import Image from "next/image";
import { useState } from "react";
import { Heart, CheckCircle, CreditCard, Smartphone, ShieldCheck, Users, TrendingUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import Card from "@/components/ui/Card";
import { donateHeroImage, donatePresetAmounts, donateTrustSignals } from "@/lib/content";

const iconMap: Record<string, LucideIcon> = { ShieldCheck, Users, TrendingUp };

interface ImpactTier {
  amount: string;
  numericAmount: number;
  headline: string;
  impact: string;
}

interface DonateFormProps {
  impactTiers: ImpactTier[];
  phone: string;
  emailDonations: string;
}

export default function DonateForm({ impactTiers, phone, emailDonations }: DonateFormProps) {
  const presetAmounts = donatePresetAmounts;
  const [selectedAmount, setSelectedAmount] = useState<number | null>(250);
  const [customAmount, setCustomAmount] = useState("");
  const [frequency, setFrequency] = useState<"once" | "monthly">("once");
  const [paymentMethod, setPaymentMethod] = useState<"mobile" | "bank">("mobile");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const displayAmount = customAmount ? parseInt(customAmount, 10) || 0 : selectedAmount ?? 0;

  const activeImpact = impactTiers.find((item) =>
    customAmount
      ? parseInt(customAmount, 10) >= item.numericAmount
      : item.numericAmount === selectedAmount
  );

  function handleAmountSelect(amount: number) {
    setSelectedAmount(amount);
    setCustomAmount("");
  }

  function handleCustomChange(value: string) {
    setCustomAmount(value.replace(/[^0-9]/g, ""));
    setSelectedAmount(null);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitted(true);
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center pt-20">
        <div className="max-w-lg w-full mx-auto px-4 text-center">
          <div className="w-20 h-20 rounded-full bg-surface-alt flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-primary" aria-hidden="true" />
          </div>
          <h1 className="font-heading text-3xl font-bold text-text mb-4">Thank You for Your Generosity</h1>
          <p className="text-text-muted text-lg leading-relaxed mb-6">
            Your donation of <span className="font-semibold text-primary">D{displayAmount}</span> will help us support more mothers across The Gambia. We will be in touch with confirmation details.
          </p>
          <p className="text-text-muted text-base">
            Questions? Email us at{" "}
            <a href={`mailto:${emailDonations}`} className="text-primary font-semibold hover:underline">
              {emailDonations}
            </a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* ── Why Donate ── */}
      <section className="bg-surface pt-28 md:pt-36 overflow-hidden" aria-labelledby="why-donate-heading">
        <div className="container-default">
          <div className="text-center mb-10 lg:mb-14">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">Donate</p>
            <h1 id="why-donate-heading" className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-text">
              Your Gift Reaches a Mother
              <br />
              Who Has Nowhere Else to Turn
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-end">
            <div className="pb-12 lg:pb-16">
              <p className="mt-0 text-xl text-text-muted leading-relaxed">
                In The Gambia, 1 in 5 mothers experience a mental health condition — and 72% receive no help at all. Your donation changes that. Every Dalasi you give funds awareness, support, and advocacy for mothers who are suffering in silence.
              </p>
              <ul className="mt-8 flex flex-col gap-3" role="list">
                {[
                  "Free, confidential support for mothers in crisis",
                  "Training community health workers across all regions",
                  "Policy advocacy to make mental health care a right",
                  "Awareness campaigns that reach thousands of families",
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-text-muted leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 p-5 rounded-xl bg-surface-alt border border-border">
                <p className="font-heading text-base font-semibold text-text mb-1">
                  &ldquo;I thought no one understood what I was going through. GAMMHA gave me hope.&rdquo;
                </p>
                <p className="text-sm text-text-muted">— Mother supported by GAMMHA, Banjul</p>
              </div>
            </div>

            <div className="relative aspect-[4/3] lg:aspect-auto lg:h-[500px] rounded-t-2xl overflow-hidden shadow-elevated">
              <Image
                src={donateHeroImage.src}
                alt={donateHeroImage.alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" aria-hidden="true" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust Signals ── */}
      <section className="bg-primary" aria-label="Why trust GAMMHA">
        <div className="container-default py-10">
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10" role="list">
            {donateTrustSignals.map(({ iconName, label, description }) => {
              const Icon = iconMap[iconName];
              return (
                <li key={label} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                    {Icon && <Icon className="w-5 h-5 text-white" aria-hidden="true" />}
                  </div>
                  <div>
                    <p className="font-heading font-semibold text-white text-base mb-1">{label}</p>
                    <p className="text-white/75 text-sm leading-relaxed">{description}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ── Form + Impact ── */}
      <section className="section-padding bg-surface" aria-label="Donation form and impact">
        <div className="container-default">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

            <form onSubmit={handleSubmit} aria-label="Donation form">
              <Card>
                <h2 className="font-heading text-2xl font-bold text-text mb-6">Make Your Donation</h2>

                <fieldset className="mb-6">
                  <legend className="text-sm font-semibold text-text mb-3">Donation Frequency</legend>
                  <div className="flex gap-2">
                    {(["once", "monthly"] as const).map((f) => (
                      <button
                        key={f}
                        type="button"
                        onClick={() => setFrequency(f)}
                        className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold border-2 transition-all duration-200 cursor-pointer ${frequency === f ? "border-primary bg-primary text-white" : "border-border text-text-muted hover:border-primary/50 hover:text-text"}`}
                        aria-pressed={frequency === f}
                      >
                        {f === "once" ? "One-time" : "Monthly"}
                      </button>
                    ))}
                  </div>
                  {frequency === "monthly" && (
                    <p className="mt-2 text-xs text-primary font-medium">
                      Monthly giving creates a reliable income for GAMMHA — thank you.
                    </p>
                  )}
                </fieldset>

                <fieldset className="mb-6">
                  <legend className="text-sm font-semibold text-text mb-3">Select Amount (Gambian Dalasi)</legend>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3" role="group" aria-label="Preset donation amounts">
                    {presetAmounts.map((amount) => (
                      <button
                        key={amount}
                        type="button"
                        onClick={() => handleAmountSelect(amount)}
                        className={`py-3 rounded-lg text-sm font-semibold border-2 transition-all duration-200 cursor-pointer ${selectedAmount === amount && !customAmount ? "border-primary bg-primary text-white" : "border-border text-text-muted hover:border-primary/50 hover:text-text"}`}
                        aria-pressed={selectedAmount === amount && !customAmount}
                      >
                        D{amount}
                      </button>
                    ))}
                  </div>
                  <div>
                    <label htmlFor="custom-amount" className="block text-sm font-medium text-text-muted mb-1.5">
                      Or enter a custom amount
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted font-semibold text-sm" aria-hidden="true">D</span>
                      <input
                        id="custom-amount"
                        type="text"
                        inputMode="numeric"
                        placeholder="e.g. 750"
                        value={customAmount}
                        onChange={(e) => handleCustomChange(e.target.value)}
                        className="w-full pl-8 pr-4 py-3 border-2 border-border rounded-lg text-text text-base focus:outline-none focus:border-primary transition-colors duration-200"
                        aria-label="Custom donation amount in Dalasi"
                      />
                    </div>
                  </div>
                </fieldset>

                {activeImpact && (
                  <div className="mb-6 p-4 rounded-xl bg-surface-alt border-2 border-primary/20">
                    <p className="text-xs font-semibold uppercase tracking-wide text-primary mb-1">Your impact</p>
                    <p className="font-heading text-base font-bold text-text mb-1">{activeImpact.headline}</p>
                    <p className="text-sm text-text-muted leading-relaxed">{activeImpact.impact}</p>
                  </div>
                )}

                <fieldset className="mb-6">
                  <legend className="text-sm font-semibold text-text mb-3">Payment Method</legend>
                  <div className="flex flex-col gap-2">
                    {([
                      { id: "mobile", label: "Mobile Money", icon: Smartphone, description: "Africell Money, QMoney, or similar" },
                      { id: "bank", label: "Bank Transfer", icon: CreditCard, description: "Direct bank transfer" },
                    ] as const).map(({ id, label, icon: Icon, description }) => (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setPaymentMethod(id)}
                        className={`flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all duration-200 cursor-pointer ${paymentMethod === id ? "border-primary bg-surface-alt" : "border-border hover:border-primary/40"}`}
                        aria-pressed={paymentMethod === id}
                      >
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${paymentMethod === id ? "bg-primary text-white" : "bg-surface-alt text-text-muted"}`}>
                          <Icon className="w-5 h-5" aria-hidden="true" />
                        </div>
                        <div>
                          <p className="font-semibold text-text text-sm">{label}</p>
                          <p className="text-text-muted text-xs mt-0.5">{description}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </fieldset>

                {paymentMethod === "mobile" && (
                  <div className="mb-6 p-4 rounded-xl bg-surface-alt border border-border">
                    <p className="text-sm font-semibold text-text mb-1">Mobile Money Details</p>
                    <p className="text-sm text-text-muted">Send to: <span className="font-semibold text-text">{phone}</span></p>
                    <p className="text-sm text-text-muted mt-1">Account name: <span className="font-semibold text-text">GAMMHA</span></p>
                  </div>
                )}

                {paymentMethod === "bank" && (
                  <div className="mb-6 p-4 rounded-xl bg-surface-alt border border-border">
                    <p className="text-sm font-semibold text-text mb-1">Bank Transfer Details</p>
                    <p className="text-sm text-text-muted">Bank: <span className="font-semibold text-text">Trust Bank Gambia</span></p>
                    <p className="text-sm text-text-muted mt-1">Account: <span className="font-semibold text-text">1234567890</span></p>
                    <p className="text-sm text-text-muted mt-1">Account Name: <span className="font-semibold text-text">GAMMHA</span></p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={displayAmount <= 0}
                  className="w-full py-4 px-6 bg-accent text-white font-bold text-lg rounded-xl hover:bg-accent-dark disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 shadow-elevated"
                >
                  <Heart className="w-5 h-5" aria-hidden="true" />
                  {displayAmount > 0 ? `Donate D${displayAmount}` : "Enter an Amount"}
                  {frequency === "monthly" ? " / month" : ""}
                </button>

                <p className="mt-4 text-xs text-text-muted text-center">
                  This is a demonstration — no real payment will be processed. For actual donations please contact{" "}
                  <a href={`mailto:${emailDonations}`} className="text-primary font-medium hover:underline">
                    {emailDonations}
                  </a>
                </p>
              </Card>
            </form>

            {/* Impact sidebar */}
            <div>
              <SectionHeader
                eyebrow="Your Impact"
                title="See What Your Donation Does"
                description="Every amount makes a real, measurable difference to mothers in The Gambia."
              />
              <ul className="mt-8 flex flex-col gap-3" role="list">
                {impactTiers.map(({ amount, headline, impact }) => (
                  <li key={amount} className="p-4 rounded-xl bg-surface-alt border border-border">
                    <div className="flex items-baseline gap-3 mb-1">
                      <span className="font-heading text-xl font-bold text-primary leading-none">{amount}</span>
                      <span className="font-heading text-base font-semibold text-text">{headline}</span>
                    </div>
                    <p className="text-text-muted leading-relaxed text-sm">{impact}</p>
                  </li>
                ))}
              </ul>

              <div className="mt-8 p-6 bg-primary rounded-xl text-white">
                <p className="font-heading text-lg font-semibold mb-3">Why Your Support Cannot Wait</p>
                <p className="text-white/80 leading-relaxed text-base mb-4">
                  Right now, mothers across The Gambia are struggling in silence — afraid to speak, unable to find help. GAMMHA is a nonprofit entirely dependent on donations. When you give, you are literally the reason a mother gets help today.
                </p>
                <p className="text-white/70 text-sm">
                  Questions?{" "}
                  <a href={`mailto:${emailDonations}`} className="text-white underline hover:text-white/90">
                    {emailDonations}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
