import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

type Props = {
  value: number;
  label?: string;
  detail?: string;
  className?: string;
  compact?: boolean;
};

export function ModuleProgressBar({ value, label, detail, className, compact }: Props) {
  const pct = Math.max(0, Math.min(100, Math.round(value)));
  return (
    <div className={cn("space-y-2", className)}>
      {(label || detail) && (
        <div className="flex items-center justify-between gap-3 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
          <span>{label}</span>
          <span className="tabular-nums text-foreground">{detail ?? `${pct}%`}</span>
        </div>
      )}
      <Progress
        value={pct}
        aria-label={label ?? "Module progress"}
        className={cn("transition-all duration-500", compact ? "h-1" : "h-2")}
      />
    </div>
  );
}
