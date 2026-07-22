import { createFileRoute } from "@tanstack/react-router";
import { Clock, GraduationCap, FolderKanban, Trophy, RotateCcw } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import { StatCard, SurfaceCard, EmptyState } from "@/components/common";
import { progressPillars } from "@/config/domain";
import { LineChart } from "lucide-react";

const iconMap = {
  hours: Clock,
  modules: GraduationCap,
  projects: FolderKanban,
  achievements: Trophy,
  revision: RotateCcw,
} as const;

export const Route = createFileRoute("/_app/progress")({
  head: () => ({
    meta: [
      { title: "Progress · AI University" },
      { name: "description", content: "Track learning hours, completed modules, projects shipped, achievements unlocked, and revision streaks." },
      { property: "og:title", content: "AI University · Progress" },
      { property: "og:description", content: "Your AI learning telemetry." },
    ],
  }),
  component: ProgressPage,
});

function ProgressPage() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="Progress"
        title="Track your mastery"
        description="A holistic view of everything you learn, build, and revisit."
      />
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {progressPillars.map((p) => {
          const Icon = iconMap[p.slug as keyof typeof iconMap];
          return <StatCard key={p.slug} icon={Icon} label={p.name} hint={p.description} />;
        })}
      </div>

      <SurfaceCard className="mt-8">
        <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
          <LineChart className="h-3.5 w-3.5" />
          Progress timeline
        </div>
        <EmptyState
          className="mt-4 border-none bg-transparent px-0"
          icon={LineChart}
          title="No data yet"
          description="Progress charts will appear as you complete modules and ship projects."
        />
      </SurfaceCard>
    </PageContainer>
  );
}