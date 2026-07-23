import { SurfaceCard, EmptyState } from "@/components/common";
import { GitBranch } from "lucide-react";
import type { ProjectTask } from "../types";
import { taskStatusLabels } from "../utils";

// Roadmap for a single project — an ordered view of its tasks with dep edges.
export function ProjectTimeline({ tasks }: { tasks?: ProjectTask[] }) {
  if (!tasks || tasks.length === 0) {
    return (
      <EmptyState
        icon={GitBranch}
        title="Roadmap unavailable"
        description="A project's roadmap is generated from its tasks. Add tasks to visualize progression."
      />
    );
  }
  return (
    <SurfaceCard>
      <ol className="relative space-y-4 border-l border-border/60 pl-5">
        {tasks.map((t) => (
          <li key={t.id} className="relative">
            <span className="absolute -left-[27px] top-1.5 h-2.5 w-2.5 rounded-full border border-border bg-background" />
            <div className="text-sm font-medium text-foreground">{t.title}</div>
            <div className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
              {taskStatusLabels[t.status]}
              {t.estimatedTime ? ` · ${t.estimatedTime}` : ""}
            </div>
            {(t.dependencies ?? []).length > 0 && (
              <div className="mt-1 text-[10px] text-muted-foreground">
                depends on: {t.dependencies!.join(", ")}
              </div>
            )}
          </li>
        ))}
      </ol>
    </SurfaceCard>
  );
}
