import { SurfaceCard } from "@/components/common";
import { cn } from "@/lib/utils";
import type { AIProviderDefinition } from "../types";

const statusLabel: Record<AIProviderDefinition["status"], string> = {
  ready: "Ready",
  unconfigured: "Needs setup",
  unavailable: "Unavailable",
  "coming-soon": "Coming soon",
};

const statusDot: Record<AIProviderDefinition["status"], string> = {
  ready: "bg-emerald-500",
  unconfigured: "bg-amber-500",
  unavailable: "bg-destructive",
  "coming-soon": "bg-muted-foreground/40",
};

export function ProviderStatus({ provider }: { provider: AIProviderDefinition }) {
  return (
    <SurfaceCard className="p-3">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="text-sm font-medium tracking-tight">{provider.name}</div>
          <div className="mt-0.5 truncate text-xs text-muted-foreground">
            {provider.description}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={cn("h-1.5 w-1.5 rounded-full", statusDot[provider.status])} />
          <span className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            {statusLabel[provider.status]}
          </span>
        </div>
      </div>
    </SurfaceCard>
  );
}
