// Project-domain types. All Project surfaces (catalog, detail tabs, tasks,
// datasets, implementation flow, deployment, resume, interview) are declared
// here and driven by src/config/projects.ts. UI stays presentational — add a
// record and the pages render it automatically.

import type { Difficulty } from "@/features/learning/types";

export type ProjectLevel =
  | "beginner"
  | "intermediate"
  | "advanced"
  | "production"
  | "capstone";

export type ProjectStatus =
  | "not-started"
  | "in-progress"
  | "completed"
  | "locked"
  | "planned";

export type ProjectType =
  | "guided"
  | "applied"
  | "capstone"
  | "portfolio"
  | "research";

export type ProjectCategorySlug =
  | "python"
  | "data-analysis"
  | "machine-learning"
  | "deep-learning"
  | "nlp"
  | "computer-vision"
  | "generative-ai"
  | "rag"
  | "mcp"
  | "ai-agents"
  | "agentic-ai"
  | "mlops"
  | "llmops"
  | "cloud-deployment"
  | "full-stack-ai";

export type ProjectCategory = {
  slug: ProjectCategorySlug;
  name: string;
  description: string;
  iconKey?: string;
};

export type TaskStatus = "todo" | "in-progress" | "done" | "blocked";

export type ProjectTask = {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  estimatedTime?: string;
  dependencies?: string[];
  requiredSkills?: string[];
  hints?: string[];
  aiReview?: {
    enabled: boolean;
    focus?: string[];
  };
};

export type DatasetRef = {
  id: string;
  name: string;
  description?: string;
  source?: string;
  size?: string;
  license?: string;
  domain?: string;
  downloadUrl?: string;
  docsUrl?: string;
};

export type ImplementationStep = {
  id: string;
  title: string;
  summary?: string;
  notes?: string[];
};

export type ImplementationFlow = {
  problemStatement?: string;
  businessContext?: string;
  architecture?: ImplementationStep[];
  folderStructure?: ImplementationStep[];
  environmentSetup?: ImplementationStep[];
  implementation?: ImplementationStep[];
  evaluation?: ImplementationStep[];
  testing?: ImplementationStep[];
  optimization?: ImplementationStep[];
  deployment?: ImplementationStep[];
  resumePoints?: string[];
  portfolioTips?: string[];
  interviewQuestions?: string[];
};

export type DeploymentTarget = {
  id: string;
  label: string;
  provider?: string;
  notes?: string;
  url?: string;
};

export type ProjectRelationships = {
  // References only — no duplicated content.
  learningRefs?: { categorySlug: string; moduleSlug?: string }[];
  roadmapNodeIds?: string[];
  resourceRefs?: string[];
  interviewTopics?: string[];
  careerPathSlugs?: string[];
};

export type ProjectDefinition = {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: ProjectCategorySlug;
  difficulty: Difficulty;
  level: ProjectLevel;
  projectType: ProjectType;
  status: ProjectStatus;
  estimatedDuration?: string; // wall-clock, e.g. "2 weeks"
  estimatedEffort?: string;   // focused hours, e.g. "20h"
  prerequisites?: string[];
  learningOutcomes?: string[];
  skills?: string[];
  technologies?: string[];
  datasets?: DatasetRef[];
  tasks?: ProjectTask[];
  flow?: ImplementationFlow;
  deployment?: DeploymentTarget[];
  relationships?: ProjectRelationships;
  githubUrl?: string;         // placeholder-safe
  demoUrl?: string;
  certificateEligible?: boolean;
  resumeHighlights?: string[];
  featured?: boolean;
};

export type ProjectFilters = {
  search: string;
  difficulty: Difficulty | "all";
  level: ProjectLevel | "all";
  category: ProjectCategorySlug | "all";
  technology: string | "all";
  duration: "all" | "short" | "medium" | "long";
  status: ProjectStatus | "all";
  career: string | "all";
};

export const emptyProjectFilters: ProjectFilters = {
  search: "",
  difficulty: "all",
  level: "all",
  category: "all",
  technology: "all",
  duration: "all",
  status: "all",
  career: "all",
};

export type ProjectTabKey =
  | "overview"
  | "roadmap"
  | "tasks"
  | "datasets"
  | "resources"
  | "implementation"
  | "testing"
  | "deployment"
  | "documentation"
  | "interview"
  | "notes";
