import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Donate",
  description:
    "Support GAMMHA's mission to improve maternal mental health in The Gambia. Every donation makes a difference.",
};

export default function DonateLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
