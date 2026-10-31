import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";

/**
 * Shared page header for the Products and Contact pages.
 *
 * Editorial masthead: a slim rule of meta across the top, an oversized title
 * set against a soft panel, and the supporting copy pulled into a narrow
 * column on the right. No breadcrumb chain, no divider grid — the rule and the
 * type do the work.
 */
export function PageMasthead({
  index,
  label,
  title,
  intro,
  meta,
  action,
  children,
  rightElement,
  compact = false,
}: {
  index?: string;
  label?: string;
  title: React.ReactNode;
  intro?: string;
  meta?: { label: string; value: React.ReactNode }[];
  action?: { href: string; label: string };
  children?: React.ReactNode;
  rightElement?: React.ReactNode;
  compact?: boolean;
}) {
  const showMetaRule = Boolean(label || (meta && meta.length > 0));

  return (
    <section
      className={`relative overflow-hidden border-b border-ink/10 bg-soft ${
        compact ? "pb-7 pt-24 lg:pb-8 lg:pt-28" : "pb-12 pt-28 lg:pb-14 lg:pt-34"
      }`}
    >
      {/* Soft arc that ties the masthead to the brand red without a band */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-48 h-[520px] w-[520px] rounded-full border border-brand/15"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-32 h-[380px] w-[380px] rounded-full border border-brand/10"
      />

      <div className="shell relative">
        {/* Meta rule */}
        {showMetaRule && (
          <div className={`flex flex-wrap items-center justify-between gap-4 border-b border-ink/15 ${compact ? "pb-3" : "pb-4"}`}>
            {label && <SectionLabel index={index ?? "00"}>{label}</SectionLabel>}
            {meta && meta.length > 0 && (
              <dl className="flex flex-wrap items-center gap-x-7 gap-y-2">
                {meta.map((item) => (
                  <div key={item.label} className="flex items-baseline gap-2">
                    <dt className="text-[12px] text-mid">{item.label}</dt>
                    <dd className="tabular text-[13px] font-semibold text-ink">{item.value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        )}

        {/* Title block */}
        <div className={`grid items-baseline gap-6 sm:grid-cols-12 sm:gap-8 ${compact ? (showMetaRule ? "mt-6 lg:mt-7" : "mt-0") : "mt-10 lg:gap-12"}`}>
          <h1
            className={`font-semibold tracking-tight text-ink sm:col-span-7 lg:col-span-6 ${
              compact ? "text-[32px] sm:text-[40px] lg:text-[48px] leading-tight" : "display-lg max-w-2xl"
            }`}
            data-reveal
            data-reveal-dir="left"
            data-reveal-delay="0.1"
          >
            {title}
          </h1>

          <div className="sm:col-span-5 lg:col-span-6 sm:self-center">
            {rightElement ? (
              rightElement
            ) : (
              <>
                {!compact && <span aria-hidden className="mb-5 block h-px w-14 bg-brand" />}
                {intro && (
                  <p className={`leading-relaxed text-mid ${compact ? "text-[14.5px] max-w-lg" : "max-w-sm text-[16px]"}`} data-reveal>
                    {intro}
                  </p>
                )}
                {action && (
                  <Button
                    href={action.href}
                    variant="primary"
                    size="md"
                    className="mt-6"
                    withArrow
                  >
                    {action.label}
                  </Button>
                )}
              </>
            )}
          </div>
        </div>

        {children}
      </div>
    </section>
  );
}
