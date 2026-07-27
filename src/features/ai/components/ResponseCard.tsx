import { SurfaceCard } from "@/components/common";
import { Sparkles } from "lucide-react";
import type { ReactNode } from "react";

export function ResponseCard({
  title = "AI response",
  children,
  footer,
}: {
  title?: string;
  children?: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <SurfaceCard className="p-4">
      <div className="flex items-center gap-2">
        <div className="flex h-6 w-6 items-center justify-center rounded-md border border-border/60 bg-background/60 text-primary">
          <Sparkles className="h-3 w-3" />
        </div>
        <div className="text-sm font-medium tracking-tight">{title}</div>
      </div>
      <div className="mt-3 text-sm leading-relaxed text-foreground/90">
        {children ?? (
          <span className="text-xs text-muted-foreground italic">
            Response will render here once a provider is connected.
          </span>
        )}
      </div>
      {footer && <div className="mt-3 border-t border-border/60 pt-3">{footer}</div>}
    </SurfaceCard>
  );
}
