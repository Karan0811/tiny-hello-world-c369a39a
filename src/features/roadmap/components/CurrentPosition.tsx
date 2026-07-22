import { MapPin } from "lucide-react";
import { SurfaceCard } from "@/components/common";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

type Props = {
  trackSlug?: string;
  trackTitle?: string;
  nodeTitle?: string;
};

// Current-position marker. Placeholder-safe: renders a prompt-to-start state
// when no active track/node is available yet.
export function CurrentPosition({ trackSlug, trackTitle, nodeTitle }: Props) {
  const active = !!trackSlug;
  return (
    <SurfaceCard>
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border/60 bg-background/60 text-muted-foreground">
          <MapPin className="h-4 w-4" />
        </div>
        <div className="min-w-0 flex-1 space-y-1">
          <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
            Current position
          </div>
          <div className="text-sm font-semibold tracking-tight text-foreground">
            {active ? (trackTitle ?? "Active track") : "No active track"}
          </div>
          <p className="text-xs text-muted-foreground">
            {active
              ? nodeTitle
                ? `Next milestone: ${nodeTitle}`
                : "Pick a milestone to continue."
              : "Select a roadmap to begin your journey."}
          </p>
        </div>
        <Button asChild size="sm">
          <Link
            to={active ? "/roadmap/$track" : "/roadmap"}
            params={active ? { track: trackSlug! } : undefined}
          >
            {active ? "Continue journey" : "Choose a track"}
          </Link>
        </Button>
      </div>
    </SurfaceCard>
  );
}
