import { useState } from "react";
import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { PageContainer, PageSection } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import { SurfaceCard } from "@/components/common";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CheckpointCard,
  CurrentPosition,
  MilestoneCard,
  NodeDetailSheet,
  RoadmapCanvas,
} from "@/features/roadmap/components";
import { checkpointTemplates, roadmapTracksBySlug } from "@/config/roadmap";
import type { RoadmapNode } from "@/features/roadmap/types";
import { difficultyLabels, statusLabels } from "@/features/roadmap/utils";

export const Route = createFileRoute("/_app/roadmap/$track")({
  loader: ({ params }) => {
    const track = roadmapTracksBySlug[params.track];
    if (!track) throw notFound();
    return { track };
  },
  head: ({ loaderData }) => {
    const title = loaderData?.track.title ?? "Track";
    return {
      meta: [
        { title: `${title} Roadmap · AI University` },
        {
          name: "description",
          content:
            loaderData?.track.description ??
            "A structured AI mastery track with milestones and career outcomes.",
        },
        { property: "og:title", content: `${title} · AI University` },
        {
          property: "og:description",
          content: loaderData?.track.description ?? "AI University roadmap track.",
        },
      ],
    };
  },
  component: TrackPage,
  notFoundComponent: TrackNotFound,
});

function TrackPage() {
  const { track } = Route.useLoaderData();
  const [selected, setSelected] = useState<RoadmapNode | null>(null);
  const milestones = track.nodes.filter((n: RoadmapNode) => n.kind === "milestone");

  return (
    <PageContainer>
      <div className="mb-4">
        <Button asChild variant="ghost" size="sm">
          <Link to="/roadmap">
            <ArrowLeft className="h-4 w-4" />
            All roadmaps
          </Link>
        </Button>
      </div>

      <PageHeader
        eyebrow="Roadmap track"
        title={track.title}
        description={track.description}
        actions={
          <>
            <Badge variant="outline" className="rounded-md text-[10px] uppercase tracking-[0.14em]">
              {difficultyLabels[track.difficulty]}
            </Badge>
            <Badge variant="secondary" className="rounded-md text-[10px]">
              {statusLabels[track.status]}
            </Badge>
          </>
        }
      />

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <SurfaceCard>
            <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
              Visual roadmap
            </div>
            <div className="mt-4">
              <RoadmapCanvas nodes={track.nodes} onSelect={setSelected} />
            </div>
          </SurfaceCard>

          {milestones.length > 0 && (
            <PageSection title="Milestones" description="Key checkpoints along this track.">
              <div className="grid gap-3 md:grid-cols-2">
                {milestones.map((m: RoadmapNode) => (
                  <MilestoneCard key={m.id} node={m} />
                ))}
              </div>
            </PageSection>
          )}
        </div>

        <div className="space-y-4">
          <CurrentPosition trackSlug={track.slug} trackTitle={track.title} />

          <SurfaceCard>
            <div className="space-y-3 text-sm">
              <Meta label="Estimated duration" value={track.estimatedDuration ?? "—"} />
              <Meta label="Career outcome" value={track.careerOutcome} />
              <MetaList label="Skills gained" items={track.skillsGained} />
              <MetaList
                label="Prerequisites"
                items={track.prerequisites.length ? track.prerequisites : ["None"]}
              />
            </div>
          </SurfaceCard>

          <div className="space-y-3">
            <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
              Checkpoints
            </div>
            {checkpointTemplates.map((c) => (
              <CheckpointCard key={c.id} checkpoint={c} />
            ))}
          </div>
        </div>
      </div>

      <NodeDetailSheet node={selected} onOpenChange={(o) => !o && setSelected(null)} />
    </PageContainer>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </div>
      <div className="mt-0.5 text-sm text-foreground">{value}</div>
    </div>
  );
}

function MetaList({ label, items }: { label: string; items: string[] }) {
  return (
    <div>
      <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </div>
      <div className="mt-1 flex flex-wrap gap-1.5">
        {items.map((i) => (
          <Badge key={i} variant="secondary" className="rounded-md text-[10px] font-normal">
            {i}
          </Badge>
        ))}
      </div>
    </div>
  );
}

function TrackNotFound() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="Roadmap"
        title="Track not found"
        description="This roadmap track doesn't exist yet."
      />
      <div className="mt-6">
        <Button asChild variant="outline" size="sm">
          <Link to="/roadmap">
            <ArrowLeft className="h-4 w-4" />
            Back to roadmaps
          </Link>
        </Button>
      </div>
    </PageContainer>
  );
}
