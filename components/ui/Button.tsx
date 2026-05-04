import { type ButtonHTMLAttributes, forwardRef } from "react";
import Link from "next/link";

type ButtonVariant = "primary" | "accent" | "outline" | "ghost" | "white";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  external?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-white hover:bg-primary-dark border-2 border-primary hover:border-primary-dark",
  accent:
    "bg-accent text-white hover:bg-accent-dark border-2 border-accent hover:border-accent-dark",
  outline:
    "bg-transparent text-primary border-2 border-primary hover:bg-primary hover:text-white",
  ghost: "bg-transparent text-primary hover:underline",
  white:
    "bg-transparent text-white border-2 border-white/60 hover:bg-white hover:text-primary hover:border-white",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

const base =
  "inline-flex items-center justify-center gap-2 font-semibold font-body rounded-lg transition-all duration-200 cursor-pointer whitespace-nowrap focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-60 disabled:cursor-not-allowed";

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      href,
      external,
      className = "",
      children,
      ...props
    },
    ref
  ) => {
    const classes = `${base} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

    if (href) {
      return (
        <Link
          href={href}
          className={classes}
          {...(external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {children}
        </Link>
      );
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
