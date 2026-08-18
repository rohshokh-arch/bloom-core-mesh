import { createFileRoute, ClientOnly } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const VesperScene = lazy(() => import("@/components/hero/VesperScene"));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vesper — Computational Design to Fabrication" },
      {
        name: "description",
        content:
          "Computational automation from design to fabrication: parametric geometry, Grasshopper-driven workflows, and browser-based tools for build-ready output.",
      },
      { property: "og:title", content: "Vesper — Computational Design to Fabrication" },
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

function Asterisk({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M12 3v18M4.5 7.5l15 9M19.5 7.5l-15 9" />
    </svg>
  );
}

function Index() {
  return (
    <main className="relative flex h-[100svh] w-full flex-col overflow-hidden bg-background">
      {/* ghosted radial glows */}
      <div className="pointer-events-none absolute inset-0 bg-glow-field" />

      <ClientOnly fallback={null}>
        <Suspense fallback={null}>
          <VesperScene />
        </Suspense>
      </ClientOnly>

      {/* NAV */}
      <header className="relative z-20 flex justify-center px-3 pt-3 sm:pt-4">
        <nav className="grid w-full max-w-3xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-full bg-ink/85 px-4 py-2.5 text-[13px] text-ink-foreground backdrop-blur-md sm:flex sm:w-auto sm:justify-between sm:gap-8 sm:px-5">
          <span className="flex min-w-0 items-center gap-2 font-medium">
            <Asterisk className="h-4 w-4 shrink-0" />
            <span className="truncate">Vesper</span>
          </span>
          <ul className="hidden items-center gap-7 text-ink-muted md:flex">
            {["Home", "Tools", "Works", "About"].map((l) => (
              <li key={l}>
                <a href="#" className="transition-colors hover:text-ink-foreground">
                  {l}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex shrink-0 items-center gap-2">
            <a
              href="#"
              className="hidden shrink-0 whitespace-nowrap rounded-full border border-ink-muted/40 px-3.5 py-1.5 text-ink-foreground transition-colors hover:border-ink-foreground/60 md:inline-block"
            >
              Contact <span className="ml-1 text-ink-muted">⌄</span>
            </a>
            <Sheet>
              <SheetTrigger
                aria-label="Open menu"
                className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-ink-muted/40 text-ink-foreground transition-colors hover:border-ink-foreground/60 md:hidden"
              >
                <Menu className="h-4 w-4" />
              </SheetTrigger>
              <SheetContent side="right" className="w-64 bg-ink text-ink-foreground">
                <nav className="mt-10 flex flex-col gap-5 px-5 text-lg font-light">
                  {["Home", "Tools", "Works", "About", "Contact"].map((l) => (
                    <a key={l} href="#" className="text-ink-foreground/85 hover:text-ink-foreground">
                      {l}
                    </a>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </header>

      {/* HEADLINE */}
      <div className="relative z-10 px-4 pt-6 sm:px-10 sm:pt-8">
        <h1 className="pointer-events-none max-w-[16ch] text-[clamp(1.9rem,5.2vw,4.2rem)] font-extralight leading-[1.05] tracking-[-0.03em] text-foreground">
          Computational automation
          <br className="hidden sm:block" />{" "}
          <span className="text-gradient-flow">from Design</span>
          <br className="hidden sm:block" />{" "}
          <span className="text-gradient-flow">to Fabrication</span>
        </h1>
      </div>

      <div className="flex-1" />

      {/* BOTTOM CONTENT */}
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
            <a
              href="#tools"
              className="flex items-center justify-center gap-2.5 bg-teal px-5 py-3.5 text-sm text-teal-foreground transition-colors hover:bg-teal/90"
            >
              <Asterisk className="h-4 w-4 shrink-0" />
              Explore Tools
            </a>
            <a
              href="#work"
              className="flex items-center justify-center gap-2.5 border border-foreground/25 px-5 py-3.5 text-sm text-foreground transition-colors hover:border-foreground/60"
            >
              View Our Work
            </a>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="pointer-events-none relative z-10 flex flex-wrap items-center gap-3 px-4 pb-4 text-[10px] uppercase tracking-[0.08em] text-foreground/80 sm:px-10 sm:text-[11px]">
        <span>[ Parametric systems ]</span>
        <span className="text-foreground/40">•</span>
        <span>[ Design to fabrication ]</span>
        <span className="hidden text-foreground/40 sm:inline">•</span>
        <span className="hidden sm:inline">[ Browser tools ]</span>
      </div>
    </main>
  );
}
