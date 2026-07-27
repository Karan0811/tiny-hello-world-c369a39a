import { SurfaceCard } from "@/components/common";
import { Layers } from "lucide-react";
import type { AIContext } from "../types";
import { describeContext } from "../prompt";

export function AIContextCard({ context }: { context?: AIContext }) {
  const label = describeContext(context);
  return (
    <SurfaceCard className="p-3">
      <div className="flex items-center gap-2">
        <div className="flex h-6 w-6 items-center justify-center rounded-md border border-border/60 bg-background/60 text-primary">
          <Layers className="h-3 w-3" />
        </div>
        <div className="min-w-0">
          <div className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            AI context
          </div>
          <div className="truncate text-sm font-medium tracking-tight">
            {label || "No active context"}
          </div>
        </div>
      </div>
      {context?.selectedText && (
        <div className="mt-2 rounded-md border border-border/60 bg-background/40 p-2 text-xs text-muted-foreground line-clamp-3">
          "{context.selectedText}"
        </div>
      )}
    </SurfaceCard>
  );
}
