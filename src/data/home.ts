/**
 * Home page editorial content.
 *
 * Keep copy factual: no production figures, certifications, founding dates or
 * performance claims are stated unless the client has verified them.
 * Every number shown on the page is derived from the product dataset.
 */

import { rangeStats } from "./products";

export const heroSlides = [
  {
    id: "paint",
    label: "Paint & industrial pails",
    eyebrow: "Rigid plastic containers",
    title: "Containers built\nfor industry.",
    copy: "Round and square pails for paint, agro, food and lubricant lines — 500 ml to 20 KG, plain or tinned.",
    image: "/images/hero/hero-01.jpg",
    imageAlt:
      "Placeholder factory photograph — stacked white plastic pails with red lids beside moulding machinery",
    primary: { label: "Explore our products", href: "/products" },
    secondary: { label: "Contact us", href: "/contact" },
  },
  {
    id: "square",
    label: "Square interlock pails",
    eyebrow: "5 · 15 · 17 litre square pails",
    title: "Square formats.\nLocking lids.",
    copy: "Interlock or outer lock lids, plain or tinned — 5, 15 and 17 litre food packing.",
    image: "/images/hero/hero-02.jpg",
    imageAlt: "Placeholder product photograph — square white plastic pails with locking lids",
    primary: { label: "Explore our products", href: "/products?application=food" },
    secondary: { label: "Contact us", href: "/contact" },
  },
  {
    id: "codes",
    label: "Codes & finish options",
    eyebrow: "Quoted by product code",
    title: "Plain or tinned.\nOne range.",
    copy: "P20ap and P20at, F17ip and F17is. Every container has its own code, so an order is never interpreted.",
    image: "/images/hero/hero-03.jpg",
    imageAlt: "Placeholder photograph — close-up of injection moulding tooling in a plastics plant",
    primary: { label: "Explore our products", href: "/products" },
    secondary: { label: "Contact us", href: "/contact" },
  },
] as const;

export const aboutContent = {
  eyebrow: "About ASIR Containers",
  heading: "Built around the\npack sizes industry\nactually fills.",
  paragraphs: [
    "ASIR Containers manufactures rigid plastic pails and containers for four industries: paint, agro-chemicals, food and lubricants. The range runs from a 500 ml retail pail through to 20 litre and 20 KG bulk containers, in round and square formats, each tooled for the closure it carries.",
    "Every container is recorded as its own product with its own code, so a plain pail and its tinned variant stay distinct on paper exactly as they are on the line. Colours follow the application — white, green and red for paint and lubricant packing, green for agro, white and black for food — and closures are specified with the container, never assumed.",
  ],
  image: {
    src: "/images/facility/machinery-01.jpg",
    alt: "Placeholder photograph — row of injection moulding machines on a factory floor",
  },
  inset: {
    src: "/images/facility/machinery-02.jpg",
    alt: "Placeholder photograph — stacked plastic pails on pallets in a factory store",
  },
};

/** Animated counters — every value is computed from the product dataset. */
export const counters = [
  {
    value: rangeStats.products,
    suffix: "+",
    label: "Containers",
    detail: "One record per physical pack",
  },
  {
    value: rangeStats.codes,
    suffix: "+",
    label: "Product codes",
    detail: "Plain and Tin/Sp. finishes",
  },
  {
    value: rangeStats.applications,
    suffix: "",
    label: "Applications served",
    detail: "Paint · Agro · Food · Lube",
  },
  {
    value: rangeStats.capacities,
    suffix: "+",
    label: "Capacity options",
    detail: "500 ml to 20 KG",
  },
] as const;

export const advantages = [
  {
    icon: "codes",
    title: "Quoted by product code",
    body: "A plain code, plus a Tin/Sp. code where a tinned variant exists.",
  },
  {
    icon: "finish",
    title: "Plain or tinned finish",
    body: `${rangeStats.dualFinish} containers come in both finishes, each ordered by its own code.`,
  },
  {
    icon: "lock",
    title: "Interlock and outer lock",
    body: "5, 15 and 17 litre square pails, with interlock or outer lock closures.",
  },
  {
    icon: "scale",
    title: "Volume and weight marked",
    body: "Recorded as supplied — 500 ml to 20 L, and 1 KG to 20 KG. Never converted.",
  },
  {
    icon: "shapes",
    title: "Round and square",
    body: "Round for paint, agro and lube; square where flat panels help labelling.",
  },
  {
    icon: "palette",
    title: "Application colour options",
    body: "White, green, red for paint and lube; green for agro; white and black for food.",
  },
] as const;

export const manufacturing = {
  eyebrow: "Machinery & manufacturing",
  heading: "Moulding discipline\nbehind every container.",
  intro:
    "Injection moulded pails, with the range organised around the tooling each format needs. Code, capacity and closure are specified together.",
  image: {
    src: "/images/facility/machinery-01.jpg",
    alt: "Placeholder photograph — injection moulding machines inside a manufacturing facility",
  },
  steps: [
    {
      index: "01",
      icon: "tool",
      title: "Tooling & format",
      body: "Every format starts with its mould — body and closure tooled as one assembly.",
    },
    {
      index: "02",
      icon: "mould",
      title: "Injection moulding",
      body: "Moulded to the capacity the format calls for, in the application’s colours.",
    },
    {
      index: "03",
      icon: "lock",
      title: "Closures & finish",
      body: "Plain and Tin/Sp. variants are lidded before dispatch — flat, Tind, interlock or outer lock.",
    },
    {
      index: "04",
      icon: "truck",
      title: "Batch & dispatch",
      body: "Packed by product code and colour, so delivery matches the purchase order.",
    },
  ],
} as const;

export const quality = {
  eyebrow: "Certifications & quality",
  heading: "Documents on request.\nClaims only once verified.",
  body: "Certification and compliance details publish here once ASIR Containers confirms them — nothing is asserted ahead of that.",
  note: "Awaiting verified documents. Supply the certificates and they publish here.",
  /** Ledger rows shown while documents are pending. */
  rows: [
    { label: "Quality management", value: "Awaiting document" },
    { label: "Material / food-contact declarations", value: "Awaiting document" },
    { label: "Test reports per product code", value: "On request" },
    { label: "Batch traceability", value: "Confirm with ASIR" },
  ],
};

export const cta = {
  eyebrow: "Start a conversation",
  heading: "Tell us the pack size.\nWe’ll tell you what fits.",
  body: "Send the capacity, code, closure and colour — the ASIR team replies with the matching container.",
};
