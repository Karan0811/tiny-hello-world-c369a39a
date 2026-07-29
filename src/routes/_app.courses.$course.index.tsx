import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { CourseDashboard } from "@/features/courses/components";
import { useCourseProgress } from "@/features/courses/progress";
import { getCourse } from "@/lib/content/loader";

export const Route = createFileRoute("/_app/courses/$course/")({
  loader: ({ params }) => {
    const course = getCourse(params.course);
    if (!course || !course.lessonCount) throw notFound();
    return { course };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Course unavailable · AI University" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { course } = loaderData;
    return {
      meta: [
        { title: `${course.title} Course · AI University` },
        { name: "description", content: course.description },
        { property: "og:title", content: `${course.title} · AI University` },
        { property: "og:description", content: course.description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: CoursePage,
  errorComponent: ({ error }) => (
    <PageContainer>
      <p role="alert" className="text-sm text-destructive">
        {error.message}
      </p>
    </PageContainer>
  ),
  notFoundComponent: () => (
    <PageContainer>
      <p className="text-sm text-muted-foreground">
        That course has no content yet.
      </p>
    </PageContainer>
  ),
});

function CoursePage() {
  const { course } = Route.useLoaderData();
  const progress = useCourseProgress(course);

  return (
    <PageContainer>
      <div className="mb-4">
        <Button asChild variant="ghost" size="sm" className="h-7 px-2 text-xs">
          <Link to="/courses">
            <ArrowLeft className="h-3.5 w-3.5" />
            All courses
          </Link>
        </Button>
      </div>
      <PageHeader
        eyebrow="Course"
        title={course.title}
        description={course.description}
      />
      <div className="mt-8">
        <CourseDashboard
          course={course}
          completedCount={progress.completedCount}
          completionPct={progress.completionPct}
          totalSeconds={progress.totalSeconds}
          moduleProgress={progress.moduleProgress}
          isCompleted={progress.isCompleted}
          nextLessonSlug={progress.nextLesson?.slug ?? null}
        />
      </div>
    </PageContainer>
  );
}
