import { Repeat } from "lucide-react";
import { SurfaceCard, EmptyState } from "@/components/common";

export function PythonRevisionPanel() {
  return (
    <SurfaceCard>
      <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
        <Repeat className="h-3.5 w-3.5" />
        Quick revision
      </div>
      <EmptyState
        className="mt-4 border-none bg-transparent px-0 py-6"
        title="Spaced-repetition cards"
        description="Revision items surface here per module as content is authored."
      />
    </SurfaceCard>
  );
}
