import Image from "next/image";
import { Boxes, Printer } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { inProcess } from "@/data/manufacturing";

/**
 * In-process activities: moulding first, then the three printing routes, each
 * shown with the client mark that runs on it.
 */
export function ProcessSection() {
  return (
    <Reveal className="bg-soft py-16 lg:py-20">
      <div className="shell">
        <div className="flex flex-col justify-between gap-6 border-b border-line pb-8 lg:flex-row lg:items-end">
          <div>
            <SectionLabel index={undefined}>{inProcess.eyebrow}</SectionLabel>
            <h2 className="display-md mt-4 max-w-xl text-ink" data-reveal="letters">
              Moulded, printed and packed on one floor.
            </h2>
          </div>
          <p className="max-w-sm text-[14px] leading-relaxed text-mid" data-reveal>
            {inProcess.intro}
          </p>
        </div>

        {/* Injection moulding */}
        <div className="grid gap-6 py-10 lg:grid-cols-12 lg:gap-14" data-reveal>
          <div className="flex items-start gap-4 lg:col-span-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-ink text-white">
              <Boxes aria-hidden className="h-5 w-5" />
            </span>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-mid">
                Step 01
              </p>
              <h3 className="mt-1.5 font-display text-[20px] font-semibold text-ink">
                {inProcess.moulding.title}
              </h3>
            </div>
          </div>
          <p className="max-w-xl text-[14px] leading-relaxed text-mid lg:col-span-8 lg:pt-3">
            {inProcess.moulding.detail}
          </p>
        </div>

        {/* Printing */}
        <div className="border-t border-ink/15 pt-10" data-reveal>
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand text-white">
              <Printer aria-hidden className="h-5 w-5" />
            </span>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-mid">
                Step 02
              </p>
              <h3 className="mt-1.5 font-display text-[20px] font-semibold text-ink">
                {inProcess.printing.title}
              </h3>
              <p className="mt-2 max-w-xl text-[14px] leading-relaxed text-mid">
                {inProcess.printing.detail}
              </p>
            </div>
          </div>

          <ul className="mt-8 grid gap-px overflow-hidden rounded-[18px] bg-line sm:grid-cols-3">
            {inProcess.printing.routes.map((route, index) => (
              <li
                key={route.name}
                className="group flex flex-col bg-white p-6 transition-colors duration-500 hover:bg-white"
                data-reveal
                data-reveal-delay={String(index * 0.08)}
              >
                <span className="tabular text-[11px] font-semibold uppercase tracking-[0.16em] text-mid">
                  {route.code}
                </span>

                {/* Client mark — swap the file in /public/images/clients to change it */}
                <span className="mt-5 flex h-12 items-center">
                  <Image
                    src={route.logo}
                    alt={route.logoAlt}
                    width={176}
                    height={45}
                    className="h-8 w-auto opacity-80 transition-opacity duration-500 group-hover:opacity-100"
                  />
                </span>

                <span aria-hidden className="mt-6 h-px w-10 bg-brand" />

                <h4 className="mt-4 font-display text-[17px] font-semibold leading-snug text-ink">
                  {route.name}
                </h4>
                <p className="mt-2 text-[13px] leading-relaxed text-mid">{route.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Reveal>
  );
}
