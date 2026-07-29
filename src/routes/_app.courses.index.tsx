import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Clock } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { listCourses } from "@/lib/content/loader";

type CourseCardData = {
  id: string;
  title: string;
  description: string;
  status: "available" | "coming-soon";
  lessonCount: number;
  moduleCount: number;
  hours: number;
};

export const Route = createFileRoute("/_app/courses/")({
  head: () => ({
    meta: [
      { title: "Courses · AI University" },
      {
        name: "description",
        content:
          "Content-driven AI University courses: Python, machine learning, generative AI, MLOps and more.",
      },
      { property: "og:title", content: "Courses · AI University" },
      {
        property: "og:description",
        content: "Browse every content-driven course on AI University.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: (): CourseCardData[] =>
    listCourses().map((c) => ({
      id: c.id,
      title: c.title,
      description: c.description,
      status: c.status,
      lessonCount: c.lessonCount,
      moduleCount: c.modules.length,
      hours: Math.round(c.estimatedMinutes / 60),
    })),
  component: CoursesIndexPage,
  errorComponent: ({ error }) => (
    <PageContainer>
      <p role="alert" className="text-sm text-destructive">
        {error.message}
      </p>
    </PageContainer>
  ),
  notFoundComponent: () => (
    <PageContainer>
      <p className="text-sm text-muted-foreground">No courses found.</p>
    </PageContainer>
  ),
});

function CoursesIndexPage() {
  const courses = Route.useLoaderData();

  return (
    <PageContainer>
      <PageHeader
        eyebrow="Courses"
        title="Learn from content, not code"
        description="Every course below is generated from markdown and JSON in the content directory. Update the files, and the platform updates itself."
      />
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <div
            key={course.id}
            className="flex flex-col rounded-xl border border-border/60 bg-card p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-sm font-semibold">{course.title}</h2>
              <Badge
                variant={course.status === "available" ? "default" : "secondary"}
                className="text-[10px]"
              >
                {course.status === "available" ? "Available" : "Coming soon"}
              </Badge>
            </div>
            <p className="mt-2 flex-1 text-xs text-muted-foreground">
              {course.description}
            </p>
            <div className="mt-4 flex items-center gap-4 text-[11px] text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <BookOpen className="h-3 w-3" />
                {course.lessonCount} lessons
              </span>
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {course.hours}h
              </span>
            </div>
            <Button
              asChild={course.status === "available"}
              disabled={course.status !== "available"}
              size="sm"
              variant="outline"
              className="mt-4"
            >
              {course.status === "available" ? (
                <Link to="/courses/$course" params={{ course: course.id }}>
                  Open course
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              ) : (
                <span>Coming soon</span>
              )}
            </Button>
          </div>
        ))}
      </div>
    </PageContainer>
  );
}
