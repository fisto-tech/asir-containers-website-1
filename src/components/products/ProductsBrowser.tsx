"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Filter, RotateCcw, Search, SlidersHorizontal, X } from "lucide-react";
import { ProductCard } from "@/components/products/ProductCard";
import { AnimatedIcon, applicationIcons } from "@/components/ui/AnimatedIcon";
import { PageMasthead } from "@/components/ui/PageMasthead";
import { Reveal } from "@/components/motion/Reveal";
import { gsap, ScrollTrigger, useGSAP, reduceMotion } from "@/lib/animations";
import {
  applications,
  codesFor,
  filterOptions,
  lidsFor,
  products,
  type ApplicationSlug,
  type LidType,
  type LockType,
  type Product,
  type ProductTypeSlug,
} from "@/data/products";

type FilterKey = "applications" | "types" | "names" | "lids" | "locks";

type Filters = {
  applications: ApplicationSlug[];
  types: ProductTypeSlug[];
  names: string[];
  lids: LidType[];
  locks: LockType[];
  query: string;
};

const EMPTY_FILTERS: Filters = {
  applications: [],
  types: [],
  names: [],
  lids: [],
  locks: [],
  query: "",
};

const readList = <T extends string>(params: URLSearchParams, key: string, allowed: readonly T[]): T[] =>
  (params.get(key) ?? "")
    .split(",")
    .map((value) => value.trim())
    .filter((value): value is T => (allowed as readonly string[]).includes(value));

/** Read filter state from the URL. Also accepts the legacy `category` param. */
const parseFilters = (search: string): Filters => {
  const params = new URLSearchParams(search);
  const allowedApplications = applications.map((application) => application.slug);
  const legacy = params.get("category");
  const fromLegacy =
    legacy && (allowedApplications as string[]).includes(legacy) ? [legacy as ApplicationSlug] : [];

  return {
    applications: readList(params, "application", allowedApplications).length
      ? readList(params, "application", allowedApplications)
      : fromLegacy,
    types: readList(params, "type", filterOptions.types.map((option) => option.value)),
    names: readList(
      params,
      "name",
      filterOptions.names.map((option) => option.value),
    ),
    lids: readList(params, "lid", filterOptions.lids.map((option) => option.value)),
    locks: readList(params, "lock", filterOptions.locks.map((option) => option.value)),
    query: params.get("q") ?? "",
  };
};

const toQueryString = (filters: Filters) => {
  const params = new URLSearchParams();
  if (filters.applications.length) params.set("application", filters.applications.join(","));
  if (filters.types.length) params.set("type", filters.types.join(","));
  if (filters.names.length) params.set("name", filters.names.join(","));
  if (filters.lids.length) params.set("lid", filters.lids.join(","));
  if (filters.locks.length) params.set("lock", filters.locks.join(","));
  if (filters.query.trim()) params.set("q", filters.query.trim());
  const query = params.toString();
  return query ? `?${query}` : "";
};

/** Matches the search box against container names and product codes. */
const matchesQuery = (product: Product, query: string) => {
  const needle = query.trim().toLowerCase();
  if (!needle) return true;
  const haystack = [product.name, product.capacity.value + product.capacity.unit, ...codesFor(product)]
    .join(" ")
    .toLowerCase();
  return haystack.includes(needle);
};

const matchesFilters = (product: Product, filters: Filters) => {
  if (
    filters.applications.length &&
    !filters.applications.some((application) => product.applications.includes(application))
  ) {
    return false;
  }
  if (filters.types.length && !filters.types.includes(product.type)) return false;
  if (filters.names.length && !filters.names.includes(product.name)) return false;
  if (filters.lids.length && !filters.lids.some((lid) => lidsFor(product).includes(lid))) return false;
  if (filters.locks.length && !filters.locks.some((lock) => product.locks.includes(lock))) return false;
  return matchesQuery(product, filters.query);
};

const activeCount = (filters: Filters) =>
  filters.applications.length +
  filters.types.length +
  filters.names.length +
  filters.lids.length +
  filters.locks.length +
  (filters.query.trim() ? 1 : 0);

/* -------------------------------------------------------------------------- */

export function ProductsBrowser() {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<Filters>(() => parseFilters(searchParams.toString()));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const gridRef = useRef<HTMLDivElement | null>(null);

  const searchString = searchParams.toString();

  // Sync internal filter state whenever the URL search params change (e.g. clicking nav/footer links)
  useEffect(() => {
    setFilters(parseFilters(searchString));
    setHydrated(true);
  }, [searchString]);

  // Sync state back to the URL when user interacts with internal filter controls
  useEffect(() => {
    if (!hydrated) return;
    const query = toQueryString(filters);
    const currentQuery = window.location.search;
    if (currentQuery !== query) {
      window.history.replaceState(null, "", `${window.location.pathname}${query}`);
    }
  }, [filters, hydrated]);

  useEffect(() => {
    if (!drawerOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setDrawerOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [drawerOpen]);

  const results = useMemo(() => products.filter((product) => matchesFilters(product, filters)), [filters]);
  const resultKey = results.map((product) => product.slug).join("|");

  /* Filtering changes the page height, which leaves ScrollTrigger and the
     sticky filter rail measuring against a stale layout. Re-measure after each
     result set settles so nothing jumps. */
  useEffect(() => {
    if (!hydrated) return;
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 220);
    return () => window.clearTimeout(id);
  }, [resultKey, hydrated]);

  useGSAP(
    () => {
      const cards = gridRef.current?.querySelectorAll("[data-card]");
      if (!cards?.length || reduceMotion()) return;
      gsap.fromTo(
        cards,
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.65, stagger: 0.05, ease: "power2.out", overwrite: true },
      );
    },
    { scope: gridRef, dependencies: [resultKey] },
  );

  const toggle = (key: FilterKey, value: string) => {
    setFilters((current) => {
      const values = current[key] as string[];
      const next = values.includes(value)
        ? values.filter((item) => item !== value)
        : [...values, value];
      return { ...current, [key]: next } as Filters;
    });
  };

  const toggleApplication = (slug: ApplicationSlug) => {
    setFilters((current) => ({
      ...current,
      applications: current.applications.includes(slug)
        ? current.applications.filter((item) => item !== slug)
        : [...current.applications, slug],
    }));
  };

  const clearAll = useCallback(() => setFilters(EMPTY_FILTERS), []);
  const total = activeCount(filters);

  const consolidated = [
    ...filters.applications.map((value) => ({
      key: `application-${value}`,
      label: applications.find((application) => application.slug === value)?.name ?? value,
      remove: () => toggleApplication(value),
    })),
    ...filters.types.map((value) => ({
      key: `type-${value}`,
      label: filterOptions.types.find((option) => option.value === value)?.label ?? value,
      remove: () => toggle("types", value),
    })),
    ...filters.names.map((value) => ({
      key: `name-${value}`,
      label: value,
      remove: () => toggle("names", value),
    })),
    ...filters.lids.map((value) => ({
      key: `lid-${value}`,
      label: value,
      remove: () => toggle("lids", value),
    })),
    ...filters.locks.map((value) => ({
      key: `lock-${value}`,
      label: value,
      remove: () => toggle("locks", value),
    })),
    ...(filters.query.trim()
      ? [
          {
            key: "query",
            label: `“${filters.query.trim()}”`,
            remove: () => setFilters((current) => ({ ...current, query: "" })),
          },
        ]
      : []),
  ];

  return (
    <div className="bg-white pb-24">
      {/* Product Range Page Masthead with Search Input on Right */}
      <Reveal>
        <PageMasthead
          compact
          title="Product Range"
          rightElement={
            <div className="w-full max-w-md sm:ml-auto">
              <label htmlFor="code-search" className="sr-only">
                Search by product code or container name
              </label>
              <div className="group/search relative flex items-center rounded-xl border border-line bg-white px-3.5 shadow-sm transition-all focus-within:border-brand focus-within:shadow-md focus-within:ring-2 focus-within:ring-brand/10">
                <Search
                  aria-hidden
                  className="pointer-events-none h-4 w-4 shrink-0 text-mid transition-colors group-focus-within/search:text-brand"
                />
                <input
                  id="code-search"
                  type="search"
                  value={filters.query}
                  onChange={(event) =>
                    setFilters((current) => ({ ...current, query: event.target.value }))
                  }
                  placeholder="Search by product code — e.g. P20ap, F17is, K20t"
                  className="h-11 w-full bg-transparent px-3 text-[14px] text-ink placeholder:text-mid/70 !outline-none !ring-0 focus:outline-none focus:ring-0"
                />
                {filters.query && (
                  <button
                    type="button"
                    onClick={() => setFilters((current) => ({ ...current, query: "" }))}
                    aria-label="Clear search"
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-mid/80 transition-colors hover:bg-line/60 hover:text-ink focus:outline-none"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>
          }
        />
      </Reveal>

      <div className="shell">
        <div className="grid gap-10 pt-10 lg:grid-cols-12 lg:gap-10 xl:gap-14">
          {/* Desktop filter rail */}
          <aside className="hidden lg:col-span-4 lg:block xl:col-span-3">
            <div
              data-lenis-prevent
              className="sticky top-24 max-h-[calc(100vh-8rem)] space-y-7 overflow-y-auto overscroll-contain border-r border-line/60 pb-8 pr-6 [scrollbar-width:thin]"
            >
              <div className="flex items-center justify-between border-b border-ink/15 pb-4">
                <h2 className="inline-flex items-center gap-2.5 text-[18px] font-bold text-ink">
                  <Filter className="h-5 w-5 text-brand" />
                  Filter
                </h2>
                {total > 0 && (
                  <button
                    type="button"
                    onClick={clearAll}
                    className="inline-flex items-center gap-1.5 text-[13px] font-medium text-mid transition-colors hover:text-ink"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    Clear all
                  </button>
                )}
              </div>

              <FilterPanel
                filters={filters}
                toggle={toggle}
                toggleApplication={toggleApplication}
                setQuery={(value) => setFilters((current) => ({ ...current, query: value }))}
                onClear={clearAll}
              />
            </div>
          </aside>

          {/* Results */}
          <div className="lg:col-span-8 lg:min-h-[80vh] xl:col-span-9">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4 lg:hidden">
              <p className="text-[12px] text-mid">
                <span className="font-semibold tabular text-ink">{results.length}</span> of{" "}
                {products.length} containers
              </p>
              <button
                type="button"
                onClick={() => setDrawerOpen(true)}
                className="inline-flex h-10 items-center gap-2 text-[13px] font-medium text-ink underline decoration-line underline-offset-4"
              >
                <SlidersHorizontal className="h-[18px] w-[18px]" />
                Filters{total > 0 ? ` (${total})` : ""}
              </button>
            </div>

            {consolidated.length > 0 && (
              <div className="mt-5 flex flex-col gap-3 border-y border-line py-3 sm:flex-row sm:flex-wrap sm:items-center">
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-mid">
                  Active
                </span>
                <ul className="flex flex-wrap items-center divide-line sm:divide-x">
                  {consolidated.map((chip) => (
                    <li key={chip.key} className="py-1 sm:px-3 sm:first:pl-0">
                      <span className="inline-flex items-center gap-2.5">
                        <span className="text-[13px] text-ink">{chip.label}</span>
                        <button
                          type="button"
                          onClick={chip.remove}
                          aria-label={`Remove ${chip.label} filter`}
                          className="flex h-5 w-5 items-center justify-center rounded-full border border-line text-mid transition-colors duration-300 hover:border-brand hover:bg-brand hover:text-white"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={clearAll}
                  className="self-start text-left text-[13px] text-mid underline decoration-line underline-offset-4 transition-colors hover:text-ink sm:ml-auto sm:self-auto"
                >
                  Clear all
                </button>
              </div>
            )}

            <div
              ref={gridRef}
              className="mt-6 sm:mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 lg:grid-cols-2 xl:grid-cols-3 xl:gap-x-9 xl:gap-y-14"
              aria-live="polite"
              aria-busy={!hydrated}
            >
              {results.map((product, index) => (
                <ProductCard key={product.slug} product={product} index={index} priority={index < 3} />
              ))}
            </div>

            {results.length === 0 && (
              <div className="mt-8 flex min-h-[260px] flex-col items-center justify-center rounded-[20px] border border-dashed border-line bg-soft/50 p-8 text-center sm:p-12">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-xs ring-1 ring-line">
                  <Filter aria-hidden className="h-5 w-5 text-brand" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-ink">
                  No products found
                </h3>
                <p className="mt-1.5 max-w-sm text-center text-[14px] leading-relaxed text-mid">
                  No containers match your selected filters. Try clearing filters to see all available products.
                </p>
                <div className="mt-6 flex items-center justify-center">
                  <button
                    type="button"
                    onClick={clearAll}
                    className="inline-flex h-11 items-center gap-2 rounded-full bg-brand px-6 text-[14px] font-medium text-white transition-colors hover:bg-brand-dark"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Clear all filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-[80] lg:hidden">
          <button
            type="button"
            aria-label="Close filters"
            onClick={() => setDrawerOpen(false)}
            className="absolute inset-0 bg-ink/50 backdrop-blur-sm"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Filter the product range"
            data-lenis-prevent
            className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <h2 className="text-[13px] font-semibold text-ink">
                Filters {total > 0 && <span className="text-brand tabular">({total})</span>}
              </h2>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                aria-label="Close filters"
                className="flex h-9 w-9 items-center justify-center text-ink"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-6">
              <FilterPanel
                filters={filters}
                toggle={toggle}
                toggleApplication={toggleApplication}
                setQuery={(value) => setFilters((current) => ({ ...current, query: value }))}
                onClear={clearAll}
              />
            </div>

            <div className="border-t border-line p-4">
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="h-12 w-full bg-brand text-sm font-medium text-white"
              >
                Show {results.length} container{results.length === 1 ? "" : "s"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */

function FilterGroup({
  legend,
  children,
  hint,
}: {
  legend: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <fieldset>
      <legend className="text-[15.5px] font-bold tracking-tight text-ink">
        {legend}
        {hint && <span className="ml-1 text-[13px] font-normal normal-case tracking-normal text-mid">{hint}</span>}
      </legend>
      <div className="mt-3.5 space-y-2.5">{children}</div>
    </fieldset>
  );
}

function CheckRow({
  checked,
  onChange,
  label,
  count,
  icon,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
  count?: number;
  icon?: React.ReactNode;
}) {
  return (
    <label className="group flex cursor-pointer items-center gap-3 py-1 text-[15px] font-medium text-ink transition-colors hover:text-brand">
      <input type="checkbox" checked={checked} onChange={onChange} className="h-4.5 w-4.5 shrink-0 accent-brand rounded" />
      {icon}
      <span className="flex-1 leading-snug">{label}</span>
      {typeof count === "number" && <span className="tabular text-[13px] font-normal text-mid group-hover:text-brand">{count}</span>}
    </label>
  );
}

function FilterPanel({
  filters,
  toggle,
  toggleApplication,
  setQuery,
  onClear,
  hideApplications = false,
}: {
  filters: Filters;
  toggle: (key: FilterKey, value: string) => void;
  toggleApplication: (slug: ApplicationSlug) => void;
  setQuery: (value: string) => void;
  onClear: () => void;
  hideApplications?: boolean;
}) {
  return (
    <div className="space-y-8">
      <FilterGroup legend="Product name">
        {filterOptions.names.map((option) => (
          <CheckRow
            key={option.value}
            checked={filters.names.includes(option.value)}
            onChange={() => toggle("names", option.value)}
            label={option.label}
            count={option.count}
          />
        ))}
      </FilterGroup>

      {!hideApplications && (
        <FilterGroup legend="Application">
          <div className="space-y-2.5">
            {applications.map((application) => (
              <CheckRow
                key={application.slug}
                checked={filters.applications.includes(application.slug)}
                onChange={() => toggleApplication(application.slug)}
                label={application.name}
                count={filterOptions.applications.find((option) => option.value === application.slug)?.count}
                icon={
                  <AnimatedIcon
                    name={applicationIcons[application.slug]}
                    motion="none"
                    className="h-[18px] w-[18px] text-mid"
                  />
                }
              />
            ))}
          </div>
        </FilterGroup>
      )}

      <FilterGroup legend="Lid options">
        {filterOptions.lids.map((option) => (
          <CheckRow
            key={option.value}
            checked={filters.lids.includes(option.value)}
            onChange={() => toggle("lids", option.value)}
            label={option.label}
            count={option.count}
          />
        ))}
      </FilterGroup>

      <FilterGroup legend="Lock type">
        {filterOptions.locks.map((option) => (
          <CheckRow
            key={option.value}
            checked={filters.locks.includes(option.value)}
            onChange={() => toggle("locks", option.value)}
            label={option.label}
            count={option.count}
          />
        ))}
      </FilterGroup>

      {activeCount(filters) > 0 && (
        <button
          type="button"
          onClick={onClear}
          className="inline-flex items-center gap-2 text-[13px] text-mid transition-colors hover:text-ink"
        >
          <RotateCcw className="h-3 w-3" />
          Clear all filters
        </button>
      )}
    </div>
  );
}
