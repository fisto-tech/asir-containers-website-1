import { Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { machinery } from "@/data/manufacturing";

/**
 * Machine ledger — production routes on the left, auxiliaries on the right.
 * Capacities are set in tabular type so the column reads like a spec sheet.
 */
export function MachinerySection() {
  return (
    <Reveal className="bg-charcoal py-16 text-white lg:py-20">
      <div className="shell">
        <div className="flex flex-col justify-between gap-6 border-b border-white/15 pb-8 lg:flex-row lg:items-end">
          <div>
            <SectionLabel index={undefined} tone="light">
              {machinery.eyebrow}
            </SectionLabel>
            <h2 className="display-md mt-4 max-w-xl text-white" data-reveal="letters">
              Machines and the envelope they run.
            </h2>
          </div>
          <p className="max-w-sm text-[14px] leading-relaxed text-white/85" data-reveal>
            {machinery.intro}
          </p>
        </div>

        <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Production */}
          <div className="lg:col-span-7">
            <div className="flex items-baseline justify-between gap-4 border-b border-white/15 pb-3">
              <h3 className="font-display text-[18px] font-semibold text-white">
                {machinery.production.title}
              </h3>
              <span className="text-[11px] uppercase tracking-[0.16em] text-white/70">
                {String(machinery.production.rows.length).padStart(2, "0")} routes
              </span>
            </div>

            <dl>
              {machinery.production.rows.map((row, index) => (
                <div
                  key={row.name}
                  className="group grid gap-1 border-b border-white/12 py-5 transition-colors duration-500 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-8"
                  data-reveal
                  data-reveal-delay={String(index * 0.06)}
                >
                  <dt>
                    <span className="font-display text-[17px] font-semibold text-white">
                      {row.name}
                    </span>
                    {row.note && (
                      <span className="mt-1 block text-[13px] leading-relaxed text-white/85">
                        {row.note}
                      </span>
                    )}
                  </dt>
                  <dd className="tabular text-[15px] font-semibold text-brand sm:text-right">
                    {row.capacity}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Auxiliaries */}
          <div className="lg:col-span-5">
            <div className="flex items-baseline justify-between gap-4 border-b border-white/15 pb-3">
              <h3 className="font-display text-[18px] font-semibold text-white">
                {machinery.auxiliaries.title}
              </h3>
              <span className="text-[11px] uppercase tracking-[0.16em] text-white/70">
                {String(machinery.auxiliaries.rows.length).padStart(2, "0")} units
              </span>
            </div>

            <ul className="grid gap-x-8 sm:grid-cols-2 lg:grid-cols-1">
              {machinery.auxiliaries.rows.map((row, index) => (
                <li
                  key={row.name}
                  className="flex items-baseline justify-between gap-4 border-b border-white/12 py-4"
                  data-reveal
                  data-reveal-delay={String(index * 0.05)}
                >
                  <span className="text-[14px] text-white/85">{row.name}</span>
                  <span className="tabular text-[13px] font-semibold text-white">{row.capacity}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
