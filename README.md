# ASIR CONTAINERS — Website

Premium, animated, multi-page marketing site for **ASIR Containers**, a rigid plastic
container and industrial packaging manufacturer. Frontend only — no backend, database,
auth or CMS.

| | |
|---|---|
| Framework | Next.js 15 (App Router) + Turbopack |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 (CSS-first `@theme` tokens) |
| Animation | GSAP 3 + ScrollTrigger + SplitText + `@gsap/react`, Lenis smooth scroll, CSS icon loops |
| Icons | lucide-react |
| Package manager | npm |
| Rendering | Static (SSG) for `/`, `/products`, `/contact` and all 17 product pages |

> **Read `CONTENT-NOTES.md` before launch.** Every piece of unverified company
> information (logo, phone, email, address, certifications, testimonials) is left
> blank on purpose and renders an explicit “to be supplied” state instead of an
> invented value. Placeholder photography is labelled in the UI.

---

## Getting started

```bash
npm install
cp .env.example .env.local     # optional: set NEXT_PUBLIC_SITE_URL
npm run dev                    # http://localhost:3000 (Turbopack)
```

| Script | Purpose |
|---|---|
| `npm run dev` | Dev server with Turbopack (`next dev --turbopack`) |
| `npm run build` | Production build — type-checks and prerenders every route |
| `npm start` | Serve the production build |
| `npm run typecheck` | `tsc --noEmit` |

Node 20+ is required (developed on Node 20.20).

---

## Pages

| Route | Rendering | Notes |
|---|---|---|
| `/` | Static | Hero slider, about, counters, applications, advantages, manufacturing, certifications, testimonials, CTA |
| `/products` | Static + client filtering | Filters hydrate from `?application=&type=&capacity=&lid=&lock=&color=&q=` |
| Catalogue (nav) | External | Navbar button opens `https://www.example.com/` in a new tab — the only "Catalogue" label on the site |
| `/products/[slug]` | SSG via `generateStaticParams` | 17 product pages, unique metadata each — specs, quality statement, in-process activities, machine ledger |
| `/contact` | Static | Validated enquiry form with honest “not connected” state |
| `/sitemap.xml`, `/robots.txt` | Static | Generated from the product dataset |
| `/_not-found` | Static | Custom 404 |

---

## Design direction

The site is styled as editorial industrial print, not as a SaaS dashboard:

- **Numbered sections.** Every home page block opens with a `SectionLabel` — a red index
  (`01`–`08`) and the section name in solid ink. No dashes, no pills, no decorative rules.
  The indexes run in page order, so deleting a section means renumbering the ones after it.
- **Hairline rules only.** Structure comes from `border-line` / `border-ink` rules and
  whitespace; there are no boxed cards with borders and shadows.
- **Rounded media plates.** Photography sits in `rounded-[16px]`–`rounded-[24px]` frames
  over `#F4F4F4` / `#F1F1EF` grounds, so images read as plates rather than rectangles.
- **Banned by design review:** pills, badges, chips, tag pills, marquees and any looping
  text band. Do not reintroduce them (`ui/Marquee.tsx`, `ui/RotatingWord.tsx`,
  `home/RibbonBand.tsx`, `home/RangeTicker.tsx` were deleted for this reason).
- **Contrast floor.** Body copy is `--color-mid` `#333333` or darker; on dark sections it is
  `text-white/85`. Nothing lighter than that is used for text — placeholders included.
- **The word "catalogue" appears exactly once,** on the navbar button. Everything else uses
  "range", "products" or "containers". Keep it that way.
- **Red is strategic.** Brand red appears on the primary CTA, section indexes, application
  dots and single accent rules — never as a background wash for body sections.
- **Layouts vary by section:** widening image panels (applications), a numbered tab rail
  feeding one white detail plate (advantages), a charcoal process timeline (manufacturing),
  a three-row document register (certifications), and an asymmetric video wall
  (testimonials). No two blocks share the same skeleton.

---

## Project structure

```
src/
├── app/
│   ├── layout.tsx              # Fonts, metadata, header/footer, no-JS guard
│   ├── page.tsx                # Home
│   ├── globals.css             # Design tokens, utilities, motion primitives
│   ├── products/page.tsx       # Catalogue (application filters + code search)
│   ├── products/[slug]/page.tsx# Product template + JSON-LD
│   ├── contact/page.tsx        # Contact
│   ├── sitemap.ts / robots.ts
│   └── not-found.tsx
├── components/
│   ├── Header.tsx  Footer.tsx
│   ├── home/                   # Hero, about, counters, applications, advantages…
│   ├── products/               # Catalogue, filters, product card, product media
│   ├── motion/SmoothScroll.tsx # Lenis + ScrollTrigger wiring
│   ├── contact/ContactForm.tsx
│   ├── motion/Reveal.tsx       # Client animation boundary for server markup
│   └── ui/                     # Button, Logo, AnimatedIcon, Counter, SectionLabel, VideoModal
├── data/
│   ├── products.ts             # Single source of truth for the range
│   ├── site.ts                 # Company details, nav, certifications, testimonials
│   └── home.ts                 # Home page editorial copy
└── lib/
    ├── animations.ts           # Shared GSAP helpers + plugin registration
    └── colors.ts               # Colour swatches
public/images/                  # Placeholder photography (see CONTENT-NOTES.md)
                                #   hero/ categories/ facility/ families/ detail/
docs/screenshots/               # Current production-build screenshots (desktop + mobile)
```

### Data flow

`src/data/products.ts` is the only place products are defined. Categories, filter
options, counts, related products, static params, sitemap entries and JSON-LD are all
**derived** from it. Adding a product record adds a page, a card, filter facets and a
sitemap entry with no component changes.

---

## Animation system

`src/lib/animations.ts` registers GSAP plugins once and exports the patterns used across
the site, so timelines are never duplicated in components:

| Helper | Use |
|---|---|
| `useScrollReveal(scope)` | Animates every `[data-reveal]` / `[data-reveal-mask]` descendant |
| `revealLines(el)` | SplitText per-letter masked rise for headings (+ colour wave) |
| `revealMasks(scope)` | Clip-path wipes for components with their own timeline |
| `parallax(el)` | Scrubbed media parallax (desktop only) |
| `entrance(targets)` | Page-load fade/rise |
| `attachMagnetic(el)` | Optional pointer-follow for CTAs (hover devices only) |
| `reduceMotion()` | Single reduced-motion check used by every helper |

Ambient motion is compositor-only CSS (`src/app/globals.css`) with no per-element
JavaScript, and every loop stops under `prefers-reduced-motion`:

| Class | Use |
|---|---|
| `.icon-spin` `.icon-float` `.icon-pulse` `.icon-swing` `.icon-travel` | Animated icons |
| `.ambient-media` / `.ambient-media-slow` | Slow zoom drift on photography (hero, cards, family thumbnails, detail shots) |
| `.ambient-progress` | Red progress rule that times the auto-advancing panels and rows |
| `.ambient-ring` | Expanding ring on the testimonial play control |
| `.ambient-sheen` | Soft light sweep across the reserved video plates |
| `.ambient-breathe` | Gentle opacity pulse on decorative marks |

**Scroll headings: a per-letter rise.** Every headed block animates through
`revealLines()`: SplitText breaks the heading into lines, words and characters behind a
`mask: "lines"`, then each character lifts from below (`yPercent 120 → 0`, `rotate 2 → 0`,
`power3.out`, stagger `0.016`). The rise reverses when the heading leaves the top of the
viewport.

**Always-running type.** Headings marked `.sheen-ink` / `.sheen-light` / `.sheen-brand`
keep a red highlight travelling through the glyphs on a 15 s cycle: one pass in the first
22 % of the cycle, then a long rest. Because a SplitText char box cannot share one clipped
gradient, `revealLines()` drops the gradient and paints the same wave on `color` instead
(one slow pass, `repeatDelay` 7.5 s). Never re-apply `background-clip: text` to a split
heading — the letters go blank.

**Scroll-reverse.** Every reveal is reversible: elements play in on scroll down and play
back out when scrolled up past the trigger (`onEnter` / `onEnterBack` / `onLeaveBack`
callbacks, not `toggleActions`, which proved unreliable with nested triggers). Counters
loop forever with `+` where the figure is a running count. Content is never hidden when it
is on screen.

**Dual-colour highlights.** Numbers, product codes and capacities are set in brand red
(`text-brand`) against black body copy — counters, application counts, card capacities,
product-page codes and the section index numbers.

**Continuously running "active" states.** The application panels and the advantages list
advance on their own (5.6 s / 5.8 s, one shared interval each, paused on hover) and show a
red progress rule on the open item, so the group always reads as live without the user
touching it. Product cards, hero slides and image plates carry the same slow zoom, which is
what makes an image feel alive rather than pasted in.

There are **no marquees and no looping text bands** anywhere in the site: they were removed
by design review.

Scroll reveals were deliberately slowed (0.95–1.35 s, staggered) so the motion reads
rather than snaps; the hero cross-fade is 1.55 s and autoplay is 7.5 s per slide.

Conventions
- All animation code lives in small client islands; page bodies stay server components.
- `useGSAP` handles cleanup/revert on unmount. SplitText instances are reverted explicitly.
- **No-JS and reduced-motion safe:** hidden states are applied only after the `js` class is
  set on `<html>` at first paint, and every helper short-circuits under
  `prefers-reduced-motion`. Content is always present in the static HTML.
- **Lenis** smooth scrolling (`SmoothScroll.tsx`) is wired into `ScrollTrigger.update`,
  intercepts in-page anchors, resets on route change, and is skipped entirely under
  reduced-motion. Elements that must scroll natively (filter drawer, video modal, mobile
  menu) carry `data-lenis-prevent`.

---

## Product data rules (implemented as code)

The range is transcribed from the client's final product table (S.No 1–17).

- **One record per table row.** Records with different product codes stay separate: the two
  1 litre pails (P1a, P1b) and the two 20 litre pails (P20a, P20b) are four records.
- **Applications come from the Y marks.** `application` / `type` filters read the
  `applications` array that mirrors the Paint / Agro / Food / Lube columns; nothing is
  inferred or upgraded.
- **Codes are first-class.** `codes.plain` (Plain) and `codes.tin` (Tin/Sp.) are shown on
  cards, detail pages, JSON-LD and searchable from the products filter bar.
- **Lids are derived from the codes**, not assumed: Plain → Flat Lid, Tin/Sp. → Tind Lid.
  A container with no Tin/Sp. code therefore filters as plain-only.
- **`ml`, `L` and `KG` never mix.** Capacity keeps its own unit, is sorted per unit and is
  never converted; 1 KG is not treated as 1 L.
- **Locks** only render for the F-series containers that declare them.
- **Colours follow the supplied rules** — Paint/Lube: White, Green, Red; Agro: Green;
  Food: White, Black — with a per-product `colorsOverride` escape hatch.
- **Counters are computed**, not typed: 17 containers / 26 codes / 4 applications /
  13 capacities all derive from the dataset.

---

## Accessibility & performance

- Semantic landmarks (`header`/`main`/`footer`/`nav`), one `h1` per page, labelled sections.
- Skip link; visible focus rings; keyboard-operable slider, filters, drawer and modal
  (Escape closes, focus trapped in the video modal).
- Filters are real checkboxes/`fieldset`+`legend`; state mirrored to the URL via
  `history.replaceState` (no navigation, no reload).
- Images use `next/image` with explicit aspect ratios to avoid layout shift.
- `prefers-reduced-motion` disables autoplay, pins, parallax and split animations.
- Production build: 26 static routes, ~102 kB shared JS, ~160–180 kB first-load per page.

### Bundle notes
- `lucide-react`, `gsap` and `@gsap/react` are in `optimizePackageImports`.
- GSAP SplitText is imported only in the hero and heading helpers.
- Images are pre-sized placeholders served from `/public`; `images.unoptimized` is set so
  the statically exported assets are predictable. Switch to the Next image optimizer (or
  sharp at build time) when the client's real photography arrives.

---

## SEO readiness

Already in place: per-page titles/descriptions, canonical URLs, Open Graph/Twitter cards,
`metadataBase`, semantic HTML, clean product URLs, sitemap and robots, Organization +
Product + BreadcrumbList JSON-LD (Product markup deliberately omits offers, SKUs and specs
until verified data exists).

Still to do later: final keyword research, real `NEXT_PUBLIC_SITE_URL`, OG image design,
`hreflang` if regional variants appear, and Product/Offer markup once price or MOQ data is
approved.

---

## Deployment

Static-friendly. On Vercel: import the repo, set `NEXT_PUBLIC_SITE_URL`, deploy. Any Node
host works with `npm run build && npm start`. No environment secrets are required.

---

## Screenshots

Captured from the production build (`npm run build && npm start`) at 1440×900 and 390×844.

| File | View |
|---|---|
| `docs/screenshots/01-home-hero.png` | home hero |
| `docs/screenshots/02-home-about.png` | home about — plate with hover zoom |
| `docs/screenshots/03-home-counters.png` | home counters |
| `docs/screenshots/04-home-applications.png` | home applications |
| `docs/screenshots/05-home-advantages.png` | home advantages — tab rail + panel |
| `docs/screenshots/06-home-manufacturing.png` | home manufacturing — dark process timeline |
| `docs/screenshots/07-home-quality.png` | home certifications — document register |
| `docs/screenshots/08-home-testimonials.png` | home testimonials |
| `docs/screenshots/09-home-nav-dropdown.png` | home nav dropdown |
| `docs/screenshots/10-products-header.png` | products masthead |
| `docs/screenshots/11-products-grid.png` | products grid |
| `docs/screenshots/12-products-filtered.png` | products filtered (Food) |
| `docs/screenshots/13-product-top.png` | product top |
| `docs/screenshots/14-product-specs.png` | product specifications |
| `docs/screenshots/15-product-inspection.png` | product page — quality statement + inspection gates |
| `docs/screenshots/16-product-process.png` | product page — in-process activities + printing routes |
| `docs/screenshots/17-product-machinery.png` | product page — machine ledger |
| `docs/screenshots/18-product-related.png` | product related |
| `docs/screenshots/19-contact-header.png` | contact masthead |
| `docs/screenshots/20-contact-form.png` | contact form |
| `docs/screenshots/21-contact-validation.png` | contact validation |
| `docs/screenshots/22-mobile-home.png` | mobile home |
| `docs/screenshots/23-mobile-menu.png` | mobile menu |
| `docs/screenshots/24-mobile-products.png` | mobile products |
| `docs/screenshots/25-mobile-contact.png` | mobile contact |
| `docs/screenshots/26-home-footer.png` | home footer |
| `docs/screenshots/02-home-about.png` | home about |
| `docs/screenshots/03-home-counters.png` | home counters |
| `docs/screenshots/04-home-applications.png` | home applications |
| `docs/screenshots/05-home-advantages.png` | home advantages — tab rail + panel |
| `docs/screenshots/06-home-manufacturing.png` | home manufacturing — dark process timeline |
| `docs/screenshots/07-home-quality.png` | home certifications — document register |
| `docs/screenshots/08-home-testimonials.png` | home testimonials |
| `docs/screenshots/09-home-nav-dropdown.png` | home nav dropdown |
| `docs/screenshots/10-products-header.png` | products masthead |
| `docs/screenshots/11-products-grid.png` | products grid |
| `docs/screenshots/12-products-filtered.png` | products filtered (Food) |
| `docs/screenshots/13-product-top.png` | product top |
| `docs/screenshots/14-product-specs.png` | product specs |
| `docs/screenshots/15-product-related.png` | product related |
| `docs/screenshots/16-contact-header.png` | contact masthead |
| `docs/screenshots/17-contact-form.png` | contact form |
| `docs/screenshots/18-contact-validation.png` | contact validation |
| `docs/screenshots/19-mobile-home.png` | mobile home |
| `docs/screenshots/20-mobile-menu.png` | mobile menu |
| `docs/screenshots/21-mobile-products.png` | mobile products |
| `docs/screenshots/22-mobile-contact.png` | mobile contact |
| `docs/screenshots/23-home-footer.png` | home footer |
