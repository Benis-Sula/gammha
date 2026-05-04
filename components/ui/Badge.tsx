type BadgeVariant = "default" | "accent" | "muted";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-surface-alt text-primary border border-primary/20",
  accent: "bg-accent/10 text-accent-dark border border-accent/20",
  muted: "bg-gray-100 text-text-muted border border-gray-200",
};

export default function Badge({ children, variant = "default" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${variantStyles[variant]}`}
    >
      {children}
    </span>
  );
}
