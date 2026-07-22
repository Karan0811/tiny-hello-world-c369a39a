import { ChevronRight } from "lucide-react";
import { SurfaceCard } from "@/components/common";
import { cn } from "@/lib/utils";
import type { SkillTreeNode } from "../types";

type Props = {
  root: SkillTreeNode;
  orientation?: "vertical" | "horizontal";
};

// Data-driven skill tree. Renders a nested tree from a single root; the same
// structure supports vertical dependency chains and horizontal branch views.
export function SkillTree({ root, orientation = "vertical" }: Props) {
  return (
    <SurfaceCard>
      <div className="mb-4 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
        Skill tree
      </div>
      <SkillNode node={root} depth={0} orientation={orientation} />
    </SurfaceCard>
  );
}

function SkillNode({
  node,
  depth,
  orientation,
}: {
  node: SkillTreeNode;
  depth: number;
  orientation: "vertical" | "horizontal";
}) {
  const hasChildren = !!node.children?.length;
  return (
    <div
      className={cn(
        orientation === "vertical" ? "flex flex-col" : "flex flex-row items-start gap-4",
      )}
    >
      <div
        className={cn(
          "inline-flex items-center gap-2 rounded-lg border border-border/60 bg-background/60 px-3 py-2 text-sm font-medium tracking-tight text-foreground",
          depth === 0 && "border-primary/40",
        )}
      >
        <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
        {node.label}
      </div>
      {hasChildren && (
        <div
          className={cn(
            orientation === "vertical"
              ? "ml-3 mt-2 border-l border-dashed border-border/60 pl-4"
              : "border-t border-dashed border-border/60 pt-2",
          )}
        >
          {node.children!.map((child) => (
            <div key={child.id} className="mt-2 first:mt-0">
              <SkillNode node={child} depth={depth + 1} orientation={orientation} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
