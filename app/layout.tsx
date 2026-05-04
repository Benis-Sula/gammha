import type { Metadata } from "next";
import "@/styles/globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    default: "GAMMHA — Gambia Alliance for Maternal Mental Health & Advocacy",
    template: "%s | GAMMHA",
  },
  description:
    "Supporting mothers' mental health in The Gambia through awareness, advocacy, and access to care.",
  keywords: [
    "maternal mental health",
    "Gambia",
    "postpartum depression",
    "advocacy",
    "NGO",
  ],
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "GAMMHA",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-surface text-text antialiased">
        <Navbar />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
