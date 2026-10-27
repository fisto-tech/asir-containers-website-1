import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] items-center bg-soft pt-24">
      <div className="shell">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ink">
          <span className="tabular mr-3 text-brand">404</span>
          Not in the range
        </p>
        <h1 className="display-lg mt-6 max-w-xl text-ink">
          This container
          <br />
          isn’t in the range.
        </h1>
        <p className="mt-5 max-w-md text-[15px] leading-relaxed text-mid">
          The page you were looking for has moved or never existed. The full range is one
          click away.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link
            href="/products"
            className="inline-flex h-12 items-center gap-2 bg-brand px-5 text-sm font-medium text-white transition-colors hover:bg-brand-dark"
          >
            See all containers
          </Link>
          <Link
            href="/"
            className="inline-flex h-12 items-center gap-2 border border-ink px-5 text-sm font-medium text-ink transition-colors hover:bg-ink hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back home
          </Link>
        </div>
      </div>
    </section>
  );
}
