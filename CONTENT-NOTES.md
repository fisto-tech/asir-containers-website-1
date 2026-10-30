# ASIR CONTAINERS — Content & asset checklist

This build is deliberately **claim-free**. Anything ASIR Containers has not confirmed is
rendered as an explicit “to be supplied” state rather than invented. This file lists every
such item, what to supply, and exactly where it goes.

---

## 1. Assets to replace (all placeholder photography is labelled in the UI)

| File | Currently | Replace with |
|---|---|---|
| `public/images/hero/hero-01.jpg` | AI-generated factory scene with white pails | Real plant / product hero (landscape, ≥2400px wide) |
| `public/images/hero/hero-02.jpg` | Square pail studio shot | Real square-pail product photography |
| `public/images/hero/hero-03.jpg` | Moulding tool detail | Real machine/tooling photography or a hero video |
| `public/images/categories/paint.jpg` | White round 20L pail | Paint pail packshot |
| `public/images/categories/agro.jpg` | Green square pail | Agro / fertilizer pail packshot |
| `public/images/categories/food.jpg` | White square pail | Food pail packshot (curd / ghee / oil) |
| `public/images/categories/lube.jpg` | Red round pail | Lubricant pail packshot |
| `public/images/facility/machinery-01.jpg` | Injection moulding hall | Actual factory machinery photos/video |
| `public/images/facility/machinery-02.jpg` | Warehouse with pails | Actual storage/dispatch area |
| `public/images/facility/labelling.jpg` | Print / labelling line | Real finishing or inspection station |
| `public/images/facility/dispatch.jpg` | Dispatch bay with wrapped pallets | Real dispatch or finished-goods storage |
| `public/images/families/paint-pail.jpg` | P-series pail packshot | Paint pail packshot |
| `public/images/families/storage-pail.jpg` | K-series pail packshot | Storage pail packshot |
| `public/images/families/round-pail.jpg` | A-series 5 L pail | Round pail packshot |
| `public/images/families/square-pail.jpg` | F-series square pail | Square pail packshot |
| `public/images/detail/lid-tind.jpg` | Lid with tamper band | Real Tind-lid close-up |
| `public/images/detail/stacked-pails.jpg` | Stacked pails | Real stacking photograph |
| `public/images/clients/nordlac.svg` | Fictional client mark (Screen Printing) | Approved client logo |
| `public/images/clients/agrovista.svg` | Fictional client mark (HTL) | Approved client logo |
| `public/images/clients/fernline.svg` | Fictional client mark (IML) | Approved client logo |

Notes
- `public/images/families/` feeds the range-index thumbnails; `public/images/detail/` feeds
  the two detail plates under the product packshot. All are representative renders, not
  ASIR stock.
- Product records currently share the seven category/facility images. Once per-SKU packshots exist, point
  each record's `image` / `imageAlt` in `src/data/products.ts` at its own file. The product
  template also supports additional gallery images if you add them.
- Each product page carries a one-line “Representative image — studio packshot to be
  supplied” caption — remove the `<ProductMedia>` caption in
  `src/components/products/ProductMedia.tsx` as real art lands.
- The manufacturing band notes beside the image that the facility photography is
  representative (`src/components/home/ManufacturingSection.tsx`) — remove that note with
  the real imagery.
- `/process` and `/technologies` reuse the existing hero and plant plates rather than new
  files. `/process`: `hero/hero-01.jpg` + `facility/machinery-01.jpg` (masthead spread),
  `facility/labelling.jpg`, `hero/hero-03.jpg` and `families/paint-pail.jpg` (the three
  in-process routes), `detail/stacked-pails.jpg` (quality band) and
  `facility/dispatch.jpg` (closing banner). `/technologies`:
  `facility/machinery-01.jpg` + `facility/machinery-02.jpg` (masthead spread) and
  `facility/labelling.jpg` (closing banner). No "representative photography" caption is
  shown in the UI any more; to swap in real plant photography, edit the `src` values in
  `components/process/ProcessHero.tsx`, `components/process/InProcessStages.tsx`,
  `components/process/QualityStatement.tsx`, `components/technologies/TechHero.tsx` and the
  two page files. The contact band uses its own derived asset,
  `public/images/contact/contact-hero.jpg` (a 2:1 re-frame of
  `detail/stacked-pails.jpg` with mirrored edges); replace that file when real
  studio photography lands.

---

## 1b. ⚠️ DUMMY CONTACT DETAILS ARE LIVE

The footer and contact page now render **placeholder** contact data so the layout can be
reviewed. These are NOT real and must be replaced in `src/data/site.ts` before launch:

| Field | Current dummy value |
|---|---|
| Phone | `+91 98765 43210` |
| Email | `sales@asircontainers.com` |
| Address | Plot 00, SIDCO Industrial Estate, Coimbatore, Tamil Nadu 641 000 |
| Hours | Mon–Sat: 9:00 – 18:00 |
| Social | linkedin.com · instagram.com · facebook.com · youtube.com (homepages, not ASIR profiles) |

The map card links to a Google Maps search for the address above.

---

## 2. Company identity

| Item | Where | Status |
|---|---|---|
| Official logo (SVG preferred) | `site.logo.src` in `src/data/site.ts`, used by `src/components/ui/Logo.tsx` | **Not supplied** — a typographic stand-in (`A` mark + ASIR CONTAINERS wordmark) is used. It is a clearly functional placeholder, not an invented brand mark. |
| Registered entity name | `site.legalName` | Currently “ASIR Containers” — confirm |
| Phone / alternate phone | `site.contact.phone`, `phoneAlt` | **Not supplied** — footer, contact page and mobile menu say “to be supplied” |
| Email / sales email | `site.contact.email`, `salesEmail` | **Not supplied** |
| Address lines, city, region, postal code | `site.contact.*` | **Not supplied** — no map is embedded because no verified address exists |
| Business hours | `site.contact.businessHours` | **Not supplied** |
| Social links | `site.social[]` | **Not supplied** — the footer block renders only when populated |
| Site URL | `.env.local → NEXT_PUBLIC_SITE_URL` | Defaults to `https://www.asircontainers.com` — confirm the live domain |

---

## 3. Certifications (section is built and empty by design)

`site.certifications` ships as an empty array. The home page therefore renders three
document rows marked “Slot reserved” plus a client note — **no certificate name, number,
issuer or validity date is invented anywhere.**

To publish:
```ts
certifications: [
  { name: "ISO 9001:2015", issuer: "<certifying body>", reference: "<cert no.>", validUntil: "2027-03-31", image: "/images/certs/iso.jpg" },
]
```
The section switches from reserved rows to real document rows automatically (`QualitySection.tsx`). Please also confirm
whether any technical claim used in marketing (e.g. food-grade, leak-proof) is certified
before adding it to copy — the current copy avoids all such claims.

---

## 4. Video testimonials (slots reserved, nothing faked)

`site.testimonials` ships empty, so the home page shows three reserved video slots
labelled “Awaiting footage”. No customer names, designations, companies or quotes are
invented, and no video autoplays with sound (the modal player requires a click).

To publish:
```ts
testimonials: [
  { id: "t1", customer: "Name", designation: "Purchase Head", company: "Company Ltd",
    quote: "Optional approved quote", videoSrc: "/videos/testimonial-1.mp4",
    poster: "/images/testimonials/t1.jpg" },
]
```
Supply 2–3 approved clips (16:9, H.264 MP4, ≤30 MB, with poster frames) and written sign-off.

---

## 5. Product data — transcribed, with two assumptions to confirm

The catalogue now mirrors the client's final product table (S.No 1–17), including the
Plain and Tin/Sp. product codes and the exact Paint / Agro / Food / Lube Y marks.

| S.No | Container | Plain | Tin/Sp. | Paint | Agro | Food | Lube |
|---|---|---|---|---|---|---|---|
| 1 | 500 ml | P/2 | — | ✓ | ✓ | ✓ | |
| 2 | 1 Litre | P1a | — | ✓ | ✓ | | |
| 3 | 1 Litre | P1b | — | ✓ | ✓ | | |
| 4 | 4 Litre | P4 | — | ✓ | ✓ | | |
| 5 | 10 litre | P10p | P10t | ✓ | ✓ | ✓ | |
| 6 | 20 litre | P20ap | P20at | ✓ | ✓ | ✓ | |
| 7 | 20 litre | P20bp | P20bt | ✓ | ✓ | ✓ | |
| 8 | 1 Kg | K1 | — | ✓ | | ✓ | |
| 9 | 2 Kg | K2 | — | ✓ | | ✓ | ✓ |
| 10 | 5 Kg | K5 | — | ✓ | | ✓ | ✓ |
| 11 | 10 Kg | K10p | K10t | ✓ | ✓ | | |
| 12 | 20 Kg | K20p | K20t | ✓ | | | ✓ |
| 13 | 5 litre round | A5 | — | | ✓ | | ✓ |
| 14 | 15 Litre Interlock | F15p | F15s | | | ✓ | |
| 15 | 17 Litre square interlock | F17ip | F17is | | | ✓ | |
| 16 | 17 Litre square outer lock | F17op | F17os | | | ✓ | |
| 17 | 5 litre square interlock | F5p | F5s | | | ✓ | |

**Assumptions to confirm (the only two in the dataset):**

1. **Plain → "Flat Lid", Tin/Sp. → "Tind Lid".** The table supplies the codes, not the lid
   names; the earlier brief lists the two lid options as *Flat Lid* and *Tind Lid*, so the
   two are mapped to the two code columns. "Tind Lid" spelling is preserved as supplied —
   confirm whether that is the intended technical term. This mapping drives the
   finish/lid filter (10 containers have a Tin/Sp. variant, 7 are plain-only).
2. **Container format families** used for grouping and copy: P-series → "Paint Pail",
   K-series → "Storage Pail", A5 → "Round Pail", F-series → "Square Pail". This is a
   labelling choice only; no capacity or specification is inferred.

Colour availability still follows the brief's rule (Paint/Lube: White, Green, Red;
Agro: Green; Food: White, Black) applied to each container's applications. If specific
containers differ, set `colorsOverride` on that record.

Still not supplied (and deliberately absent from the site): dimensions, weights, material
grade, MOQ, lead time, pallet quantities and per-SKU photography.

## 6. Enquiry form — integration required before launch

`src/components/contact/ContactForm.tsx` validates name, company, email, phone, enquiry
type and message, pre-fills from `?product=<slug>`, and shows inline errors. On a valid
submit it shows an explicit notice that **nothing was sent** — this is intentional honesty
for a frontend-only build, not a bug.

To make it live, replace the simulated delay with one of:
- a Next.js route handler (`src/app/api/enquiry/route.ts`) that forwards to email/CRM, or
- a form service (Formspree / Basin / Web3Forms) via `fetch(formEndpoint, …)`, or
- your CRM's intake API.

Keep the honeypot field and the validation. Also add a privacy note / consent line stating
how long enquiries are retained.

---

## 7. Copy that intentionally makes no claim

The supplied references use phrases such as “leak proof”, “food-grade”, “heat resistant”
and “microwave safe”. Those are **technical claims** the brief forbids without
verification, so the copy describes formats, capacities, closures, colours and industry
applications only. If ASIR Containers confirms and can document specific properties, add
them to the advantages list in `src/data/home.ts` and remove the “claims only once
verified” note in `QualitySection.tsx`.

Company facts (founding year, years of experience, plant count, capacity, employee count,
client names) were **not supplied** and are **not stated**. The numbers shown on the home
page are computed from the catalogue itself (17 containers, 26 codes, 4 applications,
13 capacity options) and update
automatically — nothing is hard-coded as a business statistic.

---

## 7b. Product-page specifications and plant data (placeholder figures in use)

The product template now prints five more fields and three plant sections. The **structure**
is final; the **figures** are placeholders supplied for this build and are not client data.
Replace them at the sources below — no component edits needed.

| Field | Where it lives | Current state |
|---|---|---|
| Brimful volume | `specs.brimful` in `src/data/products.ts` (per record) | Placeholder per capacity |
| Product height | `specs.height` in `src/data/products.ts` | Placeholder per capacity |
| GSL / OFC | `specs.gslOfc` in `src/data/products.ts` | Placeholder per capacity |
| Capacity, application, codes, lid, lock, colour | Derived from the product table | Real, from the supplied table |
| Quality statement (IS Standards) | `qualityStatement.quote` in `src/data/manufacturing.ts` | Verbatim from the client brief |
| Inspection gates | `inspectionStages` in `src/data/manufacturing.ts` | Titles from the brief; supporting lines written to match |
| In-process activities | `inProcess` in `src/data/manufacturing.ts` | Titles from the brief |
| Client logos per printing route | `inProcess.printing.routes[].logo` | Fictional placeholder marks in `public/images/clients/` |
| Machine capacities | `machinery.production.rows` | Placeholder tonnage / colour / cavity counts |
| Auxiliaries list | `machinery.auxiliaries.rows` | Placeholder equipment list and counts |

Supply the measured drawing values per code (height mm, brimful volume, GSL/OFC) and the
real machine list, and these pages are correct without further design work.

---

## 8. Pre-launch checklist

- [ ] Drop in real logo, product, factory and certificate assets; remove the placeholder captions
- [ ] Fill `src/data/site.ts` (contact, social, legal name, domain)
- [ ] Publish verified certifications and approved testimonial videos
- [ ] Confirm lid/lock/colour availability per SKU; tighten `lids`
- [ ] Replace placeholder product specifications (height, brimful volume, GSL/OFC) with measured values
- [ ] Confirm the IS-Standards quality statement with the plant before publishing
- [ ] Replace the three placeholder client logos with approved marks
- [ ] Replace the placeholder machine capacities and auxiliaries list
- [ ] Connect the enquiry form to an endpoint
- [ ] Set `NEXT_PUBLIC_SITE_URL` and verify canonical/OG tags in production
- [ ] Run a final accessibility pass (axe/Lighthouse) and validate JSON-LD
- [ ] Decide whether to enable Next image optimisation once real photography is in place
