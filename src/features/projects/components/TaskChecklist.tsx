import { CheckCircle2, Circle, CircleDashed, CircleSlash } from "lucide-react";
import { SurfaceCard, EmptyState } from "@/components/common";
import { Badge } from "@/components/ui/badge";
import { ListChecks } from "lucide-react";
import type { ProjectTask, TaskStatus } from "../types";
import { taskStatusLabels } from "../utils";
import { SkillBadge } from "./SkillBadge";

const statusIcon: Record<TaskStatus, React.ComponentType<{ className?: string }>> = {
  todo: Circle,
  "in-progress": CircleDashed,
  done: CheckCircle2,
  blocked: CircleSlash,
};

export function TaskChecklist({ tasks }: { tasks?: ProjectTask[] }) {
  if (!tasks || tasks.length === 0) {
    return (
      <EmptyState
        icon={ListChecks}
        title="No tasks yet"
        description="Tasks will appear here as this project is defined. Each task supports dependencies, hints, and future AI review."
      />
    );
  }
  return (
    <div className="space-y-2">
      {tasks.map((t, idx) => {
        const Icon = statusIcon[t.status];
        return (
          <SurfaceCard key={t.id}>
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center text-muted-foreground">
                <Icon className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="text-sm font-medium text-foreground">
                    <span className="mr-1 text-muted-foreground">{String(idx + 1).padStart(2, "0")}.</span>
                    {t.title}
                  </div>
                  <Badge variant="secondary" className="rounded-md text-[10px]">
                    {taskStatusLabels[t.status]}
                  </Badge>
                </div>
                {t.description && (
                  <p className="text-xs leading-relaxed text-muted-foreground">{t.description}</p>
                )}
                <div className="flex flex-wrap items-center gap-3 text-[10px] text-muted-foreground">
                  {t.estimatedTime && <span>~{t.estimatedTime}</span>}
                  {(t.dependencies ?? []).length > 0 && (
                    <span>deps: {t.dependencies!.join(", ")}</span>
                  )}
                  {t.aiReview?.enabled && (
                    <Badge variant="outline" className="rounded-md text-[10px]">AI review</Badge>
                  )}
                </div>
                {(t.requiredSkills ?? []).length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {t.requiredSkills!.map((s) => <SkillBadge key={s} name={s} />)}
                  </div>
                )}
                {(t.hints ?? []).length > 0 && (
                  <details className="text-xs text-muted-foreground">
                    <summary className="cursor-pointer">Hints</summary>
                    <ul className="mt-1 ml-4 list-disc space-y-1">
                      {t.hints!.map((h, i) => <li key={i}>{h}</li>)}
                    </ul>
                  </details>
                )}
              </div>
            </div>
          </SurfaceCard>
        );
      })}
    </div>
  );
}
