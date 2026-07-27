import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageContainer } from "@/components/layout/PageContainer";
import { EmptyState } from "@/components/common";
import { Button } from "@/components/ui/button";
import {
  LessonNavigation,
  LessonTemplate,
  Module1Breadcrumb,
  Module1Sidebar,
} from "@/features/python/module1/components";
import {
  useLessonTimeTracker,
  useModule1Progress,
} from "@/features/python/module1/progress";
import {
  getModule1Lesson,
  getModule1LessonNeighbours,
  pythonModule1,
} from "@/config/python-module-1";

export const Route = createFileRoute("/_app/learning/python/module-1/$lesson")({
  loader: ({ params }) => {
    const lesson = getModule1Lesson(params.lesson);
    if (!lesson) throw notFound();
    return { lesson };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Lesson unavailable · AI University" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { lesson } = loaderData;
    return {
      meta: [
        { title: `${lesson.title} · Python Module 1 · AI University` },
        { name: "description", content: lesson.summary },
        { property: "og:title", content: `${lesson.title} · Python Module 1` },
        { property: "og:description", content: lesson.summary },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: Module1LessonPage,
  notFoundComponent: Module1LessonNotFound,
});

function Module1LessonPage() {
  const { lesson } = Route.useLoaderData();
  const progress = useModule1Progress();
  const { previous, next } = getModule1LessonNeighbours(lesson.slug);
  useLessonTimeTracker(lesson.slug, progress.addTime);

  const status = progress.statuses[lesson.slug] ?? "available";
  const completed = status === "completed";
  const nextLocked = next ? !completed && !progress.isCompleted(next.slug) : false;

  return (
    <PageContainer>
      <Module1Breadcrumb lessonTitle={lesson.title} />

      <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
        <div className="order-2 lg:order-1">
          <Module1Sidebar
            statuses={progress.statuses}
            completionPct={progress.completionPct}
            completedCount={progress.completedCount}
            activeLessonSlug={lesson.slug}
          />
        </div>

        <div className="order-1 min-w-0 space-y-6 lg:order-2">
          <LessonTemplate
            lesson={lesson}
            status={status}
            secondsSpent={progress.timeSpent[lesson.slug] ?? 0}
          />
          <LessonNavigation
            previous={previous}
            next={next}
            nextLocked={nextLocked}
            completed={completed}
            onToggleComplete={() =>
              completed
                ? progress.uncompleteLesson(lesson.slug)
                : progress.completeLesson(lesson.slug)
            }
          />
        </div>
      </div>
    </PageContainer>
  );
}

function Module1LessonNotFound() {
  return (
    <PageContainer>
      <EmptyState
        title="Lesson not found"
        description={`This lesson isn't part of ${pythonModule1.title}.`}
        action={
          <Button asChild size="sm" variant="outline">
            <Link to="/learning/python/module-1">Back to Module 1</Link>
          </Button>
        }
      />
    </PageContainer>
  );
}
