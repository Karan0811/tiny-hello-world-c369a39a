# Data Models

Domain types currently defined in the codebase. Every type below is the *only* declaration of that shape — features import from these files rather than re-declaring.

---

## Learning

Source: [`src/features/learning/types.ts`](../src/features/learning/types.ts)

| Type | Purpose |
|---|---|
| `Difficulty` | `beginner \| intermediate \| advanced \| expert` |
| `ModuleStatus` | `not-started \| in-progress \| completed \| locked \| unlocked` |
| `LearningMode` | `learn \| practice \| build` |
| `ResourceKind` | `docs \| videos \| articles \| books \| papers \| github \| datasets` |
| `ResourceRef` | `{ kind, title, url?, note? }` |
| `PrerequisiteRef` | `{ categorySlug, moduleSlug?, strength }` |
| `LessonRef` | `{ slug, title, summary?, estimatedMinutes?, status? }` |
| `QuizQuestion` | `{ id, prompt, choices?, answer? }` |
| `InterviewQuestion` | `{ id, prompt, difficulty? }` |
| `ModuleDefinition` | Full module: metadata, lessons, resources, projects, quiz, revision, interview, notes |
| `LearningCategoryDefinition` | Top-level track: metadata + modules |
| `DependencyNode` / `DependencyEdge` | Graph for prerequisites and journey |
| `LearningProgress` | Per-user metrics (completion, lessons, practice, projects, revision, interview) |

## Roadmap

Source: [`src/features/roadmap/types.ts`](../src/features/roadmap/types.ts)

Tracks group nodes; nodes reference `LearningCategoryDefinition.slug` for deep linking.

## Projects

Source: [`src/features/projects/types.ts`](../src/features/projects/types.ts)

| Type | Purpose |
|---|---|
| `ProjectCategory` | Grouping (Python, Data Analysis, ML, …) |
| `ProjectLevel` | `beginner \| intermediate \| advanced \| production \| capstone` |
| `ProjectDefinition` | Slug, title, summary, category, level, tags, duration, tabs |
| `ProjectTabKey` | Tab identifiers used by the detail page |

## AI

Source: [`src/features/ai/types.ts`](../src/features/ai/types.ts)

| Type | Purpose |
|---|---|
| `AIProviderId` | `openai \| anthropic \| google \| groq \| openrouter \| ollama \| local` |
| `AIProviderStatus` | `ready \| unconfigured \| unavailable \| coming-soon` |
| `AIModelKind` | `chat \| reasoning \| embedding \| vision \| audio` |
| `AIModelDefinition` | Model metadata (context window, streaming, tools) |
| `AIProviderDefinition` | Provider metadata + models |
| `AIFeatureId` | Registered actions (explain-concept, generate-quiz, …) |
| `AISurfaceKind` | `lesson \| module \| category \| roadmap-node \| roadmap-track \| project \| task \| resource \| global` |
| `PromptTemplate` | System + user templates with typed variables |
| `AIContext` | Surface reference, selected text, learning history, profile hints |
| `ChatMessage` / `Conversation` | Chat state |
| `TokenUsage` | Cost accounting |
| `AIStreamEvent` | Streaming event union |
| `AIProviderAdapter` | The interface every adapter implements |

## Python (config, not new types)

Source: [`src/config/python.ts`](../src/config/python.ts)

- `pythonModules: ModuleDefinition[]` — 20 modules.
- `pythonProjects: PythonProjectSeed[]` — 8 project stubs.
- `pythonResources: ResourceRef[]` — resource catalog (empty until curated).
- `pythonAIActions` — subset of `AIFeatureId` wired on Python lessons.

## Future models

When Lovable Cloud is enabled, the following will be persisted:

| Model | Backing store |
|---|---|
| `UserProfile` | Cloud DB |
| `ProgressRecord` | Cloud DB |
| `ConversationRecord` | Cloud DB |
| `NoteRecord` | Cloud DB |
