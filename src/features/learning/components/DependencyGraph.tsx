import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { SurfaceCard } from "@/components/common";
import { dependencyEdges, dependencyNodes } from "@/config/learning";
import type { DependencyEdge, DependencyNode } from "../types";

type Props = {
  nodes?: DependencyNode[];
  edges?: DependencyEdge[];
};

// Renders a linear/branching dependency chain. Config-driven; new nodes and
// edges appear automatically as they're added to src/config/learning.ts.
export function DependencyGraph({ nodes = dependencyNodes, edges = dependencyEdges }: Props) {
  // Compute topological order for a vertical chain visualization.
  const order = topoOrder(nodes, edges);

  return (
    <SurfaceCard>
      <div className="mb-4 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
        Dependency graph
      </div>
      <div className="flex flex-col items-center gap-2">
        {order.map((node, i) => (
          <div key={node.slug} className="flex flex-col items-center gap-2">
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03, duration: 0.25, ease: "easeOut" }}
              className="rounded-lg border border-border/60 bg-background/60 px-4 py-2 text-sm font-medium tracking-tight text-foreground"
            >
              {node.label}
            </motion.div>
            {i < order.length - 1 && (
              <ArrowDown className="h-4 w-4 text-muted-foreground/60" />
            )}
          </div>
        ))}
      </div>
    </SurfaceCard>
  );
}

function topoOrder(nodes: DependencyNode[], edges: DependencyEdge[]): DependencyNode[] {
  const indeg = new Map<string, number>(nodes.map((n) => [n.slug, 0]));
  edges.forEach((e) => indeg.set(e.to, (indeg.get(e.to) ?? 0) + 1));
  const bySlug = new Map(nodes.map((n) => [n.slug, n]));
  const queue = nodes.filter((n) => (indeg.get(n.slug) ?? 0) === 0).map((n) => n.slug);
  const out: DependencyNode[] = [];
  const seen = new Set<string>();
  while (queue.length) {
    const s = queue.shift()!;
    if (seen.has(s)) continue;
    seen.add(s);
    const n = bySlug.get(s);
    if (n) out.push(n);
    edges
      .filter((e) => e.from === s)
      .forEach((e) => {
        indeg.set(e.to, (indeg.get(e.to) ?? 1) - 1);
        if ((indeg.get(e.to) ?? 0) <= 0) queue.push(e.to);
      });
  }
  return out;
}