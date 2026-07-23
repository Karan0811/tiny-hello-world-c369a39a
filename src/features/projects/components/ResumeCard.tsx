import { FileBadge2 } from "lucide-react";
import { SurfaceCard, EmptyState } from "@/components/common";

export function ResumeCard({ highlights }: { highlights?: string[] }) {
  if (!highlights || highlights.length === 0) {
    return (
      <EmptyState
        icon={FileBadge2}
        title="Resume highlights pending"
        description="Bullet points ready to drop into your resume will appear here once the project is fleshed out."
      />
    );
  }
  return (
    <SurfaceCard>
      <div className="space-y-2">
        <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
          Resume highlights
        </div>
        <ul className="ml-4 list-disc space-y-1 text-sm text-muted-foreground">
          {highlights.map((h, i) => <li key={i}>{h}</li>)}
        </ul>
      </div>
    </SurfaceCard>
  );
}
