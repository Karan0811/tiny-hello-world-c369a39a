import { Link } from "@tanstack/react-router";
import { Check, Circle, CircleDot, Clock, Lock } from "lucide-react";
import { SurfaceCard } from "@/components/common";
import { DifficultyBadge } from "@/features/learning/components";
import { ModuleProgressBar } from "./ModuleProgressBar";
import type { Module1Lesson } from "@/config/python-module-1";
import type { LessonStatus } from "../progress";
import { cn } from "@/lib/utils";

const statusMeta: Record<LessonStatus, { label: string; icon: typeof Check; className: string }> = {
  locked: { label: "Locked", icon: Lock, className: "text-muted-foreground" },
  available: { label: "Not started", icon: Circle, className: "text-muted-foreground" },
  "in-progress": { label: "In progress", icon: CircleDot, className: "text-primary" },
  completed: { label: "Completed", icon: Check, className: "text-emerald-500" },
};

type Props = {
  lesson: Module1Lesson;
  status: LessonStatus;
};

export function Module1LessonCard({ lesson, status }: Props) {
  const meta = statusMeta[status];
  const Icon = meta.icon;
  const locked = status === "locked";
  const progress = status === "completed" ? 100 : status === "in-progress" ? 45 : 0;

  const body = (
    <SurfaceCard
      interactive={!locked}
      className={cn("h-full", locked && "opacity-60")}
    >
      <div className="flex items-start gap-4">
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border/60 text-[11px] font-medium tabular-nums text-muted-foreground"
          aria-hidden="true"
        >
          {String(lesson.number).padStart(2, "0")}
        </div>
        <div className="min-w-0 flex-1 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="truncate text-sm font-medium tracking-tight text-foreground">
              {lesson.title}
            </h3>
            <span
              className={cn(
                "inline-flex items-center gap-1 text-[10px] font-medium uppercase tracking-[0.14em]",
                meta.className,
              )}
            >
              <Icon className="h-3 w-3" aria-hidden="true" />
              {meta.label}
            </span>
          </div>
          <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
            {lesson.summary}
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-md border border-border/60 bg-background/40 px-2 py-1 text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
              <Clock className="h-3 w-3" aria-hidden="true" />
              {lesson.estimatedMinutes}m
            </span>
            <DifficultyBadge difficulty={lesson.difficulty} />
          </div>
          <ModuleProgressBar compact value={progress} />
        </div>
      </div>
    </SurfaceCard>
  );

  if (locked) {
    return (
      <div
        aria-disabled="true"
        aria-label={`Lesson ${lesson.number}: ${lesson.title} — locked. Complete the previous lesson to unlock.`}
        className="cursor-not-allowed"
      >
        {body}
      </div>
    );
  }

  return (
    <Link
      to="/learning/python/module-1/$lesson"
      params={{ lesson: lesson.slug }}
      aria-label={`Lesson ${lesson.number}: ${lesson.title} — ${meta.label}`}
      className="block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      {body}
    </Link>
  );
}
