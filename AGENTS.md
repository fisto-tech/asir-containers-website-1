# Asir Containers — Workspace Guidelines & Rules

All code and design updates in this workspace must strictly adhere to the following standards:

## 1. Zero AI-Cliché Policy
- **No generic SaaS pills or badges**: Do not use pill-shaped chips or tags (`rounded-full bg-*-500/10`). Use technical architectural markers (`01 //`, hairlines, crosshairs).
- **No blue-to-purple neon gradients**: Avoid web3/AI generic gradients. Use architectural and material palettes (corten/terracotta rust, deep charcoal, warm alabaster, bronze, olive).
- **No static black & white monotony**: Incorporate rich depth, ambient warm lighting, and layered atmospheric styling.
- **No repetitive 3-column card layouts**: Use asymmetrical compositions, split layouts, horizontal pinning, and interactive viewers.

## 2. Motion & Animation First (GSAP & Lenis)
- The site uses **GSAP** (`gsap`, `@gsap/react`) and **Lenis** smooth scrolling.
- All major headings and sections must incorporate fluid, masked entrance animations (overflow-hidden slide-ups, clip-path reveals, staggered typography).
- Incorporate scroll-driven parallax, image scrub scaling, and section pinning where applicable.
- Buttons and cards must feature responsive, magnetic micro-interactions and smooth easing curves (`power3.out`, `expo.out`).

## 3. Engineering Quality
- Keep Next.js 15 (App Router) and React 19 code clean and modular.
- Always manage animations cleanly with `@gsap/react`'s `useGSAP` hook for proper garbage collection and SSR safety.
- Animate only GPU-accelerated properties (`transform`, `opacity`, `clip-path`).
