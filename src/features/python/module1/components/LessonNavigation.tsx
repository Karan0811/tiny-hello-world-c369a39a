import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, LayoutList } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Module1Lesson } from "@/config/python-module-1";

type Props = {
  previous?: Module1Lesson;
  next?: Module1Lesson;
  nextLocked?: boolean;
  completed: boolean;
  onToggleComplete: () => void;
};

export function LessonNavigation({
  previous,
  next,
  nextLocked,
  completed,
  onToggleComplete,
}: Props) {
  return (
    <nav
      aria-label="Lesson navigation"
      className="flex flex-col gap-3 border-t border-border/50 pt-6 sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="flex flex-wrap items-center gap-2">
        {previous ? (
          <Button asChild variant="outline" size="sm">
            <Link to="/learning/python/module-1/$lesson" params={{ lesson: previous.slug }}>
              <ArrowLeft className="h-3.5 w-3.5" />
              <span className="max-w-[10rem] truncate">Previous: {previous.title}</span>
            </Link>
          </Button>
        ) : (
          <Button variant="outline" size="sm" disabled>
            <ArrowLeft className="h-3.5 w-3.5" />
            Previous
          </Button>
        )}
        <Button asChild variant="ghost" size="sm">
          <Link to="/learning/python/module-1">
            <LayoutList className="h-3.5 w-3.5" />
            Back to module
          </Link>
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Button
          variant={completed ? "secondary" : "default"}
          size="sm"
          onClick={onToggleComplete}
          aria-pressed={completed}
        >
          <Check className="h-3.5 w-3.5" />
          {completed ? "Completed" : "Mark complete"}
        </Button>
        {next ? (
          <Button asChild size="sm" variant="outline" disabled={nextLocked}>
            <Link
              to="/learning/python/module-1/$lesson"
              params={{ lesson: next.slug }}
              aria-disabled={nextLocked}
              onClick={(e) => {
                if (nextLocked) e.preventDefault();
              }}
              className={nextLocked ? "pointer-events-none opacity-50" : undefined}
            >
              <span className="max-w-[10rem] truncate">Next: {next.title}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        ) : (
          <Button asChild size="sm">
            <Link to="/learning/python/module-1/complete">
              Finish module
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        )}
      </div>
    </nav>
  );
}
