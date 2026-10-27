/**
 * ASIR CONTAINERS — centralised product dataset.
 *
 * SOURCE OF TRUTH
 * ---------------
 * This dataset is transcribed directly from the client's final product table
 * (S.No 1–17). Each row is one container record. Nothing here is inferred
 * except the items listed in CONTENT-NOTES.md.
 *
 * KEY RULES ENCODED BELOW
 * -----------------------
 * • `applications` comes straight from the table's Paint / Agro / Food / Lube
 *   columns — an application is only listed where the table marks "Y".
 * • `codes.plain` is the "Plain" product code; `codes.tin` is the "Tin/Sp."
 *   code. A container with no Tin/Sp. code has no tinned variant.
 * • Lid options are DERIVED, not assumed: Plain → "Flat Lid",
 *   Tin/Sp. → "Tind Lid" (the supplied spelling is preserved).
 * • Litres, millilitres and kilograms stay in their own unit. 1 KG is never
 *   treated as 1 L.
 * • Two 1 Litre records (P1a, P1b) and two 20 Litre records (P20a, P20b) are
 *   kept separate because they carry different product codes.
 *
 * To add a container: copy a record, give it a unique slug + codes, and the
 * range, filters, application pages, counters, sitemap and static build
 * pick it up automatically.
 */

/* -------------------------------------------------------------------------- */
/* Types                                                                       */
/* -------------------------------------------------------------------------- */

export type ApplicationSlug = "paint" | "agro" | "food" | "lube";

export type ColorName = "White" | "Green" | "Red" | "Black";

export type LidType = "Flat Lid" | "Tind Lid";

export type LockType = "Interlock" | "Outer Lock";

export type ProductTypeSlug = "paint-pail" | "storage-pail" | "round-pail" | "square-pail";

export type CapacityUnit = "ml" | "L" | "kg";

export interface Product {
  /** URL segment — /products/[slug] */
  slug: string;
  /** Display name, built from the table's product column. */
  name: string;
  /** Format family (see productTypes). */
  type: ProductTypeSlug;
  capacity: { value: number; unit: CapacityUnit };
  /**
   * Physical record for the container. Placeholder figures supplied for this
   * build — replace with the client's measured drawing values per code.
   */
  specs: { height: string; brimful: string; gslOfc: string };
  /** Applications marked "Y" in the table. */
  applications: ApplicationSlug[];
  /** Product codes exactly as supplied. */
  codes: { plain: string; tin?: string };
  locks: LockType[];
  /** Optional per-container colour confirmation; overrides the category rule. */
  colorsOverride?: ColorName[];
  image: string;
  imageAlt: string;
  summary: string;
  context: string;
  featured?: boolean;
}

/* -------------------------------------------------------------------------- */
/* Reference data                                                              */
/* -------------------------------------------------------------------------- */

export const applications: {
  slug: ApplicationSlug;
  name: string;
  index: string;
  blurb: string;
  longBlurb: string;
  image: string;
  imageAlt: string;
}[] = [
  {
    slug: "paint",
    name: "Paint",
    index: "01",
    blurb:
      "The widest run in the range — 500 ml retail pails through 20 litre and 20 KG bulk containers.",
    longBlurb:
      "Almost the whole tool room: every P-series paint pail from 500 ml to 20 litre, plus the K-series pails from 1 KG to 20 KG.",
    image: "/images/categories/paint.jpg",
    imageAlt: "White round plastic paint pail with a flat lid and metal handle",
  },
  {
    slug: "agro",
    name: "Agro",
    index: "02",
    blurb:
      "Paint-pail tooling and the 5 litre round container supplied for agro-chemical packing.",
    longBlurb:
      "The same P-series containers as paint — 500 ml through 20 litre, 10 KG — plus the 5 litre round A5.",
    image: "/images/categories/agro.jpg",
    imageAlt: "Green round plastic pail container for agro-chemical packing",
  },
  {
    slug: "food",
    name: "Food",
    index: "03",
    blurb:
      "From 500 ml pails to the 15 and 17 litre interlock square containers for food packing.",
    longBlurb:
      "The widest spread: small P-series pails, K-series weight-marked containers, and 5, 15 and 17 litre F-series square pails.",
    image: "/images/categories/food.jpg",
    imageAlt: "White square plastic food pail container with interlock lid",
  },
  {
    slug: "lube",
    name: "Lube",
    index: "04",
    blurb:
      "Weight-marked pails for oil and grease — 2 KG and 5 KG, 20 KG, and the 5 litre round A5.",
    longBlurb:
      "The K-series weight-marked containers — 2 KG, 5 KG, 20 KG — and the 5 litre round A5.",
    image: "/images/categories/lube.jpg",
    imageAlt: "Red plastic industrial pail container for lubricants with white lid",
  },
];

export const colorOptions: ColorName[] = ["White", "Green", "Red", "Black"];

/** Colour availability rule, per the supplied brief. */
const COLORS_BY_APPLICATION: Record<ApplicationSlug, ColorName[]> = {
  paint: ["White", "Green", "Red"],
  lube: ["White", "Green", "Red"],
  agro: ["Green"],
  food: ["White", "Black"],
};

export const lidOptions: LidType[] = ["Flat Lid", "Tind Lid"];
export const lockOptions: LockType[] = ["Interlock", "Outer Lock"];

export const productTypes: { slug: ProductTypeSlug; name: string; note: string }[] = [
  { slug: "paint-pail", name: "Paint Pail", note: "P-series round pails, 500 ml – 20 L" },
  { slug: "storage-pail", name: "Storage Pail", note: "K-series weight-marked pails, 1 – 20 KG" },
  { slug: "round-pail", name: "Round Pail", note: "A-series round container" },
  { slug: "square-pail", name: "Square Pail", note: "F-series square pails with locking lids" },
];

/* -------------------------------------------------------------------------- */
/* Products — S.No 1–17 from the final product table                           */
/* -------------------------------------------------------------------------- */

export const products: Product[] = [
  {
    slug: "500ml-paint-pail-p2",
    name: "500 ml Plastic Pail Container",
    type: "paint-pail",
    capacity: { value: 500, unit: "ml" },
    specs: { height: "110 mm", brimful: "0.56 L", gslOfc: "GSL 70 mm / OFC 78 mm" },
    applications: ["paint", "agro", "food"],
    codes: { plain: "P/2" },
    locks: [],
    image: "/images/categories/paint.jpg",
    imageAlt: "Placeholder packshot — white 500 ml round plastic pail container",
    summary:
      "The smallest container in the range: a 500 ml round pail supplied plain (P/2) for paint, agro and food packing.",
    context:
      "Used for sample and touch-up packs. Plain code only — there is no tinned variant of this container in the table.",
    featured: true,
  },
  {
    slug: "1l-paint-pail-p1a",
    name: "1 Litre Plastic Pail Container — P1a",
    type: "paint-pail",
    capacity: { value: 1, unit: "L" },
    specs: { height: "150 mm", brimful: "1.10 L", gslOfc: "GSL 82 mm / OFC 90 mm" },
    applications: ["paint", "agro"],
    codes: { plain: "P1a" },
    locks: [],
    image: "/images/categories/paint.jpg",
    imageAlt: "Placeholder packshot — white 1 litre round plastic pail container",
    summary:
      "Retail-scale 1 litre round pail supplied plain (P1a) for paint and agro-chemical packing.",
    context:
      "One of two 1 litre records in the range. It carries its own plain code (P1a) and is quoted separately from P1b.",
  },
  {
    slug: "1l-paint-pail-p1b",
    name: "1 Litre Plastic Pail Container — P1b",
    type: "paint-pail",
    capacity: { value: 1, unit: "L" },
    specs: { height: "148 mm", brimful: "1.08 L", gslOfc: "GSL 80 mm / OFC 88 mm" },
    applications: ["paint", "agro"],
    codes: { plain: "P1b" },
    locks: [],
    image: "/images/categories/paint.jpg",
    imageAlt: "Placeholder packshot — white 1 litre round plastic pail container, second tool",
    summary:
      "A second 1 litre round pail, supplied plain (P1b) for paint and agro-chemical packing.",
    context:
      "Kept as its own record because the plain code differs from P1a — the two are quoted and ordered by code.",
  },
  {
    slug: "4l-paint-pail-p4",
    name: "4 Litre Plastic Pail Container",
    type: "paint-pail",
    capacity: { value: 4, unit: "L" },
    specs: { height: "235 mm", brimful: "4.40 L", gslOfc: "GSL 108 mm / OFC 118 mm" },
    applications: ["paint", "agro"],
    codes: { plain: "P4" },
    locks: [],
    image: "/images/categories/paint.jpg",
    imageAlt: "Placeholder packshot — white 4 litre round plastic pail container",
    summary:
      "Mid-retail 4 litre round pail supplied plain (P4) for paint and agro-chemical packing.",
    context:
      "Sits between the 1 litre and 10 litre pails in the P-series, and is quoted by its plain code only.",
  },
  {
    slug: "10l-paint-pail-p10",
    name: "10 Litre Plastic Pail Container",
    type: "paint-pail",
    capacity: { value: 10, unit: "L" },
    specs: { height: "300 mm", brimful: "11.20 L", gslOfc: "GSL 128 mm / OFC 140 mm" },
    applications: ["paint", "agro", "food"],
    codes: { plain: "P10p", tin: "P10t" },
    locks: [],
    image: "/images/categories/paint.jpg",
    imageAlt: "Placeholder packshot — white 10 litre round plastic pail container",
    summary:
      "The 10 litre workhorse of the range, available plain (P10p) or tinned (P10t) for paint, agro and food packing.",
    context:
      "One container, two codes: order P10p for the plain pail or P10t for the tinned variant. Both take the same 10 litre fill.",
    featured: true,
  },
  {
    slug: "20l-paint-pail-p20a",
    name: "20 Litre Plastic Pail Container — P20a",
    type: "paint-pail",
    capacity: { value: 20, unit: "L" },
    specs: { height: "390 mm", brimful: "21.50 L", gslOfc: "GSL 152 mm / OFC 166 mm" },
    applications: ["paint", "agro", "food"],
    codes: { plain: "P20ap", tin: "P20at" },
    locks: [],
    image: "/images/categories/paint.jpg",
    imageAlt: "Placeholder packshot — white 20 litre round plastic pail container",
    summary:
      "Bulk 20 litre round pail, plain (P20ap) or tinned (P20at), for paint, agro and food packing.",
    context:
      "One of two 20 litre toolings. P20a is quoted independently of P20b, so confirm the code on any repeat order.",
    featured: true,
  },
  {
    slug: "20l-paint-pail-p20b",
    name: "20 Litre Plastic Pail Container — P20b",
    type: "paint-pail",
    capacity: { value: 20, unit: "L" },
    specs: { height: "386 mm", brimful: "21.30 L", gslOfc: "GSL 150 mm / OFC 164 mm" },
    applications: ["paint", "agro"],
    codes: { plain: "P20bp", tin: "P20bt" },
    locks: [],
    image: "/images/categories/paint.jpg",
    imageAlt: "Placeholder packshot — white 20 litre round plastic pail container, second tool",
    summary:
      "A second 20 litre round pail, plain (P20bp) or tinned (P20bt), for paint, agro and food packing.",
    context:
      "Shares the 20 litre capacity with P20a but is a separate container with its own codes.",
  },
  {
    slug: "1kg-storage-pail-k1",
    name: "1 KG Plastic Pail Container",
    type: "storage-pail",
    capacity: { value: 1, unit: "kg" },
    specs: { height: "145 mm", brimful: "1.10 L", gslOfc: "GSL 78 mm / OFC 86 mm" },
    applications: ["paint", "food"],
    codes: { plain: "K1" },
    locks: [],
    image: "/images/categories/food.jpg",
    imageAlt: "Placeholder packshot — white 1 kilogram plastic pail container",
    summary:
      "Weight-marked 1 KG pail supplied plain (K1) for paint and food packing.",
    context:
      "Packed by fill weight, not volume. It is a separate record from the 1 litre pails and is never converted between the two.",
  },
  {
    slug: "2kg-storage-pail-k2",
    name: "2 KG Plastic Pail Container",
    type: "storage-pail",
    capacity: { value: 2, unit: "kg" },
    specs: { height: "195 mm", brimful: "2.20 L", gslOfc: "GSL 92 mm / OFC 100 mm" },
    applications: ["paint", "food", "lube"],
    codes: { plain: "K2" },
    locks: [],
    image: "/images/categories/lube.jpg",
    imageAlt: "Placeholder packshot — red 2 kilogram plastic pail container",
    summary:
      "2 KG weight-marked pail supplied plain (K2) for paint, food and lubricant packing.",
    context:
      "The smallest lubricant pack in the range, and one of only four containers marked for Lube applications.",
    featured: true,
  },
  {
    slug: "5kg-storage-pail-k5",
    name: "5 KG Plastic Pail Container",
    type: "storage-pail",
    capacity: { value: 5, unit: "kg" },
    specs: { height: "265 mm", brimful: "5.60 L", gslOfc: "GSL 112 mm / OFC 122 mm" },
    applications: ["paint", "food", "lube"],
    codes: { plain: "K5" },
    locks: [],
    image: "/images/categories/lube.jpg",
    imageAlt: "Placeholder packshot — red 5 kilogram plastic pail container",
    summary:
      "5 KG weight-marked pail supplied plain (K5) for paint, food and lubricant packing.",
    context:
      "The most widely applied weight-marked container after 20 KG, quoted by its plain code only.",
  },
  {
    slug: "10kg-storage-pail-k10",
    name: "10 KG Plastic Pail Container",
    type: "storage-pail",
    capacity: { value: 10, unit: "kg" },
    specs: { height: "305 mm", brimful: "11.40 L", gslOfc: "GSL 130 mm / OFC 142 mm" },
    applications: ["paint", "agro"],
    codes: { plain: "K10p", tin: "K10t" },
    locks: [],
    image: "/images/categories/paint.jpg",
    imageAlt: "Placeholder packshot — white 10 kilogram plastic pail container",
    summary:
      "10 KG weight-marked pail, plain (K10p) or tinned (K10t), for paint and agro-chemical packing.",
    context:
      "The tinned variant (K10t) is quoted separately, so specify which code your line is set up for.",
  },
  {
    slug: "20kg-storage-pail-k20",
    name: "20 KG Plastic Pail Container",
    type: "storage-pail",
    capacity: { value: 20, unit: "kg" },
    specs: { height: "395 mm", brimful: "21.80 L", gslOfc: "GSL 154 mm / OFC 168 mm" },
    applications: ["paint", "agro", "lube"],
    codes: { plain: "K20p", tin: "K20t" },
    locks: [],
    image: "/images/categories/lube.jpg",
    imageAlt: "Placeholder packshot — red 20 kilogram plastic pail container",
    summary:
      "Bulk 20 KG weight-marked pail, plain (K20p) or tinned (K20t), for paint and lubricant packing.",
    context:
      "The heaviest container in the range and the largest lubricant pack — supplied in plain or tinned finish.",
    featured: true,
  },
  {
    slug: "5l-round-pail-a5",
    name: "5 Litre Round Plastic Pail Container",
    type: "round-pail",
    capacity: { value: 5, unit: "L" },
    specs: { height: "245 mm", brimful: "5.40 L", gslOfc: "GSL 110 mm / OFC 120 mm" },
    applications: ["agro", "lube"],
    codes: { plain: "A5" },
    locks: [],
    image: "/images/categories/agro.jpg",
    imageAlt: "Placeholder packshot — green 5 litre round plastic pail container",
    summary:
      "5 litre round pail supplied plain (A5) for agro-chemical and lubricant packing.",
    context:
      "The only A-series container in the range. It is a separate record from the 5 KG storage pail and the 5 litre square interlock pail.",
    featured: true,
  },
  {
    slug: "15l-square-interlock-pail-f15",
    name: "15 Litre Interlock Pail Container",
    type: "square-pail",
    capacity: { value: 15, unit: "L" },
    specs: { height: "340 mm", brimful: "16.20 L", gslOfc: "GSL 145 mm / OFC 158 mm" },
    applications: ["food"],
    codes: { plain: "F15p", tin: "F15s" },
    locks: ["Interlock"],
    image: "/images/categories/food.jpg",
    imageAlt:
      "Placeholder packshot — white 15 litre square plastic pail container with interlock lid",
    summary:
      "15 litre square pail with an interlock lid, supplied plain (F15p) or tinned (F15s) for food packing.",
    context:
      "The largest square interlock format in the range. Confirm the code — F15p and F15s are different products.",
  },
  {
    slug: "17l-square-interlock-pail-f17i",
    name: "17 Litre Square Interlock Pail Container",
    type: "square-pail",
    capacity: { value: 17, unit: "L" },
    specs: { height: "355 mm", brimful: "18.00 L", gslOfc: "GSL 150 mm / OFC 164 mm" },
    applications: ["food"],
    codes: { plain: "F17ip", tin: "F17is" },
    locks: ["Interlock"],
    image: "/images/categories/food.jpg",
    imageAlt:
      "Placeholder packshot — white 17 litre square plastic pail container with interlock lid",
    summary:
      "17 litre square interlock pail, supplied plain (F17ip) or tinned (F17is) for food packing.",
    context:
      "One of two 17 litre square configurations. This record is the interlock version; the outer lock version is a separate container.",
    featured: true,
  },
  {
    slug: "17l-square-outer-lock-pail-f17o",
    name: "17 Litre Square Outer Lock Pail Container",
    type: "square-pail",
    capacity: { value: 17, unit: "L" },
    specs: { height: "355 mm", brimful: "18.00 L", gslOfc: "GSL 150 mm / OFC 164 mm" },
    applications: ["food"],
    codes: { plain: "F17op", tin: "F17os" },
    locks: ["Outer Lock"],
    image: "/images/categories/agro.jpg",
    imageAlt:
      "Placeholder packshot — white 17 litre square plastic pail container with outer lock lid",
    summary:
      "17 litre square pail with an outer lock lid, supplied plain (F17op) or tinned (F17os) for food packing.",
    context:
      "The outer-lock alternative to the 17 litre interlock pail. The closure system differs, so the two are never substituted.",
  },
  {
    slug: "5l-square-interlock-pail-f5",
    name: "5 Litre Square Interlock Pail Container",
    type: "square-pail",
    capacity: { value: 5, unit: "L" },
    specs: { height: "250 mm", brimful: "5.40 L", gslOfc: "GSL 118 mm / OFC 128 mm" },
    applications: ["food"],
    codes: { plain: "F5p", tin: "F5s" },
    locks: ["Interlock"],
    image: "/images/categories/food.jpg",
    imageAlt:
      "Placeholder packshot — white 5 litre square plastic pail container with interlock lid",
    summary:
      "5 litre square interlock pail, supplied plain (F5p) or tinned (F5s) for food packing.",
    context:
      "The smallest square interlock format. It is a separate record from the 5 litre round A5 container.",
  },
];

/* -------------------------------------------------------------------------- */
/* Derived selectors — components never hard-code product facts               */
/* -------------------------------------------------------------------------- */

export const getApplication = (slug: ApplicationSlug) =>
  applications.find((application) => application.slug === slug);

/** Lid options derived from the codes supplied for the container. */
export const lidsFor = (product: Product): LidType[] => {
  const lids: LidType[] = ["Flat Lid"];
  if (product.codes.tin) lids.push("Tind Lid");
  return lids;
};

/** All product codes for a container, e.g. ["P20ap", "P20at"]. */
export const codesFor = (product: Product) =>
  [product.codes.plain, product.codes.tin].filter(Boolean) as string[];

/** Colour availability: product override first, otherwise the application rule. */
export const colorsFor = (product: Product): ColorName[] => {
  if (product.colorsOverride) return product.colorsOverride;
  const allowed = new Set<ColorName>();
  product.applications.forEach((application) => {
    COLORS_BY_APPLICATION[application].forEach((color) => allowed.add(color));
  });
  return colorOptions.filter((color) => allowed.has(color));
};

export const applicationsFor = (product: Product) =>
  applications.filter((application) => product.applications.includes(application.slug));

/** "500 ml" · "10 L" · "20 kg" */
export const capacityDisplay = (product: Product) =>
  `${product.capacity.value} ${product.capacity.unit}`;

export const capacityLabel = (product: Product) => capacityDisplay(product);

/** Compact label used in dense index rows. */
export const capacitiesLabel = (product: Product) => capacityDisplay(product);

/**
 * Name without the trailing " — CODE" disambiguator. Cards already print the
 * code above the title, so the suffix is only noise there.
 */
export const productDisplayName = (product: Product) =>
  product.name.replace(/\s+[—-]\s+[A-Za-z0-9]+$/, "").trim();

export const typeName = (slug: ProductTypeSlug) =>
  productTypes.find((type) => type.slug === slug)?.name ?? slug;

export const typeNote = (slug: ProductTypeSlug) =>
  productTypes.find((type) => type.slug === slug)?.note ?? "";

export const getProduct = (slug: string) => products.find((product) => product.slug === slug);

export const getRelatedProducts = (product: Product, limit = 3) =>
  products
    .filter((candidate) => candidate.slug !== product.slug)
    .map((candidate) => {
      const sharedApplications = candidate.applications.filter((application) =>
        product.applications.includes(application),
      ).length;
      const sameType = candidate.type === product.type ? 2 : 0;
      const sameUnit = candidate.capacity.unit === product.capacity.unit ? 1 : 0;
      return { candidate, score: sharedApplications * 3 + sameType + sameUnit };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((entry) => entry.candidate);

export const productsInApplication = (slug: ApplicationSlug) =>
  products.filter((product) => product.applications.includes(slug));

export const applicationCount = (slug: ApplicationSlug) => productsInApplication(slug).length;

/** Distinct capacities, litres/ml first (ascending), then kilograms. */
export const capacityOptions = (() => {
  const seen = new Map<
    string,
    { value: number; unit: CapacityUnit; label: string; count: number }
  >();

  products.forEach((product) => {
    const key = `${product.capacity.value}-${product.capacity.unit}`;
    const entry = seen.get(key);
    if (entry) {
      entry.count += 1;
    } else {
      seen.set(key, {
        value: product.capacity.value,
        unit: product.capacity.unit,
        label: capacityDisplay(product),
        count: 1,
      });
    }
  });

  const order: Record<CapacityUnit, number> = { ml: 0, L: 1, kg: 2 };
  const normalise = (option: { value: number; unit: CapacityUnit }) =>
    option.unit === "ml" ? option.value / 1000 : option.value;

  return [...seen.values()].sort((a, b) => {
    if (a.unit !== b.unit) return order[a.unit] - order[b.unit];
    return normalise(a) - normalise(b);
  });
})();

/** Filter option sets, limited to values that actually exist in the data. */
export const filterOptions = {
  applications: applications.map((application) => ({
    value: application.slug,
    label: application.name,
    count: applicationCount(application.slug),
  })),
  types: productTypes
    .map((type) => ({
      value: type.slug,
      label: type.name,
      count: products.filter((product) => product.type === type.slug).length,
      note: type.note,
    }))
    .filter((type) => type.count > 0),
  capacities: capacityOptions,
  lids: lidOptions
    .map((lid) => ({
      value: lid,
      label: lid,
      count: products.filter((product) => lidsFor(product).includes(lid)).length,
    }))
    .filter((lid) => lid.count > 0),
  locks: lockOptions
    .map((lock) => ({
      value: lock,
      label: lock,
      count: products.filter((product) => product.locks.includes(lock)).length,
    }))
    .filter((lock) => lock.count > 0),
  colors: colorOptions
    .map((color) => ({
      value: color,
      label: color,
      count: products.filter((product) => colorsFor(product).includes(color)).length,
    }))
    .filter((color) => color.count > 0),
};

/** Range-wide counters used in copy, counters and metadata. */
export const rangeStats = {
  products: products.length,
  codes: products.reduce((total, product) => total + codesFor(product).length, 0),
  applications: applications.length,
  capacities: capacityOptions.length,
  /** Containers that exist in both plain and tinned finishes. */
  dualFinish: products.filter((product) => Boolean(product.codes.tin)).length,
  interlock: products.filter((product) => product.locks.includes("Interlock")).length,
};

/** Every code in the range — used by the code search. */
export const allCodes = products.flatMap((product) =>
  codesFor(product).map((code) => ({ code, product })),
);
