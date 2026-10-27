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
}: {
  index: string;
  label: string;
  title: React.ReactNode;
  intro: string;
  meta?: { label: string; value: React.ReactNode }[];
  action?: { href: string; label: string };
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-ink/10 bg-soft pb-12 pt-28 lg:pb-14 lg:pt-34">
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
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-ink/15 pb-4">
          <SectionLabel index={index}>{label}</SectionLabel>
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

        {/* Title block */}
        <div className="mt-10 grid items-end gap-8 lg:grid-cols-12 lg:gap-12">
          <h1
            className="display-lg max-w-2xl text-ink lg:col-span-7"
            data-reveal="letters"
          >
            {title}
          </h1>

          <div className="lg:col-span-5">
            <span aria-hidden className="mb-5 block h-px w-14 bg-brand" />
            <p className="max-w-sm text-[16px] leading-relaxed text-mid" data-reveal>
              {intro}
            </p>
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
          </div>
        </div>

        {children}
      </div>
    </section>
  );
}
