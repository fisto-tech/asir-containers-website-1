import { Counter } from "@/components/ui/Counter";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";
import { counters } from "@/data/home";

const notes = ["Across four applications", "Plain + Tin/Sp.", "Paint · Agro · Food · Lube", "Retail to bulk"];

/**
 * Range counters, set as type on white with hairline rules — no tiles,
 * no icon frames.
 */
export function CountersBand() {
  return (
    <section className="bg-white py-16 lg:py-20">
      <Reveal className="shell">
        <div className="flex flex-col justify-between gap-6 border-b border-line pb-10 lg:flex-row lg:items-end">
          <div>
            <SectionLabel index="02" reveal>
              The range in numbers
            </SectionLabel>
            <h2 className="display-md sheen-ink mt-4 max-w-lg text-ink" data-reveal="letters">
              Every container counted.
            </h2>
          </div>
          <p className="max-w-xs text-[13px] leading-relaxed text-mid" data-reveal>
            Read from the product table — updated whenever a container is added.
          </p>
        </div>

        <dl className="grid grid-cols-2 gap-x-8 gap-y-10 pt-10 lg:grid-cols-4">
          {counters.map((item, index) => (
            <div key={item.label} data-reveal data-reveal-delay={String(index * 0.07)}>
              <dd className="font-display text-[clamp(2.8rem,5vw,4rem)] font-semibold leading-none text-brand">
                <Counter value={item.value} suffix={item.suffix ?? ""} loop />
              </dd>
              <dt className="mt-3 text-[14px] font-medium text-ink">{item.label}</dt>
              <p className="mt-1 text-[12px] leading-snug text-mid">{notes[index] ?? item.detail}</p>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}
