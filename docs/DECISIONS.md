# Architectural Decisions

Log of significant decisions and the reasoning behind them. Newest first.

---

## ADR-007 — Python is the reference vertical slice

**Context:** Twenty subjects will need identical structures (modules, lessons, projects, revision, interview, resources).

**Decision:** Ship one complete vertical slice (Python) that every future subject mirrors: a `src/config/<subject>.ts` file, a `src/features/<subject>/components/` folder of thin wrappers over the shared Learning primitives, and a landing route at `/learning/<subject>`.

**Why:** Prevents divergence across subjects. Contributors copy the template rather than reinvent structure. All shared logic stays in the Learning Engine.

---

## ADR-006 — AI Core is provider-agnostic

**Decision:** UI depends on the `AIProviderAdapter` interface, never on a vendor SDK. Adapters register into a singleton registry at startup.

**Why:** Providers are commodity today and volatile tomorrow. UI must survive swapping models.

---

## ADR-005 — Config as source of truth

**Decision:** All content (categories, modules, lessons, projects, roadmap nodes, prompt templates, nav items) lives in typed configuration under `src/config/`.

**Why:** Growth to thousands of lessons cannot depend on UI edits. Content becomes a data problem, not a code problem.

---

## ADR-004 — TanStack Start (React 19 + Vite 7)

**Decision:** Use TanStack Start with file-based routing.

**Why:** Type-safe routing, SSR-ready, and integrates cleanly with TanStack Query for data loading.

---

## ADR-003 — shadcn/ui + Tailwind v4

**Decision:** Own the UI primitives via shadcn/ui and use Tailwind v4 semantic tokens.

**Why:** Owning primitives keeps the design system consistent. Tokens make dark-first painless and enable theming later.

---

## ADR-002 — Feature modules over layered folders

**Decision:** Group by feature (`src/features/learning`, `src/features/python`, …) rather than by technical layer.

**Why:** Related types, components, and hooks change together. Feature folders make ownership and deletion trivial.

---

## ADR-001 — Dark-first, Linear/Vercel/Notion inspired

**Decision:** Ship dark mode as the default and design against Linear/Vercel/Notion visual language.

**Why:** Target audience (AI engineers) works in dark environments; the visual bar is set by those tools.
