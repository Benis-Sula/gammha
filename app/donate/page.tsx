import type { Metadata } from "next";
import DonateForm from "@/components/DonateForm";
import { getDonationTiers, getSiteSettings } from "@/lib/data";

export const metadata: Metadata = {
  title: "Donate",
  description: "Support GAMMHA's work to improve maternal mental health in The Gambia.",
};

export default async function DonatePage() {
  const [rawTiers, settings] = await Promise.all([getDonationTiers(), getSiteSettings()])

  const impactTiers = rawTiers.map((t) => ({
    amount: t.amount,
    numericAmount: t.numericAmount,
    headline: t.headline,
    impact: t.impact,
  }))

  const phone = settings.contact_phone || "+220 123 4567";
  const emailDonations = settings.contact_email_donations || "donations@gammha.org";

  return <DonateForm impactTiers={impactTiers} phone={phone} emailDonations={emailDonations} />;
}
