// Central domain taxonomy. Extend these arrays to grow the platform —
// pages consume them directly so new categories/tiers appear without edits.

export type LearningCategory = {
  slug: string;
  name: string;
  tagline: string;
};

export const learningCategories: LearningCategory[] = [
  { slug: "python", name: "Python", tagline: "Foundations of AI programming" },
  { slug: "math", name: "Mathematics", tagline: "Linear algebra, calculus, stats" },
  { slug: "machine-learning", name: "Machine Learning", tagline: "Classical ML from first principles" },
  { slug: "deep-learning", name: "Deep Learning", tagline: "Neural networks, transformers" },
  { slug: "generative-ai", name: "Generative AI", tagline: "LLMs, diffusion, multimodal" },
  { slug: "agentic-ai", name: "Agentic AI", tagline: "Agents, tools, orchestration" },
  { slug: "mlops", name: "MLOps", tagline: "Ship models to production" },
  { slug: "llmops", name: "LLMOps", tagline: "Operate LLM systems at scale" },
];

export type ProjectTier = {
  slug: "beginner" | "intermediate" | "advanced" | "production";
  name: string;
  description: string;
};

export const projectTiers: ProjectTier[] = [
  { slug: "beginner", name: "Beginner", description: "First steps in AI engineering" },
  { slug: "intermediate", name: "Intermediate", description: "Real applications, real data" },
  { slug: "advanced", name: "Advanced", description: "End-to-end AI systems" },
  { slug: "production", name: "Production", description: "Scale, reliability, MLOps" },
];

export type ResourceCategory = {
  slug: string;
  name: string;
  description: string;
};

export const resourceCategories: ResourceCategory[] = [
  { slug: "books", name: "Books", description: "Deep, canonical references" },
  { slug: "courses", name: "Courses", description: "Structured programs" },
  { slug: "videos", name: "Videos", description: "Talks, lectures, walkthroughs" },
  { slug: "blogs", name: "Blogs", description: "Practitioner writing" },
  { slug: "docs", name: "Official Documentation", description: "Primary sources" },
  { slug: "papers", name: "Research Papers", description: "Frontier research" },
  { slug: "datasets", name: "Datasets", description: "Training & evaluation data" },
  { slug: "github", name: "GitHub Repositories", description: "Reference implementations" },
];

export type InterviewCategory = {
  slug: string;
  name: string;
};

export const interviewCategories: InterviewCategory[] = [
  { slug: "python", name: "Python" },
  { slug: "sql", name: "SQL" },
  { slug: "machine-learning", name: "Machine Learning" },
  { slug: "deep-learning", name: "Deep Learning" },
  { slug: "genai", name: "Generative AI" },
  { slug: "mlops", name: "MLOps" },
  { slug: "system-design", name: "System Design" },
  { slug: "behavioral", name: "Behavioral" },
];

export type ProgressPillar = {
  slug: string;
  name: string;
  description: string;
};

export const progressPillars: ProgressPillar[] = [
  { slug: "hours", name: "Learning hours", description: "Deep-work time invested" },
  { slug: "modules", name: "Completed modules", description: "Lessons finished across tracks" },
  { slug: "projects", name: "Projects shipped", description: "Applied builds and deployments" },
  { slug: "achievements", name: "Achievements", description: "Milestones unlocked" },
  { slug: "revision", name: "Revision", description: "Spaced repetition & recall" },
];

export const roadmapPhases: { slug: string; name: string; topics: string[] }[] = [
  {
    slug: "foundations",
    name: "Foundations",
    topics: ["Python", "Git & GitHub", "Linux", "SQL"],
  },
  {
    slug: "math",
    name: "Mathematics for AI",
    topics: ["Linear Algebra", "Calculus", "Probability", "Statistics"],
  },
  {
    slug: "core-ml",
    name: "Core ML",
    topics: ["Machine Learning", "Deep Learning", "NLP", "Computer Vision"],
  },
  {
    slug: "genai",
    name: "Generative & Agentic AI",
    topics: ["Generative AI", "Prompt Engineering", "RAG", "MCP", "AI Agents", "Agentic AI"],
  },
  {
    slug: "production",
    name: "Production AI",
    topics: ["Docker", "Kubernetes", "Cloud", "MLOps", "LLMOps", "Production AI Systems"],
  },
];