import { Play, Quote, Video } from "lucide-react";

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
 * Testimonial video slots with modern colored stage lighting, glowing play controls,
 * and elevated customer feedback layout.
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
        className={`group relative block w-full grow overflow-hidden rounded-[26px] text-left transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 ${
          isLead
            ? "border border-indigo-900/60 bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 shadow-xl"
            : "border border-slate-200/90 bg-gradient-to-br from-slate-50 via-white to-sky-50/40 shadow-sm hover:border-sky-300"
        } ${
          isLead ? "aspect-16/11 lg:aspect-auto lg:min-h-[420px]" : "aspect-16/9 lg:aspect-auto lg:min-h-[190px]"
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
            {/* Colorful atmospheric lighting */}
            <span
              className={`absolute inset-0 ${
                isLead
                  ? "bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.25)_0%,transparent_60%)]"
                  : "bg-[radial-gradient(ellipse_at_top_right,rgba(14,165,233,0.15)_0%,transparent_60%)]"
              }`}
            />
            <span
              aria-hidden
              className={`absolute inset-0 ${
                isLead
                  ? "bg-[radial-gradient(ellipse_at_bottom_left,rgba(225,29,72,0.18)_0%,transparent_50%)]"
                  : "bg-[radial-gradient(ellipse_at_bottom_left,rgba(99,102,241,0.08)_0%,transparent_50%)]"
              }`}
            />
          </>
        )}

        <span className="absolute inset-0 flex flex-col justify-between p-7">
          <div className="flex items-center justify-between">
            <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[11px] font-bold tracking-wider uppercase ${
              isLead
                ? "border border-white/20 bg-white/10 text-white backdrop-blur-sm"
                : "border border-slate-200 bg-white/80 text-slate-700 shadow-2xs backdrop-blur-sm"
            }`}>
              <Video className="h-3 w-3 text-brand" />
              Slot 0{index + 1}
            </span>
            <span className={`text-[12px] font-semibold tabular ${isLead ? "text-indigo-200" : "text-slate-400"}`}>
              {testimonial ? "Verified Story" : "Reserved Slot"}
            </span>
          </div>

          <span className="flex items-center gap-4">
            <span
              className={`relative flex h-13 w-13 items-center justify-center rounded-2xl shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:shadow-brand/40 ${
                isLead
                  ? "bg-gradient-to-br from-brand to-rose-600 text-white shadow-brand/25"
                  : "bg-gradient-to-br from-slate-900 to-indigo-950 text-white group-hover:from-brand group-hover:to-rose-600 shadow-slate-900/20"
              }`}
            >
              <Play aria-hidden className="ml-0.5 h-5 w-5 fill-current" />
            </span>
            <div className="flex flex-col">
              <span className={`text-[14.5px] font-semibold ${isLead ? "text-white" : "text-slate-900"}`}>
                {testimonial?.videoSrc ? "Watch customer story" : "Customer video testimonial"}
              </span>
              <span className={`text-[12.5px] ${isLead ? "text-indigo-200" : "text-slate-500"}`}>
                {testimonial ? `${testimonial.company}` : "Click to view playback modal preview"}
              </span>
            </div>
          </span>
        </span>
      </button>

      <div className="pt-4">
        {testimonial?.quote ? (
          <blockquote className="text-[15px] leading-relaxed text-slate-700">
            <Quote aria-hidden className="mb-2 h-4 w-4 text-brand" />
            {testimonial.quote}
          </blockquote>
        ) : null}

        {testimonial ? (
          <>
            <p className="mt-3 font-display text-[16px] font-semibold text-ink">
              {testimonial.customer}
            </p>
            <p className="mt-0.5 text-[14px] text-slate-500">
              {[testimonial.designation, testimonial.company].filter(Boolean).join(", ")}
            </p>
          </>
        ) : (
          <div className="flex items-center justify-between text-[13px] text-slate-500">
            <span>Video footage scheduled for release</span>
            <span className="font-mono text-xs font-semibold text-brand">4K · 1080p Player Ready</span>
          </div>
        )}
      </div>
    </article>
  );
}
