"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { AnimatedIcon, applicationIcons, type IconMotion } from "@/components/ui/AnimatedIcon";
import { navigation, site } from "@/data/site";
import { applications, applicationCount, rangeStats } from "@/data/products";

const applicationMotion: Record<string, IconMotion> = {
  paint: "swing",
  agro: "float",
  food: "pulse",
  lube: "float",
};

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const closeTimer = useRef<number | null>(null);
  const productsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setProductsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    if (!productsOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!productsRef.current?.contains(event.target as Node)) setProductsOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setProductsOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [productsOpen]);

  const hoverOpen = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setProductsOpen(true);
  };

  const hoverClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setProductsOpen(false), 200);
  };

  const overHero = pathname === "/" && !scrolled && !open;
  const onProductsPage = pathname.startsWith("/products");

  const isActive = (href: string) => {
    if (href.includes("#")) return mounted && pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const linkTone = overHero
    ? "text-white/85 hover:text-white"
    : "text-mid hover:text-ink";

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-brand focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Skip to content
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,height] duration-500 ${
          overHero ? "border-b border-white/15 bg-transparent" : "border-b border-line bg-white"
        }`}
      >
        <div
          className={`shell flex items-center justify-between gap-6 transition-[height] duration-500 ${
            scrolled ? "h-[66px]" : "h-[78px]"
          }`}
        >
          <Logo tone={overHero ? "light" : "dark"} />

          <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
            {navigation.map((item) =>
              item.hasMenu ? (
                <div
                  key={item.href}
                  ref={productsRef}
                  className="relative"
                  onMouseEnter={hoverOpen}
                  onMouseLeave={hoverClose}
                >
                  <div className="flex items-center gap-1">
                    <Link
                      href={item.href}
                      className={`link-rule text-[13px] font-medium ${linkTone} ${
                        onProductsPage ? (overHero ? "text-white" : "text-ink") : ""
                      }`}
                      data-active={onProductsPage}
                    >
                      {item.label}
                    </Link>
                    <button
                      type="button"
                      aria-expanded={productsOpen}
                      aria-controls="products-menu"
                      aria-label={productsOpen ? "Close products menu" : "Open products menu"}
                      onClick={() => setProductsOpen((value) => !value)}
                      className={`flex h-8 w-5 items-center justify-center ${linkTone}`}
                    >
                      <ChevronDown
                        aria-hidden
                        className={`h-3.5 w-3.5 transition-transform duration-300 ${
                          productsOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </div>

                  {/* Open panel — no boxes, no pills: hairline rules and type only */}
                  <div
                    id="products-menu"
                    aria-hidden={!productsOpen}
                    className={`absolute -left-8 top-full w-[480px] bg-white pb-4 pt-2 shadow-[0_24px_50px_-20px_rgba(17,17,17,0.35)] transition-[opacity,transform,visibility] duration-300 ${
                      productsOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"
                    }`}
                  >
                    <p className="px-8 py-3 text-[13px] text-mid">
                      Browse by application
                    </p>

                    <ul className="px-8">
                      {applications.map((application) => (
                        <li key={application.slug}>
                          <Link
                            href={`/products?application=${application.slug}`}
                            tabIndex={productsOpen ? 0 : -1}
                            className="group flex items-baseline justify-between gap-6 border-t border-line py-3.5"
                          >
                            <span className="flex items-baseline gap-3">
                              <AnimatedIcon
                                name={applicationIcons[application.slug]}
                                motion={applicationMotion[application.slug]}
                                className="h-5 w-5 shrink-0 translate-y-0.5 text-brand"
                              />
                              <span className="text-[15px] font-medium text-ink transition-colors group-hover:text-brand">
                                {application.name}
                              </span>
                            </span>
                            <span className="flex items-baseline gap-3 text-[12px] text-mid">
                              <span className="tabular text-[12px] font-semibold text-brand">
                                {String(applicationCount(application.slug)).padStart(2, "0")}
                              </span>
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-3 flex items-center justify-between px-8 text-[12px]">
                      <Link
                        href="/products"
                        tabIndex={productsOpen ? 0 : -1}
                        className="group inline-flex items-center gap-2 font-medium text-ink"
                      >
                        All {rangeStats.products} containers
                        <AnimatedIcon name="arrow" motion="travel" className="h-4 w-4 text-brand" />
                      </Link>
                      <Link
                        href="/contact"
                        tabIndex={productsOpen ? 0 : -1}
                        className="text-mid underline decoration-line underline-offset-4 hover:text-ink"
                      >
                        Ask about a code
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  data-active={isActive(item.href)}
                  className={`link-rule text-[13px] font-medium ${linkTone}`}
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <div className="hidden items-center gap-7 lg:flex">
            <a
              href="https://www.example.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={`link-rule group inline-flex items-center gap-1.5 text-[13px] font-medium ${linkTone}`}
            >
              Catalogue
              <ArrowUpRight
                aria-hidden
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
            <Button href="/contact" variant="primary" size="sm" withArrow>
              Enquire now
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className={`inline-flex h-10 w-10 items-center justify-center lg:hidden ${
              overHero ? "text-white" : "text-ink"
            }`}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        id="mobile-menu"
        aria-hidden={!open}
        data-lenis-prevent
        className={`fixed inset-0 z-40 overflow-y-auto bg-charcoal transition-[opacity,visibility] duration-500 lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="shell flex min-h-full flex-col justify-between gap-12 pb-10 pt-28">
          <nav aria-label="Mobile">
            <Link href="/" tabIndex={open ? 0 : -1} className="flex items-baseline justify-between border-b border-white/15 py-5">
              <span className="display-md text-white">Home</span>
              <span className="tabular text-[11px] font-semibold text-white/85">01</span>
            </Link>

            <div className="border-b border-white/15 py-5">
              <div className="flex items-center justify-between">
                <Link href="/products" tabIndex={open ? 0 : -1} className="display-md text-white">
                  Products
                </Link>
                <button
                  type="button"
                  onClick={() => setProductsOpen((value) => !value)}
                  aria-expanded={productsOpen}
                  aria-label={productsOpen ? "Hide applications" : "Show applications"}
                  tabIndex={open ? 0 : -1}
                  className="flex h-9 w-9 items-center justify-center text-white/85"
                >
                  <ChevronDown
                    aria-hidden
                    className={`h-5 w-5 transition-transform duration-300 ${productsOpen ? "rotate-180" : ""}`}
                  />
                </button>
              </div>

              <div
                className={`grid overflow-hidden transition-[max-height,opacity] duration-500 ${
                  productsOpen ? "mt-4 max-h-80 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                {applications.map((application) => (
                  <Link
                    key={application.slug}
                    href={`/products?application=${application.slug}`}
                    tabIndex={open && productsOpen ? 0 : -1}
                    className="flex items-center justify-between border-t border-white/15 py-3 text-[15px] text-white/85"
                  >
                    <span className="flex items-center gap-3">
                      <AnimatedIcon
                        name={applicationIcons[application.slug]}
                        motion={applicationMotion[application.slug]}
                        className="h-5 w-5 text-brand"
                      />
                      {application.name}
                    </span>
                    <span className="tabular text-[11px] text-white/85">
                      {String(applicationCount(application.slug)).padStart(2, "0")}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <Link href="/contact" tabIndex={open ? 0 : -1} className="flex items-baseline justify-between border-b border-white/15 py-5">
              <span className="display-md text-white">Contact</span>
              <span className="tabular text-[11px] font-semibold text-white">03</span>
            </Link>

            <a
              href="https://www.example.com/"
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={open ? 0 : -1}
              className="flex items-baseline justify-between border-b border-white/15 py-5"
            >
              <span className="display-md text-white">Catalogue</span>
              <ArrowUpRight aria-hidden className="h-5 w-5 text-brand" />
            </a>
          </nav>

          <div className="space-y-5">
            <Button href="/contact" variant="primary" size="lg" className="w-full" withArrow>
              Send an enquiry
            </Button>
            <p className="text-[12px] text-white/85">{site.contact.phone ?? "Phone to be supplied"}</p>
          </div>
        </div>
      </div>
    </>
  );
}
