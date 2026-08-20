import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";

export const Route = createFileRoute("/works/")({
  head: () => ({
    meta: [
      { title: "Works — CadF computational design archive" },
      {
        name: "description",
        content:
          "Every CadF project: parametric facades, structural optimisation, BIM automation and fabrication pipelines from design intent to CNC output.",
      },
      { property: "og:title", content: "Works — CadF computational design archive" },
      {
        property: "og:description",
        content:
          "Parametric facades, structural optimisation and fabrication automation projects by CadF.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WorksPage,
});

function WorksPage() {
  return (
    <div className="relative min-h-screen bg-background">
      <div className="pointer-events-none fixed inset-0 bg-glow-field" />
      <div className="relative z-10 flex min-h-screen flex-col">
        <SiteHeader />

        <main className="flex-1 px-4 pb-20 pt-10 sm:px-10">
          <div className="mx-auto max-w-6xl">
            <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              [ Complete archive ]
            </p>
            <h1 className="mt-4 max-w-[18ch] text-[clamp(2rem,5vw,3.6rem)] font-extralight leading-[1.05] tracking-[-0.03em] text-foreground">
              Selected and complete works
            </h1>
            <p className="mt-5 max-w-xl border-l border-teal/60 pl-4 text-sm font-extralight leading-relaxed text-muted-foreground">
              Parametric design, fabrication engineering and automation systems — each project
              resolved from computational logic into build-ready output.
            </p>

            <div className="mt-12 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
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
                  <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                    {project.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="bg-background/85 px-2 py-1 text-[10px] uppercase tracking-[0.14em] text-foreground/80 backdrop-blur-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <ArrowUpRight className="absolute right-4 top-4 h-5 w-5 text-ink-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className="absolute inset-x-0 bottom-0 bg-ink/85 p-5 text-ink-foreground backdrop-blur-sm">
                    <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.16em] text-ink-muted">
                      <span>{project.code}</span>
                      <span>{project.year}</span>
                    </div>
                    <h2 className="mt-2 text-xl font-extralight tracking-tight">{project.name}</h2>
                    <p className="mt-2 line-clamp-2 text-xs font-extralight leading-relaxed text-ink-foreground/70">
                      {project.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </main>

        <SiteFooter />
      </div>
    </div>
  );
}
