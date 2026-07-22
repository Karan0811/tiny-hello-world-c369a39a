// Roadmap-domain types. All roadmap surfaces (tracks, nodes, skill tree,
// career paths, checkpoints) are described here and driven by
// src/config/roadmap.ts. UI stays presentational.

import type { Difficulty } from "@/features/learning/types";

export type RoadmapStatus =
  | "not-started"
  | "in-progress"
  | "completed"
  | "locked"
  | "recommended"
  | "future";

export type RoadmapNodeKind = "milestone" | "module" | "project" | "checkpoint";

export type RoadmapNode = {
  id: string;
  title: string;
  description?: string;
  category?: string;
  difficulty?: Difficulty;
  estimatedHours?: number;
  requiredSkills?: string[];
  status: RoadmapStatus;
  kind?: RoadmapNodeKind;
  // References only — actual content lives in the Learning architecture.
  learningRefs?: { categorySlug: string; moduleSlug?: string }[];
  projectRefs?: string[];
  resourceRefs?: string[];
  careerBenefit?: string;
  // Graph edges. `next` = required progression, `branches` = optional forks.
  next?: string[];
  branches?: string[];
};

export type RoadmapTrack = {
  slug: string;
  title: string;
  description: string;
  estimatedDuration?: string;
  difficulty: Difficulty;
  prerequisites: string[];
  skillsGained: string[];
  careerOutcome: string;
  status: RoadmapStatus;
  iconKey?: string;
  accent?: string;
  nodes: RoadmapNode[];
};

export type SkillTreeNode = {
  id: string;
  label: string;
  description?: string;
  categorySlug?: string;
  children?: SkillTreeNode[];
};

export type CareerPath = {
  slug: string;
  role: string;
  summary: string;
  requiredSkills: string[];
  projectRefs: string[];
  portfolioFocus: string[];
  interviewTopics: string[];
  trackSlugs: string[];
};

export type CheckpointKind =
  | "modules"
  | "projects"
  | "revision"
  | "interview"
  | "practice"
  | "certification";

export type Checkpoint = {
  id: string;
  kind: CheckpointKind;
  title: string;
  description?: string;
};

export type RoadmapFilters = {
  search: string;
  difficulty: Difficulty | "all";
  status: RoadmapStatus | "all";
  track: string | "all";
  career: string | "all";
  maxHours: number | "all";
};

export const emptyFilters: RoadmapFilters = {
  search: "",
  difficulty: "all",
  status: "all",
  track: "all",
  career: "all",
  maxHours: "all",
};
