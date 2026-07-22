import { Briefcase } from "lucide-react";
import { SurfaceCard } from "@/components/common";
import { Badge } from "@/components/ui/badge";
import type { CareerPath } from "../types";

export function CareerPathCard({ career }: { career: CareerPath }) {
  return (
    <SurfaceCard className="h-full">
      <div className="flex h-full flex-col gap-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-border/60 bg-background/60 text-muted-foreground">
            <Briefcase className="h-4 w-4" />
          </div>
          <div className="min-w-0">
            <div className="text-sm font-semibold tracking-tight text-foreground">
              {career.role}
            </div>
            <div className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              Career path
            </div>
          </div>
        </div>
        <p className="text-xs leading-relaxed text-muted-foreground">{career.summary}</p>
        <Section title="Required skills" items={career.requiredSkills} />
        <Section title="Portfolio focus" items={career.portfolioFocus} />
        <Section title="Interview topics" items={career.interviewTopics} />
      </div>
    </SurfaceCard>
  );
}

function Section({ title, items }: { title: string; items: string[] }) {
  if (!items.length) return null;
  return (
    <div className="space-y-1.5">
      <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
        {title}
      </div>
      <div className="flex flex-wrap gap-1.5">
        {items.map((i) => (
          <Badge key={i} variant="secondary" className="rounded-md text-[10px] font-normal">
            {i}
          </Badge>
        ))}
      </div>
    </div>
  );
}
