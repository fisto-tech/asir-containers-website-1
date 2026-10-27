import { Play, Quote } from "lucide-react";

type Testimonial = {
  id: string;
  customer: string;
  designation?: string;
  company: string;
  quote?: string;
  videoSrc?: string;
  poster?: string;
};

type Props = {
  slotCount: number;
  testimonials: readonly Testimonial[] | null;
  onPlay: (index: number) => void;
};

/**
 * Testimonial video slots: one wide lead plate with the remaining slots
 * stacked beside it, so the block reads as a composition rather than a row of
 * identical cards. Captions are plain type underneath.
 */
export function TestimonialsGridPlaceholder({ slotCount, testimonials, onPlay }: Props) {
  const slots = Array.from({ length: slotCount }).map((_, index) => index);
  const [lead, ...rest] = slots;
  const leadTestimonial = testimonials?.[lead];

  return (
    <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-stretch lg:gap-10">
      <div className="lg:col-span-7">
        <Slot
          index={lead}
          testimonial={leadTestimonial}
          onPlay={onPlay}
          variant="lead"
        />
      </div>

      <div className="grid gap-8 lg:col-span-5 lg:content-stretch">
        {rest.map((index) => (
          <Slot
            key={index}
            index={index}
            testimonial={testimonials?.[index]}
            onPlay={onPlay}
            variant="stacked"
          />
        ))}
      </div>
    </div>
  );
}

function Slot({
  index,
  testimonial,
  onPlay,
  variant,
}: {
  index: number;
  testimonial: Testimonial | undefined;
  onPlay: (index: number) => void;
  variant: "lead" | "stacked";
}) {
  const isLead = variant === "lead";

  return (
    <article data-reveal className="flex h-full flex-col">
      <button
        type="button"
        onClick={() => onPlay(index)}
        className={`group relative block w-full grow overflow-hidden rounded-[22px] text-left ${
          isLead ? "bg-charcoal" : "bg-light"
        } ${
          isLead ? "aspect-16/11 lg:aspect-auto lg:min-h-[420px]" : "aspect-16/9 lg:aspect-auto lg:min-h-[180px]"
        }`}
        aria-label={
          testimonial
            ? `Play testimonial from ${testimonial.company}`
            : `Testimonial slot ${index + 1} — video not supplied yet`
        }
      >
        {testimonial?.poster ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={testimonial.poster}
            alt=""
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <>
            <span
              className={`absolute inset-0 ${
                isLead
                  ? "bg-[linear-gradient(140deg,#151515_0%,#242424_100%)]"
                  : "bg-[linear-gradient(140deg,#f1f1ef_0%,#e9e9e6_100%)]"
              }`}
            />
            <span
              aria-hidden
              className={`ambient-sheen absolute inset-0 ${
                isLead
                  ? "bg-[radial-gradient(120%_80%_at_30%_20%,#ffffff22_0%,transparent_60%)]"
                  : "bg-[radial-gradient(120%_80%_at_30%_20%,#ffffff99_0%,transparent_60%)]"
              }`}
            />
          </>
        )}

        <span className="absolute inset-0 flex flex-col justify-between p-6">
          {isLead ? (
            <span className="tabular text-[12px] text-white">
              {String(index + 1).padStart(2, "0")}
            </span>
          ) : (
            <span />
          )}

          <span className="flex items-center gap-4">
            <span
              className={`relative flex h-11 w-11 items-center justify-center rounded-full border transition-colors duration-500 group-hover:border-brand group-hover:bg-brand group-hover:text-white ${
                isLead ? "border-white/40 text-white" : "border-ink/30 text-ink"
              }`}
            >
              <span
                aria-hidden
                className={`ambient-ring absolute inset-0 rounded-full border ${
                  isLead ? "border-white/30" : "border-ink/20"
                }`}
              />
              <Play aria-hidden className="ml-0.5 h-4 w-4 fill-current" />
            </span>
            <span className={`text-[13px] ${isLead ? "text-white" : "text-ink"}`}>
              {testimonial?.videoSrc ? "Play testimonial" : "Awaiting footage"}
            </span>
          </span>
        </span>
      </button>

      <div className="pt-4">
        {testimonial?.quote ? (
          <blockquote className="text-[15px] leading-relaxed text-mid">
            <Quote aria-hidden className="mb-2 h-4 w-4 text-brand" />
            {testimonial.quote}
          </blockquote>
        ) : null}

        {testimonial ? (
          <>
            <p className="mt-3 font-display text-[16px] font-semibold text-ink">
              {testimonial.customer}
            </p>
            <p className="mt-0.5 text-[14px] text-mid">
              {[testimonial.designation, testimonial.company].filter(Boolean).join(", ")}
            </p>
          </>
        ) : (
          <p className="text-[14px] text-mid">
            Slot {String(index + 1).padStart(2, "0")} — customer name and company to be confirmed
          </p>
        )}
      </div>
    </article>
  );
}
