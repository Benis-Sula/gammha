import type { Metadata } from "next";
import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-surface flex items-center justify-center pt-16">
      <div className="container-default text-center py-24">
        <p className="font-heading text-8xl font-bold text-primary/20 select-none" aria-hidden="true">
          404
        </p>
        <h1 className="font-heading text-3xl font-bold text-text mt-4">
          Page Not Found
        </h1>
        <p className="mt-4 text-lg text-text-muted max-w-md mx-auto leading-relaxed">
          We could not find the page you were looking for. It may have been
          moved or removed.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-semibold text-white bg-primary rounded-lg hover:bg-primary-dark transition-all duration-200"
          >
            <Home className="w-4 h-4" aria-hidden="true" />
            Go to Home
          </Link>
          <Link
            href="/support"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-semibold text-primary border-2 border-primary rounded-lg hover:bg-primary hover:text-white transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Get Support
          </Link>
        </div>
      </div>
    </div>
  );
}
