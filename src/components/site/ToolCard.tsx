import { Clock, Zap } from "lucide-react";

export function TypeBadge({ type }: { type: "fast" | "slow" }) {
  return type === "fast" ? (
    <span className="inline-flex items-center gap-1 border border-teal/50 bg-background/80 px-2 py-0.5 text-[10px] uppercase tracking-[0.14em] text-teal backdrop-blur-sm">
      <Zap className="h-2.5 w-2.5" /> Live
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 border border-border bg-background/80 px-2 py-0.5 text-[10px] uppercase tracking-[0.14em] text-muted-foreground backdrop-blur-sm">
      <Clock className="h-2.5 w-2.5" /> Compute
    </span>
  );
}

const PATTERNS: Record<string, string> = {
  "Facade Systems":
    "repeating-linear-gradient(45deg, color-mix(in oklab, var(--teal) 22%, transparent) 0 1px, transparent 1px 14px)",
  Structural:
    "repeating-linear-gradient(0deg, color-mix(in oklab, var(--teal) 18%, transparent) 0 1px, transparent 1px 22px), repeating-linear-gradient(90deg, color-mix(in oklab, var(--teal) 18%, transparent) 0 1px, transparent 1px 22px)",
  "Surface Geometry":
    "radial-gradient(circle at 33% 33%, color-mix(in oklab, var(--teal) 26%, transparent), transparent 55%), radial-gradient(circle at 68% 70%, oklch(0.48 0.2 300 / 0.22), transparent 55%)",
  Fabrication:
    "repeating-linear-gradient(-45deg, color-mix(in oklab, var(--teal) 20%, transparent) 0 2px, transparent 2px 16px)",
  Environmental:
    "radial-gradient(ellipse at 50% 85%, oklch(0.48 0.2 300 / 0.28), transparent 70%)",
};

export function ToolThumb({ id, category }: { id: number; category: string }) {
  return (
    <div
      className="relative grid h-full w-full place-items-center overflow-hidden bg-muted/40"
      style={{ backgroundImage: PATTERNS[category] ?? PATTERNS["Structural"] }}
    >
      <span className="select-none text-3xl font-extralight text-foreground/10">
        {String(id).padStart(2, "0")}
      </span>
    </div>
  );
}
