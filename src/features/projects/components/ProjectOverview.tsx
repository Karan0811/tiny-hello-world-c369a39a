import { SurfaceCard } from "@/components/common";
import { Badge } from "@/components/ui/badge";
import type { ProjectDefinition } from "../types";
import { levelLabels, projectStatusLabels } from "../utils";
import { SkillBadge } from "./SkillBadge";
import { TechnologyBadge } from "./TechnologyBadge";

export function ProjectOverview({ project }: { project: ProjectDefinition }) {
  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
      <SurfaceCard>
        <div className="space-y-5 text-sm">
          <Section title="Description">
            <p className="text-sm leading-relaxed text-muted-foreground">{project.description}</p>
          </Section>
          {(project.learningOutcomes ?? []).length > 0 && (
            <Section title="Learning outcomes">
              <ul className="ml-4 list-disc space-y-1 text-sm text-muted-foreground">
                {project.learningOutcomes!.map((o, i) => <li key={i}>{o}</li>)}
              </ul>
            </Section>
          )}
          {(project.prerequisites ?? []).length > 0 && (
            <Section title="Prerequisites">
              <div className="flex flex-wrap gap-1.5">
                {project.prerequisites!.map((p) => <SkillBadge key={p} name={p} />)}
              </div>
            </Section>
          )}
        </div>
      </SurfaceCard>

      <SurfaceCard>
        <div className="space-y-4 text-sm">
          <Meta label="Level" value={levelLabels[project.level]} />
          <Meta label="Status" value={projectStatusLabels[project.status]} />
          {project.estimatedDuration && (
            <Meta label="Duration" value={project.estimatedDuration} />
          )}
          {project.estimatedEffort && <Meta label="Effort" value={project.estimatedEffort} />}
          {project.certificateEligible && (
            <div>
              <Badge variant="outline" className="rounded-md text-[10px] uppercase tracking-[0.14em]">
                Certificate eligible
              </Badge>
            </div>
          )}
          {(project.skills ?? []).length > 0 && (
            <MetaBadges label="Skills" items={project.skills!} />
          )}
          {(project.technologies ?? []).length > 0 && (
            <div>
              <Label>Technologies</Label>
              <div className="mt-1 flex flex-wrap gap-1.5">
                {project.technologies!.map((t) => <TechnologyBadge key={t} name={t} />)}
              </div>
            </div>
          )}
        </div>
      </SurfaceCard>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <Label>{title}</Label>
      <div className="mt-2">{children}</div>
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <Label>{label}</Label>
      <div className="mt-0.5 text-sm text-foreground">{value}</div>
    </div>
  );
}

function MetaBadges({ label, items }: { label: string; items: string[] }) {
  return (
    <div>
      <Label>{label}</Label>
      <div className="mt-1 flex flex-wrap gap-1.5">
        {items.map((i) => <SkillBadge key={i} name={i} />)}
      </div>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
      {children}
    </div>
  );
}
