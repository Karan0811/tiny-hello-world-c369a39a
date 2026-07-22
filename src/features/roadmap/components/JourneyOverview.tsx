import { Compass, Flag, GraduationCap, Route, Sparkles, Target } from "lucide-react";
import { StatCard } from "@/components/common";

type Props = {
  totalTracks: number;
  totalNodes: number;
};

// Journey overview grid — placeholders only; no fabricated progress values.
export function JourneyOverview({ totalTracks, totalNodes }: Props) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      <StatCard
        icon={Route}
        label="Tracks"
        value={String(totalTracks)}
        hint="Available roadmaps"
      />
      <StatCard
        icon={GraduationCap}
        label="Milestones"
        value={String(totalNodes)}
        hint="Nodes across all tracks"
      />
      <StatCard icon={Compass} label="Current position" hint="Sync from progress" />
      <StatCard icon={Flag} label="Est. completion" hint="Depends on your pace" />
      <StatCard icon={Target} label="Learning stats" hint="Wire progress source" />
      <StatCard icon={Sparkles} label="Career outcome" hint="Chosen path pending" />
    </div>
  );
}
