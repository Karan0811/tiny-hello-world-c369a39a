import { SurfaceCard } from "@/components/common";
import { cn } from "@/lib/utils";
import type { Conversation } from "../types";

export function ConversationSidebar({
  conversations,
  activeId,
  onSelect,
}: {
  conversations: Pick<Conversation, "id" | "title" | "updatedAt">[];
  activeId?: string;
  onSelect?: (id: string) => void;
}) {
  return (
    <SurfaceCard className="p-3">
      <div className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
        Conversations
      </div>
      <div className="mt-2 flex flex-col gap-1">
        {conversations.length === 0 && (
          <div className="rounded-md border border-dashed border-border/60 p-3 text-xs text-muted-foreground">
            No conversations yet.
          </div>
        )}
        {conversations.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => onSelect?.(c.id)}
            className={cn(
              "truncate rounded-md border border-transparent px-2 py-1.5 text-left text-sm transition-colors hover:bg-background/60",
              c.id === activeId && "border-border/60 bg-background/60",
            )}
          >
            {c.title}
          </button>
        ))}
      </div>
    </SurfaceCard>
  );
}
