import { Flag } from "lucide-react";
import { SurfaceCard } from "@/components/common";
import { Badge } from "@/components/ui/badge";
import type { RoadmapNode } from "../types";
import { statusLabels } from "../utils";

type Props = {
  node: RoadmapNode;
};

export function MilestoneCard({ node }: Props) {
  return (
    <SurfaceCard>
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 bg-background/60 text-muted-foreground">
          <Flag className="h-4 w-4" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <div className="truncate text-sm font-semibold tracking-tight text-foreground">
              {node.title}
            </div>
            <Badge
              variant="outline"
              className="rounded-md text-[10px] uppercase tracking-[0.14em] text-muted-foreground"
            >
              {statusLabels[node.status]}
            </Badge>
          </div>
          {node.description && (
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              {node.description}
            </p>
          )}
        </div>
      </div>
    </SurfaceCard>
  );
}
