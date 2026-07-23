import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { FolderKanban, PlayCircle, Sparkles } from "lucide-react";
import { PageContainer, PageSection } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import { EmptyState, SurfaceCard } from "@/components/common";
import {
  ProjectCard,
  ProjectFilterBar,
} from "@/features/projects/components";
import {
  projectCategories,
  projectLevels,
  projects,
  featuredProjects,
} from "@/config/projects";
import {
  emptyProjectFilters,
  type ProjectFilters,
} from "@/features/projects/types";
import { collectTechnologies, filterProjects, levelLabels } from "@/features/projects/utils";
import { roadmapTracks } from "@/config/roadmap";

export const Route = createFileRoute("/_app/projects/")({
  head: () => ({
    meta: [
      { title: "Projects · AI University" },
      {
        name: "description",
        content:
          "Hands-on AI projects from idea to production deployment — tiered by depth, filtered by technology, mapped to careers.",
      },
      { property: "og:title", content: "AI University · Projects" },
      {
        property: "og:description",
        content: "Applied AI builds — architecture, tasks, datasets, deployment.",
      },
    ],
  }),
  component: ProjectsLandingPage,
});

function ProjectsLandingPage() {
  const [filters, setFilters] = useState<ProjectFilters>(emptyProjectFilters);
  const technologies = useMemo(() => collectTechnologies(projects), []);
  const filtered = useMemo(() => filterProjects(projects, filters), [filters]);
  const featured = featuredProjects();

  return (
    <PageContainer>
      <PageHeader
        eyebrow="Projects"
        title="Applied AI, from idea to production"
        description="Every project ships with a task engine, dataset cards, implementation flow, deployment plan, resume points, and interview prep."
      />

      {/* Continue project */}
      <PageSection
        title="Continue project"
        description="Pick up where you left off."
      >
        <EmptyState
          icon={PlayCircle}
          title="No project in progress"
          description="Start any project below and it will appear here so you can resume in one click."
        />
      </PageSection>

      {/* Featured */}
      <PageSection
        title="Featured projects"
        description="Hand-picked builds worth doing first."
      >
        {featured.length === 0 ? (
          <EmptyState
            icon={Sparkles}
            title="Featured projects coming soon"
            description="Featured builds will appear here as the catalog grows."
          />
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => <ProjectCard key={p.id} project={p} />)}
          </div>
        )}
      </PageSection>

      {/* Learning path projects — one lane per roadmap track */}
      <PageSection
        title="Learning path projects"
        description="Projects tied to each roadmap track."
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {roadmapTracks.map((t) => (
            <SurfaceCard key={t.slug} className="h-full">
              <div className="flex h-full flex-col gap-2">
                <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                  Track
                </div>
                <div className="text-sm font-semibold tracking-tight">{t.title}</div>
                <p className="text-xs leading-relaxed text-muted-foreground line-clamp-2">
                  {t.description}
                </p>
                <div className="mt-auto border-t border-border/50 pt-3 text-[11px] uppercase tracking-[0.14em] text-muted-foreground/80">
                  Projects coming soon
                </div>
              </div>
            </SurfaceCard>
          ))}
        </div>
      </PageSection>

      {/* Categories */}
      <PageSection title="Project categories" description="Explore by domain.">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {projectCategories.map((c) => (
            <SurfaceCard key={c.slug} interactive className="h-full">
              <div className="flex h-full flex-col gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 bg-background/60">
                  <FolderKanban className="h-4 w-4" />
                </div>
                <div className="text-sm font-semibold tracking-tight">{c.name}</div>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {c.description}
                </p>
              </div>
            </SurfaceCard>
          ))}
        </div>
      </PageSection>

      {/* Difficulty overview */}
      <PageSection title="Difficulty overview" description="From first build to capstone.">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {projectLevels.map((l) => (
            <SurfaceCard key={l.slug} className="h-full">
              <div className="space-y-1">
                <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                  {levelLabels[l.slug]}
                </div>
                <p className="text-xs leading-relaxed text-muted-foreground">{l.description}</p>
              </div>
            </SurfaceCard>
          ))}
        </div>
      </PageSection>

      {/* Search + filters + grid */}
      <PageSection
        title="Browse all projects"
        description="Search by keyword, filter by category, level, technology, duration, status, or career goal."
      >
        <div className="space-y-4">
          <ProjectFilterBar value={filters} technologies={technologies} onChange={setFilters} />
          {filtered.length === 0 ? (
            <EmptyState
              icon={FolderKanban}
              title={projects.length === 0 ? "No projects yet" : "No projects match your filters"}
              description={
                projects.length === 0
                  ? "Projects will render here as they are added to the catalog — the entire page is config-driven."
                  : "Try clearing filters or broadening your search."
              }
            />
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p) => <ProjectCard key={p.id} project={p} />)}
            </div>
          )}
        </div>
      </PageSection>
    </PageContainer>
  );
}
