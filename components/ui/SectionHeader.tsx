interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  centered?: boolean;
  light?: boolean;
}

export default function SectionHeader({
  eyebrow,
  title,
  description,
  centered = false,
  light = false,
}: SectionHeaderProps) {
  return (
    <div className={`max-w-2xl ${centered ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <p
          className={`text-sm font-semibold uppercase tracking-widest mb-3 ${
            light ? "text-white/70" : "text-primary"
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`font-heading text-3xl md:text-4xl font-bold leading-tight text-balance ${
          light ? "text-white" : "text-text"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-lg leading-relaxed ${
            light ? "text-white/80" : "text-text-muted"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
