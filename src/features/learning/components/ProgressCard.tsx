import type { LucideIcon } from "lucide-react";
import { SurfaceCard } from "@/components/common";
import { Progress } from "@/components/ui/progress";

type Props = {
  icon?: LucideIcon;
  label: string;
  value?: number;
  hint?: string;
};

export function ProgressCard({ icon: Icon, label, value, hint }: Props) {
  return (
    <SurfaceCard>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 space-y-1">
          <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
            {label}
          </div>
          <div className="text-2xl font-semibold tracking-tight text-foreground">
            {value != null ? `${value}%` : "—"}
          </div>
          {hint && <div className="text-xs text-muted-foreground">{hint}</div>}
        </div>
        {Icon && (
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border/60 bg-background/60 text-muted-foreground">
            <Icon className="h-4 w-4" />
          </div>
        )}
      </div>
      <Progress value={value ?? 0} className="mt-4 h-1.5" />
    </SurfaceCard>
  );
}