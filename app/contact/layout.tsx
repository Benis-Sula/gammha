import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with GAMMHA. We are here to help with support, partnerships, and general enquiries.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
