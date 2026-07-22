// Shared learning-domain types. Every learning surface (category, module,
// lesson) is described here so future content can be added by dropping
// records into src/config/learning.ts without touching UI code.

export type Difficulty = "beginner" | "intermediate" | "advanced" | "expert";

export type ModuleStatus =
  | "not-started"
  | "in-progress"
  | "completed"
  | "locked"
  | "unlocked";

export type LearningMode = "learn" | "practice" | "build";

export type ResourceKind =
  | "docs"
  | "videos"
  | "articles"
  | "books"
  | "papers"
  | "github"
  | "datasets";

export type ResourceRef = {
  kind: ResourceKind;
  title: string;
  url?: string;
  note?: string;
};

export type PrerequisiteRef = {
  categorySlug: string;
  moduleSlug?: string;
  strength: "required" | "recommended";
};

export type QuizQuestion = {
  id: string;
  prompt: string;
  choices?: string[];
  answer?: string;
};

export type InterviewQuestion = {
  id: string;
  prompt: string;
  difficulty?: Difficulty;
};

export type LessonRef = {
  slug: string;
  title: string;
  summary?: string;
  estimatedMinutes?: number;
  status?: ModuleStatus;
};

export type ModuleDefinition = {
  slug: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  estimatedHours?: number;
  prerequisites: PrerequisiteRef[];
  objectives: string[];
  status: ModuleStatus;
  lessons: LessonRef[];
  resources: ResourceRef[];
  projects: { slug: string; title: string; summary?: string }[];
  quiz: QuizQuestion[];
  revision: { id: string; title: string; note?: string }[];
  interview: InterviewQuestion[];
  notes: { id: string; title: string }[];
};

export type LearningCategoryDefinition = {
  slug: string;
  name: string;
  description: string;
  difficulty: Difficulty;
  iconKey: string;
  estimatedLessons?: number;
  modules: ModuleDefinition[];
};

export type DependencyNode = {
  slug: string;
  label: string;
  categorySlug?: string;
};

export type DependencyEdge = {
  from: string;
  to: string;
};

export type LearningProgress = {
  completionPct?: number;
  lessonsCompleted?: number;
  practiceCompleted?: number;
  projectsCompleted?: number;
  revisionCompleted?: number;
  interviewReady?: boolean;
};