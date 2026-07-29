import { Link } from "@tanstack/react-router";
import { Clock, GraduationCap, Lock, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { LessonMeta } from "@/lib/content/types";

export function CourseLessonCard({
  lesson,
  completed,
  active,
}: {
  lesson: LessonMeta;
  completed?: boolean;
  active?: boolean;
}) {
  return (
    <Link
      to="/courses/$course/$lesson"
      params={{ course: lesson.courseId, lesson: lesson.slug }}
      className={cn(
        "group flex items-start gap-3 rounded-xl border border-border/60 bg-card p-4 transition-colors hover:border-primary/50 hover:bg-accent/40",
        active && "border-primary/60 bg-primary/5",
      )}
    >
      <span
        className={cn(
          "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[11px] font-semibold",
          completed
            ? "bg-primary/15 text-primary"
            : "bg-muted text-muted-foreground",
        )}
      >
        {completed ? (
          <CheckCircle2 className="h-4 w-4" />
        ) : (
          String(lesson.lessonNumber).padStart(2, "0")
        )}
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-center gap-2">
          <span className="truncate text-sm font-medium text-foreground">
            {lesson.title}
          </span>
          <Badge variant="secondary" className="text-[10px]">
            {lesson.difficulty}
          </Badge>
        </span>
        <span className="mt-1 flex flex-wrap items-center gap-3 text-[11px] text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {lesson.estimatedTime}
          </span>
          <span className="inline-flex items-center gap-1">
            <GraduationCap className="h-3 w-3" />
            {lesson.module}
          </span>
        </span>
      </span>
    </Link>
  );
}

export function LockedLessonRow({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-dashed border-border/60 p-4 text-sm text-muted-foreground">
      <Lock className="h-4 w-4" />
      {title}
    </div>
  );
}
