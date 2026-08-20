import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { tools } from "@/data/tools";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ToolThumb, TypeBadge } from "@/components/site/ToolCard";

export const Route = createFileRoute("/tools/")({
  head: () => ({
    meta: [
      { title: "Live Grasshopper tools — CadF" },
      {
        name: "description",
        content:
          "Interactive parametric tools running on live Grasshopper definitions: adjust inputs and watch geometry update in the browser — no software required.",
      },
      { property: "og:title", content: "Live Grasshopper tools — CadF" },
      {
        property: "og:description",
        content:
          "Browser-based parametric tools for facades, structure, surface geometry and fabrication.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ToolsPage,
});

const FILTERS = ["All", "Live", "Compute", "Facade Systems", "Structural", "Fabrication"] as const;

function ToolsPage() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");

  const visible = useMemo(() => {
    if (filter === "All") return tools;
    if (filter === "Live") return tools.filter((t) => t.type === "fast");
    if (filter === "Compute") return tools.filter((t) => t.type === "slow");
    return tools.filter((t) => t.category === filter);
  }, [filter]);

  return (
    <div className="relative min-h-screen bg-background">
      <div className="pointer-events-none fixed inset-0 bg-glow-field" />
      <div className="relative z-10 flex min-h-screen flex-col">
        <SiteHeader />

        <main className="flex-1 px-4 pb-20 pt-10 sm:px-10">
          <div className="mx-auto max-w-6xl">
            <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              [ Parametric tool library ]
            </p>
            <h1 className="mt-4 max-w-[16ch] text-[clamp(2rem,5vw,3.6rem)] font-extralight leading-[1.05] tracking-[-0.03em] text-foreground">
              Live Grasshopper tools
            </h1>
            <p className="mt-5 max-w-xl border-l border-teal/60 pl-4 text-sm font-extralight leading-relaxed text-muted-foreground">
              Interactive parametric tools running on live Grasshopper definitions. Adjust inputs,
              see geometry update in real time — no software required.
            </p>

            <div className="mt-10 flex flex-wrap gap-2 border-b border-border pb-5">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  className={`border px-3 py-1.5 text-[10px] uppercase tracking-[0.16em] transition-colors ${
                    filter === f
                      ? "border-teal text-teal"
                      : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            <div className="mt-8 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((tool) => (
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
                    <ArrowUpRight className="absolute right-3 top-3 h-4 w-4 text-teal opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                  <div className="p-5">
                    <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                      {tool.category}
                    </p>
                    <h2 className="mt-2 text-lg font-extralight tracking-tight text-foreground">
                      {tool.name}
                    </h2>
                    <p className="mt-2 line-clamp-3 text-sm font-extralight leading-relaxed text-muted-foreground">
                      {tool.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {tool.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="border border-border px-2 py-0.5 text-[10px] uppercase tracking-[0.14em] text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {visible.length === 0 && (
              <p className="mt-10 text-sm font-extralight text-muted-foreground">
                No tools in this category yet.
              </p>
            )}
          </div>

          {/* CTA */}
          <section className="mx-auto mt-24 max-w-6xl border-t border-border pt-16">
            <div className="grid gap-12 md:grid-cols-2 md:items-start">
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  [ For studios & firms ]
                </p>
                <h2 className="mt-4 max-w-[14ch] text-[clamp(1.7rem,3.6vw,2.8rem)] font-extralight leading-[1.08] tracking-[-0.03em] text-foreground">
                  Bring Grasshopper live into your website
                </h2>
                <p className="mt-5 max-w-md text-sm font-extralight leading-relaxed text-muted-foreground">
                  We connect your existing Grasshopper definitions to a live web interface — no
                  coding on your side. Give clients, consultants or the public an interactive window
                  into your parametric process.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href="mailto:hello@cadf.io"
                    className="bg-teal px-5 py-3.5 text-sm text-teal-foreground transition-colors hover:bg-teal/90"
                  >
                    Contact us
                  </a>
                  <Link
                    to="/works"
                    className="border border-foreground/25 px-5 py-3.5 text-sm text-foreground transition-colors hover:border-foreground/60"
                  >
                    See our work
                  </Link>
                </div>
              </div>

              <div className="grid gap-px bg-border">
                {[
                  {
                    n: "01",
                    title: "Upload your .gh file",
                    desc: "We host the definition on compute and connect it to the automatic schema reader.",
                  },
                  {
                    n: "02",
                    title: "Auto-generated interface",
                    desc: "The frontend reads your input/output schema and builds the controls for you.",
                  },
                  {
                    n: "03",
                    title: "Embed anywhere",
                    desc: "Tools are served as lightweight embeds — drop them into any site or client portal.",
                  },
                ].map((s) => (
                  <div key={s.n} className="flex gap-5 bg-background p-5">
                    <span className="w-8 shrink-0 text-lg font-extralight text-teal">{s.n}</span>
                    <div className="min-w-0">
                      <h3 className="text-sm font-medium tracking-tight text-foreground">
                        {s.title}
                      </h3>
                      <p className="mt-1 text-sm font-extralight leading-relaxed text-muted-foreground">
                        {s.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>

        <SiteFooter />
      </div>
    </div>
  );
}
