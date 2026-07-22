// Roadmap taxonomy. Every track, node, skill-tree branch, career path, and
// checkpoint is declared here. UI reads through this config only — add a
// record and it renders automatically.

import type {
  CareerPath,
  Checkpoint,
  RoadmapTrack,
  SkillTreeNode,
} from "@/features/roadmap/types";

// ---------------------------------------------------------------------------
// Tracks
// ---------------------------------------------------------------------------

export const roadmapTracks: RoadmapTrack[] = [
  {
    slug: "ai-foundations",
    title: "AI Foundations",
    description:
      "Programming, mathematics, data literacy, and the tooling every AI engineer relies on.",
    estimatedDuration: "8–12 weeks",
    difficulty: "beginner",
    prerequisites: [],
    skillsGained: ["Python", "Git", "Linux", "SQL", "Math for AI"],
    careerOutcome: "Ready to specialize in ML, DL, or GenAI tracks.",
    status: "recommended",
    iconKey: "code",
    accent: "from-sky-500/20 to-transparent",
    nodes: [
      {
        id: "foundations.python",
        title: "Python",
        description: "Language fundamentals, data structures, standard library.",
        category: "python",
        difficulty: "beginner",
        status: "not-started",
        kind: "milestone",
        learningRefs: [{ categorySlug: "python" }],
        next: ["foundations.math"],
        branches: ["foundations.sql", "foundations.linux"],
      },
      {
        id: "foundations.math",
        title: "Mathematics",
        description: "Linear algebra, calculus, probability, statistics.",
        category: "mathematics",
        difficulty: "intermediate",
        status: "not-started",
        kind: "milestone",
        learningRefs: [{ categorySlug: "mathematics" }],
        next: ["foundations.checkpoint"],
      },
      {
        id: "foundations.sql",
        title: "SQL",
        category: "sql",
        difficulty: "beginner",
        status: "not-started",
        kind: "module",
        learningRefs: [{ categorySlug: "sql" }],
      },
      {
        id: "foundations.linux",
        title: "Linux & Shell",
        category: "linux",
        difficulty: "beginner",
        status: "not-started",
        kind: "module",
        learningRefs: [{ categorySlug: "linux" }],
      },
      {
        id: "foundations.checkpoint",
        title: "Foundations Checkpoint",
        description: "Confirm readiness to enter specialization tracks.",
        difficulty: "beginner",
        status: "future",
        kind: "checkpoint",
      },
    ],
  },
  {
    slug: "machine-learning-engineer",
    title: "Machine Learning Engineer",
    description: "Classical ML end-to-end: modeling, evaluation, and deployment.",
    estimatedDuration: "10–14 weeks",
    difficulty: "intermediate",
    prerequisites: ["ai-foundations"],
    skillsGained: ["Supervised ML", "Feature engineering", "Model evaluation"],
    careerOutcome: "ML Engineer roles building predictive systems.",
    status: "locked",
    iconKey: "brain",
    accent: "from-emerald-500/20 to-transparent",
    nodes: [
      {
        id: "ml.core",
        title: "Machine Learning Core",
        category: "machine-learning",
        difficulty: "intermediate",
        status: "locked",
        kind: "milestone",
        learningRefs: [{ categorySlug: "machine-learning" }],
        next: ["ml.evaluation"],
      },
      {
        id: "ml.evaluation",
        title: "Evaluation & Validation",
        difficulty: "intermediate",
        status: "locked",
        kind: "module",
        next: ["ml.checkpoint"],
      },
      {
        id: "ml.checkpoint",
        title: "ML Engineer Checkpoint",
        difficulty: "intermediate",
        status: "future",
        kind: "checkpoint",
      },
    ],
  },
  {
    slug: "deep-learning-engineer",
    title: "Deep Learning Engineer",
    description: "Neural networks, optimization, and modern architectures.",
    estimatedDuration: "10–14 weeks",
    difficulty: "advanced",
    prerequisites: ["machine-learning-engineer"],
    skillsGained: ["PyTorch", "CNNs", "Transformers", "Training loops"],
    careerOutcome: "Deep Learning Engineer / Research Engineer.",
    status: "locked",
    iconKey: "layers",
    accent: "from-violet-500/20 to-transparent",
    nodes: [
      {
        id: "dl.core",
        title: "Deep Learning Core",
        category: "deep-learning",
        difficulty: "advanced",
        status: "locked",
        kind: "milestone",
        learningRefs: [{ categorySlug: "deep-learning" }],
        next: ["dl.nlp", "dl.cv"],
      },
      {
        id: "dl.nlp",
        title: "NLP",
        category: "nlp",
        difficulty: "advanced",
        status: "locked",
        kind: "module",
        learningRefs: [{ categorySlug: "nlp" }],
      },
      {
        id: "dl.cv",
        title: "Computer Vision",
        category: "computer-vision",
        difficulty: "advanced",
        status: "locked",
        kind: "module",
        learningRefs: [{ categorySlug: "computer-vision" }],
      },
    ],
  },
  {
    slug: "generative-ai-engineer",
    title: "Generative AI Engineer",
    description: "LLMs, prompting, RAG, and multimodal generative systems.",
    estimatedDuration: "8–12 weeks",
    difficulty: "advanced",
    prerequisites: ["deep-learning-engineer"],
    skillsGained: ["LLMs", "Prompting", "RAG", "Evaluation"],
    careerOutcome: "GenAI Engineer building LLM-powered products.",
    status: "locked",
    iconKey: "sparkles",
    accent: "from-fuchsia-500/20 to-transparent",
    nodes: [
      {
        id: "genai.core",
        title: "Generative AI Core",
        category: "generative-ai",
        difficulty: "advanced",
        status: "locked",
        kind: "milestone",
        learningRefs: [{ categorySlug: "generative-ai" }],
        next: ["genai.prompt", "genai.rag"],
      },
      {
        id: "genai.prompt",
        title: "Prompt Engineering",
        category: "prompt-engineering",
        difficulty: "intermediate",
        status: "locked",
        kind: "module",
        learningRefs: [{ categorySlug: "prompt-engineering" }],
      },
      {
        id: "genai.rag",
        title: "Retrieval-Augmented Generation",
        category: "rag",
        difficulty: "advanced",
        status: "locked",
        kind: "module",
        learningRefs: [{ categorySlug: "rag" }],
      },
    ],
  },
  {
    slug: "agentic-ai-engineer",
    title: "Agentic AI Engineer",
    description: "Tool-using agents, planning, memory, and multi-agent orchestration.",
    estimatedDuration: "8–10 weeks",
    difficulty: "expert",
    prerequisites: ["generative-ai-engineer"],
    skillsGained: ["Agents", "Tool use", "MCP", "Orchestration"],
    careerOutcome: "Agentic AI Engineer designing autonomous systems.",
    status: "locked",
    iconKey: "bot",
    accent: "from-amber-500/20 to-transparent",
    nodes: [
      {
        id: "agents.core",
        title: "AI Agents Core",
        category: "ai-agents",
        difficulty: "advanced",
        status: "locked",
        kind: "milestone",
        learningRefs: [{ categorySlug: "ai-agents" }],
        next: ["agents.mcp", "agents.multi"],
      },
      {
        id: "agents.mcp",
        title: "Model Context Protocol",
        category: "mcp",
        difficulty: "advanced",
        status: "locked",
        kind: "module",
        learningRefs: [{ categorySlug: "mcp" }],
      },
      {
        id: "agents.multi",
        title: "Multi-Agent Systems",
        category: "agentic-ai",
        difficulty: "expert",
        status: "locked",
        kind: "module",
        learningRefs: [{ categorySlug: "agentic-ai" }],
      },
    ],
  },
  {
    slug: "mlops-engineer",
    title: "MLOps Engineer",
    description: "Reliable training pipelines, deployments, and model operations.",
    estimatedDuration: "8–12 weeks",
    difficulty: "advanced",
    prerequisites: ["machine-learning-engineer"],
    skillsGained: ["Docker", "CI/CD", "Monitoring", "Feature stores"],
    careerOutcome: "MLOps Engineer running production ML platforms.",
    status: "locked",
    iconKey: "rocket",
    accent: "from-cyan-500/20 to-transparent",
    nodes: [
      {
        id: "mlops.core",
        title: "MLOps Core",
        category: "mlops",
        difficulty: "advanced",
        status: "locked",
        kind: "milestone",
        learningRefs: [{ categorySlug: "mlops" }],
        next: ["mlops.docker", "mlops.k8s"],
      },
      {
        id: "mlops.docker",
        title: "Docker",
        category: "docker",
        difficulty: "intermediate",
        status: "locked",
        kind: "module",
        learningRefs: [{ categorySlug: "docker" }],
      },
      {
        id: "mlops.k8s",
        title: "Kubernetes",
        category: "kubernetes",
        difficulty: "advanced",
        status: "locked",
        kind: "module",
        learningRefs: [{ categorySlug: "kubernetes" }],
      },
    ],
  },
  {
    slug: "llmops-engineer",
    title: "LLMOps Engineer",
    description: "Operating LLM systems: evaluation, guardrails, cost, and scale.",
    estimatedDuration: "6–10 weeks",
    difficulty: "expert",
    prerequisites: ["generative-ai-engineer", "mlops-engineer"],
    skillsGained: ["LLM eval", "Observability", "Guardrails", "Serving"],
    careerOutcome: "LLMOps Engineer running LLM platforms in production.",
    status: "locked",
    iconKey: "server",
    accent: "from-rose-500/20 to-transparent",
    nodes: [
      {
        id: "llmops.core",
        title: "LLMOps Core",
        category: "llmops",
        difficulty: "expert",
        status: "locked",
        kind: "milestone",
        learningRefs: [{ categorySlug: "llmops" }],
      },
    ],
  },
  {
    slug: "production-ai-engineer",
    title: "Production AI Engineer",
    description: "End-to-end AI systems in production: reliability, cost, and scale.",
    estimatedDuration: "10–14 weeks",
    difficulty: "expert",
    prerequisites: ["mlops-engineer", "llmops-engineer"],
    skillsGained: ["System design", "Reliability", "Cost optimization"],
    careerOutcome: "Senior/Staff AI Engineer building platforms end-to-end.",
    status: "locked",
    iconKey: "cloud",
    accent: "from-indigo-500/20 to-transparent",
    nodes: [
      {
        id: "prod.systems",
        title: "AI Systems Design",
        difficulty: "expert",
        status: "locked",
        kind: "milestone",
      },
      {
        id: "prod.cloud",
        title: "Cloud for AI",
        category: "cloud",
        difficulty: "intermediate",
        status: "locked",
        kind: "module",
        learningRefs: [{ categorySlug: "cloud" }],
      },
    ],
  },
];

export const roadmapTracksBySlug: Record<string, RoadmapTrack> = Object.fromEntries(
  roadmapTracks.map((t) => [t.slug, t]),
);

// ---------------------------------------------------------------------------
// Skill Tree
// ---------------------------------------------------------------------------

export const skillTree: SkillTreeNode = {
  id: "root",
  label: "Programming",
  categorySlug: "python",
  children: [
    {
      id: "python",
      label: "Python",
      categorySlug: "python",
      children: [
        {
          id: "numpy",
          label: "NumPy",
          categorySlug: "python",
          children: [
            {
              id: "pandas",
              label: "Pandas",
              categorySlug: "python",
              children: [
                {
                  id: "ml",
                  label: "Machine Learning",
                  categorySlug: "machine-learning",
                  children: [
                    {
                      id: "dl",
                      label: "Deep Learning",
                      categorySlug: "deep-learning",
                      children: [
                        {
                          id: "genai",
                          label: "Generative AI",
                          categorySlug: "generative-ai",
                          children: [
                            {
                              id: "agents",
                              label: "AI Agents",
                              categorySlug: "ai-agents",
                              children: [
                                {
                                  id: "mlops",
                                  label: "MLOps",
                                  categorySlug: "mlops",
                                  children: [
                                    {
                                      id: "llmops",
                                      label: "LLMOps",
                                      categorySlug: "llmops",
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// Career Paths
// ---------------------------------------------------------------------------

export const careerPaths: CareerPath[] = [
  {
    slug: "ml-engineer",
    role: "Machine Learning Engineer",
    summary: "Build and ship predictive ML systems.",
    requiredSkills: ["Python", "ML", "SQL"],
    projectRefs: [],
    portfolioFocus: ["Predictive models", "Feature pipelines"],
    interviewTopics: ["ML fundamentals", "System design"],
    trackSlugs: ["ai-foundations", "machine-learning-engineer"],
  },
  {
    slug: "dl-engineer",
    role: "Deep Learning Engineer",
    summary: "Design and train neural architectures.",
    requiredSkills: ["PyTorch", "DL", "Math"],
    projectRefs: [],
    portfolioFocus: ["Model architectures", "Training pipelines"],
    interviewTopics: ["DL", "Optimization"],
    trackSlugs: ["deep-learning-engineer"],
  },
  {
    slug: "genai-engineer",
    role: "Generative AI Engineer",
    summary: "Ship LLM-powered products.",
    requiredSkills: ["LLMs", "Prompting", "RAG"],
    projectRefs: [],
    portfolioFocus: ["RAG apps", "LLM evaluation"],
    interviewTopics: ["GenAI", "Retrieval"],
    trackSlugs: ["generative-ai-engineer"],
  },
  {
    slug: "agentic-engineer",
    role: "Agentic AI Engineer",
    summary: "Design tool-using autonomous systems.",
    requiredSkills: ["Agents", "MCP", "Orchestration"],
    projectRefs: [],
    portfolioFocus: ["Agent frameworks", "Tool integrations"],
    interviewTopics: ["Agents", "System design"],
    trackSlugs: ["agentic-ai-engineer"],
  },
  {
    slug: "mlops-engineer",
    role: "MLOps Engineer",
    summary: "Operate ML systems in production.",
    requiredSkills: ["Docker", "K8s", "CI/CD"],
    projectRefs: [],
    portfolioFocus: ["Training pipelines", "Monitoring stacks"],
    interviewTopics: ["MLOps", "Reliability"],
    trackSlugs: ["mlops-engineer"],
  },
  {
    slug: "llmops-engineer",
    role: "LLMOps Engineer",
    summary: "Run LLM platforms with evaluation and guardrails.",
    requiredSkills: ["LLM eval", "Serving", "Observability"],
    projectRefs: [],
    portfolioFocus: ["Eval harnesses", "Guardrails"],
    interviewTopics: ["LLMOps", "Cost & scale"],
    trackSlugs: ["llmops-engineer"],
  },
];

// ---------------------------------------------------------------------------
// Checkpoint templates
// ---------------------------------------------------------------------------

export const checkpointTemplates: Checkpoint[] = [
  { id: "cp.modules", kind: "modules", title: "Modules Completed" },
  { id: "cp.projects", kind: "projects", title: "Projects Shipped" },
  { id: "cp.revision", kind: "revision", title: "Revision & Recall" },
  { id: "cp.interview", kind: "interview", title: "Interview Readiness" },
  { id: "cp.practice", kind: "practice", title: "Practice Sets" },
  { id: "cp.certification", kind: "certification", title: "Certification" },
];
