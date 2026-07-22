import type { LucideIcon } from "lucide-react";
import { ArrowUpRight } from "lucide-react";
import { SurfaceCard } from "./SurfaceCard";

type Props = {
  icon?: LucideIcon;
  title: string;
  description?: string;
  meta?: string;
};

export function CategoryCard({ icon: Icon, title, description, meta }: Props) {
  return (
    <SurfaceCard interactive className="h-full">
      <div className="flex h-full flex-col gap-4">
        <div className="flex items-start justify-between">
          {Icon ? (
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 bg-background/60 text-foreground/80">
              <Icon className="h-4 w-4" />
            </div>
          ) : (
            <div className="h-9 w-9 rounded-lg border border-border/60 bg-gradient-to-br from-primary/20 to-transparent" />
          )}
          <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
        </div>
        <div className="flex-1 space-y-1">
          <div className="text-sm font-medium tracking-tight text-foreground">{title}</div>
          {description && (
            <p className="text-xs leading-relaxed text-muted-foreground">{description}</p>
          )}
        </div>
        {meta && (
          <div className="mt-1 border-t border-border/50 pt-3 text-[11px] uppercase tracking-[0.14em] text-muted-foreground/80">
            {meta}
          </div>
        )}
      </div>
    </SurfaceCard>
  );
}