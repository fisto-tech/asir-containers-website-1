/**
 * ASIR CONTAINERS — single source of truth for company-level content.
 *
 * ⚠️ UNVERIFIED CONTENT
 * Company details (phone, email, address, certifications, testimonials, social
 * links) were NOT supplied with the brief. Every such field is `null` or an
 * empty array on purpose: the UI renders an explicit "to be supplied" state
 * instead of inventing a value. Fill these in and the site updates everywhere.
 * See CONTENT-NOTES.md for the full replacement checklist.
 */

export type EnquiryType =
  | "Product enquiry"
  | "Bulk / distributor enquiry"
  | "Custom colour or branding"
  | "Technical / specification"
  | "Other";

export const site = {
  name: "ASIR Containers",
  legalName: "ASIR Containers", // confirm registered entity name
  shortName: "ASIR",
  tagline: "Rigid plastic packaging, engineered for industry.",
  description:
    "ASIR Containers manufactures rigid plastic pails and containers for the paint, agro, food and lubricant industries — in round and square formats, with multiple closure options and industry-specific colour availability.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.asircontainers.com",

  /** PLACEHOLDER logotype — replace with the supplied ASIR Containers logo file. */
  logo: {
    supplied: false,
    note: "Typographic stand-in used until the official logo file is supplied.",
    src: null as string | null,
    alt: "ASIR Containers",
  },

  /**
   * ⚠️ DUMMY VALUES — replace before launch.
   * These are stand-ins so the layout can be reviewed with real-looking content.
   * They are NOT ASIR Containers' real phone, email or address.
   */
  contact: {
    phone: "+91 98765 43210" as string | null,
    phoneAlt: null as string | null,
    email: "sales@asircontainers.com" as string | null,
    salesEmail: null as string | null,
    addressLines: [
      "1 734-c1, Pallapatti Rd, near Central Excise Office",
      "Thiruthangal, Sivakasi, Tamil Nadu 626130",
    ] as string[],
    city: "Sivakasi" as string | null,
    region: "Tamil Nadu" as string | null,
    postalCode: "626130" as string | null,
    country: "India",
    businessHours: ["Mon–Sat: 9:00 – 18:00"] as string[],
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3935.4450587842034!2d77.8132596!3d9.4699615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b06cfbcb375cea3%3A0xca55b187bf45fd00!2sAsir%20Containers!5e0!3m2!1sen!2sin!4v1793099969746!5m2!1sen!2sin",
  },

  /** ⚠️ DUMMY social links — replace with ASIR Containers' real profiles. */
  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com/", icon: "linkedin" },
    { label: "Instagram", href: "https://www.instagram.com/", icon: "instagram" },
    { label: "Facebook", href: "https://www.facebook.com/", icon: "facebook" },
    { label: "YouTube", href: "https://www.youtube.com/", icon: "youtube" },
  ] as { label: string; href: string; icon: string }[],

  /** Certifications: publish ONLY verified documents. */
  certifications: [] as {
    name: string;
    issuer: string;
    reference?: string;
    validUntil?: string;
    image?: string;
  }[],

  /** Video testimonials: only real, approved customer footage. */
  testimonials: [] as {
    id: string;
    customer: string;
    designation?: string;
    company: string;
    quote?: string;
    videoSrc?: string;
    poster?: string;
  }[],

  /** Number of video testimonial slots the layout reserves on the home page. */
  testimonialSlots: 3,

  enquiryTypes: [
    "Product enquiry",
    "Bulk / distributor enquiry",
    "Custom colour or branding",
    "Technical / specification",
    "Other",
  ] as EnquiryType[],
};

/**
 * Primary navigation — Home, Products, Contact only.
 * `Products` carries an application submenu; the manufacturing section is
 * reachable from the footer instead of the top bar.
 */
export const navigation = [
  { label: "Home", href: "/", hasMenu: false },
  { label: "Products", href: "/products", hasMenu: true },
  { label: "Contact", href: "/contact", hasMenu: false },
];

/** True when a contact detail still needs to be supplied by the client. */
export const isPending = (value: string | null | undefined) => !value;
