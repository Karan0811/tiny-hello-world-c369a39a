import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Compass } from "lucide-react";
import { PageContainer, PageSection } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import { SurfaceCard } from "@/components/common";
import {
  CareerPathCard,
  CheckpointCard,
  CurrentPosition,
  JourneyOverview,
  RoadmapCard,
  RoadmapFilterBar,
  SkillTree,
} from "@/features/roadmap/components";
import {
  careerPaths,
  checkpointTemplates,
  roadmapTracks,
  skillTree,
} from "@/config/roadmap";
import { emptyFilters } from "@/features/roadmap/types";
import { filterTracks } from "@/features/roadmap/utils";

export const Route = createFileRoute("/_app/roadmap/")({
  head: () => ({
    meta: [
      { title: "Roadmap · AI University" },
      {
        name: "description",
        content:
          "The master AI learning journey — tracks, milestones, skill tree, career paths, and checkpoints in one interactive roadmap.",
      },
      { property: "og:title", content: "AI University · Roadmap" },
      {
        property: "og:description",
        content: "The master journey from foundations to production AI.",
      },
    ],
  }),
  component: RoadmapHome,
});

function RoadmapHome() {
  const [filters, setFilters] = useState(emptyFilters);
  const totalNodes = useMemo(
    () => roadmapTracks.reduce((n, t) => n + t.nodes.length, 0),
    [],
  );
  const visibleTracks = useMemo(() => {
    const base = filterTracks(roadmapTracks, filters);
    if (filters.career === "all") return base;
    const career = careerPaths.find((c) => c.slug === filters.career);
    if (!career) return base;
    return base.filter((t) => career.trackSlugs.includes(t.slug));
  }, [filters]);

  return (
    <PageContainer>
      <PageHeader
        eyebrow="Roadmap"
        title="Your journey to AI mastery"
        description="A living map of tracks, milestones, and career paths. Every learning module belongs here."
      />

      {/* Hero / journey overview */}
      <div className="mt-8 space-y-6">
        <SurfaceCard>
          <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
            <Compass className="h-3.5 w-3.5" />
            Journey overview
          </div>
          <div className="mt-4">
            <JourneyOverview totalTracks={roadmapTracks.length} totalNodes={totalNodes} />
          </div>
        </SurfaceCard>

        <CurrentPosition />
      </div>

      <PageSection title="Tracks" description="Every roadmap is a self-contained career path.">
        <div className="mb-4">
          <RoadmapFilterBar value={filters} onChange={setFilters} />
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visibleTracks.map((t) => (
            <RoadmapCard key={t.slug} track={t} />
          ))}
        </div>
      </PageSection>

      <PageSection
        title="Skill tree"
        description="How skills stack from programming fundamentals to LLMOps."
      >
        <SkillTree root={skillTree} />
      </PageSection>

      <PageSection
        title="Career paths"
        description="Each roadmap connects to real-world roles, portfolio work, and interviews."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {careerPaths.map((c) => (
            <CareerPathCard key={c.slug} career={c} />
          ))}
        </div>
      </PageSection>

      <PageSection
        title="Checkpoints"
        description="Milestones that gate progression across every track."
      >
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {checkpointTemplates.map((c) => (
            <CheckpointCard key={c.id} checkpoint={c} />
          ))}
        </div>
      </PageSection>
    </PageContainer>
  );
}
