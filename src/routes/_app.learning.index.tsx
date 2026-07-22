import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Clock,
  Compass,
  GraduationCap,
  History,
  LineChart,
  PlayCircle,
  Sparkles,
  Target,
  Trophy,
} from "lucide-react";
import { PageContainer, PageSection } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import { EmptyState, StatCard, SurfaceCard } from "@/components/common";
import { Button } from "@/components/ui/button";
import {
  LearningCategoryCard,
  ProgressCard,
  JourneyCard,
  DependencyGraph,
  SearchToolbar,
} from "@/features/learning/components";
import { learningCategoryList } from "@/config/learning";

export const Route = createFileRoute("/_app/learning/")({
  head: () => ({
    meta: [
      { title: "Learning · AI University" },
      {
        name: "description",
        content:
          "The AI University learning hub — categories, modules, lessons, projects, and progress across the full AI stack.",
      },
      { property: "og:title", content: "AI University · Learning" },
      {
        property: "og:description",
        content:
          "A modular curriculum spanning Python, math, ML, deep learning, GenAI, agents, MLOps, and LLMOps.",
      },
    ],
  }),
  component: LearningHome,
});

function LearningHome() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="Learning"
        title="The core engine of AI University"
        description="Explore categories, dive into modules, and progress lesson by lesson. Everything is modular — new content plugs into this structure without refactoring."
        actions={
          <>
            <Button variant="outline" size="sm">
              <Compass className="h-4 w-4" />
              Browse roadmap
            </Button>
            <Button size="sm">
              <PlayCircle className="h-4 w-4" />
              Continue learning
            </Button>
          </>
        }
      />

      <PageSection title="Your stats" description="Snapshot of your learning momentum">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard icon={Clock} label="Learning hours" hint="This week" />
          <StatCard icon={GraduationCap} label="Lessons completed" hint="Across all tracks" />
          <StatCard icon={Target} label="Modules in progress" hint="Currently active" />
          <StatCard icon={Trophy} label="Achievements" hint="Milestones unlocked" />
        </div>
      </PageSection>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        <JourneyCard
          icon={PlayCircle}
          eyebrow="Continue learning"
          title="Pick up where you left off"
          description="Your active lesson will appear here as you progress."
          cta={{ label: "Resume" }}
        />
        <JourneyCard
          icon={Sparkles}
          eyebrow="Recommended next"
          title="Your next module"
          description="Suggestions appear here based on your journey and prerequisites."
          cta={{ label: "Preview" }}
        />
        <JourneyCard
          icon={History}
          eyebrow="Recently visited"
          title="Recent activity"
          description="Lessons and modules you visited recently will surface here."
        />
      </div>

      <PageSection
        title="Learning categories"
        description="Every category is a self-contained track with its own modules, lessons, and projects."
      >
        <div className="mb-4">
          <SearchToolbar />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {learningCategoryList.map((c) => (
            <Link
              key={c.slug}
              to="/learning/$category"
              params={{ category: c.slug }}
              className="block"
            >
              <LearningCategoryCard category={c} />
            </Link>
          ))}
        </div>
      </PageSection>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <DependencyGraph />
        </div>
        <div className="space-y-4">
          <ProgressCard icon={LineChart} label="Overall completion" hint="All categories" />
          <SurfaceCard>
            <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
              <Trophy className="h-3.5 w-3.5" />
              Journey progress
            </div>
            <EmptyState
              className="mt-4 border-none bg-transparent px-0 py-6"
              title="Your journey unfolds here"
              description="Milestones, badges, and streaks will appear as you learn."
            />
          </SurfaceCard>
        </div>
      </div>
    </PageContainer>
  );
}