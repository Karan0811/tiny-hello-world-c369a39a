import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/button";
import { LessonViewer } from "@/features/courses/components";
import { useCourseProgress, useLessonTimer } from "@/features/courses/progress";
import { getCourse, getLessonNeighbours, loadLesson } from "@/lib/content/loader";

export const Route = createFileRoute("/_app/courses/$course/$lesson")({
  loader: async ({ params }) => {
    const content = await loadLesson(params.course, params.lesson);
    if (!content) throw notFound();
    const { previous, next } = getLessonNeighbours(params.course, params.lesson);
    return { content, previous, next };
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
    const { meta } = loaderData.content;
    const description = `${meta.title} — ${meta.module} lesson ${meta.lessonNumber}. ${meta.learningObjectives[0] ?? ""}`.trim();
    return {
      meta: [
        { title: `${meta.title} · AI University` },
        { name: "description", content: description.slice(0, 155) },
        { property: "og:title", content: `${meta.title} · AI University` },
        { property: "og:description", content: description.slice(0, 155) },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: LessonPage,
  errorComponent: ({ error }) => (
    <PageContainer>
      <p role="alert" className="text-sm text-destructive">
        {error.message}
      </p>
    </PageContainer>
  ),
  notFoundComponent: () => (
    <PageContainer>
      <p className="text-sm text-muted-foreground">Lesson not found.</p>
    </PageContainer>
  ),
});

function LessonPage() {
  const { content, previous, next } = Route.useLoaderData();
  const params = Route.useParams();
  const course = getCourse(params.course);
  const progress = useCourseProgress(course);
  useLessonTimer(content.meta.slug, progress.addTime);

  const slug = content.meta.slug;
  const completed = progress.isCompleted(slug);

  return (
    <PageContainer>
      <div className="mb-4">
        <Button asChild variant="ghost" size="sm" className="h-7 px-2 text-xs">
          <Link to="/courses/$course" params={{ course: params.course }}>
            <ArrowLeft className="h-3.5 w-3.5" />
            {course?.title ?? "Course"}
          </Link>
        </Button>
      </div>
      <LessonViewer
        content={content}
        previous={previous}
        next={next}
        completed={completed}
        onToggleComplete={() =>
          completed ? progress.uncompleteLesson(slug) : progress.completeLesson(slug)
        }
        secondsSpent={progress.timeSpent[slug] ?? 0}
        bestQuizScore={progress.quizScores[slug]}
        knownCards={progress.knownCards[slug] ?? []}
        onQuizComplete={(score) => progress.recordQuizScore(slug, score)}
        onToggleKnownCard={(index) => progress.toggleKnownCard(slug, index)}
      />
    </PageContainer>
  );
}
