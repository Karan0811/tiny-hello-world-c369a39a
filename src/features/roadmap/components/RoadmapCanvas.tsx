import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RoadmapNode as NodeCard } from "./RoadmapNode";
import { RoadmapConnection } from "./RoadmapConnection";
import type { RoadmapNode } from "../types";

type Props = {
  nodes: RoadmapNode[];
  currentNodeId?: string;
  onSelect?: (node: RoadmapNode) => void;
};

// Interactive vertical roadmap canvas with branching paths.
// Layout: main spine of nodes with `next` edges; nodes referenced by `branches`
// render as forked side cards under their parent.
export function RoadmapCanvas({ nodes, currentNodeId, onSelect }: Props) {
  const byId = new Map(nodes.map((n) => [n.id, n]));
  const spine: RoadmapNode[] = [];
  const branchMap = new Map<string, RoadmapNode[]>();

  // Identify spine roots: nodes not referenced as `next` from any other.
  const referencedAsNext = new Set(nodes.flatMap((n) => n.next ?? []));
  const branchTargets = new Set(nodes.flatMap((n) => n.branches ?? []));
  const roots = nodes.filter(
    (n) => !referencedAsNext.has(n.id) && !branchTargets.has(n.id),
  );

  const visited = new Set<string>();
  const walk = (id: string) => {
    if (visited.has(id)) return;
    visited.add(id);
    const node = byId.get(id);
    if (!node) return;
    spine.push(node);
    (node.branches ?? []).forEach((bId) => {
      const b = byId.get(bId);
      if (b) {
        branchMap.set(node.id, [...(branchMap.get(node.id) ?? []), b]);
        visited.add(bId);
      }
    });
    (node.next ?? []).forEach(walk);
  };
  roots.forEach((r) => walk(r.id));
  // Include stragglers not reached by traversal.
  nodes.forEach((n) => {
    if (!visited.has(n.id)) spine.push(n);
  });

  return (
    <ScrollArea className="h-[70vh] w-full rounded-xl border border-border/60 bg-muted/5 p-4 md:p-8">
      <div className="mx-auto flex max-w-2xl flex-col items-center">
        {spine.map((node, i) => {
          const branches = branchMap.get(node.id) ?? [];
          return (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03, duration: 0.25 }}
              className="flex w-full flex-col items-center"
            >
              <NodeCard
                node={node}
                onSelect={onSelect}
                isCurrent={currentNodeId === node.id}
              />
              {branches.length > 0 && (
                <div className="mt-3 flex w-full flex-col items-stretch gap-3 md:flex-row md:justify-center">
                  {branches.map((b) => (
                    <div key={b.id} className="flex flex-1 flex-col items-center">
                      <RoadmapConnection variant="dashed" branch />
                      <NodeCard
                        node={b}
                        onSelect={onSelect}
                        isCurrent={currentNodeId === b.id}
                      />
                    </div>
                  ))}
                </div>
              )}
              {i < spine.length - 1 && <RoadmapConnection />}
            </motion.div>
          );
        })}
      </div>
    </ScrollArea>
  );
}
