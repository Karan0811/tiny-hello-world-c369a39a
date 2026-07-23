import { useState } from "react";
import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import { EmptyState, SurfaceCard } from "@/components/common";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  DatasetCard,
  DeploymentCard,
  ImplementationFlowView,
  InterviewPrepCard,
  ProjectOverview,
  ProjectProgressCard,
  ProjectTimeline,
  ResumeCard,
  TaskChecklist,
} from "@/features/projects/components";
import { projectTabs, projectsBySlug } from "@/config/projects";
import type { ProjectTabKey } from "@/features/projects/types";
import { levelLabels, projectStatusLabels } from "@/features/projects/utils";
import { BookOpen, FileText, Link2, StickyNote } from "lucide-react";

export const Route = createFileRoute("/_app/projects/$project")({
  loader: ({ params }) => {
    const project = projectsBySlug[params.project];
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    const title = loaderData?.project.title ?? "Project";
    const description =
      loaderData?.project.description ?? "AI University project workspace.";
    return {
      meta: [
        { title: `${title} · AI University` },
        { name: "description", content: description },
        { property: "og:title", content: `${title} · AI University` },
        { property: "og:description", content: description },
      ],
    };
  },
  component: ProjectDetailPage,
  notFoundComponent: ProjectNotFound,
});

function ProjectDetailPage() {
  const { project } = Route.useLoaderData();
  const [tab, setTab] = useState<ProjectTabKey>("overview");

  return (
    <PageContainer>
      <div className="mb-4">
        <Button asChild variant="ghost" size="sm">
          <Link to="/projects">
            <ArrowLeft className="h-4 w-4" />
            All projects
          </Link>
        </Button>
      </div>

      <PageHeader
        eyebrow="Project"
        title={project.title}
        description={project.description}
        actions={
          <>
            <Badge variant="outline" className="rounded-md text-[10px] uppercase tracking-[0.14em]">
              {levelLabels[project.level]}
            </Badge>
            <Badge variant="secondary" className="rounded-md text-[10px]">
              {projectStatusLabels[project.status]}
            </Badge>
            {project.githubUrl && (
              <Button asChild variant="outline" size="sm">
                <a href={project.githubUrl} target="_blank" rel="noreferrer">
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              </Button>
            )}
            {project.demoUrl && (
              <Button asChild variant="outline" size="sm">
                <a href={project.demoUrl} target="_blank" rel="noreferrer">
                  <ExternalLink className="h-4 w-4" />
                  Demo
                </a>
              </Button>
            )}
          </>
        }
      />

      <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_280px]">
        <div className="min-w-0">
          <Tabs value={tab} onValueChange={(v) => setTab(v as ProjectTabKey)}>
            <TabsList className="flex w-full flex-wrap justify-start gap-1 overflow-x-auto">
              {projectTabs.map((t) => (
                <TabsTrigger key={t.key} value={t.key} className="text-xs">
                  {t.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="overview" className="mt-4">
              <ProjectOverview project={project} />
            </TabsContent>

            <TabsContent value="roadmap" className="mt-4">
              <ProjectTimeline tasks={project.tasks} />
            </TabsContent>

            <TabsContent value="tasks" className="mt-4">
              <TaskChecklist tasks={project.tasks} />
            </TabsContent>

            <TabsContent value="datasets" className="mt-4">
              {(project.datasets ?? []).length === 0 ? (
                <EmptyState
                  icon={FileText}
                  title="Datasets pending"
                  description="Dataset cards (source, size, license, domain) will appear here."
                />
              ) : (
                <div className="grid gap-3 md:grid-cols-2">
                  {project.datasets!.map((d) => <DatasetCard key={d.id} dataset={d} />)}
                </div>
              )}
            </TabsContent>

            <TabsContent value="resources" className="mt-4">
              <EmptyState
                icon={Link2}
                title="Resources reference the library"
                description="This tab pulls from the global resources catalog via project relationships — no duplication."
              />
            </TabsContent>

            <TabsContent value="implementation" className="mt-4">
              <ImplementationFlowView flow={project.flow} />
            </TabsContent>

            <TabsContent value="testing" className="mt-4">
              <EmptyState
                icon={FileText}
                title="Testing plan"
                description="Unit, integration, and evaluation harnesses are defined in the implementation flow."
              />
            </TabsContent>

            <TabsContent value="deployment" className="mt-4">
              <DeploymentCard targets={project.deployment} />
            </TabsContent>

            <TabsContent value="documentation" className="mt-4">
              <EmptyState
                icon={BookOpen}
                title="Documentation placeholder"
                description="Auto-generated docs (architecture, ADRs, runbooks) will render here."
              />
            </TabsContent>

            <TabsContent value="interview" className="mt-4">
              <InterviewPrepCard questions={project.flow?.interviewQuestions} />
            </TabsContent>

            <TabsContent value="notes" className="mt-4">
              <EmptyState
                icon={StickyNote}
                title="Notes"
                description="Your project notes will live here, linked to the global Notes surface."
              />
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-4">
          <ProjectProgressCard tasks={project.tasks} />
          <ResumeCard highlights={project.resumeHighlights} />
          <SurfaceCard>
            <div className="space-y-3 text-sm">
              <div>
                <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                  Relationships
                </div>
                <ul className="mt-1 space-y-1 text-xs text-muted-foreground">
                  <li>Learning modules: {(project.relationships?.learningRefs ?? []).length}</li>
                  <li>Roadmap nodes: {(project.relationships?.roadmapNodeIds ?? []).length}</li>
                  <li>Resources: {(project.relationships?.resourceRefs ?? []).length}</li>
                  <li>Interview topics: {(project.relationships?.interviewTopics ?? []).length}</li>
                  <li>Career paths: {(project.relationships?.careerPathSlugs ?? []).length}</li>
                </ul>
              </div>
            </div>
          </SurfaceCard>
        </div>
      </div>
    </PageContainer>
  );
}

function ProjectNotFound() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="Projects"
        title="Project not found"
        description="This project doesn't exist yet."
      />
      <div className="mt-6">
        <Button asChild variant="outline" size="sm">
          <Link to="/projects">
            <ArrowLeft className="h-4 w-4" />
            Back to projects
          </Link>
        </Button>
      </div>
    </PageContainer>
  );
}
