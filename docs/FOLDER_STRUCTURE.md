# Folder Structure

Every major directory in AI University, with intent and ownership.

---

```
src/
├── components/           # Cross-cutting UI primitives
│   ├── common/           # SurfaceCard, StatCard, EmptyState, CategoryCard
│   ├── layout/           # AppShell, AppSidebar, TopBar, CommandPalette,
│   │                     # PageContainer, PageHeader, PageSection
│   └── ui/               # shadcn/ui primitives (Button, Tabs, Textarea, …)
│
├── config/               # Single source of truth for domain data
│   ├── navigation.ts     # Sidebar + command palette entries
│   ├── domain.ts         # Cross-cutting taxonomies
│   ├── learning.ts       # Categories, modules, dependency graph
│   ├── python.ts         # Python vertical slice — modules, projects, resources
│   ├── projects.ts       # Project catalog, categories, tabs, filters
│   ├── roadmap.ts        # Roadmap tracks and nodes
│   └── ai.ts             # Providers, feature actions, prompt templates
│
├── features/             # Feature modules (types + components + hooks)
│   ├── learning/         # Learning Engine
│   │   ├── types.ts
│   │   ├── icons.ts
│   │   └── components/
│   ├── python/           # Python vertical slice
│   │   └── components/   # Thin wrappers over Learning primitives
│   ├── roadmap/          # Roadmap Engine
│   ├── projects/         # Project Engine
│   └── ai/               # AI Core (providers, prompts, context, hook, UI)
│
├── hooks/                # Cross-cutting hooks (use-theme, use-mobile)
├── lib/                  # Small pure utilities (cn, error capture)
│
├── routes/               # TanStack Router file-based routes
│   ├── __root.tsx        # Global providers, head defaults
│   ├── _app.tsx          # Pathless layout wrapping the app shell
│   ├── _app.index.tsx    # Dashboard
│   ├── _app.learning.*.tsx
│   ├── _app.learning.python.tsx      # Python landing (reference slice)
│   ├── _app.roadmap.*.tsx
│   ├── _app.projects.*.tsx
│   └── … (notes, progress, interview, resources, settings)
│
├── router.tsx            # Router bootstrap
├── server.ts             # SSR entry
├── start.ts              # Client bootstrap + middleware
└── styles.css            # Tailwind v4 + theme tokens
```

## Directory contracts

| Directory | Owns | Never contains |
|---|---|---|
| `config/` | typed data | React components, side effects |
| `features/*/components/` | dumb UI | route definitions, network calls |
| `features/*/types.ts` | domain types | rendering |
| `routes/` | orchestration + `<head>` | domain logic |
| `components/common/` | reusable UI shells | domain-specific rendering |
| `components/layout/` | app shell | route-specific content |

## Adding a new subject

1. Create `src/config/<subject>.ts` (mirror `python.ts`).
2. Add its modules to the matching category in `src/config/learning.ts`.
3. Create `src/features/<subject>/components/` with thin wrappers over Learning primitives.
4. Add `src/routes/_app.learning.<subject>.tsx` (mirror `_app.learning.python.tsx`).
5. Update `docs/CHANGELOG.md` and `docs/FEATURES.md`.
