import { MessagesSquare } from "lucide-react";
import { SurfaceCard, EmptyState } from "@/components/common";

export function InterviewPrepCard({ questions }: { questions?: string[] }) {
  if (!questions || questions.length === 0) {
    return (
      <EmptyState
        icon={MessagesSquare}
        title="Interview prep pending"
        description="Interview questions tied to this project's skills and architecture will appear here."
      />
    );
  }
  return (
    <SurfaceCard>
      <div className="space-y-2">
        <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
          Interview questions
        </div>
        <ol className="ml-4 list-decimal space-y-1 text-sm text-muted-foreground">
          {questions.map((q, i) => <li key={i}>{q}</li>)}
        </ol>
      </div>
    </SurfaceCard>
  );
}
