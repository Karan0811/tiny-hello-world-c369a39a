import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Clock } from "lucide-react";
import { SurfaceCard } from "@/components/common";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { DifficultyBadge, PrerequisiteBadge } from "./PrerequisiteBadge";
import type { ModuleDefinition, LearningProgress } from "../types";

type Props = {
  categorySlug: string;
  module: ModuleDefinition;
  progress?: LearningProgress;
};

export function ModuleCard({ categorySlug, module, progress }: Props) {
  return (
    <SurfaceCard className="h-full">
      <div className="flex h-full flex-col gap-3">
        <div className="flex items-center gap-2">
          <DifficultyBadge difficulty={module.difficulty} />
          <PrerequisiteBadge status={module.status} />
        </div>
        <div className="space-y-1">
          <div className="text-sm font-medium tracking-tight text-foreground">
            {module.title}
          </div>
          <p className="text-xs leading-relaxed text-muted-foreground line-clamp-3">
            {module.description}
          </p>
        </div>
        <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {module.estimatedHours ? `${module.estimatedHours}h` : "—"}
          </span>
          <span>{module.lessons.length} lessons</span>
        </div>
        <Progress value={progress?.completionPct ?? 0} className="h-1.5" />
        <div className="mt-auto flex items-center justify-end border-t border-border/50 pt-3">
          <Button asChild size="sm" variant="ghost" className="h-7 px-2">
            <Link
              to="/learning/$category/$module"
              params={{ category: categorySlug, module: module.slug }}
              className="flex items-center gap-1 text-xs"
            >
              Open module
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </div>
    </SurfaceCard>
  );
}