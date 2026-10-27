"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { useScrollReveal } from "@/lib/animations";

type RevealProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  id?: string;
};

/**
 * Client-side animation boundary.
 * Wrap any subtree (including Server Component output) and every descendant
 * marked with `data-reveal` / `data-reveal-mask` animates into view.
 */
export function Reveal({ children, className, as: Tag = "div", id }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  useScrollReveal(ref);

  const Component = Tag as ElementType;
  return (
    <Component ref={ref} id={id} className={className}>
      {children}
    </Component>
  );
}
