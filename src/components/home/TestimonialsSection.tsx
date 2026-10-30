"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { TestimonialsGridPlaceholder } from "./TestimonialsGrid";
import { VideoModal } from "@/components/ui/VideoModal";
import { Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { site } from "@/data/site";

/**
 * Video testimonials.
 * Real customer footage has not been supplied, so the section renders reserved
 * slots (never invented quotes, names or companies). Supply `site.testimonials`
 * and the same layout plays the actual videos.
 */
export function TestimonialsSection() {
  const testimonials = site.testimonials;
  const [activeSlot, setActiveSlot] = useState<number | null>(null);
  const slots = testimonials.length > 0 ? testimonials : null;
  const slotCount = slots ? slots.length : site.testimonialSlots;
  const active = activeSlot !== null ? slots?.[activeSlot] : undefined;

  return (
    <section className="relative bg-white py-20 lg:py-28">
      <Reveal className="shell">
        <div className="flex flex-col justify-between gap-6 border-b border-line pb-8 lg:flex-row lg:items-end">
          <div>
            <div data-reveal>
              <SectionLabel index="08">Testimonials</SectionLabel>
            </div>
            <h2 className="display-lg sheen-ink mt-5 text-ink" data-reveal="letters">
              Straight from
              <br />
              the buyers.
            </h2>
          </div>
          <p className="max-w-sm text-[14px] leading-relaxed text-mid" data-reveal>
            {slots
              ? "Customers talking about the containers they fill, in their own words."
              : "Slots reserved. Footage publishes once the customer approves it — nothing here is written by us."}
          </p>
        </div>

        <TestimonialsGridPlaceholder
          slotCount={slotCount}
          testimonials={slots}
          onPlay={setActiveSlot}
        />

      </Reveal>

      <VideoModal
        open={activeSlot !== null}
        onClose={() => setActiveSlot(null)}
        title={active ? `${active.company} — customer testimonial` : "Customer testimonial"}
        videoSrc={active?.videoSrc}
        poster={active?.poster}
        fallback={
          <div>
            <p className="font-display text-lg font-semibold text-white">
              This testimonial slot is reserved
            </p>
            <p className="mt-3 text-sm leading-relaxed text-white/85">
              Footage has not been supplied yet. The player is built and will run the video as
              soon as it is added.
            </p>
            <p className="mt-4 inline-flex items-center gap-2 text-[13px] font-medium text-brand">
              <Play className="h-3 w-3" /> Awaiting client video
            </p>
          </div>
        }
      />
    </section>
  );
}
