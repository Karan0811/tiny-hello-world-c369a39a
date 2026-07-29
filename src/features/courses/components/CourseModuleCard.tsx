import { Link } from "@tanstack/react-router";
import { BookOpen, ChevronRight, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import type { CourseModule } from "@/lib/content/types";

export function CourseModuleCard({
  courseId,
  module,
  completed,
  total,
  pct,
}: {
  courseId: string;
  module: CourseModule;
  completed: number;
  total: number;
  pct: number;
}) {
  const first = module.lessons[0];
  return (
    <div className="rounded-xl border border-border/60 bg-card p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="truncate text-sm font-semibold text-foreground">
            {module.title}
          </h3>
          <div className="mt-1 flex flex-wrap items-center gap-3 text-[11px] text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <BookOpen className="h-3 w-3" />
              {total} lessons
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {Math.round(module.estimatedMinutes / 60)}h
            </span>
          </div>
        </div>
        <Badge variant="secondary" className="text-[10px]">
          {module.difficulty}
        </Badge>
      </div>

      <div className="mt-4 space-y-1.5">
        <div className="flex items-center justify-between text-[11px] text-muted-foreground">
          <span>
            {completed}/{total} complete
          </span>
          <span>{pct}%</span>
        </div>
        <Progress value={pct} />
      </div>

      <div className="mt-4 space-y-1">
        {module.lessons.slice(0, 4).map((lesson) => (
          <Link
            key={lesson.slug}
            to="/courses/$course/$lesson"
            params={{ course: courseId, lesson: lesson.slug }}
            className="flex items-center justify-between gap-2 rounded-md px-2 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <span className="truncate">
              {String(lesson.lessonNumber).padStart(2, "0")} · {lesson.title}
            </span>
            <ChevronRight className="h-3 w-3 shrink-0" />
          </Link>
        ))}
        {module.lessons.length > 4 && first ? (
          <Link
            to="/courses/$course"
            params={{ course: courseId }}
            hash={module.slug}
            className="block px-2 py-1.5 text-xs font-medium text-primary"
          >
            View all {module.lessons.length} lessons
          </Link>
        ) : null}
      </div>
    </div>
  );
}
