import { Sparkles, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { AIProviderDefinition } from "../types";

export function ConversationHeader({
  title,
  provider,
  modelLabel,
  onReset,
}: {
  title: string;
  provider?: AIProviderDefinition;
  modelLabel?: string;
  onReset?: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-border/60 pb-3">
      <div className="flex items-center gap-2 min-w-0">
        <div className="flex h-7 w-7 items-center justify-center rounded-md border border-border/60 bg-background/60 text-primary">
          <Sparkles className="h-3.5 w-3.5" />
        </div>
        <div className="min-w-0">
          <div className="truncate text-sm font-medium tracking-tight">{title}</div>
          <div className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            {provider ? provider.name : "No provider"}
            {modelLabel ? ` · ${modelLabel}` : ""}
          </div>
        </div>
      </div>
      {onReset && (
        <Button variant="ghost" size="sm" className="h-7 px-2 text-xs" onClick={onReset}>
          <RotateCcw className="h-3.5 w-3.5" />
          Reset
        </Button>
      )}
    </div>
  );
}
