import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { projects } from "@/data/projects";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";

function youTubeId(url: string) {
  const m = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([A-Za-z0-9_-]{11})/,
  );
  return m ? m[1] : null;
}

export const Route = createFileRoute("/works/$id")({
  loader: ({ params }) => {
    const project = projects.find((p) => p.id === params.id);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Project not found — CadF" }, { name: "robots", content: "noindex" }],
      };
    }
    const { project } = loaderData;
    const title = `${project.name} — CadF`;
    return {
      meta: [
        { title },
        { name: "description", content: project.description.slice(0, 155) },
        { property: "og:title", content: title },
        { property: "og:description", content: project.description.slice(0, 155) },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: ProjectMissing,
  component: ProjectDetail,
});

function ProjectMissing() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-5 bg-background px-4 text-center">
      <p className="text-sm font-extralight text-muted-foreground">
        That project isn't in the archive.
      </p>
      <Link to="/works" className="border border-foreground/25 px-5 py-3 text-sm text-foreground">
        Back to all works
      </Link>
    </div>
  );
}

function ProjectDetail() {
  const { project } = Route.useLoaderData();
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const prev = useCallback(
    () => setActive((i) => (i - 1 + project.media.length) % project.media.length),
    [project.media.length],
  );
  const next = useCallback(
    () => setActive((i) => (i + 1) % project.media.length),
    [project.media.length],
  );

  useEffect(() => {
    setActive(0);
  }, [project.id]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") setLightbox(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);

  const media = project.media[active]!;
  const idx = projects.findIndex((p) => p.id === project.id);
  const prevProject = projects[idx - 1];
  const nextProject = projects[idx + 1];

  return (
    <div className="relative min-h-screen bg-background">
      <div className="pointer-events-none fixed inset-0 bg-glow-field" />
      <div className="relative z-10 flex min-h-screen flex-col">
        <SiteHeader />

        <main className="flex-1 px-4 pb-20 pt-8 sm:px-10">
          <div className="mx-auto max-w-6xl">
            <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              <Link to="/works" className="transition-colors hover:text-foreground">
                ← All works
              </Link>
              <span>
                {project.code} / {project.year}
              </span>
            </div>

            <h1 className="mt-6 max-w-[16ch] text-[clamp(2rem,5vw,3.6rem)] font-extralight leading-[1.05] tracking-[-0.03em] text-foreground">
              {project.name}
            </h1>

            {/* media */}
            <div className="group relative mt-10 h-[46vh] w-full overflow-hidden bg-muted sm:h-[62vh]">
              {media.type === "image" ? (
                <img
                  src={media.url}
                  alt={media.caption ?? project.name}
                  onClick={() => setLightbox(true)}
                  className="absolute inset-0 h-full w-full cursor-zoom-in object-cover"
                />
              ) : media.type === "youtube" ? (
                <iframe
                  src={`https://www.youtube.com/embed/${youTubeId(media.url)}?rel=0&modestbranding=1`}
                  title={media.caption ?? project.name}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full border-0"
                />
              ) : (
                <video src={media.url} controls className="absolute inset-0 h-full w-full object-contain" />
              )}

              {project.media.length > 1 && (
                <>
                  <button
                    type="button"
                    aria-label="Previous media"
                    onClick={prev}
                    className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center bg-background/80 text-foreground backdrop-blur-sm transition-opacity hover:bg-background"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    aria-label="Next media"
                    onClick={next}
                    className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center bg-background/80 text-foreground backdrop-blur-sm transition-opacity hover:bg-background"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}

              {media.caption && (
                <p className="absolute bottom-4 left-4 bg-background/80 px-3 py-1.5 text-[11px] uppercase tracking-[0.14em] text-foreground/80 backdrop-blur-sm">
                  {media.caption}
                </p>
              )}
            </div>

            {project.media.length > 1 && (
              <div className="mt-3 flex gap-3 overflow-x-auto">
                {project.media.map((m, i) => (
                  <button
                    key={m.url + i}
                    type="button"
                    onClick={() => setActive(i)}
                    aria-label={`Show media ${i + 1}`}
                    className={`h-16 w-24 shrink-0 overflow-hidden border ${
                      i === active ? "border-teal" : "border-border"
                    }`}
                  >
                    <img
                      src={m.type === "image" ? m.url : `https://img.youtube.com/vi/${youTubeId(m.url)}/mqdefault.jpg`}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* body */}
            <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
              <div>
                <h2 className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  [ Overview ]
                </h2>
                <p className="mt-4 text-lg font-extralight leading-relaxed text-foreground">
                  {project.description}
                </p>
              </div>
              <div>
                <h2 className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  [ Our role ]
                </h2>
                <ul className="mt-4 space-y-3">
                  {project.role.map((r) => (
                    <li
                      key={r}
                      className="border-l border-teal/50 pl-4 text-sm font-extralight leading-relaxed text-muted-foreground"
                    >
                      {r}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-border px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* prev / next */}
            <div className="mt-16 grid gap-px border-t border-border pt-8 sm:grid-cols-2">
              {prevProject ? (
                <Link
                  to="/works/$id"
                  params={{ id: prevProject.id }}
                  className="group py-4 text-left"
                >
                  <span className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    ← Previous
                  </span>
                  <p className="mt-1 text-xl font-extralight text-foreground">{prevProject.name}</p>
                </Link>
              ) : (
                <span />
              )}
              {nextProject && (
                <Link
                  to="/works/$id"
                  params={{ id: nextProject.id }}
                  className="group py-4 sm:text-right"
                >
                  <span className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    Next →
                  </span>
                  <p className="mt-1 text-xl font-extralight text-foreground">{nextProject.name}</p>
                </Link>
              )}
            </div>
          </div>
        </main>

        <SiteFooter />
      </div>

      {lightbox && media.type === "image" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/95 p-4">
          <button
            type="button"
            aria-label="Close"
            onClick={() => setLightbox(false)}
            className="absolute right-5 top-5 grid h-10 w-10 place-items-center border border-ink-muted/40 text-ink-foreground"
          >
            <X className="h-5 w-5" />
          </button>
          <img src={media.url} alt={media.caption ?? project.name} className="max-h-full max-w-full object-contain" />
        </div>
      )}
    </div>
  );
}
