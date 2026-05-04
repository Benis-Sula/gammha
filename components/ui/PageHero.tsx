import Image from "next/image";
import type { HeroContent } from "@/lib/content";

interface PageHeroProps extends HeroContent {
  headingId: string;
  imagePosition?: "center" | "top" | "bottom";
}

export default function PageHero({
  eyebrow,
  title,
  description,
  image,
  headingId,
  imagePosition = "center",
}: PageHeroProps) {
  return (
    <section
      className="bg-surface pt-28 md:pt-36 overflow-hidden"
      aria-labelledby={headingId}
    >
      <div className="container-default">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-end">
          <div className="pb-12 lg:pb-16">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">
              {eyebrow}
            </p>
            <h1
              id={headingId}
              className="font-heading text-4xl md:text-5xl font-bold text-text text-balance"
            >
              {title}
            </h1>
            <p className="mt-6 text-xl text-text-muted leading-relaxed">
              {description}
            </p>
          </div>

          <div className="relative aspect-[4/3] lg:aspect-auto lg:h-[440px] rounded-t-2xl overflow-hidden shadow-elevated">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className={`object-cover ${{ center: "object-center", top: "object-[50%_2%]", bottom: "object-bottom" }[imagePosition]}`}
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-primary/15 to-transparent"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
