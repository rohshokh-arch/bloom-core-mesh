import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { tools } from "@/data/tools";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ToolThumb, TypeBadge } from "@/components/site/ToolCard";

export const Route = createFileRoute("/tools/$id")({
  loader: ({ params }) => {
    const tool = tools.find((t) => String(t.id) === params.id);
    if (!tool) throw notFound();
    return { tool };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Tool not found — CadF" }, { name: "robots", content: "noindex" }],
      };
    }
    const { tool } = loaderData;
    const title = `${tool.name} — CadF live tools`;
    return {
      meta: [
        { title },
        { name: "description", content: tool.description.slice(0, 155) },
        { property: "og:title", content: title },
        { property: "og:description", content: tool.description.slice(0, 155) },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: ToolMissing,
  component: ToolPage,
});

function ToolMissing() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-5 bg-background px-4 text-center">
      <p className="text-sm font-extralight text-muted-foreground">That tool doesn't exist yet.</p>
      <Link to="/tools" className="border border-foreground/25 px-5 py-3 text-sm text-foreground">
        Back to all tools
      </Link>
    </div>
  );
}

function ToolPage() {
  const { tool } = Route.useLoaderData();

  return (
    <div className="relative min-h-screen bg-background">
      <div className="pointer-events-none fixed inset-0 bg-glow-field" />
      <div className="relative z-10 flex min-h-screen flex-col">
        <SiteHeader />

        <main className="flex-1 px-4 pb-20 pt-8 sm:px-10">
          <div className="mx-auto max-w-5xl">
            <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              <Link to="/tools" className="transition-colors hover:text-foreground">
                ← All tools
              </Link>
              <span>{tool.category}</span>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <TypeBadge type={tool.type} />
              <span className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                Tool {String(tool.id).padStart(2, "0")}
              </span>
            </div>

            <h1 className="mt-4 max-w-[16ch] text-[clamp(2rem,5vw,3.4rem)] font-extralight leading-[1.05] tracking-[-0.03em] text-foreground">
              {tool.name}
            </h1>
            <p className="mt-5 max-w-2xl text-lg font-extralight leading-relaxed text-muted-foreground">
              {tool.description}
            </p>

            {/* viewer placeholder */}
            <div className="relative mt-12 h-[46vh] min-h-[18rem] border border-border">
              <ToolThumb id={tool.id} category={tool.category} />
              <div className="absolute inset-0 grid place-items-center bg-background/70 px-6 text-center backdrop-blur-sm">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    [ Live viewer ]
                  </p>
                  <p className="mt-3 max-w-md text-xl font-extralight leading-snug text-foreground">
                    The interactive Grasshopper session for this tool is coming soon.
                  </p>
                  <a
                    href={`mailto:hello@cadf.io?subject=${encodeURIComponent(tool.name)}`}
                    className="mt-6 inline-block bg-teal px-5 py-3.5 text-sm text-teal-foreground transition-colors hover:bg-teal/90"
                  >
                    Request early access
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-2">
              {tool.tags.map((tag) => (
                <span
                  key={tag}
                  className="border border-border px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </main>

        <SiteFooter />
      </div>
    </div>
  );
}
