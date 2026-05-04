interface BulletListProps {
  items: string[];
  dotClass?: string;
  textClass?: string;
  className?: string;
}

export default function BulletList({
  items,
  dotClass = "bg-primary",
  textClass = "text-text-muted",
  className = "",
}: BulletListProps) {
  return (
    <ul className={`flex flex-col gap-3 ${className}`} role="list">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <div
            className={`w-2 h-2 rounded-full ${dotClass} flex-shrink-0 mt-2`}
            aria-hidden="true"
          />
          <span className={`${textClass} leading-relaxed`}>{item}</span>
        </li>
      ))}
    </ul>
  );
}
