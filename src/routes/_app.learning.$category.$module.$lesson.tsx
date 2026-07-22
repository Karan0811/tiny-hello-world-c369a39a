import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import { EmptyState, SurfaceCard } from "@/components/common";
import { Button } from "@/components/ui/button";
import {
  LessonSidebar,
  LearningModeSwitcher,
  TabbedSections,
  ResourcePanel,
  AskAIPanel,
  DifficultyBadge,
  PrerequisiteBadge,
} from "@/features/learning/components";
import { getCategory, getModule } from "@/config/learning";
import type {
  LearningCategoryDefinition,
  LessonRef,
  ModuleDefinition,
} from "@/features/learning/types";

export const Route = createFileRoute(
  "/_app/learning/$category/$module/$lesson",
)({
  loader: ({ params }) => {
    const category = getCategory(params.category);
    const module = getModule(params.category, params.module);
    const lesson = module?.lessons.find((l) => l.slug === params.lesson);
    if (!category || !module || !lesson) throw notFound();
    return { category, module, lesson };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Lesson — AI University" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { lesson, module } = loaderData;
    return {
      meta: [
        { title: `${lesson.title} · ${module.title} · AI University` },
        {
          name: "description",
          content: lesson.summary ?? `Lesson in ${module.title}.`,
        },
        { property: "og:title", content: `${lesson.title} · AI University` },
        {
          property: "og:description",
          content: lesson.summary ?? module.description,
        },
      ],
    };
  },
  component: LessonPage,
  notFoundComponent: LessonNotFound,
});

function LessonPage() {
  const { category, module, lesson } = Route.useLoaderData() as {
    category: LearningCategoryDefinition;
    module: ModuleDefinition;
    lesson: LessonRef;
  };
  const idx = module.lessons.findIndex((l: LessonRef) => l.slug === lesson.slug);
  const nextLesson = module.lessons[idx + 1];

  return (
    <PageContainer>
      <div className="mb-4">
        <Button asChild variant="ghost" size="sm" className="h-7 px-2 text-xs">
          <Link
            to="/learning/$category/$module"
            params={{ category: category.slug, module: module.slug }}
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            {module.title}
          </Link>
        </Button>
      </div>
      <PageHeader
        eyebrow={`${category.name} · ${module.title}`}
        title={lesson.title}
        description={lesson.summary}
        actions={<LearningModeSwitcher value="learn" />}
      />

      <div className="mt-6 flex flex-wrap items-center gap-2">
        <DifficultyBadge difficulty={module.difficulty} />
        <PrerequisiteBadge status={lesson.status} />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
        <LessonSidebar
          categorySlug={category.slug}
          moduleSlug={module.slug}
          moduleTitle={module.title}
          lessons={module.lessons}
          activeLessonSlug={lesson.slug}
        />
        <div className="min-w-0 space-y-6">
          <TabbedSections
            defaultValue="overview"
            tabs={[
              {
                value: "overview",
                label: "Overview",
                content: (
                  <SurfaceCard>
                    <EmptyState
                      className="border-none bg-transparent px-0 py-6"
                      title="Lesson overview"
                      description="Objectives, prerequisites, and outcomes will appear here."
                    />
                  </SurfaceCard>
                ),
              },
              {
                value: "theory",
                label: "Theory",
                content: (
                  <SurfaceCard>
                    <EmptyState
                      className="border-none bg-transparent px-0 py-6"
                      title="Theory"
                      description="Concepts and explanations plug in here."
                    />
                  </SurfaceCard>
                ),
              },
              {
                value: "code",
                label: "Code",
                content: (
                  <SurfaceCard>
                    <EmptyState
                      className="border-none bg-transparent px-0 py-6"
                      title="Code example"
                      description="Runnable examples appear here."
                    />
                  </SurfaceCard>
                ),
              },
              {
                value: "visualization",
                label: "Visualization",
                content: (
                  <SurfaceCard>
                    <EmptyState
                      className="border-none bg-transparent px-0 py-6"
                      title="Visualization"
                      description="Diagrams and interactive visuals appear here."
                    />
                  </SurfaceCard>
                ),
              },
              {
                value: "practice",
                label: "Practice",
                content: (
                  <SurfaceCard>
                    <EmptyState
                      className="border-none bg-transparent px-0 py-6"
                      title="Practice"
                      description="Exercises tied to this lesson appear here."
                    />
                  </SurfaceCard>
                ),
              },
              {
                value: "assignment",
                label: "Assignment",
                content: (
                  <SurfaceCard>
                    <EmptyState
                      className="border-none bg-transparent px-0 py-6"
                      title="Assignment"
                      description="Graded work appears here."
                    />
                  </SurfaceCard>
                ),
              },
              {
                value: "project",
                label: "Mini project",
                content: (
                  <SurfaceCard>
                    <EmptyState
                      className="border-none bg-transparent px-0 py-6"
                      title="Mini project"
                      description="A small applied build tied to this lesson."
                    />
                  </SurfaceCard>
                ),
              },
              {
                value: "quiz",
                label: "Quiz",
                content: (
                  <SurfaceCard>
                    <EmptyState
                      className="border-none bg-transparent px-0 py-6"
                      title="Quiz"
                      description="Comprehension checks appear here."
                    />
                  </SurfaceCard>
                ),
              },
              {
                value: "interview",
                label: "Interview",
                content: (
                  <SurfaceCard>
                    <EmptyState
                      className="border-none bg-transparent px-0 py-6"
                      title="Interview questions"
                      description="Prep tied to this lesson appears here."
                    />
                  </SurfaceCard>
                ),
              },
              {
                value: "revision",
                label: "Revision",
                content: (
                  <SurfaceCard>
                    <EmptyState
                      className="border-none bg-transparent px-0 py-6"
                      title="Revision notes"
                      description="Spaced-repetition cards appear here."
                    />
                  </SurfaceCard>
                ),
              },
              {
                value: "resources",
                label: "Resources",
                content: <ResourcePanel resources={[]} />,
              },
            ]}
          />

          <AskAIPanel context={`${module.title} · ${lesson.title}`} />

          {nextLesson && (
            <div className="flex justify-end">
              <Button asChild size="sm" variant="outline">
                <Link
                  to="/learning/$category/$module/$lesson"
                  params={{
                    category: category.slug,
                    module: module.slug,
                    lesson: nextLesson.slug,
                  }}
                >
                  Next: {nextLesson.title}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </PageContainer>
  );
}

function LessonNotFound() {
  return (
    <PageContainer>
      <EmptyState
        title="Lesson not found"
        description="This lesson doesn't exist yet."
        action={
          <Button asChild size="sm" variant="outline">
            <Link to="/learning">Back to Learning</Link>
          </Button>
        }
      />
    </PageContainer>
  );
}