import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Clock } from "lucide-react";
import { SurfaceCard } from "@/components/common";
import { Badge } from "@/components/ui/badge";
import type { ProjectDefinition } from "../types";
import { levelLabels, projectStatusLabels } from "../utils";
import { TechnologyBadge } from "./TechnologyBadge";

export function ProjectCard({ project }: { project: ProjectDefinition }) {
  return (
    <Link to="/projects/$project" params={{ project: project.slug }} className="block">
      <SurfaceCard interactive className="h-full">
        <div className="flex h-full flex-col gap-3">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0 space-y-1">
              <div className="text-sm font-semibold tracking-tight text-foreground">
                {project.title}
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground line-clamp-3">
                {project.description}
              </p>
            </div>
            <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <Badge variant="outline" className="rounded-md text-[10px] uppercase tracking-[0.14em]">
              {levelLabels[project.level]}
            </Badge>
            <Badge variant="secondary" className="rounded-md text-[10px]">
              {projectStatusLabels[project.status]}
            </Badge>
            {project.estimatedDuration && (
              <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground">
                <Clock className="h-3 w-3" />
                {project.estimatedDuration}
              </span>
            )}
          </div>

          {(project.technologies ?? []).length > 0 && (
            <div className="mt-auto flex flex-wrap gap-1.5 border-t border-border/50 pt-3">
              {project.technologies!.slice(0, 5).map((t) => (
                <TechnologyBadge key={t} name={t} />
              ))}
            </div>
          )}
        </div>
      </SurfaceCard>
    </Link>
  );
}
