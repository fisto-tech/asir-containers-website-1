"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { VideoModal } from "@/components/ui/VideoModal";

type VideoItem = {
  id: string;
  title: string;
  tag: string;
  videoSrc: string;
  poster: string;
  duration: string;
};

const videos: VideoItem[] = [
  {
    id: "asian-paints",
    title: "Apex Chemical & Paints Ltd",
    tag: "Paint & Coatings",
    videoSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    poster: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
    duration: "1:42",
  },
  {
    id: "agro-solutions",
    title: "GreenHarvest Agro Chemicals",
    tag: "Agrochemicals",
    videoSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    poster: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=800&q=80",
    duration: "1:15",
  },
  {
    id: "lube-india",
    title: "Vortex Lubricants & Greases",
    tag: "Lubes & Grease",
    videoSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    poster: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
    duration: "1:28",
  },
];

export function TestimonialsSection() {
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  return (
    <section className="relative bg-white py-16 lg:py-24">
      <div className="shell relative z-10">
        {/* Clean, Minimal Header */}
        <Reveal>
          <div className="mb-10 flex flex-col justify-between gap-4 border-b border-slate-100 pb-6 sm:flex-row sm:items-end">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                <span className="h-[1px] w-6 bg-slate-300" />
                <span className="font-mono font-bold text-brand">08</span>
                <span className="text-slate-800">TESTIMONIALS</span>
              </div>
              <h2 className="mt-2.5 font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                Straight from the buyers.
              </h2>
            </div>
            <p className="text-xs font-medium uppercase tracking-wider text-slate-400 sm:text-right">
              Verified Client Footage
            </p>
          </div>
        </Reveal>

        {/* 3 Pure Video Cards Grid — Larger, Cinematic Cards */}
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {videos.map((item) => (
            <Reveal key={item.id}>
              <div
                onClick={() => setActiveVideo(item)}
                className="group relative cursor-pointer overflow-hidden rounded-[30px] border border-slate-200/90 bg-slate-950 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-slate-300"
              >
                {/* Larger Cinematic Video Thumbnail Container */}
                <div className="relative aspect-[16/11] min-h-[300px] w-full overflow-hidden sm:min-h-[340px]">
                  <Image
                    src={item.poster}
                    alt={item.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 460px"
                    className="object-cover object-center brightness-75 transition-transform duration-700 group-hover:scale-105 group-hover:brightness-90"
                  />
                  {/* Subtle dark vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute left-5 top-5 right-5 flex items-center justify-between">
                    <span className="rounded-full bg-black/60 px-3.5 py-1.5 font-mono text-xs font-bold uppercase tracking-wider text-white backdrop-blur-md">
                      {item.tag}
                    </span>
                    <span className="rounded-full bg-black/60 px-3 py-1.5 font-mono text-xs font-bold text-slate-200 backdrop-blur-md">
                      {item.duration}
                    </span>
                  </div>

                  {/* Center Bold Larger Play Icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-brand text-white shadow-2xl transition-all duration-300 group-hover:scale-115 group-hover:bg-brand-dark group-hover:shadow-brand/50 sm:h-22 sm:w-22">
                      <span className="absolute inset-0 rounded-full bg-brand/40 animate-ping opacity-60 group-hover:opacity-100" />
                      <Play className="ml-1 h-9 w-9 fill-current sm:h-10 sm:w-10" />
                    </div>
                  </div>

                  {/* Bottom Minimal Title */}
                  <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
                    <h3 className="font-display text-base font-bold text-white drop-shadow-sm sm:text-lg">
                      {item.title}
                    </h3>
                    <span className="text-xs font-semibold text-slate-300 opacity-0 transition-opacity group-hover:opacity-100">
                      Play Video →
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Video Modal Player */}
      <VideoModal
        open={activeVideo !== null}
        onClose={() => setActiveVideo(null)}
        title={activeVideo ? `${activeVideo.title} — Customer Video` : "Customer Testimonial"}
        videoSrc={activeVideo?.videoSrc}
        poster={activeVideo?.poster}
      />
    </section>
  );
}
