interface IconBoxProps {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  shape?: "rounded" | "circle";
  className?: string;
}

const sizeMap = {
  sm: "w-10 h-10",
  md: "w-12 h-12",
  lg: "w-14 h-14",
};

const shapeMap = {
  rounded: "rounded-xl",
  circle: "rounded-full",
};

export default function IconBox({
  children,
  size = "md",
  shape = "rounded",
  className = "",
}: IconBoxProps) {
  return (
    <div
      className={`${sizeMap[size]} ${shapeMap[shape]} bg-surface-alt flex items-center justify-center flex-shrink-0 ${className}`}
      aria-hidden="true"
    >
      {children}
    </div>
  );
}
