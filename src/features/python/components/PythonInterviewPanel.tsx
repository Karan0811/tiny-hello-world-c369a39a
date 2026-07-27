import { MessagesSquare } from "lucide-react";
import { SurfaceCard, EmptyState } from "@/components/common";

export function PythonInterviewPanel() {
  return (
    <SurfaceCard>
      <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
        <MessagesSquare className="h-3.5 w-3.5" />
        Interview prep
      </div>
      <EmptyState
        className="mt-4 border-none bg-transparent px-0 py-6"
        title="Curated interview questions"
        description="Prep tied to each module surfaces here as content is authored."
      />
    </SurfaceCard>
  );
}
