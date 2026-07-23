// Project catalog — single source of truth. Add a ProjectDefinition record
// and every Projects surface (landing, filters, detail tabs) renders it
// automatically. No real project content lives here yet — architecture only.

import type {
  ProjectCategory,
  ProjectDefinition,
  ProjectLevel,
  ProjectTabKey,
} from "@/features/projects/types";

// ---------------------------------------------------------------------------
// Categories
// ---------------------------------------------------------------------------

export const projectCategories: ProjectCategory[] = [
  { slug: "python", name: "Python", description: "Language, tooling, scripting builds." },
  { slug: "data-analysis", name: "Data Analysis", description: "EDA, reporting, dashboards." },
  { slug: "machine-learning", name: "Machine Learning", description: "Classical ML end-to-end." },
  { slug: "deep-learning", name: "Deep Learning", description: "Neural networks and training." },
  { slug: "nlp", name: "NLP", description: "Text processing and language models." },
  { slug: "computer-vision", name: "Computer Vision", description: "Image and video systems." },
  { slug: "generative-ai", name: "Generative AI", description: "LLM-powered applications." },
  { slug: "rag", name: "RAG", description: "Retrieval-augmented generation systems." },
  { slug: "mcp", name: "MCP", description: "Model Context Protocol integrations." },
  { slug: "ai-agents", name: "AI Agents", description: "Tool-using autonomous agents." },
  { slug: "agentic-ai", name: "Agentic AI", description: "Multi-agent orchestration." },
  { slug: "mlops", name: "MLOps", description: "Pipelines, monitoring, deployment." },
  { slug: "llmops", name: "LLMOps", description: "LLM evaluation, guardrails, serving." },
  { slug: "cloud-deployment", name: "Cloud Deployment", description: "Ship to AWS, GCP, Azure." },
  { slug: "full-stack-ai", name: "Full Stack AI", description: "End-to-end AI products." },
];

export const projectCategoriesBySlug: Record<string, ProjectCategory> =
  Object.fromEntries(projectCategories.map((c) => [c.slug, c]));

// ---------------------------------------------------------------------------
// Levels
// ---------------------------------------------------------------------------

export const projectLevels: {
  slug: ProjectLevel;
  name: string;
  description: string;
}[] = [
  { slug: "beginner", name: "Beginner", description: "Guided first builds." },
  { slug: "intermediate", name: "Intermediate", description: "Real data, real scope." },
  { slug: "advanced", name: "Advanced", description: "End-to-end AI systems." },
  { slug: "production", name: "Production", description: "Reliability, scale, MLOps." },
  { slug: "capstone", name: "Capstone", description: "Portfolio-defining builds." },
];

// ---------------------------------------------------------------------------
// Tabs — order controls the detail page navigation
// ---------------------------------------------------------------------------

export const projectTabs: { key: ProjectTabKey; label: string }[] = [
  { key: "overview", label: "Overview" },
  { key: "roadmap", label: "Roadmap" },
  { key: "tasks", label: "Tasks" },
  { key: "datasets", label: "Datasets" },
  { key: "resources", label: "Resources" },
  { key: "implementation", label: "Implementation" },
  { key: "testing", label: "Testing" },
  { key: "deployment", label: "Deployment" },
  { key: "documentation", label: "Documentation" },
  { key: "interview", label: "Interview" },
  { key: "notes", label: "Notes" },
];

// ---------------------------------------------------------------------------
// Duration buckets (drive the duration filter)
// ---------------------------------------------------------------------------

export const durationBuckets = [
  { slug: "short", label: "Under a week" },
  { slug: "medium", label: "1–3 weeks" },
  { slug: "long", label: "Over a month" },
] as const;

// ---------------------------------------------------------------------------
// Projects catalog — intentionally empty. Add records here; UI updates.
// ---------------------------------------------------------------------------

export const projects: ProjectDefinition[] = [];

export const projectsBySlug: Record<string, ProjectDefinition> =
  Object.fromEntries(projects.map((p) => [p.slug, p]));

// Cross-cut selectors — kept here so page components stay dumb.
export const featuredProjects = () => projects.filter((p) => p.featured);
export const projectsByCategory = (slug: string) =>
  projects.filter((p) => p.category === slug);
export const projectsByLevel = (level: ProjectLevel) =>
  projects.filter((p) => p.level === level);
