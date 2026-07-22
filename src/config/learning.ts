// Central learning taxonomy. Adding a new category or module = append a
// record here. UI reads through this config only — no hardcoded content.

import type {
  DependencyEdge,
  DependencyNode,
  LearningCategoryDefinition,
} from "@/features/learning/types";

export const learningCategoryList: LearningCategoryDefinition[] = [
  {
    slug: "python",
    name: "Python",
    description: "The lingua franca of AI engineering.",
    difficulty: "beginner",
    iconKey: "code",
    modules: [],
  },
  {
    slug: "mathematics",
    name: "Mathematics",
    description: "Linear algebra, calculus, probability, statistics.",
    difficulty: "intermediate",
    iconKey: "sigma",
    modules: [],
  },
  {
    slug: "sql",
    name: "SQL",
    description: "Query, model, and reason about data.",
    difficulty: "beginner",
    iconKey: "database",
    modules: [],
  },
  {
    slug: "git",
    name: "Git & GitHub",
    description: "Version control, collaboration, and workflows.",
    difficulty: "beginner",
    iconKey: "git",
    modules: [],
  },
  {
    slug: "linux",
    name: "Linux",
    description: "Shell, filesystems, processes, networking.",
    difficulty: "beginner",
    iconKey: "terminal",
    modules: [],
  },
  {
    slug: "docker",
    name: "Docker",
    description: "Containerize models and services.",
    difficulty: "intermediate",
    iconKey: "container",
    modules: [],
  },
  {
    slug: "kubernetes",
    name: "Kubernetes",
    description: "Orchestrate AI workloads at scale.",
    difficulty: "advanced",
    iconKey: "cluster",
    modules: [],
  },
  {
    slug: "machine-learning",
    name: "Machine Learning",
    description: "Classical ML from first principles.",
    difficulty: "intermediate",
    iconKey: "brain",
    modules: [],
  },
  {
    slug: "deep-learning",
    name: "Deep Learning",
    description: "Neural networks, optimization, transformers.",
    difficulty: "advanced",
    iconKey: "layers",
    modules: [],
  },
  {
    slug: "nlp",
    name: "Natural Language Processing",
    description: "Language modeling, embeddings, sequence tasks.",
    difficulty: "advanced",
    iconKey: "message",
    modules: [],
  },
  {
    slug: "computer-vision",
    name: "Computer Vision",
    description: "Images, video, and multimodal perception.",
    difficulty: "advanced",
    iconKey: "eye",
    modules: [],
  },
  {
    slug: "generative-ai",
    name: "Generative AI",
    description: "LLMs, diffusion, multimodal generation.",
    difficulty: "advanced",
    iconKey: "sparkles",
    modules: [],
  },
  {
    slug: "prompt-engineering",
    name: "Prompt Engineering",
    description: "Reliable, evaluable prompts for LLM systems.",
    difficulty: "intermediate",
    iconKey: "wand",
    modules: [],
  },
  {
    slug: "rag",
    name: "RAG",
    description: "Retrieval-augmented generation, end to end.",
    difficulty: "advanced",
    iconKey: "search",
    modules: [],
  },
  {
    slug: "mcp",
    name: "MCP",
    description: "Model Context Protocol for tool-using systems.",
    difficulty: "advanced",
    iconKey: "plug",
    modules: [],
  },
  {
    slug: "ai-agents",
    name: "AI Agents",
    description: "Planning, tools, memory, and control loops.",
    difficulty: "advanced",
    iconKey: "bot",
    modules: [],
  },
  {
    slug: "agentic-ai",
    name: "Agentic AI",
    description: "Multi-agent systems and orchestration.",
    difficulty: "expert",
    iconKey: "network",
    modules: [],
  },
  {
    slug: "mlops",
    name: "MLOps",
    description: "Ship models to production reliably.",
    difficulty: "advanced",
    iconKey: "rocket",
    modules: [],
  },
  {
    slug: "llmops",
    name: "LLMOps",
    description: "Operate LLM systems at scale.",
    difficulty: "expert",
    iconKey: "server",
    modules: [],
  },
  {
    slug: "cloud",
    name: "Cloud",
    description: "AWS, GCP, Azure fundamentals for AI.",
    difficulty: "intermediate",
    iconKey: "cloud",
    modules: [],
  },
];

export const learningCategoriesBySlug: Record<string, LearningCategoryDefinition> =
  Object.fromEntries(learningCategoryList.map((c) => [c.slug, c]));

export function getCategory(slug: string) {
  return learningCategoriesBySlug[slug];
}

export function getModule(categorySlug: string, moduleSlug: string) {
  return getCategory(categorySlug)?.modules.find((m) => m.slug === moduleSlug);
}

// Dependency graph — declarative. Add nodes/edges to grow the map.
export const dependencyNodes: DependencyNode[] = [
  { slug: "python", label: "Python", categorySlug: "python" },
  { slug: "numpy", label: "NumPy", categorySlug: "python" },
  { slug: "pandas", label: "Pandas", categorySlug: "python" },
  { slug: "visualization", label: "Visualization", categorySlug: "python" },
  { slug: "machine-learning", label: "Machine Learning", categorySlug: "machine-learning" },
  { slug: "deep-learning", label: "Deep Learning", categorySlug: "deep-learning" },
  { slug: "generative-ai", label: "Generative AI", categorySlug: "generative-ai" },
  { slug: "ai-agents", label: "AI Agents", categorySlug: "ai-agents" },
  { slug: "mlops", label: "MLOps", categorySlug: "mlops" },
  { slug: "llmops", label: "LLMOps", categorySlug: "llmops" },
];

export const dependencyEdges: DependencyEdge[] = [
  { from: "python", to: "numpy" },
  { from: "numpy", to: "pandas" },
  { from: "pandas", to: "visualization" },
  { from: "visualization", to: "machine-learning" },
  { from: "machine-learning", to: "deep-learning" },
  { from: "deep-learning", to: "generative-ai" },
  { from: "generative-ai", to: "ai-agents" },
  { from: "ai-agents", to: "mlops" },
  { from: "mlops", to: "llmops" },
];