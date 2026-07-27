import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Clock,
  GraduationCap,
  Lock,
  PlayCircle,
  Sparkles,
} from "lucide-react";
import { PageContainer, PageSection } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import { SurfaceCard } from "@/components/common";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DifficultyBadge } from "@/features/learning/components";
import {
  Module1Breadcrumb,
  Module1LessonCard,
  ModuleProgressBar,
} from "@/features/python/module1/components";
import { useModule1Progress, formatDuration } from "@/features/python/module1/progress";
import { module1Lessons, pythonModule1 } from "@/config/python-module-1";

export const Route = createFileRoute("/_app/learning/python/module-1/")({
  head: () => ({
    meta: [
      { title: "Module 1 · Introduction & Environment Setup · AI University" },
      {
        name: "description",
        content:
          "Python Module 1: install Python, set up VS Code, run your first script, and learn to read errors — ten guided lessons with progress tracking.",
      },
      {
        property: "og:title",
        content: "Python Module 1 · Introduction & Environment Setup",
      },
      {
        property: "og:description",
        content:
          "Ten beginner lessons that get your Python environment working and your first program running.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Module1Overview,
});

function Module1Overview() {
  const progress = useModule1Progress();
  const resumeLesson = progress.currentLesson;
  const started = progress.completedCount > 0 || progress.totalSeconds > 0;

  return (
    <PageContainer>
      <Module1Breadcrumb />

      <div className="mb-4">
        <Button asChild variant="ghost" size="sm" className="h-7 px-2 text-xs">
          <Link to="/learning/python">
            <ArrowLeft className="h-3.5 w-3.5" />
            Python track
          </Link>
        </Button>
      </div>

      <PageHeader
        eyebrow={`Python · Module ${pythonModule1.number}`}
        title={pythonModule1.title}
        description={pythonModule1.description}
        actions={
          <>
            <Button asChild variant="outline" size="sm">
              <Link
                to="/learning/python/module-1/$lesson"
                params={{ lesson: module1Lessons[0].slug }}
              >
                <PlayCircle className="h-4 w-4" />
                Start module
              </Link>
            </Button>
            <Button asChild size="sm" disabled={!started}>
              <Link
                to="/learning/python/module-1/$lesson"
                params={{ lesson: resumeLesson.slug }}
              >
                <ArrowRight className="h-4 w-4" />
                Resume learning
              </Link>
            </Button>
          </>
        }
      />

      <div className="mt-6 flex flex-wrap items-center gap-2">
        <DifficultyBadge difficulty={pythonModule1.difficulty} />
        <span className="inline-flex items-center gap-1 rounded-md border border-border/60 bg-background/40 px-2 py-1 text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
          <Clock className="h-3 w-3" aria-hidden="true" />
          ~{Math.round(pythonModule1.estimatedMinutes / 60)}h {pythonModule1.estimatedMinutes % 60}m
        </span>
        <span className="inline-flex items-center gap-1 rounded-md border border-border/60 bg-background/40 px-2 py-1 text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
          <GraduationCap className="h-3 w-3" aria-hidden="true" />
          {module1Lessons.length} lessons
        </span>
        <span className="inline-flex items-center gap-1 rounded-md border border-border/60 bg-background/40 px-2 py-1 text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
          Time spent {formatDuration(progress.totalSeconds)}
        </span>
      </div>

      <SurfaceCard className="mt-6">
        <ModuleProgressBar
          value={progress.completionPct}
          label="Module progress"
          detail={`${progress.completedCount}/${progress.totalLessons} lessons · ${progress.completionPct}%`}
        />
      </SurfaceCard>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <SurfaceCard className="lg:col-span-2">
          <h2 className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
            Module objectives
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-foreground">
            {pythonModule1.objectives.map((o) => (
              <li key={o} className="flex gap-2">
                <span aria-hidden="true" className="text-muted-foreground">
                  —
                </span>
                {o}
              </li>
            ))}
          </ul>
        </SurfaceCard>

        <div className="space-y-6">
          <SurfaceCard>
            <h2 className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
              Skills gained
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {pythonModule1.skillsGained.map((s) => (
                <Badge key={s} variant="secondary" className="rounded-md bg-muted/40 text-[11px]">
                  {s}
                </Badge>
              ))}
            </div>
          </SurfaceCard>

          <SurfaceCard>
            <h2 className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
              Prerequisites
            </h2>
            <p className="mt-3 text-sm text-foreground">None — this is the starting point.</p>
          </SurfaceCard>
        </div>
      </div>

      <PageSection title="Lessons" description="Lessons unlock sequentially as you complete them.">
        <ol className="grid gap-3 md:grid-cols-2">
          {module1Lessons.map((lesson) => (
            <li key={lesson.slug}>
              <Module1LessonCard
                lesson={lesson}
                status={progress.statuses[lesson.slug] ?? "locked"}
              />
            </li>
          ))}
        </ol>
      </PageSection>

      <PageSection title="What's next" description="Unlocks when Module 1 is complete">
        <SurfaceCard className="opacity-70">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                <Lock className="h-3 w-3" aria-hidden="true" />
                Module {pythonModule1.nextModule.number} · Locked
              </div>
              <h3 className="mt-1 text-sm font-medium tracking-tight text-foreground">
                {pythonModule1.nextModule.title}
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">
                {pythonModule1.nextModule.description}
              </p>
            </div>
            <Button size="sm" variant="outline" disabled aria-disabled="true">
              <Lock className="h-3.5 w-3.5" />
              Locked
            </Button>
          </div>
        </SurfaceCard>
      </PageSection>

      <PageSection title="Finish line" description="Your module completion summary">
        <div className="grid gap-3 sm:grid-cols-2">
          <Button asChild variant="outline" size="sm" className="justify-start">
            <Link to="/learning/python/module-1/complete">
              <Sparkles className="h-4 w-4" />
              View completion summary
            </Link>
          </Button>
          <Button asChild variant="ghost" size="sm" className="justify-start">
            <Link to="/resources">
              <BookOpen className="h-4 w-4" />
              Supporting resources
            </Link>
          </Button>
        </div>
      </PageSection>
    </PageContainer>
  );
}
