"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Filter, RotateCcw, Search, SlidersHorizontal, X } from "lucide-react";
import { ProductCard } from "@/components/products/ProductCard";
import { AnimatedIcon, applicationIcons } from "@/components/ui/AnimatedIcon";
import { gsap, ScrollTrigger, useGSAP, reduceMotion } from "@/lib/animations";
import {
  applications,
  codesFor,
  colorsFor,
  filterOptions,
  lidsFor,
  products,
  type ApplicationSlug,
  type CapacityUnit,
  type ColorName,
  type LidType,
  type LockType,
  type Product,
  type ProductTypeSlug,
} from "@/data/products";
import { swatches } from "@/lib/colors";

type FilterKey = "applications" | "types" | "capacities" | "lids" | "locks" | "colors";

type Filters = {
  applications: ApplicationSlug[];
  types: ProductTypeSlug[];
  capacities: string[];
  lids: LidType[];
  locks: LockType[];
  colors: ColorName[];
  query: string;
};

const EMPTY_FILTERS: Filters = {
  applications: [],
  types: [],
  capacities: [],
  lids: [],
  locks: [],
  colors: [],
  query: "",
};

const capacityKey = (product: Product) => `${product.capacity.value}-${product.capacity.unit}`;

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
    capacities: readList(
      params,
      "capacity",
      filterOptions.capacities.map((option) => `${option.value}-${option.unit}`),
    ),
    lids: readList(params, "lid", filterOptions.lids.map((option) => option.value)),
    locks: readList(params, "lock", filterOptions.locks.map((option) => option.value)),
    colors: readList(params, "color", filterOptions.colors.map((option) => option.value)),
    query: params.get("q") ?? "",
  };
};

const toQueryString = (filters: Filters) => {
  const params = new URLSearchParams();
  if (filters.applications.length) params.set("application", filters.applications.join(","));
  if (filters.types.length) params.set("type", filters.types.join(","));
  if (filters.capacities.length) params.set("capacity", filters.capacities.join(","));
  if (filters.lids.length) params.set("lid", filters.lids.join(","));
  if (filters.locks.length) params.set("lock", filters.locks.join(","));
  if (filters.colors.length) params.set("color", filters.colors.join(","));
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
  if (filters.capacities.length && !filters.capacities.includes(capacityKey(product))) return false;
  if (filters.lids.length && !filters.lids.some((lid) => lidsFor(product).includes(lid))) return false;
  if (filters.locks.length && !filters.locks.some((lock) => product.locks.includes(lock))) return false;
  if (filters.colors.length && !filters.colors.some((color) => colorsFor(product).includes(color))) {
    return false;
  }
  return matchesQuery(product, filters.query);
};

const activeCount = (filters: Filters) =>
  filters.applications.length +
  filters.types.length +
  filters.capacities.length +
  filters.lids.length +
  filters.locks.length +
  filters.colors.length +
  (filters.query.trim() ? 1 : 0);

/* -------------------------------------------------------------------------- */

export function ProductsBrowser() {
  const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const gridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setFilters(parseFilters(window.location.search));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const query = toQueryString(filters);
    const target = `${window.location.pathname}${query}`;
    if (`${window.location.pathname}${window.location.search}` !== target) {
      window.history.replaceState(null, "", target);
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
    ...filters.capacities.map((value) => ({
      key: `capacity-${value}`,
      label:
        filterOptions.capacities.find((option) => `${option.value}-${option.unit}` === value)?.label ??
        value.replace("-", " "),
      remove: () => toggle("capacities", value),
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
    ...filters.colors.map((value) => ({
      key: `color-${value}`,
      label: value,
      remove: () => toggle("colors", value),
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
      {/* Application chips */}
      <div className="sticky top-[68px] z-30 border-y border-line bg-white/95 backdrop-blur-md">
        <div className="shell">
          <div className="flex items-center gap-2 overflow-x-auto py-3 no-scrollbar lg:gap-2.5">
            <button
              type="button"
              onClick={() => setFilters((current) => ({ ...current, applications: [] }))}
              aria-pressed={filters.applications.length === 0}
              className={`h-11 shrink-0 border-b-2 pr-5 text-[13px] font-medium transition-colors ${
                filters.applications.length === 0
                  ? "border-ink text-ink"
                  : "border-transparent text-mid hover:text-ink"
              }`}
            >
              All <span className="ml-1 tabular text-[12px]">{products.length}</span>
            </button>

            {applications.map((application) => {
              const option = filterOptions.applications.find((item) => item.value === application.slug);
              const selected = filters.applications.includes(application.slug);
              return (
                <button
                  key={application.slug}
                  type="button"
                  onClick={() => toggleApplication(application.slug)}
                  aria-pressed={selected}
                  className={`flex h-11 shrink-0 items-center gap-2 border-b-2 px-1 pr-5 text-[13px] font-medium transition-colors ${
                    selected ? "border-brand text-ink" : "border-transparent text-mid hover:text-ink"
                  }`}
                >
                  <AnimatedIcon
                    name={applicationIcons[application.slug]}
                    motion={selected ? "pulse" : "none"}
                    className={`h-5 w-5 ${selected ? "text-brand" : "text-mid"}`}
                  />
                  {application.name}
                  <span className="tabular text-[12px]">{option?.count ?? 0}</span>
                </button>
              );
            })}

            <div className="ml-auto hidden items-center gap-4 pl-6 lg:flex">
              <p className="whitespace-nowrap text-[12px] text-mid">
                <span className="font-semibold tabular text-ink">{results.length}</span> of{" "}
                {products.length} containers
              </p>
              <button
                type="button"
                onClick={() => setDrawerOpen(true)}
                className="inline-flex h-10 items-center gap-2 text-[13px] font-medium text-ink underline decoration-line underline-offset-4 transition-colors hover:decoration-ink"
              >
                <SlidersHorizontal className="h-[18px] w-[18px]" />
                Filters{total > 0 ? ` (${total})` : ""}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="shell">
        <div className="grid gap-10 pt-10 lg:grid-cols-12 lg:gap-12">
          {/* Desktop filter rail */}
          <aside className="hidden lg:col-span-3 lg:block">
            <div
              data-lenis-prevent
              className="sticky top-24 max-h-[calc(100vh-8rem)] space-y-8 overflow-y-auto overscroll-contain pb-6 pr-2 [scrollbar-width:thin]"
            >
              <div className="flex items-center justify-between border-b border-ink pb-3">
                <h2 className="inline-flex items-center gap-2 text-[13px] font-semibold text-ink">
                  <Filter className="h-5 w-5 text-brand" />
                  Filter
                </h2>
                {total > 0 && (
                  <button
                    type="button"
                    onClick={clearAll}
                    className="inline-flex items-center gap-1 text-[12px] text-mid transition-colors hover:text-ink"
                  >
                    <RotateCcw className="h-3 w-3" />
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
                hideApplications
              />
            </div>
          </aside>

          {/* Results */}
          <div className="lg:col-span-9 lg:min-h-[80vh]">
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

            {/* Code search (visible on all breakpoints) */}
            <div className="mt-4 lg:mt-0">
              <label htmlFor="code-search" className="sr-only">
                Search by product code or container name
              </label>
              <div className="relative">
                <Search
                  aria-hidden
                  className="pointer-events-none absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-mid"
                />
                <input
                  id="code-search"
                  type="search"
                  value={filters.query}
                  onChange={(event) =>
                    setFilters((current) => ({ ...current, query: event.target.value }))
                  }
                  placeholder="Search by product code — e.g. P20ap, F17is, K20t"
                  className="h-12 w-full border-0 border-b border-line bg-transparent pl-8 pr-10 text-[15px] text-ink outline-none transition-colors placeholder:text-mid focus:border-ink"
                />
                {filters.query && (
                  <button
                    type="button"
                    onClick={() => setFilters((current) => ({ ...current, query: "" }))}
                    aria-label="Clear search"
                    className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center text-mid hover:text-brand"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
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
              className="mt-8 grid gap-x-6 gap-y-12 sm:grid-cols-2 xl:gap-x-7 xl:grid-cols-3"
              aria-live="polite"
              aria-busy={!hydrated}
            >
              {results.map((product, index) => (
                <ProductCard key={product.slug} product={product} index={index} priority={index < 3} />
              ))}
            </div>

            {results.length === 0 && (
              <div className="mt-10 flex min-h-[300px] flex-col items-start justify-center border-t border-line pt-10">
                <Filter aria-hidden className="h-5 w-5 text-brand" />
                <h3 className="mt-5 font-display text-xl font-semibold text-ink">
                  No containers match this combination
                </h3>
                <p className="mt-2 max-w-sm text-left text-[14px] leading-relaxed text-mid">
                  The filters you selected don’t overlap anywhere in the range. Clear the filters to see
                  all {products.length} containers, or send us the code you need and we’ll confirm
                  what can be produced.
                </p>
                <div className="mt-7 flex flex-wrap items-center gap-5">
                  <button
                    type="button"
                    onClick={clearAll}
                    className="inline-flex h-11 items-center gap-2 bg-brand px-5 text-[14px] font-medium text-white transition-colors hover:bg-brand-dark"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Clear all filters
                  </button>
                  <a href="/contact" className="text-[14px] font-medium text-ink underline decoration-line underline-offset-4 hover:decoration-ink">
                    Send us your requirement
                  </a>
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
      <legend className="text-[13px] font-semibold text-ink">
        {legend}
        {hint && <span className="ml-1 normal-case tracking-normal text-mid">{hint}</span>}
      </legend>
      <div className="mt-3 space-y-2.5">{children}</div>
    </fieldset>
  );
}

function CheckRow({
  checked,
  onChange,
  label,
  count,
  swatch,
  icon,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
  count?: number;
  swatch?: string;
  icon?: React.ReactNode;
}) {
  return (
    <label className="group flex cursor-pointer items-center gap-2.5 py-0.5 text-[14px] text-ink transition-colors hover:text-brand">
      <input type="checkbox" checked={checked} onChange={onChange} className="h-[18px] w-[18px] shrink-0 accent-brand" />
      {icon}
      {swatch && (
        <span
          aria-hidden
          className="h-3 w-3 rounded-full border border-mid/40"
          style={{ backgroundColor: swatch }}
        />
      )}
      <span className="flex-1">{label}</span>
      {typeof count === "number" && <span className="tabular text-[12px] text-mid group-hover:text-brand">{count}</span>}
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
  const grouped = filterOptions.capacities.reduce<Record<CapacityUnit, typeof filterOptions.capacities>>(
    (accumulator, option) => {
      accumulator[option.unit] = [...(accumulator[option.unit] ?? []), option];
      return accumulator;
    },
    { ml: [], L: [], kg: [] },
  );

  return (
    <div className="space-y-8">
      {!hideApplications && (
        <FilterGroup legend="Application">
          <label htmlFor="drawer-search" className="sr-only">
            Search by product code
          </label>
          <input
            id="drawer-search"
            type="search"
            value={filters.query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search code — P20ap, F17is…"
            className="mb-4 h-10 w-full border-0 border-b border-line bg-transparent px-0 text-[14px] text-ink outline-none placeholder:text-mid focus:border-ink"
          />
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

      <FilterGroup legend="Product type">
        {filterOptions.types.map((option) => (
          <CheckRow
            key={option.value}
            checked={filters.types.includes(option.value)}
            onChange={() => toggle("types", option.value)}
            label={option.label}
            count={option.count}
          />
        ))}
      </FilterGroup>

      <FilterGroup legend="Capacity">
        {(["ml", "L", "kg"] as CapacityUnit[]).map((unit) =>
          grouped[unit]?.length ? (
            <div key={unit} className="space-y-2.5">
              <p className="text-[12px] font-semibold text-mid">
                {unit === "kg" ? "Kilograms" : unit === "ml" ? "Millilitres" : "Litres"}
              </p>
              {grouped[unit].map((option) => {
                const key = `${option.value}-${option.unit}`;
                return (
                  <CheckRow
                    key={key}
                    checked={filters.capacities.includes(key)}
                    onChange={() => toggle("capacities", key)}
                    label={option.label}
                    count={option.count}
                  />
                );
              })}
            </div>
          ) : null,
        )}
      </FilterGroup>

      <FilterGroup legend="Finish / lid">
        {filterOptions.lids.map((option) => (
          <CheckRow
            key={option.value}
            checked={filters.lids.includes(option.value)}
            onChange={() => toggle("lids", option.value)}
            label={option.value === "Flat Lid" ? "Flat Lid (Plain)" : "Tind Lid (Tin/Sp.)"}
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

      <FilterGroup legend="Available colour">
        {filterOptions.colors.map((option) => (
          <CheckRow
            key={option.value}
            checked={filters.colors.includes(option.value)}
            onChange={() => toggle("colors", option.value)}
            label={option.label}
            count={option.count}
            swatch={swatches[option.value].hex}
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
