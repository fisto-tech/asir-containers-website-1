"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { navigation, site } from "@/data/site";
import { products } from "@/data/products";

// Product display configuration with medium font and consistent product codes
const navProductItems = [
  { slug: "500ml-paint-pail-p2", title: "500 ml", code: "P/2", img: "/images/products/nav/500ml-paint-pail-p2.png" },
  { slug: "1l-paint-pail-p1a", title: "1 Litre", code: "P1a", img: "/images/products/nav/1l-paint-pail-p1a.png" },
  { slug: "1l-paint-pail-p1b", title: "1 Litre", code: "P1b", img: "/images/products/nav/1l-paint-pail-p1b.png" },
  { slug: "4l-paint-pail-p4", title: "4 Litre", code: "P4", img: "/images/products/nav/4l-paint-pail-p4.png" },
  { slug: "10l-paint-pail-p10", title: "10 Litre", code: "P10p", img: "/images/products/nav/10l-paint-pail-p10.png" },
  { slug: "20l-paint-pail-p20a", title: "20 Litre", code: "P20ap", img: "/images/products/nav/20l-paint-pail-p20a.png" },
  { slug: "20l-paint-pail-p20b", title: "20 Litre", code: "P20bp", img: "/images/products/nav/20l-paint-pail-p20b.png" },
  { slug: "1kg-storage-pail-k1", title: "1 Kg", code: "K1", img: "/images/products/nav/1kg-storage-pail-k1.png" },
  { slug: "2kg-storage-pail-k2", title: "2 Kg", code: "K2", img: "/images/products/nav/2kg-storage-pail-k2.png" },
  { slug: "5kg-storage-pail-k5", title: "5 Kg", code: "K5", img: "/images/products/nav/5kg-storage-pail-k5.png" },
  { slug: "10kg-storage-pail-k10", title: "10 Kg", code: "K10p", img: "/images/products/nav/10kg-storage-pail-k10.png" },
  { slug: "20kg-storage-pail-k20", title: "20 Kg", code: "K20p", img: "/images/products/nav/20kg-storage-pail-k20.png" },
  { slug: "5l-round-pail-a5", title: "5 litre round", code: "A5", img: "/images/products/nav/5l-round-pail-a5.png" },
  { slug: "15l-square-interlock-pail-f15", title: "15 Litre Interlock", code: "F15p", img: "/images/products/nav/15l-square-pail-interlock-f15.png" },
  { slug: "17l-square-interlock-pail-f17i", title: "17 Litre square interlock", code: "F17ip", img: "/images/products/nav/17l-square-pail-interlock-f17a.png" },
  { slug: "17l-square-outer-lock-pail-f17o", title: "17 Litre square outer lock", code: "F17op", img: "/images/products/nav/17l-square-pail-outer-lock-f17b.png" },
  { slug: "5l-square-interlock-pail-f5", title: "5 litre square interlock", code: "F5p", img: "/images/products/nav/5l-square-pail-interlock-f5.png" },
];

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

  /* "/" now opens on an organic light studio hero → transparent header with ink type (same as /process and /technologies) */
  const overHero = false;
  const overLightHero =
    (pathname === "/" || pathname === "/process" || pathname === "/technologies") && !scrolled && !open;
  const onProductsPage = pathname.startsWith("/products");

  const isActive = (href: string) => {
    if (href.includes("#")) return mounted && pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const linkTone = overLightHero
    ? "text-slate-900 font-semibold hover:text-brand"
    : "text-slate-700 font-medium hover:text-ink";

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-brand focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Skip to content
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,height,box-shadow] duration-500 ${
          overLightHero
            ? "border-b border-transparent bg-transparent"
            : scrolled
              ? "border-b border-line/80 bg-white/95 backdrop-blur-md shadow-xs"
              : "border-b border-line bg-white"
        }`}
      >
        <div
          className={`shell flex items-center justify-between gap-6 transition-[height] duration-500 ${
            scrolled ? "h-[64px]" : "h-[74px]"
          }`}
        >
          <Logo tone="dark" />

          <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
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
                      className={`link-rule text-[14px] font-medium tracking-tight ${linkTone} ${
                        onProductsPage ? (overHero ? "text-white font-semibold" : "!text-ink font-semibold") : ""
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
                      className={`flex h-8 w-5 items-center justify-center transition-colors ${linkTone}`}
                    >
                      <ChevronDown
                        aria-hidden
                        className={`h-3.5 w-3.5 transition-transform duration-300 ${
                          productsOpen ? "rotate-180 text-brand" : ""
                        }`}
                      />
                    </button>
                  </div>

                  {/* Open panel — Custom Dropdown matching the UI design */}
                  <div
                    id="products-menu"
                    aria-hidden={!productsOpen}
                    className={`absolute -left-72 top-full w-[960px] rounded-3xl border border-line/60 bg-white p-6 shadow-[0_24px_50px_-12px_rgba(0,0,0,0.18)] transition-[opacity,transform,visibility] duration-300 ${
                      productsOpen ? "visible translate-y-2 opacity-100" : "invisible -translate-y-1 opacity-0"
                    }`}
                  >
                    {/* Header bar */}
                    <div className="flex items-center justify-between pb-4">
                      <div className="flex items-center gap-3">
                        <span className="font-display text-[17px] font-bold tracking-tight text-ink">
                          All Products <span className="font-semibold text-mid/80">(17)</span>
                        </span>
                        <span className="text-[13px] font-medium text-mid/70">
                          Explore our complete range of plastic containers
                        </span>
                      </div>
                      <Link
                        href="/products"
                        tabIndex={productsOpen ? 0 : -1}
                        onClick={() => setProductsOpen(false)}
                        className="group inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand transition-colors hover:text-brand/80"
                      >
                        <span>View product catalogue</span>
                        <ArrowUpRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </Link>
                    </div>

                    {/* 4-column balanced grid of 17 product cards */}
                    <div className="grid grid-cols-4 gap-3">
                      {navProductItems.map((item) => (
                        <Link
                          key={item.slug}
                          href={`/products/${item.slug}`}
                          tabIndex={productsOpen ? 0 : -1}
                          onClick={() => setProductsOpen(false)}
                          className="group relative flex h-[58px] items-center gap-3 rounded-xl border border-line/50 bg-white px-3 transition-all duration-200 hover:border-brand/40 hover:shadow-sm"
                        >
                          <div className="relative flex h-10 w-12 shrink-0 items-center justify-center">
                            <Image
                              src={item.img}
                              alt={item.title}
                              width={48}
                              height={38}
                              className="max-h-9 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
                            />
                          </div>

                          <span className="font-display text-[13px] font-medium leading-snug text-ink transition-colors group-hover:text-brand">
                            {item.title} <span className="font-normal text-mid/80 group-hover:text-brand/90">({item.code})</span>
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  data-active={isActive(item.href)}
                  className={`link-rule text-[14px] font-medium tracking-tight ${linkTone} ${
                    isActive(item.href) ? "!text-brand font-bold" : ""
                  }`}
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <div className="hidden items-center gap-6 lg:flex">
            <a
              href="https://www.example.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={`link-rule group inline-flex items-center gap-1.5 text-[14px] font-medium tracking-tight ${linkTone}`}
            >
              Catalogue
              <ArrowUpRight
                aria-hidden
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 text-brand"
              />
            </a>
            <Button
              href="/contact"
              variant="primary"
              size="sm"
              withArrow
              className="rounded-[4px] px-5 font-semibold shadow-xs hover:shadow-md transition-all duration-200"
            >
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
                  productsOpen ? "mt-4 max-h-[380px] overflow-y-auto pr-1 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                {products.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/products/${item.slug}`}
                    tabIndex={open && productsOpen ? 0 : -1}
                    onClick={() => {
                      setOpen(false);
                      setProductsOpen(false);
                    }}
                    className="flex items-center justify-between border-t border-white/15 py-2.5 text-[14px] text-white/85 transition-colors hover:text-white"
                  >
                    <span className="truncate pr-2 text-[15.5px] font-semibold text-white/90">
                      {item.name}{" "}
                      <span className="font-mono text-[13px] font-medium text-white/60">
                        ({item.codes.plain})
                      </span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <Link href="/process" tabIndex={open ? 0 : -1} className="flex items-baseline justify-between border-b border-white/15 py-5">
              <span className="display-md text-white">Process</span>
              <span className="tabular text-[11px] font-semibold text-white/85">03</span>
            </Link>

            <Link href="/technologies" tabIndex={open ? 0 : -1} className="flex items-baseline justify-between border-b border-white/15 py-5">
              <span className="display-md text-white">Technologies</span>
              <span className="tabular text-[11px] font-semibold text-white/85">04</span>
            </Link>

            <Link href="/contact" tabIndex={open ? 0 : -1} className="flex items-baseline justify-between border-b border-white/15 py-5">
              <span className="display-md text-white">Contact</span>
              <span className="tabular text-[11px] font-semibold text-white">05</span>
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
