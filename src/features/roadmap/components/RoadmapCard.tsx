import { ArrowRight, Clock, Lock, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { SurfaceCard } from "@/components/common";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { getCategoryIcon } from "@/features/learning/icons";
import type { RoadmapTrack } from "../types";
import { difficultyLabels, statusLabels } from "../utils";

type Props = {
  track: RoadmapTrack;
  progressPct?: number;
};

export function RoadmapCard({ track, progressPct }: Props) {
  const Icon = getCategoryIcon(track.iconKey ?? "");
  const locked = track.status === "locked";
  return (
    <SurfaceCard interactive className="h-full">
      <div className="flex h-full flex-col gap-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border/60 bg-background/60 text-foreground/80">
              {locked ? <Lock className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
            </div>
            <div className="min-w-0">
              <div className="text-sm font-semibold tracking-tight text-foreground">
                {track.title}
              </div>
              <div className="mt-0.5 flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                <span>{difficultyLabels[track.difficulty]}</span>
                {track.estimatedDuration && (
                  <>
                    <span aria-hidden>·</span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {track.estimatedDuration}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
          <Badge
            variant="outline"
            className="rounded-md text-[10px] uppercase tracking-[0.14em] text-muted-foreground"
          >
            {statusLabels[track.status]}
          </Badge>
        </div>

        <p className="text-xs leading-relaxed text-muted-foreground">
          {track.description}
        </p>

        <div className="space-y-2">
          <div className="flex flex-wrap gap-1.5">
            {track.skillsGained.slice(0, 4).map((s) => (
              <Badge
                key={s}
                variant="secondary"
                className="rounded-md text-[10px] font-normal"
              >
                {s}
              </Badge>
            ))}
          </div>
          {track.prerequisites.length > 0 && (
            <div className="text-[11px] text-muted-foreground">
              Prerequisites: {track.prerequisites.join(", ")}
            </div>
          )}
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            <span>Progress</span>
            <span>{progressPct != null ? `${progressPct}%` : "—"}</span>
          </div>
          <Progress value={progressPct ?? 0} className="h-1.5" />
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-border/50 pt-3">
          <div className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
            <Sparkles className="h-3 w-3" />
            {track.careerOutcome}
          </div>
          <Button asChild size="sm" variant="outline" disabled={locked}>
            <Link to="/roadmap/$track" params={{ track: track.slug }}>
              Open
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </div>
    </SurfaceCard>
  );
}
