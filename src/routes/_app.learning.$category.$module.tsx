import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Clock } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import { EmptyState, SurfaceCard } from "@/components/common";
import { Button } from "@/components/ui/button";
import {
  LessonCard,
  LearningModeSwitcher,
  DifficultyBadge,
  PrerequisiteBadge,
  TabbedSections,
  ResourcePanel,
  AskAIPanel,
} from "@/features/learning/components";
import { getCategory, getModule } from "@/config/learning";
import type {
  LearningCategoryDefinition,
  LessonRef,
  ModuleDefinition,
  PrerequisiteRef,
} from "@/features/learning/types";

export const Route = createFileRoute("/_app/learning/$category/$module")({
  loader: ({ params }) => {
    const category = getCategory(params.category);
    const module = category ? getModule(params.category, params.module) : undefined;
    if (!category || !module) throw notFound();
    return { category, module };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Module — AI University" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { module, category } = loaderData;
    return {
      meta: [
        { title: `${module.title} · ${category.name} · AI University` },
        { name: "description", content: module.description },
        { property: "og:title", content: `${module.title} · AI University` },
        { property: "og:description", content: module.description },
      ],
    };
  },
  component: ModulePage,
  notFoundComponent: ModuleNotFound,
});

function ModulePage() {
  const { category, module } = Route.useLoaderData() as {
    category: LearningCategoryDefinition;
    module: ModuleDefinition;
  };

  return (
    <PageContainer>
      <div className="mb-4">
        <Button asChild variant="ghost" size="sm" className="h-7 px-2 text-xs">
          <Link to="/learning/$category" params={{ category: category.slug }}>
            <ArrowLeft className="h-3.5 w-3.5" />
            {category.name}
          </Link>
        </Button>
      </div>
      <PageHeader
        eyebrow={`${category.name} · Module`}
        title={module.title}
        description={module.description}
        actions={<LearningModeSwitcher value="learn" />}
      />

      <div className="mt-6 flex flex-wrap items-center gap-2">
        <DifficultyBadge difficulty={module.difficulty} />
        <PrerequisiteBadge status={module.status} />
        <span className="inline-flex items-center gap-1 rounded-md border border-border/60 bg-background/40 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
          <Clock className="h-3 w-3" />
          {module.estimatedHours ? `${module.estimatedHours}h` : "Time — TBD"}
        </span>
      </div>

      <div className="mt-8">
        <TabbedSections
          defaultValue="overview"
          tabs={[
            {
              value: "overview",
              label: "Overview",
              content: (
                <div className="grid gap-4 lg:grid-cols-3">
                  <SurfaceCard className="lg:col-span-2">
                    <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                      Learning objectives
                    </div>
                    {module.objectives.length ? (
                      <ul className="mt-3 space-y-2 text-sm text-foreground">
                        {module.objectives.map((o: string) => (
                          <li key={o} className="flex gap-2">
                            <span className="text-muted-foreground">—</span>
                            {o}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <EmptyState
                        className="mt-4 border-none bg-transparent px-0 py-6"
                        title="Objectives coming soon"
                        description="Learning outcomes for this module are being authored."
                      />
                    )}
                  </SurfaceCard>
                  <SurfaceCard>
                    <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                      Prerequisites
                    </div>
                    {module.prerequisites.length ? (
                      <ul className="mt-3 space-y-2">
                        {module.prerequisites.map((p: PrerequisiteRef, i: number) => (
                          <li
                            key={`${p.categorySlug}-${p.moduleSlug ?? "any"}-${i}`}
                            className="flex items-center justify-between rounded-md border border-border/50 bg-background/40 px-3 py-2 text-xs"
                          >
                            <span>{p.moduleSlug ?? p.categorySlug}</span>
                            <PrerequisiteBadge strength={p.strength} />
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <EmptyState
                        className="mt-4 border-none bg-transparent px-0 py-6"
                        title="No prerequisites"
                      />
                    )}
                  </SurfaceCard>
                </div>
              ),
            },
            {
              value: "lessons",
              label: "Lessons",
              content: module.lessons.length ? (
                <div className="space-y-2">
                  {module.lessons.map((l: LessonRef, i: number) => (
                    <LessonCard
                      key={l.slug}
                      categorySlug={category.slug}
                      moduleSlug={module.slug}
                      lesson={l}
                      index={i}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState
                  title="Lessons coming soon"
                  description="The lesson architecture is ready — content will appear here as authored."
                />
              ),
            },
            {
              value: "practice",
              label: "Practice",
              content: (
                <EmptyState
                  title="Practice exercises"
                  description="Interactive exercises will appear here."
                />
              ),
            },
            {
              value: "projects",
              label: "Projects",
              content: module.projects.length ? (
                <div className="grid gap-3 md:grid-cols-2">
                  {module.projects.map((p: { slug: string; title: string; summary?: string }) => (
                    <SurfaceCard key={p.slug}>
                      <div className="text-sm font-medium tracking-tight">{p.title}</div>
                      {p.summary && (
                        <p className="mt-1 text-xs text-muted-foreground">{p.summary}</p>
                      )}
                    </SurfaceCard>
                  ))}
                </div>
              ) : (
                <EmptyState
                  title="Projects coming soon"
                  description="Applied builds tied to this module will appear here."
                />
              ),
            },
            {
              value: "resources",
              label: "Resources",
              content: <ResourcePanel resources={module.resources} />,
            },
            {
              value: "notes",
              label: "Notes",
              content: (
                <EmptyState
                  title="Your notes"
                  description="Notes you take on this module will appear here."
                />
              ),
            },
            {
              value: "revision",
              label: "Revision",
              content: (
                <EmptyState
                  title="Revision"
                  description="Spaced-repetition items will appear here."
                />
              ),
            },
            {
              value: "interview",
              label: "Interview",
              content: (
                <EmptyState
                  title="Interview questions"
                  description="Curated interview prep tied to this module will appear here."
                />
              ),
            },
          ]}
        />
      </div>

      <div className="mt-8">
        <AskAIPanel context={`${category.name} · ${module.title}`} />
      </div>
    </PageContainer>
  );
}

function ModuleNotFound() {
  return (
    <PageContainer>
      <EmptyState
        title="Module not found"
        description="This module doesn't exist yet."
        action={
          <Button asChild size="sm" variant="outline">
            <Link to="/learning">Back to Learning</Link>
          </Button>
        }
      />
    </PageContainer>
  );
}