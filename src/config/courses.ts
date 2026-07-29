// Course catalog + resource taxonomy.
//
// This file describes presentation metadata only (title, blurb, icon, accent).
// Lessons, modules, quizzes, flashcards and cheatsheets are discovered from
// /content at build time — never listed here.

export type CourseCatalogEntry = {
  /** must match the directory name under /content */
  id: string;
  title: string;
  description: string;
  iconKey: string;
  accent: string;
};

export const courseCatalog: CourseCatalogEntry[] = [
  {
    id: "python",
    title: "Python",
    description:
      "From first program to production-grade engineering — the language every AI system is built on.",
    iconKey: "code",
    accent: "primary",
  },
  {
    id: "machine-learning",
    title: "Machine Learning",
    description: "Classical ML from first principles: data, models, evaluation.",
    iconKey: "brain",
    accent: "chart-2",
  },
  {
    id: "deep-learning",
    title: "Deep Learning",
    description: "Neural networks, optimization, and transformer architectures.",
    iconKey: "layers",
    accent: "chart-3",
  },
  {
    id: "generative-ai",
    title: "Generative AI",
    description: "LLMs, embeddings, RAG, and multimodal generation.",
    iconKey: "sparkles",
    accent: "chart-4",
  },
  {
    id: "agentic-ai",
    title: "Agentic AI",
    description: "Planning, tools, memory, and multi-agent orchestration.",
    iconKey: "bot",
    accent: "chart-5",
  },
  {
    id: "mlops",
    title: "MLOps",
    description: "Ship, monitor, and operate models reliably in production.",
    iconKey: "rocket",
    accent: "chart-1",
  },
  {
    id: "llmops",
    title: "LLMOps",
    description: "Evaluation, guardrails, cost, and scale for LLM systems.",
    iconKey: "server",
    accent: "chart-2",
  },
];

export type ResourceCategory = {
  key: string;
  label: string;
  description: string;
  iconKey: string;
  /** filename fragments that map a master resource doc to this category */
  match: string[];
};

export const resourceCategories: ResourceCategory[] = [
  {
    key: "documentation",
    label: "Documentation",
    description: "Official references and language specifications.",
    iconKey: "file-text",
    match: ["documentation", "docs"],
  },
  {
    key: "books",
    label: "Books",
    description: "Deep-dive reading paths from beginner to expert.",
    iconKey: "book-open",
    match: ["books"],
  },
  {
    key: "videos",
    label: "Videos",
    description: "Courses, talks, and long-form video learning.",
    iconKey: "video",
    match: ["video", "videos"],
  },
  {
    key: "github",
    label: "GitHub",
    description: "Repositories worth reading and contributing to.",
    iconKey: "github",
    match: ["github", "repositories"],
  },
  {
    key: "blogs",
    label: "Blogs & Community",
    description: "Newsletters, blogs, and community spaces.",
    iconKey: "rss",
    match: ["blog", "community"],
  },
  {
    key: "practice",
    label: "Practice & Interviews",
    description: "Exercises, practice projects, and interview prep.",
    iconKey: "dumbbell",
    match: ["practice", "interview"],
  },
  {
    key: "tools",
    label: "Tools & Career",
    description: "Tooling, workflow, and career progression.",
    iconKey: "wrench",
    match: ["tool", "career"],
  },
  {
    key: "conferences",
    label: "Conferences & Cheat Sheets",
    description: "Events, meetups, and quick reference sheets.",
    iconKey: "presentation",
    match: ["conference", "cheat"],
  },
];

export function resourceCategoryFor(fileSlug: string): string {
  const lower = fileSlug.toLowerCase();
  const hit = resourceCategories.find((c) =>
    c.match.some((fragment) => lower.includes(fragment)),
  );
  return hit?.key ?? "documentation";
}

export const resourceCategoriesByKey: Record<string, ResourceCategory> =
  Object.fromEntries(resourceCategories.map((c) => [c.key, c]));
