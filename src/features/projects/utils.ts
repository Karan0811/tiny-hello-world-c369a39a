import type { ProjectDefinition, ProjectFilters, ProjectLevel, TaskStatus } from "./types";

export const levelLabels: Record<ProjectLevel, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
  production: "Production",
  capstone: "Capstone",
};

export const projectStatusLabels: Record<string, string> = {
  "not-started": "Not started",
  "in-progress": "In progress",
  completed: "Completed",
  locked: "Locked",
  planned: "Planned",
};

export const taskStatusLabels: Record<TaskStatus, string> = {
  todo: "To do",
  "in-progress": "In progress",
  done: "Done",
  blocked: "Blocked",
};

export function filterProjects(list: ProjectDefinition[], f: ProjectFilters): ProjectDefinition[] {
  const q = f.search.trim().toLowerCase();
  return list.filter((p) => {
    if (q) {
      const hay = `${p.title} ${p.description} ${(p.technologies ?? []).join(" ")} ${(p.skills ?? []).join(" ")}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    if (f.difficulty !== "all" && p.difficulty !== f.difficulty) return false;
    if (f.level !== "all" && p.level !== f.level) return false;
    if (f.category !== "all" && p.category !== f.category) return false;
    if (f.status !== "all" && p.status !== f.status) return false;
    if (f.technology !== "all" && !(p.technologies ?? []).includes(f.technology)) return false;
    if (f.career !== "all" && !(p.relationships?.careerPathSlugs ?? []).includes(f.career)) {
      return false;
    }
    if (f.duration !== "all") {
      const bucket = bucketizeDuration(p.estimatedDuration);
      if (bucket !== f.duration) return false;
    }
    return true;
  });
}

export function bucketizeDuration(value?: string): "short" | "medium" | "long" | "unknown" {
  if (!value) return "unknown";
  const v = value.toLowerCase();
  if (/day|hour/.test(v)) return "short";
  if (/week/.test(v)) {
    const n = parseInt(v, 10);
    if (!Number.isNaN(n) && n >= 4) return "long";
    return "medium";
  }
  if (/month|quarter/.test(v)) return "long";
  return "unknown";
}

export function collectTechnologies(list: ProjectDefinition[]): string[] {
  const set = new Set<string>();
  for (const p of list) for (const t of p.technologies ?? []) set.add(t);
  return Array.from(set).sort();
}
