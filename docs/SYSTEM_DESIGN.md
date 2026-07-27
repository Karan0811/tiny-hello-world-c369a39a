# System Design

High-level design of AI University's domains and how they connect.

---

## Domain map

```
              ┌──────────────┐
              │   Roadmap    │──────────────┐
              └──────┬───────┘              │
                     │ suggests             │
                     ▼                      │
              ┌──────────────┐              │
              │  Learning    │◄────────┐    │
              │  (Category → │         │    │
              │   Module →   │         │    │
              │   Lesson)    │         │    │
              └──────┬───────┘         │    │
                     │ reinforced by   │    │
                     ▼                 │    │
              ┌──────────────┐         │    │
              │   Projects   │         │    │
              └──────┬───────┘         │    │
                     │                 │    │
                     ▼                 │    │
              ┌──────────────┐  context│    │
              │   AI Core    │◄────────┴────┘
              └──────────────┘
```

## Learning

- `LearningCategoryDefinition` groups `ModuleDefinition` records.
- `ModuleDefinition` groups `LessonRef` records and owns objectives, prerequisites, projects, quiz, revision, interview, notes, resources.
- The Python track is the reference implementation; every future subject mirrors its shape.

## Roadmap

- Tracks are ordered sequences of nodes (`DependencyNode` + `DependencyEdge`).
- Nodes reference `LearningCategoryDefinition.slug` so the roadmap can deep-link to any module.

## Projects

- `ProjectDefinition` records live in `src/config/projects.ts`.
- Each project is tagged with a `ProjectCategory` and a `ProjectLevel`; filters and tabs are config-driven (`projectTabs`, `durationBuckets`).

## AI Core

- `AIProviderAdapter` is the abstraction; UI never talks to SDKs directly.
- `AIContext` carries the current surface (lesson/module/project) into every request.
- Prompt templates are pure data with `{{variable}}` interpolation.
- `useAIMentor` owns a local `Conversation` today; it can be swapped for a persistent store when Cloud is enabled.

## Future — database

When Lovable Cloud is enabled, the following domain objects become tables:

| Table | Source of truth today |
|---|---|
| `progress` | in-memory |
| `conversations` | `useAIMentor` |
| `notes` | placeholder route |
| `bookmarks` | not yet |

## Future — authentication

Lovable Cloud will provide managed auth. Protected routes will live under `_authenticated/*`; server functions will use `.middleware([requireSupabaseAuth])`.
