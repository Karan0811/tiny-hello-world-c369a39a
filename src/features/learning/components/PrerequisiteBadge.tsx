import { Badge } from "@/components/ui/badge";
import { Check, Lock, LockOpen, CircleDashed, CircleDot } from "lucide-react";
import type { ModuleStatus } from "../types";

const statusMap: Record<
  ModuleStatus,
  { label: string; icon: typeof Check; className: string }
> = {
  "not-started": { label: "Not started", icon: CircleDashed, className: "text-muted-foreground" },
  "in-progress": { label: "In progress", icon: CircleDot, className: "text-primary" },
  completed: { label: "Completed", icon: Check, className: "text-emerald-400" },
  unlocked: { label: "Unlocked", icon: LockOpen, className: "text-foreground" },
  locked: { label: "Locked", icon: Lock, className: "text-muted-foreground" },
};

export function PrerequisiteBadge({
  status,
  strength,
}: {
  status?: ModuleStatus;
  strength?: "required" | "recommended";
}) {
  if (strength) {
    return (
      <Badge
        variant="secondary"
        className="rounded-md bg-muted/40 text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground"
      >
        {strength === "required" ? "Required" : "Recommended"}
      </Badge>
    );
  }
  const s = statusMap[status ?? "not-started"];
  const Icon = s.icon;
  return (
    <Badge
      variant="secondary"
      className={`rounded-md bg-muted/30 text-[10px] font-medium uppercase tracking-[0.14em] ${s.className}`}
    >
      <Icon className="mr-1 h-3 w-3" />
      {s.label}
    </Badge>
  );
}

export function DifficultyBadge({ difficulty }: { difficulty: string }) {
  return (
    <Badge
      variant="outline"
      className="rounded-md border-border/60 text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground"
    >
      {difficulty}
    </Badge>
  );
}