# AI University

**Learn. Build. Deploy. Master AI.**

AI University is a production-grade learning platform for the full AI engineering stack — from Python and mathematics through machine learning, deep learning, generative AI, agents, and MLOps.

This repository contains the web application: a config-driven, modular architecture designed to grow to thousands of lessons without refactoring.

---

## Vision

A single home for the AI engineer's journey — structured curriculum, applied projects, career roadmaps, and an AI mentor that knows the surface you are on.

## Goals

- **Config-driven curriculum.** New content = new records in `src/config/*`. Zero UI edits.
- **Provider-agnostic AI.** Any model (OpenAI, Anthropic, Gemini, Groq, OpenRouter, Ollama, local) plugs into one adapter interface.
- **Reference vertical slices.** Each subject follows the Python template — one pattern, twenty subjects.
- **Enterprise-grade UX.** Dark-first, Linear/Vercel/Notion inspired, keyboard-first.

## Tech stack

| Layer | Choice |
|---|---|
| Framework | TanStack Start v1 (React 19 + Vite 7) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 + shadcn/ui |
| Motion | Framer Motion |
| Icons | Lucide |
| Routing | TanStack Router (file-based) |
| Backend | Lovable Cloud (opt-in, not required for foundation) |

## Architecture summary

See [ARCHITECTURE.md](./ARCHITECTURE.md) for depth.

```
Config (data)  →  Feature module (types, hooks, components)  →  Route (page)
```

Every page reads from `src/config/*`. Feature modules under `src/features/*` own domain logic. Routes are thin — they orchestrate layout and pass config to components.

## Folder structure

See [FOLDER_STRUCTURE.md](./FOLDER_STRUCTURE.md).

## Current features

| Feature | Status |
|---|---|
| Foundation (shell, sidebar, command palette, theme, routing) | ✅ |
| Learning Engine (categories, modules, lessons, sidebars, tabs) | ✅ |
| Roadmap Engine (tracks, nodes, connections) | ✅ |
| Project Engine (catalog, filters, tabs) | ✅ |
| AI Core (provider registry, prompts, context, mentor UI) | ✅ |
| Python vertical slice (reference implementation) | ✅ |
| Documentation | ✅ |

## Future roadmap

- Subject vertical slices — NumPy, Pandas, SQL, Math, ML, DL, NLP, CV, GenAI, RAG, MCP, Agents, MLOps, LLMOps, Cloud.
- Progress persistence via Lovable Cloud.
- Authenticated sessions and per-user roadmaps.
- AI provider adapters — first `openai` and `anthropic`.
- Community layer — shared notes, review, mentorship.

See [CHANGELOG.md](./CHANGELOG.md) for shipped milestones and [DECISIONS.md](./DECISIONS.md) for why the architecture looks the way it does.
