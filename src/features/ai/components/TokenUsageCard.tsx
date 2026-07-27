import { SurfaceCard } from "@/components/common";
import { Gauge } from "lucide-react";
import type { TokenUsage } from "../types";

export function TokenUsageCard({ usage }: { usage?: TokenUsage }) {
  return (
    <SurfaceCard className="p-3">
      <div className="flex items-center gap-2">
        <div className="flex h-6 w-6 items-center justify-center rounded-md border border-border/60 bg-background/60 text-primary">
          <Gauge className="h-3 w-3" />
        </div>
        <div className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
          Token usage
        </div>
      </div>
      <div className="mt-2 grid grid-cols-3 gap-2 text-center">
        <Metric label="In" value={usage?.inputTokens} />
        <Metric label="Out" value={usage?.outputTokens} />
        <Metric label="Total" value={usage?.totalTokens} />
      </div>
    </SurfaceCard>
  );
}

function Metric({ label, value }: { label: string; value?: number }) {
  return (
    <div className="rounded-md border border-border/60 bg-background/40 py-1.5">
      <div className="text-sm font-medium tabular-nums">{value ?? "—"}</div>
      <div className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </div>
    </div>
  );
}
