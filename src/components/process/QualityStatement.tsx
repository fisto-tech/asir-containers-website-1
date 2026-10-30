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

/**
 * Quality statement as a pull-quote band: the quote and its note on the left,
 * a photograph of the finished container on the right. Both columns share the
 * same height because the image plate stretches to the copy.
 */
export function QualityStatement() {
  return (
    <section className="bg-[#fbfaf7] py-20 lg:py-28" aria-labelledby="quality-heading">
      <Reveal className="shell">
        <div className="grid items-stretch gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col justify-center lg:col-span-7">
            <p className="text-[12.5px] font-semibold uppercase tracking-[0.16em] text-emerald-accent">
              Quality
            </p>

            <h2 id="quality-heading" className="sr-only">
              {qualityStatement.eyebrow}
            </h2>

            <blockquote
              className="mt-6 border-l-2 border-emerald-accent pl-6 font-display text-[clamp(1.7rem,2.8vw,2.5rem)] font-semibold leading-[1.24] tracking-[-0.025em] text-ink sm:pl-8"
              data-reveal="letters"
            >
              {qualityStatement.quote}
            </blockquote>

            <p className="mt-7 max-w-lg text-[14.5px] leading-relaxed text-mid" data-reveal>
              {qualityStatement.note}
            </p>

            <ul className="mt-9 grid gap-x-6 gap-y-6 sm:grid-cols-3" data-reveal>
              {inspectionStages.map((stage, index) => {
                const Icon = gateIcons[stage.icon] ?? PackageCheck;

                return (
                  <li key={stage.index} className="border-t border-line pt-4">
                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-[12px] ${
                        gateTiles[index] ?? gateTiles[0]
                      }`}
                    >
                      <Icon aria-hidden className="h-[18px] w-[18px]" strokeWidth={1.8} />
                    </span>
                    <span className="mt-3 block text-[13.5px] font-semibold leading-snug text-ink">
                      {stage.title}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="lg:col-span-5">
            <div className="relative h-full min-h-[280px] overflow-hidden rounded-[26px] bg-light shadow-[0_30px_70px_-50px_rgba(17,17,17,0.55)] sm:min-h-[340px]">
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
