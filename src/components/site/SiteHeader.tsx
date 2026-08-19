import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Works", to: "/works" },
  { label: "Tools", to: "/tools" },
] as const;

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={cn("flex min-w-0 items-center gap-2 font-medium", className)}>
      <img src="/assets/cadf-logo.png" alt="" className="h-5 w-5 shrink-0 object-contain" />
      <span className="truncate tracking-tight">CadF</span>
    </span>
  );
}

export function SiteHeader({ floating = false }: { floating?: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <header
      className={cn(
        "relative z-30 flex justify-center px-3 pt-3 sm:pt-4",
        floating ? "" : "pb-3 sm:pb-4",
      )}
    >
      <nav className="grid w-full max-w-3xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-full bg-ink/85 px-4 py-2.5 text-[13px] text-ink-foreground backdrop-blur-md sm:flex sm:w-auto sm:justify-between sm:gap-8 sm:px-5">
        <Link to="/" className="min-w-0">
          <Wordmark />
        </Link>

        <ul className="hidden items-center gap-7 text-ink-muted md:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.label}>
              <Link
                to={l.to}
                className="transition-colors hover:text-ink-foreground"
                activeProps={{ className: "text-ink-foreground" }}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex shrink-0 items-center gap-2">
          <a
            href="mailto:hello@cadf.io"
            className="hidden shrink-0 whitespace-nowrap rounded-full border border-ink-muted/40 px-3.5 py-1.5 text-ink-foreground transition-colors hover:border-ink-foreground/60 md:inline-block"
          >
            Contact
          </a>
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
            className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-ink-muted/40 text-ink-foreground transition-colors hover:border-ink-foreground/60 md:hidden"
          >
            <Menu className="h-4 w-4" />
          </button>
        </div>
      </nav>

      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="absolute inset-0 h-full w-full bg-ink/60 backdrop-blur-sm"
          />
          <div className="absolute inset-y-0 right-0 flex w-[82%] max-w-xs flex-col bg-ink px-6 pb-8 pt-5 text-ink-foreground">
            <div className="flex items-center justify-between">
              <Wordmark />
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="grid h-9 w-9 place-items-center border border-ink-muted/40 text-ink-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <nav className="mt-10 flex flex-col">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.label}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="border-b border-ink-muted/20 py-4 text-2xl font-extralight tracking-tight text-ink-foreground/90"
                  activeProps={{ className: "text-ink-foreground" }}
                >
                  {l.label}
                </Link>
              ))}
              <a
                href="mailto:hello@cadf.io"
                onClick={() => setOpen(false)}
                className="border-b border-ink-muted/20 py-4 text-2xl font-extralight tracking-tight text-ink-foreground/90"
              >
                Contact
              </a>
            </nav>

            <p className="mt-auto text-[11px] uppercase tracking-[0.18em] text-ink-muted">
              Design to fabrication
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
