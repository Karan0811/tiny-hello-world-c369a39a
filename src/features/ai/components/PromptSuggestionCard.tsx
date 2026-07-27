import { SurfaceCard } from "@/components/common";
import { Sparkles } from "lucide-react";
import type { PromptTemplate } from "../types";

export function PromptSuggestionCard({
  template,
  onSelect,
}: {
  template: Pick<PromptTemplate, "id" | "label" | "description">;
  onSelect?: (id: string) => void;
}) {
  return (
    <button type="button" onClick={() => onSelect?.(template.id)} className="text-left">
      <SurfaceCard interactive className="p-3">
        <div className="flex items-start gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-md border border-border/60 bg-background/60 text-primary">
            <Sparkles className="h-3 w-3" />
          </div>
          <div className="min-w-0">
            <div className="text-sm font-medium tracking-tight">{template.label}</div>
            <div className="mt-0.5 text-xs text-muted-foreground line-clamp-2">
              {template.description}
            </div>
          </div>
        </div>
      </SurfaceCard>
    </button>
  );
}
