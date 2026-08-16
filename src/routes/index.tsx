import { createFileRoute, ClientOnly } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

const VesperScene = lazy(() => import("@/components/hero/VesperScene"));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vesper — Motion instead of chrome" },
      {
        name: "description",
        content:
          "A real-time WebGL rendering and interaction layer: a particle orb exploding into a procedural wireframe surface that reacts to every pointer.",
      },
      { property: "og:title", content: "Vesper — Motion instead of chrome" },
      {
        property: "og:description",
        content:
          "An abstract Three.js particle orb exploding into an intricate, real-time procedural wireframe surface.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Asterisk({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M12 3v18M4.5 7.5l15 9M19.5 7.5l-15 9" />
    </svg>
  );
}

function Index() {
  return (
    <main className="relative h-screen w-full overflow-hidden bg-background">
      {/* ghosted radial glows */}
      <div className="pointer-events-none absolute inset-0 bg-glow-field" />

      <ClientOnly fallback={null}>
        <Suspense fallback={null}>
          <VesperScene />
        </Suspense>
      </ClientOnly>

      {/* NAV */}
      <header className="absolute left-1/2 top-4 z-20 -translate-x-1/2">
        <nav className="flex items-center gap-8 rounded-full bg-ink/85 px-5 py-2.5 text-[13px] text-ink-foreground backdrop-blur-md">
          <span className="flex items-center gap-2 font-medium">
            <Asterisk className="h-4 w-4" />
            Vesper
          </span>
          <ul className="hidden items-center gap-7 text-ink-muted sm:flex">
            {["Home", "Services", "Works", "About"].map((l) => (
              <li key={l}>
                <a href="#" className="transition-colors hover:text-ink-foreground">
                  {l}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#"
            className="rounded-full border border-ink-muted/40 px-3.5 py-1.5 text-ink-foreground transition-colors hover:border-ink-foreground/60"
          >
            Contact Us <span className="ml-1 text-ink-muted">⌄</span>
          </a>
        </nav>
      </header>

      {/* HEADLINE */}
      <h1 className="pointer-events-none absolute left-4 top-24 z-10 text-[clamp(2.6rem,7vw,5.5rem)] font-extralight leading-[1.02] tracking-[-0.03em] text-foreground sm:left-10 sm:top-20">
        Motion instead
        <br />
        of chrome
      </h1>

      {/* BOTTOM LEFT TECH NOTE */}
      <p className="pointer-events-none absolute bottom-24 left-4 z-10 max-w-xs text-[11px] uppercase leading-relaxed tracking-[0.02em] text-foreground sm:left-10">
        An abstract Three.js particle orb (0x00FFFF to 0x8800FF) exploding into an intricate,
        real-time procedural wireframe surface.
      </p>

      {/* BOTTOM RIGHT COPY + CTA */}
      <div className="absolute bottom-8 right-4 z-10 flex w-[19rem] max-w-[80vw] flex-col items-end gap-5 sm:right-10">
        <p className="text-[13px] leading-snug text-foreground/85">
          A rendering and interaction layer that turns your presence into motion, now revealing
          complex geometric structures. Tuned to feel alive under every pointer.
        </p>
        <button className="flex w-full items-center justify-center gap-2.5 bg-teal px-6 py-3.5 text-sm text-teal-foreground transition-colors hover:bg-teal/90">
          <Asterisk className="h-4 w-4" />
          Send Request
        </button>
      </div>

      {/* FOOTER */}
      <div className="pointer-events-none absolute bottom-6 left-4 z-10 flex items-center gap-4 text-[11px] uppercase tracking-[0.08em] text-foreground/80 sm:left-10">
        <span>[ Living interface ]</span>
        <span className="text-foreground/40">•</span>
        <span>[ Motion layer ]</span>
        <span className="text-foreground/40">•</span>
        <span>[ Motion layer ]</span>
      </div>
    </main>
  );
}
