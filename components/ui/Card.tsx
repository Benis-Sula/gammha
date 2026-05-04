import { type ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = "", hover = false }: CardProps) {
  return (
    <div
      className={`bg-white rounded-xl border border-border shadow-card p-6 ${
        hover
          ? "transition-all duration-200 hover:shadow-card-hover hover:-translate-y-0.5 cursor-pointer"
          : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
