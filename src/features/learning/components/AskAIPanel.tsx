import { Sparkles, Send } from "lucide-react";
import { SurfaceCard } from "@/components/common";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export function AskAIPanel({ context }: { context?: string }) {
  return (
    <SurfaceCard>
      <div className="flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-md border border-border/60 bg-background/60 text-primary">
          <Sparkles className="h-3.5 w-3.5" />
        </div>
        <div>
          <div className="text-sm font-medium tracking-tight">Ask AI</div>
          {context && (
            <div className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              Context: {context}
            </div>
          )}
        </div>
      </div>
      <Textarea
        placeholder="Ask about this lesson — concepts, code, exercises…"
        className="mt-3 min-h-[80px] resize-none bg-background/60"
        disabled
      />
      <div className="mt-3 flex items-center justify-between">
        <span className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
          AI assistant — coming soon
        </span>
        <Button size="sm" disabled>
          <Send className="h-3.5 w-3.5" />
          Send
        </Button>
      </div>
    </SurfaceCard>
  );
}