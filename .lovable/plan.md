# Hero rework: new headline, tools CTA, mobile-safe layout, refined animation

## Content and copy

- Headline becomes **"Computational automation from Design to Fabrication"**, set as a three-line stack with a tighter clamp so it never collides with the nav or the 3D object:
  - desktop: left-aligned, `clamp(2.2rem, 5vw, 4.2rem)`, max-width ~14ch per line
  - mobile: smaller clamp, positioned below the nav with real top padding instead of a fixed offset
- Supporting copy rewritten for a computational design studio, e.g. parametric geometry, Grasshopper-driven automation, and design-to-fabrication pipelines. The lower-left technical note becomes a short capability line instead of the Three.js description.
- Two buttons side by side, bottom right (stacked full-width on mobile):
  - primary "Explore Tools" → scrolls/links to the tools section anchor (`/#tools`)
  - secondary "View Our Work" → `/#work` (outline style using existing tokens)
- A `#tools` section placeholder is added below the hero so the CTA has a real destination — a short heading plus cards for the upcoming browser-based Grasshopper tools. The page becomes scrollable instead of a locked `h-screen`.

## Mobile layout fixes

- Hero switches from absolutely-positioned blocks to a flex column with safe padding; absolute placement only kicks in at `sm:`/`lg:`.
- Nav collapses to logo + a compact menu button on small screens, stays pinned with its own z-layer, and no longer sits under the headline.
- Every text/CTA row follows the grid + `min-w-0` + `shrink-0` pattern so nothing clips at 360px.
- Footer tag row wraps and hides duplicates on mobile.

## Animation refinement (`VesperScene.tsx`)

- **Performance:** particle count becomes adaptive — ~40k on desktop, ~12k on tablets, ~6k on mobile (based on width + `devicePixelRatio` + `hardwareConcurrency`). Pixel ratio capped at 1.5 on small screens. Respect `prefers-reduced-motion` by skipping the burst and holding a calm state.
- **Transition:** particles now land exactly on wireframe vertices (unique-ish assignment rather than random duplicates), each easing in with per-particle stagger. Wireframe lines fade **in** as particles arrive, then settle to a low opacity so the vertices read as the dominant structure; particle size shrinks slightly on arrival so the mesh doesn't look fuzzy.
- **Phase 1 mouse interaction:** pointer creates a local dent/repulsion in the orb shell, drag adds spin momentum, and cursor proximity increases the local instability shimmer.
- **Phase 2 mouse interaction:** existing elastic repulsion kept, plus pointer-follow parallax on the whole group and a brighter highlight on vertices near the cursor.
- Touch is supported on mobile with a lighter-weight version of the same interaction.

## Technical notes

- All changes are frontend only: `src/components/hero/VesperScene.tsx` and `src/routes/index.tsx`, with a small tools-section component under `src/components/`.
- Buffers are sized once from the resolved particle count; no per-frame allocation. Resize only re-fits the camera, it does not rebuild buffers.
- Route `head()` title/description updated to match the new positioning.
