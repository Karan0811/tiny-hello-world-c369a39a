import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  BookOpen,
  Compass,
  FolderGit2,
  Layers,
  PlayCircle,
  Sparkles,
} from "lucide-react";
import { PageContainer, PageSection } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import { EmptyState } from "@/components/common";
import { Button } from "@/components/ui/button";
import { AskAIPanel, SearchToolbar } from "@/features/learning/components";
import {
  PythonJourney,
  PythonModuleCard,
  PythonProgressPanel,
  PythonProjectPanel,
  PythonResourcePanel,
  PythonRevisionPanel,
} from "@/features/python/components";
import { pythonModules } from "@/config/python";

export const Route = createFileRoute("/_app/learning/python")({
  head: () => ({
    meta: [
      { title: "Python · AI University" },
      {
        name: "description",
        content:
          "The Python track — the reference vertical slice for every AI University subject: modules, lessons, projects, revision, and interview prep.",
      },
      { property: "og:title", content: "Python · AI University" },
      {
        property: "og:description",
        content:
          "Learn Python end-to-end inside AI University. Config-driven modules, integrated AI mentor, and progress across lessons, practice, and projects.",
      },
    ],
  }),
  component: PythonHome,
});

function PythonHome() {
  return (
    <PageContainer>
      <div className="mb-4">
        <Button asChild variant="ghost" size="sm" className="h-7 px-2 text-xs">
          <Link to="/learning">
            <ArrowLeft className="h-3.5 w-3.5" />
            All categories
          </Link>
        </Button>
      </div>

      <PageHeader
        eyebrow="Track · Python"
        title="Master Python for AI engineering"
        description="The Python track is the reference implementation for every future AI University subject. Modules, lessons, projects, and revision all plug in from config."
        actions={
          <>
            <Button variant="outline" size="sm">
              <Compass className="h-4 w-4" />
              Roadmap
            </Button>
            <Button size="sm">
              <PlayCircle className="h-4 w-4" />
              Continue learning
            </Button>
          </>
        }
      />

      <PageSection
        title="Overview"
        description="Snapshot of your Python journey — populates as you progress."
      >
        <PythonProgressPanel />
      </PageSection>

      <PageSection title="Learning journey" description="Where you are and what's next">
        <PythonJourney />
      </PageSection>

      <PageSection
        title="Modules"
        description="Twenty modules covering the language end-to-end. Content is authored module by module."
      >
        <div className="mb-4">
          <SearchToolbar />
        </div>
        {pythonModules.length === 0 ? (
          <EmptyState
            title="Modules coming soon"
            description="Add records in src/config/python.ts to populate this grid."
          />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {pythonModules.map((m) => (
              <PythonModuleCard key={m.slug} module={m} />
            ))}
          </div>
        )}
      </PageSection>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <PageSection
            title="Recommended next lesson"
            description="Personalised suggestion based on your journey"
          >
            <EmptyState
              icon={Sparkles}
              title="Your next lesson appears here"
              description="Once you start a module, the next recommended lesson surfaces here."
            />
          </PageSection>

          <PageSection
            title="Python projects"
            description="Applied builds that reinforce the modules"
          >
            <PythonProjectPanel />
          </PageSection>
        </div>
        <div className="space-y-6">
          <PageSection title="Quick revision" description="Refresh key ideas fast">
            <PythonRevisionPanel />
          </PageSection>
          <PageSection title="Resources" description="Docs, PEPs, videos, and more">
            <PythonResourcePanel />
          </PageSection>
        </div>
      </div>

      <PageSection title="Ask AI" description="Wired to the AI Core — provider-agnostic">
        <AskAIPanel context="Python · Track home" />
      </PageSection>

      <PageSection title="Explore" description="Jump into related surfaces">
        <div className="grid gap-3 sm:grid-cols-3">
          <Link
            to="/learning/$category"
            params={{ category: "python" }}
            className="rounded-xl border border-border/60 bg-card/60 p-4 backdrop-blur transition-colors hover:border-border hover:bg-card"
          >
            <div className="flex items-center gap-2 text-sm font-medium">
              <Layers className="h-4 w-4" /> Category view
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Standard learning-category surface for Python.
            </p>
          </Link>
          <Link
            to="/projects"
            className="rounded-xl border border-border/60 bg-card/60 p-4 backdrop-blur transition-colors hover:border-border hover:bg-card"
          >
            <div className="flex items-center gap-2 text-sm font-medium">
              <FolderGit2 className="h-4 w-4" /> Projects
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Browse the full applied-project catalog.
            </p>
          </Link>
          <Link
            to="/resources"
            className="rounded-xl border border-border/60 bg-card/60 p-4 backdrop-blur transition-colors hover:border-border hover:bg-card"
          >
            <div className="flex items-center gap-2 text-sm font-medium">
              <BookOpen className="h-4 w-4" /> Resources
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Cross-track curated references.
            </p>
          </Link>
        </div>
      </PageSection>
    </PageContainer>
  );
}
