// AI Core types. Architecture-only — no API calls, no persistence.
// Every UI surface, provider adapter, and future backend consumes these.

export type AIProviderId =
  | "openai"
  | "anthropic"
  | "google"
  | "groq"
  | "openrouter"
  | "ollama"
  | "local";

export type AIProviderStatus = "ready" | "unconfigured" | "unavailable" | "coming-soon";

export type AIModelKind = "chat" | "reasoning" | "embedding" | "vision" | "audio";

export type AIModelDefinition = {
  id: string;
  label: string;
  kind: AIModelKind;
  contextWindow?: number;
  supportsStreaming?: boolean;
  supportsTools?: boolean;
  notes?: string;
};

export type AIProviderDefinition = {
  id: AIProviderId;
  name: string;
  description: string;
  status: AIProviderStatus;
  iconKey: string;
  docsUrl?: string;
  requiresApiKey: boolean;
  supportsStreaming: boolean;
  supportsLocal: boolean;
  models: AIModelDefinition[];
};

export type AIFeatureId =
  | "explain-concept"
  | "answer-question"
  | "generate-quiz"
  | "generate-flashcards"
  | "summarize-lesson"
  | "explain-code"
  | "review-project"
  | "review-resume"
  | "generate-interview-questions"
  | "suggest-next-topic"
  | "generate-revision-notes"
  | "project-feedback"
  | "learning-recommendations";

export type AISurfaceKind =
  | "lesson"
  | "module"
  | "category"
  | "roadmap-node"
  | "roadmap-track"
  | "project"
  | "task"
  | "resource"
  | "global";

export type AIActionDefinition = {
  id: AIFeatureId;
  label: string;
  description: string;
  iconKey: string;
  defaultTemplateId: PromptTemplateId;
  surfaces: AISurfaceKind[];
};

export type PromptTemplateId =
  | "explain"
  | "simplify"
  | "give-example"
  | "generate-quiz"
  | "generate-project"
  | "review-code"
  | "explain-error"
  | "summarize"
  | "compare"
  | "career-advice";

export type PromptTemplateVariable = {
  key: string;
  label: string;
  required?: boolean;
};

export type PromptTemplate = {
  id: PromptTemplateId;
  label: string;
  description: string;
  iconKey: string;
  system: string;
  user: string;
  variables: PromptTemplateVariable[];
};

export type AIContextRef = {
  surface: AISurfaceKind;
  id: string;
  title: string;
  parents?: { surface: AISurfaceKind; id: string; title: string }[];
};

export type AILearningHistoryEntry = {
  id: string;
  surface: AISurfaceKind;
  title: string;
  visitedAt?: string;
};

export type AIUserProfileHint = {
  displayName?: string;
  skillLevel?: "beginner" | "intermediate" | "advanced" | "expert";
  goals?: string[];
  preferredLanguage?: string;
};

export type AIContext = {
  ref?: AIContextRef;
  selectedText?: string;
  learningHistory?: AILearningHistoryEntry[];
  userProfile?: AIUserProfileHint;
  meta?: Record<string, string | number | boolean | undefined>;
};

export type ChatRole = "system" | "user" | "assistant" | "tool";

export type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
  createdAt?: string;
  templateId?: PromptTemplateId;
  featureId?: AIFeatureId;
  tokensIn?: number;
  tokensOut?: number;
  isStreaming?: boolean;
  error?: string;
};

export type Conversation = {
  id: string;
  title: string;
  createdAt?: string;
  updatedAt?: string;
  providerId?: AIProviderId;
  modelId?: string;
  context?: AIContext;
  messages: ChatMessage[];
};

export type TokenUsage = {
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
  estimatedCostUsd?: number;
};

export type AIStreamEvent =
  | { type: "start"; messageId: string }
  | { type: "delta"; messageId: string; delta: string }
  | { type: "tool"; messageId: string; name: string; payload?: unknown }
  | { type: "usage"; messageId: string; usage: TokenUsage }
  | { type: "done"; messageId: string }
  | { type: "error"; messageId: string; error: string };

export type AICompletionRequest = {
  providerId: AIProviderId;
  modelId: string;
  messages: ChatMessage[];
  context?: AIContext;
  templateId?: PromptTemplateId;
  featureId?: AIFeatureId;
  stream?: boolean;
  variables?: Record<string, string>;
};

export type AICompletionResult = {
  message: ChatMessage;
  usage?: TokenUsage;
};

export type AIProviderAdapter = {
  id: AIProviderId;
  isConfigured: () => boolean;
  listModels: () => AIModelDefinition[];
  complete: (req: AICompletionRequest) => Promise<AICompletionResult>;
  stream?: (
    req: AICompletionRequest,
    onEvent: (event: AIStreamEvent) => void,
  ) => Promise<AICompletionResult>;
};
