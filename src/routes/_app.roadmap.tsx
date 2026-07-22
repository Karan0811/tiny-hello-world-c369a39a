import { createFileRoute } from "@tanstack/react-router";
import { Circle } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import { SurfaceCard } from "@/components/common";
import { Badge } from "@/components/ui/badge";
import { roadmapPhases } from "@/config/domain";

export const Route = createFileRoute("/_app/roadmap")({
  head: () => ({
    meta: [
      { title: "Roadmap · AI University" },
      { name: "description", content: "The complete AI mastery roadmap — foundations, math, core ML, generative & agentic AI, and production AI systems." },
      { property: "og:title", content: "AI University · Roadmap" },
      { property: "og:description", content: "A staged path from Python to production AI." },
    ],
  }),
  component: RoadmapPage,
});

function RoadmapPage() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="Roadmap"
        title="The path to AI mastery"
        description="A staged curriculum spanning foundations, mathematics, core ML, generative and agentic AI, and production systems."
      />
      <div className="mt-8 space-y-4">
        {roadmapPhases.map((phase, idx) => (
          <SurfaceCard key={phase.slug}>
            <div className="flex items-start gap-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border/60 bg-background/60 text-xs font-semibold text-muted-foreground">
                {String(idx + 1).padStart(2, "0")}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold tracking-tight">{phase.name}</h3>
                  <Badge variant="outline" className="rounded-md text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                    Phase {idx + 1}
                  </Badge>
                </div>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {phase.topics.map((t) => (
                    <li
                      key={t}
                      className="flex items-center gap-2 rounded-md border border-border/50 bg-background/40 px-3 py-2 text-sm text-foreground/90"
                    >
                      <Circle className="h-3 w-3 text-muted-foreground/60" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </SurfaceCard>
        ))}
      </div>
    </PageContainer>
  );
}