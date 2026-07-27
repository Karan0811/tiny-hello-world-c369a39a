# Features

Every feature currently shipped in AI University.

---

## Foundation

- Dark-first shell (`AppShell`) with collapsible sidebar and top bar.
- Command palette (`⌘K`) for navigation and actions.
- Theme provider with persisted preference.
- Global routing under TanStack Router, file-based.
- Reusable primitives: `SurfaceCard`, `StatCard`, `CategoryCard`, `EmptyState`, `PageContainer`, `PageHeader`, `PageSection`.

## Learning Engine

- Category → Module → Lesson hierarchy driven by `src/config/learning.ts`.
- Reusable components: `LearningCategoryCard`, `ModuleCard`, `LessonCard`, `LessonSidebar`, `TabbedSections`, `ResourcePanel`, `AskAIPanel`, `LearningModeSwitcher`, `PrerequisiteBadge`, `DifficultyBadge`, `DependencyGraph`, `SearchToolbar`, `ProgressCard`, `JourneyCard`.
- Module page: 8 tabs (Overview, Lessons, Practice, Projects, Resources, Notes, Revision, Interview).
- Lesson page: 11 tabs (Overview, Theory, Code, Visualization, Practice, Assignment, Mini project, Quiz, Interview, Revision, Resources) with sidebar navigation.

## Roadmap Engine

- Tracks, nodes, connections rendered by `RoadmapCanvas` / `SkillTree`.
- `NodeDetailSheet` for drill-down.
- Filter bar and journey overview components.

## Project Engine

- Config-driven catalog (`src/config/projects.ts`).
- Filters by category, level, duration.
- Detail tabs: Overview, Roadmap, Tasks, Datasets, Resources, Implementation, Testing, Deployment, Documentation, Interview, Notes.

## AI Core

- Provider registry supporting OpenAI, Anthropic, Gemini, Groq, OpenRouter, Ollama, Local.
- 13 feature actions and 10 prompt templates in `src/config/ai.ts`.
- `AIContextProvider` + `useAIContext` for surface awareness.
- `useAIMentor` for conversation state.
- Reusable UI: `AIMentorPanel`, `ChatMessage`, `PromptSuggestionCard`, `AIContextCard`, `ConversationSidebar`, `ProviderStatus`, `TokenUsageCard`, `ResponseCard`, `ThinkingIndicator`, `ConversationHeader`.

## Python Module (reference vertical slice)

- Landing at `/learning/python` with overview, journey, module grid, projects preview, revision, resources, and AI entry point.
- 20 modules in `src/config/python.ts`.
- 8 project stubs.
- Components: `PythonModuleCard`, `PythonLessonCard`, `PythonProgressPanel`, `PythonJourney`, `PythonSidebar`, `PythonResourcePanel`, `PythonProjectPanel`, `PythonRevisionPanel`, `PythonInterviewPanel`.
- Every lesson integrates the AI Core via `AskAIPanel` and the shared feature actions.
