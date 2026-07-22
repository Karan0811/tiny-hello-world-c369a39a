import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { SurfaceCard } from "@/components/common";
import { Button } from "@/components/ui/button";

type Props = {
  icon?: LucideIcon;
  eyebrow: string;
  title: string;
  description?: string;
  cta?: { label: string; onClick?: () => void };
};

export function JourneyCard({ icon: Icon, eyebrow, title, description, cta }: Props) {
  return (
    <SurfaceCard className="h-full">
      <div className="flex h-full flex-col gap-3">
        <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
          {Icon && <Icon className="h-3.5 w-3.5" />}
          {eyebrow}
        </div>
        <div className="space-y-1">
          <div className="text-base font-semibold tracking-tight text-foreground">
            {title}
          </div>
          {description && (
            <p className="text-xs leading-relaxed text-muted-foreground">{description}</p>
          )}
        </div>
        {cta && (
          <div className="mt-auto pt-3">
            <Button size="sm" variant="outline" onClick={cta.onClick}>
              {cta.label}
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        )}
      </div>
    </SurfaceCard>
  );
}