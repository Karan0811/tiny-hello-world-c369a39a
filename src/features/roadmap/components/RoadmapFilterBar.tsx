import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { careerPaths, roadmapTracks } from "@/config/roadmap";
import type { RoadmapFilters } from "../types";
import { difficultyLabels, statusLabels } from "../utils";

type Props = {
  value: RoadmapFilters;
  onChange: (next: RoadmapFilters) => void;
};

export function RoadmapFilterBar({ value, onChange }: Props) {
  const patch = (p: Partial<RoadmapFilters>) => onChange({ ...value, ...p });
  return (
    <div className="grid gap-2 md:grid-cols-6">
      <div className="relative md:col-span-2">
        <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search roadmaps…"
          className="pl-8"
          value={value.search}
          onChange={(e) => patch({ search: e.target.value })}
        />
      </div>
      <Select
        value={value.difficulty}
        onValueChange={(v) => patch({ difficulty: v as RoadmapFilters["difficulty"] })}
      >
        <SelectTrigger><SelectValue placeholder="Difficulty" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All difficulties</SelectItem>
          {Object.entries(difficultyLabels).map(([k, l]) => (
            <SelectItem key={k} value={k}>{l}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        value={value.status}
        onValueChange={(v) => patch({ status: v as RoadmapFilters["status"] })}
      >
        <SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All statuses</SelectItem>
          {Object.entries(statusLabels).map(([k, l]) => (
            <SelectItem key={k} value={k}>{l}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={value.track} onValueChange={(v) => patch({ track: v })}>
        <SelectTrigger><SelectValue placeholder="Track" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All tracks</SelectItem>
          {roadmapTracks.map((t) => (
            <SelectItem key={t.slug} value={t.slug}>{t.title}</SelectItem>
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
