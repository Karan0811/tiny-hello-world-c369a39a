import { SurfaceCard } from "@/components/common";
import { Progress } from "@/components/ui/progress";
import type { ProjectTask } from "../types";

export function ProjectProgressCard({ tasks }: { tasks?: ProjectTask[] }) {
  const total = tasks?.length ?? 0;
  const done = (tasks ?? []).filter((t) => t.status === "done").length;
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);
  return (
    <SurfaceCard>
      <div className="space-y-3">
        <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
          Progress
        </div>
        <div className="flex items-baseline justify-between">
          <div className="text-2xl font-semibold tracking-tight">{pct}%</div>
          <div className="text-xs text-muted-foreground">{done}/{total} tasks</div>
        </div>
        <Progress value={pct} />
      </div>
    </SurfaceCard>
  );
}
