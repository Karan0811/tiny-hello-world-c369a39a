import { Link } from "@tanstack/react-router";
import { Check, Lock } from "lucide-react";
import { SurfaceCard } from "@/components/common";
import { ModuleProgressBar } from "./ModuleProgressBar";
import { module1Lessons, pythonModule1 } from "@/config/python-module-1";
import type { LessonStatus } from "../progress";
import { cn } from "@/lib/utils";

type Props = {
  statuses: Record<string, LessonStatus>;
  completionPct: number;
  completedCount: number;
  activeLessonSlug?: string;
};

export function Module1Sidebar({
  statuses,
  completionPct,
  completedCount,
  activeLessonSlug,
}: Props) {
  return (
    <SurfaceCard className="lg:sticky lg:top-4">
      <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
        Module {pythonModule1.number}
      </div>
      <div className="mt-1 text-sm font-medium tracking-tight text-foreground">
        {pythonModule1.title}
      </div>
      <ModuleProgressBar
        className="mt-4"
        value={completionPct}
        label="Progress"
        detail={`${completedCount}/${module1Lessons.length}`}
      />
      <nav aria-label="Module 1 lessons" className="mt-4">
        <ol className="space-y-1">
          {module1Lessons.map((l) => {
            const status = statuses[l.slug] ?? "locked";
            const locked = status === "locked";
            const active = l.slug === activeLessonSlug;
            const inner = (
              <>
                <span className="w-6 shrink-0 text-[10px] tabular-nums uppercase tracking-[0.14em] text-muted-foreground/70">
                  {String(l.number).padStart(2, "0")}
                </span>
                <span className="truncate">{l.title}</span>
                {status === "completed" && (
                  <Check className="ml-auto h-3.5 w-3.5 shrink-0 text-emerald-500" aria-hidden="true" />
                )}
                {locked && (
                  <Lock className="ml-auto h-3.5 w-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
                )}
              </>
            );
            return (
              <li key={l.slug}>
                {locked ? (
                  <span
                    aria-disabled="true"
                    className="flex cursor-not-allowed items-center gap-2 rounded-md px-2 py-1.5 text-xs text-muted-foreground/60"
                  >
                    {inner}
                  </span>
                ) : (
                  <Link
                    to="/learning/python/module-1/$lesson"
                    params={{ lesson: l.slug }}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex items-center gap-2 rounded-md border border-transparent px-2 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-card hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      active && "border-border/60 bg-card text-foreground",
                    )}
                  >
                    {inner}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </SurfaceCard>
  );
}
