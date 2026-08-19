# Port the CadF sections into the Vesper hero site

Bring the Works, Tools and Process content from your other app into this project as real routes, rebuilt in this site's visual language — not the other app's.

## Brand and style rules

- Site becomes **CadF**: the logo image replaces the asterisk mark in the nav and appears in the footer.
- Everything is re-authored in the current style: light mineral background with the cyan/purple glow, ultralight Inter headings in sentence case, the cyan-to-purple gradient reserved for key phrases, teal solid primary buttons and hairline outline secondary buttons, squared corners.
- Nothing is carried over from the other app's styling — no uppercase-bold headings, no Space Mono, no dark cards, no framer-motion entrance choreography (light CSS/IntersectionObserver reveals instead).
- Only the content, data and interaction logic are ported.

## Routes

```text
/                 hero (unchanged) + Works preview + Tools preview + Process
/works            full project archive grid
/works/$id        project detail: media slider, lightbox, specs, prev/next
/tools            tool library with category/type filtering
/tools/$id        single tool viewer page
```

Shared header and footer components so nav, logo and links are consistent; the home page keeps its current transparent floating nav over the 3D scene.

## Home page additions (below the hero)

- **Selected works** — first three projects as large image tiles with code, year and name; link to `/works`.
- **Live tools** — three tool cards with a Live/Compute badge; link to `/tools`.
- **Process** — the numbered "algorithm" steps rewritten as a clean four-step sequence.
- The page changes from a locked full-screen hero to a scrolling page; the hero stays exactly `100svh` with a scroll cue.

## Works

- `/works`: responsive hairline grid of all project tiles with tag chips and hover reveal.
- `/works/$id`: image/YouTube/video slider with thumbnails, keyboard arrows, click-to-zoom lightbox, project meta (code, year, role, tools), description body, and prev/next project navigation. Unknown id renders a not-found state.

## Tools

- `/tools`: tool grid with working filters (All / Live / Compute / category) — the other app's filter row was non-functional, this one filters.
- Thumbnails become subtle geometric patterns drawn in the site's cyan/purple tokens on light surfaces, instead of the dark tiles.
- `/tools/$id`: tool detail with description, tags, and a styled placeholder panel where the live Grasshopper viewer will be embedded later ("Live viewer coming soon"), plus a Contact CTA. No iframe or `tool-viewer.html` yet.
- The "Bring Grasshopper live into your website" CTA block is kept, restyled, at the bottom of `/tools`.

## Assets and data

- Copy `cadf-logo.png`, `project-1..4.png` and `favicon.svg` as-is into `public/assets`.
- Port `projects.ts` and `tools.ts` into `src/data/` unchanged in shape, with image paths pointed at the copied assets.

## Technical notes

- New files: `src/data/projects.ts`, `src/data/tools.ts`, `src/components/site/{SiteHeader,SiteFooter,Section}.tsx`, home section components, and routes `works.index.tsx`, `works.$id.tsx`, `tools.index.tsx`, `tools.$id.tsx`.
- Routing uses TanStack Router `Link` with `params` (the source used `wouter`); each route gets its own `head()` metadata, and project/tool detail routes derive title and description from the record.
- Data lives in static modules, so no backend is needed; images are lazy-loaded below the fold and the 3D scene stays mounted only on the home hero.
- `src/routes/index.tsx` gains sections; `VesperScene.tsx` is untouched apart from making sure it stops animating when scrolled out of view.
