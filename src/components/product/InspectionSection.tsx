import { ClipboardCheck, PackageCheck, ScanLine } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { inspectionStages, qualityStatement } from "@/data/manufacturing";

const icons = {
  inbound: PackageCheck,
  impression: ScanLine,
  finished: ClipboardCheck,
} as const;

/**
 * Quality statement + the three inspection gates. The statement is set as a
 * pull quote against the numbered gates so it reads as the plant's own line.
 */
export function InspectionSection() {
  return (
    <Reveal className="bg-white py-16 lg:py-20">
      <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionLabel index={undefined}>{qualityStatement.eyebrow}</SectionLabel>

          <figure className="mt-6 border-l-2 border-brand pl-6">
            <blockquote
              className="font-display text-[22px] font-semibold leading-[1.32] tracking-[-0.01em] text-ink lg:text-[28px]"
              data-reveal
            >
              {qualityStatement.quote}
            </blockquote>
          </figure>

          <p className="mt-6 max-w-sm text-[14px] leading-relaxed text-mid" data-reveal>
            {qualityStatement.note}
          </p>
        </div>

        <div className="lg:col-span-7">
          <ol className="border-t border-ink/15">
            {inspectionStages.map((stage, index) => {
              const Icon = icons[stage.icon];
              return (
                <li
                  key={stage.title}
                  className="group border-b border-line"
                  data-reveal
                  data-reveal-delay={String(index * 0.08)}
                >
                  <div className="flex gap-5 py-6 transition-transform duration-500 group-hover:translate-x-1">
                    <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
                      <Icon aria-hidden className="h-5 w-5" />
                    </span>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline justify-between gap-4">
                        <h3 className="font-display text-[18px] font-semibold leading-snug text-ink">
                          {stage.title}
                        </h3>
                        <span className="tabular text-[12px] font-semibold text-mid">
                          {stage.index}
                        </span>
                      </div>
                      <p className="mt-2 text-[13.5px] leading-relaxed text-mid">{stage.detail}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </Reveal>
  );
}
