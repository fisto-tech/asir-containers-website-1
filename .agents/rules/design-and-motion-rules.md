# Premium Design & Motion Engineering Rules (Anti-AI Cliché Standard)

You are tasked with building and refining a world-class, award-winning (Awwwards/FWA caliber) website for **Asir Containers**. Follow these strict design, animation, and engineering instructions. Never generate generic "AI-style" website templates.

---

## 1. Strictly Forbidden "AI Generated" Clichés

1. **NO Generic SaaS Pills & Badges**:
   - Never use rounded pill badges (e.g., `<span className="rounded-full bg-blue-500/10 border border-blue-500/20 px-3 py-1 text-xs">...</span>`).
   - Instead, use technical editorial indicators: 1px hairline rules, architectural section counters (`01 // OVERVIEW`), crosshair markers (`+`), or monospace index labels.
2. **NO Web3 / AI Neon Blue & Purple Gradients**:
   - Avoid generic indigo-to-purple or cyan-to-violet linear gradients and fuzzy mesh gradient blobs.
   - Use tangible, material-inspired color stories: deep charcoal, warm graphite, terracotta / corten steel, olive bronze, champagne, warm alabaster, and architectural accents.
3. **NO Static Black-and-White Sterile Templates**:
   - Avoid pure `#000000` text on `#FFFFFF` backgrounds with no depth, warmth, or atmosphere.
   - Introduce subtle depth, ambient warm lighting, atmospheric backdrops, and rich layered tonality.
4. **NO Generic 3-Column Uniform Card Grids**:
   - Avoid repeated identical rectangular cards with a top icon, title, and short paragraph.
   - Use asymmetrical layouts, broken grids, interactive showcases, horizontal pinning strips, split screens, and dynamic editorial compositions.

---

## 2. Motion & Animation Standards (GSAP + Lenis + React)

The website already includes **GSAP**, `@gsap/react`, and **Lenis** smooth scrolling. Use them to deliver a fluid, high-end experience:

1. **Kinetic Typography & Reveals**:
   - Wrap titles in overflow-hidden containers for masked slide-up reveals (`y: "100%"` to `y: 0`).
   - Use staggered character/word animations for primary headlines rather than simple opacity fades.
2. **Scroll-Driven Micro-Interactions**:
   - Implement ScrollTrigger scrub animations for image parallax, scale-ups, and pinning sections.
   - Use horizontal scroll progression for product series, specifications, or timelines.
3. **Clip-Path Transitions**:
   - Reveal images and cards with dynamic geometric clip paths (e.g., `polygon(...)` or directional wipes) rather than instant appearances.
4. **Magnetic & Fluid Cursor Interactions**:
   - Interactive elements (buttons, project cards, media) should feel alive with magnetic pull, scale shifts, and contextual cursor labels ("Explore", "Drag", "View").
5. **Silky Smooth Easings**:
   - Always use luxurious custom easing curves (e.g., `power3.out`, `power4.inOut`, `expo.out`) instead of standard linear or default browser transitions.

---

## 3. Visual Craft & Architecture

1. **Industrial & Architectural Prestige**:
   - Reflect physical materials: steel, corrugated patterns, technical blueprint grids, fine engineering lines, precision metrics.
   - High contrast between large editorial display type and delicate technical monospace details.
2. **Layering & Depth**:
   - Use foreground/background depth layering, subtle ambient grain/textures, and glassmorphic surface reflections with crisp 1px borders.
3. **Interactive Product & Feature Showcases**:
   - Make container specifications, models, and capabilities interactive (e.g., tabbed technical blueprints, dimension sliders, interactive exploded views or 3D-feel switches).

---

## 4. Code & Architecture Quality

1. Always preserve clean Next.js 15 App Router and React 19 standards.
2. Clean up GSAP contexts using `useGSAP` from `@gsap/react` to prevent memory leaks or jitter.
3. Keep animations performance-optimized (use `transform`, `opacity`, and GPU-accelerated properties; never animate layout-triggering properties like `width`, `height`, or `top`).
4. Ensure full responsive fidelity across mobile, tablet, desktop, and ultra-wide screens.
