import { Database, Download, FileText } from "lucide-react";
import { SurfaceCard } from "@/components/common";
import { Badge } from "@/components/ui/badge";
import type { DatasetRef } from "../types";

export function DatasetCard({ dataset }: { dataset: DatasetRef }) {
  return (
    <SurfaceCard>
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border/60 bg-background/60">
          <Database className="h-4 w-4" />
        </div>
        <div className="min-w-0 flex-1 space-y-2">
          <div className="text-sm font-semibold tracking-tight">{dataset.name}</div>
          {dataset.description && (
            <p className="text-xs leading-relaxed text-muted-foreground">{dataset.description}</p>
          )}
          <div className="flex flex-wrap gap-1.5">
            {dataset.domain && <Badge variant="outline" className="rounded-md text-[10px]">{dataset.domain}</Badge>}
            {dataset.size && <Badge variant="secondary" className="rounded-md text-[10px]">{dataset.size}</Badge>}
            {dataset.license && <Badge variant="secondary" className="rounded-md text-[10px]">{dataset.license}</Badge>}
            {dataset.source && <Badge variant="secondary" className="rounded-md text-[10px]">{dataset.source}</Badge>}
          </div>
          <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
            <span className="inline-flex items-center gap-1"><Download className="h-3 w-3" /> Download placeholder</span>
            <span className="inline-flex items-center gap-1"><FileText className="h-3 w-3" /> Docs placeholder</span>
          </div>
        </div>
      </div>
    </SurfaceCard>
  );
}
