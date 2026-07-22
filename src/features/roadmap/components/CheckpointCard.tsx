import {
  Award,
  BookOpenCheck,
  Dumbbell,
  FolderKanban,
  GraduationCap,
  MessagesSquare,
  RotateCcw,
  type LucideIcon,
} from "lucide-react";
import { SurfaceCard } from "@/components/common";
import { Progress } from "@/components/ui/progress";
import type { Checkpoint, CheckpointKind } from "../types";

const iconMap: Record<CheckpointKind, LucideIcon> = {
  modules: GraduationCap,
  projects: FolderKanban,
  revision: RotateCcw,
  interview: MessagesSquare,
  practice: Dumbbell,
  certification: Award,
};

type Props = {
  checkpoint: Checkpoint;
  progressPct?: number;
};

export function CheckpointCard({ checkpoint, progressPct }: Props) {
  const Icon = iconMap[checkpoint.kind] ?? BookOpenCheck;
  return (
    <SurfaceCard>
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 bg-background/60 text-muted-foreground">
          <Icon className="h-4 w-4" />
        </div>
        <div className="min-w-0 flex-1 space-y-2">
          <div className="text-sm font-semibold tracking-tight text-foreground">
            {checkpoint.title}
          </div>
          {checkpoint.description && (
            <p className="text-xs leading-relaxed text-muted-foreground">
              {checkpoint.description}
            </p>
          )}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              <span>Progress</span>
              <span>{progressPct != null ? `${progressPct}%` : "—"}</span>
            </div>
            <Progress value={progressPct ?? 0} className="h-1.5" />
          </div>
        </div>
      </div>
    </SurfaceCard>
  );
}
