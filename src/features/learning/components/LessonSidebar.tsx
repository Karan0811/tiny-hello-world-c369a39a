import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { SurfaceCard } from "@/components/common";
import type { LessonRef } from "../types";

type Props = {
  categorySlug: string;
  moduleSlug: string;
  moduleTitle: string;
  lessons: LessonRef[];
  activeLessonSlug?: string;
};

export function LessonSidebar({
  categorySlug,
  moduleSlug,
  moduleTitle,
  lessons,
  activeLessonSlug,
}: Props) {
  return (
    <SurfaceCard className="sticky top-4">
      <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
        Module
      </div>
      <div className="mt-1 text-sm font-medium tracking-tight text-foreground">
        {moduleTitle}
      </div>
      <div className="mt-4 space-y-1">
        {lessons.length === 0 && (
          <div className="rounded-md border border-dashed border-border/60 px-3 py-4 text-center text-xs text-muted-foreground">
            Lessons will appear here.
          </div>
        )}
        {lessons.map((l, i) => {
          const active = l.slug === activeLessonSlug;
          return (
            <Link
              key={l.slug}
              to="/learning/$category/$module/$lesson"
              params={{ category: categorySlug, module: moduleSlug, lesson: l.slug }}
              className={cn(
                "flex items-center gap-2 rounded-md border border-transparent px-2 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-card hover:text-foreground",
                active && "border-border/60 bg-card text-foreground",
              )}
            >
              <span className="w-6 text-[10px] uppercase tracking-[0.14em] text-muted-foreground/70">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="truncate">{l.title}</span>
            </Link>
          );
        })}
      </div>
    </SurfaceCard>
  );
}