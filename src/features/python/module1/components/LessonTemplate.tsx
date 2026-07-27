import { Clock } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { DifficultyBadge } from "@/features/learning/components";
import { AskAIPanel } from "@/features/learning/components";
import { LessonSection } from "./LessonSection";
import { ModuleProgressBar } from "./ModuleProgressBar";
import { module1LessonSections, pythonModule1 } from "@/config/python-module-1";
import type { Module1Lesson } from "@/config/python-module-1";
import { formatDuration } from "../progress";

type Props = {
  lesson: Module1Lesson;
  status: string;
  secondsSpent: number;
  /** Optional authored content, keyed by section. Empty for now by design. */
  sections?: Partial<Record<string, React.ReactNode>>;
};

/**
 * Reusable lesson template. Every Module 1 lesson renders the same ordered
 * section scaffold; authored content is injected per-section later.
 */
export function LessonTemplate({ lesson, status, secondsSpent, sections }: Props) {
  return (
    <article className="space-y-6">
      <header>
        <PageHeader
          eyebrow={`Module ${pythonModule1.number} · Lesson ${String(lesson.number).padStart(2, "0")}`}
          title={lesson.title}
          description={lesson.summary}
          actions={
            <div className="flex flex-wrap items-center gap-2">
              <DifficultyBadge difficulty={lesson.difficulty} />
              <span className="inline-flex items-center gap-1 rounded-md border border-border/60 bg-background/40 px-2 py-1 text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                <Clock className="h-3 w-3" aria-hidden="true" />
                {lesson.estimatedMinutes}m
              </span>
              <span className="inline-flex items-center gap-1 rounded-md border border-border/60 bg-background/40 px-2 py-1 text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                Time spent {formatDuration(secondsSpent)}
              </span>
            </div>
          }
        />
        <ModuleProgressBar
          className="mt-4"
          compact
          value={status === "completed" ? 100 : secondsSpent > 0 ? 45 : 0}
          label="Lesson progress"
        />
      </header>

      {module1LessonSections.map((section, i) =>
        section.key === "mentor" ? (
          <section
            key={section.key}
            id={section.key}
            aria-label="AI Mentor"
            className="scroll-mt-24"
          >
            <AskAIPanel context={`Python · Module 1 · ${lesson.title}`} />
          </section>
        ) : (
          <LessonSection
            key={section.key}
            id={section.key}
            title={section.label}
            hint={section.hint}
            index={i}
          >
            {sections?.[section.key]}
          </LessonSection>
        ),
      )}
    </article>
  );
}
