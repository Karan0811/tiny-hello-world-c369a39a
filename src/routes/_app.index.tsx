import { createFileRoute } from "@tanstack/react-router";
import {
  Activity,
  ArrowRight,
  BookOpen,
  Clock,
  FolderKanban,
  GraduationCap,
  LineChart,
  Map,
  Plus,
  Sparkles,
  Target,
  Trophy,
} from "lucide-react";
import { PageContainer, PageSection } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import { StatCard, SurfaceCard, EmptyState } from "@/components/common";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { roadmapPhases } from "@/config/domain";

export const Route = createFileRoute("/_app/")({
  head: () => ({
    meta: [
      { title: "Dashboard · AI University" },
      { name: "description", content: "Your AI learning hub — track modules, projects, and progress across the AI University curriculum." },
      { property: "og:title", content: "AI University · Dashboard" },
      { property: "og:description", content: "Your personal command center for mastering AI." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="Welcome back"
        title="Learn. Build. Deploy. Master AI."
        description="Your production-grade path from Python fundamentals to agentic AI systems. Track modules, ship projects, and prep for the role."
        actions={
          <>
            <Button variant="outline" size="sm">
              <Map className="h-4 w-4" />
              View roadmap
            </Button>
            <Button size="sm">
              <Sparkles className="h-4 w-4" />
              Start learning
            </Button>
          </>
        }
      />

      <PageSection title="Overview" description="Snapshot of your current momentum">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard icon={Clock} label="Learning hours" hint="This week" />
          <StatCard icon={GraduationCap} label="Modules completed" hint="Across all tracks" />
          <StatCard icon={FolderKanban} label="Projects shipped" hint="Applied builds" />
          <StatCard icon={Trophy} label="Achievements" hint="Milestones unlocked" />
        </div>
      </PageSection>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        <SurfaceCard className="lg:col-span-2">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                <Map className="h-3.5 w-3.5" />
                Roadmap preview
              </div>
              <h3 className="mt-2 text-base font-semibold tracking-tight">The path to mastery</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                A staged curriculum spanning foundations through production AI.
              </p>
            </div>
            <Button variant="ghost" size="sm">
              Open
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          <ol className="mt-5 space-y-3">
            {roadmapPhases.map((phase, i) => (
              <li
                key={phase.slug}
                className="flex items-start gap-3 rounded-lg border border-border/50 bg-background/40 p-3"
              >
                <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-border/60 text-[11px] font-medium text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium tracking-tight">{phase.name}</div>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {phase.topics.map((t) => (
                      <Badge
                        key={t}
                        variant="secondary"
                        className="rounded-md bg-muted/40 font-normal text-muted-foreground"
                      >
                        {t}
                      </Badge>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </SurfaceCard>

        <div className="space-y-6">
          <SurfaceCard>
            <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
              <LineChart className="h-3.5 w-3.5" />
              Weekly progress
            </div>
            <EmptyState
              className="mt-4 border-none bg-transparent px-0 py-6"
              icon={Target}
              title="Set a weekly goal"
              description="Track hours, modules, and projects each week."
              action={
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4" />
                  Add goal
                </Button>
              }
            />
          </SurfaceCard>

          <SurfaceCard>
            <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
              <Activity className="h-3.5 w-3.5" />
              Recent activity
            </div>
            <div className="mt-4 space-y-2 text-sm text-muted-foreground">
              <div className="rounded-md border border-dashed border-border/60 px-3 py-6 text-center text-xs">
                Activity will appear here as you learn and build.
              </div>
            </div>
          </SurfaceCard>
        </div>
      </div>

      <PageSection title="Quick actions" description="Jump into your work">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: BookOpen, label: "Continue learning" },
            { icon: FolderKanban, label: "Open a project" },
            { icon: Sparkles, label: "Explore GenAI" },
            { icon: Trophy, label: "Interview prep" },
          ].map((a) => (
            <button
              key={a.label}
              className="group flex items-center justify-between rounded-xl border border-border/60 bg-card/40 p-4 text-left transition-colors hover:bg-card"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-md border border-border/60 bg-background/60">
                  <a.icon className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium">{a.label}</span>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
            </button>
          ))}
        </div>
      </PageSection>
    </PageContainer>
  );
}