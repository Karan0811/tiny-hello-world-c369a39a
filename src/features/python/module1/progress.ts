// Module 1 progress state. Client-side, persisted to localStorage so it
// plugs into the existing Progress surfaces without a backend.

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { module1Lessons } from "@/config/python-module-1";

const STORAGE_KEY = "aiu:python:module-1:progress";

export type Module1ProgressState = {
  completed: string[];
  /** seconds spent per lesson slug */
  timeSpent: Record<string, number>;
};

const emptyState: Module1ProgressState = { completed: [], timeSpent: {} };

function read(): Module1ProgressState {
  if (typeof window === "undefined") return emptyState;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyState;
    const parsed = JSON.parse(raw) as Partial<Module1ProgressState>;
    return {
      completed: Array.isArray(parsed.completed) ? parsed.completed : [],
      timeSpent: parsed.timeSpent && typeof parsed.timeSpent === "object" ? parsed.timeSpent : {},
    };
  } catch {
    return emptyState;
  }
}

function write(state: Module1ProgressState) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* storage unavailable — progress stays in memory for this session */
  }
  window.dispatchEvent(new CustomEvent("aiu:module-1-progress"));
}

export type LessonStatus = "locked" | "available" | "in-progress" | "completed";

export function useModule1Progress() {
  const [state, setState] = useState<Module1ProgressState>(emptyState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setState(read());
    setHydrated(true);
    const sync = () => setState(read());
    window.addEventListener("aiu:module-1-progress", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("aiu:module-1-progress", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const update = useCallback((next: Module1ProgressState) => {
    setState(next);
    write(next);
  }, []);

  const completeLesson = useCallback(
    (slug: string) => {
      const current = read();
      if (current.completed.includes(slug)) return;
      update({ ...current, completed: [...current.completed, slug] });
    },
    [update],
  );

  const uncompleteLesson = useCallback(
    (slug: string) => {
      const current = read();
      update({ ...current, completed: current.completed.filter((s) => s !== slug) });
    },
    [update],
  );

  const addTime = useCallback((slug: string, seconds: number) => {
    if (seconds <= 0) return;
    const current = read();
    write({
      ...current,
      timeSpent: { ...current.timeSpent, [slug]: (current.timeSpent[slug] ?? 0) + seconds },
    });
  }, []);

  const reset = useCallback(() => update(emptyState), [update]);

  const derived = useMemo(() => {
    const completedSet = new Set(state.completed);
    const statuses: Record<string, LessonStatus> = {};
    let unlockedUpTo = 0; // index of the furthest unlocked lesson
    module1Lessons.forEach((lesson, i) => {
      const isCompleted = completedSet.has(lesson.slug);
      const previous = module1Lessons[i - 1];
      const unlocked = i === 0 || (previous ? completedSet.has(previous.slug) : false);
      if (unlocked) unlockedUpTo = i;
      const started = (state.timeSpent[lesson.slug] ?? 0) > 0;
      statuses[lesson.slug] = isCompleted
        ? "completed"
        : !unlocked
          ? "locked"
          : started
            ? "in-progress"
            : "available";
    });
    const completedCount = module1Lessons.filter((l) => completedSet.has(l.slug)).length;
    const totalSeconds = Object.values(state.timeSpent).reduce((a, b) => a + b, 0);
    const currentLesson =
      module1Lessons.find((l) => statuses[l.slug] !== "completed") ??
      module1Lessons[module1Lessons.length - 1];
    return {
      statuses,
      completedCount,
      totalLessons: module1Lessons.length,
      completionPct: Math.round((completedCount / module1Lessons.length) * 100),
      totalSeconds,
      moduleCompleted: completedCount === module1Lessons.length,
      currentLesson,
      furthestUnlockedIndex: unlockedUpTo,
    };
  }, [state]);

  return {
    ...derived,
    hydrated,
    timeSpent: state.timeSpent,
    isCompleted: (slug: string) => state.completed.includes(slug),
    completeLesson,
    uncompleteLesson,
    addTime,
    reset,
  };
}

/** Accumulates time on the active lesson while the tab is visible. */
export function useLessonTimeTracker(slug: string, addTime: (s: string, sec: number) => void) {
  const startRef = useRef<number>(Date.now());
  useEffect(() => {
    startRef.current = Date.now();
    const flush = () => {
      const seconds = Math.round((Date.now() - startRef.current) / 1000);
      startRef.current = Date.now();
      if (seconds > 0) addTime(slug, seconds);
    };
    const onVisibility = () => {
      if (document.visibilityState === "hidden") flush();
      else startRef.current = Date.now();
    };
    document.addEventListener("visibilitychange", onVisibility);
    const interval = window.setInterval(flush, 30_000);
    return () => {
      flush();
      document.removeEventListener("visibilitychange", onVisibility);
      window.clearInterval(interval);
    };
  }, [slug, addTime]);
}

export function formatDuration(seconds: number) {
  if (seconds < 60) return `${seconds}s`;
  const mins = Math.round(seconds / 60);
  if (mins < 60) return `${mins}m`;
  const hours = Math.floor(mins / 60);
  return `${hours}h ${mins % 60}m`;
}
