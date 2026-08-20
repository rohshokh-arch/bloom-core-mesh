import { createFileRoute, ClientOnly, Link } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import { tools } from "@/data/tools";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ToolThumb, TypeBadge } from "@/components/site/ToolCard";

const VesperScene = lazy(() => import("@/components/hero/VesperScene"));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CadF — Computational automation from design to fabrication" },
      {
        name: "description",
        content:
          "CadF turns design intent into computation: parametric geometry, Grasshopper-driven automation and fabrication-ready output, with live tools in the browser.",
      },
      { property: "og:title", content: "CadF — Computational automation from design to fabrication" },
      {
        property: "og:description",
        content:
          "Parametric geometry and Grasshopper-driven automation, from first sketch to fabrication-ready output — live in the browser.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const featuredProjects = projects.slice(0, 3);
  const featuredTools = tools.slice(0, 3);

  return (
    <div className="relative bg-background">
      <div className="pointer-events-none fixed inset-0 bg-glow-field" />

      {/* HERO */}
      <section className="relative flex h-[100svh] w-full flex-col overflow-hidden">
        <ClientOnly fallback={null}>
          <Suspense fallback={null}>
            <VesperScene />
          </Suspense>
        </ClientOnly>

        <SiteHeader floating />

        <div className="relative z-10 px-4 pt-6 sm:px-10 sm:pt-8">
          <h1 className="pointer-events-none max-w-[16ch] text-[clamp(1.9rem,5.2vw,4.2rem)] font-extralight leading-[1.05] tracking-[-0.03em] text-foreground">
            Computational automation
            <br className="hidden sm:block" /> from Design
            <br className="hidden sm:block" /> to Fabrication
          </h1>
        </div>

        <div className="flex-1" />

        <div className="relative z-10 grid gap-6 px-4 pb-6 sm:px-10 sm:pb-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <p className="pointer-events-none hidden max-w-xs text-[11px] uppercase leading-relaxed tracking-[0.02em] text-foreground lg:block">
            Parametric geometry, Grasshopper-driven logic and generative workflows — resolved into
            fabrication-ready output.
          </p>

          <div className="flex w-full flex-col gap-4 lg:w-[23rem]">
            <p className="text-[15px] font-medium leading-snug text-foreground lg:text-right">
              We turn design intent into computation: solvers, optimisation and CNC-ready geometry,
              with our Grasshopper tools running live in your browser.
            </p>
            <div className="grid w-full gap-3 sm:grid-cols-2">
              <Link
                to="/tools"
                className="flex items-center justify-center gap-2.5 bg-teal px-5 py-3.5 text-sm text-teal-foreground transition-colors hover:bg-teal/90"
              >
                Explore Tools
              </Link>
              <Link
                to="/works"
                className="flex items-center justify-center gap-2.5 border border-foreground/25 px-5 py-3.5 text-sm text-foreground transition-colors hover:border-foreground/60"
              >
                View Our Work
              </Link>
            </div>
          </div>
        </div>

        <div className="pointer-events-none relative z-10 flex flex-wrap items-center gap-3 px-4 pb-4 text-[10px] uppercase tracking-[0.08em] text-foreground/80 sm:px-10 sm:text-[11px]">
          <span>[ Parametric systems ]</span>
          <span className="text-foreground/40">•</span>
          <span>[ Design to fabrication ]</span>
          <span className="hidden text-foreground/40 sm:inline">•</span>
          <span className="hidden sm:inline">[ Browser tools ]</span>
        </div>
      </section>

      {/* WORKS */}
      <section className="relative z-10 px-4 py-20 sm:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
            <div className="min-w-0">
              <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                [ Selected works ]
              </p>
              <h2 className="mt-3 max-w-[18ch] text-[clamp(1.7rem,3.8vw,2.8rem)] font-extralight leading-[1.08] tracking-[-0.03em] text-foreground">
                Projects resolved from logic into matter
              </h2>
            </div>
            <Link
              to="/works"
              className="inline-flex shrink-0 items-center gap-2 border border-foreground/25 px-5 py-3 text-sm text-foreground transition-colors hover:border-foreground/60"
            >
              All works <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <Link
                key={project.id}
                to="/works/$id"
                params={{ id: project.id }}
                className="group relative block h-[22rem] overflow-hidden bg-background"
              >
                <img
                  src={project.thumbnail}
                  alt={project.name}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 bg-ink/85 p-5 text-ink-foreground backdrop-blur-sm">
                  <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.16em] text-ink-muted">
                    <span>{project.code}</span>
                    <span>{project.year}</span>
                  </div>
                  <h3 className="mt-2 text-xl font-extralight tracking-tight">{project.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TOOLS */}
      <section className="relative z-10 border-t border-border/70 px-4 py-20 sm:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
            <div className="min-w-0">
              <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                [ Live tools ]
              </p>
              <h2 className="mt-3 max-w-[20ch] text-[clamp(1.7rem,3.8vw,2.8rem)] font-extralight leading-[1.08] tracking-[-0.03em] text-foreground">
                Grasshopper definitions, running in your browser
              </h2>
            </div>
            <Link
              to="/tools"
              className="inline-flex shrink-0 items-center gap-2 border border-foreground/25 px-5 py-3 text-sm text-foreground transition-colors hover:border-foreground/60"
            >
              All tools <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
            {featuredTools.map((tool) => (
              <Link
                key={tool.id}
                to="/tools/$id"
                params={{ id: String(tool.id) }}
                className="group block bg-background transition-colors hover:bg-muted/40"
              >
                <div className="relative h-40 border-b border-border">
                  <ToolThumb id={tool.id} category={tool.category} />
                  <div className="absolute left-3 top-3">
                    <TypeBadge type={tool.type} />
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                    {tool.category}
                  </p>
                  <h3 className="mt-2 text-lg font-extralight tracking-tight text-foreground">
                    {tool.name}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm font-extralight leading-relaxed text-muted-foreground">
                    {tool.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="relative z-10 border-t border-border/70 px-4 py-20 sm:px-10">
        <div className="mx-auto max-w-4xl">
          <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            [ The process ]
          </p>
          <h2 className="mt-3 max-w-[16ch] text-[clamp(1.7rem,3.8vw,2.8rem)] font-extralight leading-[1.08] tracking-[-0.03em] text-foreground">
            From constraints to machine instructions
          </h2>

          <ol className="mt-12 grid gap-px bg-border">
            {[
              {
                n: "01",
                title: "Define constraints",
                desc: "Every system begins with limits. We set the spatial boundaries, structural rules and fabrication tolerances the design has to live inside.",
              },
              {
                n: "02",
                title: "Generate logic",
                desc: "Mathematical rules generate the structure. Relaxation and solver passes settle the geometry into equilibrium.",
              },
              {
                n: "03",
                title: "Optimise",
                desc: "Evolutionary solvers trade material against performance until the geometry earns every kilogram it carries.",
              },
              {
                n: "04",
                title: "Physical translation",
                desc: "Pure geometry becomes machine instructions: cut files, panel schedules and assembly sequences ready for the shop floor.",
              },
            ].map((step) => (
              <li key={step.n} className="grid gap-4 bg-background p-6 sm:grid-cols-[3rem_minmax(0,1fr)] sm:p-8">
                <span className="text-2xl font-extralight text-teal">{step.n}</span>
                <div className="min-w-0">
                  <h3 className="text-xl font-extralight tracking-tight text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm font-extralight leading-relaxed text-muted-foreground">
                    {step.desc}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-14 flex flex-wrap gap-3">
            <a
              href="mailto:hello@cadf.io"
              className="bg-teal px-5 py-3.5 text-sm text-teal-foreground transition-colors hover:bg-teal/90"
            >
              Start a project
            </a>
            <Link
              to="/tools"
              className="border border-foreground/25 px-5 py-3.5 text-sm text-foreground transition-colors hover:border-foreground/60"
            >
              Try a live tool
            </Link>
          </div>
        </div>
      </section>

      <div className="relative z-10">
        <SiteFooter />
      </div>
    </div>
  );
}
