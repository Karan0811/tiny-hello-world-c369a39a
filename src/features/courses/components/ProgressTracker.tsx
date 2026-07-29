import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export function ProgressTracker({
  label,
  completed,
  total,
  pct,
  meta,
  className,
}: {
  label: string;
  completed: number;
  total: number;
  pct: number;
  meta?: string;
  className?: string;
}) {
  return (
    <div className={cn("rounded-xl border border-border/60 bg-card p-5", className)}>
      <div className="flex items-baseline justify-between gap-4">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </p>
        <p className="text-2xl font-semibold tracking-tight">{pct}%</p>
      </div>
      <Progress value={pct} className="mt-3" />
      <p className="mt-2 text-[11px] text-muted-foreground">
        {completed} of {total} lessons complete{meta ? ` · ${meta}` : ""}
      </p>
    </div>
  );
}
