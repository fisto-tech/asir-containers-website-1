import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowRight } from "lucide-react";

type Variant = "primary" | "dark" | "outline" | "light" | "ghost";
type Size = "md" | "lg" | "sm";

const base =
  "group/btn sheen-sweep relative inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-50";

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-[13px]",
  md: "h-12 px-6 text-sm",
  lg: "h-14 px-7 text-[15px]",
};

const variants: Record<Variant, string> = {
  primary: "bg-brand text-white hover:bg-brand-dark",
  dark: "bg-ink text-white hover:bg-charcoal",
  outline:
    "border border-ink text-ink hover:bg-ink hover:text-white",
  light: "bg-white text-ink hover:bg-light",
  ghost: "text-ink hover:text-brand",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  withArrow?: boolean;
  className?: string;
  children: ReactNode;
};

const inner = (children: ReactNode, withArrow?: boolean) => (
  <>
    <span className="relative z-10">{children}</span>
    {withArrow && (
      <ArrowRight
        aria-hidden
        className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1"
        strokeWidth={2}
      />
    )}
  </>
);

export function Button({
  href,
  variant = "primary",
  size = "md",
  withArrow,
  className = "",
  children,
  ...props
}: CommonProps & { href: string } & Omit<ComponentProps<typeof Link>, "href" | "children">) {
  return (
    <Link
      href={href}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      {inner(children, withArrow)}
    </Link>
  );
}

export function ButtonEl({
  variant = "primary",
  size = "md",
  withArrow,
  className = "",
  children,
  ...props
}: CommonProps & ComponentProps<"button">) {
  return (
    <button
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      {inner(children, withArrow)}
    </button>
  );
}
