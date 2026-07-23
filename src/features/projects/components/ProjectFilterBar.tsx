import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { careerPaths } from "@/config/roadmap";
import { durationBuckets, projectCategories, projectLevels } from "@/config/projects";
import { difficultyLabels } from "@/features/roadmap/utils";
import type { ProjectFilters } from "../types";
import { levelLabels, projectStatusLabels } from "../utils";

type Props = {
  value: ProjectFilters;
  technologies: string[];
  onChange: (next: ProjectFilters) => void;
};

export function ProjectFilterBar({ value, technologies, onChange }: Props) {
  const patch = (p: Partial<ProjectFilters>) => onChange({ ...value, ...p });
  return (
    <div className="grid gap-2 md:grid-cols-6">
      <div className="relative md:col-span-2">
        <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search projects…"
          className="pl-8"
          value={value.search}
          onChange={(e) => patch({ search: e.target.value })}
        />
      </div>
      <Select value={value.category} onValueChange={(v) => patch({ category: v as ProjectFilters["category"] })}>
        <SelectTrigger><SelectValue placeholder="Category" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All categories</SelectItem>
          {projectCategories.map((c) => (
            <SelectItem key={c.slug} value={c.slug}>{c.name}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={value.level} onValueChange={(v) => patch({ level: v as ProjectFilters["level"] })}>
        <SelectTrigger><SelectValue placeholder="Level" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All levels</SelectItem>
          {projectLevels.map((l) => (
            <SelectItem key={l.slug} value={l.slug}>{levelLabels[l.slug]}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={value.difficulty} onValueChange={(v) => patch({ difficulty: v as ProjectFilters["difficulty"] })}>
        <SelectTrigger><SelectValue placeholder="Difficulty" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All difficulties</SelectItem>
          {Object.entries(difficultyLabels).map(([k, l]) => (
            <SelectItem key={k} value={k}>{l}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={value.technology} onValueChange={(v) => patch({ technology: v })}>
        <SelectTrigger><SelectValue placeholder="Technology" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Any technology</SelectItem>
          {technologies.map((t) => (
            <SelectItem key={t} value={t}>{t}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={value.duration} onValueChange={(v) => patch({ duration: v as ProjectFilters["duration"] })}>
        <SelectTrigger><SelectValue placeholder="Duration" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Any duration</SelectItem>
          {durationBuckets.map((d) => (
            <SelectItem key={d.slug} value={d.slug}>{d.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={value.status} onValueChange={(v) => patch({ status: v as ProjectFilters["status"] })}>
        <SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Any status</SelectItem>
          {Object.entries(projectStatusLabels).map(([k, l]) => (
            <SelectItem key={k} value={k}>{l}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={value.career} onValueChange={(v) => patch({ career: v })}>
        <SelectTrigger><SelectValue placeholder="Career goal" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Any career</SelectItem>
          {careerPaths.map((c) => (
            <SelectItem key={c.slug} value={c.slug}>{c.role}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
