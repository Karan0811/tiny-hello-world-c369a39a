import type { RoadmapFilters, RoadmapTrack } from "./types";

export function filterTracks(tracks: RoadmapTrack[], f: RoadmapFilters): RoadmapTrack[] {
  const q = f.search.trim().toLowerCase();
  return tracks.filter((t) => {
    if (q && !`${t.title} ${t.description}`.toLowerCase().includes(q)) return false;
    if (f.difficulty !== "all" && t.difficulty !== f.difficulty) return false;
    if (f.status !== "all" && t.status !== f.status) return false;
    if (f.track !== "all" && t.slug !== f.track) return false;
    if (f.career !== "all") {
      // Cross-check happens at page level via careerPaths; keep utility permissive.
    }
    return true;
  });
}

export const statusLabels: Record<string, string> = {
  "not-started": "Not started",
  "in-progress": "In progress",
  completed: "Completed",
  locked: "Locked",
  recommended: "Recommended",
  future: "Future",
};

export const difficultyLabels: Record<string, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
  expert: "Expert",
};
