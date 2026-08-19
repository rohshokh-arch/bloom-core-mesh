import { Link } from "@tanstack/react-router";
import { Wordmark } from "./SiteHeader";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/70 px-4 py-10 sm:px-10">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
        <div className="min-w-0">
          <Wordmark className="text-foreground" />
          <p className="mt-3 max-w-sm text-sm font-extralight leading-relaxed text-muted-foreground">
            Computational automation from design to fabrication — parametric geometry, solvers and
            browser-based Grasshopper tools.
          </p>
        </div>
        <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-extralight text-muted-foreground">
          <Link to="/" className="transition-colors hover:text-foreground">Home</Link>
          <Link to="/works" className="transition-colors hover:text-foreground">Works</Link>
          <Link to="/tools" className="transition-colors hover:text-foreground">Tools</Link>
          <a href="mailto:hello@cadf.io" className="transition-colors hover:text-foreground">hello@cadf.io</a>
        </nav>
      </div>
      <p className="mx-auto mt-8 max-w-6xl text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
        © {new Date().getFullYear()} CadF
      </p>
    </footer>
  );
}