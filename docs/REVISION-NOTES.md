# Revision batch — what changed

Scope: the twelve requested changes only (product pages to be briefed separately). Nothing
was removed beyond these items, and no product data, copy claims or company facts changed.

Verified against a clean production build (`npx next build` → 26/26 routes, 17 SSG product
pages) with a Playwright walkthrough of every page at 1440×900 and 390×844:
**no console errors, no page errors, no hidden headings on screen.**

## 1. Scroll headings — per-letter rise from below

`revealLines()` in `src/lib/animations.ts` now splits with
`SplitText.create(el, { type: "lines,words,chars", mask: "lines" })` and lifts each
character out of its mask: `yPercent 120 → 0`, `rotate 2 → 0`, `power3.out`, stagger
`0.016`. Reverses on scroll-up (`onEnter` / `onEnterBack` / `onLeaveBack`). Every heading
that used the old block reveal carries `data-reveal="letters"` and runs through this path.
Body reveals (`[data-reveal]`) were softened to a 16 px rise so they support, not compete
with, the headings.

Note: a per-letter box cannot share one clipped gradient, so split headings drop the CSS
gradient and take the same wave on `color` instead (see item 2).

## 2. Continuous title animation — longer rest

- CSS `.sheen-*`: cycle lengthened to **15 s**, with the pass completing in the first 22 %
  of the cycle — roughly 3.5 s of movement, then ~11 s still.
- Split headings: GSAP colour wave, `repeat: -1`, `repeatDelay: 7.5 s`, 1.4 s in / 1.9 s
  out, accent `#E51827` (black accent on `.sheen-brand`).
- The resting colour is read **after** the gradient class is removed — reading it while the
  gradient is live returns a transparent fill, which made headings fade to nothing.

## 3. About us

Shorter heading (“Built around the pack sizes industry actually fills.”), three longer
paragraphs, and the right-side media rebuilt as a smaller three-plate arrangement
(4/5 portrait + two squares, offset) with a red keyline caption.

## 4. Counters keep running

`<Counter loop />` in `src/components/ui/Counter.tsx`: `fromTo` with `repeat: -1`,
`repeatDelay: 4.2 s`, resets to zero on each repeat. Used by the home counters band and by
the facts rule in the products masthead. `+` suffixes added where the figure is a running
count (`17+`, `26+`, `13+`); applications stay `4` because it is exact.

## 5. No unit shorthand

All `ml · L · KG`-style strings are gone. Capacities read in words (“20 Litre”, “10 KG”,
“500 ml”), and L is never converted to KG or vice versa.

## 6. Range section removed

`home/RangeIndex.tsx` deleted and unmounted. Remaining home sections were renumbered to run
`01`–`08` in page order.

## 7. Features & Advantages

Rebuilt as a numbered tab rail (hover, click or keyboard selects) feeding one white detail
plate: red-disc icon, display title, body, `NN / 06` footer. The rail auto-advances every
6.2 s and pauses on pointer/focus, so the block always reads as live.

## 8. Machinery & Manufacturing

Rebuilt as a dark stage: tall 3/4 facility plate with caption on the left, a four-stage
process timeline with a dashed red/white rail on the right, and a secondary CTA.

## 9. Certifications

Reduced to a heading, one line of copy, a request link and **three document rows**
(`Quality management`, `Food-contact declaration`, `Test reports per code`). Rows read
“Slot reserved” until `site.certifications` is populated — no certificate is invented.

## 10. CTA banner

Charcoal photo plate with an inset red block carrying the range line, a white email button,
the phone number and a “Browse the range” link.

## 11. Footer

- Address on two lines (street / city + PIN).
- Nav reduced to **Home / Products / Contact** — the Manufacturing row and the extra
  “All products” row are gone.
- Social links restyled as labelled two-column tiles with brand-coloured icons that turn red
  on hover, replacing the icon circles.

## 12. Products and Contact headers

New shared `ui/PageMasthead.tsx`, replacing the old breadcrumb-and-rule header on both pages:

- a slim meta rule across the top (section index left, key facts right — the products facts
  run as live counters);
- oversized title on the left, a red tick rule plus the intro copy on the right;
- two faint concentric brand arcs anchoring the top-right corner;
- a hairline closing the block, so it reads as a masthead rather than a hero.

Contact adds an action row under the rule — call the sales desk, email an enquiry,
directions — with business hours aligned right. Mobile stacks cleanly at 390 px.

## Files touched

- `src/lib/animations.ts` — `revealLines` letter masking, colour wave, opacity and
  resting-colour fixes; `useScrollReveal` (16 px rise, letters filtered out).
- `src/app/globals.css` — 15 s `type-sheen`, `.split-line/word/char` mask rules.
- `src/components/home/` — `AboutSection`, `CountersBand`, `AdvantagesSection`,
  `ManufacturingSection`, `QualitySection`, `ContactCTA`; `RangeIndex` deleted.
- `src/components/ui/` — `Counter` (`loop`), `PageMasthead` (new).
- `src/app/products/page.tsx`, `src/app/contact/page.tsx`, `src/components/Footer.tsx`,
  `src/data/home.ts`.
- `README.md` (motion + screenshot index), `CONTENT-NOTES.md` (certifications wording),
  `docs/screenshots/*` regenerated from the production build (23 shots).

## QA harness

- `shots/v8.mjs` — section-by-section walkthrough with assertions: no heading left at
  `opacity: 0`, no split characters stuck below their mask, no hidden `.sheen-*` headings,
  no console/page errors.
- `shots/docs-v7.mjs` — regenerates `docs/screenshots` (desktop + mobile) from the same
  build.

---

# Revision batch 2

## About us
- One paragraph removed (the “order from a single line of text” paragraph) — two remain.
- Right column rebuilt: one tall 4/5 plate with the caption and a gradient at the top, and a
  smaller square plate lapping the bottom-left corner with a white keyline. Both zoom on
  hover/focus via `.zoom-plate` (image scales 1.08 over 1 s, the frame stays put; disabled
  under `prefers-reduced-motion`).

## Contact form
- Every control now sits in a bordered well with a small uppercase label, so the field reads
  as one object instead of a floating caret over a hairline.
- Focus: border goes to ink, a 4 px ink ring fades in, the label darkens, and a 2 px brand
  bar is drawn inside the left edge. Error: brand border, brand ring, inline message with an
  icon, plus a tinted summary banner at the top of the form.
- The global red `:focus-visible` outline is suppressed inside these wells (`field-shell`) —
  it was painting a red box inside the field.

## Products page
- **Filtering no longer moves the page.** Two causes fixed: the rail was taller than the
  viewport and un-stuck (jumping ~90 px) as soon as the result set shortened, and the page
  height changed without ScrollTrigger being told. The rail is now capped to
  `calc(100vh-8rem)` with its own scroll, the results column keeps an `80vh` floor, and
  `ScrollTrigger.refresh()` runs after each result set settles. Measured rail shift and
  page shift after filtering: **0 px at 1440×900, 1280×720 and 1728×1000**.
- **Grid re-spaced:** wider gutters (`gap-x-6/7`, `gap-y-12`).
- **Card rebuilt:** image plate with hover zoom, codes, title, then a hairline with the
  finish/lock/application line and colour dots — the metadata no longer competes with the
  photograph, which is what made the grid feel cramped.
- **Active filters restyled** from loose text + × into a ruled ledger: an `ACTIVE` micro
  label, tokens separated by hairlines, each with a circular remove button that fills red on
  hover, and `Clear all` pushed to the right.

## Product inner page
- Specification table extended with **Brimful volume, Product height, GSL / OFC** and an
  **Application** row (also emitted in JSON-LD `additionalProperty`).
- New **Quality** section: the IS-Standards statement set as a pull quote against the three
  inspection gates — Incoming inspection, Impression inspection, Finished good inspection.
- New **In-process activities** section: Injection moulding, then Printing split into
  Screen Printing, HTL and Inmould labeling (IML), each with its own client mark.
- New **Machinery** section (dark): production routes with capacities (Direct machineries,
  Screen printing, HTL, IML) and the auxiliaries list with counts.
- Data for all of the above sits in `src/data/manufacturing.ts`; per-product specs live in
  `src/data/products.ts`. Values in both are placeholders — see CONTENT-NOTES §7b.

## Also changed
- Reveal trigger lines moved from 90–94 % to 95–96 % of the viewport, so a block that is
  already on screen at the fold can no longer sit invisible at the bottom edge.
- `docs/screenshots` regenerated (26 shots) and the README index updated.
