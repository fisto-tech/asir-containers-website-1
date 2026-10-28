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
    <Reveal className="border-t border-line/60 bg-white py-16 lg:py-20">
      <div className="shell grid gap-10 lg:grid-cols-12 lg:gap-14 items-center">
        {/* Left Column: Full Untrimmed Slogan with Modern Industrial Accent */}
        <div className="lg:col-span-5">
          <SectionLabel index="03">{qualityStatement.eyebrow}</SectionLabel>

          <figure className="mt-5 border-l-3 border-brand pl-5 lg:pl-6">
            <blockquote
              className="font-display text-[22px] font-bold leading-[1.34] tracking-tight text-ink sm:text-[26px] lg:text-[28px]"
              data-reveal
            >
              {qualityStatement.quote}
            </blockquote>
          </figure>
        </div>

        {/* Right Column: Minimal Clean Stage Indicators */}
        <div className="lg:col-span-7">
          <div className="grid gap-3.5 sm:grid-cols-3">
            {inspectionStages.map((stage, index) => {
              const Icon = icons[stage.icon];
              return (
                <div
                  key={stage.title}
                  className="group relative flex flex-col justify-between rounded-xl border border-line/80 bg-soft/40 p-5 transition-all duration-300 hover:border-brand/40 hover:bg-white hover:shadow-md"
                  data-reveal
                  data-reveal-delay={String(index * 0.08)}
                >
                  <div className="flex items-center justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand/10 text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                      <Icon aria-hidden className="h-5 w-5" />
                    </span>
                    <span className="font-mono text-[13px] font-bold tabular text-brand">
                      {stage.index}
                    </span>
                  </div>

                  <h3 className="mt-5 font-display text-[16px] font-bold leading-snug text-ink group-hover:text-brand transition-colors">
                    {stage.title}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Reveal>
  );
}
