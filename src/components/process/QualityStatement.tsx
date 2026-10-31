import Image from "next/image";
import { ClipboardCheck, PackageCheck, ScanLine, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { inspectionStages, qualityStatement } from "@/data/manufacturing";

const gateIcons: Record<string, LucideIcon> = {
  inbound: PackageCheck,
  impression: ScanLine,
  finished: ClipboardCheck,
};

const gateTiles = [
  "bg-emerald-light text-emerald-accent",
  "bg-ocean-light text-ocean",
  "bg-amber-light text-amber-accent",
];

export function QualityStatement() {
  return (
    <section className="relative overflow-hidden bg-white py-12 lg:py-16 border-b border-slate-200/60" aria-labelledby="quality-heading">
      <Reveal className="shell">
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Quality Pull Quote and Inspection Gates */}
          <div className="flex flex-col justify-center lg:col-span-7">
            <div data-reveal data-reveal-dir="left" data-reveal-delay="0.1" className="flex items-center gap-2">
              <span className="h-[2px] w-5 bg-emerald-accent" />
              <p className="font-mono text-[11.5px] font-bold uppercase tracking-[0.2em] text-emerald-accent">
                QUALITY ASSURANCE
              </p>
            </div>

            <h2 id="quality-heading" className="sr-only">
              {qualityStatement.eyebrow}
            </h2>

            <div data-reveal data-reveal-dir="left" data-reveal-delay="0.18">
              <blockquote
                className="mt-4 border-l-2 border-emerald-accent pl-5 font-display text-[clamp(1.5rem,2.4vw,2.15rem)] font-bold leading-[1.2] tracking-tight text-ink sm:pl-6"
              >
                {qualityStatement.quote}
              </blockquote>
            </div>

            <div data-reveal data-reveal-dir="up" data-reveal-delay="0.25">
              <p className="mt-3.5 max-w-lg text-[13.5px] sm:text-[14px] leading-relaxed text-slate-500 font-normal">
                {qualityStatement.note}
              </p>
            </div>

            <ul className="mt-6 grid gap-x-5 gap-y-4 sm:grid-cols-3">
              {inspectionStages.map((stage, index) => {
                const Icon = gateIcons[stage.icon] ?? PackageCheck;

                return (
                  <li
                    key={stage.index}
                    data-reveal
                    data-reveal-dir="up"
                    data-reveal-delay={(0.28 + index * 0.08).toFixed(2)}
                    className="border-t border-slate-200/80 pt-3"
                  >
                    <span
                      className={`flex h-9 w-9 items-center justify-center rounded-[10px] ${
                        gateTiles[index] ?? gateTiles[0]
                      }`}
                    >
                      <Icon aria-hidden className="h-4 w-4" strokeWidth={1.9} />
                    </span>
                    <span className="mt-2 block text-[13px] font-bold leading-snug text-ink">
                      {stage.title}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Right Column: Stacked Pails Photography - Scaled Down Height & Staggered Reveal */}
          <div className="lg:col-span-5">
            <div
              data-reveal
              data-reveal-dir="scale"
              data-reveal-delay="0.25"
              className="relative aspect-[4/3.4] w-full max-h-[380px] overflow-hidden rounded-[24px] bg-slate-100 border border-slate-200/80 shadow-md transition-all duration-500 hover:shadow-xl"
            >
              <Image
                src="/images/detail/stacked-pails.jpg"
                alt="Finished containers stacked after inspection"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="ambient-media-slow object-cover"
              />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
