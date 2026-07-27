// Python · Module 1 — "Introduction & Environment Setup".
// Structure only: lessons, objectives, skills, section scaffolding.
// Educational content is intentionally NOT authored here yet.

import type { Difficulty } from "@/features/learning/types";

export type Module1LessonSectionKey =
  | "objectives"
  | "theory"
  | "visual"
  | "demo"
  | "code"
  | "output"
  | "use-cases"
  | "mistakes"
  | "best-practices"
  | "exercises"
  | "assignment"
  | "quiz"
  | "flashcards"
  | "mentor"
  | "summary";

export type Module1LessonSection = {
  key: Module1LessonSectionKey;
  label: string;
  hint: string;
};

export type Module1Lesson = {
  slug: string;
  number: number;
  title: string;
  summary: string;
  estimatedMinutes: number;
  difficulty: Difficulty;
};

export const module1LessonSections: Module1LessonSection[] = [
  { key: "objectives", label: "Learning Objectives", hint: "What you'll be able to do after this lesson." },
  { key: "theory", label: "Theory", hint: "The core explanation of the concept." },
  { key: "visual", label: "Visual Explanation", hint: "Diagrams and visual models." },
  { key: "demo", label: "Interactive Demo", hint: "A hands-on demonstration you can play with." },
  { key: "code", label: "Code Examples", hint: "Annotated, runnable snippets." },
  { key: "output", label: "Expected Output", hint: "What you should see when you run the code." },
  { key: "use-cases", label: "Real World Use Cases", hint: "Where this shows up in real engineering work." },
  { key: "mistakes", label: "Common Mistakes", hint: "Pitfalls to watch out for." },
  { key: "best-practices", label: "Best Practices", hint: "How practitioners do this well." },
  { key: "exercises", label: "Exercises", hint: "Short drills to build fluency." },
  { key: "assignment", label: "Assignment", hint: "A larger applied task." },
  { key: "quiz", label: "Quiz", hint: "Check your understanding." },
  { key: "flashcards", label: "Flashcards", hint: "Spaced-repetition recall items." },
  { key: "mentor", label: "AI Mentor", hint: "Ask questions about this lesson." },
  { key: "summary", label: "Lesson Summary", hint: "The key takeaways in one place." },
];

export const module1Lessons: Module1Lesson[] = [
  { slug: "what-is-python", number: 1, title: "What is Python?", summary: "Origins, design philosophy, and where Python fits in AI engineering.", estimatedMinutes: 12, difficulty: "beginner" },
  { slug: "installing-python", number: 2, title: "Installing Python", summary: "Install a modern interpreter on macOS, Windows, and Linux.", estimatedMinutes: 15, difficulty: "beginner" },
  { slug: "installing-vs-code", number: 3, title: "Installing VS Code", summary: "Set up an editor, extensions, and a comfortable workspace.", estimatedMinutes: 12, difficulty: "beginner" },
  { slug: "first-python-program", number: 4, title: "First Python Program", summary: "Write, save, and run your first script end to end.", estimatedMinutes: 10, difficulty: "beginner" },
  { slug: "comments", number: 5, title: "Comments", summary: "Document intent with inline comments and docstrings.", estimatedMinutes: 8, difficulty: "beginner" },
  { slug: "understanding-errors", number: 6, title: "Understanding Errors", summary: "Read tracebacks and decode common error messages.", estimatedMinutes: 14, difficulty: "beginner" },
  { slug: "python-execution-flow", number: 7, title: "Python Execution Flow", summary: "From source file to bytecode to interpreter execution.", estimatedMinutes: 14, difficulty: "beginner" },
  { slug: "using-the-terminal", number: 8, title: "Using the Terminal", summary: "Navigate directories and run Python from the command line.", estimatedMinutes: 12, difficulty: "beginner" },
  { slug: "python-documentation", number: 9, title: "Python Documentation", summary: "Find answers fast in the official docs, help(), and PEPs.", estimatedMinutes: 10, difficulty: "beginner" },
  { slug: "module-revision", number: 10, title: "Module Revision", summary: "Consolidate everything from Module 1 before moving on.", estimatedMinutes: 18, difficulty: "beginner" },
];

export const pythonModule1 = {
  slug: "module-1",
  number: 1,
  title: "Introduction & Environment Setup",
  description:
    "Get a working Python environment, understand how Python runs your code, and build the habits you'll rely on for every module that follows.",
  difficulty: "beginner" as Difficulty,
  estimatedMinutes: module1Lessons.reduce((sum, l) => sum + l.estimatedMinutes, 0),
  lessons: module1Lessons,
  objectives: [
    "Explain what Python is and why it dominates AI engineering.",
    "Install and verify a modern Python interpreter on your machine.",
    "Configure VS Code as a productive Python workspace.",
    "Write, save, and execute a Python script from the terminal.",
    "Read a traceback and diagnose the most common beginner errors.",
    "Navigate the official Python documentation independently.",
  ],
  skillsGained: [
    "Python installation",
    "Editor setup",
    "Terminal basics",
    "Script execution",
    "Error reading",
    "Documentation literacy",
  ],
  prerequisites: [] as string[],
  nextModule: {
    number: 2,
    title: "Variables & Data Types",
    description: "Names, bindings, primitives, and the Python type hierarchy.",
    locked: true,
  },
};

export const module1LessonsBySlug: Record<string, Module1Lesson> = Object.fromEntries(
  module1Lessons.map((l) => [l.slug, l]),
);

export function getModule1Lesson(slug: string) {
  return module1LessonsBySlug[slug];
}

export function getModule1LessonNeighbours(slug: string) {
  const idx = module1Lessons.findIndex((l) => l.slug === slug);
  return {
    index: idx,
    previous: idx > 0 ? module1Lessons[idx - 1] : undefined,
    next: idx >= 0 && idx < module1Lessons.length - 1 ? module1Lessons[idx + 1] : undefined,
  };
}
