// Central AI config. Add providers, actions, and templates by appending
// records here — no UI component edits required.

import type {
  AIActionDefinition,
  AIProviderDefinition,
  PromptTemplate,
} from "@/features/ai/types";

export const aiProviderList: AIProviderDefinition[] = [
  {
    id: "openai",
    name: "OpenAI",
    description: "GPT family — chat, reasoning, vision.",
    status: "coming-soon",
    iconKey: "openai",
    docsUrl: "https://platform.openai.com/docs",
    requiresApiKey: true,
    supportsStreaming: true,
    supportsLocal: false,
    models: [],
  },
  {
    id: "anthropic",
    name: "Anthropic",
    description: "Claude models with long context.",
    status: "coming-soon",
    iconKey: "anthropic",
    requiresApiKey: true,
    supportsStreaming: true,
    supportsLocal: false,
    models: [],
  },
  {
    id: "google",
    name: "Google Gemini",
    description: "Gemini multimodal models.",
    status: "coming-soon",
    iconKey: "google",
    requiresApiKey: true,
    supportsStreaming: true,
    supportsLocal: false,
    models: [],
  },
  {
    id: "groq",
    name: "Groq",
    description: "Ultra-low-latency inference.",
    status: "coming-soon",
    iconKey: "groq",
    requiresApiKey: true,
    supportsStreaming: true,
    supportsLocal: false,
    models: [],
  },
  {
    id: "openrouter",
    name: "OpenRouter",
    description: "Unified access to many providers.",
    status: "coming-soon",
    iconKey: "openrouter",
    requiresApiKey: true,
    supportsStreaming: true,
    supportsLocal: false,
    models: [],
  },
  {
    id: "ollama",
    name: "Ollama",
    description: "Run open models locally.",
    status: "coming-soon",
    iconKey: "ollama",
    requiresApiKey: false,
    supportsStreaming: true,
    supportsLocal: true,
    models: [],
  },
  {
    id: "local",
    name: "Local Models",
    description: "Custom self-hosted endpoints.",
    status: "coming-soon",
    iconKey: "cpu",
    requiresApiKey: false,
    supportsStreaming: true,
    supportsLocal: true,
    models: [],
  },
];

export const aiProvidersById: Record<string, AIProviderDefinition> =
  Object.fromEntries(aiProviderList.map((p) => [p.id, p]));

export const aiActionList: AIActionDefinition[] = [
  {
    id: "explain-concept",
    label: "Explain Concept",
    description: "Walk through the idea from first principles.",
    iconKey: "lightbulb",
    defaultTemplateId: "explain",
    surfaces: ["lesson", "module", "category", "roadmap-node"],
  },
  {
    id: "answer-question",
    label: "Answer Question",
    description: "Ask anything about the current context.",
    iconKey: "message",
    defaultTemplateId: "explain",
    surfaces: ["lesson", "module", "project", "roadmap-node", "global"],
  },
  {
    id: "generate-quiz",
    label: "Generate Quiz",
    description: "Comprehension checks for this material.",
    iconKey: "check",
    defaultTemplateId: "generate-quiz",
    surfaces: ["lesson", "module"],
  },
  {
    id: "generate-flashcards",
    label: "Generate Flashcards",
    description: "Spaced-repetition ready cards.",
    iconKey: "layers",
    defaultTemplateId: "summarize",
    surfaces: ["lesson", "module"],
  },
  {
    id: "summarize-lesson",
    label: "Summarize Lesson",
    description: "Tight summary of key ideas.",
    iconKey: "align",
    defaultTemplateId: "summarize",
    surfaces: ["lesson", "module"],
  },
  {
    id: "explain-code",
    label: "Explain Code",
    description: "Line-by-line walkthrough.",
    iconKey: "code",
    defaultTemplateId: "review-code",
    surfaces: ["lesson", "project", "task"],
  },
  {
    id: "review-project",
    label: "Review Project",
    description: "Architectural and quality review.",
    iconKey: "clipboard",
    defaultTemplateId: "review-code",
    surfaces: ["project"],
  },
  {
    id: "review-resume",
    label: "Review Resume",
    description: "Feedback on your resume.",
    iconKey: "file",
    defaultTemplateId: "career-advice",
    surfaces: ["global"],
  },
  {
    id: "generate-interview-questions",
    label: "Generate Interview Questions",
    description: "Practice questions on the topic.",
    iconKey: "brief",
    defaultTemplateId: "generate-quiz",
    surfaces: ["lesson", "module", "category", "project"],
  },
  {
    id: "suggest-next-topic",
    label: "Suggest Next Topic",
    description: "What to learn next.",
    iconKey: "arrow-right",
    defaultTemplateId: "career-advice",
    surfaces: ["lesson", "module", "roadmap-node", "global"],
  },
  {
    id: "generate-revision-notes",
    label: "Generate Revision Notes",
    description: "Compact notes for review.",
    iconKey: "notebook",
    defaultTemplateId: "summarize",
    surfaces: ["lesson", "module"],
  },
  {
    id: "project-feedback",
    label: "Project Feedback",
    description: "Constructive feedback on your build.",
    iconKey: "message",
    defaultTemplateId: "review-code",
    surfaces: ["project", "task"],
  },
  {
    id: "learning-recommendations",
    label: "Learning Recommendations",
    description: "Personalized next steps.",
    iconKey: "compass",
    defaultTemplateId: "career-advice",
    surfaces: ["global", "roadmap-track"],
  },
];

export const aiActionsById: Record<string, AIActionDefinition> =
  Object.fromEntries(aiActionList.map((a) => [a.id, a]));

export const promptTemplateList: PromptTemplate[] = [
  {
    id: "explain",
    label: "Explain",
    description: "Explain a concept clearly.",
    iconKey: "lightbulb",
    system:
      "You are an AI mentor for AI University. Explain concepts precisely with intuition, formalism, and a concrete example.",
    user: "Explain {{topic}} in the context of {{context}}.",
    variables: [
      { key: "topic", label: "Topic", required: true },
      { key: "context", label: "Context" },
    ],
  },
  {
    id: "simplify",
    label: "Simplify",
    description: "Explain like I'm new to this.",
    iconKey: "sparkles",
    system: "Simplify complex ideas without losing correctness.",
    user: "Simplify {{topic}} for a {{level}} learner.",
    variables: [
      { key: "topic", label: "Topic", required: true },
      { key: "level", label: "Level" },
    ],
  },
  {
    id: "give-example",
    label: "Give Example",
    description: "Show a concrete, runnable example.",
    iconKey: "code",
    system: "Provide minimal, correct, runnable examples.",
    user: "Give a concrete example of {{topic}}.",
    variables: [{ key: "topic", label: "Topic", required: true }],
  },
  {
    id: "generate-quiz",
    label: "Generate Quiz",
    description: "Produce comprehension questions.",
    iconKey: "check",
    system: "Generate high-signal quiz questions with answers.",
    user: "Create a {{count}}-question quiz on {{topic}}.",
    variables: [
      { key: "topic", label: "Topic", required: true },
      { key: "count", label: "Question count" },
    ],
  },
  {
    id: "generate-project",
    label: "Generate Project",
    description: "Design a hands-on project brief.",
    iconKey: "rocket",
    system: "Design pragmatic, portfolio-worthy project briefs.",
    user: "Propose a project that applies {{topic}} at a {{level}} level.",
    variables: [
      { key: "topic", label: "Topic", required: true },
      { key: "level", label: "Level" },
    ],
  },
  {
    id: "review-code",
    label: "Review Code",
    description: "Critique and improve code.",
    iconKey: "clipboard",
    system: "Review code for correctness, clarity, and idiomatic style.",
    user: "Review this code:\n\n{{code}}",
    variables: [{ key: "code", label: "Code", required: true }],
  },
  {
    id: "explain-error",
    label: "Explain Error",
    description: "Diagnose an error message.",
    iconKey: "alert",
    system: "Diagnose errors and propose the smallest fix.",
    user: "Explain this error and how to fix it:\n\n{{error}}",
    variables: [{ key: "error", label: "Error", required: true }],
  },
  {
    id: "summarize",
    label: "Summarize",
    description: "Tight summary of the content.",
    iconKey: "align",
    system: "Summarize accurately, preserving key details.",
    user: "Summarize {{topic}} in {{style}} style.",
    variables: [
      { key: "topic", label: "Topic", required: true },
      { key: "style", label: "Style" },
    ],
  },
  {
    id: "compare",
    label: "Compare",
    description: "Compare two concepts or approaches.",
    iconKey: "columns",
    system: "Compare fairly with trade-offs.",
    user: "Compare {{a}} vs {{b}} for {{use_case}}.",
    variables: [
      { key: "a", label: "A", required: true },
      { key: "b", label: "B", required: true },
      { key: "use_case", label: "Use case" },
    ],
  },
  {
    id: "career-advice",
    label: "Career Advice",
    description: "Guidance on skills, roles, and next steps.",
    iconKey: "compass",
    system: "Give grounded, specific AI-career advice.",
    user: "Given my context, advise on {{question}}.",
    variables: [{ key: "question", label: "Question", required: true }],
  },
];

export const promptTemplatesById: Record<string, PromptTemplate> =
  Object.fromEntries(promptTemplateList.map((t) => [t.id, t]));

export function getActionsForSurface(surface: string) {
  return aiActionList.filter((a) => a.surfaces.includes(surface as never));
}
