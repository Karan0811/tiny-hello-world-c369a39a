# Architecture

AI University is a config-driven React application built on TanStack Start. Every user-visible surface is derived from typed configuration in `src/config/*` and rendered by dumb components in `src/features/*`.

---

## Layers

```
┌───────────────────────────────────────────────┐
│                    Routes                     │  src/routes/*
│  Thin orchestration: load config → render UI  │
├───────────────────────────────────────────────┤
│                Feature modules                │  src/features/*
│  Types, hooks, components, providers          │
├───────────────────────────────────────────────┤
│                    Config                     │  src/config/*
│  Single source of truth per domain            │
├───────────────────────────────────────────────┤
│              UI primitives / shell            │  src/components/*
│  shadcn/ui + AppShell + shared cards          │
└───────────────────────────────────────────────┘
```

## Feature architecture

Every feature (Learning, Roadmap, Projects, AI, Python…) follows the same shape:

```
src/features/<feature>/
  types.ts            # domain types (only place they live)
  components/         # dumb, reusable UI
  <hooks or context>  # local state
  index.ts            # public barrel
```

Rules:

- Types live in the feature that owns the domain. Consumers import them; they never duplicate them.
- Components take data via props — they never call the network directly.
- Feature modules never import from `src/routes/*`.

## Config-driven philosophy

New content should be a **data change**, not a code change.

| Add… | Where |
|---|---|
| A learning category | `src/config/learning.ts` |
| A Python module | `src/config/python.ts` |
| A project | `src/config/projects.ts` |
| A roadmap node | `src/config/roadmap.ts` |
| An AI provider or prompt | `src/config/ai.ts` |
| A nav item | `src/config/navigation.ts` |

## Routing

TanStack Router file-based routing under `src/routes/`.

- `__root.tsx` — global providers, `<head>` defaults, layout shell.
- `_app.*.tsx` — pathless layout that wraps every authenticated surface with `AppShell`.
- `_app.learning.$category.$module.$lesson.tsx` — deep learning route.
- `_app.learning.python.tsx` — subject landing (reference vertical slice).

Never edit `src/routeTree.gen.ts` — it is generated.

## AI architecture

See [SYSTEM_DESIGN.md](./SYSTEM_DESIGN.md#ai-core) and [DATA_MODELS.md](./DATA_MODELS.md#ai).

```
UI  ─►  useAIMentor()  ─►  providerRegistry.get(id)  ─►  AIProviderAdapter
                                                             │
                                                             └─► OpenAI | Anthropic | Gemini | Groq | Ollama | Local
```

UI knows nothing about SDKs. Adapters implement one interface. Prompts and templates are data (`src/config/ai.ts`).

## Scalability

- **Content:** thousands of lessons/modules fit because everything is config; the render cost is per visible surface, not per record.
- **Team:** a new contributor adds a `src/features/<subject>/` folder and a `src/config/<subject>.ts` file — no cross-cutting edits.
- **Persistence:** the current architecture is memory-only. When Lovable Cloud is enabled, `useAIMentor` and progress hooks swap their in-memory store for a Cloud-backed one without touching UI.
