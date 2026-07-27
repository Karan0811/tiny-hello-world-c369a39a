// Python vertical slice — single source of truth for the Python track.
// Every module, project, and resource surface is derived from this file.
// Future subjects (NumPy, Pandas, ML, …) follow this exact shape.

import type {
  ModuleDefinition,
  ResourceRef,
} from "@/features/learning/types";

type PythonModuleSeed = Pick<
  ModuleDefinition,
  "slug" | "title" | "description" | "difficulty"
> & {
  estimatedHours?: number;
};

const seeds: PythonModuleSeed[] = [
  { slug: "python-refresher", title: "Python Refresher", description: "Fast recap of syntax, semantics, and the runtime model.", difficulty: "beginner" },
  { slug: "variables", title: "Variables", description: "Names, bindings, scope, and mutability.", difficulty: "beginner" },
  { slug: "data-types", title: "Data Types", description: "Primitives, collections, and the type hierarchy.", difficulty: "beginner" },
  { slug: "operators", title: "Operators", description: "Arithmetic, logical, bitwise, and comparison operators.", difficulty: "beginner" },
  { slug: "control-flow", title: "Control Flow", description: "Branching, loops, and pattern matching.", difficulty: "beginner" },
  { slug: "functions", title: "Functions", description: "Definitions, arguments, closures, and first-class semantics.", difficulty: "beginner" },
  { slug: "modules-and-packages", title: "Modules & Packages", description: "Import system, namespaces, and packaging basics.", difficulty: "intermediate" },
  { slug: "file-handling", title: "File Handling", description: "Read, write, and stream files safely.", difficulty: "intermediate" },
  { slug: "exception-handling", title: "Exception Handling", description: "Errors, exception chaining, and defensive patterns.", difficulty: "intermediate" },
  { slug: "oop", title: "Object Oriented Programming", description: "Classes, inheritance, dunder protocols, and design.", difficulty: "intermediate" },
  { slug: "iterators", title: "Iterators", description: "Iteration protocol and lazy sequences.", difficulty: "intermediate" },
  { slug: "generators", title: "Generators", description: "Yield-based coroutines and streaming pipelines.", difficulty: "intermediate" },
  { slug: "decorators", title: "Decorators", description: "Higher-order wrappers for functions and classes.", difficulty: "advanced" },
  { slug: "context-managers", title: "Context Managers", description: "Resource acquisition with `with` and `contextlib`.", difficulty: "advanced" },
  { slug: "type-hints", title: "Type Hints", description: "Static typing, generics, and Protocols.", difficulty: "intermediate" },
  { slug: "virtual-environments", title: "Virtual Environments", description: "Isolated interpreters with venv, uv, and pipx.", difficulty: "beginner" },
  { slug: "testing", title: "Testing", description: "pytest, fixtures, mocking, and coverage.", difficulty: "intermediate" },
  { slug: "async-programming", title: "Async Programming", description: "asyncio, tasks, event loops, and concurrency models.", difficulty: "advanced" },
  { slug: "packaging", title: "Packaging", description: "Building, versioning, and publishing to PyPI.", difficulty: "advanced" },
  { slug: "best-practices", title: "Best Practices", description: "Idioms, project layout, linting, and code review.", difficulty: "intermediate" },
];

function emptyModule(seed: PythonModuleSeed): ModuleDefinition {
  return {
    slug: seed.slug,
    title: seed.title,
    description: seed.description,
    difficulty: seed.difficulty,
    estimatedHours: seed.estimatedHours,
    prerequisites: [],
    objectives: [],
    status: "not-started",
    lessons: [],
    resources: [],
    projects: [],
    quiz: [],
    revision: [],
    interview: [],
    notes: [],
  };
}

export const pythonModules: ModuleDefinition[] = seeds.map(emptyModule);

export const pythonModulesBySlug: Record<string, ModuleDefinition> =
  Object.fromEntries(pythonModules.map((m) => [m.slug, m]));

export type PythonProjectSeed = {
  slug: string;
  title: string;
  summary: string;
  difficulty: "beginner" | "intermediate" | "advanced";
};

export const pythonProjects: PythonProjectSeed[] = [
  { slug: "calculator", title: "Calculator", summary: "Command-line arithmetic with tests.", difficulty: "beginner" },
  { slug: "cli-todo", title: "CLI Todo", summary: "Persist tasks from a rich CLI.", difficulty: "beginner" },
  { slug: "file-organizer", title: "File Organizer", summary: "Sort a directory tree by rules.", difficulty: "beginner" },
  { slug: "automation-scripts", title: "Automation Scripts", summary: "Everyday chores as reusable scripts.", difficulty: "intermediate" },
  { slug: "api-client", title: "API Client", summary: "Typed wrapper around an external API.", difficulty: "intermediate" },
  { slug: "web-scraper", title: "Web Scraper", summary: "Fetch, parse, and store structured data.", difficulty: "intermediate" },
  { slug: "csv-processor", title: "CSV Processor", summary: "Streaming transforms over large CSVs.", difficulty: "intermediate" },
  { slug: "log-analyzer", title: "Log Analyzer", summary: "Aggregate metrics from log streams.", difficulty: "advanced" },
];

export const pythonResources: ResourceRef[] = [];

export const pythonResourceSections = [
  { kind: "docs", label: "Official Documentation" },
  { kind: "articles", label: "PEPs" },
  { kind: "books", label: "Books" },
  { kind: "videos", label: "Videos" },
  { kind: "articles", label: "Articles" },
  { kind: "github", label: "GitHub Repositories" },
  { kind: "docs", label: "Practice Websites" },
] as const;

export const pythonAIActions = [
  "explain-concept",
  "explain-code",
  "generate-quiz",
  "generate-flashcards",
  "summarize-lesson",
  "review-project",
] as const;
