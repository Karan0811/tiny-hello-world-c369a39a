import { Check, Circle, Clock, Lock, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import type { RoadmapNode as RoadmapNodeType } from "../types";
import { difficultyLabels, statusLabels } from "../utils";

type Props = {
  node: RoadmapNodeType;
  onSelect?: (node: RoadmapNodeType) => void;
  isCurrent?: boolean;
};

const statusIcon = {
  completed: Check,
  locked: Lock,
  recommended: Sparkles,
  "in-progress": Clock,
  "not-started": Circle,
  future: Circle,
} as const;

export function RoadmapNode({ node, onSelect, isCurrent }: Props) {
  const Icon = statusIcon[node.status];
  const locked = node.status === "locked";
  return (
    <motion.button
      type="button"
      onClick={() => onSelect?.(node)}
      whileHover={{ y: -1 }}
      transition={{ duration: 0.15 }}
      className={cn(
        "group relative w-full max-w-md rounded-xl border border-border/60 bg-card/60 p-4 text-left backdrop-blur transition-colors",
        "hover:border-border hover:bg-card",
        locked && "opacity-70",
        isCurrent && "border-primary/60 ring-1 ring-primary/40",
      )}
    >
      <div className="flex items-start gap-3">
        <div
          className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border/60 bg-background/60 text-muted-foreground",
            node.status === "completed" && "text-emerald-500",
            node.status === "recommended" && "text-amber-500",
            isCurrent && "text-primary",
          )}
        >
          <Icon className="h-4 w-4" />
        </div>
        <div className="min-w-0 flex-1 space-y-1">
          <div className="flex items-center justify-between gap-2">
            <div className="truncate text-sm font-medium tracking-tight text-foreground">
              {node.title}
            </div>
            <Badge
              variant="outline"
              className="rounded-md text-[10px] uppercase tracking-[0.14em] text-muted-foreground"
            >
              {statusLabels[node.status]}
            </Badge>
          </div>
          {node.description && (
            <p className="text-xs leading-relaxed text-muted-foreground">
              {node.description}
            </p>
          )}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-muted-foreground">
            {node.difficulty && <span>{difficultyLabels[node.difficulty]}</span>}
            {node.estimatedHours != null && (
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3 w-3" /> {node.estimatedHours}h
              </span>
            )}
            {node.kind && (
              <span className="uppercase tracking-[0.14em]">{node.kind}</span>
            )}
          </div>
        </div>
      </div>
    </motion.button>
  );
}
