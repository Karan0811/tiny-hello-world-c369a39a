import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  Clock,
  Layers,
  Target,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProgressTracker } from "./ProgressTracker";
import { CourseModuleCard } from "./CourseModuleCard";
import { CourseLessonCard } from "./CourseLessonCard";
import { SearchComponent } from "./SearchComponent";
import { formatDuration } from "../progress";
import type { Course } from "@/lib/content/types";

type ModuleProgress = Record<
  string,
  { completed: number; total: number; pct: number }
>;

export function CourseDashboard({
  course,
  completedCount,
  completionPct,
  totalSeconds,
  moduleProgress,
  isCompleted,
  nextLessonSlug,
}: {
  course: Course;
  completedCount: number;
  completionPct: number;
  totalSeconds: number;
  moduleProgress: ModuleProgress;
  isCompleted: (slug: string) => boolean;
  nextLessonSlug: string | null;
}) {
  const [query, setQuery] = useState("");
  const [moduleFilter, setModuleFilter] = useState<string>("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return course.lessons.filter((lesson) => {
      const matchesModule =
        moduleFilter === "all" || lesson.module === moduleFilter;
      if (!matchesModule) return false;
      if (!q) return true;
      return (
        lesson.title.toLowerCase().includes(q) ||
        lesson.module.toLowerCase().includes(q) ||
        lesson.tags.some((t) => t.toLowerCase().includes(q)) ||
        lesson.skills.some((s) => s.toLowerCase().includes(q))
      );
    });
  }, [course.lessons, moduleFilter, query]);

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <ProgressTracker
          label="Course progress"
          completed={completedCount}
          total={course.lessonCount}
          pct={completionPct}
          meta={formatDuration(totalSeconds)}
          className="sm:col-span-2"
        />
        <Stat icon={Layers} label="Modules" value={String(course.modules.length)} />
        <Stat
          icon={Clock}
          label="Total study time"
          value={`${Math.round(course.estimatedMinutes / 60)}h`}
        />
      </div>

      {nextLessonSlug ? (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-primary/40 bg-primary/5 p-5">
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              {completedCount ? "Continue where you left off" : "Start the course"}
            </p>
            <p className="mt-1 text-sm font-medium">
              {course.lessons.find((l) => l.slug === nextLessonSlug)?.title}
            </p>
          </div>
          <Button asChild size="sm">
            <Link
              to="/courses/$course/$lesson"
              params={{ course: course.id, lesson: nextLessonSlug }}
            >
              {completedCount ? "Resume" : "Start"}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      ) : null}

      <section className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Modules
        </h2>
        <div className="grid gap-4 lg:grid-cols-2">
          {course.modules.map((module) => {
            const p = moduleProgress[module.slug] ?? {
              completed: 0,
              total: module.lessons.length,
              pct: 0,
            };
            return (
              <div key={module.slug} id={module.slug} className="scroll-mt-24">
                <CourseModuleCard
                  courseId={course.id}
                  module={module}
                  completed={p.completed}
                  total={p.total}
                  pct={p.pct}
                />
              </div>
            );
          })}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            All lessons
          </h2>
          <div className="w-full sm:w-72">
            <SearchComponent
              value={query}
              onChange={setQuery}
              placeholder="Search lessons, skills, tags…"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <FilterChip
            label={`All (${course.lessonCount})`}
            active={moduleFilter === "all"}
            onClick={() => setModuleFilter("all")}
          />
          {course.modules.map((m) => (
            <FilterChip
              key={m.slug}
              label={`${m.title} (${m.lessons.length})`}
              active={moduleFilter === m.title}
              onClick={() => setModuleFilter(m.title)}
            />
          ))}
        </div>

        {filtered.length ? (
          <div className="grid gap-3 lg:grid-cols-2">
            {filtered.map((lesson) => (
              <CourseLessonCard
                key={lesson.slug}
                lesson={lesson}
                completed={isCompleted(lesson.slug)}
              />
            ))}
          </div>
        ) : (
          <p className="rounded-xl border border-dashed border-border/60 p-6 text-center text-sm text-muted-foreground">
            No lessons match “{query}”.
          </p>
        )}
      </section>
    </div>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof BookOpen;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-border/60 bg-card p-5">
      <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </div>
      <p className="mt-3 text-2xl font-semibold tracking-tight">{value}</p>
    </div>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button type="button" onClick={onClick}>
      <Badge
        variant={active ? "default" : "secondary"}
        className="cursor-pointer text-[11px] font-medium"
      >
        <Target className="mr-1 h-3 w-3" />
        {label}
      </Badge>
    </button>
  );
}
