import Image from "next/image";
import Link from "next/link";
import { type Application } from "@/data/products";

type ProductApplicationsShowcaseProps = {
  applications: Application[];
  productName: string;
};

export function ProductApplicationsShowcase({
  applications,
}: ProductApplicationsShowcaseProps) {
  if (!applications.length) return null;

  const isSingle = applications.length === 1;

  return (
    <section className="border-t border-line/60 bg-[#FAF7F2] py-14 lg:py-20">
      <div className="shell">
        <div
          className={`grid items-center gap-10 lg:gap-14 ${
            isSingle
              ? "max-w-5xl mx-auto lg:grid-cols-12"
              : "lg:grid-cols-12"
          }`}
        >
          {/* Left Column: Heading and prominent description */}
          <div className={isSingle ? "lg:col-span-5" : "lg:col-span-4"}>
            <h2 className="font-display text-[2.4rem] font-bold tracking-tight text-ink sm:text-[2.85rem] lg:text-[3rem] leading-[1.08]">
              Where this <br className="hidden sm:inline" />
              container is used<span className="text-brand">.</span>
            </h2>

            <p className="mt-4 text-[15px] sm:text-[15.5px] leading-relaxed text-slate-600">
              {isSingle
                ? `Specifically engineered and tested for demanding ${applications[0].name.toLowerCase()} industrial duty cycles and automated filling lines.`
                : "Engineered and tested for demanding industrial duty cycles across primary packaging categories."}
            </p>

            {/* Red accent line indicator */}
            <div className="mt-6 h-[2.5px] w-12 bg-brand" />
          </div>

          {/* Right Column: Applications Image Cards */}
          <div className={isSingle ? "lg:col-span-7" : "lg:col-span-8"}>
            <div
              className={`grid gap-5 sm:gap-6 ${
                isSingle
                  ? "grid-cols-1 w-full"
                  : applications.length === 2
                  ? "grid-cols-1 sm:grid-cols-2"
                  : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              }`}
            >
              {applications.map((app) => (
                <Link
                  key={app.slug}
                  href={`/products?application=${app.slug}`}
                  className={`group relative w-full overflow-hidden rounded-[26px] bg-slate-900 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                    isSingle ? "aspect-[16/10.2]" : "aspect-[16/11.2]"
                  }`}
                >
                  <Image
                    src={app.image}
                    alt={app.imageAlt}
                    fill
                    sizes={isSingle ? "(max-width: 1024px) 100vw, 720px" : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* High quality vignette overlay */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/15 to-transparent transition-opacity duration-300 group-hover:from-slate-950/90" />

                  {/* Bottom Bar: Style C - Floating transparent minimal typographic label in bold white text */}
                  <div className="absolute bottom-4 left-5 right-5 z-10 flex items-center justify-between">
                    <span className="font-display text-[20px] sm:text-[22px] font-bold tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] transition-colors duration-300 group-hover:text-brand-light">
                      {app.name}
                    </span>

                    <span className="text-white/80 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2.4"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
