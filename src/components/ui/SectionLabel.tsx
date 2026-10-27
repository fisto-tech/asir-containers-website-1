/**
 * Section label: an optional red index number, then the name in solid ink.
 * Deliberately plain — no pill, no badge, no rule-dash.
 */
export function SectionLabel({
  index,
  children,
  tone = "dark",
  reveal = false,
  className = "",
}: {
  index?: string;
  children: React.ReactNode;
  tone?: "dark" | "light";
  /** Opt into the scroll reveal used across the site. */
  reveal?: boolean;
  className?: string;
}) {
  return (
    <p
      data-reveal={reveal ? "" : undefined}
      className={`flex items-baseline gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] ${
        tone === "light" ? "text-white" : "text-ink"
      } ${className}`}
    >
      {index ? <span className="ambient-breathe tabular text-brand">{index}</span> : null}
      {children}
    </p>
  );
}
