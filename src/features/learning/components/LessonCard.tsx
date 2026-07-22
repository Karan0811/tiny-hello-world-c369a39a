import { Link } from "@tanstack/react-router";
import { ChevronRight, Clock } from "lucide-react";
import { SurfaceCard } from "@/components/common";
import { PrerequisiteBadge } from "./PrerequisiteBadge";
import type { LessonRef } from "../types";

type Props = {
  categorySlug: string;
  moduleSlug: string;
  lesson: LessonRef;
  index?: number;
};

export function LessonCard({ categorySlug, moduleSlug, lesson, index }: Props) {
  return (
    <Link
      to="/learning/$category/$module/$lesson"
      params={{ category: categorySlug, module: moduleSlug, lesson: lesson.slug }}
      className="block"
    >
      <SurfaceCard interactive>
        <div className="flex items-center gap-4">
          {index != null && (
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border/60 text-[11px] font-medium text-muted-foreground">
              {String(index + 1).padStart(2, "0")}
            </div>
          )}
          <div className="min-w-0 flex-1 space-y-1">
            <div className="truncate text-sm font-medium tracking-tight text-foreground">
              {lesson.title}
            </div>
            {lesson.summary && (
              <p className="line-clamp-1 text-xs text-muted-foreground">{lesson.summary}</p>
            )}
          </div>
          <div className="flex items-center gap-3">
            {lesson.estimatedMinutes != null && (
              <span className="flex items-center gap-1 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                <Clock className="h-3 w-3" />
                {lesson.estimatedMinutes}m
              </span>
            )}
            <PrerequisiteBadge status={lesson.status} />
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      </SurfaceCard>
    </Link>
  );
}