import { ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { SurfaceCard } from "@/components/common";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { DifficultyBadge } from "./PrerequisiteBadge";
import { getCategoryIcon } from "../icons";
import type { LearningCategoryDefinition, LearningProgress } from "../types";

type Props = {
  category: LearningCategoryDefinition;
  progress?: LearningProgress;
};

export function LearningCategoryCard({ category, progress }: Props) {
  const Icon = getCategoryIcon(category.iconKey);
  const lessonCount =
    category.estimatedLessons ??
    category.modules.reduce((n, m) => n + m.lessons.length, 0);

  return (
    <SurfaceCard className="h-full">
      <div className="flex h-full flex-col gap-4">
        <div className="flex items-start justify-between">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 bg-background/60 text-foreground/80">
            <Icon className="h-4 w-4" />
          </div>
          <DifficultyBadge difficulty={category.difficulty} />
        </div>
        <div className="flex-1 space-y-1">
          <div className="text-sm font-medium tracking-tight text-foreground">
            {category.name}
          </div>
          <p className="text-xs leading-relaxed text-muted-foreground">
            {category.description}
          </p>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            <span>{lessonCount ? `${lessonCount} lessons` : "Lessons — TBD"}</span>
            <span>{progress?.completionPct != null ? `${progress.completionPct}%` : "—"}</span>
          </div>
          <Progress value={progress?.completionPct ?? 0} className="h-1.5" />
        </div>
        <div className="flex items-center justify-between border-t border-border/50 pt-3">
          <span className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground/80">
            {category.modules.length
              ? `${category.modules.length} modules`
              : "Modules coming soon"}
          </span>
          <Button asChild size="sm" variant="ghost" className="h-7 px-2">
            <Link
              to="/learning/$category"
              params={{ category: category.slug }}
              className="flex items-center gap-1 text-xs"
            >
              Open
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </div>
    </SurfaceCard>
  );
}