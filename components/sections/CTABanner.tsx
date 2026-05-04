import Button from "@/components/ui/Button";

interface CTABannerProps {
  title: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export default function CTABanner({
  title,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: CTABannerProps) {
  return (
    <section className="bg-primary" aria-labelledby="cta-heading">
      <div className="container-default section-padding text-center">
        <h2
          id="cta-heading"
          className="font-heading text-3xl md:text-4xl font-bold text-white text-balance"
        >
          {title}
        </h2>
        <p className="mt-4 text-lg text-white/80 max-w-xl mx-auto leading-relaxed">
          {description}
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Button href={primaryHref} variant="accent" size="lg">
            {primaryLabel}
          </Button>
          {secondaryLabel && secondaryHref && (
            <Button
              href={secondaryHref}
              variant="white"
              size="lg"
            >
              {secondaryLabel}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
