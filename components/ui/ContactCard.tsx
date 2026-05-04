import type { ReactNode } from "react";
import IconBox from "./IconBox";

interface ContactCardProps {
  icon: ReactNode;
  title: string;
  value: string;
  subtitle?: string;
  href?: string;
  highlight?: boolean;
  badge?: string;
}

export default function ContactCard({
  icon,
  title,
  value,
  subtitle,
  href,
  highlight = false,
  badge,
}: ContactCardProps) {
  const baseClass =
    "flex items-start gap-4 p-5 rounded-xl transition-all duration-200";

  const variantClass = highlight
    ? "border-2 border-primary/20 bg-primary/5 hover:border-primary/40 hover:shadow-card"
    : "border border-border bg-white hover:border-primary/30 hover:shadow-card";

  const inner = (
    <>
      <IconBox className={highlight ? "!bg-primary/10" : ""}>{icon}</IconBox>
      <div>
        <p className="font-semibold text-text group-hover:text-primary transition-colors duration-200">
          {title}
          {badge && (
            <span className="ml-2 text-xs font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-full">
              {badge}
            </span>
          )}
        </p>
        <p className="text-text-muted text-base mt-0.5">{value}</p>
        {subtitle && (
          <p className="text-sm text-text-muted mt-1">{subtitle}</p>
        )}
      </div>
    </>
  );

  if (href) {
    return (
      <a href={href} className={`group ${baseClass} ${variantClass}`}>
        {inner}
      </a>
    );
  }

  return (
    <div className={`${baseClass} ${variantClass}`}>{inner}</div>
  );
}
