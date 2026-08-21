import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

const base =
  "inline-flex shrink-0 items-center justify-center gap-2.5 bg-teal px-5 py-3.5 text-sm text-teal-foreground transition-colors hover:bg-teal/90";

function Mark() {
  return (
    <img
      src="/assets/cadf-logo.png"
      alt=""
      aria-hidden="true"
      className="h-4 w-4 shrink-0 object-contain"
    />
  );
}

export function BrandLinkButton({
  to,
  params,
  children,
  className = "",
}: {
  to: string;
  params?: Record<string, string>;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Link to={to as any} params={params as any} className={cn(base, className)}>
      <Mark />
      {children}
    </Link>
  );
}
