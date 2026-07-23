import { Rocket } from "lucide-react";
import { SurfaceCard, EmptyState } from "@/components/common";
import { Badge } from "@/components/ui/badge";
import type { DeploymentTarget } from "../types";

export function DeploymentCard({ targets }: { targets?: DeploymentTarget[] }) {
  if (!targets || targets.length === 0) {
    return (
      <EmptyState
        icon={Rocket}
        title="Deployment placeholder"
        description="Deployment targets (cloud provider, container, endpoint) will appear here."
      />
    );
  }
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {targets.map((t) => (
        <SurfaceCard key={t.id}>
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 bg-background/60">
              <Rocket className="h-4 w-4" />
            </div>
            <div className="min-w-0 space-y-1">
              <div className="text-sm font-semibold">{t.label}</div>
              {t.provider && (
                <Badge variant="secondary" className="rounded-md text-[10px]">{t.provider}</Badge>
              )}
              {t.notes && (
                <p className="text-xs leading-relaxed text-muted-foreground">{t.notes}</p>
              )}
            </div>
          </div>
        </SurfaceCard>
      ))}
    </div>
  );
}
