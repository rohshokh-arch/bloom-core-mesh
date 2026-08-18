# Hero polish: bigger phase 2, aligned CTA copy, gradient headline, mobile nav

## 1. Scale and contrast of the 3D object

- Restore the object to its previous size: remove the aggressive `fitScale` shrink (currently ~0.6x at 654px) and use a gentler clamp so desktop sits at 1.0 and narrow screens only trim slightly.
- Phase 2 wireframe regains presence: stronger noise/spike displacement (higher amplitude and sharper spike exponent), and the line opacity settles higher instead of fading back to a faint value, so the mesh reads clearly.
- Phase 1 orb particles return to the previous point size, and the settled phase-2 particle size no longer shrinks as much on arrival.
- Colors get more contrast: deepen the gradient endpoints slightly and raise the multiplier applied to particle colors so points aren't washed out against the pale background.

## 2. CTA block alignment and readability

- The paragraph above the buttons and the two-button grid go in the same fixed-width container so their left and right edges line up exactly (same width at every breakpoint, right-aligned block on desktop).
- Make that text more visible: larger size, more weight, full-strength foreground color instead of 85% opacity, and slightly tighter measure so it wraps to clean lines.

## 3. Headline gradient

Recommended: keep "Computational automation" in solid ink and apply a left-to-right cyan-to-purple gradient across "from Design to Fabrication", matching the exact gradient used by the 3D object so the type and the geometry read as one system.

Ideas considered, with the reasoning:
- Gradient only on the second half (recommended) — the color literally travels from "Design" to "Fabrication", strongest concept, still highly legible.
- Gradient per word ("Design" cyan, "Fabrication" purple, connector words in ink) — clearer word-level meaning but choppier visually.
- Full-headline gradient — prettiest but weakens the design-to-fabrication narrative and hurts contrast on the first line.

Implementation detail: a `--gradient-headline` token in `src/styles.css` reusing the cyan/purple values, applied with `bg-clip-text` on a span; the gradient is darkened enough to keep contrast on the near-white background.

## 4. Mobile nav

- The nav links are currently hidden below `md` with no replacement. Add a compact menu button in the pill that opens a sheet/drawer with Home, Tools, Works, About and Contact.
- The pill keeps logo + menu button on small screens; nothing overlaps the headline since the header already sits in its own flow row.

## Technical notes

- Files touched: `src/components/hero/VesperScene.tsx` (scale, noise amplitude, opacity, point size, colors), `src/routes/index.tsx` (headline markup, CTA container, mobile menu), `src/styles.css` (headline gradient token).
- Mobile menu uses the existing shadcn `sheet` component; no new dependencies.
- Particle counts stay at 20k desktop / 6k mobile — only visual size and contrast change, not density.
